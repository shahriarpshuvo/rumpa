#!/usr/bin/env python3
"""
generate_thumbnail.py — generate Rumpa.uk blog post thumbnails via Vertex AI.

Default model: gemini-3.1-flash-image-preview (routed to `global` region).

Per post, reads `content/blog/<slug>/THUMBNAIL.md` (or `<slug>.mdx` style
posts: looks for `content/blog/THUMBNAIL/<slug>.md` fallback), generates one
1200x630 PNG, then watermarks it via watermark.py.

Output: `assests/media/<slug>-thumbnail.png` (final, watermarked).
Raw (pre-watermark) backup: `assests/media/_raw/<slug>-thumbnail.png`.

Usage:
  python3 scripts/generate_thumbnail.py --slug 3-months-before-ttc
  python3 scripts/generate_thumbnail.py --batch 5
  python3 scripts/generate_thumbnail.py --all
  python3 scripts/generate_thumbnail.py --slug X --dry-run
  python3 scripts/generate_thumbnail.py --slug X --force      # overwrite
  python3 scripts/generate_thumbnail.py --slug X --no-watermark

Setup:
  1) pip3 install google-auth requests Pillow
  2) gcloud auth application-default login
  3) gcloud config set project YOUR_PROJECT_ID
  4) Add to .env:
        GCP_PROJECT_ID=your-project-id
        GCP_REGION=us-central1
        IMAGE_MODEL=gemini-3.1-flash-image-preview   # optional override
"""

import argparse
import base64
import io
import os
import re
import sys
import time
from pathlib import Path

import requests

try:
    from PIL import Image
except ImportError:
    print("ERROR: pip3 install Pillow", file=sys.stderr); sys.exit(1)

sys.path.insert(0, str(Path(__file__).resolve().parent))
try:
    import watermark as wm_mod
    WATERMARK_AVAILABLE = True
except ImportError:
    WATERMARK_AVAILABLE = False

REPO = Path(__file__).resolve().parent.parent
BLOG = REPO / "content" / "blog"
PROMPTS_DIR = REPO / "data" / "thumbnails"
RAW_DIR = REPO / "assests" / "media" / "_raw"
PUBLIC_DIR = REPO / "public" / "blog"
ENV_FILE = REPO / ".env"

OUTPUT_SIZE = (1200, 630)
ASPECT = "16:9"
SYSTEM_INSTRUCTIONS_PATH = Path(__file__).resolve().parent / "templates" / "SYSTEM_INSTRUCTIONS.md"


# ----------------------------- env --------------------------------

def load_env():
    env = {}
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env


ENV = load_env()
PROJECT = ENV.get("GCP_PROJECT_ID") or os.environ.get("GCP_PROJECT_ID", "")
REGION = ENV.get("GCP_REGION") or os.environ.get("GCP_REGION", "us-central1")
DEFAULT_MODEL = (
    ENV.get("IMAGE_MODEL")
    or os.environ.get("IMAGE_MODEL")
    or "gemini-3.1-flash-image-preview"
)


def load_system_instructions():
    if SYSTEM_INSTRUCTIONS_PATH.exists():
        return SYSTEM_INSTRUCTIONS_PATH.read_text().strip()
    return ""


def region_for(model_name):
    if model_name.startswith("gemini-3"):
        return "global"
    return REGION


def vertex_host(region):
    return "aiplatform.googleapis.com" if region == "global" else f"{region}-aiplatform.googleapis.com"


# ----------------------- prompt file parsing ----------------------

PROMPT_RE = re.compile(
    r"\*\*Prompt:\*\*\s*\n(.*?)(?=\n\s*\*\*|\n\s*---|\Z)",
    re.DOTALL | re.IGNORECASE,
)
NEG_RE = re.compile(
    r"\*\*Negative prompt:\*\*\s*\n(.*?)(?=\n\s*\*\*|\n\s*---|\Z)",
    re.DOTALL | re.IGNORECASE,
)


def parse_thumbnail_file(path):
    if not path.exists():
        return None
    text = path.read_text()
    m = PROMPT_RE.search(text)
    if not m:
        return None
    neg = NEG_RE.search(text)
    return {
        "prompt": m.group(1).strip(),
        "negative_prompt": neg.group(1).strip() if neg else "",
    }


# ----------------------- Vertex AI Gemini -------------------------

_CACHED_TOKEN = {"value": None, "expires": 0}


def get_access_token():
    if _CACHED_TOKEN["value"] and time.time() < _CACHED_TOKEN["expires"]:
        return _CACHED_TOKEN["value"]
    try:
        import google.auth
        import google.auth.transport.requests
    except ImportError:
        print("ERROR: pip3 install google-auth", file=sys.stderr); sys.exit(1)

    creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    creds.refresh(google.auth.transport.requests.Request())
    _CACHED_TOKEN["value"] = creds.token
    _CACHED_TOKEN["expires"] = time.time() + 50 * 60
    return creds.token


def _gemini_generate_image(prompt, negative_prompt, aspect, model, system_instructions=""):
    composed = prompt.strip()
    if aspect:
        composed += f"\n\nAspect ratio: {aspect} (landscape)."
    if negative_prompt:
        composed += f"\n\nDo not include: {negative_prompt.strip()}"

    region = region_for(model)
    url = (
        f"https://{vertex_host(region)}/v1/"
        f"projects/{PROJECT}/locations/{region}/publishers/google/models/{model}:generateContent"
    )
    body = {}
    if system_instructions:
        body["systemInstruction"] = {
            "role": "system",
            "parts": [{"text": system_instructions}],
        }
    body["contents"] = [{"role": "user", "parts": [{"text": composed}]}]
    body["generationConfig"] = {
        "responseModalities": ["IMAGE"],
        "imageConfig": {"aspectRatio": aspect} if aspect else {},
    }
    body["safetySettings"] = [
        {"category": "HARM_CATEGORY_HARASSMENT",        "threshold": "BLOCK_ONLY_HIGH"},
        {"category": "HARM_CATEGORY_HATE_SPEECH",       "threshold": "BLOCK_ONLY_HIGH"},
        {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_ONLY_HIGH"},
        {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_ONLY_HIGH"},
    ]

    token = get_access_token()
    r = requests.post(
        url,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json=body,
        timeout=240,
    )
    if r.status_code >= 400:
        raise RuntimeError(f"Gemini {r.status_code}: {r.text[:800]}")
    data = r.json()
    candidates = data.get("candidates") or []
    if not candidates:
        raise RuntimeError(f"Gemini returned no candidates: {data}")
    parts = (candidates[0].get("content") or {}).get("parts") or []
    for p in parts:
        inline = p.get("inlineData") or p.get("inline_data")
        if inline and inline.get("data"):
            return base64.b64decode(inline["data"])
    raise RuntimeError(f"Gemini response had no inlineData image part: {data}")


def generate_image(prompt, negative_prompt, model=None, system_instructions=""):
    if not PROJECT:
        raise RuntimeError("GCP_PROJECT_ID missing from .env / env")
    m = model or DEFAULT_MODEL
    last_err = None
    for attempt in range(5):
        try:
            return _gemini_generate_image(prompt, negative_prompt, ASPECT, m,
                                          system_instructions=system_instructions)
        except RuntimeError as e:
            last_err = e
            msg = str(e)
            retryable = any(c in msg for c in ("429", "503", "RESOURCE_EXHAUSTED"))
            if not retryable or attempt == 4:
                raise
            wait = 30 * (2 ** attempt)
            print(f"  RATE_LIMIT attempt {attempt+1}/5 — sleeping {wait}s …", file=sys.stderr)
            time.sleep(wait)
    raise last_err


# ---------------------------- per-slug ----------------------------

def _resize_to(png_bytes, size):
    img = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
    if img.size != tuple(size):
        img = img.resize(tuple(size), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, "PNG")
    return buf.getvalue()


def find_thumbnail_md(slug):
    """Locate the prompt file for a slug. Prompts live OUTSIDE content/blog
    (Nextra renders content/blog) at data/thumbnails/<slug>.md.
    """
    p = PROMPTS_DIR / f"{slug}.md"
    return p if p.exists() else None


def generate_for_slug(slug, force=False, dry_run=False, watermark=True, model=None, system_instructions="", delay=0):
    src = find_thumbnail_md(slug)
    if not src:
        print(f"SKIP {slug}: no prompt file at {PROMPTS_DIR}/{slug}.md")
        return 0
    sec = parse_thumbnail_file(src)
    if not sec:
        print(f"SKIP {slug}: prompt file has no **Prompt:** block")
        return 0

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    raw_path = RAW_DIR / f"{slug}-thumbnail.png"
    final_path = PUBLIC_DIR / f"{slug}-thumbnail.jpg"

    if final_path.exists() and not force:
        print(f"  KEEP {final_path.name} (exists, use --force to overwrite)")
        return 0

    if dry_run:
        print(f"  DRY  {final_path.name}  size={OUTPUT_SIZE}  src={src.name}  "
              f"prompt={sec['prompt'][:80]}...")
        return 1

    try:
        png_bytes = generate_image(sec["prompt"], sec["negative_prompt"],
                                   model=model, system_instructions=system_instructions)
        png_bytes = _resize_to(png_bytes, OUTPUT_SIZE)
        raw_path.write_bytes(png_bytes)
        print(f"  RAW  {raw_path.name} ({len(png_bytes)//1024} KB)")
        if watermark and WATERMARK_AVAILABLE:
            try:
                wm_mod.apply_watermark(raw_path, output_path=final_path)
                print(f"  OK   public/blog/{final_path.name} ({final_path.stat().st_size//1024} KB JPEG)")
            except Exception as e:
                print(f"  WARN watermark {final_path.name}: {e}", file=sys.stderr)
        if delay > 0:
            time.sleep(delay)
        return 1
    except Exception as e:
        print(f"  FAIL {slug}: {e}", file=sys.stderr)
        if delay > 0:
            time.sleep(delay)
        return 0


# ----------------------- batch / discovery ------------------------

def list_all_slugs():
    """All blog slugs: dir-style + flat .mdx style."""
    slugs = []
    if not BLOG.exists():
        return slugs
    for entry in sorted(BLOG.iterdir()):
        if entry.is_dir():
            slugs.append(entry.name)
        elif entry.suffix == ".mdx":
            slugs.append(entry.stem)
    return slugs


def list_slugs_needing(force=False):
    out = []
    for slug in list_all_slugs():
        if find_thumbnail_md(slug) is None:
            continue
        if not force and (PUBLIC_DIR / f"{slug}-thumbnail.jpg").exists():
            continue
        out.append(slug)
    return out


# ------------------------------ main ------------------------------

def main():
    ap = argparse.ArgumentParser(
        description="Generate Rumpa.uk blog thumbnails via Vertex AI Gemini.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  generate_thumbnail.py --slug 3-months-before-ttc\n"
            "  generate_thumbnail.py --slug X --force\n"
            "  generate_thumbnail.py --batch 5\n"
            "  generate_thumbnail.py --all\n"
        ),
    )
    scope = ap.add_mutually_exclusive_group(required=True)
    scope.add_argument("--slug", help="Single post slug")
    scope.add_argument("--batch", type=int, help="Next N posts missing thumbnails")
    scope.add_argument("--all", action="store_true", help="All posts missing thumbnails")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force", action="store_true", help="Overwrite existing PNGs")
    ap.add_argument("--no-watermark", action="store_true")
    ap.add_argument("--model", default=None)
    ap.add_argument("--delay", type=float, default=5.0,
                    help="Seconds between API calls (default 5). Set 0 to disable.")
    args = ap.parse_args()

    if not args.dry_run and not PROJECT:
        print("ERROR: set GCP_PROJECT_ID in .env (and GCP_REGION).", file=sys.stderr)
        print("Run `gcloud auth application-default login` first.", file=sys.stderr)
        sys.exit(1)

    print(f"Image model: {args.model or DEFAULT_MODEL}")
    system_instructions = load_system_instructions() if not args.dry_run else ""
    if system_instructions:
        print(f"System instructions loaded ({len(system_instructions)} chars)")

    delay = 0.0 if args.dry_run else args.delay
    if delay > 0:
        print(f"Rate-limit buffer: {delay}s between API calls")

    if args.slug:
        n = generate_for_slug(args.slug, force=args.force, dry_run=args.dry_run,
                              watermark=not args.no_watermark, model=args.model,
                              system_instructions=system_instructions, delay=delay)
        print(f"\nGenerated {n} image(s) for {args.slug}")
        return

    slugs = list_slugs_needing(force=args.force)
    if args.batch:
        slugs = slugs[: args.batch]
    print(f"Found {len(slugs)} post(s) needing thumbnails (force={args.force}).")
    total = 0
    for i, s in enumerate(slugs, 1):
        print(f"\n[{i}/{len(slugs)}] {s}")
        total += generate_for_slug(s, force=args.force, dry_run=args.dry_run,
                                   watermark=not args.no_watermark, model=args.model,
                                   system_instructions=system_instructions, delay=delay)
    print(f"\nDone. {total} image(s) generated across {len(slugs)} post(s).")


if __name__ == "__main__":
    main()

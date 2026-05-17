#!/usr/bin/env python3
"""
watermark.py — composite the Rumpa.uk watermark on the bottom-right of a
thumbnail.

Brand asset:
  assests/watermark.png   - Rumpa.uk wordmark + icon (wide aspect)

Behaviour:
  - Watermark scaled so its width = WM_WIDTH_FRAC of image width (default 18%).
  - Positioned in the bottom-right corner with WM_MARGIN_PX padding.
  - Overwrites input by default. Original is backed up to
    assests/media/_raw/<filename> before overwrite.

Usage:
  python3 scripts/watermark.py <image_path> [<image_path> ...]
  python3 scripts/watermark.py --slug 3-months-before-ttc
  python3 scripts/watermark.py --all
  python3 scripts/watermark.py path/to/img.png --out out.png
  python3 scripts/watermark.py path/to/img.png --dry-run
"""

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: pip3 install Pillow", file=sys.stderr); sys.exit(1)

SCRIPTS = Path(__file__).resolve().parent
REPO = SCRIPTS.parent
ASSESTS = REPO / "assests"
MEDIA = ASSESTS / "media"
WATERMARK_PATH = ASSESTS / "watermark.png"

# Watermark sizing + positioning
WM_WIDTH_FRAC = 0.18    # watermark width = 18% of image width
WM_MARGIN_PX = 24       # padding from right + bottom edge
WM_OPACITY = 0.92       # 0.0 transparent .. 1.0 opaque (slight softening)


def _load_watermark(target_width_px):
    if not WATERMARK_PATH.exists():
        raise FileNotFoundError(f"Missing watermark asset: {WATERMARK_PATH}")
    img = Image.open(WATERMARK_PATH).convert("RGBA")
    ratio = target_width_px / img.width
    new_h = max(1, round(img.height * ratio))
    img = img.resize((target_width_px, new_h), Image.LANCZOS)
    if WM_OPACITY < 1.0:
        # Multiply alpha channel by opacity
        r, g, b, a = img.split()
        a = a.point(lambda p: round(p * WM_OPACITY))
        img = Image.merge("RGBA", (r, g, b, a))
    return img


def _save_image(img, out_path):
    suffix = out_path.suffix.lower()
    if suffix in (".jpg", ".jpeg"):
        img.convert("RGB").save(out_path, "JPEG", quality=92)
    else:
        img.save(out_path, "PNG")


def _backup_raw(image_path):
    raw_dir = MEDIA / "_raw"
    raw_dir.mkdir(parents=True, exist_ok=True)
    raw_dest = raw_dir / image_path.name
    if not raw_dest.exists():
        raw_dest.write_bytes(image_path.read_bytes())


def apply_watermark(image_path, output_path=None, dry_run=False, save_original=True):
    image_path = Path(image_path)
    out = Path(output_path) if output_path else image_path

    img = Image.open(image_path).convert("RGBA")
    target_w = max(1, round(img.width * WM_WIDTH_FRAC))
    wm = _load_watermark(target_w)
    x = img.width - wm.width - WM_MARGIN_PX
    y = img.height - wm.height - WM_MARGIN_PX

    if dry_run:
        print(f"  DRY  {image_path.name}  img={img.width}x{img.height}  "
              f"wm={wm.width}x{wm.height}  at=({x},{y})")
        return

    overwriting_in_place = (out == image_path)
    if overwriting_in_place and save_original:
        _backup_raw(image_path)

    img.alpha_composite(wm, dest=(x, y))
    _save_image(img, out)

    rel = out.relative_to(REPO) if out.is_relative_to(REPO) else out
    print(f"  OK   {rel}")


def iter_all_thumbnails():
    if not MEDIA.exists():
        return
    for p in sorted(MEDIA.glob("*-thumbnail.png")):
        yield p


def main():
    ap = argparse.ArgumentParser(description="Apply Rumpa.uk watermark to thumbnails.")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("paths", nargs="*", default=[], help="Explicit image path(s) to watermark.")
    g.add_argument("--slug", help="Watermark assests/media/<slug>-thumbnail.png")
    g.add_argument("--all", action="store_true", help="Watermark every *-thumbnail.png under assests/media/")

    ap.add_argument("--out", help="Output path (only valid with one explicit path).")
    ap.add_argument("--no-keep-raw", action="store_true",
                    help="Do NOT save original to assests/media/_raw/ before overwriting.")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    targets = []
    if args.slug:
        p = MEDIA / f"{args.slug}-thumbnail.png"
        if p.exists():
            targets.append(p)
        else:
            print(f"ERROR: not found: {p}", file=sys.stderr); sys.exit(1)
    elif args.all:
        targets = list(iter_all_thumbnails())
    else:
        targets = [Path(p) for p in args.paths]

    if not targets:
        print("Nothing to do.", file=sys.stderr); sys.exit(1)

    if args.out and len(targets) != 1:
        print("ERROR: --out only valid with one input path", file=sys.stderr); sys.exit(1)

    print(f"Watermarking {len(targets)} image(s)")
    for p in targets:
        try:
            out = Path(args.out) if args.out else None
            apply_watermark(p, output_path=out, dry_run=args.dry_run,
                            save_original=not args.no_keep_raw)
        except Exception as e:
            print(f"  FAIL {p}: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()

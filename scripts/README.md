# scripts/ — Rumpa.uk thumbnail pipeline

Two-step pipeline that turns per-post `THUMBNAIL.md` prompt files into
watermarked 1200×630 PNGs.

```
content/blog/<slug>/THUMBNAIL.md     ──┐
                                       │  generate_thumbnail.py
assests/watermark.png                  │  (Vertex AI Gemini 3.1 Flash)
scripts/templates/                     │
   SYSTEM_INSTRUCTIONS.md              │
                                       ▼
assests/media/<slug>-thumbnail.png   (final, watermarked)
assests/media/_raw/<slug>-thumbnail.png   (un-watermarked backup)
```

## Setup

```sh
pip3 install google-auth requests Pillow
gcloud auth application-default login
gcloud config set project <YOUR_PROJECT_ID>
# enable Vertex AI API on the project in GCP Console
```

Add to `.env` in repo root:

```
GCP_PROJECT_ID=your-project-id
GCP_REGION=us-central1
IMAGE_MODEL=gemini-3.1-flash-image-preview   # optional override
```

## Commands

```sh
# smoke test one post (dry-run = no API call)
python3 scripts/generate_thumbnail.py --slug 3-months-before-ttc --dry-run

# render one post
python3 scripts/generate_thumbnail.py --slug 3-months-before-ttc

# render next 5 posts missing thumbnails
python3 scripts/generate_thumbnail.py --batch 5

# render all posts missing thumbnails
python3 scripts/generate_thumbnail.py --all

# regenerate one post (overwrite existing)
python3 scripts/generate_thumbnail.py --slug 3-months-before-ttc --force

# watermark only (image already generated)
python3 scripts/watermark.py --slug 3-months-before-ttc
python3 scripts/watermark.py --all
```

## Style

- Flat editorial vector illustration. Modern Flo Health / Clue register.
- Dusty soft palette: mauve / rose / mint / sage / cream / lavender BGs;
  peach / sage / lavender / coral accents. Deep purple from the brand
  wordmark used sparingly as accent only.
- Background decor (furniture, plants, lamps) drawn as **line-art outlines**,
  not filled blocks.
- Every thumbnail anchors on a human character — woman alone, woman +
  partner, woman + clinician, or woman + baby — sized to occupy roughly
  35–55% of canvas width.
- Bottom-right ~20% of the canvas is intentionally left uncluttered so the
  watermark overlay reads cleanly.

See `scripts/templates/SYSTEM_INSTRUCTIONS.md` for full style rules. See
`scripts/templates/THUMBNAIL.template.md` for the per-post prompt scaffold.

## Cost

Gemini 3.1 Flash Image Preview is roughly **$0.04–0.07 per image**.
53 posts ≈ **$2–4** for a full first-pass render.

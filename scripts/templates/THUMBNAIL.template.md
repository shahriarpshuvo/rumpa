# THUMBNAIL.md — per-post prompt scaffold

This template is the structure every `content/blog/<slug>/THUMBNAIL.md`
follows. The generator script extracts the **Prompt:** block (and optional
**Negative prompt:** block) and sends them to Gemini, with the shared
`SYSTEM_INSTRUCTIONS.md` injected as system instruction.

Style assumptions (dusty palette, flat editorial vector, no text, etc.) are
already in `SYSTEM_INSTRUCTIONS.md`. Per-post prompts should be **scene-
specific** — the verb and subject of the post, not the style.

---

## Scene plan

- **Slug:** `<category>/<slug>` or just `<slug>` (flat)
- **Post title:** _exact frontmatter title_
- **Topic verb:** what the post is about (planning / testing / tracking /
  diagnosing / eating / coping / consulting / waiting / asking / preparing)
- **Primary subject:** woman alone | woman + partner | woman + clinician |
  woman + baby
- **Setting:** kitchen | bedroom | clinic exam room | doctor's office |
  pharmacy | living room | bathroom | desk at home | garden
- **Skin tone (rotate diversity):** warm-brown | deep-brown | olive | fair
- **Background tone (pick one):** dusty-mauve | dusty-rose | icy-mint |
  pale-sage | cream | lavender-mist
- **Accent (top / dress):** soft-peach | sage-green | dusty-lavender |
  muted-coral
- **Line-art decor (1–3 items):** _e.g. line-art houseplant on left,
  line-art wall frame above subject_
- **Optional thought bubbles:** 1–3 small line-art circles each holding a
  related icon (calendar, pill, thermometer, heart, leaf, droplet)

---

**Prompt:**

A flat editorial vector illustration in the modern Flo Health / Clue style
for a UK women's-health blog post titled "<TITLE>".

Scene: <one sentence describing the verb and subject — what is happening>.

Composition: <subject anchored left | right | centre>. The character is a
<woman | couple | woman with clinician | woman with baby> with
<warm-brown | olive | deep-brown | fair> skin and
<dark | warm-brown> hair tied back / shoulder-length, wearing a
<soft peach | sage green | dusty lavender | muted coral> top and
<contrasting accent> trousers. The character is <sitting / standing /
holding / pouring / reviewing / looking at>... Full body within the frame
with breathing room from all edges, especially the bottom-right corner
which should stay uncluttered for a small watermark overlay.

Background: an unbroken flat field of <dusty-mauve | dusty-rose | icy-mint |
pale-sage | cream | lavender-mist> covering the entire canvas edge to edge.

Background decor (line-art outlines only, not filled): <e.g. a hanging
houseplant on the left, a framed wall-art rectangle behind the subject, a
wooden chair with a draped throw, a baby mobile, a window with simple
curtain folds>.

<Optional> Around the character, 1–3 small line-art circles each contain
one simple icon: <calendar | pill capsule | thermometer | heart | leaf |
droplet | clock>.

Mood: calm, contemplative, dignified, empathetic. Hand-drawn organic
shapes. Single soft light direction. Aspect ratio 16:9 landscape.

**Negative prompt:**

text, letters, words, captions, labels, watermark text, URLs, brand names,
logos, photographic, 3D render, painterly, anime, Pixar style, clipart,
isometric, plain white background, neon, saturated primaries, teal, aqua,
cartoon-cute, sexualised, fetishised pregnancy imagery, melodrama,
exaggerated emotion, crying with tears, blood, needles entering skin,
surgical instruments, cropped face, cropped hands, cropped feet, fused
fingers, extra fingers, floating subject, filled background decor blocks

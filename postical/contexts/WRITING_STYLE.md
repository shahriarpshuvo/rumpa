# Writing Style Guide

## Output Format
- **Content Format:** MDX (Next.js modern — see `AGENTS.md` for version notes)
- **File Location:** `content/blog/<slug>.mdx` (slug = kebab-case, keyword-led)
- **Frontmatter Schema:**

```yaml
---
title: ""           # ≤ 60 chars, primary keyword early, sentence case
description: ""     # 140-160 chars — SEO meta + social preview; includes primary keyword
tags: []            # 2-5 tags from approved taxonomy (see Tag Vocabulary below)
thumbnail: ""       # /public/blog/<slug>/cover.jpg — 1200×630, alt-text-friendly
publishedAt: ""     # YYYY-MM-DD — original publish date (never changes after first publish)
updatedAt: ""       # YYYY-MM-DD — bumped on every meaningful edit (E-E-A-T freshness signal)
---
```

All 6 fields required. On first publish, `publishedAt` and `updatedAt` are identical.

### Tag Vocabulary (lock to this set; expand only with approval)
`TTC`, `PCOS`, `PMOS`, `IVF`, `IUI`, `Ovulation`, `Fertility-Testing`, `Pre-Conception`, `Gestational-Diabetes`, `Pregnancy`, `Miscarriage`, `Hormones`, `Lifestyle`, `Nutrition`, `Mental-Health`, `NHS-Pathway`, `US-Pathway`, `South-Asian-Health`

### Code Block Conventions
Not common in medical content. When citing dosages, lab values, or cycle-day protocols, prefer prose + tables over code fences.

### Custom MDX Components (to build)
| Component | Purpose | Frequency per post |
|-----------|---------|-------------------|
| `<Callout type="note\|warning\|clinical-tip">` | Disclaimers, evidence pull-quotes, key takeaways | 1-3 |
| `<ConsultCTA placement="mid\|end" />` | Booking CTA — primary conversion driver | 2 (mid + end) |
| `<ReferenceList />` + `<Cite n="1" />` | Numbered citations to NICE / ACOG / NHS / PubMed — E-E-A-T anchor | every clinical claim |
| `<FAQ>` accordion | Schema-ready FAQ block — drives Google FAQ rich result | 1 per post (3-6 Qs) |
| `<AuthorCard />` | Dr. Rumpa bio + credentials + last-reviewed date | every post (auto in layout) |
| `<ReviewedBy date="YYYY-MM-DD" />` | "Medically reviewed" trust badge | every post |

Until components exist, write the markup inline as `<Callout type="warning">…</Callout>` etc. — building them out is a separate engineering task.

---

## Voice & POV (recap from BRAND.md)
- Clinical but warm. Evidence-led with empathetic teacher-tone.
- Switch between first person ("In my clinic, women often ask…") and third person ("Research shows…") within the same article. First person for clinical experience and reassurance; third person for evidence and education.
- Audience: women 28-40 actively TTC; secondary PCOS/PMOS, IVF-curious, GD. UK + US + global English-speaking + South Asian diaspora.

---

## DOs
- **Open with the reader's question or fear** — first line acknowledges what brought them to the post ("If you've been TTC for six months without success, you're not alone.")
- **Lead with the answer, then explain** — top-of-page summary box or first paragraph gives the takeaway; depth follows
- **Translate jargon on first use** — "anti-Müllerian hormone (AMH — a blood test that estimates your egg reserve)"
- **Cite every clinical claim** — link NICE, ACOG, NHS, NIH/NIDDK, PubMed reviews. Use `<Cite n="x" />` + numbered `<ReferenceList />` at the end
- **Use first-person reassurance** — "Patients who come to me with this question, I assure them that…" (allowed framing — see DON'Ts for the limit)
- **Cover NHS + US pathways in same article** when geo-relevant — call out "If you're in the UK…" / "If you're in the US…" boxes
- **Acknowledge the South Asian diaspora context** where authentic — family timing, late-marriage TTC, cultural pressure (never gender pressure)
- **Use empathetic CTAs** — "If this resonates, book a 30-min consultation" beats "Buy now"
- **Use contractions naturally** — you're, we're, it's. Reads warmer than "you are, we are, it is"
- **Short paragraphs** — 1-3 sentences. Mobile-first. White space = reader oxygen
- **Bold the takeaway sentence** in each section so skimmers can scan
- **End every post with a `<FAQ>` block + `<ConsultCTA />`** — FAQ for SEO, CTA for conversion
- **Bump `updatedAt` on every meaningful edit** — guidelines update, new study, clarified passage

## DON'Ts
- **No sex-selection / gender-selection content of any kind** — see COMPETITORS.md "Forbidden topics". Strictly off-limits on blog, IG, TT, and DMs
- **No diagnosis or prescription claims** — never write "You have PCOS" or "Take Metformin." Always frame as "Discuss with your doctor whether [X] is right for you"
- **No miracle / cure / guarantee language** — never "cure PCOS", "guaranteed pregnancy", "natural fertility miracle", "fix your hormones in 30 days"
- **No "I treated / I cured / I successfully helped patient X conceive" claims** — clinical outcome claims are off-limits. Allowed: "Patients who come to me with [concern], I help them understand…" or "Many women I see in clinic feel…". Frame around empathy + education, never outcome
- **No patient stories without consent + privacy framing** — if a case anecdote is used, append "(identifying details changed for privacy)" — and only if Dr. Rumpa has explicitly approved that anecdote
- **No before/after weight-loss framing for PCOS** — PCOS content stays fertility-focused. No "lose X lbs and conceive" angles
- **No fear-mongering on age/timing** — acknowledge biology honestly without panic ("fertility declines after 35" is fact; "you're running out of time" is wrong)
- **No naturopathic/woo language without evidence** — no "balance your chakras for fertility", "detox your womb", "seed cycling will fix your hormones"
- **No em dashes anywhere** — not in titles, headings, body, meta descriptions, or social copy. Use commas, periods, parentheses, or rephrase. (Em = `—`. En = `–`. Hyphen = `-`. Hyphens in compound modifiers like "pre-conception" are fine.)
- **No AI tells** — drop "delve", "tapestry", "in today's fast-paced world", "in the realm of", "navigate the complexities", "unlock the secrets", "it's important to note that", "in conclusion", "moreover", "furthermore", "decoded", "honestly" (as filler), "what actually works", "worth your time", "real numbers", "the truth about", "you won't believe", "game changer", "deep dive", "comprehensive guide", "ultimate guide", "everything you need to know", "let's dive in", "robust", "seamless", "leverage", "utilize", "synergy"
- **No "Doctor's Guide / Doctor's Take / A Doctor's View" in titles** — overused tell. The author byline + ReviewedBy badge already convey authority. Body can reference "as an OB-GYN, I…" sparingly
- **No hedge-heavy openings** — never "In this article, we will explore…" or "This blog post will discuss…"
- **No stock-photo emoji clichés** — no 🌸✨🤰 in body copy (titles/social may use sparingly)

---

## SEO Writing Rules

### Keyword Placement
- Primary keyword in: title, first 100 words, one H2, meta description, URL slug
- Secondary keywords: naturally distributed across H2s and body text
- Never force keywords. If a sentence reads awkwardly, rewrite it.

### Meta Descriptions
- 150-160 characters
- Include primary keyword
- State the benefit, not just the topic
- Example: "Learn what to eat with gestational diabetes to keep blood sugar stable. Includes a sample day plan, safe snacks, and a printable food list."

### Internal Linking
- Link to related blog posts naturally within content
- Link to the consultation booking page when mentioning Dr. Rumpa's services
- 3-5 internal links per blog post
- Anchor text describes the destination; never "click here" or "read more"

### Heading Structure
- H1: post title (only one per page, rendered from `title` frontmatter)
- H2: main sections, include keyword variants
- H3: subsections, answer People-Also-Ask (PAA) questions

---

## Rules

### Paragraph & Heading
- **Paragraph length:** Max 3 sentences. Often 1-2. Mobile-first.
- **Heading style:** Conversational + keyword-aware. "How PCOS Affects Your Ovulation" > "Ovulation in Polycystic Ovary Syndrome"
- **H2 every 200-300 words.** Subheads aid skimming and improve dwell time.
- **No H1 in body** — `title` frontmatter renders the H1.

### Length
- **Long-form authority posts (pillar):** 1,800-2,500 words. Pre-conception checklist, complete PCOS guide, IVF decision tree.
- **Standard posts:** 1,000-1,500 words.
- **Quick-answer posts (FAQ targets):** 600-900 words. Bottom-funnel intent.
- All lengths include FAQ + CTA + reference list.

### Linking
- **Internal links:** 3-6 per post. Link to related TTC/PCOS/IVF/GD pillars; build topic cluster mesh.
- **External links:** 2-5 per post, all to authoritative sources (NHS, NICE, ACOG, NIH, peer-reviewed PubMed). No competitor blogs, no Wikipedia for clinical facts.
- **Anchor text:** Descriptive, never "click here" / "read more". Match the destination page's primary keyword.

### Keyword Placement
- **Primary keyword:**
  - In `title` (front-loaded, within first 60 chars)
  - In first 100 words of body
  - In first H2
  - In `thumbnail` filename + alt text
  - 1-2x per 500 words after that (no stuffing)
- **Secondary keywords:** 2-4 throughout body, ideally in H2s
- **Long-tail variations:** Cover via FAQ block (each Q is a long-tail query)
- **LSI / semantic terms:** Use naturally — "ovulation", "luteal phase", "LH surge", "egg quality", "endometrium" appear when topically relevant

### E-E-A-T Anchors (every post)
1. `<AuthorCard />` — Dr. Rumpa credentials, GMC number, clinic affiliation
2. `<ReviewedBy date="…" />` — date + reviewer line ("Medically reviewed by Dr. Rezwana Rumpa")
3. `<ReferenceList />` — numbered citations
4. `updatedAt` in frontmatter
5. First-person clinical voice ("In my clinic…")

### Images
- **Cover (`thumbnail`):** 1200×630, JPEG ≤ 200KB, descriptive alt text (no decorative)
- **In-body:** Where they aid comprehension (cycle diagrams, hormone graphs). Always with alt text including primary keyword variant.

---

## Mistakes
*Populated over time by `/postical-reviewing`. Empty at initialisation.*

| Mistake | How Caught | Fix |
|---------|-----------|-----|

# Website Redesign — Design Spec

**Date:** 2026-05-17
**Project:** drrezwanarumpa.com — fertility & PCOS specialist portfolio
**Status:** Design approved · pending implementation plan

---

## 1. Context

Current site = generic doctor portfolio (centered headings, pill CTAs, card grid, Playfair + Inter). Feels clinical, template-y, undistinguished. Target audience (couples on fertility journey, vulnerable + hopeful) deserves an editorial, warm, distinctive brand.

**Goal:** Redesign every section. Adopt new palette, new typography, new layouts inspired by editorial healthcare sites (Joyce Gholson, drnasir, medi cure, Medicare). Keep Next.js + Tailwind v4 + shadcn + framer-motion stack. Reuse existing component slots where useful.

**Out of scope:** Backend, CMS migration, booking system change (Calendly stays), domain/SEO infrastructure changes.

---

## 2. Design Direction

**"Editorial Warmth"** — combines editorial-magazine polish (drnasir, medi cure) with hopeful palette warmth (Joyce, Medicare). Cream-mauve base, mixed sans + selective Lora italic emphasis, photo-cutout hero with mega name behind, cards-within-cards, sticker stamp accents, dark inset service panel.

---

## 3. Design System

### 3.1 Color — Adelaide mauve scale

Single-hue (315°) mauve scale, defined once in `@theme`, referenced semantically.

```css
/* app/globals.css */
@theme {
  --color-adelaide-50:  oklch(0.959 0.007 312.56);
  --color-adelaide-100: oklch(0.907 0.017 317.04);
  --color-adelaide-200: oklch(0.814 0.035 315.24);
  --color-adelaide-300: oklch(0.717 0.054 315.67);
  --color-adelaide-400: oklch(0.62  0.073 314.88);
  --color-adelaide-500: oklch(0.527 0.078 315.03);
  --color-adelaide-600: oklch(0.45  0.065 315.28);
  --color-adelaide-700: oklch(0.369 0.051 315.68);
  --color-adelaide-800: oklch(0.286 0.036 314.22);
  --color-adelaide-900: oklch(0.195 0.021 318.66);
  --color-adelaide-950: oklch(0.152 0.012 319.49);
}
```

### 3.2 Semantic tokens (light)

Existing shadcn token NAMES kept; VALUES remapped to scale.

```css
:root {
  --background:           var(--color-adelaide-50);
  --foreground:           var(--color-adelaide-950);
  --card:                 oklch(1 0 0);
  --card-foreground:      var(--color-adelaide-950);
  --popover:              oklch(1 0 0);
  --popover-foreground:   var(--color-adelaide-950);
  --primary:              var(--color-adelaide-900);
  --primary-foreground:   var(--color-adelaide-100);
  --secondary:            var(--color-adelaide-100);
  --secondary-foreground: var(--color-adelaide-800);
  --muted:                var(--color-adelaide-100);
  --muted-foreground:     var(--color-adelaide-600);
  --accent:               var(--color-adelaide-200);
  --accent-foreground:    var(--color-adelaide-800);
  --destructive:          oklch(0.577 0.245 27.325);
  --border:               var(--color-adelaide-200);
  --input:                var(--color-adelaide-200);
  --ring:                 var(--color-adelaide-500);
  --chart-1: var(--color-adelaide-300);
  --chart-2: var(--color-adelaide-500);
  --chart-3: var(--color-adelaide-700);
  --chart-4: var(--color-adelaide-900);
  --chart-5: var(--color-adelaide-200);
  --radius:  1rem;
  --sidebar:                    var(--color-adelaide-100);
  --sidebar-foreground:         var(--color-adelaide-950);
  --sidebar-primary:            var(--color-adelaide-900);
  --sidebar-primary-foreground: var(--color-adelaide-100);
  --sidebar-accent:             var(--color-adelaide-200);
  --sidebar-accent-foreground:  var(--color-adelaide-800);
  --sidebar-border:             var(--color-adelaide-200);
  --sidebar-ring:               var(--color-adelaide-500);
}
```

### 3.3 Semantic tokens (dark)

```css
.dark {
  --background:           var(--color-adelaide-950);
  --foreground:           var(--color-adelaide-50);
  --card:                 var(--color-adelaide-900);
  --card-foreground:      var(--color-adelaide-50);
  --popover:              var(--color-adelaide-900);
  --popover-foreground:   var(--color-adelaide-50);
  --primary:              var(--color-adelaide-300);
  --primary-foreground:   var(--color-adelaide-950);
  --secondary:            var(--color-adelaide-800);
  --secondary-foreground: var(--color-adelaide-100);
  --muted:                var(--color-adelaide-800);
  --muted-foreground:     var(--color-adelaide-300);
  --accent:               var(--color-adelaide-800);
  --accent-foreground:    var(--color-adelaide-100);
  --border:               oklch(1 0 0 / 10%);
  --input:                oklch(1 0 0 / 15%);
  --ring:                 var(--color-adelaide-300);
  --chart-1: var(--color-adelaide-300);
  --chart-2: var(--color-adelaide-500);
  --chart-3: var(--color-adelaide-200);
  --chart-4: var(--color-adelaide-100);
  --chart-5: var(--color-adelaide-600);
  --sidebar:                    var(--color-adelaide-900);
  --sidebar-foreground:         var(--color-adelaide-50);
  --sidebar-primary:            var(--color-adelaide-300);
  --sidebar-primary-foreground: var(--color-adelaide-950);
  --sidebar-accent:             var(--color-adelaide-800);
  --sidebar-accent-foreground:  var(--color-adelaide-100);
  --sidebar-border:             oklch(1 0 0 / 10%);
  --sidebar-ring:               var(--color-adelaide-300);
}
```

### 3.4 Typography

| Token | Family | Usage |
|---|---|---|
| `--font-sans` | **Google Sans** (fallback: DM Sans → system-ui) | All UI, body, headings |
| `--font-display` | **Lora Italic** (weights 400-700) | Emphasis words only, mega backdrop name |
| `--font-mono` | JetBrains Mono | Code blocks (blog) |

**Rules:**
- Headings = Google Sans 700-800, tight leading (1.0-1.15), negative letter-spacing on ≥48px
- Emphasis = wrap single word/phrase in `<em className="font-display">word</em>` — Lora italic, accent color (`text-adelaide-600` on light bg, `text-adelaide-300` on dark)
- Body = Google Sans 400, leading 1.55
- Label = Google Sans 600, uppercase, 11-12px, `tracking-[2px]`

**Risk:** Google Sans is Google's brand font — public Google Fonts hosting may 404. **Verification step:** test `fonts.googleapis.com/css2?family=Google+Sans` request returns CSS during implementation. **Fallback:** swap to DM Sans (closest geometric humanist sans, public Google Fonts).

**Loading approach:**
- `Lora` via `next/font/google` → `--font-display`
- `Google Sans` via `<link>` tag in `<head>` (next/font/google may not list it) → fallback chain in `--font-sans` CSS var
- Remove existing `Playfair_Display` and `Inter` imports

### 3.5 Radius, Spacing, Shadow

- Radius: scale unchanged (`--radius: 1rem`, derived sm/md/lg/xl/2xl/3xl/4xl)
- Cards: `rounded-2xl` (1.4rem) typical, `rounded-3xl` (1.8rem) for panels
- Pills/CTAs: `rounded-full`
- Section padding: `py-20` to `py-24` desktop, `py-14` mobile
- Inner card padding: `p-6` to `p-8`
- Shadow: mauve-tinted, NOT gray. `0 12px 32px oklch(0.195 0.021 318.66 / 0.08)` — defined as utility class `.shadow-mauve` in globals.css

### 3.6 Motion

framer-motion (already installed). Patterns:
- **Entrance:** `initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: "easeOut" }}`
- **Stagger:** child `delay: i * 0.08`
- **Hover:** `hover:-translate-y-1 hover:shadow-mauve transition-all duration-300`
- **Mega-name parallax** in hero: `y: scrollY * 0.3` (subtle, optional via `useScroll`)
- Respect `prefers-reduced-motion`: wrap animations in `useReducedMotion()` check

---

## 4. Page Architecture

Order (11 sections):

| # | Section | Component | Source data |
|---|---|---|---|
| 1 | Hero | `hero.tsx` (rebuilt) | `DATA.name`, `DATA.title`, `DATA.summary`, `hero.png`, `DATA.bookingUrl` |
| 2 | Meet Dr. | `meet-doctor.tsx` (rename from `about.tsx`) | `DATA.about`, `DATA.stats`, `assuring.png` |
| 3 | Services | `services.tsx` (rebuilt) | `DATA.services`, rotating `prescribing.png` / `taking.png` |
| 4 | Insights (Blog) | `insights.tsx` (rebuilt from `blog-preview.tsx`) | MDX posts in `content/blog/*.mdx` |
| 5 | How It Works | `how-it-works.tsx` (NEW) | static 3 steps + `taking.png`, `watching.png`, `prescribing.png` |
| 6 | Testimonials | `testimonials.tsx` (rebuilt) | `DATA.testimonials`, `assuring.png` overlay |
| 7 | Credentials | `credentials.tsx` (NEW, merges `qualifications.tsx` + `academics.tsx`) | `DATA.qualifications`, `DATA.academics`, `watching.png`, `operation.png` |
| 8 | FAQ | `faq.tsx` (NEW) | static fertility Q&A (add to `data/resume.ts`) |
| 9 | Final CTA | `final-cta.tsx` (NEW) | `DATA.bookingUrl`, `assuring.png` decorative |
| 10 | Contact | `contact.tsx` (rebuilt, no form) | `DATA.contact` |
| 11 | Footer | `footer.tsx` (NEW, extracted from `page.tsx`) | nav + NAP + socials |

**Components deleted:**
- `booking.tsx` (CTA absorbed into hero + final-cta)
- `qualifications.tsx`, `academics.tsx` (merged into credentials)
- `about.tsx` (renamed to `meet-doctor.tsx`)
- `flickering-grid.tsx` (only if unused; verify)

**Components reused as-is:**
- `theme-provider.tsx`, `theme-toggle.tsx`
- `dock.tsx` (review for adelaide-style update; not in scope of section structure)
- `blog-header.tsx`, `blog-list.tsx`, `blog-post-nav.tsx`, `blog-preview-list.tsx` (blog detail pages — not homepage)

---

## 5. Section Designs

### 5.1 Hero

**Pattern source:** Joyce Gholson (mega name behind cutout + 3-col header).

**Layout:**
- Full-width card, `rounded-3xl`, gradient bg `linear-gradient(180deg, adelaide-100, adelaide-200, adelaide-300)`
- Top 3-col header inside card:
  - Left col: role-stack label "Fertility Specialist / PCOS Expert / *Reproductive Endocrinology*" (last line Lora italic)
  - Center col: empty (portrait fills)
  - Right col: micro-bio "This is Dr. Rezwana Rumpa. My goal: *compassionate*, evidence-based fertility care for every couple."
- **Mega "Rumpa"** Lora italic 700, `text-adelaide-50/55`, 180-220px desktop, centered behind portrait, `z-index: 1`
- Portrait `hero.png` centered, `z-index: 2`, drop-shadow mauve
- **Sticker badges** floating:
  - Top-right: "Now accepting ✓" — adelaide-100 bg, adelaide-200 border, rotated +5deg
  - Bottom-left: "📅 New Patients · Welcoming families" — white card w/ adelaide-200 border
- Below hero card: **headline block** white card, `rounded-2xl`, padding `p-8`:
  - Eyebrow label "Fertility · PCOS · Reproductive Care"
  - Heading: `Build the family <em>you dream of.</em>` (Google Sans 800 + Lora italic emphasis)
  - 2-line description
  - CTA row: **dark primary pill** "📅 Book Consultation" + outline secondary "Explore Services"

**Nav (above hero card):** 5 nav links + brand-mark + dark primary pill "Book Session →"

### 5.2 Meet Dr.

**Pattern source:** Joyce "Meet Dr. X — Your Guide to..." with inline photo embedded in heading.

**Layout:**
- Section bg: `--background` (adelaide-50)
- Centered max-w container
- Eyebrow label "About Me" (label style)
- Headline: `Meet Dr. Rumpa [○ inline circular photo 56px from assuring.png crop] — Your <em>Guide</em> to Parenthood` (font-sans 700 + Lora italic emphasis)
- 2-paragraph body (font-sans 400, max-w-prose)
- Stat strip — 4 stat tiles, grid `grid-cols-2 md:grid-cols-4`:
  - `12+yrs` Practice
  - `500+` Families guided
  - `4.9★` Patient rating
  - `PCOS` Expert
- Each stat tile alternates background: white / adelaide-100 / adelaide-200 / adelaide-900 (dark, white text)
- Stats: number = font-sans 800 28-32px, label = label style adelaide-600

### 5.3 Services

**Pattern source:** Joyce dark services panel + drnasir nested card.

**Layout:**
- Section bg: `--background`
- Inner: **adelaide-900 dark panel** `rounded-3xl` `p-12` `text-adelaide-100`
- Inside panel, header row:
  - Left: eyebrow "Services" + heading "How I can <em>help you</em>" (Lora italic emphasis adelaide-200)
  - Right: dark sub-pill "See all →"
- 3-col grid of service tiles `bg-adelaide-800 rounded-2xl p-6`:
  - Icon (lucide, adelaide-200) 28px
  - Service name (font-sans 600 17px)
  - 1-line description (text-adelaide-300, 12px)
  - 6 services map onto `DATA.services` (PCOS Management, Ovulation Induction, etc.)
- Right of grid: **photo cell** showing `prescribing.png` `rounded-2xl` with hover swap to `taking.png` (or rotate via auto-interval)

### 5.4 Insights (Blog)

**Pattern source:** Magazine layout (1 featured + 2 secondary stack + newsletter pill).

**Layout:**
- Section bg: `--secondary` (adelaide-100) — visual rhythm break
- Container `rounded-3xl p-12`
- Header row:
  - Left: eyebrow "Reading Room" + heading "Insights & <em>Education</em>" (Lora italic) + tagline
  - Right: primary dark pill "View all articles →" (links `/blog`)
- 2-col grid `grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5`:
  - **Featured card** (left): newest post (`featured: true` or most recent). White bg, `rounded-3xl`, cover (height 280px) + body padding 28px. Cover = gradient bg + giant Lora italic word (post category) as art OR `coverImage` if present. Body = chip row (category Lora + date + read time) → heading (font-sans 800, italic emphasis on last 2-3 words) → snippet → footer row (author + read link).
  - **Right stack**: 2 secondary cards (horizontal split: 160px gradient cover left + content right) + newsletter capture pill (adelaide-900 bg, white text, input + submit).

**Frontmatter additions to existing `content/blog/*.mdx`:**
```yaml
coverImage: "/blog/<slug>-cover.jpg"     # optional; falls back to typographic cover
category: "PCOS" | "Treatment" | "Preconception" | "Fertility"
readTime: 8                              # number, optional (auto-calc from word count if absent)
featured: true                           # optional, default false
emphasisWords: ["Trying to Conceive"]   # words to wrap in Lora italic in card heading; if absent, italicize last 2-3 words
```

### 5.5 How It Works

**Pattern source:** medi cure stepped cards.

**Layout:**
- Section bg: `--background`
- Centered eyebrow "How it works" + heading "Your fertility journey, <em>step by step.</em>"
- 3-col horizontal stepped cards `grid-cols-1 md:grid-cols-3 gap-6`:

| Step | Title | Image | Body |
|---|---|---|---|
| 01 | Consultation | `taking.png` | "We meet, discuss history, set goals." |
| 02 | Diagnosis & Plan | `watching.png` | "Tests, scans, personalized treatment design." |
| 03 | Ongoing Care | `prescribing.png` | "Cycle monitoring, adjustments, support." |

- Each card: number tag (top-left, large Lora italic numeral adelaide-200), photo (square, `rounded-2xl`), title (font-sans 700), 1-line body (muted).
- Connecting arrow lines between cards (dashed adelaide-300, hidden on mobile).

### 5.6 Testimonials

**Pattern source:** drnasir stacked quote cards + Medicare reviews row.

**Layout:**
- Section bg: `--background`
- Header: eyebrow "Real stories" + heading "Trusted by <em>500+ families.</em>" centered
- Subtle `assuring.png` photo behind, masked w/ adelaide-50 70% overlay, `mix-blend-mode: multiply` (or simpler: blurred + low opacity decorative position)
- 4 quote cards in `grid-cols-1 md:grid-cols-2 gap-6` `bg-card rounded-2xl shadow-mauve p-6`:
  - Top: 5-star row (lucide Star icons, adelaide-500)
  - Quote body (font-sans 400 italic NOT used — use Lora italic for the OPENING phrase only: `<em>"After struggling..."</em> for years, Dr. Rumpa helped me...`)
  - Bottom row: circular initials chip (gradient adelaide-300 → adelaide-500) + name (font-sans 600) + role-line ("PCOS patient" / "TTC couple")

### 5.7 Credentials

**Pattern source:** Joyce stat strip + drnasir photo gallery.

**Layout:**
- Section bg: `--secondary` (adelaide-100)
- Heading "Trained at the <em>best.</em> Practicing where it <em>matters.</em>"
- 2-col layout `grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12`:
  - **Left col** — Vertical timeline of qualifications:
    - Each `DATA.qualifications` row: year on left (Lora italic adelaide-500), institution+degree right (font-sans 600), description (muted).
    - Below qualifications: subheading "Speaking & Research" → `DATA.academics` as bullet list.
  - **Right col** — Photo collage:
    - Big card: `watching.png` `rounded-2xl` (diagnostic credibility)
    - Below: 2-col mini grid — `operation.png` + `prescribing.png` smaller, `rounded-xl`
    - Each photo has caption chip in bottom-left ("Hospital X · Surgical fellowship", "Patient consultation", "Diagnostic review")

### 5.8 FAQ

**Layout:**
- Section bg: `--background`
- Header: eyebrow "FAQ" + heading "Questions <em>worth asking.</em>"
- 2-col grid `grid-cols-1 md:grid-cols-2 gap-4` of accordion items:
  - Each item: `bg-secondary rounded-2xl px-6 py-5`, `+`/`−` toggle right, question font-sans 600 17px
  - Open state: question + answer (font-sans 400, leading-relaxed)
- 6-8 fertility FAQs (add `DATA.faqs` to `data/resume.ts`):
  - What does the first consultation involve?
  - How long does PCOS treatment take?
  - Do you offer IVF? (Or referrals?)
  - What's the cost expectation?
  - How soon can I start trying after a treatment plan?
  - Do you see male partners too?
  - What insurance do you accept?
  - What if treatment doesn't work the first time?
- Use shadcn `Accordion` component (already available via shadcn install).

### 5.9 Final CTA

**Pattern source:** Joyce session card + medi cure CTA.

**Layout:**
- Full-width adelaide-900 panel `rounded-3xl p-16`, white text
- 2-col layout:
  - Left: eyebrow "Take the next step" + heading "Ready to <em>start your journey?</em>" (font-sans 800, 36-44px, Lora italic emphasis adelaide-300) + 1-line body
  - Right: vertical CTA stack:
    - Primary: adelaide-100 pill "📅 Book Consultation" (dark text)
    - Secondary: outline pill "💬 Ask a question"
    - Tertiary text link "Call +880-1XXX-XXXXXX"
- Subtle `assuring.png` decorative cutout right edge, low opacity, no priority load

### 5.10 Contact

**Layout:**
- Section bg: `--background`
- Header: eyebrow "Get in touch" + heading "Reach out — I'm <em>here to listen.</em>"
- 3-col grid `grid-cols-1 md:grid-cols-3 gap-6`:
  - Email card: icon + label + `DATA.contact.email`
  - Phone card: icon + label + `DATA.contact.phone`
  - Location card: icon + "Dhaka, Bangladesh" + optional map link
- Each card: `bg-card rounded-2xl p-6 shadow-mauve`
- Below: social row (LinkedIn, Facebook from `DATA.contact`) as outlined adelaide-300 circle buttons
- No contact form (Calendly handles booking)

### 5.11 Footer

**Layout:**
- Full-width adelaide-950 bg, white text, `py-16 px-8`
- 4-col grid:
  - Brand col: name + 1-line tagline + small portrait avatar (circle)
  - Nav col: "Explore" → Home, About, Services, Blog, Contact
  - Resources col: "Learn" → Featured posts (top 3)
  - Contact col: NAP block (Schema.org friendly), email, phone, location
- Bottom strip: copyright + "Built with care" tagline + theme toggle
- All links underlined on hover (adelaide-300)

---

## 6. Component Patterns (Reusable)

### 6.1 Sticker Badge
```tsx
<div className="absolute top-X right-X rotate-[5deg] bg-secondary border border-primary rounded-full px-3 py-1.5 text-xs font-bold">
  Now accepting ✓
</div>
```
Used on hero portrait, optionally on service tiles for "New" tags.

### 6.2 Cards-within-cards
Outer: gradient/colored panel, `rounded-3xl`. Inner: white/contrast panel, `rounded-2xl`. Pattern in hero, services, insights.

### 6.3 Italic Emphasis Helper
Add to `components/ui/em.tsx`:
```tsx
export function Em({ children, className }: { children: React.ReactNode; className?: string }) {
  return <em className={cn("font-display italic font-medium text-adelaide-600 dark:text-adelaide-300", className)}>{children}</em>;
}
```
Lora loaded via `next/font/google` with `style: ["italic"]` — italic is the only glyph set available, browser renders italic by default for `<em>`. Explicit `italic` class ensures consistent rendering.

### 6.4 Mega Backdrop Type
Reusable `<MegaBackdrop>` for hero/section-headers:
```tsx
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <span className="font-display text-[180px] leading-none tracking-tight text-adelaide-50/55 select-none">Rumpa</span>
</div>
```

### 6.5 Section Header
Reusable:
```tsx
<SectionHeader
  eyebrow="Services"
  title={<>How I can <Em>help you</Em></>}
  description="..."
  cta={{ label: "See all →", href: "/services" }}
/>
```

---

## 7. Data Model Changes

### 7.1 `data/resume.ts`
- Add `DATA.faqs: { question: string; answer: string }[]`
- Confirm `DATA.stats: { value: string; label: string }[]` exists (already used by hero — verify shape)
- Confirm `DATA.testimonials[].role` field exists or add it

### 7.2 `content/blog/*.mdx` frontmatter
Add per post:
- `coverImage` (optional path)
- `category` (string enum)
- `readTime` (number, optional)
- `featured` (boolean, optional)
- `emphasisWords` (string[], optional)

Update MDX loader (`lib/blog.ts` or equivalent — TBD path) to parse new fields. Default `readTime` from word count if absent.

---

## 8. Accessibility

- Color contrast: verify all primary/foreground pairs hit WCAG AA. Adelaide-900 on adelaide-50 = high contrast (passes). Adelaide-500 ring on adelaide-50 = use only for focus, not body text.
- `prefers-reduced-motion`: gate all framer-motion entrance + parallax via `useReducedMotion()`.
- Lora italic emphasis must NOT be the only visual carrier of meaning — emphasis words are decorative, content reads correctly without them.
- Mega backdrop name has `aria-hidden="true"` + `pointer-events-none`.
- Sticker badges: ensure not the only context for important info ("Now accepting" duplicated in CTA copy).
- Accordion (FAQ): native `<details>` or shadcn `Accordion` (Radix-based, accessible by default).
- All decorative photos have `alt=""`; meaningful photos have descriptive alt.

---

## 9. SEO

- JSON-LD `Physician` schema in `app/page.tsx` — already exists, keep + extend with new FAQ schema and Article schema for featured blog post.
- Add `FAQPage` JSON-LD on homepage (mirrors FAQ section).
- Open Graph image: regenerate `/social.png` to reflect new visual identity (adelaide palette + Lora emphasis). Out of scope but flag.
- Meta description in `app/layout.tsx`: keep existing.

---

## 10. Dark Mode

Already wired (next-themes via `ThemeProvider`). Adelaide scale supports both modes via `.dark` token block. Test all sections in both modes:
- Hero gradient inverts (adelaide-900 → adelaide-800 → adelaide-700)
- Dark services panel becomes adelaide-800 (lighter than light-mode panel for layered contrast)
- Sticker badges flip background

---

## 11. Files Touched (Estimated)

**Modify:**
- `app/globals.css` — add `@theme` scale, remap semantic tokens, add `.shadow-mauve` utility
- `app/layout.tsx` — replace Playfair + Inter with Google Sans (link) + Lora (next/font)
- `app/page.tsx` — new section order, drop standalone Booking + Qualifications + Academics imports, add new components, update JSON-LD
- `data/resume.ts` — add `faqs`, verify `stats` shape, add `role` on testimonials if absent
- `content/blog/*.mdx` (3 files) — add frontmatter fields
- `lib/blog.ts` (or MDX loader) — parse new frontmatter
- `components/hero.tsx` — rebuild
- `components/services.tsx` — rebuild
- `components/testimonials.tsx` — rebuild
- `components/contact.tsx` — rebuild (no form)
- `components/blog-preview.tsx` — rebuild → `components/insights.tsx` (rename)
- `components/dock.tsx` — adelaide palette pass

**Create:**
- `components/meet-doctor.tsx` (renamed from about)
- `components/how-it-works.tsx`
- `components/credentials.tsx` (merge target)
- `components/faq.tsx`
- `components/final-cta.tsx`
- `components/footer.tsx`
- `components/ui/em.tsx`
- `components/ui/section-header.tsx`
- `components/ui/mega-backdrop.tsx`
- `components/ui/sticker-badge.tsx`

**Delete (after migration):**
- `components/about.tsx` → renamed
- `components/booking.tsx`
- `components/qualifications.tsx`
- `components/academics.tsx`
- `components/flickering-grid.tsx` (verify unused)

---

## 12. Risks & Open Questions

1. **Google Sans availability** — fonts.google.com/specimen/Google+Sans may not be publicly hostable. Verify on first build. Fallback: DM Sans.
2. **Blog cover images** — typographic covers (default, free) vs illustrated (Midjourney/illustrator, $$). Spec defaults to typographic; can upgrade later.
3. **Asset compression** — `assests/*.png` are unoptimized photos (likely >1MB each). Implementation must convert to WebP/AVIF, generate responsive sizes via `next/image`.
4. **Newsletter capture** — pill exists in Insights section; backend not specified. Wire to existing service (Mailchimp / Buttondown / Resend Audiences)? Defer to implementation plan if no backend yet.
5. **Calendly URL** — `DATA.bookingUrl` references calendly; confirm correct/active.

---

## 13. Success Criteria

- All 11 sections rendered, in order, with adelaide palette + Google Sans + Lora italic emphasis applied
- Light + dark mode both render correctly without contrast issues
- Lighthouse: Performance ≥90, Accessibility ≥95, SEO ≥95
- `prefers-reduced-motion` respected; no auto-playing carousels
- Blog frontmatter parsed; covers (typographic fallback) render correctly
- All 5 asset photos used in correct sections per asset map
- No raw `oklch(...)` literals in component code — only semantic tokens or `adelaide-*` utilities

---

**End of spec.**

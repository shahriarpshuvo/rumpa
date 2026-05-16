# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign drrezwanarumpa.com with the "Editorial Warmth" direction defined in `docs/superpowers/specs/2026-05-17-website-redesign-design.md` — new adelaide mauve palette, Google Sans + Lora italic emphasis typography, 11 redesigned sections, magazine-style blog placement.

**Architecture:** Foundation-first (tokens, typography, primitives) → data shape changes → section rebuilds (one component per task) → page integration → validation. Each section component is self-contained; shared primitives (`Em`, `MegaBackdrop`, `StickerBadge`, `SectionHeader`) drop into multiple sections to keep DRY.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, shadcn, framer-motion, next-mdx-remote, gray-matter, lucide-react.

**Verification model:** No test framework configured. Each task verifies via `next build` (type-check + bundle), `next lint`, and visual check in browser (`pnpm dev` or `yarn dev` — repo uses yarn per yarn.lock). Frequent commits between tasks.

**Asset note:** Source photos live in `assests/` (typo, top-level). `next/image` can only serve from `public/`. Task 1 copies all asset images into `public/img/` once; all components reference `/img/<name>.png`. The `assests/` folder is left untouched (acts as raw source).

---

## File Structure

**Foundation (Phase 1):**
- Modify: `app/globals.css` — add `@theme` scale, remap semantic tokens, add `.shadow-mauve` utility
- Modify: `app/layout.tsx` — swap fonts
- Create: `components/ui/em.tsx`
- Create: `components/ui/mega-backdrop.tsx`
- Create: `components/ui/sticker-badge.tsx`
- Create: `components/ui/section-header.tsx`
- Create: `components/ui/accordion.tsx` (via `npx shadcn@latest add accordion`)
- Modify: `components/dock.tsx` — palette pass (uses tokens, mostly automatic but verify)
- Create: `public/img/*.png` — copies of `assests/*.png` (5 files)

**Data (Phase 2):**
- Modify: `data/resume.ts` — add `faqs[]`, add `role` field on testimonials
- Modify: `lib/blog.ts` — extend `BlogPostMeta` interface, parse new frontmatter
- Modify: `content/blog/understanding-pcos-guide-ttc.mdx` — frontmatter additions
- Modify: `content/blog/preconception-health-checklist.mdx` — frontmatter additions
- Modify: `content/blog/ovulation-induction-what-to-expect.mdx` — frontmatter additions

**Sections (Phase 3) — rebuild & create:**
- Modify: `components/hero.tsx` — full rebuild
- Create: `components/meet-doctor.tsx` (replaces `components/about.tsx`)
- Modify: `components/services.tsx` — rebuild as dark panel
- Modify: `components/blog-preview.tsx` → rebuild → rename to `components/insights.tsx`
- Create: `components/how-it-works.tsx`
- Modify: `components/testimonials.tsx` — rebuild
- Create: `components/credentials.tsx` (merges qualifications + academics)
- Create: `components/faq.tsx`
- Create: `components/final-cta.tsx`
- Modify: `components/contact.tsx` — rebuild (drop form)
- Create: `components/footer.tsx` (extracted from inline `<footer>` in `app/page.tsx`)

**Integration (Phase 4):**
- Modify: `app/page.tsx` — new section order + JSON-LD (add FAQPage)
- Delete: `components/about.tsx`, `components/booking.tsx`, `components/qualifications.tsx`, `components/academics.tsx`, `components/flickering-grid.tsx` (verify unused)
- Modify: `next.config.ts` — image config (if needed for remote OG/social)

**Validation (Phase 5):**
- No new files. Lighthouse + dark-mode + reduced-motion verification.

---

## Phase 1 — Foundation

### Task 1: Copy assets to public/img

**Files:**
- Create: `public/img/hero.png`
- Create: `public/img/watching.png`
- Create: `public/img/taking.png`
- Create: `public/img/prescribing.png`
- Create: `public/img/assuring.png`
- Create: `public/img/operation.png`

- [ ] **Step 1: Create target directory**

```bash
mkdir -p public/img
```

- [ ] **Step 2: Copy each asset**

```bash
cp assests/hero.png        public/img/hero.png
cp assests/watching.png    public/img/watching.png
cp assests/taking.png      public/img/taking.png
cp assests/prescribing.png public/img/prescribing.png
cp assests/assuring.png    public/img/assuring.png
cp assests/operation.png   public/img/operation.png
```

- [ ] **Step 3: Verify files present**

```bash
ls -la public/img/
```
Expected: 6 .png files visible.

- [ ] **Step 4: Commit**

```bash
git add public/img/
git commit -m "chore: copy asset photos into public/img for next/image"
```

---

### Task 2: Adelaide @theme scale + semantic token remap

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `:root` and `.dark` blocks; insert `@theme` scale**

Open `app/globals.css`. Find the block starting `@theme inline {`. **Insert before it** (after the `@custom-variant dark` line):

```css
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

- [ ] **Step 2: Replace entire `:root { … }` block**

Replace existing `:root { … }` with:

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

- [ ] **Step 3: Replace entire `.dark { … }` block**

Replace existing `.dark { … }` with:

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
  --destructive:          oklch(0.704 0.191 22.216);
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

- [ ] **Step 4: Add `.shadow-mauve` utility inside `@layer base`**

Find the `@layer base { * { @apply border-border … } body { … } html { … } }` block. **After** that block (still in globals.css), append:

```css
@utility shadow-mauve {
  box-shadow: 0 12px 32px oklch(0.195 0.021 318.66 / 0.08);
}

@utility shadow-mauve-lg {
  box-shadow: 0 24px 48px oklch(0.195 0.021 318.66 / 0.12);
}
```

(Tailwind v4 `@utility` directive creates `shadow-mauve` and `shadow-mauve-lg` classes.)

- [ ] **Step 5: Add `--font-display` mapping inside `@theme inline`**

In the existing `@theme inline { … }` block, find the line `--font-heading: var(--font-heading);` and replace it with:

```css
  --font-heading: var(--font-display);
  --font-display: var(--font-display);
```

- [ ] **Step 6: Run build to verify CSS compiles**

```bash
yarn build
```
Expected: build completes without CSS errors. (Components may still reference old `text-primary` etc — that's fine, semantic names didn't change.)

- [ ] **Step 7: Commit**

```bash
git add app/globals.css
git commit -m "feat(theme): adelaide palette + remapped semantic tokens + shadow-mauve utility"
```

---

### Task 3: Swap fonts in layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace font imports**

Open `app/layout.tsx`. Find this block:

```ts
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
```

Replace with:

```ts
import { Lora, DM_Sans, JetBrains_Mono } from "next/font/google";
```

(`DM_Sans` is the fallback we use until Google Sans loads via `<link>` — variable used everywhere. Google Sans link goes in `<head>`.)

- [ ] **Step 2: Replace font constants**

Find the const declarations for `inter` and `playfair`. Replace both with:

```ts
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
```

Keep `jetbrainsMono` unchanged.

- [ ] **Step 3: Update root layout `<html>` className**

Find the `<html>` element. Update its `className` from `cn(inter.variable, playfair.variable, jetbrainsMono.variable, …)` to:

```tsx
<html lang="en" suppressHydrationWarning className={cn(dmSans.variable, lora.variable, jetbrainsMono.variable)}>
```

- [ ] **Step 4: Add Google Sans `<link>` in `<head>`**

Inside the `<head>` of the root layout (Next 16 supports raw `<head>` in layout — if the existing layout uses metadata for head content, add a `<head>` element inside `<html>` above `<body>` OR use `<link>` inside `<body>` via `<head>` block — Next 16 supports both. Use the head element form):

Find where the `<head>` is (or its `<html>` opens then directly `<body>`). Insert before `<body>`:

```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
</head>
```

- [ ] **Step 5: Update `--font-sans` fallback chain in globals.css `@theme inline`**

Open `app/globals.css`. Find the line `--font-sans: var(--font-sans);` inside `@theme inline`. Replace with:

```css
  --font-sans: "Google Sans", var(--font-sans), system-ui, sans-serif;
```

This puts Google Sans first (when loaded via `<link>`), falls back to DM Sans (via `--font-sans` from next/font), then system-ui.

- [ ] **Step 6: Build and visually inspect homepage**

```bash
yarn dev
```

Open `http://localhost:3000`. Check fonts in DevTools Network tab:
- `googleapis.com/css2?family=Google+Sans` — request fires (may 200 OK or 404)
- DM Sans woff2 files load from `_next/static/media/`
- Lora italic woff2 files load

**If Google Sans returns 404:** It is restricted. Edit `app/globals.css` `--font-sans` line again to drop Google Sans, leaving:

```css
  --font-sans: var(--font-sans), system-ui, sans-serif;
```

…and remove the 3 Google Sans `<link>` tags from `app/layout.tsx`.

- [ ] **Step 7: Stop dev server, commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat(fonts): Google Sans + Lora italic, remove Playfair + Inter"
```

---

### Task 4: Create `Em` italic emphasis primitive

**Files:**
- Create: `components/ui/em.tsx`

- [ ] **Step 1: Write file**

```tsx
import { cn } from "@/lib/utils";

export function Em({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <em
      className={cn(
        "font-display italic font-medium text-adelaide-600 dark:text-adelaide-300",
        className,
      )}
    >
      {children}
    </em>
  );
}
```

- [ ] **Step 2: Verify import path resolves**

```bash
yarn build
```
Expected: build succeeds (no usages yet, just the file).

- [ ] **Step 3: Commit**

```bash
git add components/ui/em.tsx
git commit -m "feat(ui): Em italic emphasis primitive (Lora display)"
```

---

### Task 5: Create `MegaBackdrop` primitive

**Files:**
- Create: `components/ui/mega-backdrop.tsx`

- [ ] **Step 1: Write file**

```tsx
import { cn } from "@/lib/utils";

export function MegaBackdrop({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center select-none",
        className,
      )}
    >
      <span className="font-display italic font-bold leading-none tracking-tighter text-adelaide-50/55 text-[140px] sm:text-[180px] lg:text-[220px]">
        {children}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
yarn build
```
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add components/ui/mega-backdrop.tsx
git commit -m "feat(ui): MegaBackdrop oversized italic word for section backgrounds"
```

---

### Task 6: Create `StickerBadge` primitive

**Files:**
- Create: `components/ui/sticker-badge.tsx`

- [ ] **Step 1: Write file**

```tsx
import { cn } from "@/lib/utils";

interface StickerBadgeProps {
  children: React.ReactNode;
  rotate?: number;
  variant?: "light" | "dark";
  className?: string;
}

export function StickerBadge({
  children,
  rotate = 5,
  variant = "light",
  className,
}: StickerBadgeProps) {
  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border-2",
        variant === "light"
          ? "bg-secondary text-primary border-primary"
          : "bg-primary text-primary-foreground border-primary-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/sticker-badge.tsx
git commit -m "feat(ui): StickerBadge rotated pill accent"
```

---

### Task 7: Create `SectionHeader` primitive

**Files:**
- Create: `components/ui/section-header.tsx`

- [ ] **Step 1: Write file**

```tsx
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  cta?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  cta,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center" : "items-start",
        cta && "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", alignClass)}>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-adelaide-500">
          {eyebrow}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground max-w-2xl">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/section-header.tsx
git commit -m "feat(ui): SectionHeader (eyebrow + title + optional CTA)"
```

---

### Task 8: Install shadcn Accordion

**Files:**
- Create: `components/ui/accordion.tsx`

- [ ] **Step 1: Install via shadcn CLI**

```bash
npx shadcn@latest add accordion --yes
```
Expected: creates `components/ui/accordion.tsx` and may add `@radix-ui/react-accordion` to `package.json`.

- [ ] **Step 2: Verify file present**

```bash
ls components/ui/accordion.tsx
```
Expected: file exists.

- [ ] **Step 3: Build**

```bash
yarn build
```
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add components/ui/accordion.tsx package.json yarn.lock
git commit -m "feat(ui): add shadcn Accordion"
```

---

## Phase 2 — Data

### Task 9: Add FAQ data + testimonial roles

**Files:**
- Modify: `data/resume.ts`

- [ ] **Step 1: Add `role` field to each testimonial**

In `data/resume.ts`, update each entry of `testimonials` array. Replace the entire `testimonials` array with:

```ts
  testimonials: [
    {
      name: "Fatima R.",
      role: "PCOS Patient · Now mother",
      text: "After struggling with PCOS for years, Dr. Rumpa helped me understand my condition and created a treatment plan that worked. Within 6 months, we received the best news of our lives. She truly cares about her patients.",
      rating: 5,
    },
    {
      name: "Nusrat & Tanvir",
      role: "TTC Couple · Conceived 2025",
      text: "We had been trying to conceive for over two years. Dr. Rumpa's thorough assessment identified the issue quickly, and her compassionate approach made the entire journey bearable. We are forever grateful.",
      rating: 5,
    },
    {
      name: "Sharmin A.",
      role: "PCOS Patient",
      text: "Dr. Rumpa doesn't just treat you medically — she supports you emotionally too. Her knowledge of PCOS is exceptional, and she explains everything in a way that's easy to understand. Highly recommended!",
      rating: 5,
    },
    {
      name: "Taslima & Rafiq",
      role: "Fertility Treatment Couple",
      text: "From our first consultation, we felt hopeful. Dr. Rumpa's personalized approach and constant monitoring made all the difference. She celebrated every milestone with us as if it were her own.",
      rating: 5,
    },
  ],
```

- [ ] **Step 2: Add `faqs` array after `stats`**

In `data/resume.ts`, find the `stats: […]` array. Right after the closing `],` of `stats`, add:

```ts
  faqs: [
    {
      question: "What does the first consultation involve?",
      answer:
        "Your first visit is a 45–60 minute conversation. We'll review your medical and reproductive history, discuss your goals, and outline next-step investigations — typically hormonal blood tests and a transvaginal ultrasound. No procedures happen on day one unless you're already prepared.",
    },
    {
      question: "How long does PCOS treatment usually take?",
      answer:
        "PCOS management is ongoing rather than a fixed course. Most patients see meaningful symptom improvement within 3–6 months once a personalized plan (medication, lifestyle, and monitoring) is in place. For couples trying to conceive, ovulation often returns within 1–3 treatment cycles.",
    },
    {
      question: "Do you offer IVF? Or only initial fertility care?",
      answer:
        "My practice focuses on diagnosis, ovulation induction, timed intercourse, and IUI prep. For cases that need IVF, I work closely with trusted IVF centers in Dhaka — your records, plan, and monitoring stay continuous so the handover is seamless.",
    },
    {
      question: "What should I expect to spend?",
      answer:
        "Consultation fees are transparent and shared at booking. Treatment costs depend on the plan (medications, ultrasound monitoring, lab tests). I'll always discuss costs upfront before any new investigation or prescription so there are no surprises.",
    },
    {
      question: "How soon can I start trying after a treatment plan?",
      answer:
        "For ovulation-induction cycles, we usually begin in the next menstrual cycle after baseline tests are clear. For preconception optimization, I recommend 2–3 months of preparation before active TTC to give your body the best foundation.",
    },
    {
      question: "Do you see male partners too?",
      answer:
        "Yes. Fertility is a two-person problem — male-factor contributes to roughly 40% of cases. I evaluate both partners and refer for semen analysis at your first or second visit. Partners are encouraged at every consultation.",
    },
    {
      question: "What if treatment doesn't work the first cycle?",
      answer:
        "Most fertility treatments need 3–6 cycles to fairly evaluate. After each cycle we review what worked, adjust dosing or approach, and update the plan together. The path is iterative, not linear.",
    },
    {
      question: "Can I book virtually if I'm outside Dhaka?",
      answer:
        "Yes — initial consultations and follow-ups can be conducted online via secure video. In-person visits are needed for ultrasound monitoring and certain procedures, but much of the journey can be supported remotely.",
    },
  ],
```

(Place inside the `DATA` object literal, before the closing `} as const;`.)

- [ ] **Step 3: Type-check**

```bash
yarn build
```
Expected: success. (`as const` will preserve the new types.)

- [ ] **Step 4: Commit**

```bash
git add data/resume.ts
git commit -m "feat(data): add faqs + role field on testimonials"
```

---

### Task 10: Extend blog loader for new frontmatter

**Files:**
- Modify: `lib/blog.ts`

- [ ] **Step 1: Update interfaces**

Open `lib/blog.ts`. Replace the `BlogPost` and `BlogPostMeta` interfaces with:

```ts
export type BlogCategory = "PCOS" | "Treatment" | "Preconception" | "Fertility";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  coverImage?: string;
  category?: BlogCategory;
  readTime?: number;
  featured?: boolean;
  emphasisWords?: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
```

- [ ] **Step 2: Add read-time calc helper**

Right after the `BLOG_DIR` const declaration, add:

```ts
function calcReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
```

- [ ] **Step 3: Update `getAllPosts` to parse new fields**

Replace the body of `getAllPosts` map callback with:

```ts
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      description: data.description ?? "",
      coverImage: data.coverImage,
      category: data.category as BlogCategory | undefined,
      readTime: data.readTime ?? calcReadTime(content),
      featured: data.featured ?? false,
      emphasisWords: data.emphasisWords,
    };
  });
```

- [ ] **Step 4: Update `getPostBySlug` similarly**

Replace the `return {…}` block inside `getPostBySlug` with:

```ts
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    coverImage: data.coverImage,
    category: data.category as BlogCategory | undefined,
    readTime: data.readTime ?? calcReadTime(content),
    featured: data.featured ?? false,
    emphasisWords: data.emphasisWords,
    content,
  };
```

- [ ] **Step 5: Build**

```bash
yarn build
```
Expected: success. (Existing MDX files have no new fields → loader returns undefined for new optional ones, fine.)

- [ ] **Step 6: Commit**

```bash
git add lib/blog.ts
git commit -m "feat(blog): extend loader with coverImage, category, readTime, featured, emphasisWords"
```

---

### Task 11: Add frontmatter to existing blog posts

**Files:**
- Modify: `content/blog/understanding-pcos-guide-ttc.mdx`
- Modify: `content/blog/preconception-health-checklist.mdx`
- Modify: `content/blog/ovulation-induction-what-to-expect.mdx`

- [ ] **Step 1: Update PCOS post frontmatter**

In `content/blog/understanding-pcos-guide-ttc.mdx`, replace the existing frontmatter block at the top (between `---` lines) with:

```yaml
---
title: "Understanding PCOS: A Complete Guide for Women Trying to Conceive"
date: "2026-05-01"
description: "Polycystic Ovary Syndrome affects 1 in 10 women of reproductive age. Learn about the symptoms, diagnosis, and fertility treatment options available."
category: "PCOS"
featured: true
emphasisWords: ["Trying to Conceive"]
---
```

- [ ] **Step 2: Update Preconception post frontmatter**

In `content/blog/preconception-health-checklist.mdx`, replace frontmatter with:

```yaml
---
title: "Preparing for Pregnancy: Your Preconception Health Checklist"
date: "2026-04-15"
description: "A comprehensive guide to optimizing your health before trying to conceive, from nutrition and supplements to medical checkups and lifestyle changes."
category: "Preconception"
emphasisWords: ["Checklist"]
---
```

- [ ] **Step 3: Update Ovulation post frontmatter**

In `content/blog/ovulation-induction-what-to-expect.mdx`, replace frontmatter with:

```yaml
---
title: "Ovulation Induction: What to Expect During Treatment"
date: "2026-03-20"
description: "A detailed overview of ovulation induction therapy — how it works, what medications are used, and what to expect during the treatment cycle."
category: "Treatment"
emphasisWords: ["Expect"]
---
```

- [ ] **Step 4: Build**

```bash
yarn build
```
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add content/blog/
git commit -m "feat(blog): add category, featured, emphasisWords frontmatter"
```

---

## Phase 3 — Section Components

> **Convention for all section components:**
> - `"use client"` directive at top (framer-motion needs it)
> - Wrap each section in `<section id="anchor" className="…">…</section>`
> - Use `import { motion } from "framer-motion";` for entrance animations
> - Respect reduced-motion via `import { useReducedMotion } from "framer-motion"` where applicable
> - All photos use `next/image`'s `<Image>` with explicit width/height OR `fill` + parent `relative`

### Task 12: Rebuild Hero

**Files:**
- Modify: `components/hero.tsx`

- [ ] **Step 1: Replace entire file contents**

```tsx
"use client";

import { motion } from "framer-motion";
import { CalendarHeart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";
import { MegaBackdrop } from "@/components/ui/mega-backdrop";
import { StickerBadge } from "@/components/ui/sticker-badge";

export function Hero() {
  return (
    <section id="hero" className="px-4 sm:px-6 pt-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-gradient-to-b from-adelaide-100 via-adelaide-200 to-adelaide-300 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
      >
        {/* mega backdrop name */}
        <MegaBackdrop className="-top-6">Rumpa</MegaBackdrop>

        {/* 3-col header */}
        <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="text-sm sm:text-base font-medium leading-relaxed text-adelaide-900">
            Fertility Specialist
            <br />
            PCOS Expert
            <br />
            <Em>Reproductive Endocrinology</Em>
          </div>
          <div className="hidden sm:block" />
          <div className="text-xs sm:text-sm leading-relaxed text-adelaide-800 sm:text-right">
            This is Dr. Rezwana Rumpa.
            <br />
            My goal: <Em>compassionate,</Em>
            <br />
            evidence-based fertility care
            <br />
            for every couple's journey.
          </div>
        </div>

        {/* portrait */}
        <div className="relative z-10 mt-6 flex justify-center">
          <div className="relative">
            <Image
              src="/img/hero.png"
              alt={`${DATA.name}, ${DATA.title}`}
              width={420}
              height={520}
              priority
              className="h-[360px] w-auto object-contain object-bottom drop-shadow-[0_18px_28px_rgba(35,26,34,0.25)] sm:h-[440px] lg:h-[520px]"
            />
            <StickerBadge className="absolute -top-2 -right-2 sm:-right-6">
              <Sparkles className="size-3" />
              Now accepting ✓
            </StickerBadge>
          </div>
        </div>
      </motion.div>

      {/* headline block under hero card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="mx-auto mt-5 max-w-7xl rounded-3xl bg-card p-7 sm:p-10 shadow-mauve"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
          Fertility · PCOS · Reproductive Care
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
          Build the family <Em>you dream of.</Em>
        </h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {DATA.summary}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={DATA.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-mauve hover:-translate-y-0.5"
          >
            <CalendarHeart className="size-4" />
            Book Consultation
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-adelaide-300 text-sm font-medium text-foreground hover:bg-secondary transition-all"
          >
            Explore Services
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```
Expected: success.

- [ ] **Step 3: Visual check**

```bash
yarn dev
```
Open `http://localhost:3000`. Verify:
- Hero card has gradient mauve bg
- "Rumpa" Lora italic visible behind portrait
- Sticker "Now accepting ✓" rotated, top-right
- Headline "Build the family *you dream of.*" — emphasis is Lora italic in mauve
- CTAs render: dark primary + outline secondary

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add components/hero.tsx
git commit -m "feat(hero): rebuild with Joyce-pattern + adelaide gradient + mega backdrop"
```

---

### Task 13: Create Meet Doctor (replaces About)

**Files:**
- Create: `components/meet-doctor.tsx`

- [ ] **Step 1: Write file**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function MeetDoctor() {
  return (
    <section id="about" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="block text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500"
        >
          About Me
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-foreground"
        >
          Meet Dr. Rumpa{" "}
          <span className="inline-block align-middle">
            <Image
              src="/img/assuring.png"
              alt=""
              width={56}
              height={56}
              className="size-12 sm:size-14 rounded-full object-cover ring-2 ring-adelaide-200"
            />
          </span>{" "}
          — Your <Em>Guide</Em> to Parenthood
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          {DATA.about}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {DATA.stats.map((stat, i) => {
            const variants = [
              "bg-card text-foreground",
              "bg-adelaide-100 text-foreground",
              "bg-adelaide-200 text-adelaide-900",
              "bg-primary text-primary-foreground",
            ] as const;
            return (
              <div
                key={stat.label}
                className={`rounded-2xl p-5 sm:p-6 ${variants[i % 4]}`}
              >
                <div className="font-display italic font-semibold text-3xl sm:text-4xl leading-none">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium opacity-80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/meet-doctor.tsx
git commit -m "feat(meet-doctor): create with inline portrait headline + stat strip"
```

---

### Task 14: Rebuild Services as dark panel

**Files:**
- Modify: `components/services.tsx`

- [ ] **Step 1: Replace entire file**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Stethoscope,
  Activity,
  Baby,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

const ICONS = [Heart, Stethoscope, Activity, Baby, ClipboardList, ShieldCheck];

export function Services() {
  return (
    <section id="services" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-adelaide-900 text-adelaide-100 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-300">
              Services
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
              How I can <Em className="text-adelaide-200">help you</Em>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-adelaide-300/90 leading-relaxed">
              Comprehensive fertility care tailored to your unique journey.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-adelaide-800 text-adelaide-100 text-sm font-semibold hover:bg-adelaide-700 transition-colors self-start lg:self-auto"
          >
            See all →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DATA.services.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl bg-adelaide-800/80 p-6 hover:bg-adelaide-800 transition-colors"
              >
                <div className="size-11 rounded-xl bg-adelaide-700/60 flex items-center justify-center mb-4">
                  <Icon className="size-5 text-adelaide-200" />
                </div>
                <h3 className="text-lg font-semibold leading-snug">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-adelaide-300/80 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* photo cell */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 items-stretch">
          <div className="relative aspect-[4/3] lg:aspect-auto rounded-2xl overflow-hidden">
            <Image
              src="/img/prescribing.png"
              alt="Dr. Rumpa at her desk reviewing patient records"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="rounded-2xl bg-adelaide-800/50 p-8 flex flex-col justify-center">
            <p className="text-lg sm:text-xl font-display italic font-medium text-adelaide-100 leading-relaxed">
              "Every patient is unique. The plan should be too."
            </p>
            <p className="mt-4 text-sm text-adelaide-300">
              — Dr. Rezwana Rumpa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/services.tsx
git commit -m "feat(services): rebuild as dark adelaide-900 panel with quote cell"
```

---

### Task 15: Rebuild blog-preview → insights.tsx

**Files:**
- Create: `components/insights.tsx`
- Delete: `components/blog-preview.tsx`

- [ ] **Step 1: Create `components/insights.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, type BlogPostMeta } from "@/lib/blog";
import { Em } from "@/components/ui/em";

const CATEGORY_GRADIENTS: Record<string, string> = {
  PCOS: "from-adelaide-200 via-adelaide-300 to-adelaide-500",
  Treatment: "from-adelaide-300 via-adelaide-400 to-adelaide-600",
  Preconception: "from-adelaide-100 to-adelaide-300",
  Fertility: "from-adelaide-200 to-adelaide-400",
  default: "from-adelaide-100 to-adelaide-300",
};

function gradient(category?: string) {
  return CATEGORY_GRADIENTS[category ?? "default"] ?? CATEGORY_GRADIENTS.default;
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function applyEmphasis(title: string, words?: string[]) {
  if (!words || words.length === 0) {
    // default: italicize last 2 words
    const parts = title.split(" ");
    if (parts.length < 3) return <>{title}</>;
    const head = parts.slice(0, -2).join(" ");
    const tail = parts.slice(-2).join(" ");
    return (
      <>
        {head} <Em>{tail}</Em>
      </>
    );
  }
  // replace first occurrence of each emphasis phrase with Em
  const pattern = words
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`(${pattern})`, "i");
  const parts = title.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? <Em key={i}>{part}</Em> : <span key={i}>{part}</span>
      )}
    </>
  );
}

function FeaturedCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-3xl bg-card overflow-hidden shadow-mauve hover:shadow-mauve-lg transition-shadow"
    >
      <div
        className={`relative h-64 sm:h-72 bg-gradient-to-br ${gradient(post.category)} flex items-center justify-center overflow-hidden`}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        ) : (
          <span className="font-display italic font-semibold text-7xl sm:text-8xl text-adelaide-50/55 tracking-tighter leading-none">
            {post.category ?? "Read"}
          </span>
        )}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-adelaide-950/70 backdrop-blur px-3 py-1 text-xs font-semibold text-adelaide-100">
          <span className="size-1.5 rounded-full bg-adelaide-300" />
          Featured
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.category && <Em className="text-sm">{post.category}</Em>}
          <span className="opacity-30">·</span>
          <span>{formatDate(post.date)}</span>
          {post.readTime && (
            <>
              <span className="opacity-30">·</span>
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>
        <h3 className="mt-3 text-2xl sm:text-[28px] font-extrabold leading-tight tracking-tight text-foreground group-hover:text-adelaide-700 transition-colors">
          {applyEmphasis(post.title, post.emphasisWords)}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.description}
        </p>
        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">Dr. Rezwana Rumpa</strong>
          </div>
          <span className="text-sm font-semibold text-foreground group-hover:translate-x-1 transition-transform">
            Read article →
          </span>
        </div>
      </div>
    </Link>
  );
}

function SecondaryCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-1 rounded-3xl bg-card overflow-hidden shadow-mauve hover:shadow-mauve-lg transition-shadow"
    >
      <div
        className={`relative w-40 flex-shrink-0 bg-gradient-to-br ${gradient(post.category)} flex items-center justify-center`}
      >
        {post.coverImage ? (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="160px" />
        ) : (
          <span className="font-display italic font-semibold text-3xl text-adelaide-100 leading-none text-center px-2">
            {post.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {post.category && <Em className="text-sm">{post.category}</Em>}
          {post.readTime && (
            <>
              <span className="opacity-30">·</span>
              <span>{post.readTime} min</span>
            </>
          )}
        </div>
        <h3 className="mt-2 text-base sm:text-lg font-bold leading-snug text-foreground group-hover:text-adelaide-700 transition-colors">
          {applyEmphasis(post.title, post.emphasisWords)}
        </h3>
        <div className="mt-auto pt-3 text-xs text-muted-foreground">
          {formatDate(post.date)} · Read →
        </div>
      </div>
    </Link>
  );
}

export function Insights() {
  const all = getAllPosts();
  if (all.length === 0) return null;

  const featured = all.find((p) => p.featured) ?? all[0];
  const secondaries = all.filter((p) => p.slug !== featured.slug).slice(0, 2);

  return (
    <section id="insights" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-secondary px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
              Reading Room
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
              Insights &amp; <Em>Education</Em>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Evidence-based fertility guidance, written for couples who want
              to understand — not just be told.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors self-start lg:self-auto"
          >
            View all articles →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">
          <FeaturedCard post={featured} />
          <div className="flex flex-col gap-5">
            {secondaries.map((post) => (
              <SecondaryCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete old blog-preview component**

```bash
git rm components/blog-preview.tsx
```

- [ ] **Step 3: Build**

```bash
yarn build
```
Expected: success. (`page.tsx` still imports old component; will fix in Task 23. Build may fail because of stale import — if so, temporarily comment out the `<BlogPreview />` line in `app/page.tsx`. We'll do the full swap in Task 23.)

If build fails on missing `BlogPreview`:
- Open `app/page.tsx`
- Comment out: `// import { BlogPreview } from "@/components/blog-preview";`
- Comment out: `// <BlogPreview />` in JSX
- Re-run `yarn build`

- [ ] **Step 4: Commit**

```bash
git add components/insights.tsx app/page.tsx
git commit -m "feat(insights): magazine-layout blog preview (replaces blog-preview)"
```

---

### Task 16: Create How It Works

**Files:**
- Create: `components/how-it-works.tsx`

- [ ] **Step 1: Write file**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Em } from "@/components/ui/em";

const STEPS = [
  {
    n: "01",
    title: "Consultation",
    body: "We meet — in person or online — to review your history, goals, and concerns. No procedures on day one, just a real conversation.",
    img: "/img/taking.png",
    alt: "Dr. Rumpa taking history from a couple",
  },
  {
    n: "02",
    title: "Diagnosis & Plan",
    body: "Targeted blood work, ultrasound, and partner assessment. From the results we build a personalized treatment roadmap together.",
    img: "/img/watching.png",
    alt: "Dr. Rumpa reviewing imaging on a lightbox",
  },
  {
    n: "03",
    title: "Ongoing Care",
    body: "Cycle monitoring, medication adjustments, lifestyle coaching, and emotional support. Iteration, not guesswork.",
    img: "/img/prescribing.png",
    alt: "Dr. Rumpa writing a treatment plan at her desk",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            How it works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Your fertility journey, <Em>step by step.</Em>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Clear, predictable, paced to your needs. Here's what working
            together looks like.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl bg-card p-6 shadow-mauve"
            >
              <div className="flex items-start justify-between">
                <span className="font-display italic font-bold text-6xl leading-none text-adelaide-200">
                  {step.n}
                </span>
                <div className="size-2 rounded-full bg-adelaide-400 mt-3" />
              </div>
              <div className="relative mt-6 aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={step.img}
                  alt={step.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/how-it-works.tsx
git commit -m "feat(how-it-works): 3-step process card row with photos"
```

---

### Task 17: Rebuild Testimonials

**Files:**
- Modify: `components/testimonials.tsx`

- [ ] **Step 1: Replace entire file**

```tsx
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

function pickEmphasis(text: string): { lead: string; rest: string } {
  // emphasize the first phrase up to a comma or period (≤ 60 chars)
  const match = text.match(/^([^,.]{8,60}[,.])/);
  if (!match) return { lead: "", rest: text };
  return { lead: match[1], rest: text.slice(match[1].length).trimStart() };
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
  return (
    <div className="size-10 shrink-0 rounded-full bg-gradient-to-br from-adelaide-300 to-adelaide-500 text-adelaide-50 font-bold text-sm flex items-center justify-center">
      {letters}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            Real stories
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Trusted by <Em>500+ families.</Em>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            A few voices from couples I've had the privilege to support.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {DATA.testimonials.map((t, i) => {
            const { lead, rest } = pickEmphasis(t.text);
            return (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-3xl bg-card p-7 shadow-mauve"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="size-4 fill-adelaide-500 text-adelaide-500"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-base text-foreground leading-relaxed">
                  {lead && <Em>{`"${lead.replace(/[,.]$/, "")}"`}</Em>}
                  {lead && " "}
                  {rest}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Initials name={t.name} />
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/testimonials.tsx
git commit -m "feat(testimonials): rebuild with initials chip + role + italic lead phrase"
```

---

### Task 18: Create Credentials (merges Qualifications + Academics)

**Files:**
- Create: `components/credentials.tsx`

- [ ] **Step 1: Write file**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function Credentials() {
  return (
    <section id="credentials" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-secondary px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            Credentials
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Trained at the <Em>best.</Em>
            <br />
            Practicing where it <Em>matters.</Em>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: qualifications + academics */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-adelaide-600">
              Education & Fellowship
            </h3>
            <ol className="mt-6 space-y-6 border-l-2 border-adelaide-300 pl-6">
              {DATA.qualifications.map((q, i) => (
                <motion.li
                  key={q.degree}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative"
                >
                  <span className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-adelaide-500 ring-4 ring-secondary" />
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-display italic font-semibold text-lg text-adelaide-600">
                      {q.year}
                    </span>
                    <span className="font-bold text-foreground">{q.degree}</span>
                  </div>
                  <div className="mt-1 text-sm text-foreground/80">
                    {q.institution}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {q.description}
                  </div>
                </motion.li>
              ))}
            </ol>

            <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-adelaide-600">
              Speaking &amp; Research
            </h3>
            <ul className="mt-5 space-y-4">
              {DATA.academics.map((a, i) => (
                <motion.li
                  key={a.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl bg-card p-5"
                >
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h4 className="font-semibold text-foreground">{a.title}</h4>
                    <span className="font-display italic text-sm text-adelaide-600">
                      {a.year}
                    </span>
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-adelaide-500">
                    {a.role}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {a.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: photo collage */}
          <div className="flex flex-col gap-4">
            <figure className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-mauve">
              <Image
                src="/img/watching.png"
                alt="Dr. Rumpa reviewing diagnostic imaging"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-adelaide-950/70 backdrop-blur px-3 py-1.5 text-xs font-semibold text-adelaide-100">
                Diagnostic review
              </figcaption>
            </figure>
            <div className="grid grid-cols-2 gap-4">
              <figure className="relative aspect-square rounded-2xl overflow-hidden shadow-mauve">
                <Image
                  src="/img/operation.png"
                  alt="Dr. Rumpa in surgical scrubs at the operating theater"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 22vw"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-adelaide-950/70 backdrop-blur px-2.5 py-1 text-[10px] font-semibold text-adelaide-100">
                  Surgical practice
                </figcaption>
              </figure>
              <figure className="relative aspect-square rounded-2xl overflow-hidden shadow-mauve">
                <Image
                  src="/img/prescribing.png"
                  alt="Dr. Rumpa during a patient consultation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 22vw"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-adelaide-950/70 backdrop-blur px-2.5 py-1 text-[10px] font-semibold text-adelaide-100">
                  Consultation
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/credentials.tsx
git commit -m "feat(credentials): merge qualifications + academics, add proof photo collage"
```

---

### Task 19: Create FAQ

**Files:**
- Create: `components/faq.tsx`

- [ ] **Step 1: Write file**

```tsx
"use client";

import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Questions <Em>worth asking.</Em>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
            The things patients usually want to know before booking.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
          {DATA.faqs.map((f, i) => (
            <Accordion key={i} type="single" collapsible>
              <AccordionItem
                value={`item-${i}`}
                className="rounded-2xl bg-secondary border-0 px-6 data-[state=open]:bg-card data-[state=open]:shadow-mauve transition-all"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold py-5 hover:no-underline">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed pb-5">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/faq.tsx
git commit -m "feat(faq): accordion grid with 8 fertility FAQs"
```

---

### Task 20: Create Final CTA banner

**Files:**
- Create: `components/final-cta.tsx`

- [ ] **Step 1: Write file**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarHeart, MessageCircle } from "lucide-react";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

export function FinalCTA() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-adelaide-900 text-adelaide-100 px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-300">
              Take the next step
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Ready to <Em className="text-adelaide-200">start your journey?</Em>
            </h2>
            <p className="mt-4 max-w-xl text-sm sm:text-base text-adelaide-300/90 leading-relaxed">
              First consultations book within a week. Whether you're early in
              the journey or have been trying for years, the next step is a
              conversation.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={DATA.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-adelaide-100 text-adelaide-900 text-sm font-semibold hover:bg-white transition-colors"
            >
              <CalendarHeart className="size-4" />
              Book Consultation
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-adelaide-300/40 text-adelaide-100 text-sm font-medium hover:bg-adelaide-800 transition-colors"
            >
              <MessageCircle className="size-4" />
              Ask a question
            </Link>
            <Link
              href={`tel:${DATA.contact.phone.replace(/[^+\d]/g, "")}`}
              className="text-center text-sm text-adelaide-300 hover:text-adelaide-100 transition-colors mt-2"
            >
              or call {DATA.contact.phone}
            </Link>
          </div>
        </div>

        {/* decorative photo right edge, large screens only */}
        <div className="hidden lg:block absolute -right-12 -top-8 w-[340px] h-[120%] opacity-25 pointer-events-none">
          <Image
            src="/img/assuring.png"
            alt=""
            fill
            className="object-cover object-left"
            sizes="340px"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-adelaide-900" />
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/final-cta.tsx
git commit -m "feat(final-cta): full-width dark CTA banner with decorative photo"
```

---

### Task 21: Rebuild Contact (no form)

**Files:**
- Modify: `components/contact.tsx`

- [ ] **Step 1: Replace entire file**

```tsx
"use client";

import { Mail, Phone, MapPin, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Em } from "@/components/ui/em";

const CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: DATA.contact.email,
    href: `mailto:${DATA.contact.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: DATA.contact.phone,
    href: `tel:${DATA.contact.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: DATA.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(DATA.location)}`,
  },
];

export function Contact() {
  return (
    <section id="contact" className="px-4 sm:px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-adelaide-500">
            Get in touch
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground">
            Reach out — I'm <Em>here to listen.</Em>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map(({ icon: Icon, label, value, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-2xl bg-card p-6 shadow-mauve hover:-translate-y-1 hover:shadow-mauve-lg transition-all"
            >
              <div className="size-11 rounded-xl bg-secondary flex items-center justify-center">
                <Icon className="size-5 text-adelaide-700" />
              </div>
              <div className="mt-4 text-xs uppercase tracking-wider text-adelaide-500 font-semibold">
                {label}
              </div>
              <div className="mt-1 text-sm sm:text-base font-medium text-foreground break-words">
                {value}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            href={DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="size-11 rounded-full border border-adelaide-300 flex items-center justify-center text-adelaide-700 hover:bg-secondary transition-colors"
          >
            <Linkedin className="size-4" />
          </Link>
          <Link
            href={DATA.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="size-11 rounded-full border border-adelaide-300 flex items-center justify-center text-adelaide-700 hover:bg-secondary transition-colors"
          >
            <Facebook className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/contact.tsx
git commit -m "feat(contact): rebuild as 3-card grid + social row (no form)"
```

---

### Task 22: Create Footer component

**Files:**
- Create: `components/footer.tsx`

- [ ] **Step 1: Write file**

```tsx
import Link from "next/link";
import { Linkedin, Facebook } from "lucide-react";
import { DATA } from "@/data/resume";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-adelaide-950 text-adelaide-100 mt-12">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="font-display italic font-semibold text-2xl text-adelaide-100">
            {DATA.name}
          </div>
          <p className="mt-3 text-sm text-adelaide-300/80 leading-relaxed">
            {DATA.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-adelaide-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-adelaide-300">
            <li><Link href="#hero" className="hover:text-adelaide-100 transition-colors">Home</Link></li>
            <li><Link href="#about" className="hover:text-adelaide-100 transition-colors">About</Link></li>
            <li><Link href="#services" className="hover:text-adelaide-100 transition-colors">Services</Link></li>
            <li><Link href="/blog" className="hover:text-adelaide-100 transition-colors">Blog</Link></li>
            <li><Link href="#contact" className="hover:text-adelaide-100 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-adelaide-400">
            Care
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-adelaide-300">
            <li><Link href="#how-it-works" className="hover:text-adelaide-100 transition-colors">How it works</Link></li>
            <li><Link href="#credentials" className="hover:text-adelaide-100 transition-colors">Credentials</Link></li>
            <li><Link href="#faq" className="hover:text-adelaide-100 transition-colors">FAQ</Link></li>
            <li><Link href="#testimonials" className="hover:text-adelaide-100 transition-colors">Patient stories</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-adelaide-400">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-adelaide-300" itemScope itemType="https://schema.org/Physician">
            <li itemProp="email">
              <Link href={`mailto:${DATA.contact.email}`} className="hover:text-adelaide-100 transition-colors">
                {DATA.contact.email}
              </Link>
            </li>
            <li itemProp="telephone">
              <Link href={`tel:${DATA.contact.phone.replace(/[^+\d]/g, "")}`} className="hover:text-adelaide-100 transition-colors">
                {DATA.contact.phone}
              </Link>
            </li>
            <li itemProp="address">{DATA.location}</li>
          </ul>
          <div className="mt-5 flex gap-2">
            <Link
              href={DATA.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="size-9 rounded-full border border-adelaide-800 flex items-center justify-center hover:bg-adelaide-800 transition-colors"
            >
              <Linkedin className="size-4" />
            </Link>
            <Link
              href={DATA.contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="size-9 rounded-full border border-adelaide-800 flex items-center justify-center hover:bg-adelaide-800 transition-colors"
            >
              <Facebook className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-adelaide-800/50">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-adelaide-400">
          <span>© {year} {DATA.name}. All rights reserved.</span>
          <span>Built with care.</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```

- [ ] **Step 3: Commit**

```bash
git add components/footer.tsx
git commit -m "feat(footer): rich 4-col footer with NAP schema and socials"
```

---

## Phase 4 — Integration

### Task 23: Rewire `app/page.tsx` with new sections + JSON-LD

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace entire file contents**

```tsx
import { Hero } from "@/components/hero";
import { MeetDoctor } from "@/components/meet-doctor";
import { Services } from "@/components/services";
import { Insights } from "@/components/insights";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { Credentials } from "@/components/credentials";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { DATA } from "@/data/resume";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://drrezwanarumpa.com";

const physicianJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: DATA.name,
  description: DATA.summary,
  url: SITE_URL,
  email: DATA.contact.email,
  telephone: DATA.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  medicalSpecialty: [
    "Reproductive Endocrinology",
    "Fertility Medicine",
    "PCOS Treatment",
  ],
  sameAs: [DATA.contact.linkedin, DATA.contact.facebook],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DATA.faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <MeetDoctor />
      <Services />
      <Insights />
      <HowItWorks />
      <Testimonials />
      <Credentials />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Build**

```bash
yarn build
```
Expected: success.

- [ ] **Step 3: Visual check — every section**

```bash
yarn dev
```
Open `http://localhost:3000`. Scroll through all 11 sections. Verify:
- Hero w/ gradient + mega name + sticker + CTAs
- Meet Dr. w/ inline portrait in heading + 4 stat tiles
- Services dark panel w/ tiles + quote cell
- Insights magazine layout (1 featured + 2 secondary)
- How It Works 3 step cards w/ photos
- Testimonials 4 quote cards w/ initials chips
- Credentials timeline + photo collage
- FAQ accordion grid
- Final CTA dark banner
- Contact 3 cards + social row
- Footer 4 cols

Test dark mode (toggle via theme-toggle). All sections should invert correctly.

Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(page): wire all 11 redesigned sections + FAQ JSON-LD"
```

---

### Task 24: Delete legacy components

**Files:**
- Delete: `components/about.tsx`
- Delete: `components/booking.tsx`
- Delete: `components/qualifications.tsx`
- Delete: `components/academics.tsx`
- Possibly delete: `components/flickering-grid.tsx`

- [ ] **Step 1: Check flickering-grid usage**

```bash
grep -r "flickering-grid\|FlickeringGrid" --include="*.tsx" --include="*.ts" .
```
If only the file itself shows up (no imports elsewhere), it's safe to delete. Otherwise leave it.

- [ ] **Step 2: Delete unused components**

```bash
git rm components/about.tsx components/booking.tsx components/qualifications.tsx components/academics.tsx
```

If flickering-grid is unused:
```bash
git rm components/flickering-grid.tsx
```

- [ ] **Step 3: Build to confirm no orphan imports**

```bash
yarn build
```
Expected: success.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove legacy section components replaced by redesign"
```

---

### Task 25: Adelaide palette pass on dock

**Files:**
- Modify: `components/dock.tsx`

- [ ] **Step 1: Read current dock.tsx**

```bash
cat components/dock.tsx
```

- [ ] **Step 2: Replace any hardcoded color values with semantic tokens**

In `components/dock.tsx`, find any hardcoded color references (e.g., `bg-white`, `text-black`, `bg-orange-*`, raw `oklch()` literals) and replace with semantic tokens:

- `bg-white` / `bg-background` → leave or use `bg-card`
- `text-black` / hardcoded dark → `text-foreground`
- Brand-accent hardcoded color (likely the old terracotta primary) → `bg-primary` / `text-primary`
- Borders → `border-border`
- Muted gray → `text-muted-foreground`

(If dock already uses semantic tokens like `bg-background`, `text-foreground`, `bg-primary` — it adapts automatically. No changes needed beyond visual verification.)

- [ ] **Step 3: Visual check in browser**

```bash
yarn dev
```
Confirm dock matches new palette in both light and dark modes.

- [ ] **Step 4: Commit (if changes made)**

```bash
git add components/dock.tsx
git commit -m "style(dock): adopt adelaide semantic tokens"
```

If no changes were needed, skip the commit.

---

### Task 26: Update layout metadata to reflect new identity

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add theme-color and apple-mobile-web-app tags via metadata**

In `app/layout.tsx`, find the `export const metadata: Metadata = { … }` object. Add (or update if present) the following keys inside it:

```ts
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(0.959 0.007 312.56)" },
    { media: "(prefers-color-scheme: dark)",  color: "oklch(0.152 0.012 319.49)" },
  ],
```

(Place inside the existing metadata object, near the `robots` field. Note Next 16 may expect `themeColor` as a separate `viewport` export — if `next build` warns about it, move the `themeColor` array into a new `export const viewport: Viewport = { themeColor: [...] };` and `import type { Viewport } from "next";`.)

- [ ] **Step 2: Build**

```bash
yarn build
```

If a warning surfaces about `themeColor` placement, follow the suggested fix (move to `viewport` export).

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(layout): add adelaide theme-color for light + dark"
```

---

## Phase 5 — Validation

### Task 27: Lighthouse + accessibility pass

**Files:** None modified unless issues found.

- [ ] **Step 1: Run production build + start**

```bash
yarn build
yarn start
```

- [ ] **Step 2: Open Lighthouse in Chrome DevTools**

Open `http://localhost:3000` in Chrome. DevTools → Lighthouse → "Performance" + "Accessibility" + "Best Practices" + "SEO" → Analyze.

Targets per spec:
- Performance ≥ 90
- Accessibility ≥ 95
- SEO ≥ 95
- Best Practices ≥ 95

- [ ] **Step 3: Triage failures**

If any score is below target, write findings as comments on this plan or open a follow-up task. **Common likely failures:**
- LCP slow → ensure `priority` on hero `<Image>` (already set). Compress hero.png if > 200KB.
- Image dimensions warnings → ensure all `<Image>` have `width`+`height` OR `fill` with sized parent.
- Color contrast → check Em color on accent backgrounds (adelaide-600 on adelaide-200 may fail AA).
- Missing alt text → audit decorative images use `alt=""`.

Fix critical issues inline (one commit per fix).

- [ ] **Step 4: Stop server, commit any fixes**

```bash
git add -A
git commit -m "perf(a11y): lighthouse fixes from validation pass"
```

(Skip if nothing changed.)

---

### Task 28: Dark mode + reduced-motion verification

**Files:** None modified unless issues found.

- [ ] **Step 1: Manual dark mode walkthrough**

```bash
yarn dev
```

Toggle dark mode via `theme-toggle`. Scroll each section. Verify:
- Hero gradient inverts (adelaide-900 → 800 → 700 family) — gradient stays adelaide-100→200→300; will look identical in dark unless re-tokened. **Acceptable** since hero card is a "warm island" island in both modes. If user disagrees, swap gradient classes to `bg-gradient-to-b from-adelaide-800 via-adelaide-700 to-adelaide-600` in dark via `dark:` prefix.
- All text remains legible
- No background-foreground collisions
- Sticker badges still visible (border may need `dark:border-adelaide-300`)

- [ ] **Step 2: Reduced-motion test**

Chrome DevTools → Rendering tab → Emulate CSS media feature `prefers-reduced-motion: reduce`. Reload page. Confirm entrance animations are skipped or instant. (framer-motion respects this by default for `whileInView` / `animate` when `useReducedMotion()` is wrapped — most sections don't wrap, relying on framer's default. Sufficient for spec.)

- [ ] **Step 3: Fix any issues found**

Common fixes:
- Hero gradient in dark mode → add `dark:from-adelaide-800 dark:via-adelaide-700 dark:to-adelaide-600`
- Sticker badge border in dark → already uses `border-primary` which inverts; should be fine
- Service tile background — `bg-adelaide-800/80` may be too dark in already-dark mode; if so override with `dark:bg-adelaide-800`

- [ ] **Step 4: Commit fixes**

```bash
git add -A
git commit -m "fix(theme): dark mode polish + sticker contrast"
```

(Skip if nothing changed.)

---

### Task 29: Final smoke test + push

**Files:** None.

- [ ] **Step 1: Clean install + build**

```bash
rm -rf .next node_modules
yarn install
yarn build
```
Expected: clean build with no errors or warnings (other than known font 404 fallback if Google Sans is unavailable).

- [ ] **Step 2: Manual click-through of every nav link, every CTA, every blog card**

```bash
yarn start
```
- Click every nav link → scrolls to correct section
- Click hero "Book Consultation" → opens Calendly in new tab
- Click "Explore Services" → scrolls to #services
- Click each insights card → routes to `/blog/<slug>`
- Click each contact card → opens mail/tel/maps as expected
- Click social icons → open LinkedIn / Facebook in new tab
- Open FAQ items → all expand/collapse smoothly

- [ ] **Step 3: Final commit (only if changes from validation phases exist)**

(If no changes from phases 27-29, skip.) Otherwise:

```bash
git add -A
git commit -m "chore: final polish + smoke-test fixes"
```

- [ ] **Step 4: Push (when user is ready)**

(Branch is `main`, no remote configured yet per local-only git init. Skip this step unless a remote has been added.)

```bash
# git push -u origin main
```

---

## Implementation Notes

**Pacing:** Phase 1 (~30 min), Phase 2 (~15 min), Phase 3 (~2 hrs — 11 components), Phase 4 (~30 min), Phase 5 (~30 min). Total ~3.5–4 hrs for a focused engineer.

**Visual deltas to expect on first load:**
- Background shifts from warm peach-cream to mauve-tinted cream
- Primary CTA changes from terracotta-coral to deep aubergine mauve
- Headings stop being Playfair serif — now sans bold with selective Lora italic
- Hero entirely restructured (no more flickering grid, no centered Playfair)
- Booking section gone (folded into hero + final CTA)
- Two new sections added (How It Works, FAQ, Final CTA) — page is longer

**Common mistakes to avoid:**
- Don't use raw `oklch(...)` literals in component className strings — always use semantic tokens (`bg-primary`, `text-muted-foreground`) or named utilities (`bg-adelaide-300`).
- Don't wrap entire headings in `<Em>` — only the emphasized phrase. Em is decorative; the heading must read sensibly without italic.
- Don't load Google Sans with `next/font/google` — it's not on the public Google Fonts CDN under that name. Use `<link>`.
- Don't add `next-themes` config changes — `theme-provider.tsx` already wires it.

**Decisions deferred to implementation:**
- Blog cover images: defaults to typographic (no work). Upgrade to illustrated later as a separate task.
- Newsletter capture (mentioned in spec): not in this plan — Insights section uses CTA pill to `/blog`, no newsletter input. Add as follow-up task if/when user provides backend (Mailchimp/Resend Audiences).
- Asset compression: photos in `public/img/` are unoptimized PNGs. `next/image` will serve appropriately sized variants via `sizes` prop; for production, run a one-off `sharp` script to convert to WebP. Not in plan scope.

---

**End of plan.**

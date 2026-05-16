# Dr. Rezwana Rumpa - Personal Website

Modern personal website for Dr. Rezwana Rumpa, Fertility & PCOS Specialist.

## Tech Stack

- **Framework**: Next.js 16 (App Router, RSC)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Animations**: Framer Motion
- **Blog**: MDX via next-mdx-remote
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

## Project Structure

```
app/              → Next.js App Router pages
components/       → React components
content/blog/     → MDX blog posts
data/             → Static data (resume.ts)
lib/              → Utility functions & blog logic
public/           → Static assets (images, favicon)
```

## Customization

- Edit `data/resume.ts` to update all personal/professional information
- Add blog posts as `.mdx` files in `content/blog/`
- Update images in `public/` (icon.png, rumpa.png, social.png)

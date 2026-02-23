# Legal Pages Implementation Brief

## Design System (from globals.css)
- `--bg-base: #0a0a0a` (dark background)
- `--bg-elevated: #111111`
- `--text-primary: #ffffff`
- `--text-secondary: rgba(255, 255, 255, 0.85)`
- `--text-tertiary: rgba(255, 255, 255, 0.55)`
- `--text-muted: rgba(255, 255, 255, 0.4)`
- `--border-default: rgba(255, 255, 255, 0.1)`
- `--border-subtle: rgba(255, 255, 255, 0.06)`
- Font: Satoshi (variable `--font-satoshi`), loaded in layout.tsx
- Dark-only theme, no light mode

## Architecture
- Next.js App Router (src/app/)
- Layout: `src/app/layout.tsx` wraps all pages with CobeGlobe at z-0, content at z-10
- Pages are server components by default
- Tailwind CSS 3 for styling

## Requirements
1. Create `/privacy-policy` route → `src/app/privacy-policy/page.tsx`
2. Create `/terms-of-service` route → `src/app/terms-of-service/page.tsx`
3. Both pages should use dark theme design tokens
4. Professional legal page layout: max-w-4xl, good typography, proper headings hierarchy
5. Include a back-to-home link and the FixedNav
6. Update Footer.tsx to link to `/privacy-policy` and `/terms-of-service`

## Footer Current State
- Links defined in `footerLinks` object at top of `src/components/Footer/Footer.tsx`
- Legal section: `['Privacy Policy', 'Terms of Service']`
- Currently all links point to `href="#"`
- Need to change Legal links to actual routes

## Page Style Guidelines
- bg-[var(--bg-base)] for background
- Headings: text-[var(--text-primary)], font-bold
- Body text: text-[var(--text-secondary)], leading-relaxed
- Section numbers: proper hierarchy h1 > h2 > h3
- Lists: styled bullet points with text-[var(--text-secondary)]
- Max-width container centered
- Padding: px-6 py-16 md:py-24
- Company info: RHEMIC AI LLC, Dallas, Texas, contact@rhemicai.com
- Effective Date: February 13th, 2026

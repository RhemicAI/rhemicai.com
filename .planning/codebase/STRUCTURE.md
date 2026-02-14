# Codebase Structure

**Analysis Date:** 2026-02-13

## Directory Layout

```
RhemicAI-dot-com/
├── public/                          # Static assets served at /
│   └── Rhemic logo(:bg).png        # Brand logo (only remaining public asset)
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── fonts/                   # Self-hosted Satoshi font files
│   │   │   ├── Satoshi-Variable.woff2
│   │   │   └── Satoshi-VariableItalic.woff2
│   │   ├── favicon.ico
│   │   ├── globals.css              # CSS variables, animations, scrollbar, utilities
│   │   ├── layout.tsx               # Root layout (font, metadata, CobeGlobe background)
│   │   └── page.tsx                 # Home page (composes all sections)
│   └── components/                  # All UI components
│       ├── AEOEngine/
│       │   └── AEOEngine.tsx        # 3-column animated engine visualization
│       ├── CobeGlobe/
│       │   └── CobeGlobe.tsx        # WebGL globe background
│       ├── CTA/
│       │   └── CTA.tsx              # Call-to-action section
│       ├── DashboardPreview/
│       │   └── DashboardPreview.tsx  # Product dashboard mockup
│       ├── Features/
│       │   └── Features.tsx         # Feature cards with inline SVG icons
│       ├── FixedNav/
│       │   └── FixedNav.tsx         # Sticky top navigation bar
│       ├── Footer/
│       │   └── Footer.tsx           # Site footer with links and social
│       ├── Hero/
│       │   └── Hero.tsx             # Hero section with typewriter title
│       ├── HowItWorks/
│       │   └── HowItWorks.tsx       # 3-step process with mini visuals
│       ├── ProofSection/
│       │   └── ProofSection.tsx     # Market stats/proof cards
│       ├── ScrollRevealInit.tsx     # Global scroll-reveal observer (no subdirectory)
│       ├── StatsBanner/
│       │   └── StatsBanner.tsx      # Infinite horizontal scrolling banner
│       └── TypewriterText/
│           └── TypewriterText.tsx   # Reusable typewriter animation component
├── .gitignore
├── eslint.config.mjs                # ESLint v9 flat config
├── next.config.ts                   # Next.js config (empty/default)
├── next-env.d.ts                    # Next.js TypeScript declarations
├── package.json                     # Dependencies and scripts
├── package-lock.json
├── postcss.config.mjs               # PostCSS config for Tailwind
├── tailwind.config.js               # Tailwind CSS configuration
└── tsconfig.json                    # TypeScript config with @/* path alias
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router pages and global styles
- Contains: Root layout, single page, global CSS, self-hosted fonts
- Key files: `layout.tsx` (entry point), `page.tsx` (home page), `globals.css` (design tokens)

**`src/components/`:**
- Purpose: All React components — both page sections and utilities
- Contains: 12 component directories + 1 standalone file
- Key files: Every `.tsx` file is a default-exported component

**`public/`:**
- Purpose: Static assets served at root URL
- Contains: Brand logo only (many assets were previously deleted/archived)
- Key files: `Rhemic logo(:bg).png`

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout — font registration, metadata, CobeGlobe background
- `src/app/page.tsx`: Home page — composes all 10 section components

**Configuration:**
- `package.json`: Dependencies (Next.js 16.1.6, React 19, COBE, GSAP)
- `tsconfig.json`: Path alias `@/*` maps to `./src/*`
- `tailwind.config.js`: Tailwind CSS configuration
- `next.config.ts`: Next.js configuration (currently empty/default)
- `eslint.config.mjs`: ESLint flat config
- `postcss.config.mjs`: PostCSS with Tailwind and Autoprefixer

**Design Tokens:**
- `src/app/globals.css`: All CSS custom properties (`--bg-base`, `--text-primary`, etc.), keyframe animations, scroll-reveal classes

**Core Logic:**
- `src/components/AEOEngine/AEOEngine.tsx`: Most complex component (442 lines) — animated 3-column visualization with internal sub-components
- `src/components/CobeGlobe/CobeGlobe.tsx`: WebGL globe with COBE library, visibility/resize handling
- `src/components/TypewriterText/TypewriterText.tsx`: Reusable typing animation state machine

## File Inventory

### Pages

| File | Route | Purpose |
|------|-------|---------|
| `src/app/page.tsx` | `/` | Single homepage — composes all section components vertically |

### Components — Section Components (rendered in page order)

| Component | Location | Used By | Purpose |
|-----------|----------|---------|---------|
| FixedNav | `src/components/FixedNav/FixedNav.tsx` | `page.tsx` | Sticky glassmorphism navbar with logo, nav links, CTA button |
| Hero | `src/components/Hero/Hero.tsx` | `page.tsx` | Full-viewport hero with typewriter headline, subtitle, dual CTAs, AI platform badges |
| StatsBanner | `src/components/StatsBanner/StatsBanner.tsx` | `page.tsx` | Infinite horizontal scrolling marquee of value propositions |
| AEOEngine | `src/components/AEOEngine/AEOEngine.tsx` | `page.tsx` | Animated 3-column visualization: Website Data -> AEO Engine -> AI Answers |
| ProofSection | `src/components/ProofSection/ProofSection.tsx` | `page.tsx` | 6-card grid of market statistics with sources (Semrush, McKinsey, etc.) |
| Features | `src/components/Features/Features.tsx` | `page.tsx` | 3-card grid: Website Auditing, Competitor Analysis, Automated Code Generation |
| DashboardPreview | `src/components/DashboardPreview/DashboardPreview.tsx` | `page.tsx` | Fake dashboard window mockup with sites table, score rings, sparkline chart |
| HowItWorks | `src/components/HowItWorks/HowItWorks.tsx` | `page.tsx` | 3-step process: Audit, Analyze, Deploy — each with mini visual mockups |
| CTA | `src/components/CTA/CTA.tsx` | `page.tsx` | Final call-to-action with warm radial glow background effect |
| Footer | `src/components/Footer/Footer.tsx` | `page.tsx` | Footer with brand, link columns (Product/Company/Legal), social icons |

### Components — Utility/Behavioral

| Component | Location | Used By | Purpose |
|-----------|----------|---------|---------|
| CobeGlobe | `src/components/CobeGlobe/CobeGlobe.tsx` | `layout.tsx` | Fixed WebGL globe background using COBE library |
| TypewriterText | `src/components/TypewriterText/TypewriterText.tsx` | Hero, ProofSection, Features, DashboardPreview, HowItWorks, CTA | Scroll-triggered typewriter text animation |
| ScrollRevealInit | `src/components/ScrollRevealInit.tsx` | `page.tsx` | Sets up global IntersectionObserver for `.scroll-reveal` elements |

### Internal Sub-Components (not exported separately)

| Component | Defined In | Purpose |
|-----------|-----------|---------|
| InputColumn | `src/components/AEOEngine/AEOEngine.tsx` | Streaming website crawl data animation |
| EngineColumn | `src/components/AEOEngine/AEOEngine.tsx` | Processing engine with progress bar and metrics |
| OutputColumn | `src/components/AEOEngine/AEOEngine.tsx` | Staggered AI answer cards |
| ScoreRing | `src/components/DashboardPreview/DashboardPreview.tsx` | Circular conic-gradient score indicator |
| Sparkline | `src/components/DashboardPreview/DashboardPreview.tsx` | Bar chart sparkline |
| StatusDot | `src/components/DashboardPreview/DashboardPreview.tsx` | Green/yellow/red status indicator |
| AuditVisual | `src/components/HowItWorks/HowItWorks.tsx` | Mini audit tool mockup |
| CompetitorVisual | `src/components/HowItWorks/HowItWorks.tsx` | Mini competitor ranking mockup |
| DeployVisual | `src/components/HowItWorks/HowItWorks.tsx` | Mini code editor mockup |

### Configuration

| File | Purpose |
|------|---------|
| `package.json` | Project metadata, scripts (`dev`, `build`, `start`, `lint`), dependencies |
| `tsconfig.json` | TypeScript strict mode, `@/*` path alias to `./src/*` |
| `tailwind.config.js` | Tailwind CSS configuration |
| `next.config.ts` | Next.js config (empty — uses all defaults) |
| `eslint.config.mjs` | ESLint v9 flat config with Next.js rules |
| `postcss.config.mjs` | PostCSS plugins: Tailwind CSS + Autoprefixer |
| `src/app/globals.css` | Design tokens (CSS variables), keyframe animations, utility classes |

## Naming Conventions

**Files:**
- Components: PascalCase matching component name — `Hero.tsx`, `AEOEngine.tsx`
- Config: lowercase with dots — `next.config.ts`, `tailwind.config.js`
- CSS: `globals.css` (single global stylesheet)

**Directories:**
- Component dirs: PascalCase matching component — `Hero/`, `CobeGlobe/`, `AEOEngine/`
- Exception: `ScrollRevealInit.tsx` has no wrapping directory (standalone utility)
- App Router dirs: lowercase — `app/`, `fonts/`

**Components:**
- One component per file, default export, name matches filename
- Sub-components defined in same file (not exported) — see AEOEngine, DashboardPreview, HowItWorks

## Import Graph

```
layout.tsx
├── globals.css
└── CobeGlobe/CobeGlobe.tsx          (client component, fixed background)

page.tsx
├── FixedNav/FixedNav.tsx             (client: next/image)
├── Hero/Hero.tsx                     (server component)
│   └── TypewriterText/TypewriterText.tsx  (client: animation)
├── StatsBanner/StatsBanner.tsx       (client: inline CSS animation)
├── AEOEngine/AEOEngine.tsx           (client: timers, IntersectionObserver)
├── ProofSection/ProofSection.tsx     (server component)
│   └── TypewriterText/TypewriterText.tsx
├── Features/Features.tsx             (server component)
│   └── TypewriterText/TypewriterText.tsx
├── DashboardPreview/DashboardPreview.tsx  (server component)
│   └── TypewriterText/TypewriterText.tsx
├── HowItWorks/HowItWorks.tsx         (server component)
│   └── TypewriterText/TypewriterText.tsx
├── CTA/CTA.tsx                       (server component)
│   └── TypewriterText/TypewriterText.tsx
├── Footer/Footer.tsx                 (client: next/image)
└── ScrollRevealInit.tsx              (client: IntersectionObserver)
```

All imports use the `@/components/` path alias.

## Where to Add New Code

**New Page Section:**
1. Create `src/components/[SectionName]/[SectionName].tsx`
2. Use default export, follow existing section pattern (section tag, scroll-reveal classes, max-w container)
3. Import in `src/app/page.tsx` and place in render order
4. Use `TypewriterText` for section headings if animated text is desired
5. Add `scroll-reveal` class to elements that should animate on scroll

**New Page Route:**
1. Create `src/app/[route]/page.tsx`
2. Layout and CobeGlobe background apply automatically
3. Add nav link in `src/components/FixedNav/FixedNav.tsx` `navLinks` array

**New Utility Component:**
1. Create `src/components/[Name]/[Name].tsx` or `src/components/[Name].tsx` for simple utilities
2. Add `'use client'` directive if component uses hooks, event listeners, or browser APIs
3. Export as default

**New CSS Custom Property:**
1. Add to `:root` block in `src/app/globals.css`
2. Reference in components as `var(--property-name)`

**New Animation Keyframe:**
1. Define `@keyframes` in `src/app/globals.css`
2. Create corresponding utility class in the same file

## Special Directories

**`src/app/fonts/`:**
- Purpose: Self-hosted Satoshi variable font files (woff2)
- Generated: No — manually added
- Committed: Yes

**`.next/`:**
- Purpose: Next.js build output
- Generated: Yes — by `next build` and `next dev`
- Committed: No (gitignored)

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes — by `npm install`
- Committed: No (gitignored)

**`.planning/`:**
- Purpose: Project planning and codebase analysis documents
- Generated: By analysis tooling
- Committed: Depends on project preference

---

*Structure analysis: 2026-02-13*

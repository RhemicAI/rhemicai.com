# Architecture

**Analysis Date:** 2026-02-13

## Pattern Overview

**Overall:** Next.js App Router, single-page marketing site with component-based composition

**Key Characteristics:**
- Single route (`/`) with vertically stacked section components
- Dark-only theme using CSS custom properties (no theme switching)
- WebGL background layer (COBE globe) rendered at layout level behind all content
- No data fetching, API routes, or server-side data — all content is hardcoded in components
- Mix of Server Components (default) and Client Components (`'use client'` directive)

## Layers

**Layout Layer:**
- Purpose: Root HTML shell, font loading, global background
- Location: `src/app/layout.tsx`
- Contains: Metadata export, Satoshi font registration, `<CobeGlobe />` at z-0, children wrapper at z-10
- Depends on: `src/components/CobeGlobe/CobeGlobe.tsx`
- Used by: All pages (only one: `/`)

**Page Layer:**
- Purpose: Compose section components in vertical scroll order
- Location: `src/app/page.tsx`
- Contains: 10 section component imports, rendered sequentially in `<main>`
- Depends on: All section components
- Used by: Layout (as children)

**Section Components:**
- Purpose: Full-width page sections with self-contained content and styling
- Location: `src/components/[Name]/[Name].tsx` (one component per directory)
- Contains: Hardcoded data arrays, inline SVG icons, section markup
- Depends on: `TypewriterText` (shared utility component)
- Used by: `src/app/page.tsx`

**Utility Components:**
- Purpose: Reusable interactive behaviors (typewriter animation, scroll reveal, globe)
- Location: `src/components/TypewriterText/TypewriterText.tsx`, `src/components/ScrollRevealInit.tsx`, `src/components/CobeGlobe/CobeGlobe.tsx`
- Contains: Client-side logic with React hooks, IntersectionObserver usage
- Depends on: Browser APIs only
- Used by: Section components (TypewriterText), Layout (CobeGlobe), Page (ScrollRevealInit)

## Data Flow

**No dynamic data flow exists.** This is a static marketing site.

**Content Source:**
- All text, stats, feature descriptions, and step data are hardcoded as const arrays/objects at the top of each component file
- No props are passed between section components
- No shared state, context providers, or state management libraries

**Props Flow (minimal):**
- `page.tsx` passes no props to section components — each is self-contained
- `TypewriterText` receives `lines`, `speed`, `linePause`, `className`, `tag` props from parent sections
- `AEOEngine` passes `active` and `reduced` boolean props to its internal sub-components (`InputColumn`, `EngineColumn`, `OutputColumn`)

**State Management:**
- Component-local `useState` only (no global state)
- `AEOEngine` manages animation cycle state internally with `useState` + `useRef`
- `TypewriterText` manages its own typing state machine
- `CobeGlobe` manages WebGL globe lifecycle with refs
- `ScrollRevealInit` uses vanilla DOM manipulation via `IntersectionObserver`

## Rendering Strategy

**Server Components (default):**
- `src/app/layout.tsx` — Server Component (metadata export)
- `src/app/page.tsx` — Server Component (static composition)
- `src/components/Hero/Hero.tsx` — Server Component (renders `TypewriterText` client component)
- `src/components/ProofSection/ProofSection.tsx` — Server Component
- `src/components/Features/Features.tsx` — Server Component
- `src/components/DashboardPreview/DashboardPreview.tsx` — Server Component (static mock UI)
- `src/components/HowItWorks/HowItWorks.tsx` — Server Component
- `src/components/CTA/CTA.tsx` — Server Component

**Client Components (`'use client'`):**
- `src/components/CobeGlobe/CobeGlobe.tsx` — WebGL canvas, requestAnimationFrame
- `src/components/FixedNav/FixedNav.tsx` — Uses `next/image`
- `src/components/StatsBanner/StatsBanner.tsx` — CSS animation (inline `<style>`)
- `src/components/AEOEngine/AEOEngine.tsx` — Heavy animation with timers, IntersectionObserver
- `src/components/Footer/Footer.tsx` — Uses `next/image`
- `src/components/ScrollRevealInit.tsx` — DOM manipulation via IntersectionObserver
- `src/components/TypewriterText/TypewriterText.tsx` — Typing animation state machine

## Key Design Decisions

**COBE Globe as Fixed Background:**
- `CobeGlobe` is rendered in `layout.tsx` with `position: fixed; z-index: 0`
- All page content sits in a `relative z-10` wrapper, appearing over the globe
- Globe pauses rendering when tab is hidden (visibility API) and on `prefers-reduced-motion`
- DPR is reduced to 1 on mobile for performance

**CSS Custom Properties for Theming:**
- All colors defined as CSS variables in `src/app/globals.css` under `:root`
- Dark-only — no light mode variables or `prefers-color-scheme` media queries
- Components reference variables like `var(--text-primary)`, `var(--bg-glass)`, etc.
- Glassmorphism pattern: `backdrop-blur` + semi-transparent backgrounds

**Scroll Reveal Pattern:**
- CSS class `.scroll-reveal` provides initial hidden state (opacity: 0, translateY: 24px)
- `ScrollRevealInit` component (rendered last in page) sets up a single IntersectionObserver
- Adds `.revealed` class to trigger CSS transition — no JavaScript animation libraries needed
- Components opt in by adding `className="scroll-reveal"` to elements

**TypewriterText as Shared Animation:**
- Used by 6 section components (Hero, ProofSection, Features, DashboardPreview, HowItWorks, CTA)
- Intersection-triggered: animation starts only when element scrolls into view
- Configurable speed, line pause, and semantic HTML tag (`h1`, `h2`, `h3`, `p`)
- Includes cursor blink animation that auto-hides after completion

**AEOEngine Animation Architecture:**
- Most complex component — 3-column animated visualization (Input -> Engine -> Output)
- Three internal sub-components: `InputColumn`, `EngineColumn`, `OutputColumn`
- Custom `useInView` and `useReducedMotion` hooks defined inline
- Animation cycles every 24 seconds via `setInterval` + `key` prop remounting
- Pauses when tab is hidden or component leaves viewport
- Responsive: 3-column grid on desktop, stacked on mobile

**No Router Navigation:**
- Single-page site with no `<Link>` components or client-side navigation
- Nav links use `<a href="#section">` anchor links
- Footer links are placeholder `href="#"` anchors

**No External API Dependencies:**
- No fetch calls, no API routes, no environment variables
- All content is static and compiled at build time
- Only external dependency beyond React/Next.js: `cobe` (WebGL globe) and `gsap` (listed in package.json but not imported anywhere in current code)

## Entry Points

**Application Entry:**
- Location: `src/app/layout.tsx`
- Triggers: Next.js App Router
- Responsibilities: HTML document shell, font loading, metadata, global background

**Page Entry:**
- Location: `src/app/page.tsx`
- Triggers: Route `/`
- Responsibilities: Compose all section components in scroll order

## Error Handling

**Strategy:** None implemented — no error boundaries, try/catch blocks, or fallback UI

**Patterns:**
- Components assume all data is present (hardcoded)
- No loading states or skeleton screens
- No error boundaries wrapping client components

## Cross-Cutting Concerns

**Logging:** None — no console.log or structured logging
**Validation:** None — no user input forms or data validation
**Authentication:** None — static marketing site
**Animation:** IntersectionObserver-based scroll reveals + component-local animation timers
**Accessibility:** `aria-hidden="true"` on decorative elements, `aria-label` on social links, semantic heading hierarchy (h1 -> h2 -> h3)

---

*Architecture analysis: 2026-02-13*

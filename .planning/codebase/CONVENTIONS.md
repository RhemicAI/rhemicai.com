# Coding Conventions

**Analysis Date:** 2026-02-13

## Naming Patterns

**Files:**
- Components use PascalCase in PascalCase directories: `ComponentName/ComponentName.tsx`
- Each component gets its own directory: `src/components/Hero/Hero.tsx`, `src/components/CTA/CTA.tsx`
- Exception: `src/components/ScrollRevealInit.tsx` sits directly in `src/components/` (no subdirectory) because it renders `null` and is a utility, not a visual component
- App-level files use lowercase: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`

**Components:**
- Use PascalCase function names matching the file name: `export default function Hero()`, `export default function AEOEngine()`
- Sub-components within a file also use PascalCase: `InputColumn`, `EngineColumn`, `OutputColumn` in `src/components/AEOEngine/AEOEngine.tsx`
- Sub-components are NOT exported; only the main component uses `export default`

**CSS Classes:**
- Tailwind utility classes exclusively; no BEM or custom class naming convention
- Custom CSS classes in `src/app/globals.css` use kebab-case: `scroll-reveal`, `animate-pulse-glow`, `typewriter-cursor`, `typewriter-cursor-blink`

**Variables/Functions:**
- camelCase for all variables and functions: `navLinks`, `footerLinks`, `sparkData`, `buildGlobe`
- Constants (data arrays/objects) at module top level use UPPER_SNAKE_CASE: `CRAWL_LINES`, `ENGINE_STAGES`, `OUTPUT_CARDS`, `METRICS`, `MARKERS`
- Hooks use standard `use` prefix: `useInView`, `useReducedMotion`

**Types/Interfaces:**
- PascalCase with descriptive suffixes: `TypewriterTextProps`
- Use `interface` for component props (see `src/components/TypewriterText/TypewriterText.tsx`)

## Component Patterns

**Structure:**
- All components are functional components using `export default function ComponentName()`
- No arrow function components; all use function declaration syntax
- No class components anywhere in the codebase

**Props:**
- Props are destructured in the function signature
- Props interface defined inline or with a named interface directly above the component
- Example from `src/components/TypewriterText/TypewriterText.tsx`:
  ```tsx
  interface TypewriterTextProps {
    lines: string[];
    speed?: number;
    linePause?: number;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'p';
  }

  export default function TypewriterText({
    lines,
    speed = 30,
    linePause = 200,
    className = '',
    tag: Tag = 'h1',
  }: TypewriterTextProps) {
  ```

**Client vs Server Components:**
- Server components (no `'use client'` directive): `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/Hero/Hero.tsx`, `src/components/Features/Features.tsx`, `src/components/ProofSection/ProofSection.tsx`, `src/components/DashboardPreview/DashboardPreview.tsx`, `src/components/HowItWorks/HowItWorks.tsx`, `src/components/CTA/CTA.tsx`
- Client components (with `'use client'`): `src/components/FixedNav/FixedNav.tsx`, `src/components/StatsBanner/StatsBanner.tsx`, `src/components/AEOEngine/AEOEngine.tsx`, `src/components/CobeGlobe/CobeGlobe.tsx`, `src/components/Footer/Footer.tsx`, `src/components/TypewriterText/TypewriterText.tsx`, `src/components/ScrollRevealInit.tsx`
- Rule: Use `'use client'` only when the component needs browser APIs (IntersectionObserver, window, document), React hooks (useState, useEffect, useRef), or Next.js client-side imports (next/image with interactive features)

**State Management:**
- No global state management library (no Redux, Zustand, or Context)
- Local state via `useState` only
- Refs via `useRef` for DOM elements, timers, and animation frames
- No prop drilling beyond one level

**Data Patterns:**
- Static display data defined as `const` arrays/objects at the top of each component file
- No data fetching; all content is hardcoded
- Data objects use `as const` for literal types where needed (e.g., `status: 'green' as const`)

## Styling Approach

**Primary Method:**
- Tailwind CSS 3.x utility classes applied inline via `className`
- No CSS Modules (previously used, now removed)
- No styled-components or CSS-in-JS

**CSS Custom Properties (Design Tokens):**
- Defined in `src/app/globals.css` under `:root`
- Referenced in Tailwind via arbitrary value syntax: `text-[var(--text-primary)]`, `bg-[var(--bg-glass)]`, `border-[var(--border-default)]`
- Token categories:
  - Backgrounds: `--bg-base`, `--bg-elevated`, `--bg-glass`, `--bg-glass-hover`
  - Text: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-muted`, `--text-faint`
  - Borders: `--border-default`, `--border-strong`, `--border-subtle`
  - Buttons: `--btn-primary-bg`, `--btn-primary-text`
- Dark-only theme; no light mode CSS variables or `dark:` Tailwind variants

**Responsive Patterns:**
- Mobile-first with standard Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Common pattern: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl`
- Layout switches from stacked to grid at `md:`: `grid-cols-1 md:grid-cols-3`
- Hidden/shown with breakpoints: `hidden md:flex`, `md:hidden`

**Animation Patterns:**
- CSS `@keyframes` in `src/app/globals.css` for global animations: `pulse-glow`, `cursor-blink`, `aeo-fade-in`, `stats-scroll`
- Inline `style` JSX for component-scoped animations (e.g., `StatsBanner` scroll animation)
- `IntersectionObserver` for scroll-triggered reveals via `.scroll-reveal` / `.revealed` CSS classes
- `requestAnimationFrame` for high-performance canvas/progress animations in `src/components/AEOEngine/AEOEngine.tsx` and `src/components/CobeGlobe/CobeGlobe.tsx`
- `prefers-reduced-motion` respected in `src/components/AEOEngine/AEOEngine.tsx` and `src/components/CobeGlobe/CobeGlobe.tsx`
- Tailwind `transition-all duration-300` for hover states

**Glassmorphism Pattern:**
- Consistently applied: `bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border-default)]`
- Hover state: `hover:bg-[var(--bg-glass-hover)] hover:border-[var(--border-strong)]`

**Button Pattern (Primary CTA):**
```tsx
<button className="group relative px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full overflow-hidden transition-all duration-300 hover:scale-105">
  <span className="relative z-10">Button Text</span>
  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</button>
```

**Button Pattern (Secondary/Ghost):**
```tsx
<button className="px-8 py-4 text-base font-medium text-[var(--text-secondary)] border border-[var(--border-strong)] rounded-full hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300">
  Button Text
</button>
```

## TypeScript Usage

**Strictness:**
- `strict: true` in `tsconfig.json`
- Proper typing throughout; no `any` types detected in any source file

**Common Type Patterns:**
- Component props use `interface` (not `type`)
- Ref types are explicitly typed: `useRef<HTMLCanvasElement>(null)`, `useRef<HTMLElement>(null)`
- Timer refs typed with `ReturnType<typeof setTimeout>`: `useRef<ReturnType<typeof setTimeout>>(undefined)`
- State arrays typed explicitly when needed: `useState<string[]>([])`, `useState<number[]>([])`
- Inline object literal types for data arrays with `as const` for union types

**No Custom Type Files:**
- No shared `types/` directory or `.d.ts` files (beyond `next-env.d.ts`)
- Types defined inline in the component files where used

## Import Conventions

**Order:**
1. React/Next.js framework imports (`import { useEffect, useRef, useState } from 'react'`, `import Image from 'next/image'`, `import type { Metadata } from 'next'`)
2. Third-party library imports (`import createGlobe from 'cobe'`)
3. Internal component imports using path alias (`import TypewriterText from '@/components/TypewriterText/TypewriterText'`)

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- Always use `@/components/...` for component imports, never relative paths
- Import pattern: `@/components/ComponentName/ComponentName` (directory + file, both PascalCase)

**Export Pattern:**
- One `export default function` per file
- No named exports from component files
- No barrel files (`index.ts`) in component directories

## Error Handling

**Patterns:**
- No explicit error handling in any component
- No try/catch blocks
- No error boundaries
- `useEffect` cleanup functions handle resource cleanup (clearInterval, clearTimeout, cancelAnimationFrame, observer.disconnect)

## Logging

**Framework:** None
- No console.log, console.error, or logging of any kind in source files

## Comments

**When to Comment:**
- Section dividers using `{/* Section Name */}` in JSX for major layout areas
- Decorated section dividers in data/logic: `// ── Section Name ──`
- Brief inline explanations for non-obvious behavior: `// Loop after pause`, `// Pause when tab hidden`
- No JSDoc/TSDoc on any functions or components

**Comment Style:**
- JSX: `{/* comment */}` for structural landmarks within render
- JS/TS: `//` single-line comments, no block comments
- Comments are sparse and used only for navigation/clarity, not documentation

## Function Design

**Size:**
- Components range from ~25 lines (ScrollRevealInit) to ~85 lines (DashboardPreview main export)
- Sub-components within files are 30-80 lines each
- Longest file is `src/components/AEOEngine/AEOEngine.tsx` at 443 lines (contains 5 functions + data)

**Parameters:**
- Custom hooks accept minimal parameters: `useInView(ref, threshold)`, `useReducedMotion()`
- Sub-components accept 2-3 props maximum: `{ active, reduced }`, `{ score, size }`

**Return Values:**
- Components always return JSX
- Custom hooks return simple values: `boolean`, `number`

## Module Design

**Exports:**
- Single default export per component file
- No re-exports or barrel files
- Sub-components, custom hooks, and data arrays are file-private (not exported)

**Barrel Files:**
- Not used; each import references the full path to the component file

## Linting

**Tool:** ESLint 9 with flat config
- Config: `eslint.config.mjs`
- Extends: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- No custom rules added
- Run command: `npm run lint`

**Formatting:**
- No Prettier config detected
- No `.editorconfig` detected
- Consistent 2-space indentation observed across all files
- Single quotes for JS/TS string literals
- Double quotes in JSX attributes (standard React convention, but inconsistent -- some files use single quotes in JSX)

---

*Convention analysis: 2026-02-13*

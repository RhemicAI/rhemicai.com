# Technology Stack

**Analysis Date:** 2026-02-13

## Languages

**Primary:**
- TypeScript ^5 - All application code (`src/**/*.tsx`, `src/**/*.ts`)

**Secondary:**
- JavaScript - Config files (`tailwind.config.js`, `postcss.config.js`)
- CSS - Global styles and Tailwind utilities (`src/app/globals.css`)

## Runtime

**Environment:**
- Node.js (version not pinned; no `.nvmrc` or `.node-version` present)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework (App Router)
- React 19.2.3 - UI library
- React DOM 19.2.3 - DOM rendering

**Build/Dev:**
- Turbopack - Next.js default dev bundler (via `next dev`)
- PostCSS 8.5.6 - CSS processing
- Autoprefixer 10.4.24 - CSS vendor prefixing
- Tailwind CSS 3.4.19 - Utility-first CSS framework

**Linting:**
- ESLint ^9 - Code linting
- eslint-config-next 16.1.6 - Next.js ESLint rules (core-web-vitals + typescript presets)

**Type Checking:**
- TypeScript ^5 - Static type checking (strict mode enabled)

## Key Dependencies

**Production:**

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | App Router framework, SSR/SSG, routing |
| `react` | 19.2.3 | UI component library |
| `react-dom` | 19.2.3 | React DOM renderer |
| `cobe` | ^0.6.5 | WebGL globe visualization (background element) |
| `gsap` | ^3.14.2 | Animation library (listed but not currently imported in src/) |
| `@gsap/react` | ^2.1.2 | GSAP React integration (listed but not currently imported in src/) |

**Development:**

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5 | TypeScript compiler |
| `@types/node` | ^20 | Node.js type definitions |
| `@types/react` | ^19 | React type definitions |
| `@types/react-dom` | ^19 | React DOM type definitions |
| `tailwindcss` | ^3.4.19 | Utility CSS framework |
| `postcss` | ^8.5.6 | CSS post-processor |
| `autoprefixer` | ^10.4.24 | CSS vendor prefix automation |
| `eslint` | ^9 | JavaScript/TypeScript linter |
| `eslint-config-next` | 16.1.6 | Next.js ESLint configuration |

## Configuration

**TypeScript (`tsconfig.json`):**
- Target: ES2017
- Module: ESNext with bundler resolution
- Strict mode: enabled
- Path alias: `@/*` maps to `./src/*`
- JSX: react-jsx
- Incremental compilation: enabled

**Tailwind (`tailwind.config.js`):**
- Content paths: `src/pages/`, `src/components/`, `src/app/`
- No custom theme extensions
- No plugins

**PostCSS (`postcss.config.js`):**
- Plugins: tailwindcss, autoprefixer

**ESLint (`eslint.config.mjs`):**
- Presets: eslint-config-next/core-web-vitals, eslint-config-next/typescript
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

**Next.js (`next.config.ts`):**
- Empty configuration (no custom options set)

## Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start development server (Turbopack) |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Run ESLint across project |

## Platform Requirements

**Development:**
- Node.js (compatible with Next.js 16.1.6)
- npm for package management

**Production:**
- Vercel (`.vercel` in `.gitignore` suggests Vercel deployment target)
- Any Node.js-compatible hosting

---

*Stack analysis: 2026-02-13*

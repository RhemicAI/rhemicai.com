# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build (runs TypeScript check)
npm run lint         # ESLint
npm test             # Vitest (single run)
npm run test:watch   # Vitest watch mode

# Run a single test file
npx vitest run src/__tests__/seo/sitemap.test.ts
```

## Architecture

### Global wiring (`src/app/layout.tsx`)
Two fonts loaded globally via CSS variables: `--font-ibm-plex-mono` (headings/display) and `--font-inter` (body). Four components injected into every page: `SchemaOrg` (Organization + WebSite JSON-LD), `Breadcrumbs` (BreadcrumbList schema), `CalEmbed` (Cal.com popup script), and a dark gradient overlay div. Analytics via `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

### Background
`CobeGlobeHome` renders a WebGL spinning globe (cobe library) only on `/`. All other pages get a plain dark background. The globe is `fixed inset-0 z-0`; content sits at `z-10`.

### CSS design tokens (`src/app/globals.css`)
All colors come from CSS variables (`--bg-base`, `--bg-elevated`, `--bg-glass`, `--text-primary` through `--text-faint`, `--border-*`, `--btn-primary-*`). Tailwind uses these via `var()` references. Change colors here, not in Tailwind config.

### SEO/metadata pattern
Every subpage exports `metadata` using `buildMetadata()` from `@/lib/seo`:
```ts
export const metadata: Metadata = buildMetadata({
  title: 'Page Title',
  description: '...',
  path: '/page-path',
  keywords: ['kw1', 'kw2'],
});
```
This auto-generates canonical URL, OpenGraph, Twitter card, and alternates. `siteConfig` in `src/lib/seo.ts` is the single source of truth for base URL, email, and social handles.

### Schema markup pattern
- **Global**: `SchemaOrg` component in layout handles Organization + WebSite schemas
- **Per-page**: Import `PageSchemas` from `@/components/seo/PageSchemas` and pass service/breadcrumb objects
- **Blog posts**: Use `ArticleSchema` component with title, description, URL, datePublished, wordCount
- All schemas render via the `JsonLd` wrapper (`src/components/seo/JsonLd.tsx`)

### Pricing (`src/data/pricing.ts`)
Single source of truth for all plan data. Exports `smbPlans` and `agencyTiers` arrays of `PricingPlan`. The pricing page, schema generation, and checkout buttons all read from here. Each plan has a `calLink` for Cal.com onboarding routing.

### Blog content (`src/lib/content.ts`)
Blog post list (slug, title, description, publishedAt, readingTime) lives here. Each post has its own directory under `src/app/blog/[slug]/` with a `layout.tsx` (metadata) and `page.tsx` (content + ArticleSchema).

### Testing
Vitest with happy-dom. Tests live in `src/__tests__/`. Currently covers SEO/sitemap logic. No component rendering tests.

## Environment Variables

| Variable | Used in |
|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `layout.tsx` — Google Analytics |
| `NEXT_PUBLIC_PORTAL_URL` | `PlanCheckoutButton` — signup URL base |
| `INDEXNOW_KEY` | `src/app/api/indexnow/route.ts` |
| `N8N_WEBHOOK_URL` | `src/app/api/contact/route.ts` — contact form |

## Key Constraints

- **Branch always**: never commit directly to `main`
- **Public assets**: only SVGs and optimized PNGs/WebP belong in `/public/`. Videos should be CDN-hosted.
- **Color changes**: edit CSS variables in `globals.css`, not Tailwind config or inline styles
- **New pricing tiers**: update `src/data/pricing.ts` only — all pages and schemas derive from it
- **Globe only on homepage**: `CobeGlobeHome` returns `null` on any path other than `/`

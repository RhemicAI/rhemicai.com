# External Integrations

**Analysis Date:** 2026-02-13

## APIs & External Services

**None detected.** This is a static marketing site with no API routes, no backend calls, no `fetch()` usage, and no `process.env` references in source code. There is no `src/app/api/` directory.

## Data Storage

**Databases:** None
**File Storage:** Local filesystem only (static assets in `public/`)
**Caching:** None (beyond Next.js built-in caching)

## Authentication & Identity

**Auth Provider:** None - This is a public-facing marketing site with no authentication.

## Monitoring & Observability

**Error Tracking:** None detected
**Logs:** None detected (no logging libraries)
**Analytics:** None detected (no Google Analytics, Vercel Analytics, or similar)

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from `.vercel` in `.gitignore`)
- No `vercel.json` configuration file present

**CI Pipeline:**
- None detected (no `.github/workflows/`, no CI config files)

## Environment Configuration

**Required env vars:** None - No `process.env` or `NEXT_PUBLIC_` references found in source code.

**Secrets location:** Not applicable

**.env files:** Gitignored via `.env*` pattern in `.gitignore`. No `.env.example` or `.env.local` present in the repo.

## CDN / External Assets

| Resource | Source | Usage |
|----------|--------|-------|
| Satoshi font (Variable) | Self-hosted woff2 | `src/app/fonts/Satoshi-Variable.woff2` - loaded via `next/font/local` in `src/app/layout.tsx` |
| Satoshi font (Variable Italic) | Self-hosted woff2 | `src/app/fonts/Satoshi-VariableItalic.woff2` - loaded via `next/font/local` in `src/app/layout.tsx` |
| COBE WebGL globe | npm package (`cobe@^0.6.5`) | `src/components/CobeGlobe/CobeGlobe.tsx` - renders a full-screen WebGL globe as fixed background |

**No external CDN dependencies.** All fonts are self-hosted. No external stylesheets, scripts, or image CDNs are referenced.

## Webhooks & Callbacks

**Incoming:** None
**Outgoing:** None

## Client-Side Libraries

| Library | Import Location | Purpose |
|---------|-----------------|---------|
| `cobe` | `src/components/CobeGlobe/CobeGlobe.tsx` | WebGL globe rendering with city markers (New York, London, Tokyo, Singapore, Sydney, Paris, Dubai) |
| `gsap` | Not currently imported | Listed in `package.json` but no active imports found in `src/` |
| `@gsap/react` | Not currently imported | Listed in `package.json` but no active imports found in `src/` |

## OpenGraph Metadata

Configured in `src/app/layout.tsx`:
- Title: "Rhemic AI -- Visibility Reimagined for the AI Age"
- Description: "Dominate AI-generated search results with Adaptive Engagement Optimization."
- Type: website

---

*Integration audit: 2026-02-13*

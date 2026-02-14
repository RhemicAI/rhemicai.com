# CTO Handoff Checklist

## Deployment Steps

- [ ] Review PR on GitHub (`feature/seo-aeo-foundation` -> `main`)
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var on Hetzner
- [ ] Merge to main, tag release (`v1.1.0-seo-aeo`)
- [ ] Build and deploy (`npm ci && npm run build && npm start`)
- [ ] Verify all 15 routes load on production (see `post-deployment-verification.md`)

## Post-Deploy Validation

- [ ] Run Lighthouse on production (target: Perf > 90, SEO = 100)
- [ ] Set up Google Search Console (submit sitemap)
- [ ] Set up UptimeRobot (5 critical URLs)
- [ ] Verify GA4 real-time data
- [ ] Test social previews (share URL on Slack/Twitter)
- [ ] Verify `sitemap.xml` and `robots.txt` accessible

## What Changed (Summary)

### New Content
- Pillar blog post: "The Complete Guide to AI Engine Optimization (AEO) in 2026" (~4,200 words)
- Blog index page with email signup

### SEO Infrastructure
- JSON-LD schema: Organization, WebSite, BlogPosting, Product, Service
- Open Graph + Twitter meta tags on all pages
- Sitemap expanded to 15 routes
- robots.txt allows all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
- Google Analytics 4 integration (conditional on env var)

### Testing & Monitoring
- Vitest test suite (8 smoke tests)
- Lighthouse CI config
- Performance budgets
- Schema validation script
- Monitoring URLs config

### Code Quality
- Console.log/warn statements removed
- No new dependencies except `@next/third-parties` (official Next.js)

## Timing

- **Estimated deployment time**: 15-30 minutes
- **Optimal window**: Low-traffic (early morning or weekend)
- **Contact**: Ittehadul (CEO) if issues arise

## Docs Reference

All deployment documentation is in `docs/deployment/`:
- `pre-deployment-checklist.md`
- `deployment-steps.md`
- `post-deployment-verification.md`
- `monitoring-setup-guide.md`
- `rollback-plan.md`
- `qa-report.md`

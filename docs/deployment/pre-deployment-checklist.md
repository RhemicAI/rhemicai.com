# Pre-Deployment Checklist

Complete all items before merging to `main`.

## Code Quality

- [ ] `npm run test` — all tests pass
- [ ] `npm run build` — zero errors
- [ ] `npm run lint` — no warnings
- [ ] No `console.log` or `console.warn` in source code
- [ ] No hardcoded development URLs

## SEO & Schema

- [ ] Sitemap includes all 15 routes (including `/blog/what-is-aeo`)
- [ ] `robots.ts` allows all AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
- [ ] JSON-LD schema on homepage (`Organization`, `WebSite`)
- [ ] JSON-LD schema on blog post (`BlogPosting`)
- [ ] JSON-LD schema on product pages (`Product`, `Service`)
- [ ] Open Graph tags on all pages
- [ ] Twitter card meta tags configured
- [ ] Canonical URLs set

## Performance

- [ ] Lighthouse Performance score > 90 on key pages
- [ ] Lighthouse SEO score = 100
- [ ] Lighthouse Accessibility score > 90
- [ ] No layout shifts (CLS < 0.1)
- [ ] LCP < 2.5s

## Environment

- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` documented in `.env.production.example`
- [ ] GA4 component renders conditionally (only when env var is set)
- [ ] No secrets in committed files

## Content

- [ ] Blog post content reviewed for accuracy
- [ ] All internal links working
- [ ] All external links have `target="_blank"` and `rel="noopener noreferrer"`
- [ ] No placeholder text remaining

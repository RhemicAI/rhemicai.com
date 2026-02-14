# Post-Deployment Verification

Complete these checks after deploying to production.

## 1. Route Accessibility (all 15 routes)

Test each URL returns HTTP 200:

| URL | Status |
|-----|--------|
| https://rhemicai.com/ | [ ] |
| https://rhemicai.com/about | [ ] |
| https://rhemicai.com/pricing | [ ] |
| https://rhemicai.com/contact | [ ] |
| https://rhemicai.com/blog | [ ] |
| https://rhemicai.com/blog/what-is-aeo | [ ] |
| https://rhemicai.com/careers | [ ] |
| https://rhemicai.com/start-free-trial | [ ] |
| https://rhemicai.com/products | [ ] |
| https://rhemicai.com/products/website-auditing | [ ] |
| https://rhemicai.com/products/competitor-analysis | [ ] |
| https://rhemicai.com/products/code-generation | [ ] |
| https://rhemicai.com/privacy-policy | [ ] |
| https://rhemicai.com/terms-of-service | [ ] |

## 2. Schema Validation

Paste each URL into [Google Rich Results Test](https://search.google.com/test/rich-results):

- [ ] Homepage: Organization + WebSite schema detected
- [ ] Blog post: BlogPosting schema detected
- [ ] Product pages: Product/Service schema detected

## 3. Social Preview

Test Open Graph tags via [opengraph.xyz](https://www.opengraph.xyz/):

- [ ] Homepage shows title, description, image
- [ ] Blog post shows article metadata
- [ ] No broken images in previews

## 4. Mobile Testing

Use Chrome DevTools Device Mode:

- [ ] iPhone SE (375px) - all pages render correctly
- [ ] Pixel 5 (393px) - all pages render correctly
- [ ] iPad (768px) - all pages render correctly
- [ ] No horizontal scroll on any page
- [ ] Sticky mobile CTA appears after scrolling

## 5. Performance (Lighthouse)

Run Lighthouse on production (Chrome DevTools > Lighthouse):

| Page | Perf | SEO | A11y | Best Practices |
|------|------|-----|------|----------------|
| / | [ ] > 90 | [ ] = 100 | [ ] > 90 | [ ] > 90 |
| /blog/what-is-aeo | [ ] > 90 | [ ] = 100 | [ ] > 90 | [ ] > 90 |
| /products | [ ] > 90 | [ ] = 100 | [ ] > 90 | [ ] > 90 |
| /pricing | [ ] > 90 | [ ] = 100 | [ ] > 90 | [ ] > 90 |

## 6. Infrastructure

- [ ] `https://rhemicai.com/sitemap.xml` accessible and contains 15 URLs
- [ ] `https://rhemicai.com/robots.txt` accessible and allows crawlers
- [ ] SSL certificate valid (check expiry)
- [ ] www redirects to non-www (or vice versa)
- [ ] HTTP redirects to HTTPS

## 7. Analytics

- [ ] GA4 real-time view shows page views
- [ ] GA4 DebugView shows events firing
- [ ] No console errors in browser DevTools

## 8. Content

- [ ] Blog post renders with correct formatting
- [ ] Table of Contents links work (anchor navigation)
- [ ] Images/icons load correctly
- [ ] COBE globe renders and rotates

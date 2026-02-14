# Codebase Concerns

**Analysis Date:** 2026-02-13

## Critical

| Issue | Location | Impact | Suggested Fix |
|-------|----------|--------|---------------|
| Logo filename contains special characters | `public/Rhemic logo(:bg).png` | Parentheses and colons in filenames can break on certain filesystems, CI/CD pipelines, and URL encoding. Referenced in `src/components/FixedNav/FixedNav.tsx:20` and `src/components/Footer/Footer.tsx:25`. | Rename to `rhemic-logo.png` and update references. |
| Logo image is 1.6 MB unoptimized PNG | `public/Rhemic logo(:bg).png` | Slows initial page load significantly. Loaded twice (nav + footer). No `priority` prop on nav instance. | Convert to WebP, compress to <100KB, or use SVG. Add `priority` to nav Image. |
| All buttons are non-functional | `src/components/Hero/Hero.tsx:31-37`, `src/components/CTA/CTA.tsx:32-39`, `src/components/ProofSection/ProofSection.tsx:54`, `src/components/Footer/Footer.tsx:56`, `src/components/FixedNav/FixedNav.tsx:46` | "Book a Demo", "See How It Works", "Start Free Trial" buttons have no `onClick` handler, no link, no form — they do nothing. Users will click and nothing happens. | Wire buttons to a Calendly link, contact form, or `mailto:`. At minimum add `href` wrapping or `onClick`. |
| Nav links point to non-existent anchors | `src/components/FixedNav/FixedNav.tsx:6-9` | Links to `#solutions`, `#how-it-works`, `#pricing` but no section has a matching `id` attribute. Clicking nav links does nothing. | Add `id="solutions"` to Features section, `id="how-it-works"` to HowItWorks section, `id="pricing"` (or remove Pricing link until page exists). |
| Footer links all point to `href="#"` | `src/components/Footer/Footer.tsx:43,73,84` | All 10 footer links (Privacy Policy, Terms of Service, About, Blog, Careers, Contact, etc.) and social media icons are dead links. | Replace with real URLs or remove until pages exist. |
| GSAP and @gsap/react are unused dependencies | `package.json:12-13` | `gsap` (^3.14.2) and `@gsap/react` (^2.1.2) are in production dependencies but imported nowhere in `src/`. Adds ~90KB to `node_modules` and potential bundle size if tree-shaking fails. | Remove with `npm uninstall gsap @gsap/react`. |

## Performance

| Issue | Location | Impact |
|-------|----------|--------|
| COBE WebGL globe renders full-screen on all devices | `src/components/CobeGlobe/CobeGlobe.tsx:53` | `mapSamples: 16000` is expensive on mobile. Globe is fixed behind all content, continuously rendering even when scrolled past hero. Canvas sized to full viewport (`w * getDpr()`, `h * getDpr()`). On high-DPI desktops this creates a 2x-resolution full-screen WebGL canvas. |
| Globe rebuilds entirely on every resize | `src/components/CobeGlobe/CobeGlobe.tsx:91-102` | `buildGlobe()` destroys and recreates the entire COBE instance on window resize (debounced 300ms). This causes a visible flash/stutter during resize. |
| AEOEngine runs infinite animation loops | `src/components/AEOEngine/AEOEngine.tsx:180-213` | `EngineColumn` uses `requestAnimationFrame` in an infinite loop that restarts via `setTimeout` every cycle. Combined with `InputColumn`'s `setInterval` (600ms) and `OutputColumn`'s staggered timeouts, this creates constant re-renders even when the section is barely visible (threshold 0.15). |
| Multiple TypewriterText instances each create IntersectionObservers | `src/components/TypewriterText/TypewriterText.tsx:28-44` | Used in 5 sections (Hero, Features, DashboardPreview, HowItWorks, CTA). Each creates its own IntersectionObserver. Not a major issue but could share a single observer. |
| ScrollRevealInit uses `querySelectorAll` DOM manipulation | `src/components/ScrollRevealInit.tsx:18` | Queries DOM directly with `document.querySelectorAll('.scroll-reveal')` rather than using React refs. Only runs once on mount, so new dynamically-added elements won't be observed. |
| StatsBanner injects raw CSS via `<style>` tag | `src/components/StatsBanner/StatsBanner.tsx:32-37` | Inline `<style>` tag with `@keyframes` is rendered into the DOM on every mount. Should use globals.css or Tailwind animation config. |

## Code Quality

| Issue | Location | Suggestion |
|-------|----------|------------|
| AEOEngine.tsx is 442 lines with 5 components in one file | `src/components/AEOEngine/AEOEngine.tsx` | Extract `InputColumn`, `EngineColumn`, `OutputColumn`, `useInView`, and `useReducedMotion` into separate files. The custom hooks (`useInView`, `useReducedMotion`) are reusable and should live in `src/hooks/`. |
| Duplicated `useInView` / `useReducedMotion` patterns | `src/components/AEOEngine/AEOEngine.tsx:74-99`, `src/components/CobeGlobe/CobeGlobe.tsx:21-24`, `src/components/TypewriterText/TypewriterText.tsx:28-44` | Three components independently implement IntersectionObserver and reduced-motion detection. Extract to shared `src/hooks/useInView.ts` and `src/hooks/useReducedMotion.ts`. |
| Hardcoded color values mixed with CSS variables | Throughout all components | Some colors use CSS variables (`var(--text-primary)`), others use hardcoded Tailwind colors (`text-emerald-400`, `bg-violet-600/80`, `#8B5CF6`). The purple brand color `#8B5CF6` appears in at least 5 components but is not defined as a CSS variable or Tailwind theme color. |
| No TypeScript strict mode or path alias validation | `tsconfig.json` | Not verified if `strict: true` is set. The `@/` import alias works but is configured by Next.js defaults. |
| HowItWorks uses `direction: rtl` hack for layout reversal | `src/components/HowItWorks/HowItWorks.tsx:179-181` | Using CSS `direction: rtl` then resetting to `ltr` on children is fragile. Use `flex-row-reverse` or `order` utilities instead. |
| DashboardPreview has non-interactive buttons in mockup | `src/components/DashboardPreview/DashboardPreview.tsx:128-139` | Sidebar nav uses `<button>` elements that do nothing. These should be `<div>` with `role="presentation"` since the dashboard is decorative. |
| Large data arrays inline in component files | `src/components/AEOEngine/AEOEngine.tsx:6-72`, `src/components/HowItWorks/HowItWorks.tsx:3-22`, `src/components/Features/Features.tsx:1-75` | Feature data, engine stages, crawl lines, and output cards are all defined inline. Extract to `src/data/` or `src/constants/` for maintainability. |

## Accessibility

| Issue | Location | Impact |
|-------|----------|--------|
| No skip-to-content link | `src/app/layout.tsx` | Screen reader users must tab through the entire nav on every page. Add a skip link as the first focusable element. |
| No mobile navigation menu | `src/components/FixedNav/FixedNav.tsx:32` | Nav links are hidden on mobile (`hidden md:flex`) with no hamburger menu or alternative. Mobile users have no navigation. |
| Buttons lack accessible labels for screen readers | `src/components/Hero/Hero.tsx:31-37` | "Book a Demo" and "See How It Works" buttons are `<button>` elements with no `type` attribute (defaults to `submit`). Should be `type="button"`. |
| StatsBanner marquee has no pause mechanism | `src/components/StatsBanner/StatsBanner.tsx:40-51` | Continuous scrolling animation cannot be paused. Users with vestibular disorders or motion sensitivity cannot stop it. Does not respect `prefers-reduced-motion`. |
| Missing `aria-label` on sections | All section components | No section has `aria-label` or `aria-labelledby` attributes. Screen readers cannot distinguish between sections. |
| Footer social links go nowhere | `src/components/Footer/Footer.tsx:72-91` | LinkedIn and Twitter links have `href="#"` — screen readers will announce clickable links that go nowhere. |

## SEO

| Issue | Location | Impact |
|-------|----------|--------|
| Missing favicon and social images | `src/app/layout.tsx:15-33` | No `icons` property in metadata. No `openGraph.images` specified. Social shares will have no preview image. |
| No sitemap.xml or robots.txt configured | `next.config.ts` | Empty Next.js config with no sitemap generation. For an SEO/AEO product, this is a bad look. |
| No structured data (JSON-LD) | Entire site | An AEO optimization company should have its own schema markup (Organization, WebSite, Product). None present. |
| Single-page with no route-based pages | `src/app/page.tsx` | All content is on one page. No `/about`, `/pricing`, `/blog` routes exist. The footer advertises these pages but they do not exist. |
| Copyright year hardcoded to 2026 | `src/components/Footer/Footer.tsx:67` | Will become stale. Use `new Date().getFullYear()`. |
| No canonical URL in metadata | `src/app/layout.tsx:15-33` | Missing `metadataBase` and canonical URL configuration. |

## Technical Debt

| Debt | Priority | Effort |
|------|----------|--------|
| Remove unused GSAP dependencies | High | 5 min |
| Wire up all CTA buttons to actual actions (Calendly, form, etc.) | High | 1-2 hours |
| Add section `id` attributes to match nav links | High | 15 min |
| Optimize logo PNG (1.6 MB) to WebP (<100KB) | High | 15 min |
| Rename logo file to remove special characters | High | 10 min |
| Add mobile hamburger menu to FixedNav | High | 2-3 hours |
| Extract shared hooks (`useInView`, `useReducedMotion`) to `src/hooks/` | Medium | 30 min |
| Add `prefers-reduced-motion` respect to StatsBanner marquee | Medium | 15 min |
| Break up AEOEngine.tsx (442 lines) into sub-components | Medium | 1 hour |
| Consolidate brand color `#8B5CF6` into CSS variable or Tailwind theme | Medium | 30 min |
| Add sitemap.xml, robots.txt, and JSON-LD structured data | Medium | 1-2 hours |
| Replace `direction: rtl` hack in HowItWorks with proper CSS | Low | 15 min |
| Move inline `<style>` from StatsBanner to globals.css | Low | 10 min |
| Extract data constants to `src/data/` or `src/constants/` | Low | 30 min |
| Add favicon and OpenGraph images | Medium | 30 min |
| Reduce COBE `mapSamples` on mobile for performance | Medium | 15 min |

## Archived Code

The `archive/` directory (9.6 MB, gitignored) contains orphaned components and assets from the initial build on 2026-02-12. These were removed during the dark-mode-only redesign and COBE globe integration.

**Archived Components:**
| Directory | What It Was | Why Removed |
|-----------|-------------|-------------|
| `archive/AttentionHero/` | Hero with GSAP scroll-triggered animations | Replaced by current minimal Hero with TypewriterText |
| `archive/ParallaxHero/` | Parallax scrolling hero variant | Replaced by current Hero |
| `archive/MinimalHero/` | Minimal hero variant | Iterated into current Hero |
| `archive/CustomCursor/` | Custom animated cursor component | Removed for simplicity |
| `archive/Navbar/` | Original navbar with module CSS | Replaced by FixedNav with Tailwind |
| `archive/StickyHeader/` | Sticky header variant | Replaced by FixedNav |
| `archive/AboutSection/` | Empty directory | Never implemented |
| `archive/SolutionsSection/` | Empty directory | Never implemented |

**Archived Assets:**
| File | Size | Why Removed |
|------|------|-------------|
| `archive/intelligence-web.mp4` | 2.1 MB | Video background replaced by COBE globe |
| `archive/video1.mp4` | 3.4 MB | Unused video asset |
| `archive/Rhemic logo with background.png` | 1.3 MB | Replaced by `Rhemic logo(:bg).png` in public/ |
| `archive/starthero.png` | 768 KB | Hero background image, replaced by COBE globe |
| `archive/endhero.jpeg` | 324 KB | End hero image, no longer used |
| `archive/realFrames/` + `realFrames.zip` | 1.5 MB | Frame sequence for scroll-based animation, abandoned |
| `archive/*.svg` | <2 KB each | Next.js/Vercel default SVGs from `create-next-app` |

**Archived Planning Docs:**
| File | Purpose |
|------|---------|
| `archive/AI_CONVERSION_STATS.md` | Research on AI search conversion statistics |
| `archive/AI_MODEL_LABELS.md` | AI model naming reference |
| `archive/ASSET_CREATION_PLAN.md` | Original asset creation plan |
| `archive/ASSET_PLAN_REFINED.md` | Refined asset plan |
| `archive/BANNER_SELECTION.md` | Stats banner content decisions |
| `archive/FONT_RESEARCH.md` | Font selection research (Satoshi chosen) |
| `archive/HERO_SECTION.md` | Hero section design decisions |
| `archive/HOMEPAGE_SUMMARY.md` | Homepage layout summary |

**Recommendation:** The archive directory serves as local history. It is properly gitignored. No action needed unless disk space is a concern; the 9.6 MB is negligible.

---

*Concerns audit: 2026-02-13*

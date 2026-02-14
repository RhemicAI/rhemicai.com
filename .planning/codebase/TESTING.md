# Testing Patterns

**Analysis Date:** 2026-02-13

## Current State

No testing infrastructure exists in this project. There are zero test files, no test configuration, no test framework installed, and no test-related npm scripts.

## Test Framework

**Runner:** None installed
- No jest, vitest, playwright, cypress, or testing-library in `package.json`
- No test config files (`jest.config.*`, `vitest.config.*`, `playwright.config.*`)

**Assertion Library:** None

**Run Commands:**
```bash
# No test commands available
# package.json scripts:
npm run dev         # next dev
npm run build       # next build
npm run start       # next start
npm run lint        # eslint
```

## Test File Organization

**Location:** No test files exist anywhere in `src/`

**Naming:** Not established

## Test Files Found

| File | Type | Coverage |
|------|------|----------|
| None | N/A | N/A |

## Testing Infrastructure

**CI/CD:** No CI pipeline configuration detected (no `.github/workflows/`, no `Jenkinsfile`, no `circle.yml`)

**Coverage:** No coverage tooling configured

## Gaps

**All components are untested. The full component list:**

| Component | File | Complexity | Priority |
|-----------|------|------------|----------|
| TypewriterText | `src/components/TypewriterText/TypewriterText.tsx` | High (state machine, timers, IntersectionObserver) | High |
| AEOEngine | `src/components/AEOEngine/AEOEngine.tsx` | High (3 sub-components, requestAnimationFrame, timers, IntersectionObserver) | High |
| CobeGlobe | `src/components/CobeGlobe/CobeGlobe.tsx` | High (WebGL canvas, resize handler, visibility API) | Medium |
| ScrollRevealInit | `src/components/ScrollRevealInit.tsx` | Medium (IntersectionObserver, DOM queries) | Medium |
| FixedNav | `src/components/FixedNav/FixedNav.tsx` | Low (static render with data) | Low |
| StatsBanner | `src/components/StatsBanner/StatsBanner.tsx` | Low (CSS animation, static data) | Low |
| Hero | `src/components/Hero/Hero.tsx` | Low (static render, uses TypewriterText) | Low |
| Features | `src/components/Features/Features.tsx` | Low (static render with data array) | Low |
| ProofSection | `src/components/ProofSection/ProofSection.tsx` | Low (static render with data array) | Low |
| DashboardPreview | `src/components/DashboardPreview/DashboardPreview.tsx` | Medium (sub-components: ScoreRing, Sparkline, StatusDot) | Low |
| HowItWorks | `src/components/HowItWorks/HowItWorks.tsx` | Medium (3 visual sub-components) | Low |
| CTA | `src/components/CTA/CTA.tsx` | Low (static render) | Low |
| Footer | `src/components/Footer/Footer.tsx` | Low (static render with data) | Low |
| Home (page) | `src/app/page.tsx` | Low (composition of components) | Low |
| RootLayout | `src/app/layout.tsx` | Low (layout wrapper) | Low |

## Recommended Testing Approach

**Framework:** Vitest + React Testing Library
- Vitest integrates well with Next.js and is faster than Jest for Vite/Turbopack projects
- React Testing Library for component rendering tests
- Install: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`

**Config location:** `vitest.config.ts` at project root

**Test file location:** Co-located with components: `src/components/ComponentName/ComponentName.test.tsx`

**Priority 1 -- Smoke Tests (all components):**
- Verify each component renders without crashing
- Snapshot tests for static components (Hero, Features, ProofSection, Footer, CTA, StatsBanner)

**Priority 2 -- Behavior Tests (interactive components):**
- `TypewriterText`: Verify text appears character by character, cursor visibility states, multi-line behavior
- `AEOEngine`: Verify IntersectionObserver triggers animation, reduced motion handling, tab visibility pausing
- `ScrollRevealInit`: Verify `.scroll-reveal` elements get `.revealed` class added
- `CobeGlobe`: Verify canvas element renders, cleanup on unmount

**Priority 3 -- Visual/E2E Tests:**
- Playwright for full-page screenshot regression tests
- Verify scroll-triggered animations fire correctly
- Verify responsive layout switches at breakpoints

**Build Verification:**
- `npm run build` serves as a basic type-checking and compilation test
- `npm run lint` validates ESLint rules
- Both should be run in CI before any deployment

---

*Testing analysis: 2026-02-13*

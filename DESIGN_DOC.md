# Rhemic AI — Website Design Doc

Source of truth for the visual + interaction system of `rhemicai.com`. Reverse-engineered from the current production code in `src/app/` and `src/components/` on 2026-05-16. Pair with `BRAND_IDENTITY.md` (voice/messaging) — this doc covers everything you can see.

---

## 1. Design Philosophy

**Dark, technical, AI-native.** The site sells visibility inside AI answer engines, so the surface itself looks like the answer surface: pure black canvas, monochrome type, a single spinning globe as the only chromatic anchor. Everything reads as instrumentation, not marketing.

Three rules everything is built on:

1. **Monochrome by default, color used as evidence.** Color appears in two places only: the globe (sky-blue selection highlight) and the AI platform logos (their own brand marks). Everything else is white-on-black with opacity ramps.
2. **Mono for headlines, sans for body.** IBM Plex Mono signals technical seriousness; Inter keeps body copy readable at small sizes. Never invert.
3. **Tokens, not inline values.** All color comes from CSS variables in `globals.css`. Tailwind references them with `var(--…)`. Change once, propagate everywhere.

---

## 2. Color System

All tokens defined in `src/app/globals.css` `:root`. Tailwind is configured to consume them via `var()` references — do not hardcode hex in components.

### 2.1 Background

| Token | Value | Use |
|---|---|---|
| `--bg-base` | `#0a0a0a` | Page canvas, body, nav-scrolled state |
| `--bg-elevated` | `#111111` | Cards, modals, raised surfaces |
| `--bg-glass` | `rgba(255,255,255,0.08)` | Pricing tiles, FAQ rows, glassmorphic chips |
| `--bg-glass-hover` | `rgba(255,255,255,0.14)` | Hover state for glass surfaces |

The page is **not** literally `#000`. `#0a0a0a` (near-black with a hint of warmth) keeps the globe's blues from looking artificially saturated and avoids OLED clipping.

### 2.2 Text (white with opacity ramp)

| Token | Value | Use |
|---|---|---|
| `--text-primary` | `#ffffff` | Headlines, primary body, button labels on dark |
| `--text-secondary` | `rgba(255,255,255,0.85)` | Sub-headlines, secondary CTA labels |
| `--text-tertiary` | `rgba(255,255,255,0.55)` | Supporting body, platform logo color |
| `--text-muted` | `rgba(255,255,255,0.40)` | Eyebrow labels, captions, "Optimized for" |
| `--text-faint` | `rgba(255,255,255,0.25)` | Disabled, deep tertiary |

This ramp is the entire greyscale system — no separate "gray-400/500/600". Hierarchy comes from opacity, not hue.

### 2.3 Borders

| Token | Value | Use |
|---|---|---|
| `--border-subtle` | `rgba(255,255,255,0.06)` | Section dividers, nav shadow |
| `--border-default` | `rgba(255,255,255,0.10)` | Card borders, default UI lines |
| `--border-strong` | `rgba(255,255,255,0.20)` | Secondary CTA outline, focus states |

### 2.4 Button

| Token | Value | Use |
|---|---|---|
| `--btn-primary-bg` | `#ffffff` | Primary CTA fill |
| `--btn-primary-text` | `#000000` | Primary CTA label |

Primary CTA is **inverted white on black**. Secondary CTA is an outlined ghost button using `--border-strong`. There is no brand "blue button" — the site refuses chroma in interactive elements on purpose.

### 2.5 Accent (selection only)

| Use | Value |
|---|---|
| Text selection background | `rgba(56, 189, 248, 0.30)` — Tailwind `sky-400` @ 30% |
| Selection text color | `#fff` |

`sky-400` is the only named accent and it lives in exactly one place: text selection. It echoes the globe's halo without ever appearing in a component.

### 2.6 Image / globe palette

The Cobe WebGL globe (`CobeGlobeHome`) provides the only ambient color. Read its config for the actual sphere/marker/glow hex values — they are the de facto secondary palette. The fixed gradient overlay on `layout.tsx` darkens the bottom of the viewport:

```
linear-gradient(180deg,
  rgba(10,10,10,0.00) 0%,
  rgba(10,10,10,0.35) 55%,
  rgba(10,10,10,0.75) 100%
)
```

This ensures text-over-globe readability without a backdrop blur. Hero text gets an additional `text-shadow: 0 0 28px rgba(3,7,18,0.52)` and an optional `.text-over-globe` utility with a three-stop shadow stack.

---

## 3. Typography

Two Google Fonts loaded once in `src/app/layout.tsx` as CSS variables:

| Family | Variable | Weights | Role |
|---|---|---|---|
| IBM Plex Mono | `--font-ibm-plex-mono` | 400, 500, 600, 700 | Display, headings, eyebrow labels, code feel |
| Inter | `--font-inter` | variable | Body, UI, captions, buttons |

Tailwind alias: `font-display` / `font-mono` → IBM Plex Mono. `font-body` → Inter. `h1`–`h6` are globally bound to Plex Mono in `globals.css` with `letter-spacing: -0.02em`.

### 3.1 Hero scale

The hero uses fluid clamp so the two-line headline always fits one line on each breakpoint:

```
text-[clamp(1.6rem, 3.8vw, 3.25rem)]
font-weight: 800 (extrabold)
line-height: 1.1
letter-spacing: -0.03em
```

Sub-headline drops to `text-sm md:text-base`, `opacity: 0.70`, `leading: 1.6`, Inter regular.

### 3.2 Eyebrow / micro-labels

`text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)]` — used for "Optimized for", section eyebrows, footer column titles. Wide-tracked uppercase mono labels are a recurring motif and should not be replaced with title case.

### 3.3 Captions under logos

`text-[9px] tracking-wider uppercase text-[var(--text-muted)]` — even smaller and tighter than eyebrows. Reserved for tiny meta below visual marks (e.g. "ChatGPT" under the OpenAI glyph).

---

## 4. Layout & Spacing

- **Page rhythm:** `min-h-screen` hero, then stacked sections — no horizontal scroll (`overflow-x-hidden` on body and hero). Content is centered with `max-w-5xl mx-auto` for hero, wider containers for feature grids.
- **Section padding:** typical pattern is `px-6 pt-24 pb-12` for hero, with subsequent sections in `py-20`–`py-24` ranges. Mobile-first; sm/md breakpoints expand padding.
- **Stacking:** the globe sits at `z-0`, the gradient overlay at `z-1`, all content at `z-10`. Never raise content above `z-10` except for modals and fixed nav.
- **Scroll padding:** `html { scroll-padding-top: 5rem }` so anchored sections clear the fixed nav.

---

## 5. Components

### 5.1 FixedNav (`components/FixedNav/`)

Top nav is fixed and switches state DOM-side (no React re-renders) using two utility classes:

- `.nav-transparent` — no background, no shadow, GPU-promoted (`transform: translateZ(0)`)
- `.nav-scrolled` — `rgba(10,10,10,0.95)` background, `box-shadow: 0 1px 0 var(--border-subtle)` (deliberately not `border-bottom` to avoid sub-pixel seam)

Mobile CTA pill uses `.cta-hidden` / `.cta-visible` for slide-up reveal on scroll.

### 5.2 Buttons

**Primary:**
```
px-10 py-4 text-base font-semibold
text-black bg-white hover:bg-gray-100
rounded-[5px] shadow-lg shadow-white/10
transition-all duration-200 hover:scale-105
font-body
```

**Secondary (ghost):**
```
px-10 py-4 text-base font-medium
text-[var(--text-secondary)]
border border-[var(--border-strong)]
rounded-[5px]
hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]
transition-colors duration-300
```

Notes:
- Radius is **5px everywhere** — not 4, not 6, not Tailwind `rounded-md`. Locked.
- Primary gets a faint white-glow shadow (`shadow-white/10`) — this is the only place we lift an element with light.
- Hover scale on primary only (`hover:scale-105`). Secondary uses color transition.

### 5.3 Hero (`components/Hero/Hero.tsx`)

The benchmark for the rest of the site. Order:

1. Two-line clamp headline (Plex Mono, 800)
2. One-paragraph subtitle at 70% opacity (Inter, regular)
3. Two CTAs — primary white + secondary outline
4. Eyebrow "OPTIMIZED FOR" + four monochrome platform glyphs (ChatGPT, Claude, Perplexity, Gemini)
5. Single-line stat citation below logos (Gartner 25% drop projection)

Platform glyphs render at 18×18, `opacity-60`, `currentColor` → inherits text-tertiary. The Gemini glyph keeps its native radial gradient (`#9168c0 → #5684d1 → #1ba1e3`) — the one chromatic exception in the section, and it appears at thumbnail scale so it reads as a logo, not an accent.

### 5.4 Pricing / FAQ / Features

All use the glass surface pattern:

```
bg-[var(--bg-glass)]
border border-[var(--border-default)]
rounded-[5px]
hover:bg-[var(--bg-glass-hover)]
```

No backdrop-blur on most surfaces — the dark base is enough. Reserve `backdrop-blur` for the contact modal / SummaryModal where content sits over the globe.

### 5.5 Globe (`components/CobeGlobe/CobeGlobeHome.tsx`)

- Renders **only on `/`** — returns `null` on every other path
- `fixed inset-0 z-0`
- WebGL via `cobe` package; spinning, dotted-marker style
- All other pages get the plain `--bg-base` canvas

This is the single largest design decision on the site: the homepage has a globe, no other page does. Do not change this without explicit Karim approval.

### 5.6 Scrollbar

Custom, minimal: 4px wide, transparent track, `rgba(255,255,255,0.1)` thumb, 2px radius. Webkit only — Firefox uses default.

---

## 6. Motion

- **Default transitions:** `transition-colors duration-300` for hover color changes, `transition-all duration-200` for primary button micro-interaction.
- **AEO Engine fade-in:** keyframe `aeo-fade-in` (translateY 4px → 0, opacity 0 → 1) — defined in `globals.css`, applied to the AEO Engine word reveals.
- **Nav state changes:** DOM class swap, no animation library.
- **Scroll:** Lenis-based smooth scroll via `SmoothScroll` component, mounted globally.
- **No Framer Motion** in current production code. Keep motion lean — JS animation should only appear for the globe and the AEO Engine reveal.

---

## 7. Iconography

- **Brand icon:** `src/app/icon.svg` — a monochrome glyph, kept as a single SVG, not a font.
- **Platform logos:** raw SVG paths inline in components (see Hero). All set to `fill="currentColor"` so they pick up `--text-tertiary`. Only Gemini retains its native gradient.
- **UI icons:** prefer inline SVG over icon fonts. No Lucide / Heroicons dependency in `package.json` last time we checked — if you add one, justify it.

---

## 8. SEO / Schema (visual surface implications)

Worth noting because it dictates page structure:

- Every page uses `buildMetadata()` from `@/lib/seo` — title template `%s | Rhemic AI`
- Layout injects `SchemaOrg` (Organization + WebSite JSON-LD) and `Breadcrumbs` (BreadcrumbList) on every page
- Per-page schemas via `PageSchemas` from `@/components/seo/PageSchemas`
- Blog posts wrap in `ArticleSchema`

The visual implication: **every page needs a clear H1, breadcrumb-able URL path, and a structured hero**. Don't ship pages with floating text and no anchor heading.

---

## 9. Adding New Pages / Components

1. **Use tokens.** No hex in TSX. No Tailwind color names (`text-gray-400`, `bg-zinc-900`). Reach for `var(--…)`.
2. **Mono for headlines, Inter for body.** `font-display` or `font-mono` on `h*`. `font-body` on `p`/`span`.
3. **Radius is 5px.** `rounded-[5px]`.
4. **Buttons:** primary = white bg / black text + `shadow-white/10` + `hover:scale-105`. Secondary = ghost outline + color transition.
5. **No globe outside `/`.** Don't import `CobeGlobeHome` anywhere else.
6. **Color = evidence.** If you're reaching for color, ask whether it's representing data (chart, status, brand logo) or trying to decorate. Decoration loses.
7. **Test on dark.** There is no light mode. Don't design for one.

---

## 10. Open Issues / Drift Watch

- **Two-font load is heavy.** IBM Plex Mono × 4 weights + Inter variable. Watch CLS and consider trimming weights if Lighthouse drops.
- **No documented chart palette.** When `DashboardPreview` ships real data viz, we'll need a 4–6 color sequential palette grounded in the sky-400 selection accent. Not specced yet.
- **No light mode.** Intentional today; revisit only if a customer-facing dashboard ships at the same URL.
- **Brand identity doc (`BRAND_IDENTITY.md`) is from Feb 2026 and pre-pivot.** Voice and messaging there still references AEO-as-product. The current site copy ("Get AI to recommend your business") has already moved past it. Sync the brand doc next.

---

## Pointers

- Tokens: `src/app/globals.css`
- Tailwind: `tailwind.config.js`
- Fonts: `src/app/layout.tsx`
- Hero benchmark: `src/components/Hero/Hero.tsx`
- Brand voice: `BRAND_IDENTITY.md`
- Engineering guide: `CLAUDE.md`

*End of DESIGN_DOC.md.*

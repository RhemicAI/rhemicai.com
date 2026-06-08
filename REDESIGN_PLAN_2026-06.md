# rhemicai.com — New Design System Plan

**Date:** 2026-06-08
**Owner:** Karim · drafted by web-dev
**Status:** PLAN — no build, no deploy yet (deploy decided later)
**Repo:** `rhemic/engineering/rhemic-ai-dot-com/` → `github.com/RhemicAI/rhemicai.com`

---

## 1. What we're doing

Build a **new design system** for rhemicai.com — real generated assets (HiggsField
MCP), real imagery, real testimonials — on a **fully agnostic positioning: target
everyone, no vertical leads.**

This is a reposition + redesign, not a visual refresh. The live site is wrong on two axes:

1. **Positioning is med-spa-specific.** Homepage schema says "Med Spa Growth and Call
   Capture System"; Hero/copy is AI-receptionist + missed-call-recovery + Consult Capture
   Layer. Killed 2026-06-08.
2. **A second legacy layer (AEO-as-product)** runs through `/answers`, `/compare`,
   `/glossary`, ~10 blog posts. Also legacy.

New target state: a horizontal, outcome-led platform site that reads as agnostic
infrastructure, not a vertical play.

---

## 2. The constraint agnostic positioning forces

**Agnostic = no real-world vertical imagery.** A photo of a med-spa room, a plumber, a
dental office — any of them — signals a vertical and breaks "no one leads." So the entire
asset strategy must be **abstract / conceptual / product-surface**, not lifestyle or
stock-people. This is the single biggest creative constraint and it actually plays to the
existing brand's strength (dark, technical, instrumentation-feel).

What HiggsField generates for us, therefore:
- Abstract brand/hero imagery (data, signal, network, light-on-dark — conceptual)
- Product-surface visuals (dashboard/report UI renders, not screenshots of a vertical)
- OG/social cards
- Section texture / supporting marks

What it does **not** generate: people in business settings, vertical scenes, customer
faces. (Resolves the fake-avatar problem too — see §5.)

---

## 3. Design language decision (GATE 1)

The current system (`DESIGN_DOC.md`) is genuinely strong and anti-slop: `#0a0a0a` canvas,
monochrome white-on-black opacity ramp, IBM Plex Mono headlines + Inter body, color =
evidence only, 5px radius, homepage-only Cobe globe. Distinctive. Easy to wreck.

Three directions to choose from before any pixels:

- **A — Evolve the canon (recommended).** Keep the dark/mono/color-as-evidence spine and
  5px discipline; replace the globe-only-homepage motif with a real generated-image
  visual layer that works across all pages. Lowest risk of going generic, keeps the
  anti-slop edge, modern with real assets.
- **B — New language, keep the discipline.** Fresh visual direction (could move off pure
  monochrome, introduce a controlled accent), but carry over the token system and
  anti-slop rules. Bigger swing, more Stitch exploration.
- **C — Full break.** New everything. Highest effort, highest risk of slop.

**Decision needed from Karim.** Default if silent: A.

---

## 4. Information architecture

Collapse the sprawl. Current site is ~60 routes, much of it AEO-SEO surface area built for
the old answer-engine product. New IA (proposal, agnostic):

- `/` — agnostic outcome hero, how-it-works, product surface, proof, pricing, CTA
- `/product` (or `/how-it-works`) — what the platform does, horizontally
- `/pricing` — Tier 1 Visibility $300, Tier 2/3 TBD (read from `src/data/pricing.ts`)
- `/about`, `/contact`, `/careers` — keep
- **Legacy SEO surface** (`/answers`, `/compare`, `/glossary`, `/blog`, vertical landing
  pages): decide keep-as-is / reskin / prune. They drive organic; don't nuke blind.
  → **GATE 2: how much of the legacy SEO footprint do we carry into the new system?**

---

## 5. Testimonials — BLOCKER (GATE 3)

`src/data/testimonials.ts` is explicitly **draft/fake** (file says so). Names + med-spa
companies are placeholders; `/images/testimonials/*.png` avatars are AI faces. You asked
for *actual* testimonials.

Options:
1. **Real quotes exist** → Karim supplies approved customer quote + name + company +
   permission. Best.
2. **None exist yet** → replace the social-proof section with non-fabricated proof:
   outcome metrics, logos (if we have permission), or a "results" framing that doesn't
   invent customers. No fake people.
3. Pull the section until real proof lands.

**I will not generate fake testimonials or fake customer faces.** Need Karim's call on
which path.

---

## 6. Asset production (HiggsField MCP)

Once GATE 1 sets the language:
1. Write an **asset list** (hero, ~3 product-surface renders, OG card, section textures) —
   each with a prompt spec grounded in the chosen language.
2. Generate via `mcp__claude_ai_HiggsField_MCP__generate_image` (check balance first).
3. Curate, optimize (WebP/PNG, per repo rule: only optimized images in `/public/`,
   video CDN-hosted), drop into `public/images/`.
4. Self-review against anti-slop checklist before they go in.

---

## 7. Phases

| Phase | What | Output | Gate |
|---|---|---|---|
| 0 | Lock positioning + IA + testimonial path | this doc, approved | G1, G2, G3 |
| 1 | Design language — Stitch exploration | direction boards | G1 |
| 2 | Asset list + HiggsField generation | real images in `/public` | — |
| 3 | Build: tokens/components → homepage → core pages | Next.js on a branch | — |
| 4 | Strip med-spa + AEO-product copy/schema; agnostic copy pass | clean SOT copy | — |
| 5 | Playwright visual review + anti-slop self-review | screenshots | — |
| 6 | Vercel preview | preview URL | deploy gate |
| 7 | Prod promote | live rhemicai.com | Karim approval |

Build/deploy phases run **after** this plan is approved. Today stops at Phase 0.

---

## 8. Risks

- **Going generic.** New assets + new system is the easiest way to lose the anti-slop edge.
  Mitigation: GATE 1 default = evolve, not nuke.
- **SEO regression.** The legacy `/answers` `/compare` `/glossary` `/blog` footprint ranks.
  Killing it blind loses organic. GATE 2 handles this deliberately.
- **No real proof.** If we have no testimonials and no metrics, the proof section is thin.
  Honest framing beats fabrication.
- **Copy gaps.** Agnostic copy for the new sections may not exist. I surface gaps, I don't
  write filler.

## 9. Acceptance criteria

- Zero med-spa-specific or AEO-as-product language/schema in core pages.
- All imagery real (HiggsField) or removed — no placeholder/stock people.
- No fabricated testimonials or faces.
- Design tokens respected (or new tokens documented if GATE 1 = B/C).
- Lighthouse not regressed; CLS watched (two-font load).
- Preview URL green before any prod talk.

---

## 10. Open decisions (need Karim)

1. **GATE 1** — design language: Evolve canon (rec) / new language same discipline / full break.
2. **GATE 2** — legacy SEO footprint: keep / reskin / prune `/answers` `/compare` `/glossary` `/blog`.
3. **GATE 3** — testimonials: real quotes incoming / replace with metrics-proof / pull section.
4. Pricing: Tier 2/3 still TBD — placeholder or hold pricing page?

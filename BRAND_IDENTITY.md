# Rhemic AI Brand Identity

*Cream-paper editorial system. Locked 2026-06-08 with the redesign shipped in PR #75 (`redesign/cream-paper-agnostic`), now live on rhemicai.com. Supersedes the Feb 2026 "Adaptive Engagement Optimization / 99% lower infra" AEO brand and the dark/teal "AI company" look.*

---

## Positioning

Rhemic is **vertical-agnostic, local-service-led, conversion-first**. We are the full stack — **SEO + GEO + AEO** — not an AI-only point tool. We make local businesses the one AI recommends and the one that captures the lead when it comes in.

This is the web expression of the 2026-06-08 multi-vertical pivot (see `rhemic/gtm/multi-vertical-pivot-2026-06-08.md`). Lead with home services; med spa is one example vertical among many, never the lock.

## Motto / category line
**Be the business AI recommends, and the one that answers first.**

## Hero headline (live)
**Be the business AI recommends, and the one that answers first.**

## Site title (live)
**Rhemic AI. Get found, recommended, and booked in the AI era.**

## Value proposition
You're losing leads in three places at once — AI answers don't name you, Google buries you, and the calls that do come in go unanswered. Rhemic closes all three: visibility (get found and recommended), capture (answer and book every lead), and a full growth system on top.

## Results framing
**Don't take our word for it. Take the AI's.** Results section headline: *"Businesses we got AI to recommend."* Proof over promise.

## Offer (3-layer plan)
- **Visibility** — self-serve SEO / GEO / AEO. Get found and recommended across ChatGPT, Claude, Perplexity, Gemini, Google.
- **Capture** — Visibility + a custom Instant Response (IRP) layer and lead tracker so no inbound lead is dropped.
- **Full growth system** — done-for-you growth + booking. Done-for-you tier $2,000.

(Live pricing is the source of truth in `src/data/pricing.ts`. Do not hardcode prices in copy.)

---

## Visual system — cream-paper editorial

**Canvas.** Warm cream paper `#f4eede` with a heavy **dual-layer paper grain** (multiply grain on cream, light-fleck grain on the dark `ink-block` sections). Print-editorial feel, not glossy SaaS.

**Spot ink.** Single oxblood `#a93c2b`. One accent, used sparingly — the `text-spot` ✦ marks, emphasis, key CTAs. No teal. No gradients. No glow.

**Type.**
- Display / headlines: **Fraunces** (optical serif)
- Body: **Inter Tight** (and **Newsreader** serif in editorial body blocks)
- Labels / nav / numbers / microcopy: **JetBrains Mono**, uppercase, tracked out

**Structure.** 2–3px borders. Printed-rule dividers. Real Rhemic logo in nav + footer. Real AI engine marks (OpenAI / Claude / Perplexity / Gemini / Google) rendered as uniform ink logos via CSS mask. Dark `ink-block` sections for contrast bands.

**Removed in the redesign.** The Cobe WebGL globe, the dark gradient overlay, and the offer popup are gone from the new layout. Do not reintroduce them.

## Voice
Operator and builder, not a marketer performing intelligence. Sharp, direct, money-pain-first. Lead with the leak the business is already losing money to, then the fix. No buzzwords, no "AI-powered" filler, no em dashes.

---

## Scope notes for engineers
- The redesign covers the **core pages**: homepage, services, how-it-works, results (`/testimonials`), pricing, privacy, plus the scan funnel and shared design system.
- **Legacy SEO pages** (`/answers`, `/compare`, `/glossary`, `/blog`) are intentionally **out of scope and still run the old dark palette**. The site currently runs two design systems. Migrating the legacy SEO pages to cream-paper is open follow-up work.
- Cream/oxblood colors are currently applied **inline per-component** (arbitrary Tailwind values / inline styles), not via a central token file. Centralizing them into `globals.css` + `tailwind.config.js` is tracked tech debt — do that before scaling the design to more pages.

## Source of truth
- Live site: https://rhemicai.com
- Design implementation: `src/app/`, `src/components/`, fonts in `src/app/layout.tsx`
- Pricing: `src/data/pricing.ts`
- Positioning: `rhemic/gtm/multi-vertical-pivot-2026-06-08.md`
- Shipped in: PR #75 (merged to `main` 2026-06-08)

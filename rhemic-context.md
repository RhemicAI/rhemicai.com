# Rhemic AI — SEO Sprint Context

Working reference for the SEO sprint that started 2026-04-24. Every audit, recommendation, and copy deliverable must be consistent with this file. If anything here goes stale, update this file first before producing new outputs.

---

## Business

- Name: Rhemic AI
- Domain: rhemicai.com
- Category: B2B SaaS

## Product

AI Competitive Visibility Intelligence for digital agencies. Rhemic scans ChatGPT, Claude, Gemini, and Perplexity for buyer-intent prompts and reports the percentage visibility gap between an agency's client and the client's top competitors.

Core output: comparative gap report — example phrasing "your client shows up in 14% of buyer-intent prompts, their competitor in 52%."

Secondary output: on-demand fix asset generation.

## ICP

Digital agencies serving local and mid-market clients.

## GTM motion

White-label partnerships with agencies. Warm intros where possible.

## Category language — use exactly these phrases, do not substitute

- "AI Competitive Visibility Intelligence" — brand/category term, NOT a ranking target
- "show up where buyers are asking"
- "close the visibility gap"

Do not substitute with "AEO" or "GEO" unless the user introduces that term first.

## Brand story arc — every output aligns with

1. The Shift — buyers ask AI instead of Googling
2. The Stakes — businesses not in AI answers are invisible
3. The Transformation — Rhemic scans, finds gaps, generates fixes
4. The Vision — local businesses thrive with the AI shift

## What Rhemic is NOT

Not a local services business. Skip Google Business Profile, map pack, service-area pages, Yelp/BBB/Angi citations, city-plus-service page builds. This is B2B SaaS SEO, not local SEO.

---

## Phase 0 answers (captured 2026-04-24)

### Competitors to audit against

1. Gushwork AI — https://www.gushwork.ai/
2. SEMrush — https://www.semrush.com/
3. New Patients Inc — https://newpatientsinc.com/

### Target organic ranking keywords (confirmed)

1. AI visibility tracking for agencies
2. LLM visibility monitoring
3. ChatGPT SEO for agencies
4. AI search visibility tool
5. white label AI SEO platform

"AI Competitive Visibility Intelligence" is a brand/category term, not a ranking target.

### Tooling access (Chrome sessions)

- Google Search Console, property `rhemicai.com` — YES, logged in
- SEMrush — NO, user does not have an account
- Ahrefs — NO, user does not have an account
- GA4, property tied to `rhemicai.com` — NO, not set up / not accessible

### Existing blog or content hub

None. Must be built. User identifies the absence of a content strategy / blog engine as the biggest current SEO problem.

### Existing backlink, directory, or PR work

None known. No prior outreach or listings to account for.

### User's one-sentence biggest SEO problem

"Missing a content strategy / blog engine."

### Site age note

`rhemicai.com` is more than 90 days old, but GSC impression history may not cover a full meaningful 90 days. Confirmed empirically in Phase 2A.

---

## Operating rules

- No sycophancy. Go straight to output.
- Flag risks proactively before they bite.
- Label every recommendation with impact (high/medium/low) and time-to-see-results.
- Comparisons, audits, and matrices → `.xlsx` saved in the project folder.
- When unsure, say "insufficient information." Never guess competitor names, keyword volumes, backlink counts, or schema values.
- Never ask the user for context twice. Reference this file.
- Show the plan before any significant action: publishing, sending, deleting, or modifying live site assets. Reading and analysis proceed without approval.
- Run Claude in Chrome one tab at a time. It is a research preview and unreliable under concurrency.

---

## Tooling available (capabilities for this sprint)

Can drive via Claude in Chrome (subject to active login sessions):

- Google Search Console
- Google SERPs (public search)
- Google Rich Results Test (`search.google.com/test/rich-results`)
- Wikidata search
- Crunchbase, LinkedIn Company pages, G2, Capterra, Product Hunt, GetApp, SaaSHub, Wellfound/AngelList, Owler (public-facing; claim/edit requires the user's credentials)

Cannot drive:

- SEMrush — no account
- Ahrefs — no account
- GA4 — not accessible

Implication: the only first-party traffic data available this sprint is Google Search Console. No behavioral data (sessions, bounce, conversion), no third-party keyword difficulty or volume data, no third-party backlink data.

File and shell tools:

- Read / Write / Edit against `/Users/bivour/Desktop/RHEMIC/00_engineering/RhemicAI-dot-com`
- Bash sandbox for scripting, schema validation, spreadsheet generation

---

## Risks entering Phase 2

- **Phase 2A (GSC audit) will likely be thin.** No blog exists, so ranking surface is limited to homepage plus product pages. The page-2 goldmine analysis may return few or zero qualifying keywords. Will pivot to whatever data exists plus Phase 2B input, as instructed.
- **Phase 2B (Keyword Gap) is BLOCKED as originally scoped.** Neither SEMrush nor Ahrefs is available. Per the user's operating rules, I will not substitute free tools without explicit approval. Decision required from the user: (a) skip 2B entirely, (b) approve a degraded 2B using free/low-cost tools (Google Keyword Planner via Google Ads, Ubersuggest free tier, Google Autocomplete/"People Also Ask" scraping, direct SERP analysis of competitor ranking pages) — note this yields no reliable keyword difficulty and no proper competitor gap analysis, (c) pause 2B until the user obtains an Ahrefs or SEMrush seat.
- **Phase 2C (Entity audit) should be the highest-signal audit given current state.** New category language, early-stage site, no content flywheel, no directory footprint. Most leverage per hour of effort.
- **Claude in Chrome reliability.** Research preview. If a login wall, captcha, or anti-bot check blocks a tab, I will stop and report rather than retry indefinitely.

---

## Git

- Working branch: `seo-sprint-2026-04-24` (off `main`)
- Pre-existing file not yet reviewed: `RHEMICAI_SEO_AEO_OPTIMIZATION_PLAN.md` (dated Apr 4, 13KB). Will only read on user instruction.

---

## Decisions logged during sprint

- Hostname canonicalization: **Option A — apex `rhemicai.com`**. Server must 301 `www.*` → apex. Canonical tags already point to apex (no HTML change needed). Sitemap submission URL: `https://rhemicai.com/sitemap.xml`.
- AEO language: **rename/refactor away from "AEO."** Existing `/blog/what-is-aeo` and `/blog/seo-vs-aeo` slugs to be renamed with 301 redirects; body copy updated to use Rhemic's category language. Replacement terms: "AI visibility" (shorter / descriptive), "AI Competitive Visibility Intelligence" (brand / category).
- Homepage voice: **dual-audience preserved.** Agency-first but end-business track retained.
- Phase 2C directory scope: skip LinkedIn (user-confirmed exists). Audit Crunchbase, G2, Capterra, Product Hunt, GetApp, SaaSHub, Wellfound/AngelList, Owler.
- LinkedIn Company URL: **inconclusive.** `/company/rhemicai/` redirects to `/company/unavailable/` (confirmed non-existent). `/company/rhemic-ai/` returns authwall (LinkedIn authwalls both real and non-existent pages). Google `site:linkedin.com/company "Rhemic AI"` returns zero direct hits. User must supply exact URL before deploying `rhemic-schema.json` sameAs.

## Phase 2D findings — full page inventory (27 URLs)

Captured 2026-04-24 via live crawl. Full data in `page-inventory-2026-04-24.xlsx` and exact replacement copy in `page-copy-specs.md`.

Key corrections to earlier assumptions:

- **SoftwareApplication schema IS deployed** on `/pricing` and all `/products/*` subpages. Still missing on homepage and `/products` hub — fix both.
- **Blog is live with 5 posts.** `/blog/what-is-aeo` is 3,007 words (by far the longest page on the site). Other 4 blog posts are 365–450 words (thin). Blog exists but has never been discovered by Google due to canonical/sitemap issues.
- **Comparison pages exist but are thin.** `/compare/rhemic-vs-surferseo`, `vs-clearscope`, `vs-seo-ai` are all 234–350 words. Bottom-funnel SEO gold but need expansion to 800–1200 words each.
- **Two strong pages:** `/for-local-businesses` (988 words, natural hook query) and `/blog/what-is-aeo` (3,007 words). Keep structure, only refactor AEO language.
- **Pricing tier structure:** Small Business / Agency / Enterprise audience tabs. Small Business has "Local Starter" at $199/mo founding price. Agency tier has Starter / Growth / Scale plans. Actual prices for Agency tiers not yet captured.
- **Founders (from Organization schema):** Ittehadul Karim (CEO) = the user Karim, Shifat Santo (CTO), Raahil Shaik (COO/CFO).
- **Raahil Shaik anomaly:** LinkedIn search reveals he lists "CEO @ MyCrescentAI" in addition to COO @ Rhemic AI. May be a separate venture; may be stale. Worth user verification.

## Deliverables produced this session

## Deliverables expected this session

- `rhemic-context.md` — this file
- `gsc-audit-[date].xlsx`
- `gsc-sprint-plan.md`
- `keyword-gap-[date].xlsx` (subject to Ahrefs availability)
- `entity-audit-[date].xlsx`
- `rhemic-schema.json`
- `entity-build-plan.md`

## Deliverables actually produced

- `rhemic-context.md` — this file (living doc, updated as decisions land)
- `gsc-audit-2026-04-24.xlsx` — Phase 2A findings across 7 tabs
- `gsc-sprint-plan.md` — 4-week sprint with exact copy for homepage and /about
- `entity-audit-2026-04-24.xlsx` — Phase 2C entity / directory / schema findings
- `rhemic-schema.json` — deploy-ready @graph with Organization + SoftwareApplication + WebSite
- `entity-build-plan.md` — 7/30/60/90-day entity build plan
- `page-inventory-2026-04-24.xlsx` — Phase 2D audit of all 27 sitemap URLs + priority-ranked view
- `page-copy-specs.md` — Phase 2E exact replacement copy for 23 non-homepage/non-about pages

NOT produced:

- `keyword-gap-[date].xlsx` — skipped per user decision (no Ahrefs/SEMrush).

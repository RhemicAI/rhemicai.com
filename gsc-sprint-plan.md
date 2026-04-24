# Rhemic AI — 4-Week SEO Sprint Plan

Generated 2026-04-24 from the GSC audit. Each item is labeled with impact (high/medium/low), effort, and time-to-see-results. Exact copy is provided where on-page changes are recommended — paste directly, do not rewrite.

---

## Critical context before executing

This sprint is deliberately weighted toward technical fixes and homepage repositioning, not new content. Three reasons:

1. Non-branded organic traffic is effectively zero. There is no page-2 goldmine to harvest; the page-2 optimization motion from the original framework is not applicable at this traffic volume.
2. The site has 27 URLs declared in its sitemap but Google has discovered only ~9 and indexed only 3. The limiting factor is discoverability and canonical confusion, not content volume.
3. The homepage is the most heavily indexed page and the one doing 95% of the work. Improving it yields the largest lift per hour of effort.

Do not start Week 2 on-page copy changes until Week 1 technical fixes are live. Pushing copy changes into an unresolved canonical conflict will slow reindexing.

---

## Decision required from Karim before the sprint starts

**Hostname choice.** Pick one:

- **Option A (recommended): canonicalize on apex `rhemicai.com`**. Change the server/Vercel config to 301 redirect `www.rhemicai.com/*` → `rhemicai.com/*`. Keep current `<link rel="canonical">` tags pointing to apex (no HTML change needed). Update GSC sitemap submission to `https://rhemicai.com/sitemap.xml`. Cleaner brand, matches current canonical tags.
- **Option B: canonicalize on www `www.rhemicai.com`**. Keep current server behavior (apex → www). Change all `<link rel="canonical">` tags in Next.js layout config to point to `www.rhemicai.com/...`. Update sitemap `<loc>` entries to use `www.rhemicai.com/...`.

Impact is identical; Option A is less code change. I recommend A. Do not proceed without a decision.

---

## Week 1 — Unblock discovery (technical SEO)

Goal: stop Google from bouncing pages in and out of the index; give Google a complete map of the site.

### 1.1 — Resolve canonicalization
Impact: **high**. Effort: medium (dev + deploy). Time to see results: 2–4 weeks for reindex.

Apply the decision made above. Verify after deploy:

- `curl -I https://www.rhemicai.com/` should return `301` with `Location: https://rhemicai.com/` (if Option A) or `200` (if Option B).
- Confirm `<link rel="canonical">` on the homepage points to the chosen hostname.
- Confirm all pages listed in sitemap resolve with status 200 on the chosen hostname.

### 1.2 — Submit sitemap to GSC
Impact: **high**. Effort: trivial (30 seconds). Time to see results: 1–3 weeks.

In GSC → Sitemaps → "Add a new sitemap" → enter `sitemap.xml` (or full URL matching the chosen hostname) → Submit.

After canonicalization is resolved, Google should begin crawling the 18 currently-undiscovered URLs within 1–3 weeks.

### 1.3 — Update sitemap `<loc>` entries to match the chosen hostname
Impact: **high**. Effort: trivial (config change in Next.js sitemap generator). Time to see results: immediate consistency signal.

Currently all `<loc>` entries use `https://rhemicai.com/...` (apex), but the server redirects to www. Whichever hostname is chosen in 1.1, all `<loc>` values must match.

### 1.4 — Request indexing for priority URLs
Impact: **medium**. Effort: medium (~30 min manual GSC work). Time to see results: 2–6 weeks.

After 1.1–1.3 are live and validated, use GSC → URL Inspection → "Request indexing" for:

1. `/` (homepage)
2. `/pricing`
3. `/for-agencies`
4. `/products`
5. `/products/competitor-analysis`
6. `/compare/rhemic-vs-surferseo`
7. `/compare/rhemic-vs-clearscope`
8. `/compare/rhemic-vs-seo-ai`
9. `/free-ai-visibility-check`
10. `/blog/how-marketing-agencies-can-get-recommended-by-ai-tools`

GSC rate-limits this to ~10 per day. Prioritize the list above.

### 1.5 — Ignore the .woff2 404
Impact: **low**. Effort: none. Stale Next.js font-asset reference from an old build; Google will stop requesting it within a few weeks.

---

## Week 2 — Homepage rewrite (on-page SEO + positioning)

Goal: align the homepage with the confirmed ICP (digital agencies) and target keywords. Current homepage addresses end-business buyers directly; four of the five target keywords are agency-facing. The positioning mismatch is why target keywords have no organic footprint.

Do not start until Week 1 is deployed and canonicals are verified.

### 2.1 — New homepage title tag
Impact: **high**. Effort: trivial. Time to see results: 4–8 weeks.

Current: `Rhemic AI | AI Visibility Platform for ChatGPT, Claude, and Perplexity` (71 chars)

Replace with:

```
Rhemic AI | AI Visibility Tracking for Agencies in ChatGPT, Claude, Gemini
```

Length: 74 chars. Targets "AI visibility tracking for agencies" (primary target keyword #1) and keeps the engine-name signal. If truncation in SERPs matters more than keyword match, use the shorter alternative:

```
Rhemic AI | AI Visibility Tracking for Agencies
```

Length: 49 chars.

### 2.2 — New homepage H1
Impact: **high**. Effort: trivial. Time to see results: 4–8 weeks.

Current: `Your Business Is Invisible to AI.We Fix That.` (H1 also has a missing-space bug)

Replace with:

```
Show your clients where buyers are asking. Before their competitors do.
```

Rationale: uses the required category phrase "show up where buyers are asking" (from the brand story arc), positions directly to agency owners talking about their clients, preserves "The Stakes" and "The Transformation" beats.

### 2.3 — New homepage meta description
Impact: **high**. Effort: trivial. Time to see results: 2–8 weeks.

Current: `Rhemic AI helps businesses measure, improve, and track how often they are cited and recommended in AI answer engines like ChatGPT, Claude, Perplexity, Gemini, and Google AI experiences.` (187 chars, slightly long and mentions "businesses" not "agencies")

Replace with:

```
Rhemic is AI Competitive Visibility Intelligence for digital agencies. Scan ChatGPT, Claude, Gemini, and Perplexity for buyer-intent prompts. See the visibility gap between your clients and their top competitors. Close it.
```

Length: 226 chars — Google may truncate to ~160 in SERPs. If you want a tighter version that won't truncate:

```
AI Competitive Visibility Intelligence for digital agencies. See where your clients show up in ChatGPT, Claude, Gemini, and Perplexity versus their competitors — and close the gap.
```

Length: 182 chars.

### 2.4 — Rewrite homepage first 100 words
Impact: **high**. Effort: low. Time to see results: 4–8 weeks.

The first 100 words of a page carry outsized weight with both Google and LLMs. Current first 100 words do not contain "agency" or any target keyword.

Replace the hero section copy (the section under the H1, before "THE AI PLATFORMS WE SPECIALIZE IN") with:

```
Rhemic AI is AI Competitive Visibility Intelligence built for digital agencies. We scan ChatGPT, Claude, Gemini, and Perplexity for the buyer-intent prompts your clients should win — and show you the percentage visibility gap between your client and their top competitors. When someone asks an AI "best [service] in [city]," your client needs to be in the answer, not their competitor. Rhemic tracks it. Finds it. Fixes it. LLM visibility monitoring, white-labeled, so your agency can show up where buyers are asking.
```

Word count: ~90. Contains: "AI visibility tracking for agencies" (semantic match via "AI Competitive Visibility Intelligence ... for digital agencies"), "LLM visibility monitoring" (exact match), "show up where buyers are asking" (category phrase), "close the visibility gap" (implicit via percentage gap language). Preserves the brand story arc: The Shift → Stakes → Transformation.

### 2.5 — Fix the H1 typo
Impact: **low** (cosmetic). Effort: trivial. Time to see results: immediate.

Even if the H1 copy above is not adopted, fix the missing space in the current H1: `AI.We` → `AI. We`.

---

## Week 3 — /about rewrite + /for-agencies + comparison pages

Goal: expand /about to be the entity anchor for the brand (founders, UT Dallas origin, mission), and optimize the agency-audience and comparison pages that are in the sitemap but undiscovered.

### 3.1 — /about rewrite
Impact: **medium**. Effort: medium (content writing). Time to see results: 4–12 weeks.

Current word count: 510. Target: 1,000–1,500.

Keep the existing founders story. Add:

- Named founders with photos, roles, UT Dallas affiliation (context file confirms "Three engineers at UTD").
- A section headed "Why agencies choose Rhemic" targeting "white label AI SEO platform" keyword.
- A clear timeline block: when the company started, what it has shipped, what's next.
- External-facing links to LinkedIn founder profiles and the Crunchbase entry (create if missing — see Phase 2C entity audit).

Exact new title tag:

```
About Rhemic AI | Built by UT Dallas Engineers to Close the AI Visibility Gap
```

Length: 76 chars.

Exact new meta description:

```
Rhemic AI was founded at the University of Texas at Dallas to build AI Competitive Visibility Intelligence for digital agencies. Meet the team and our mission.
```

Length: 159 chars.

Exact new H1:

```
Built at UT Dallas to close the AI visibility gap for agencies and their clients.
```

### 3.2 — /for-agencies
Impact: **high**. Effort: depends on current state (TBD — page exists in sitemap but has not been audited). Time to see results: 6–12 weeks.

Action before writing copy: open `https://rhemicai.com/for-agencies` and capture current title, H1, meta, word count. Only then generate replacement copy. Noting this here because the audit so far has covered only homepage and /about.

Suggested title pattern (pending audit):

```
AI Visibility for Agencies | White-Label Rhemic AI Partner Program
```

Suggested H1 pattern:

```
Give your clients AI visibility your competitors can't match.
```

### 3.3 — Comparison pages (`/compare/rhemic-vs-*`)
Impact: **medium**. Effort: low–medium. Time to see results: 8–16 weeks (comparison keywords have long indexing timelines).

These pages exist in the sitemap — `/compare/rhemic-vs-surferseo`, `/compare/rhemic-vs-clearscope`, `/compare/rhemic-vs-seo-ai` — and are currently undiscovered by Google. Bottom-funnel SEO gold for agencies evaluating tools.

Before writing copy, audit the live pages. Expected title pattern:

```
Rhemic AI vs SurferSEO: Which Is Better for Agency AI Visibility?
```

Expected H1 pattern:

```
Rhemic AI vs SurferSEO
```

Expected meta pattern:

```
Compare Rhemic AI and SurferSEO for digital agencies. See how each tool tracks LLM visibility, which handles ChatGPT and Claude, and which protects your client's visibility gap.
```

Once audit confirms current state, I'll return exact copy.

---

## Week 4 — Blog optimization + internal linking

Goal: the 5 blog posts currently in sitemap are undiscovered. Once Week 1 technical fixes propagate, they should start appearing. This week sets them up to rank when they do.

### 4.1 — Audit all 5 blog posts' on-page SEO
Impact: **medium**. Effort: medium. Time to see results: 6–16 weeks.

Posts to audit (from sitemap):

1. `/blog/what-is-aeo`
2. `/blog/seo-vs-aeo`
3. `/blog/how-to-audit-your-websites-ai-visibility`
4. `/blog/how-marketing-agencies-can-get-recommended-by-ai-tools` (strongest ICP match)
5. `/blog/my-business-isnt-showing-up-in-ai-chat-answers`

For each, capture title / H1 / meta / word count / internal links. Return exact replacement copy if needed.

Flag on slugs 1 and 2: they use "AEO" — the context file says not to use that term in generated outputs. Your call whether to:

- Leave them as-is (site is already public with this language)
- Rename slugs to use "AI search" or "generative search," with 301 redirects from the old URLs and updated internal links
- Update the body copy but leave the slug

I will not modify these without your decision.

### 4.2 — Internal linking audit
Impact: **medium**. Effort: medium. Time to see results: 4–12 weeks.

The homepage has 34 internal links. /about has 28. Verify that:

- Homepage links to `/for-agencies`, `/free-ai-visibility-check`, and the comparison pages with descriptive anchor text matching the target keyword for each destination.
- All blog posts link back to at least one commercial page (/pricing, /free-ai-visibility-check, /for-agencies) with agency-facing anchor text.
- No internal links use "click here" or generic anchor text. Each anchor should carry keyword signal.

### 4.3 — Confirm sitemap discovery
Impact: **low (verification step)**. Effort: trivial. Time to see results: immediate check.

Four weeks after Week 1 submission, check GSC Sitemaps report. Expected state: "Discovered pages" should be ≥ 20 (up from 9). If not, something is still wrong with canonicalization or crawl signals — pause and diagnose before further content work.

---

## Metrics to watch (set the baseline on day 1)

Baseline as of 2026-04-24 (for comparison):

| Metric | Current | Target end of sprint (4 weeks) | Target end of quarter (12 weeks) |
|---|---|---|---|
| Indexed pages | 3 | 12+ | 22+ |
| Total clicks (90d rolling) | 63 | 80+ | 120+ |
| Non-branded clicks | ~0 (not measurable) | 10+ | 40+ |
| Total impressions (90d rolling) | 146 | 400+ | 1,200+ |
| Ranking keywords (pos 1–20) | ~1 visible | 8+ visible | 25+ visible |
| Sitemaps submitted | 0 | 1 | 1 |

Non-branded clicks are the lagging indicator. Indexed-page count and impressions are the leading indicators. If indexed pages doesn't climb within 2–3 weeks of sitemap submission, the canonical fix did not deploy correctly.

---

## What is NOT in this sprint and why

- Backlink outreach / link building. Covered in later phases after entity audit.
- New blog content creation. 5 posts already exist and are undiscovered; publishing more before fixing discoverability compounds the problem.
- Keyword gap analysis / competitor keyword scraping. Requires Ahrefs/SEMrush which are unavailable.
- Schema markup. Deferred to Phase 2C (entity audit output).
- GA4 setup. Requires user action outside this sprint.

---

## Handoff checklist for Karim

Before starting execution:

- [ ] Confirm hostname choice (Option A or Option B in the decision block at the top)
- [ ] Confirm whether to keep `/blog/what-is-aeo` and `/blog/seo-vs-aeo` slugs, rename them, or defer the decision
- [ ] Confirm whether the homepage copy rewrite should fully pivot to agency-only voice, or preserve a secondary end-business audience track

Once these three decisions land, Week 1 can start same-day.

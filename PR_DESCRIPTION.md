# SEO sprint: Phase 0/2A/2C/2D/2E audits, sprint plan, schema, and exact-copy specs

**Branch:** `seo-sprint-2026-04-24`
**Base:** `main`
**Type:** Documentation-only (no application code changes). 8 new files, 0 existing files modified.

---

## Summary

This PR captures a full SEO sprint for `rhemicai.com`, adapted from a local-services framework into a B2B SaaS framework. It is documentation and planning only. No production code, config, schema, or copy is changed by this PR. Every recommendation is deploy-ready but deliberately staged separately so the team can review before shipping.

The sprint was scoped into four phases that actually executed (Phase 0 interview, Phase 2A GSC audit, Phase 2C entity audit, Phase 2D full 27-page site inventory), one that produced exact replacement copy (Phase 2E), and one that was intentionally skipped (Phase 2B keyword-gap audit, blocked on Ahrefs/SEMrush unavailability).

The single most important finding: **the site has an active canonicalization conflict that is preventing ~18 of 27 sitemap URLs from being discovered by Google.** Fixing that one issue unblocks everything else in the plan.

---

## What this PR adds

Eight new files at the repo root. Nothing is modified.

| File | Purpose | Size |
|---|---|---|
| `rhemic-context.md` | Living sprint doc — product facts, decisions, tooling, risks, deliverable index | ~7 KB |
| `gsc-audit-2026-04-24.xlsx` | Phase 2A Google Search Console audit across 7 tabs | ~21 KB |
| `gsc-sprint-plan.md` | 4-week sprint with exact deploy-ready copy for homepage and `/about` | ~15 KB |
| `entity-audit-2026-04-24.xlsx` | Phase 2C entity / schema / directory audit across 6 tabs | ~18 KB |
| `entity-build-plan.md` | 7/30/60/90-day entity build plan with Wikipedia honesty check | ~13 KB |
| `rhemic-schema.json` | Deploy-ready JSON-LD `@graph`: Organization + SoftwareApplication + WebSite | ~5 KB |
| `page-inventory-2026-04-24.xlsx` | Phase 2D live audit of all 27 sitemap URLs + priority-ranked Week 2→5 view | ~23 KB |
| `page-copy-specs.md` | Phase 2E exact replacement copy for 23 non-homepage/non-about pages | ~19 KB |

Deliberately **not** included: `keyword-gap-[date].xlsx`. Skipped per explicit user decision because neither Ahrefs nor SEMrush is available. This is a known gap and is re-flagged in the follow-up section.

---

## Problem context

**Current state** (captured 2026-04-24):

- `rhemicai.com` has 63 clicks / 146 impressions over the last 90 days in GSC
- 18 of those 63 clicks are for the branded query `"rhemic ai"`; the remaining 45 are anonymized by GSC as low-volume long tail
- 3 pages indexed, 6 not indexed, **18 more declared in sitemap but never discovered by Google**
- 0 sitemaps submitted to GSC despite a valid sitemap at `/sitemap.xml`
- No Google Knowledge Panel; no Wikipedia or Wikidata entry
- 1 of 9 audited directories (Crunchbase, G2, Capterra, Product Hunt, GetApp, SaaSHub, Wellfound, Owler, LinkedIn) has a presence — only LinkedIn, and its Company page did not surface in the top 10 for the exact brand query
- No `sameAs` array in the live Organization schema — the single most important entity-linking signal

**Why:** the site redirects apex → www at the server level, but every `<link rel="canonical">` tag points to the apex. The sitemap also declares all 27 URLs under the apex hostname. Google receives contradictory signals about which hostname is canonical, so pages bounce in and out of the index. `rhemicai.com/about` is a textbook example — it is simultaneously getting impressions (GSC Performance) and sitting in the "crawled - currently not indexed" bucket (GSC Page Indexing). The same page.

This makes every downstream content / keyword / copy optimization fragile, because you are optimizing pages that Google can't reliably decide to index.

---

## What the plan recommends

Prioritized by impact-per-hour. All items are deploy-ready in the accompanying files; this PR does not ship any of them.

### Highest leverage — do first (Week 1, combined ~half day of dev work)

1. **Pick one hostname as canonical.** Decision logged: apex `rhemicai.com` (Option A). Update server/Vercel config to 301 `www → apex`. Canonical `<link>` tags already point to apex, so no HTML change needed.
2. **Submit the existing sitemap to GSC.** `https://rhemicai.com/sitemap.xml`. Unblocks discovery of the 18 currently-invisible URLs.
3. **Update sitemap `<loc>` entries** to match the chosen hostname (they already use apex — verify after the redirect is reversed).
4. **Deploy `rhemic-schema.json`** to the homepage layout. Replaces the current Organization schema with a proper `@graph` containing Organization + SoftwareApplication + WebSite. Adds the missing `sameAs` array (Instagram, X, Cal.com verified; LinkedIn Company URL pending user input).

### Week 2–4 — on-page SEO

Exact copy is in `gsc-sprint-plan.md` (homepage + `/about`) and `page-copy-specs.md` (other 23 pages). Copy is deploy-ready; paste directly.

Themes across the copy:

- Homepage H1 changes from end-buyer voice to agency voice while preserving the dual-audience track per user decision
- Titles and metas rewritten to target the 5 confirmed ranking keywords (`AI visibility tracking for agencies`, `LLM visibility monitoring`, `ChatGPT SEO for agencies`, `AI search visibility tool`, `white label AI SEO platform`)
- Comparison pages (`/compare/rhemic-vs-*`) expanded from ~250 words to 800–1,200 per page
- Thin blog posts expanded; AEO-slugged blog posts renamed with 301 redirects

### Week 5–8 — directory foundation + press

Sequenced in `entity-build-plan.md`. Crunchbase first (feeds Wikidata eligibility), then G2 + Capterra + GetApp + SaaSHub + Wellfound in parallel. Product Hunt treated as a launch event not a directory submission.

---

## Decisions logged during the sprint

Captured in `rhemic-context.md` and referenced throughout the deliverables:

1. **Canonicalization = apex `rhemicai.com`** (Option A). www redirects to apex.
2. **AEO language is removed.** "AEO," "AI Engine Optimization," "AI Answer Engine Optimization" are replaced with "AI visibility" (descriptive) or "AI Competitive Visibility Intelligence" (brand / category) throughout titles, metas, H1s, schema `knowsAbout`, and body copy. Two blog-post slugs (`/blog/what-is-aeo`, `/blog/seo-vs-aeo`) will be renamed with permanent 301 redirects.
3. **Homepage voice = dual audience preserved.** Primary agency framing, secondary end-business track retained.
4. **Keyword gap audit (Phase 2B) = skipped.** Neither Ahrefs nor SEMrush is available.
5. **LinkedIn directory check skipped in Phase 2C** per user (Company page confirmed to exist).

---

## Surprises / things worth knowing

Documented in the context file and in the individual deliverable summaries:

1. **The blog is not empty.** You said "no blog exists"; the sitemap declares 5 posts. They've never been indexed by Google. `/blog/what-is-aeo` is 3,007 words — by far the longest page on the whole site, roughly 70% of total content volume. Renaming it (with a 301) preserves this asset.
2. **SoftwareApplication schema is already deployed on `/pricing` and `/products/*`** subpages. Initial audit incorrectly reported it absent everywhere. Missing only on homepage and `/products` hub.
3. **Canonical conflict is live, not historical.** Both hostname variants return 200. `rhemicai.com/about` is being bounced in and out of Google's index as a direct consequence.
4. **LinkedIn Company URL is inconclusive.** `linkedin.com/company/rhemicai/` redirects to `/company/unavailable/` (non-existent). `/company/rhemic-ai/` authwalls, which is ambiguous. Google `site:linkedin.com/company "Rhemic AI"` returns zero direct hits. You need to supply the exact URL before `rhemic-schema.json` `sameAs` can be finalized.
5. **Raahil Shaik (Rhemic COO/CFO)** lists "CEO @ MyCrescentAI" on other LinkedIn company pages. Either a legitimate parallel venture or a stale title. Worth confirming before it goes into entity signals.
6. **Pricing tier structure:** Small Business / Agency / Enterprise tabs. "Local Starter" at $199/mo founding pricing on the SMB tab. Agency tier has Starter / Growth / Scale plans (Cal.com booking links confirm Starter and Scale). Actual Agency prices were not captured during the audit and need to be filled into the `Offer` blocks in `rhemic-schema.json` before deploy.

---

## What is NOT in this PR and why

- **No production code changes.** No Next.js config, no server redirect config, no schema deployment, no copy changes to live pages. All of those are planned in the sprint plan but deliberately staged as future work so this PR stays reviewable.
- **No keyword-gap spreadsheet.** Blocked on Ahrefs/SEMrush unavailability, as noted above.
- **No GA4 / behavioral data.** Not available in the environment.
- **No backlink outreach assets or press pitch drafts.** Deferred to Week 5+ per the build plan.
- **No Wikipedia article.** Honestly assessed as not notability-eligible yet; do not attempt until 3+ independent reliable sources exist.

---

## Review guidance

This PR is unusual — it's documentation, not code. Review focus should be:

1. **Are the decisions correct?** Four core decisions drive everything: canonicalization on apex, AEO rename, dual-audience homepage, skip 2B. If any of these is wrong, say so now — downstream copy changes compound on these.
2. **Is the exact copy on-brand?** `gsc-sprint-plan.md` and `page-copy-specs.md` contain ~40 title/H1/meta blocks written in Rhemic's voice using the context-file category language. Read them for tone, not for grammar. If tone is wrong for any page, flag the specific page.
3. **Is the schema technically correct?** `rhemic-schema.json` should validate cleanly in `validator.schema.org` and in `search.google.com/test/rich-results` (once deployed). Prereqs are documented in `entity-build-plan.md` — do not deploy until those are filled in.
4. **Are the priorities defensible?** `page-inventory-2026-04-24.xlsx` Priority View tab ranks all 27 pages by implementation sequence. If anything is mis-prioritized, flag it.

Review time estimate: 45–90 minutes to read the docs and verify the core claims. Not a "merge in 5 minutes" PR.

---

## Follow-up items before any deploy

From `entity-build-plan.md` prereqs, these block the schema deploy:

- [ ] Retrieve exact LinkedIn Company page URL and add to `rhemic-schema.json` `sameAs`
- [ ] Retrieve each founder's LinkedIn URL (Ittehadul Karim, Shifat Santo, Raahil Shaik) and add as `sameAs` under the respective Person block
- [ ] Fill Agency Starter / Growth / Scale prices into the `Offer` blocks
- [ ] Decide whether to add `postalCode` + `streetAddress` to the PostalAddress (optional; Rich Results Test flagged as non-critical)
- [ ] Confirm Raahil Shaik's MyCrescentAI listing is intentional or needs cleanup

From the sprint plan (Week 1 technical fixes must land together):

- [ ] Deploy the server-side `www → apex` 301 redirect
- [ ] Submit sitemap to GSC after redirect is live
- [ ] Deploy `rhemic-schema.json` after prereqs above are filled in
- [ ] Run Rich Results Test on the updated homepage; verify Organization + SoftwareApplication + WebSite all report valid

---

## Metrics to watch post-deploy (baseline vs target)

From `gsc-sprint-plan.md`:

| Metric | Current (2026-04-24) | End of sprint (4 weeks) | End of quarter (12 weeks) |
|---|---|---|---|
| Indexed pages | 3 | 12+ | 22+ |
| Total clicks (90d rolling) | 63 | 80+ | 120+ |
| Non-branded clicks | ~0 (not measurable) | 10+ | 40+ |
| Total impressions (90d rolling) | 146 | 400+ | 1,200+ |
| Ranking keywords (pos 1–20) | ~1 visible | 8+ visible | 25+ visible |
| Sitemaps submitted to GSC | 0 | 1 | 1 |

Leading indicator: indexed-page count. If that doesn't climb within 2–3 weeks of the canonical fix + sitemap submission, something deployed incorrectly and the rest of the plan is at risk.

Lagging indicator: non-branded clicks. Expected to move only once the homepage rewrite and comparison-page expansion land in Week 3–4.

---

## Commit hygiene note

This PR was authored while a stale `.git/index.lock` in the working directory blocked automated committing. If you see weird intermediate commit states, the workflow to reproduce the clean state is:

```
cd /Users/bivour/Desktop/RHEMIC/00_engineering/RhemicAI-dot-com
rm -f .git/index.lock
git checkout seo-sprint-2026-04-24
git add rhemic-context.md gsc-audit-2026-04-24.xlsx gsc-sprint-plan.md entity-audit-2026-04-24.xlsx entity-build-plan.md rhemic-schema.json page-inventory-2026-04-24.xlsx page-copy-specs.md PR_DESCRIPTION.md
git commit -m "SEO sprint: Phase 0/2A/2C/2D/2E audits + sprint plan + copy specs"
git push -u origin seo-sprint-2026-04-24
```

`.claude/settings.local.json`, `STOP_LOG.md`, and any `.~lock.*.xlsx#` files are intentionally not staged — the latter are LibreOffice transient files that should be added to `.gitignore` in a follow-up.

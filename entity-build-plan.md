# Rhemic AI — Entity Build Plan

Generated 2026-04-24 from the entity audit. Goal: get Rhemic AI recognized as a distinct, classified entity in Google's Knowledge Graph and increase surface area across the directories where B2B software buyers research tools.

This plan is prioritized. Do items in order. Do not skip ahead — several later items depend on earlier items existing.

---

## Prerequisites to verify before deploying `rhemic-schema.json`

Three things `rhemic-schema.json` intentionally leaves blank or under-specified because I could not verify them without Karim's input. Fill these in before deploying:

1. **LinkedIn Company page URL.** You confirmed the page exists, but its URL did not surface in the SERP top 10 and I did not navigate to it directly. Find the exact URL (format is usually `https://www.linkedin.com/company/[slug]/`) and add it to the `sameAs` array in the Organization block.
2. **Founder LinkedIn URLs.** Each `founders[].Person` entry in `rhemic-schema.json` is missing a `sameAs` array linking to their personal LinkedIn profiles. Add one per founder — significantly improves entity graph strength.
3. **Offer prices and billing intervals.** The two `Offer` blocks (`Agency Starter`, `Agency Scale`) have `priceCurrency: "USD"` but no `price`, `billingDuration`, or `priceSpecification.price` value. Fill these in from your current live pricing on `/pricing`. If pricing is public, failing to include it is a lost signal.

If you deploy the schema file as-is without filling (1)–(3), it will still be valid and still be an improvement over current state. But sameAs with only Instagram + X + Cal.com gives Google a weaker identity graph than sameAs with LinkedIn Company + LinkedIn founders.

---

## Wikipedia eligibility — honest assessment

**Not eligible yet.** Wikipedia requires "significant coverage in reliable, secondary sources that are independent of the subject." A 2025-founded startup with no press coverage, no funding round announcements, no industry-analyst mentions, and no third-party product reviews does not meet the notability threshold. Any article you create would likely be nominated for deletion within days and the draft process would reject it.

Do not attempt Wikipedia until at least 3 of the following exist as independent coverage:

- TechCrunch, The Information, SaaS Mag, MarketingProfs, or similar with a dedicated article (not a press release rewrite)
- Gartner, G2, or Forrester analyst coverage
- Industry podcast or conference keynote citation
- Academic or research-institution citation
- Crunchbase funding round listing (only if/when you raise)

Reassess Wikipedia eligibility at the 6-month mark. Until then, pursue **Wikidata** instead. Wikidata has a much lower notability bar and accepts entries for early-stage companies with a single reliable third-party source (Crunchbase is sufficient).

---

## Week 1 (7 days) — highest leverage, lowest effort

Goal: give Google the schema it needs to start building a Knowledge Panel; consolidate scattered owned properties under a single entity.

### 1.1 — Deploy `rhemic-schema.json` to the homepage
Impact: **high**. Effort: ~1 hour dev. Time to see results: 2–6 weeks for Knowledge Panel emergence.

- Replace the current 4 schema blocks (Organization, WebSite, HowTo, FAQPage) with the `@graph` structure in `rhemic-schema.json`. Keep HowTo and FAQPage blocks separate since they are page-specific content schema, not entity schema. So the final homepage should have 5 blocks: the `@graph` (Organization + SoftwareApplication + WebSite), plus HowTo, plus FAQPage.
- Verify with the Google Rich Results Test at `search.google.com/test/rich-results?url=https://rhemicai.com/` — expect 3+ valid items detected.
- Verify with the Schema.org validator at `validator.schema.org` — expect zero errors.

### 1.2 — Add SoftwareApplication to /products and product subpages
Impact: **high**. Effort: ~45 min. Time to see results: 2–6 weeks.

On `/products`, `/products/website-auditing`, `/products/competitor-analysis`, `/products/code-generation`: add a `SoftwareApplication` block referencing `@id: "https://rhemicai.com/#software"` from the homepage, extended with page-specific `featureList`. This tells Google that each product page is a facet of the same SaaS product, not separate entities.

### 1.3 — Add `sameAs` array to LinkedIn Company page TO the Organization schema (see prereq #1)
Impact: **high**. Effort: 5 min after LinkedIn URL is retrieved. Time to see results: 2–6 weeks.

### 1.4 — Remove AEO language from current live schema
Impact: **medium**. Effort: low (already included in `rhemic-schema.json`). Time to see results: 2–6 weeks.

Current `knowsAbout` includes "AI Engine Optimization" and "Answer engine optimization." Per your rename/refactor decision, these are replaced in `rhemic-schema.json` with the context-file category language.

### 1.5 — Update Instagram and X bios to match category phrase
Impact: **medium**. Effort: 10 min. Time to see results: immediate (next crawl by Google of those profiles).

Current bios are inconsistent across properties. Adopt one canonical bio — same across all three — that uses the exact context-file language. Suggested text for both Instagram and X (within their character limits):

```
AI Competitive Visibility Intelligence for digital agencies. Show your clients where buyers are asking — in ChatGPT, Claude, Gemini, Perplexity.
```

Length: 149 chars. Under X's 160-char bio limit. Under Instagram's 150-char bio limit (just barely; trim "digital" if needed).

### 1.6 — Fix the optional missing fields in PostalAddress
Impact: **low**. Effort: 2 min. Flagged by Rich Results Test as 2 non-critical issues (missing `postalCode` and `streetAddress`). `rhemic-schema.json` does NOT include these because I do not have the values. If you have a registered business address (or a dedicated PO box), add both fields to the `address` block before deploying.

---

## Week 2–4 (30 days) — build the directory foundation

Goal: create canonical third-party entity records. Once these exist, Wikidata, Knowledge Panel, and downstream AI recommendation surfaces become achievable.

### 2.1 — Crunchbase (priority: highest)
Impact: **high**. Effort: 20 min. Time to see results: 2–8 weeks.

Free profile at crunchbase.com. Required fields at minimum: company name, website, short description (use the Rhemic category phrase), founding date (2025), HQ location (Dallas, TX), founders (link each to their LinkedIn). After creation, add the resulting Crunchbase URL to the `sameAs` array in `rhemic-schema.json` and redeploy.

Why first: Crunchbase is Google's most-trusted third-party source for confirming B2B entities in its Knowledge Graph. It also becomes the reliable source needed to satisfy Wikidata's notability requirement (2.5 below).

### 2.2 — SaaSHub
Impact: **medium**. Effort: 10 min. Time to see results: 4–12 weeks.

saashub.com accepts early-stage SaaS with minimal friction. Submit Rhemic as a new listing. Add the resulting SaaSHub URL to `sameAs`.

### 2.3 — G2 (critical for B2B buyer research)
Impact: **high**. Effort: 45 min for listing + ongoing work to get reviews. Time to see results: 8–24 weeks (G2 ranking takes customer reviews).

Claim a vendor profile. Submit at least 3–5 real-customer reviews through G2's referral flow in the first month. Without reviews, the listing will exist but won't rank.

Category choice: select "SEO Software" or "Generative Search Optimization Software" (G2 has added generative search categories in 2025). Confirm the current category taxonomy before submitting.

### 2.4 — Capterra + GetApp (Gartner's pair)
Impact: **medium**. Effort: 30 min combined. Time to see results: 6–16 weeks.

Capterra and GetApp share the Gartner back-end and typically accept a single submission that propagates to both. Submit once.

### 2.5 — Wikidata entry
Impact: **medium**. Effort: 30 min if you are comfortable with Wikidata's data-entry UI; longer if not. Time to see results: 4–12 weeks for Google to ingest.

Create the entry at `www.wikidata.org/wiki/Special:NewItem`. Required:

- Label: "Rhemic AI"
- Description (English): "American software company developing AI Competitive Visibility Intelligence"
- Statements: instance of (Q4830453 = business); country (Q30 = United States); headquarters location (Q129 = Dallas); inception (2025); founder (add Person entries, linked to the Q-IDs if they have them); official website (rhemicai.com); CrunchBase organization ID (the slug from 2.1)

At least one reference must cite a reliable independent source — the Crunchbase URL from 2.1 counts.

After creation, add the Wikidata Q-ID URL to `sameAs` in `rhemic-schema.json`.

### 2.6 — Wellfound (formerly AngelList)
Impact: **medium**. Effort: 30 min. Time to see results: 4–12 weeks.

wellfound.com company profile. Useful for hiring and for startup-ecosystem discovery. Add URL to `sameAs`.

### 2.7 — Product Hunt listing — but plan the launch
Impact: **medium**. Effort: ~4 hours for a proper launch. Time to see results: 1 day of traffic spike + long-tail SEO benefit.

Do NOT create a Product Hunt listing casually. A Product Hunt launch is a one-time event per product and gives ~70% of its lifetime traffic on launch day. Plan a coordinated launch:

- Pick a launch date (ideally a Tuesday or Wednesday, avoid Monday and Friday)
- Line up a "hunter" with PH credibility (or launch under your own account)
- Prepare launch-day assets: 5–8 product screenshots, 1-minute demo video, written pitch, tagline
- Warm up email list to vote/comment day-of
- Respond to every comment within the first 4 hours

Treat the PH launch as a marketing campaign, not a directory submission. Target Week 6–8 of the sprint once the rest of the entity foundation is live.

### 2.8 — Owler (low priority)
Impact: **low**. Effort: 10 min. Lower authority for Google Knowledge Graph than Crunchbase. Do only after 2.1–2.7 are complete, or skip.

---

## Week 5–8 (60 days) — link building and press

Goal: earn the external signals that turn a well-structured entity into a well-ranked one.

### 3.1 — Coordinated Product Hunt launch
See 2.7 above. Launch-day target: top 10 of the day. Stretch goal: Product of the Day.

### 3.2 — Podcast outreach
Approach 5 B2B SaaS / agency-focused podcasts for guest appearances. Each episode description + show notes typically links to the guest's company — passive backlink generation.

Target podcasts:

- Digital Agency Leadership-focused shows
- B2B SaaS podcasts that cover early-stage / GTM tactics
- AI / LLM-focused shows (niche but relevant)

### 3.3 — Press outreach — early-stage angle
Pitch TechCrunch, The Information, SaaS Mag, and trade publications specifically covering the "agencies vs. AI disruption" angle. Frame: "why digital agencies need to track LLM visibility for their clients before competitors eat their margins." Do not pitch Rhemic as "an SEO tool" — pitch the market shift, with Rhemic as the company that saw it first.

Success metric: one mid-tier trade publication article by end of Week 8. Lower bar than TechCrunch, sufficient for Wikidata / Wikipedia downstream.

---

## Week 9–12 (90 days) — consolidation and measurement

### 4.1 — Knowledge Panel emergence check
By Week 12, verify whether a Knowledge Panel appears for "Rhemic AI" Google searches. Expected outcome if 1.1–2.5 are all completed: a basic Knowledge Panel with logo, description, and sameAs-linked social profiles.

If no Panel appears:

- Verify `sameAs` URLs all resolve 200
- Verify Wikidata entry was approved and not reverted
- Check if Google Search Console shows the Organization schema is being picked up (Enhancements → Merchant listings / Sitelinks search box reports)

### 4.2 — Schema audit repeat
Run Rich Results Test on homepage and /products again. Expect:

- Organization, SoftwareApplication, WebSite all valid
- Zero critical errors
- Zero non-critical errors (once optional address fields are filled)
- FAQPage and HowTo still valid

### 4.3 — Wikipedia eligibility reassessment
Re-evaluate whether 3+ independent reliable sources exist (per earlier honest assessment). If yes, consider drafting a Wikipedia article. If no, defer again.

---

## Handoff checklist for Karim

Before deploying Week 1:

- [ ] Retrieve LinkedIn Company page URL and add to `sameAs` in `rhemic-schema.json`
- [ ] Retrieve each founder's LinkedIn URL and add as `sameAs` under the respective Person block
- [ ] Decide final pricing for Agency Starter and Agency Scale, add to Offer blocks
- [ ] Decide whether to add a registered business address (postalCode + streetAddress) or leave those optional fields empty
- [ ] Approve the canonical Instagram/X bio text in 1.5

Once those five items are settled, Week 1 can deploy same-day. The rest of the plan proceeds in sequence without additional approvals needed.

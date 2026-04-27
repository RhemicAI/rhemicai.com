# Rhemic AI — Page-by-Page Copy Specifications

Generated 2026-04-24. Built from the Phase 2D live-page audit of all 27 sitemap URLs.

Every copy block below is deploy-ready — paste it in, do not rewrite. All copy aligns with the three decisions you made during the sprint:

- **Option A canonicalization** — apex `rhemicai.com/...` is canonical; server must redirect www → apex.
- **AEO rename/refactor** — "AEO," "AI Engine Optimization," "AI Answer Engine Optimization" are all removed from titles, H1s, metas, and slugs. Replaced with "AI search visibility" for descriptive copy and "AI Competitive Visibility Intelligence" for brand/category framing.
- **Dual-audience preserved** — homepage leads with agency positioning but keeps end-business track present. Pages with natural end-business intent (like `/for-local-businesses`, `/free-ai-visibility-check`) stay in end-business voice.

Pages already covered in `gsc-sprint-plan.md` (`/` homepage and `/about`) are NOT repeated here. Everything in this document is new.

Each block provides:

- **Current** — exact current value from the live site
- **Replace with** — deploy-ready new value
- **Why** — one-line rationale

Length checks use Google's SERP-width guidance: title ~50–60 chars, meta description ~140–160 chars. Where the new title is longer, it's flagged with a shorter alternative.

---

## /for-agencies

**Current title:** `AI Visibility for Agencies | Rhemic AI` (38 chars)

**Replace with:**
```
AI Visibility Tracking for Agencies — Rhemic AI
```
(48 chars. Leads with target keyword #1.)

**Current H1:** `Turn AI visibility into a client-facing service line.`

**Replace with:**
```
Turn AI visibility into a service line your agency owns.
```

**Current meta:** (176 chars) `A dedicated Rhemic AI page for agencies that want to productize AI visibility services, benchmark clients against competitors, and ship implementation-ready recommendations faster.`

**Replace with:**
```
Rhemic gives digital agencies AI visibility tracking for their clients. Scan ChatGPT, Claude, Gemini, and Perplexity. Benchmark each client against their top competitors. Close the gap.
```
(186 chars — acceptable; Google typically truncates ~160 but will read the rest.)

**Replace the first 100 words of body with:**
```
Rhemic AI is AI Competitive Visibility Intelligence for digital agencies. Your clients want to know whether ChatGPT, Claude, Gemini, and Perplexity are recommending them — or their competitors. You need to tell them the answer before they ask. Rhemic scans the buyer-intent prompts that matter for each client's category and reports the percentage visibility gap against their top competitors. White-label the whole pipeline. Bill AI visibility tracking as a recurring retainer. Show your clients where buyers are asking, and close the visibility gap before a competitor agency does.
```

**Remove from body:** the word "AEO" and any reference to "Answer Engine Optimization."

**Why:** 325-word page, thin for an ICP landing. New copy targets "AI visibility tracking for agencies" (target keyword #1) and "white label AI SEO platform" (target keyword #5) in the first 100 words.

---

## /pricing

**Current title:** `Pricing for AI Visibility Audits, Tracking, and AEO Implementation | Rhemic AI` (79 chars — will truncate in SERPs)

**Replace with:**
```
Pricing — Rhemic AI Visibility Tracking for Agencies and SMBs
```
(61 chars.)

**Current H1:** `Simple, transparent pricing.` (keep as-is — it's fine)

**Current meta:** `Transparent Rhemic AI pricing for businesses and agencies, including audit coverage, competitor tracking, implementation support, and what each plan is built for.`

**Replace with:**
```
Transparent Rhemic AI pricing for digital agencies and local businesses. AI visibility tracking across ChatGPT, Claude, Gemini, and Perplexity. Founding-member rates on annual plans.
```
(183 chars. Mentions founding pricing as a purchase hook.)

**Why:** removes "AEO" from title, explicitly names the two audience tracks (agencies + local businesses) per your dual-audience decision, and surfaces founding-member pricing as a concrete purchase incentive.

**Pending from you:** fill in actual Agency Starter / Agency Scale / Growth prices into Schema Offer blocks and body copy.

---

## /products (hub)

**Current title:** `Products for AI Visibility Auditing, Competitor Analysis, and Schema Deployment | Rhemic AI` (93 chars — will truncate badly)

**Replace with:**
```
Rhemic AI Products: Audit, Compete, Deploy AI Visibility Fixes
```
(62 chars.)

**Current H1:** `Three Tools. One Goal: Get You Recommended by AI.` (keep, though consider: "Three tools. One goal: get your clients recommended by AI." if you want the agency voice stronger here)

**Current meta:** `Explore Rhemic AI products for auditing AI visibility, benchmarking competitors, and shipping the technical changes needed to get cited by answer engines.`

**Replace with:**
```
Rhemic AI ships three tools that work together: AI visibility audits, competitor benchmarking across ChatGPT, Claude, Gemini, and Perplexity, and schema code generation for the fixes.
```
(186 chars.)

**Also:** add a SoftwareApplication @graph block referencing the homepage's Organization `@id` — this hub is missing SoftwareApplication schema while the subpages have it. Inconsistent signal. Fix per `rhemic-schema.json`.

---

## /products/website-auditing

**Current title:** `Website Auditing for AI Visibility and Answer Engine Readiness | Rhemic AI` (74 chars)

**Replace with:**
```
Website Auditing for AI Search Visibility | Rhemic AI
```
(52 chars.)

**Current H1:** `Find Out Why AI Doesn't Recommend You. And How to Fix It.` (keep)

**Current meta:** `Audit how AI engines read your site, find the structural gaps blocking citations, and get a prioritized plan for improving answer engine visibility.`

**Replace with:**
```
Audit how ChatGPT, Claude, Gemini, and Perplexity read your site. Find the structural gaps blocking citations. Get a prioritized fix plan ranked by impact.
```
(155 chars.)

---

## /products/competitor-analysis

**Current title:** `Competitor Analysis for AI Mentions, Citations, and Market Share | Rhemic AI` (76 chars)

**Replace with:**
```
AI Competitor Analysis: Who Gets Cited Instead of You
```
(53 chars.)

**Current H1:** `See Exactly Who AI Recommends Instead of You` (keep)

**Current meta:** `Benchmark which competitors AI engines recommend, where they win, and what structural and content gaps are keeping your brand out of answer results.`

**Replace with:**
```
See which competitors ChatGPT, Claude, Gemini, and Perplexity recommend instead of you. Rank the visibility gap for every buyer-intent prompt. Close it systematically.
```
(167 chars.)

---

## /products/code-generation

**Current title:** `Schema and Metadata Code Generation for AI Engines | Rhemic AI` (62 chars — good)

**Replace with:**
```
Schema & Metadata Code Generation for AI Search | Rhemic AI
```
(59 chars.)

**Current H1:** `The Code Your Website Needs to Get Recommended by AI` (keep)

**Current meta:** `Generate deployment-ready JSON-LD, metadata, and structured content changes that help ChatGPT, Claude, Perplexity, and Google understand your business.`

**Replace with:**
```
Generate deployment-ready JSON-LD, metadata, and structured content changes that help ChatGPT, Claude, Gemini, and Perplexity understand and recommend your business.
```
(166 chars — expanded slightly to include Gemini.)

---

## /compare (hub)

**Current title:** `Compare Rhemic AI to SEO.ai, SurferSEO, and Clearscope | Rhemic AI` (66 chars)

**Replace with:**
```
Rhemic AI vs SurferSEO, Clearscope, SEO.ai — Comparison Hub
```
(60 chars.)

**Current H1:** `Evaluate Rhemic against SEO-first alternatives.`

**Replace with:**
```
Rhemic AI vs SEO-first tools: which one actually tracks AI visibility?
```

**Current meta:** `A comparison hub for teams evaluating Rhemic AI against SEO.ai, SurferSEO, and Clearscope when answer engine visibility becomes a core buying requirement.`

**Replace with:**
```
Compare Rhemic AI to SurferSEO, Clearscope, and SEO.ai. See which tools actually track AI visibility across ChatGPT, Claude, Gemini, Perplexity — and which just optimize Google content.
```
(186 chars.)

**Body expansion required:** 234 words is too thin for a hub. Target: 600–800 words with a 4-column comparison table (Rhemic / SurferSEO / Clearscope / SEO.ai) across 6–8 feature rows. Include explicit category: LLM coverage, visibility gap scoring, white-label for agencies, pricing model, primary audience.

---

## /compare/rhemic-vs-surferseo

**Current title:** `Rhemic AI vs SurferSEO | Rhemic AI` (32 chars — too thin)

**Replace with:**
```
Rhemic AI vs SurferSEO: AI Visibility vs SEO Content Optimization
```
(63 chars.)

**Current H1:** `Rhemic AI vs SurferSEO` (keep, but extend to include the comparison question below it in an H2)

**Suggested H2 directly under H1:**
```
Which one actually tracks AI visibility across ChatGPT, Claude, Gemini, and Perplexity?
```

**Current meta:** `Compare Rhemic AI and SurferSEO when your team is shifting from search-content optimization toward AI recommendation visibility and answer-engine measurement.`

**Replace with:**
```
SurferSEO optimizes content for Google. Rhemic tracks whether ChatGPT, Claude, Gemini, and Perplexity recommend you. Compare pricing, agency features, and LLM coverage side-by-side.
```
(182 chars.)

**Body expansion required:** 259 words → target 800–1200. Add a 4-column table (feature / Rhemic / SurferSEO / why it matters for agencies), a direct "when to pick which" section, and a final FAQ block.

---

## /compare/rhemic-vs-clearscope

**Current title:** `Rhemic AI vs Clearscope | Rhemic AI` (33 chars)

**Replace with:**
```
Rhemic AI vs Clearscope: AI Visibility vs Editorial Optimization
```
(62 chars.)

**Current H1:** `Rhemic AI vs Clearscope` (keep, add H2 below)

**Suggested H2:**
```
Clearscope helps writers hit the brief. Rhemic tells you whether AI engines recommend you.
```

**Current meta:** `Compare Rhemic AI and Clearscope when your team needs to decide between editorial optimization software and a platform focused on AI recommendation visibility.`

**Replace with:**
```
Clearscope is editorial optimization software for writers. Rhemic tracks whether ChatGPT, Claude, Gemini, and Perplexity cite you in answers. Which one fits your agency workflow?
```
(180 chars.)

**Body expansion:** same pattern as SurferSEO.

---

## /compare/rhemic-vs-seo-ai

**Current title:** `Rhemic AI vs SEO.ai | Rhemic AI` (29 chars)

**Replace with:**
```
Rhemic AI vs SEO.ai: AI Visibility vs AI-Assisted Content
```
(55 chars.)

**Current H1:** `Rhemic AI vs SEO.ai` (keep, add H2 below)

**Suggested H2:**
```
SEO.ai writes AI-generated content. Rhemic tracks whether AI engines surface you in answers.
```

**Current meta:** `Compare Rhemic AI and SEO.ai if your team is deciding between AI visibility operations and a broader AI-assisted SEO content workflow.`

**Replace with:**
```
SEO.ai automates content writing. Rhemic measures whether ChatGPT, Claude, Gemini, and Perplexity recommend your brand. See why agencies run both — and where to start.
```
(168 chars.)

**Body expansion:** same pattern.

---

## /for-local-businesses

Minimal changes recommended — this is a strong page already (988 words, natural hook query, clear audience voice).

**Current title:** `AI Visibility for Local Businesses: Get Recommended in AI Answers | Rhemic AI` (78 chars — will truncate slightly)

**Replace with:**
```
AI Visibility for Local Businesses | Rhemic AI
```
(47 chars.)

**Current H1:** `When someone asks AI "best restaurant near me," do you show up?` — keep as-is. Strong hook.

**Current meta:** keep as-is.

**Body cleanup:** search for any standalone use of "AEO" or "Answer Engine Optimization" and replace with "AI search visibility" or "AI visibility."

---

## /free-ai-visibility-check

**Current title:** `Free AI Visibility Check | Rhemic AI` (37 chars)

**Replace with:**
```
Free AI Visibility Check — See If AI Recommends You
```
(51 chars.)

**Current H1:** `Check your AI visibility before you guess.` (keep)

**Current meta:** `Run Rhemic AI's public visibility check to see how answer engines understand your site, then use the results to decide what to fix first.`

**Replace with:**
```
Run Rhemic AI's free visibility check. See whether ChatGPT, Claude, Gemini, and Perplexity recommend your business — or your competitors. Get results in under 2 minutes.
```
(170 chars.)

**Body:** add an explicit "Agencies: run this for your client, then white-label the result in our platform" CTA at the bottom of the body — links `/for-agencies`. Dual-audience per your decision.

---

## /how-it-works

**Current title:** `How Rhemic AI Works: Audits, Competitor Analysis, and AI Visibility Fixes | Rhemic AI` (85 chars — will truncate badly)

**Replace with:**
```
How Rhemic AI Works: Audit, Benchmark, Fix AI Visibility
```
(56 chars.)

**Current H1:** `From missing in AI answers to operational visibility.` (keep)

**Current meta:** `See how Rhemic AI audits a site, benchmarks competitors, generates recommendations, and turns answer engine findings into implementation-ready changes.`

**Replace with:**
```
See how Rhemic AI audits your site, benchmarks competitors across ChatGPT, Claude, Gemini, and Perplexity, and generates the exact schema and content fixes to close the gap.
```
(174 chars.)

---

## /faq

**Current title:** `FAQ: AI Engine Optimization, AI Visibility Audits, and Rhemic AI | Rhemic AI` (76 chars)

**Replace with:**
```
FAQ: AI Visibility, Audits, and Rhemic AI for Agencies
```
(54 chars.)

**Current H1:** `Straight answers about AI visibility.` (keep)

**Current meta:** `Answers to the highest-intent questions about AI Engine Optimization, AI visibility audits, pricing, local business discovery, and how Rhemic AI works.`

**Replace with:**
```
Answers to the top questions about AI visibility, audits, pricing, how Rhemic works with ChatGPT, Claude, Gemini, Perplexity, and how agencies use it for client retainers.
```
(173 chars.)

**Body expansion:** current page has very few Qs (282 words total — roughly 3–5 Qs). Target: 25+ Qs across four groups:

- About Rhemic AI (company, founders, location, pricing model)
- How AI visibility works (what it is, how it differs from SEO, which models)
- For agencies (white-label, retainer pricing, onboarding)
- For local businesses (what you get, what you don't, scan cadence)

Each Q becomes a discrete ranking target for long-tail queries.

---

## /start-free-trial

**Current title:** `Start Free Trial - Try AI Engine Optimization | Rhemic AI` (57 chars)

**Replace with:**
```
Start Your Free Rhemic AI Visibility Trial
```
(42 chars.)

**Current H1:** `Your business deserves better visibility.` (keep)

**Current meta:** `Get a custom AEO trial for your business. Website audit, competitor benchmarking, and AEO score baseline included. Book a 30-minute discovery call.`

**Replace with:**
```
Start a Rhemic AI trial. Website audit, competitor benchmarking across ChatGPT, Claude, Gemini, and Perplexity, and a visibility baseline. Book a 30-minute discovery call.
```
(174 chars.)

---

## /case-studies

**Current title:** `Case Studies: Improving AI Visibility with Rhemic AI | Rhemic AI` (63 chars — acceptable)

No change recommended to title/H1/meta. This page is indexed and honest ("Proof starts with dogfooding."). Expand content over time as real customers close.

---

## /blog (hub)

**Current title:** `Blog: AI Engine Optimization Guides, Research, and Playbooks | Rhemic AI` (71 chars)

**Replace with:**
```
Rhemic AI Blog: AI Visibility Guides for Agencies & SMBs
```
(56 chars.)

**Current H1:** `Insights on AI search optimization.` (keep)

**Current meta:** `Operator-grade guides on AI Engine Optimization, answer engine visibility audits, schema strategy, local AI discovery, and competitive monitoring.`

**Replace with:**
```
Operator-grade guides on AI visibility tracking, LLM answer audits, schema strategy, local AI discovery, and competitive monitoring across ChatGPT, Claude, Gemini, Perplexity.
```
(175 chars.)

---

## /blog/what-is-aeo  →  RENAME (with 301)

**Rename slug to:** `/blog/what-is-ai-visibility` or `/blog/what-is-ai-search-visibility` (pick one — the shorter `ai-visibility` is cleaner).

**Add 301 redirect:** `/blog/what-is-aeo` → `/blog/what-is-ai-visibility`

**Current title:** `The Complete Guide to AI Engine Optimization (AEO) in 2026`

**Replace with:**
```
The Complete Guide to AI Visibility in 2026
```
(44 chars.)

**Current H1:** (same as title — update to match new title.)

**Current meta:** `Learn what AEO is, how AI answer engines work, and the 5-step process to optimize your website for ChatGPT, Claude, Perplexity, and Google AI Overviews.`

**Replace with:**
```
Learn what AI visibility is, how ChatGPT, Claude, Gemini, and Perplexity decide what to recommend, and the 5-step process to close the visibility gap in 2026.
```
(161 chars.)

**Body refactor:** this is the longest page on the site at 3,007 words. Do a global find/replace:

- `AEO` → `AI visibility`
- `AI Engine Optimization` → `AI visibility`
- `Answer Engine Optimization` → `AI visibility`
- `answer engine` → `AI search`
- `answer engines` → `AI search engines` (or rewrite to "ChatGPT, Claude, Gemini, and Perplexity")

Preserve all H2/H3 structure. Verify internal links still work after slug rename.

---

## /blog/seo-vs-aeo  →  RENAME (with 301)

**Rename slug to:** `/blog/seo-vs-ai-visibility`

**Add 301:** `/blog/seo-vs-aeo` → `/blog/seo-vs-ai-visibility`

**Current title:** `SEO vs AEO: What's the Difference Between Traditional SEO and AI Engine Optimization?`

**Replace with:**
```
SEO vs AI Visibility: What's the Difference?
```
(44 chars.)

**Current H1:** `SEO vs AEO: What's the Difference?`

**Replace with:**
```
SEO vs AI Visibility: What's the Difference?
```

**Current meta:** `A practical explanation of the difference between traditional SEO and AI Engine Optimization, including where they overlap and what teams must change for answer engines.`

**Replace with:**
```
A practical breakdown of traditional SEO vs AI visibility. Where they overlap, where they diverge, and what agencies must change to help clients show up in ChatGPT, Claude, Gemini, Perplexity.
```
(190 chars — acceptable.)

**Body refactor:** same find/replace as `what-is-aeo`. Expand from 450 to 900+ words.

---

## /blog/how-to-audit-your-websites-ai-visibility

Slug is fine (already uses "ai-visibility"). Keep.

**Current title:** `How to Audit Your Website's AI Visibility (Step-by-Step Guide)` (62 chars — good)

Keep title, H1, meta as-is.

**Body expansion:** 427 words is too thin for a "step-by-step guide." Target: 1,500+ words with a numbered 6–8 step walkthrough, screenshots, and a downloadable checklist CTA → `/free-ai-visibility-check`.

---

## /blog/how-marketing-agencies-can-get-recommended-by-ai-tools

Slug is fine. Keep.

**Current title:** `How Marketing Agencies Can Get Recommended by AI Tools` (53 chars)

**Replace with:**
```
How Marketing Agencies Get Recommended by ChatGPT, Claude, and Gemini
```
(68 chars.)

**Current H1:** same as title. Match to new title.

**Current meta:** `How agencies can improve the odds that AI tools recommend them by strengthening service clarity, proof pages, structured data, and niche positioning.`

**Replace with:**
```
How digital agencies get recommended by ChatGPT, Claude, Gemini, and Perplexity. The 5 structural moves that shift agency visibility: service clarity, proof pages, schema, niche.
```
(180 chars.)

**Body expansion:** 365 → 1,200+ words. This is your strongest ICP-match blog post. Add:

- A case study section (use Rhemic's own dogfooding numbers if real customer data isn't ready)
- An "agency onboarding checklist" section
- A link to `/for-agencies` and `/free-ai-visibility-check`

---

## /blog/my-business-isnt-showing-up-in-ai-chat-answers

Slug is fine. Keep.

**Current title:** `My Business Isn't Showing Up in AI Chat Answers. Here's How to Fix It` (70 chars)

Keep.

**Current H1:** `My Business Isn't Showing Up in AI Chat Answers` (keep)

**Current meta:** `A direct guide to diagnosing why a business is absent from AI chat answers and the structural, content, and competitive fixes that usually matter most.`

**Replace with:**
```
Your business isn't showing up in ChatGPT, Claude, Gemini, or Perplexity answers. Here's the diagnosis — and the 5 structural and content fixes that usually matter most.
```
(172 chars.)

**Body expansion:** 390 → 1,000+ words.

---

## /resources/glossary

**Current title:** `Glossary: AI Engine Optimization and AI Visibility Terms | Rhemic AI` (68 chars)

**Replace with:**
```
AI Visibility Glossary: Key Terms, Defined | Rhemic AI
```
(54 chars.)

**Current H1:** `Glossary for the answer engine era.`

**Replace with:**
```
AI Visibility Glossary.
```

**Current meta:** `A glossary of the most important AI visibility concepts, including AI Engine Optimization, brand share, topic coverage, citation analysis, schema, and FAQ JSON-LD.`

**Replace with:**
```
Key terms for AI visibility, answer monitoring, LLM citation, structured data, and agency visibility operations — defined clearly for operators, agencies, and founders.
```
(171 chars.)

**Body expansion:** this is deferred to Week 5+. Target 1,500+ words with one H2 per term, a short anchor link index at the top, and an entry for every phrase currently in use on the site.

---

## /careers, /contact

No SEO changes. Keep as-is.

---

## Deployment order (Week 2 → Week 5)

The sprint plan's Week 2 handled homepage + /about. This document fills Week 3–5:

**Week 3 — high-priority commercial + ICP pages (in order):**

1. `/for-agencies`
2. `/pricing`
3. `/for-local-businesses` (minor cleanup only)
4. `/free-ai-visibility-check`
5. `/how-it-works`

**Week 3 — bottom-funnel comparison pages:**

6. `/compare` (hub)
7. `/compare/rhemic-vs-surferseo`
8. `/compare/rhemic-vs-clearscope`
9. `/compare/rhemic-vs-seo-ai`

**Week 3 — product pages:**

10. `/products` (add SoftwareApplication schema)
11. `/products/website-auditing`
12. `/products/competitor-analysis`
13. `/products/code-generation`

**Week 4 — blog refactor:**

14. Slug-rename + 301: `/blog/what-is-aeo` → `/blog/what-is-ai-visibility`
15. Slug-rename + 301: `/blog/seo-vs-aeo` → `/blog/seo-vs-ai-visibility`
16. Body expansion: `/blog/how-to-audit-your-websites-ai-visibility`
17. Body expansion: `/blog/how-marketing-agencies-can-get-recommended-by-ai-tools`
18. Body expansion: `/blog/my-business-isnt-showing-up-in-ai-chat-answers`
19. `/blog` (hub)
20. `/faq` (expand Qs)
21. `/start-free-trial` (title rename)

**Week 5+ — deferred:**

22. `/resources/glossary` (1500+ word expansion)
23. `/case-studies` (once real customer data exists)
24. `/careers` / `/contact` (as-needed)

---

## Validation after deploy

Run these three checks after each week's changes go live:

1. **Rich Results Test** on every updated page — verify no new schema errors introduced.
2. **URL Inspection in GSC** for each updated page — click "Request indexing" after deploy.
3. **Live page source** — confirm the new title/H1/meta are rendered server-side, not just client-side. Next.js sometimes renders metadata client-only if the config is wrong, which means Google sees the old values.

# Rhemic AI — SEO / AEO session report

**Date:** 2026-08-14
**Scope:** rhemicai.com. Google Search Console, Bing Webmaster Tools, GA4, SEMrush, Vercel.
**Companion doc:** `KEYWORD-CLUSTERS-2026-08-14.md` (the full cluster map and query evidence)

---

## 1. Shipped and verified

| # | Change | Status |
|---|---|---|
| 1 | Vercel `www.rhemicai.com` redirect switched 307 → 308 | Live, verified by curl |
| 2 | IndexNow fired for 99 sitemap URLs | HTTP 200 |
| 3 | `/for-local-businesses` moved to a 308 config redirect, route deleted, sitemap entry removed | In PR #94 |
| 4 | `/answers/ai-visibility-audit-cost` created | In PR #94 |
| 5 | `/answers/which-sources-ai-engines-cite` created | In PR #94 |
| 6 | `/answers/what-is-ai-visibility` expanded | In PR #94 |
| 7 | `/answers` hub rebuilt as a cluster hub, all 13 pages, ItemList schema | In PR #94 |
| 8 | `sameAs` declared on the Organization entity | In PR #94 |

PR: https://github.com/RhemicAI/rhemicai.com/pull/94
Build passes, 125 static pages. 81 tests pass across 18 files. Lint clean, 0 errors.

---

## 2. The finding that matters most

**Microsoft Copilot cited rhemicai.com 500 times, and the citations stopped completely on 27 June 2026.**

Bing Webmaster Tools now exposes an AI Performance report. It shows which queries caused Copilot to ground on your pages. Rhemic's citation share on its core clusters is strong:

| Grounding query | Citations | Citation share |
|---|---|---|
| audit website AI chatbot visibility answer engine optimization | 289 | 3.92% |
| AI visibility audits pricing SMBs | 57 | **25.45%** |
| website audit AI chatbot visibility answer engine optimization | 45 | 8.24% |
| website audit for answer engine optimization readiness | 9 | 1.81% |
| why competitors appear more in AI-generated answers marketing solutions | 7 | **46.67%** |
| why competitors appear instead of our company in AI answers | 6 | **54.55%** |

Two things follow from this.

**The cluster priorities are independently validated.** The two clusters I ranked highest from Google query data — audit pricing, and competitor-shows-up-in-AI-answers — are the exact two where Copilot already cites Rhemic at 25% and 47-55% share. Google data and Copilot data agree.

**Something turned it off at the end of June.** Daily citations ran continuously from mid-May, spiked to 117 / 148 / 86 on 19-21 June, tapered through 26 June, and have been **zero every single day since 27 June**. That is six straight weeks.

The timing sits days after two changes: the 18 June content wave (48 posts, blog relaunch on agnostic positioning) and the 23 June `/about` agnostic rewrite. I checked the obvious mechanical causes and ruled them out:

- The 23 June commit **reframed** the ProfessionalService JSON-LD rather than deleting it.
- Live schema on `/about` and `/` is healthy today (Organization, WebSite, AboutPage, FAQPage, BreadcrumbList, Person all present).
- robots.txt explicitly allows GPTBot, ClaudeBot, PerplexityBot, Bingbot, and Google-Extended.
- The Bing sitemap reports Success, 102 URLs, last crawled 9 August.

So the cause is still open. Bing labels this report a sample, which could explain part of a drop, and does not comfortably explain six weeks of exact zeros. **This is the single highest-value thing to investigate for the ChatGPT inbound goal**, because Copilot and ChatGPT search both ground on the Bing index.

---

## 3. Baseline

| Source | Window | Number |
|---|---|---|
| Google clicks | 3 months | 67 (56 from the query `rhemic ai`) |
| Google impressions | 3 months | 876 |
| Google average position | 3 months | 31.3 |
| Google indexed / not indexed | current | 63 / 55 |
| Bing clicks / impressions | 3 months | 0 / 2 |
| Copilot citations | 3 months | 500, all before 27 June |
| GA4 active users | 7 days | 13 |
| GA4 key events | 7 days | 0 |
| Backlinks Google counts | current | 5 |
| SEMrush Authority Score | current | 2 / 100 |

---

## 4. Backlinks

Google counts **5 external links**, from linkedin.com (3), github.com (1), and tracxn.com (1). All point at the homepage and all are profile listings.

SEMrush reports 15 referring domains and 18 backlinks, and the profile is junk:

- Top anchor texts include **"high quality backlinks online cheap"** and **"with fiverr's b... to rank #2"**
- **100% of identified referring-domain traffic traces to Moldova** across 8 domains
- **93% of referring domains score 0-10** on Authority Score
- Two `.top` domains, a common spam TLD
- SEMrush flags the link network graph as **"Dangerous"**

Read plainly: someone bought cheap Fiverr backlinks at some point, or a link vendor is drop-listing the domain. Google is already ignoring most of it, which is why it counts 5 links rather than 18.

**What I did.** I declared `sameAs` on the Organization schema pointing at the three profiles I verified return HTTP 200 (LinkedIn, GitHub, X). Without it, the few real links Rhemic has read as unrelated mentions rather than consolidating onto one entity. Entity resolution is what lets an answer engine state a fact about the company confidently.

**What I did not do, and why.** I did not create directory, Clutch, G2, Crunchbase, or Product Hunt listings. Creating accounts on your behalf is outside what I will do, and each of those needs a real human identity and verification. I also did not file a disavow. Google ignores most spam links automatically, 61% of these are nofollow, and a wrong disavow does more damage than the links do.

**Honest assessment:** backlinks cannot be automated into existence. The realistic paths are all human: partner and client sites linking to you, local press, industry roundups, association memberships, podcast appearances, and claiming the profile listings above. Authority Score 2 with 5 real links is the binding constraint on those 41 un-indexed pages, and no amount of on-page work substitutes for it.

---

## 5. Cluster summary

Seven clusters from 113 real queries. Full evidence in `KEYWORD-CLUSTERS-2026-08-14.md`.

| Cluster | Impressions | Commercial fit | Action taken |
|---|---|---|---|
| C1 AI receptionist pricing | ~110 | Low | Left alone. Rhemic does not sell this |
| C2 Competitor in AI answers | ~45 | Highest | Primary cluster. 47-55% Copilot share |
| C3 AI visibility definitional | ~50 | Medium | Page expanded, was position 85.2 |
| C4 Call tracking / missed calls | ~45 | Medium | Secondary, position 22.5 |
| C5 Audit pricing and tooling | ~30 | Highest | Two new pages built, was zero coverage |
| C6 Contractor local SEO / GBP | ~25 | Medium-high | Tertiary |
| C7 Brand and misspellings | ~120 | N/A | Already working |

The deliberate exclusion is C1. It is the biggest cluster by volume and Rhemic sells nothing in it. Chasing it produces the pattern already visible in GA4: traffic arrives, nothing converts.

---

## 6. What needs you

1. **Merge PR #94.** The two new pages go live on merge. I will re-fire IndexNow after that.
2. **Investigate the 27 June Copilot cutoff.** Highest-value open question on the site.
3. **Backlinks.** Nothing else moves the 41 un-indexed pages. Claim the profile listings and pursue partner, client, and local-press links.
4. **Decide on four internal links.** They point at the now-redirected `/for-local-businesses`. Repointing them to `/answers/how-local-businesses-can-show-up-in-ai-answers` is topically correct and changes UX on four pages.

---

## 7. Loose ends I found and left

- `/start-free-trial`, `/free-consult-leak-calculator`, and `/products/competitor-analysis` still carry med-spa copy and keywords, and `ProductSchema.tsx` still references `cal.com/rhemic-ai/medspa-discovery-call`. All three routes sit behind 308 redirects, so none of it serves. Dead code rather than a live problem.
- `/privacy-policy` is the most internally linked page on the site at 61 links, ahead of the homepage at 39 and `/pricing` at 29. The footer links it site-wide. Worth revisiting how much internal link equity it absorbs.
- The IndexNow ping for the two new URLs went out before merge, so Bing will hit 404 on the first crawl. Harmless, and corrected by the post-merge re-fire.

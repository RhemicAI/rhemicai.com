# Rhemic AI — Keyword Cluster Architecture

Built 2026-08-14 from live Google Search Console, Bing Webmaster Tools, and GA4 data. Every query and number below comes from a real report pulled this session. Nothing is estimated.

---

## 1. Where the site actually stands

| Source | Window | Number |
|---|---|---|
| Google clicks | 3 months | 67 |
| Google impressions | 3 months | 876 |
| Google average position | 3 months | 31.3 |
| Google indexed pages | current | 63 |
| Google not indexed | current | 55 |
| Bing clicks | 3 months | 0 |
| Bing impressions | 3 months | 2 |
| GA4 active users | last 7 days | 13 |
| GA4 key events (conversions) | last 7 days | 0 |

**56 of the 67 Google clicks come from the single query `rhemic ai`.** Non-branded clicks over three months round to zero. The site earns impressions and loses every one of them at position 31.

The 48-post blog wave did work. Impressions jumped from a flat ~5/day to a peak near 100/day around 1 August. The content created demand signal. It landed at page 3 to page 9, so the demand converts to nothing.

---

## 2. The three findings that explain the traffic problem

### Finding 1 — The www hostname is splitting the site against itself

`https://www.rhemicai.com/pricing` is indexed separately at position 33.5 with 30 impressions. The apex `https://rhemicai.com/pricing` sits at position 5.6 with 157 impressions. Two URLs, one page, competing.

The cause is the redirect status code. `next.config.ts` correctly declares the www rule with `permanent: true`, which would emit 308. The live response is **307 Temporary Redirect**:

```
HTTP/2 307
location: https://rhemicai.com/pricing
```

A Vercel domain-level redirect fires at the edge before the Next.js app runs, so the code rule never executes. Google treats 307 as temporary and keeps both URLs in the index rather than consolidating authority onto one.

Fix in the Vercel dashboard, on the domain, not in code.

### Finding 2 — Bing has effectively zero index presence, and that closes the ChatGPT door

Bing returned 2 impressions in three months. Bing Webmaster Tools states its own top recommendation plainly: *"Your site does not have enough inbound links from high quality domains."*

This matters more than the raw Bing traffic. ChatGPT search and Microsoft Copilot ground their answers on the Bing index. A site that Bing barely indexes cannot be cited by ChatGPT, no matter how well its answer pages are written.

The sitemap is submitted and healthy in Bing (102 URLs discovered, Success, last crawled 9 August). IndexNow has never fired — the key file is published at `/ae7a82447267bd671e3b766281ba73e5.txt` and the API route exists, but nothing calls it.

### Finding 3 — 41 pages are "Discovered — currently not indexed"

Google found these URLs and chose not to index them. Discovery is not the blocker: the sitemap reports Success with 102 URLs in both engines, and internal linking is sound (the blog index links all 48 posts, each post cross-links 6 siblings).

"Discovered — currently not indexed" at this scale, on a site with a healthy sitemap and working internal links, points at domain authority. Google is rationing crawl budget because the domain has not earned it. Bing's diagnostic says the same thing about the same cause.

Additional index waste worth clearing: 6 pages returning 404, 3 pages with redirects, 3 alternate canonicals.

---

## 3. The clusters

Seven clusters emerge from the 113 queries that produced impressions. Each is scored on **commercial fit** — whether the searcher wants something Rhemic actually sells.

### C1 — AI receptionist pricing and cost
**~110 impressions. Largest non-brand cluster. Commercial fit: LOW.**

| Query | Impressions |
|---|---|
| ai receptionist pricing | 63 |
| ai receptionist cost | 10 |
| ai receptionist cost vs in house staff cost | 10 |
| how much does an ai receptionist cost | 4 |
| how much does ai receptionist cost | 3 |
| ai receptionist vs hiring receptionist cost | 3 |
| the receptionist pricing | 2 |
| receptionist cost / receptionist salary vs ai cost | 2 |
| recommend an ai receptionist under $100 per month | 1 |
| compare multilingual ai receptionist pricing plans | 1 |

Owner page: `/blog/ai-receptionist-pricing-explained` at **position 61.2**.

This is the biggest cluster by volume and the weakest by fit. Rhemic does not sell an AI receptionist. Someone searching "ai receptionist pricing" wants to buy a receptionist product. Ranking this page brings traffic that cannot convert, and the 0 key events in GA4 is consistent with that.

**Call: keep the page, stop investing in the cluster.** Add one clear bridge paragraph that connects call capture to visibility, then leave it. Do not build more receptionist content.

### C2 — Competitor shows up in AI answers and we do not
**~45 impressions. Commercial fit: HIGHEST. This is the wedge.**

| Query | Impressions |
|---|---|
| what steps can i take to ensure my brand is recommended by ai assistants like chatgpt or perplexity? | 11 |
| how to respond to competitor hijacking in ai answers | 7 |
| my competitors show up in chatgpt but we don't, how do i fix that | 5 |
| why are our competitors appearing in ai answers when we are not? | 4 |
| i asked perplexity about our company and it described our competitor as better — is that bias? | 4 |
| why are my competitors showing up in ai answers and i'm not? | 3 |
| what happens when competitor shows up in ai before you | 3 |
| why do competitors keep showing up in recommendation-style answers? | 2 |
| why do some competitors show up constantly in ai responses while others never do? | 2 |
| why competitors appear in ai answers but we don t | 2 |
| plus 6 more single-impression variants | 6 |

Owner page: `/answers/why-your-competitor-shows-up-in-ai-answers` at **position 24.6** — the best-performing non-brand page on the site.

Every query in this cluster is a person in pain, describing Rhemic's exact service in their own words, in full sentences. This is conversational long-tail that AI engines answer directly. It is the closest thing the site has to a breakthrough.

**Call: make this the primary cluster.** It is at page 3 already. It has the shortest distance to page 1 of anything non-branded.

### C3 — AI visibility, definitional and category
**~50 impressions. Commercial fit: MEDIUM. Worst execution on the site.**

| Query | Impressions |
|---|---|
| what is ai visibility | 31 |
| visibility in ai | 8 |
| how to appear in ai answers | 7 |
| show up in chatgpt / gpt answer visibility / get found in ai answers | 9 |
| ai visibility | 3 |
| how to show up in chatgpt answers | 2 |
| llm visibility meaning | 2 |
| improve chatgpt enterprise visibility | 2 |
| ai visible / ai content visibility | 3 |

Owner page: `/answers/what-is-ai-visibility` at **position 85.2**.

45 impressions at position 85 means Google shows this page on page 9 for a definitional query it should own outright. The page exists, the topic is core to the business, and the ranking is the worst on the site.

**Call: rebuild this page as the category anchor.** A definitional query is the single easiest thing to win with a direct, extractable answer, and it is the page format AI engines quote most readily.

### C4 — Call tracking and missed-call revenue for home services
**~45 impressions. Commercial fit: MEDIUM. Second-best position.**

| Query | Impressions |
|---|---|
| call tracking and routing for home services professionals | 12 |
| home services call tracking | 6 |
| how much revenue do missed calls cost | 4 |
| call tracking for home services | 3 |
| cost of missed calls small business | 3 |
| missed call text back for contractors | 3 |
| urgent call handling | 3 |
| contractor missed call text back / call tracking home services | 4 |
| small business missed calls revenue / missed calls cost my business | 4 |
| plus 5 more single-impression variants | 5 |

Owner pages: `/blog/call-tracking-for-home-services` at **position 22.5**, `/blog/how-much-revenue-are-missed-calls-costing-your-business` at 53.3.

Position 22.5 is the best non-brand blog position on the site. Home services is the stated lead vertical, so the fit is real, though the queries sit one step away from what Rhemic charges for.

**Call: secondary cluster. Consolidate and push.** It is close to page 2.

### C5 — AI visibility audit and tooling, purchase intent
**~30 impressions. Commercial fit: HIGHEST. No owner page exists.**

| Query | Impressions |
|---|---|
| how do i find out which sources perplexity is citing for queries about my industry? | 8 |
| "compares competitor mentions" ai answers platform | 6 |
| ai visibility audits pricing for smbs | 4 |
| website clarity audit | 3 |
| ai engine audit / ai engine auditing tool | 4 |
| how much does an ai visibility audit cost? | 2 |
| ai visibility audit cost | 1 |
| is there a tool that shows how ai platforms like perplexity describe my company? | 1 |
| website machine readability audit / website performance ai audit | 2 |
| which service specializes in generative engine optimization for local businesses? | 1 |
| what companies help businesses get mentioned by ai assistants like chatgpt and perplexity? | 1 |

**This is the buying cluster and it has no dedicated page.** These people are pricing an audit, comparing platforms, and asking which vendor does this work. They are further down the funnel than any other cluster on this list, and the site sends them nowhere.

The site retired `/free-ai-visibility-check` and `/sample-ai-visibility-report` into `/pricing` on 30 July. Both were the natural landing pages for this exact demand.

**Call: build the missing page. Highest priority new asset on the site.**

### C6 — Contractor local SEO and Google Business Profile
**~25 impressions. Commercial fit: MEDIUM-HIGH.**

| Query | Impressions |
|---|---|
| gmb optimization for contractors | 3 |
| aeo for contractors | 3 |
| local schema markup | 3 |
| ai google business profile | 3 |
| auto repair answer engine optimization | 3 |
| answer engine optimization for contractors | 2 |
| contractor google business profile tips | 2 |
| google business profile optimization for ma contractors | 2 |
| contractor marketing dashboard / contractor marketing roi | 4 |
| google ai overviews local business / google business profile optimization for contractors | 2 |

Owner pages: `/services/google-business-profile`, `/blog/google-business-profile-optimization-for-contractors`, `/blog/answer-engine-optimization-for-contractors`.

This cluster maps directly onto a service line Rhemic sells and onto the stated home-services vertical. It is under-served relative to its fit.

**Call: tertiary cluster. Wire the blog posts into the service page properly.**

### C7 — Brand and brand misspellings
**~120 impressions including brand. Commercial fit: N/A, already working.**

`rhemic ai` (93 impressions, 56 clicks), `rhemic` (6), and a misspelling tail: `runmic` (15), `grimic` (2), `rimic` (2), `rihmic` (1), `rismic` (1).

`runmic` at 15 impressions is notable. People hear the brand name and mistype it. The brand is not phonetically stable.

**Call: no page work.** Worth knowing that 15 impressions a quarter are lost to people who cannot spell the company name.

---

## 4. Priority order

Ranked by expected inbound within 90 days, weighted by commercial fit.

**1. Fix the www 307 → 308.** One setting in Vercel. Consolidates two competing URLs onto one. Every other ranking gain compounds off a single clean hostname. Do this first.

**2. Build the C5 audit page.** The highest-intent cluster on the site has no destination. These searchers are pricing the exact service Rhemic sells.

**3. Rebuild `/answers/what-is-ai-visibility` (C3).** Position 85 on a 31-impression definitional query is the largest single gap between what a page should rank and what it does.

**4. Push C2 from page 3 to page 1.** Best non-brand position on the site, best commercial fit, and the query format AI engines quote directly.

**5. Fire IndexNow and keep firing it.** The route exists and has never been called. This is the direct line into Bing, and Bing is the door to ChatGPT.

**6. Earn inbound links.** Both Google and Bing are saying the same thing in different words. 41 pages sit un-indexed because the domain has not earned crawl priority. No amount of on-page work substitutes for this.

**7. Clear the index waste.** 6 404s, 3 redirect entries, 3 alternate canonicals.

---

## 5. What this map deliberately does not do

It does not chase C1 (AI receptionist), the largest cluster by volume, because Rhemic does not sell that product. Volume without commercial fit produces the pattern already visible in GA4: traffic arrives, nothing converts, 0 key events.

It does not recommend publishing more blog posts. 48 posts are live and 41 pages are un-indexed. Publishing into an un-indexed backlog compounds the problem rather than solving it.

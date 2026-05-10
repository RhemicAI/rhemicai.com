# Public Scan Post-Scan CTA Handout

## Goal

Turn a completed public AI visibility scan into a clear next step: help the visitor understand that the snapshot is the diagnosis, then invite them to get a concrete optimization plan.

This should feel like a helpful consultative handoff, not a paywall. The public scan shows what is happening. The CTA should show what Rhemic can fix next.

## Product Rule

Public scans are limited to one scan per normalized URL.

Use this limit as a trust and cost-control message:

- It keeps the snapshot consistent for the same domain.
- It avoids rerunning expensive AI citation checks for duplicate submissions.
- It lets returning visitors continue from the existing scan instead of starting over.
- Reruns should be tied to a review call, customer account, or post-optimization measurement.

Suggested duplicate-scan copy:

> We already have an AI visibility snapshot for this domain. View the existing result and book a review if you want a rerun after changes are made.

## Primary CTA

Label:

> Book My AI Visibility Review

Supporting line:

> We will walk through where your brand is missing, which competitors are being cited instead, and the highest-leverage fixes to improve your presence in AI answers.

Destination:

- Booking page or embedded scheduling flow.
- Pass scan_id and domain in the CTA URL when possible.

Example URL pattern:

```text
/book?source=public_scan&scan_id={scan_id}&domain={domain}
```

## Secondary CTA

Label:

> Get My Optimization Plan

Supporting line:

> Turn this scan into developer-ready fixes for your pages, schema, citations, and authority gaps.

Use this when Optimization Fix Packs are available for the scan. If they are not generated yet, use a wait state:

> We are preparing the implementation plan for this scan. You can book a review now, or check back shortly.

## Post-Scan Page Message

Headline:

> Your AI visibility snapshot is ready.

Body:

> This scan shows how often your brand appears across buyer-intent AI searches, which competitors are showing up instead, and where your site needs stronger signals. The next step is turning the gaps into fixes.

CTA block:

> Want us to map the next move?
>
> Book a short AI Visibility Review. We will translate this scan into the top actions your team can take to improve citations, page coverage, and AI answer presence.

Button:

> Book My AI Visibility Review

## Score-Based CTA Variants

Low score:

> Your brand is mostly absent from AI answers for these buyer-intent searches. The fastest next step is identifying the pages, schema, and authority signals needed to get cited.

CTA:

> Find My First 5 Fixes

Middle score:

> You are showing up in some AI answers, but competitors are still winning important prompts. The next step is tightening the content and citation signals around the gaps.

CTA:

> Prioritize My Visibility Gaps

High score:

> You have a strong AI visibility baseline. The next step is protecting that lead and expanding into prompts where competitors still appear.

CTA:

> Expand My AI Visibility

## Email Follow-Up Copy

Subject:

> Your AI visibility scan for {domain}

Body:

```text
Hi,

Your AI visibility snapshot for {domain} is ready.

The scan shows where your brand appears in AI-generated buyer answers, which competitors are being cited instead, and where your site may need stronger content, schema, and authority signals.

The useful part is not just the score. It is knowing what to fix first.

Book a short AI Visibility Review and we will walk through the highest-impact opportunities from your scan.

Book your review: {booking_url}
```

## UI Placement

Show the primary CTA:

- At the top of the completed scan result.
- Beside the final score.
- After the competitor comparison section.
- At the bottom of the report.

Show duplicate-scan messaging:

- Immediately after the user submits a URL that already has a public scan.
- Include a direct link to the existing scan result.
- Keep the CTA visible below the message.

## Analytics Events

Track these events:

```text
public_scan_created
public_scan_reused
public_scan_completed
public_scan_cta_viewed
public_scan_cta_clicked
public_scan_booking_started
public_scan_existing_result_opened
```

Useful properties:

```text
scan_id
domain
scan_type
visibility_score
cta_variant
is_duplicate_submission
```

## Marketing Positioning

The scan is the diagnostic. The review is the interpretation. The Optimization Fix Pack is the implementation handoff.

Keep the promise concrete:

- What AI answers currently say.
- Which competitors are winning.
- Which gaps matter most.
- What to fix first.
- How the fix becomes implementation-ready.

Avoid promising rankings or guaranteed citations. Use language like "improve your chance of being cited" and "strengthen the signals AI systems can find."

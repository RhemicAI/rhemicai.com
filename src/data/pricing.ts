import type { CalLink } from '@/lib/calEmbed';

export type PricingTier = 'basic' | 'growth' | 'premium';
export type PricingSegment = 'medspa';

export interface PricingPlan {
  name: string;
  tier: PricingTier;
  segment: PricingSegment;
  monthlyPrice: number;
  annualPrice: number;
  wasPrice: number;
  bestFor: string;
  includedLocations: string;
  primaryUseCase: string;
  fixes: string;
  promise: string;
  whatTheyGet: string[];
  boundaries: string[];
  upgradePath?: string;
  explanation?: string;
  featured: boolean;
  calLink?: CalLink;
  features: string[];
}

const RECURRING_VALUE_LINE =
  'Runs every day — not a one-time audit. The system keeps watching for leaks as they happen.';

export const plans: PricingPlan[] = [
  {
    name: 'Diagnose',
    tier: 'basic',
    segment: 'medspa',
    monthlyPrice: 1000,
    annualPrice: 12000,
    wasPrice: 1000,
    bestFor: 'Find the leaks.',
    includedLocations: '1 location',
    primaryUseCase:
      'For a single-location med spa that needs to see exactly where booked consults are leaking.',
    fixes:
      'Lead Capture Foundation: see where consult opportunities are lost across search, pages, missed calls, and manual handoffs — before you spend more driving demand.',
    promise:
      'Rhemic finds where patients slip away — in search, on your pages, in missed calls, and in handoffs — so you fix the highest-impact gaps first.',
    whatTheyGet: [
      'Every consult inquiry answered and captured — including after hours',
      'See where patients searching for your treatments are choosing competitors instead',
      'Google Business Profile positioned to win local consults',
      'Reviews turned into booked consults automatically',
      'Treatment pages and local presence fixed in priority order',
    ],
    boundaries: [
      'Single location',
      'No multi-location routing or dashboard',
      'No connected-account ad reporting',
      'No deep competitor tracking',
    ],
    upgradePath: RECURRING_VALUE_LINE,
    featured: false,
    calLink: 'rhemic-ai/medspa-discovery-call',
    features: [
      'Google Business Profile and Maps foundation review',
      'Local SEO, schema, citation, and treatment-page priority fixes',
      'AI search visibility baseline for high-intent med-spa searches',
      'Lead Capture Foundation and missed-call opportunity map',
    ],
  },
  {
    name: 'Capture',
    tier: 'growth',
    segment: 'medspa',
    monthlyPrice: 2000,
    annualPrice: 24000,
    wasPrice: 2000,
    bestFor: 'Catch and route every consult.',
    includedLocations: '1–2 locations',
    primaryUseCase:
      'For an owner-led med spa ready to catch and route every bit of booking intent into the right hands.',
    fixes:
      'The always-on Consult Capture Layer: calls, missed calls, after-hours inquiries, and website inquiries (where available) are caught and routed into approved handoff workflows with clear source context.',
    promise:
      "Rhemic doesn't just find the leaks — it runs the system that catches consult intent every day and routes it to your team with clear source context.",
    whatTheyGet: [
      'Everything in Diagnose',
      'Always-on Consult Capture Layer — calls, missed calls, after-hours, and website inquiries caught and routed',
      'Missed calls turned back into booked consults automatically',
      'Booking intent routed to your team with source context, so nothing falls through',
      'Stronger front-desk coverage so no inquiry goes unanswered',
    ],
    boundaries: [
      'Up to two locations',
      'No multi-location dashboard beyond two locations',
      'No connected-account ad reporting',
      'Rhemic routes and captures consult intent; it does not guarantee appointments.',
    ],
    upgradePath: RECURRING_VALUE_LINE,
    featured: true,
    calLink: 'rhemic-ai/medspa-discovery-call',
    features: [
      'Everything in Diagnose',
      'Review, offer clarity, and competitor positioning work',
      'Treatment-page optimization priorities and content briefs',
      'Consult Capture Layer and approved handoff workflows',
      'Competitor visibility and demand review',
    ],
  },
  {
    name: 'Scale',
    tier: 'premium',
    segment: 'medspa',
    monthlyPrice: 3500,
    annualPrice: 42000,
    wasPrice: 3500,
    bestFor: 'Expand what is working.',
    includedLocations: '2–5 locations',
    primaryUseCase:
      'For a competitive metro practice, premium clinic, or 2–5 location operator expanding what already works.',
    fixes:
      'Advanced Consult Capture Layer with multi-location routing, deeper handoff scripts, source-aware reporting, and connected-account ad reporting for campaign context.',
    promise:
      'Rhemic shows you which leaks, markets, locations, and sources deserve more investment — so you double down on what is converting.',
    whatTheyGet: [
      'Everything in Capture',
      'Advanced Consult Capture Layer with multi-location routing',
      'Competitor tracking — see who is winning consults near each location',
      'Ad spend tied to booked-consult outcomes, by source and campaign',
      'Multi-location dashboard',
    ],
    boundaries: [
      'Supports up to five locations, not six or more',
      'Connected-account ad reporting informs decisions; paid ad management is separate unless scoped',
      'No automatic ad-to-consult attribution promise',
    ],
    upgradePath: RECURRING_VALUE_LINE,
    featured: false,
    calLink: 'rhemic-ai/medspa-discovery-call',
    features: [
      'Everything in Capture',
      'Multi-location visibility and treatment-page priority map',
      'Connected-account ad reporting and deeper AI answer-engine scanning',
      'Location-level GBP, citations, schema, and review-response guidance',
      'Advanced Consult Capture Layer and reporting cadence',
    ],
  },
];

export const customPlan = {
  name: 'Custom',
  monthlyPriceLabel: 'Custom',
  includedLocations: '6+ locations',
  primaryUseCase: 'Connect complex teams, locations, and reporting.',
  bestFor: [
    '6+ locations',
    'Multi-market groups',
    'Chains',
    'Dermatology groups',
    'PE-backed operators',
    'Complex routing or reporting needs',
  ],
  fixes:
    'Custom Routing and Integration Layer for complex routing, permissions, audit logs, supported integrations, and custom reporting.',
  calLink: 'rhemic-ai/medspa-discovery-call' as CalLink,
};

// Legacy exports — used by SmbPricing and SmbHero
export const medSpaPlans: PricingPlan[] = plans;

// Legacy export name stays in place for older components, but the data is med-spa specific.
export const smbPlans: PricingPlan[] = plans;

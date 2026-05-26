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

export const plans: PricingPlan[] = [
  {
    name: 'Basic',
    tier: 'basic',
    segment: 'medspa',
    monthlyPrice: 1000,
    annualPrice: 12000,
    wasPrice: 1000,
    bestFor: 'A single-location med spa that needs to find where consult opportunities are leaking.',
    includedLocations: '1 location',
    primaryUseCase: 'Find the leaks.',
    fixes: 'Lead Capture Foundation: source preservation, missed-call opportunity mapping, and manual handoff visibility.',
    promise: 'Rhemic helps identify visibility, trust, call, and handoff gaps before you spend more on demand.',
    whatTheyGet: [
      'AI receptionist coverage',
      'AI search visibility scan across ChatGPT, Claude, Perplexity, and Google AI',
      'Google Business Profile optimization',
      'Review-request automation',
      'Local SEO and treatment-page priority fixes',
      'Lead Capture Foundation',
      'Monthly reporting',
    ],
    boundaries: [
      'No new website forms or full routing workflows',
      'No campaign-specific capture',
      'No calendar booking logic',
      'No ads intelligence',
      'No multi-location support',
      'No deep competitor tracking',
      'No advanced AI receptionist scripts',
    ],
    upgradePath:
      'Growth adds the Consult Capture Layer to help surface more booking intent and route it into approved handoff workflows.',
    featured: false,
    calLink: 'rhemic-ai/medspa-discovery-call',
    features: [
      'Google Business Profile and Maps foundation review',
      'Local SEO, schema, citation, and treatment-page priority fixes',
      'AEO/GEO baseline for high-intent med-spa searches',
      'Lead Capture Foundation and missed-call opportunity map',
    ],
  },
  {
    name: 'Growth',
    tier: 'growth',
    segment: 'medspa',
    monthlyPrice: 2000,
    annualPrice: 24000,
    wasPrice: 2000,
    bestFor: 'An owner-led med spa that wants to catch and route more booking intent.',
    includedLocations: '1-2 locations',
    primaryUseCase: 'Catch and route more intent.',
    fixes: 'In Growth, “catch and route more intent” means Rhemic helps surface calls, missed calls, after-hours inquiries, website inquiries where available, and campaign handoffs, then route booking intent into approved handoff workflows. It does not mean direct booking or guaranteed appointments.',
    promise: 'Rhemic helps surface booking intent and route it to the right team with clearer source context.',
    whatTheyGet: [
      'Everything in Basic',
      'Stronger AI receptionist coverage',
      'Consult Capture Layer',
      'Missed-call recovery workflow',
      'Better call handling and lead capture',
      'Backlink intelligence',
      'Reddit content plan, spa executes, no auto-posting',
      'Competitor visibility review',
      'Monthly growth review',
    ],
    boundaries: [
      'No Meta Ads dashboard or Meta MCP account connection',
      'No multi-location dashboard beyond two locations',
      'No calendar booking logic by default',
      'No direct booking or guaranteed appointments',
      'Reddit work is planning only, not posting',
      'Best fit is one or two locations, not larger multi-market groups',
    ],
    explanation:
      'Growth is the default fit when missed calls, handoffs, and source context are active concerns.',
    featured: true,
    calLink: 'rhemic-ai/medspa-discovery-call',
    features: [
      'Everything in Basic',
      'Review, offer clarity, and competitor positioning work',
      'Treatment-page optimization priorities and content briefs',
      'Consult Capture Layer and approved handoff workflows',
      'Competitor visibility and demand review',
    ],
  },
  {
    name: 'Premium',
    tier: 'premium',
    segment: 'medspa',
    monthlyPrice: 3500,
    annualPrice: 42000,
    wasPrice: 3500,
    bestFor: 'A competitive metro med spa, premium practice, multi-treatment clinic, or 2-5 location operator expanding what is working.',
    includedLocations: '2-5 locations',
    primaryUseCase: 'Expand what is working.',
    fixes: 'Advanced Consult Capture Layer with multi-location routing visibility, deeper AI receptionist scripts, source-aware reporting, and Meta Ads source view for connected-account reporting and campaign context.',
    promise: 'Rhemic helps prioritize the leaks, markets, locations, and sources that deserve more attention.',
    whatTheyGet: [
      'Everything in Growth',
      'Advanced Consult Capture Layer',
      'Competitor tracking',
      'Meta Ads source view for connected-account reporting and campaign context',
      'Multi-location dashboard',
      'Advanced AI receptionist scripts',
      'Deeper reporting cadence',
      'Monthly strategy cadence',
    ],
    boundaries: [
      'Supports up to five locations, not six or more',
      'Meta Ads source view informs decisions; paid ads management is separate unless scoped',
      'No automatic ad-to-consult attribution promise',
      'No calendar booking logic by default',
      'No direct booking or guaranteed appointments',
      'Strategy cadence is defined monthly, not open-ended consulting',
    ],
    explanation:
      'Premium is for owners who need deeper market visibility and faster decisions on what to fix first.',
    featured: false,
    calLink: 'rhemic-ai/medspa-discovery-call',
    features: [
      'Everything in Growth',
      'Multi-location visibility and treatment-page priority map',
      'Meta Ads source view and deeper AI answer-engine scanning',
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

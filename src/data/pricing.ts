import type { CalLink } from '@/lib/calEmbed';

export type PricingTier = 'starter' | 'growth' | 'scale';
export type PricingSegment = 'agency' | 'smb';

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
    tier: 'starter',
    segment: 'smb',
    monthlyPrice: 1000,
    annualPrice: 12000,
    wasPrice: 1000,
    bestFor: 'A single-location med spa fixing visibility, reviews, Google Business Profile, AI search presence, and handoff visibility.',
    includedLocations: '1 location',
    primaryUseCase: 'Foundation cleanup for clinics that need the basics working before heavier growth support.',
    fixes: 'Lead Capture Foundation: source preservation, missed-call opportunity mapping, and manual handoff visibility.',
    promise: 'Patients can find you, trust you, and reach your team more easily.',
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
      'Growth adds the Consult Capture Layer for routing booking intent from calls, missed calls, after-hours inquiries, website inquiries where available, and campaign handoffs.',
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
    segment: 'smb',
    monthlyPrice: 2000,
    annualPrice: 24000,
    wasPrice: 2000,
    bestFor: 'An owner-led med spa actively trying to grow consult volume with stronger visibility, call coverage, and demand decisions.',
    includedLocations: '1-2 locations',
    primaryUseCase: 'Main recommendation for owner-led med spas trying to grow consult volume.',
    fixes: 'Consult Capture Layer for routing booking intent from calls, missed calls, after-hours inquiries, website inquiries where available, and campaign handoffs into approved handoff workflows.',
    promise: 'You get stronger visibility, better call handling, missed-call recovery, and source context for demand.',
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
      'Reddit work is planning only, not posting',
      'Best fit is one or two locations, not larger multi-market groups',
    ],
    explanation:
      'Growth is the default fit when missed calls, source context, and consult volume are active concerns.',
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
    tier: 'scale',
    segment: 'smb',
    monthlyPrice: 3500,
    annualPrice: 42000,
    wasPrice: 3500,
    bestFor: 'A competitive metro med spa, premium practice, multi-treatment clinic, or 2-5 location operator.',
    includedLocations: '2-5 locations',
    primaryUseCase: 'Competitive markets, bigger teams, multi-treatment clinics, or boutique multi-location groups.',
    fixes: 'Advanced Consult Capture Layer with multi-location routing visibility, deeper AI receptionist scripts, source-aware reporting, and Meta Ads source view for connected-account reporting and campaign context.',
    promise: 'You get deeper support, better market awareness, source context, and stronger capture of patient demand.',
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
  primaryUseCase: 'For six or more locations, chains, dermatology groups, or PE-backed operators.',
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
export const smbPlans: PricingPlan[] = plans;

export const agencyTiers: PricingPlan[] = plans;

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
    bestFor: 'A med spa with one location, real services, some reviews, and obvious gaps in Google, local search, patient trust, or missed calls.',
    includedLocations: '1 location',
    primaryUseCase: 'Foundation cleanup before buying heavier growth support.',
    fixes: 'Google, local search, patient trust, treatment pages, and missed-call gaps.',
    promise: 'Patients can find you, trust you, and reach you more easily.',
    whatTheyGet: [
      'Google Business Profile review and improvement plan',
      'Local SEO cleanup for the main location',
      'Basic AI search visibility check for important med spa searches',
      'Review and reputation recommendations',
      'Treatment page checklist for Botox, fillers, laser, facials, and body contouring',
      'Basic AI receptionist for missed and after-hours calls',
    ],
    boundaries: [
      'No ads intelligence',
      'No multi-location support',
      'No deep competitor tracking',
    ],
    upgradePath:
      'If competitors, ads, stronger call coverage, or active consult growth are the priority, Growth is usually the better fit.',
    featured: false,
    calLink: 'rhemic-ai/discovery-call',
    features: [
      'Google Business Profile and Maps foundation review',
      'Local SEO, schema, citation, and treatment-page priority fixes',
      'AEO/GEO baseline for high-intent med-spa searches',
      'Lead response gap review and missed-call opportunity map',
    ],
  },
  {
    name: 'Growth',
    tier: 'growth',
    segment: 'smb',
    monthlyPrice: 2000,
    annualPrice: 24000,
    wasPrice: 2000,
    bestFor: 'A one or two-location med spa that already has some demand and wants a stronger system for visibility, trust, AI receptionist coverage, and growth decisions.',
    includedLocations: '1-2 locations',
    primaryUseCase: 'Main recommendation for serious owner-led med spas trying to grow consult volume.',
    fixes: 'Visibility, reviews, treatment pages, missed calls, competitor visibility, and growth decisions.',
    promise: 'You get stronger visibility, AI receptionist coverage, and limited ads intelligence.',
    whatTheyGet: [
      'Everything in Basic',
      'Deeper Google Business Profile recommendations',
      'More AI search visibility checks for important treatments and local searches',
      'Competitor visibility review for nearby med spas',
      'Review growth plan to strengthen patient trust',
      'AI receptionist with stronger call handling and follow-up notes',
      'Limited ads intelligence',
      'Monthly growth review',
    ],
    boundaries: [
      'Ads intelligence is high-level monthly guidance, not constant monitoring',
      'Paid ads are not built or managed inside this tier',
      'Best fit is one or two locations, not larger multi-market groups',
    ],
    explanation:
      'Growth helps you understand what competitors are advertising, but Premium goes much deeper.',
    featured: true,
    calLink: 'rhemic-ai/discovery-call',
    features: [
      'Everything in Basic',
      'Review, offer clarity, and competitor positioning work',
      'Treatment-page optimization priorities and content briefs',
      'Missed-call recovery workflow and approved response guidance',
      'Ads and competitor demand intelligence review',
    ],
  },
  {
    name: 'Premium',
    tier: 'scale',
    segment: 'smb',
    monthlyPrice: 3500,
    annualPrice: 42000,
    wasPrice: 3500,
    bestFor: 'A premium med spa, busy practice, strong local competitor, or small multi-location group where every lost consult is expensive.',
    includedLocations: '2-5 locations',
    primaryUseCase: 'Deeper market visibility, stronger AI receptionist coverage, and more help deciding what to fix first.',
    fixes: 'Competitive markets, bigger teams, multi-location visibility, ads intelligence, and patient-demand capture.',
    promise: 'You get deeper support, better market awareness, and stronger capture of patient demand.',
    whatTheyGet: [
      'Everything in Growth',
      'More complete AI search visibility checks across treatments and competitors',
      'Multi-location review up to five locations',
      'Deeper Google Business Profile and local SEO priorities',
      'More complete treatment page, schema, review, and citation recommendations',
      'Premium AI receptionist support for missed and after-hours calls',
      'Deeper ads intelligence',
      'Higher-touch strategy review',
    ],
    boundaries: [
      'Supports up to five locations, not six or more',
      'Ads intelligence informs decisions; paid ads management is separate',
      'Strategy review is higher-touch, but not open-ended consulting',
    ],
    explanation:
      'Premium is for owners who want to understand the market and respond faster.',
    featured: false,
    calLink: 'rhemic-ai/discovery-call',
    features: [
      'Everything in Growth',
      'Multi-location visibility and treatment-page priority map',
      'Deeper competitor, ads, and AI answer-engine scanning',
      'Location-level GBP, citations, schema, and review-response guidance',
      'Stronger call-response workflows and reporting cadence',
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
    'Multi-market visibility, group-level reporting, location routing, deeper competitor intelligence, and rollout planning.',
  calLink: 'rhemic-ai/discovery-call' as CalLink,
};

// Legacy exports — used by SmbPricing and SmbHero
export const smbPlans: PricingPlan[] = plans;

export const agencyTiers: PricingPlan[] = plans;

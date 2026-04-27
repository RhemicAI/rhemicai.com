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
  featured: boolean;
  calLink?: string;
  features: string[];
}

export const plans: PricingPlan[] = [
  {
    name: 'Starter',
    tier: 'starter',
    segment: 'smb',
    monthlyPrice: 199,
    annualPrice: 1990,
    wasPrice: 299,
    bestFor: 'See exactly where you stand in AI search',
    featured: false,
    calLink: 'rhemic-ai/smb-starter-onboarding',
    features: [
      'Full AI visibility audit across ChatGPT, Claude, Gemini & Perplexity',
      'See which competitors AI recommends instead of you',
      'Competitive gap report showing exactly why they rank above you',
      '5 prioritized fixes to start showing up in AI answers',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    tier: 'growth',
    segment: 'smb',
    monthlyPrice: 299,
    annualPrice: 2990,
    wasPrice: 399,
    bestFor: 'Start showing up in AI answers and stay there',
    featured: true,
    calLink: 'rhemic-ai/smb-growth-onboarding',
    features: [
      'Everything in Starter, plus:',
      'Monthly re-scans to track your visibility climbing',
      'Before-and-after progress dashboard',
      '5 competitors tracked, 3 topic clusters optimized',
      'Priority support: answers within hours, not days',
    ],
  },
  {
    name: 'Scale',
    tier: 'scale',
    segment: 'smb',
    monthlyPrice: 499,
    annualPrice: 4990,
    wasPrice: 699,
    bestFor: 'Dominate your market and expand your presence',
    featured: false,
    calLink: 'rhemic-ai/smb-scale-onboarding',
    features: [
      'Everything in Growth, plus:',
      'Weekly audits, unlimited competitors and topics',
      'Schema markup for unlimited pages',
      'We build you a professional website (included)',
      'Dedicated account manager & weekly strategy call',
    ],
  },
];

// Legacy exports — used by SmbPricing and SmbHero
export const smbPlans: PricingPlan[] = plans;

export const agencyTiers: PricingPlan[] = plans;

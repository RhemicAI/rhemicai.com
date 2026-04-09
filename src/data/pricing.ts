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

export const smbPlans: PricingPlan[] = [
  {
    name: 'Local Starter',
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
    ],
  },
  {
    name: 'Local Growth',
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
      'Monthly re-scans so you can track your visibility climbing',
      'Before-and-after progress dashboard showing your AI visibility growth',
      'Priority support: get answers within hours, not days',
    ],
  },
  {
    name: 'Local Scale',
    tier: 'scale',
    segment: 'smb',
    monthlyPrice: 499,
    annualPrice: 4990,
    wasPrice: 699,
    bestFor: 'Dominate your market across every location',
    featured: false,
    calLink: 'rhemic-ai/smb-scale-onboarding',
    features: [
      'Everything in Growth, plus:',
      'We build you a professional 3-page website (free, included in your plan)',
      'Every business location audited and optimized separately',
      'Weekly scans so you catch and fix visibility drops before competitors notice',
      'Dedicated account review with a real strategist reviewing your progress',
    ],
  },
];

export const agencyTiers: PricingPlan[] = [
  {
    name: 'Starter',
    tier: 'starter',
    segment: 'agency',
    monthlyPrice: 599,
    annualPrice: 5990,
    wasPrice: 899,
    bestFor: 'Get a clear baseline on your agency\'s AI visibility',
    featured: false,
    calLink: 'rhemic-ai/rhemic-ai-agency-starter-onboarding',
    features: [
      'Monthly AI visibility audit across all major engines',
      '1 competitor tracked, 1 topic cluster optimized',
      'Schema markup for up to 10 pages',
      'Monthly AEO score report',
      'Email support (48hr response)',
    ],
  },
  {
    name: 'Growth',
    tier: 'growth',
    segment: 'agency',
    monthlyPrice: 999,
    annualPrice: 9990,
    wasPrice: 1199,
    bestFor: 'Accelerate your agency\'s presence across every AI engine',
    featured: true,
    calLink: 'rhemic-ai/rhemic-ai-agency-growth-onboarding',
    features: [
      'Everything in Starter, plus:',
      'Bi-weekly audits, 5 competitors tracked',
      'Unlimited schema generation',
      '3 topic clusters optimized',
      'Priority email + Slack support',
      'Monthly strategy call with the Rhemic team',
    ],
  },
  {
    name: 'Scale',
    tier: 'scale',
    segment: 'agency',
    monthlyPrice: 1499,
    annualPrice: 14990,
    wasPrice: 1999,
    bestFor: 'Become the most visible agency in your category',
    featured: false,
    calLink: 'rhemic-ai/rhemic-ai-agency-scale-onboarding',
    features: [
      'Everything in Growth, plus:',
      'Weekly audits, unlimited competitors and topics',
      'Dedicated account manager',
      'Weekly strategy call',
      'Early access to new features',
    ],
  },
];

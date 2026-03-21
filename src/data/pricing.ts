export interface PricingPlan {
  name: string;
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
    monthlyPrice: 199,
    annualPrice: 1990,
    wasPrice: 299,
    bestFor: 'Single-location businesses getting started',
    featured: false,
    features: [
      '30 buyer-intent prompts',
      '4 AI engines scanned (ChatGPT, Claude, Gemini, Perplexity)',
      'Competitive gap report',
      '5 plain-English fix recommendations',
    ],
  },
  {
    name: 'Local Growth',
    monthlyPrice: 299,
    annualPrice: 2990,
    wasPrice: 399,
    bestFor: 'Businesses ready to dominate local AI search + free website',
    featured: true,
    features: [
      'Everything in Starter',
      'Free 3-page website setup (Home, About, Contact)',
      'Monthly re-scans',
      'Progress tracking',
      'Priority support',
    ],
  },
  {
    name: 'Local Scale',
    monthlyPrice: 499,
    annualPrice: 4990,
    wasPrice: 699,
    bestFor: 'Competitive markets or multiple locations',
    featured: false,
    features: [
      'Everything in Growth',
      'Multi-location scanning',
      'Weekly re-scans',
      'Dedicated account review',
    ],
  },
];

export const agencyTiers: PricingPlan[] = [
  {
    name: 'Starter',
    monthlyPrice: 599,
    annualPrice: 5990,
    wasPrice: 899,
    bestFor: 'For small agencies getting their first foothold in AI search.',
    featured: false,
    calLink: 'rhemic-ai/starter-plan-onboarding',
    features: [
      'AI Visibility Audit (monthly)',
      '1 competitor tracked across ChatGPT, Claude, Gemini, Perplexity',
      'Schema markup + JSON-LD generation (up to 10 pages)',
      '1 topic cluster optimized',
      'Monthly AEO score report',
      'Email support (48hr response)',
    ],
  },
  {
    name: 'Growth',
    monthlyPrice: 999,
    annualPrice: 9990,
    wasPrice: 1199,
    bestFor: 'For growing agencies that want to dominate their category in AI search.',
    featured: true,
    calLink: 'rhemic-ai/growth-plan-onboarding',
    features: [
      'Everything in Starter, plus:',
      'AI Visibility Audit (bi-weekly)',
      '5 competitors tracked',
      'Schema markup + JSON-LD generation (unlimited pages)',
      '3 topic clusters optimized',
      'Bi-weekly AEO score report + recommendations',
      'Priority email + Slack support',
      'Monthly 30-min strategy call',
      'Competitor gap analysis report',
    ],
  },
  {
    name: 'Scale',
    monthlyPrice: 1499,
    annualPrice: 14990,
    wasPrice: 1999,
    bestFor: 'For agencies and multi-location brands managing visibility at scale.',
    featured: false,
    calLink: 'rhemic-ai/scale-plan-onboarding',
    features: [
      'Everything in Growth, plus:',
      'AI Visibility Audit (weekly)',
      'Unlimited competitors tracked',
      'Unlimited topic clusters',
      'Weekly AEO score report',
      'Dedicated account manager',
      'Weekly 30-min strategy call',
      'White-label reporting (for agencies)',
      'Early access to new Rhemic AI features',
    ],
  },
];

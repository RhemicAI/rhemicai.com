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
  featured: boolean;
  calLink?: CalLink;
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
    bestFor: 'ChatGPT citation checks for single-location SMBs',
    featured: false,
    calLink: 'rhemic-ai/smb-starter-onboarding',
    features: [
      'Monthly ChatGPT-only citation check',
      '50 buyer-intent prompts',
      'Brand Share vs. 3 competitors',
      'Homepage + 5-page SEO audit',
      'Top 5 fixes, PDF report, 48hr email support',
    ],
  },
  {
    name: 'Growth',
    tier: 'growth',
    segment: 'smb',
    monthlyPrice: 299,
    annualPrice: 2990,
    wasPrice: 399,
    bestFor: 'Bi-weekly ChatGPT + Perplexity tracking',
    featured: true,
    calLink: 'rhemic-ai/smb-growth-onboarding',
    features: [
      'Bi-weekly ChatGPT + Perplexity checks',
      '100 buyer-intent prompts',
      'Brand Share vs. 5 competitors',
      'Agentic schema + on-page deploys for 10 pages',
      'Content brief, 6-month dashboard, 24hr email support',
    ],
  },
  {
    name: 'Scale',
    tier: 'scale',
    segment: 'smb',
    monthlyPrice: 499,
    annualPrice: 4990,
    wasPrice: 699,
    bestFor: 'Weekly multi-engine coverage and agentic implementation',
    featured: false,
    calLink: 'rhemic-ai/smb-scale-onboarding',
    features: [
      'Weekly checks across all 4 engines',
      '200+ prompts and unlimited competitors',
      'Unlimited agentic on-page + schema deployment',
      'Programmatic landing pages and local SEO assets',
      '3 content briefs, 12-month dashboard, same-day chat support',
    ],
  },
];

// Legacy exports — used by SmbPricing and SmbHero
export const smbPlans: PricingPlan[] = plans;

export const agencyTiers: PricingPlan[] = plans;

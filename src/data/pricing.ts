import type { CalLink } from '@/lib/calEmbed';

// Internal tier slugs kept as starter/growth/scale to avoid breaking
// compare pages and sub-pages that reference them. Display names are
// Basic / Mid / Premium per the med spa positioning doc.
export type PricingTier = 'starter' | 'growth' | 'scale';
export type PricingSegment = 'medspa' | 'agency' | 'smb';

export interface PricingPlan {
  name: string;
  tier: PricingTier;
  segment: PricingSegment;
  monthlyPrice: number;
  annualPrice: number;
  wasPrice: number;
  headline: string;
  bestFor: string;
  featured: boolean;
  calLink?: CalLink;
  features: string[];
  // Per-plan Stripe Payment Link. Placeholder URLs for now; swap to real
  // https://buy.stripe.com/... links from the Stripe dashboard.
  // Later: read from STRIPE_PAYMENT_LINK_{TIER} env vars inside /api/signup.
  stripePaymentLink?: string;
}

export const plans: PricingPlan[] = [
  {
    name: 'Basic',
    tier: 'starter',
    segment: 'medspa',
    monthlyPrice: 1000,
    annualPrice: 12000,
    wasPrice: 0,
    headline: 'Stop losing easy leads',
    bestFor: 'Single-location med spas getting found on AI and recovering missed calls',
    featured: false,
    stripePaymentLink: 'https://buy.stripe.com/PLACEHOLDER_BASIC',
    features: [
      'Monthly AEO scans across ChatGPT, Claude, Perplexity, and Google AI',
      '50 buyer-intent prompts tracked',
      'Google Business Profile cleanup and optimization',
      'AI receptionist on Vapi with a base call flow',
      'Missed-call recovery via SMS within 24 hours',
      'Closed-loop reporting on calls, citations, and bookings',
    ],
  },
  {
    name: 'Mid',
    tier: 'growth',
    segment: 'medspa',
    monthlyPrice: 2000,
    annualPrice: 24000,
    wasPrice: 0,
    headline: 'Own your metro',
    bestFor: 'Med spas ready to dominate local AI search and capture every consult',
    featured: true,
    stripePaymentLink: 'https://buy.stripe.com/PLACEHOLDER_MID',
    features: [
      'Bi-weekly scans across all 4 AI engines',
      '150 prompts plus 5 competitor benchmarks',
      'GBP and local SEO content for treatment-plus-location pages',
      'AI receptionist with full consult-booking flow',
      'After-hours capture plus missed-call recovery',
      'Schema, FAQ, and on-page conversion fixes',
      'Monthly closed-loop reporting tied to booked consults',
    ],
  },
  {
    name: 'Premium',
    tier: 'scale',
    segment: 'medspa',
    monthlyPrice: 3500,
    annualPrice: 42000,
    wasPrice: 0,
    headline: 'Dominate your category',
    bestFor: 'Multi-location and high-volume med spas running the full growth stack',
    featured: false,
    stripePaymentLink: 'https://buy.stripe.com/PLACEHOLDER_PREMIUM',
    features: [
      'Weekly scans, unlimited prompts, unlimited competitors',
      'Up to 2 locations included',
      'Programmatic landing pages and full local SEO',
      'Vertical-specific receptionist flows (Botox, IV, weight loss)',
      'Reactivation campaigns for lapsed patients',
      'Booking attribution dashboard tied to channel and AI engine',
      'Dedicated success manager',
    ],
  },
];

// Legacy exports kept for SmbPricing and SmbHero consumers
export const smbPlans: PricingPlan[] = plans;
export const agencyTiers: PricingPlan[] = plans;

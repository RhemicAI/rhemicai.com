import type { CalLink } from '@/lib/calEmbed';

export type PricingTier = 'basic' | 'growth' | 'premium';
export type PricingSegment = 'local';

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

/**
 * Single source of truth for the published price ladder.
 *
 * Positioning doc rule (rhemic/gtm/rhemic-positioning-2026-07-30.md §6):
 * every published price comes from this file. Never hardcode a price in page
 * copy, and never publish a number that is not here. Public pricing is a
 * visibility mechanism as well as a conversion one — a page stating a plain
 * number contains an extractable fact that an answer engine can quote.
 */

const RECURRING_VALUE_LINE =
  'Runs every day. It keeps watching as search and AI answers move, rather than handing you a one-time audit.';

const AUDIT_CALL: CalLink = 'rhemic-ai/rhemic-ai-audit-walkthrough';

export const plans: PricingPlan[] = [
  {
    name: 'Visibility',
    tier: 'basic',
    segment: 'local',
    monthlyPrice: 200,
    annualPrice: 2400,
    wasPrice: 300,
    bestFor: 'Get found and recommended.',
    includedLocations: '1 location',
    primaryUseCase:
      'For a local service business that customers cannot find on Google and that AI answers never name.',
    fixes:
      'The technical visibility stack: answer engine optimization (AEO), generative engine optimization (GEO), classic and technical SEO, and Google Business Profile optimization, run together.',
    promise:
      'Rhemic makes your business findable and quotable across Google and the AI answer engines, so the customer asking who to call hears your name.',
    whatTheyGet: [
      'Named inside AI answers when a customer asks who to call (AEO)',
      'Represented in the sources those engines read before they answer (GEO)',
      'Ranked on Google and competitive in the local map (SEO)',
      'Google Business Profile built out properly: categories, services, photos, posts, reviews',
      'Search Console and Bing Webmaster Tools set up, verified and monitored',
    ],
    boundaries: [
      'Single location',
      'No capture layer or lead tracker',
      'No multi-location routing or dashboard',
      'No connected-account ad reporting',
    ],
    upgradePath: RECURRING_VALUE_LINE,
    featured: false,
    calLink: AUDIT_CALL,
    features: [
      'Rank on Google and win the local map (SEO)',
      'Get cited and recommended inside AI answers (GEO + AEO)',
      'Google Business Profile optimization: categories, services, photos, reviews',
      'Schema, sitemaps, IndexNow and crawl access wired to the engines',
      'Citation share reported against the competitors you name',
    ],
  },
  {
    name: 'Capture',
    tier: 'growth',
    segment: 'local',
    monthlyPrice: 700,
    annualPrice: 8400,
    wasPrice: 1000,
    bestFor: 'Catch and route every inquiry.',
    includedLocations: '1 to 2 locations',
    primaryUseCase:
      'For a business already getting found that is losing the demand to missed calls, after-hours inquiries and forms nobody follows up.',
    fixes:
      'Everything in Visibility, plus the always-on capture layer that turns the demand into booked customers.',
    promise:
      'Every call, missed call, after-hours inquiry and form reaches your team fast, with the source attached.',
    whatTheyGet: [
      'Everything in Visibility',
      'Missed calls and after-hours inquiries caught and followed up',
      'Every lead routed to your team quickly, with where it came from',
      'A lead tracker built to how the business actually works',
      'Reporting that ties visibility work to booked jobs',
    ],
    boundaries: [
      'Up to two locations',
      'No multi-location routing across a larger group',
      'No connected-account ad spend reporting',
    ],
    upgradePath: RECURRING_VALUE_LINE,
    featured: true,
    calLink: AUDIT_CALL,
    features: [
      'Everything in Visibility',
      'Stop losing customers to missed calls and after-hours inquiries',
      'Every lead reaches your team fast, with where it came from',
      'Turn the people comparing you to competitors into booked customers',
    ],
  },
  {
    name: 'Full done-for-you system',
    tier: 'premium',
    segment: 'local',
    monthlyPrice: 2000,
    annualPrice: 24000,
    wasPrice: 2500,
    bestFor: 'We run the whole thing for you.',
    includedLocations: '3 or more locations',
    primaryUseCase:
      'For a multi-location operator who wants visibility, capture and reporting run as one system.',
    fixes:
      'Everything in Capture, plus multi-location routing, deeper reporting, and spend tied to booked-work outcomes by source and campaign.',
    promise:
      'You see which markets, channels and dollars actually book work, across every location.',
    whatTheyGet: [
      'Everything in Capture',
      'Every location handled, rather than one',
      'Routing and reporting across the whole group',
      'Which markets, channels and dollars book work, by source and campaign',
      'We run visibility, capture and reporting so you run the business',
    ],
    boundaries: [
      'Scoped per location count at onboarding',
      'Ad spend is billed separately from the retainer',
    ],
    upgradePath: RECURRING_VALUE_LINE,
    featured: false,
    calLink: AUDIT_CALL,
    features: [
      'Everything in Capture',
      'Every location handled, rather than one',
      'Know which markets, channels, and dollars actually book work',
      'We run visibility, capture, and reporting so you run the business',
    ],
  },
];

export const customPlan = {
  name: 'Custom',
  monthlyPriceLabel: 'Custom',
  includedLocations: '6+ locations',
  primaryUseCase: 'Larger groups, multi-market operators, and unusual internal setups.',
  bestFor: [
    '6+ locations',
    'Multi-market groups',
    'Franchise and chain operators',
    'Businesses with an in-house marketing team',
    'Complex routing or reporting needs',
  ],
  fixes:
    'The full stack scoped to your location count and your internal team, with routing, permissions and reporting shaped to how you already run the business.',
  calLink: AUDIT_CALL as CalLink,
};

/** Back-compatible alias. Same ladder; kept so existing imports keep working. */
export const smbPlans: PricingPlan[] = plans;

/**
 * Presentation shape used by the /pricing page cards.
 * Derived from `plans` so the page can never drift from the data.
 */
export type PricingCard = {
  badge: string;
  placeholder?: boolean;
  name: string;
  price: string;
  was?: string;
  unit?: string;
  best: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export const pricingCards: PricingCard[] = plans.map((plan, i) => ({
  badge: `Tier ${i + 1}`,
  name: plan.name,
  price: usd(plan.monthlyPrice),
  was: plan.wasPrice > plan.monthlyPrice ? usd(plan.wasPrice) : undefined,
  unit: '/mo',
  best: plan.bestFor,
  blurb: plan.fixes,
  features: plan.features,
  featured: plan.featured,
}));

/** Plain-text ladder for prose and schema, so extraction gets real numbers. */
export const priceLadderSentence = plans
  .map((p) => `${p.name} at ${usd(p.monthlyPrice)} a month`)
  .join(', ')
  .replace(/, ([^,]*)$/, ', and $1');

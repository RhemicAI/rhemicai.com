'use client';

import { useState } from 'react';

const plans = [
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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-violet-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}

export default function SmbPricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4 font-body">
            Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display mb-6">
            Simple pricing for local businesses.
          </h2>

          {/* Annual toggle */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span
              className={`text-sm font-body ${
                !annual ? 'text-white' : 'text-white/50'
              }`}
            >
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                annual ? 'bg-violet-600' : 'bg-white/20'
              }`}
              aria-label="Toggle annual pricing"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  annual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`text-sm font-body ${
                annual ? 'text-white' : 'text-white/50'
              }`}
            >
              Annual{' '}
              <span className="text-violet-400 text-xs">(save 2 months)</span>
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const displayPrice = annual ? plan.annualPrice : plan.monthlyPrice;
            const priceSuffix = annual ? '/year' : '/mo';
            const savings = plan.monthlyPrice * 12 - plan.annualPrice;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 sm:p-8 ${
                  plan.featured
                    ? 'border-violet-500/40 bg-violet-500/5 shadow-[0_0_40px_rgba(139,92,246,0.1)]'
                    : 'border-white/10 bg-[rgba(15,15,15,0.85)]'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-violet-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-bold text-[var(--text-primary)] font-display">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)] font-body">
                  {plan.bestFor}
                </p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[var(--text-primary)] font-display">
                      ${displayPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-[var(--text-muted)] font-body">
                      {priceSuffix}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-muted)] line-through font-body">
                    Was ${plan.wasPrice}/mo
                  </p>
                  {annual && (
                    <p className="mt-1 text-xs text-violet-400 font-body">
                      Save ${savings}/year
                    </p>
                  )}
                  <p className="mt-2 text-[11px] text-violet-400/80 font-body">
                    Founding member pricing — locks in at signup. Price increases after first 100 customers.
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[var(--text-secondary)] font-body"
                    >
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#ai-visibility-scan"
                  className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 font-body ${
                    plan.featured
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-700'
                      : 'border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Start free scan
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-base text-[var(--text-secondary)] font-body">
          One missed job costs $5,000–$15,000. This costs less than one service call per month.
        </p>
      </div>
    </section>
  );
}

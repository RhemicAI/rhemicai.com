'use client';

import { useState } from 'react';
import EnterprisePanel from '@/components/Pricing/EnterprisePanel';

const smbPlans = [
  {
    name: 'Local Starter',
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
    monthlyPrice: 299,
    annualPrice: 2990,
    wasPrice: 399,
    bestFor: 'Start showing up in AI answers and stay there',
    featured: true,
    calLink: 'rhemic-ai/smb-growth-onboarding',
    features: [
      'Everything in Starter, plus:',
      'We build you a professional 3-page website (free, included in your plan)',
      'Monthly re-scans so you can track your visibility climbing',
      'Before-and-after progress dashboard showing your AI visibility growth',
      'Priority support: get answers within hours, not days',
    ],
  },
  {
    name: 'Local Scale',
    monthlyPrice: 499,
    annualPrice: 4990,
    wasPrice: 699,
    bestFor: 'Dominate your market across every location',
    featured: false,
    calLink: 'rhemic-ai/smb-scale-onboarding',
    features: [
      'Everything in Growth, plus:',
      'Every business location audited and optimized separately',
      'Weekly scans so you catch and fix visibility drops before competitors notice',
      'Dedicated account review with a real strategist reviewing your progress',
    ],
  },
];

const agencyTiers = [
  {
    name: 'Starter',
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

export default function PricingSwitch() {
  const [activeTab, setActiveTab] = useState<'smb' | 'agency' | 'enterprise'>('smb');
  const [annual, setAnnual] = useState(false);

  return (
    <section className="mb-16 sm:mb-24">
      {/* Segmented tab control */}
      <div className="flex items-center justify-center mb-10">
        <div className="inline-flex rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] p-1 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('smb')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'smb'
                ? 'bg-white text-black'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            Small Business
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('agency')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'agency'
                ? 'bg-white text-black'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            Agency
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('enterprise')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'enterprise'
                ? 'bg-white text-black'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            Enterprise
          </button>
        </div>
      </div>

      {/* Monthly/annual toggle - visible on SMB and Agency tabs */}
      <div className={`flex items-center justify-center gap-3 mb-8 ${activeTab === 'enterprise' ? 'hidden' : ''}`}>
        <span className={`text-sm ${!annual ? 'text-white' : 'text-white/50'}`}>Monthly</span>
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
        <span className={`text-sm ${annual ? 'text-white' : 'text-white/50'}`}>
          Annual{' '}
          <span className="text-violet-400 text-xs">(save 2 months)</span>
        </span>
      </div>

      {/* Cards */}
      {activeTab === 'enterprise' ? (
        <div key="enterprise" style={{ animation: 'aeo-fade-in 0.3s ease forwards' }}>
          <EnterprisePanel />
        </div>
      ) : (
      <div key={activeTab} className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ animation: 'aeo-fade-in 0.3s ease forwards' }}>
        {activeTab === 'smb'
          ? smbPlans.map((plan) => {
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

                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{plan.name}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{plan.bestFor}</p>

                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[var(--text-primary)]">
                        ${displayPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">{priceSuffix}</span>
                    </div>
                    {!annual && (
                      <p className="mt-1 text-sm text-[var(--text-muted)] line-through">
                        Was ${plan.wasPrice}/mo
                      </p>
                    )}
                    {annual && (
                      <p className="mt-1 text-xs text-violet-400">Save ${savings}/year</p>
                    )}
                    <p className="mt-2 text-[11px] text-violet-400/80">
                      Founding member pricing. Locks in at signup.
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        {feature.startsWith('Everything in') ? (
                          <span className="text-[var(--text-tertiary)] font-semibold w-full">{feature}</span>
                        ) : (
                          <>
                            <CheckIcon />
                            <span>{feature}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#"
                    data-cal-link={plan.calLink}
                    className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                      plan.featured
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-700'
                        : 'border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Book Your Strategy Call
                  </a>
                </div>
              );
            })
          : agencyTiers.map((tier) => {
              const displayPrice = annual ? tier.annualPrice : tier.monthlyPrice;
              const priceSuffix = annual ? '/year' : '/mo';
              const savings = tier.monthlyPrice * 12 - tier.annualPrice;

              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border p-6 sm:p-8 ${
                    tier.featured
                      ? 'border-violet-500/40 bg-violet-500/5 shadow-[0_0_40px_rgba(139,92,246,0.1)]'
                      : 'border-white/10 bg-[rgba(15,15,15,0.85)]'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-block rounded-full bg-violet-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{tier.name}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{tier.bestFor}</p>

                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-[var(--text-primary)]">
                        ${displayPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">{priceSuffix}</span>
                    </div>
                    {!annual && (
                      <p className="mt-1 text-sm text-[var(--text-muted)] line-through">
                        Was ${tier.wasPrice}/mo
                      </p>
                    )}
                    {annual && (
                      <p className="mt-1 text-xs text-violet-400">Save ${savings.toLocaleString()}/year</p>
                    )}
                    <p className="mt-2 text-[11px] text-violet-400/80">
                      Founding member pricing. Locks in at signup.
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        {feature.startsWith('Everything in') ? (
                          <span className="text-[var(--text-tertiary)] font-semibold w-full">{feature}</span>
                        ) : (
                          <>
                            <CheckIcon />
                            <span>{feature}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#"
                    data-cal-link={tier.calLink}
                    className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                      tier.featured
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-700'
                        : 'border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    Book Your Strategy Call
                  </a>
                </div>
              );
            })}
      </div>
      )}

      {activeTab === 'smb' && (
        <p className="mt-8 text-center text-base text-[var(--text-secondary)]">
          60% of diners now use AI to find restaurants (Popmenu, 2024). At $47/visit and 4 visits/year, one new regular pays for your entire plan, every month.
        </p>
      )}

      {activeTab === 'agency' && (
        <p className="mt-8 text-center text-base text-[var(--text-secondary)]">
          Built for agencies serious about dominating AI search. Need white-label or multi-brand support? Check out our Enterprise plans.
        </p>
      )}
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';

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

export default function Pricing() {
  const [tab, setTab] = useState<'smb' | 'agency' | 'enterprise'>('smb');
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-20 md:py-28 px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400/80 mb-5 font-body">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] font-display mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-base md:text-lg text-[var(--text-primary)] font-normal max-w-2xl mx-auto leading-relaxed opacity-80 font-body">
            For businesses and agencies of all sizes. No hidden fees, no long-term contracts.
          </p>
        </div>

        {/* Tab toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] p-1 gap-1">
            <button
              type="button"
              onClick={() => setTab('smb')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                tab === 'smb' ? 'bg-white text-black' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              Small Business
            </button>
            <button
              type="button"
              onClick={() => setTab('agency')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                tab === 'agency' ? 'bg-white text-black' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              Agency
            </button>
            <button
              type="button"
              onClick={() => setTab('enterprise')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                tab === 'enterprise' ? 'bg-white text-black' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              Enterprise
            </button>
          </div>
        </div>

        {/* Monthly / Annual toggle */}
        <div className={`flex items-center justify-center gap-3 mb-10 ${tab === 'enterprise' ? 'hidden' : ''}`}>
          <span className={`text-sm ${!annual ? 'text-white' : 'text-white/50'}`}>Monthly</span>
          <button
            type="button"
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${annual ? 'bg-violet-600' : 'bg-white/20'}`}
            aria-label="Toggle annual pricing"
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-white/50'}`}>
            Annual <span className="text-violet-400 text-xs">(save 2 months)</span>
          </span>
        </div>

        {/* Cards */}
        {tab === 'enterprise' ? (
          <div key="enterprise" style={{ animation: 'aeo-fade-in 0.3s ease forwards' }}>
            <div className="rounded-2xl border border-violet-500/40 bg-violet-500/5 shadow-[0_0_40px_rgba(139,92,246,0.1)] p-5 sm:p-6">
            <div className="text-center mb-5">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
                Custom AI Visibility Solutions at Scale
              </h3>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
                For large agencies, multi-brand organizations, and enterprise teams that need tailored AEO infrastructure, white-label capabilities, and dedicated strategic support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {[
                { title: 'White-Label Reporting', desc: 'Present AI visibility reports and audits under your own brand. Your name, your logo, your deliverables.' },
                { title: 'Multi-Brand Management', desc: 'Manage AI visibility across multiple brands, divisions, or accounts from a single environment.' },
                { title: 'Dedicated Account Team', desc: 'A named account manager and strategist who understand your business and meet with you weekly.' },
                { title: 'Custom Audit Frequency', desc: 'Daily, weekly, or custom scan schedules tailored to your operational rhythm.' },
                { title: 'Custom Integrations', desc: 'API access, custom data exports, and workflow integrations built around how your team operates.' },
                { title: 'Volume-Based Pricing', desc: 'Pricing structured around your scale. No per-seat surprises, no hidden overages.' },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-white/10 bg-[rgba(15,15,15,0.85)] p-4 hover:border-violet-500/30 transition-colors duration-300">
                  <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1">{item.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="#"
                data-cal-link="rhemic-ai/rhemic-ai-enterprise-consultation"
                className="inline-block px-8 py-3 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-full shadow-lg shadow-violet-500/30 transition-all duration-200 hover:scale-105"
              >
                Book a Consultation
              </a>
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                Every Enterprise engagement starts with a 30-minute consultation to scope your needs. No obligations.
              </p>
            </div>
            </div>
          </div>
        ) : (
        <div key={tab} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(tab === 'smb' ? smbPlans : agencyTiers).map((plan) => {
            const displayPrice = annual ? plan.annualPrice : plan.monthlyPrice;
            const priceSuffix = annual ? '/year' : '/mo';
            const savings = plan.monthlyPrice * 12 - plan.annualPrice;

            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
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
                    <p className="mt-1 text-xs text-violet-400">Save ${savings.toLocaleString()}/year</p>
                  )}
                  <p className="mt-2 text-[11px] text-violet-400/80">
                    Founding member pricing. Locks in at signup.
                  </p>
                </div>

                <ul className="mt-6 space-y-3 flex-1">
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
          })}
        </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Save 20% with annual billing &middot; No long-term contracts &middot; Cancel anytime
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors duration-200"
          >
            See full pricing details
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

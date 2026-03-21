'use client';

import Link from 'next/link';
import { useState } from 'react';
import { smbPlans, agencyTiers, type PricingPlan } from '@/data/pricing';

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

function PlanCard({ plan, annual }: { plan: PricingPlan; annual: boolean }) {
  const displayPrice = annual ? plan.annualPrice : plan.monthlyPrice;
  const priceSuffix = annual ? '/year' : '/mo';
  const savings = plan.monthlyPrice * 12 - plan.annualPrice;

  return (
    <div
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
        href={plan.calLink ? '#' : '#ai-visibility-scan'}
        {...(plan.calLink ? { 'data-cal-link': plan.calLink } : {})}
        className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 ${
          plan.featured
            ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-700'
            : 'border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
      >
        {plan.calLink ? 'Get Started' : 'Start free scan'}
      </a>
    </div>
  );
}

export default function Pricing() {
  const [tab, setTab] = useState<'smb' | 'agency'>('smb');
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
          </div>
        </div>

        {/* Monthly / Annual toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
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
        <div key={tab} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(tab === 'smb' ? smbPlans : agencyTiers).map((plan) => (
            <PlanCard key={plan.name} plan={plan} annual={annual} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Save 2 months with annual billing &middot; No long-term contracts &middot; Cancel anytime
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

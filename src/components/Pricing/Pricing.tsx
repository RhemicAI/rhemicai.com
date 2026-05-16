'use client';

import Link from 'next/link';
import { useState } from 'react';
import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import { plans, type PricingPlan } from '@/data/pricing';

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0 text-white/60"
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
  const primaryButtonClass = `block w-full rounded-[5px] py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 ${
    plan.featured
      ? 'bg-white text-black shadow-lg shadow-white/10 hover:bg-gray-100'
      : 'border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
  }`;
  const secondaryButtonClass = `block w-full rounded-[5px] border py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 ${
    plan.featured
      ? 'border-white/20 bg-white/[0.03] text-white hover:bg-white/10'
      : 'border-white/10 text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
  }`;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 ${
        plan.featured
          ? 'border-white/25 bg-[var(--bg-elevated)] shadow-[0_0_40px_rgba(255,255,255,0.05)]'
          : 'border-white/10 bg-[var(--bg-elevated)]'
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block rounded-[5px] bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-black">
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
          <p className="mt-1 text-xs text-white/60">Save ${savings.toLocaleString()}/year</p>
        )}
        <p className="mt-2 text-[11px] text-white/50">
          Founding member pricing. Locks in at signup.
        </p>
      </div>

      <ul className="mt-6 space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            {feature.startsWith('Everything in') ? (
              <span className="w-full text-[var(--text-tertiary)] font-semibold">{feature}</span>
            ) : (
              <>
                <CheckIcon />
                <span>{feature}</span>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3">
        {annual && (
          <Link href="/contact" className={primaryButtonClass}>
            Contact for annual billing
          </Link>
        )}
        <CalBookingLink calLink={plan.calLink} className={secondaryButtonClass}>
          Book a Demo
        </CalBookingLink>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative px-6 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Pricing
          </p>
          <h2 className="mb-4 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-2xl font-body text-base font-normal leading-relaxed text-[var(--text-primary)] opacity-80 md:text-lg">
            For businesses of all sizes. No hidden fees, no long-term contracts.
          </p>
        </div>

        <div className="mb-10 flex items-center justify-center gap-3">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-white/50'}`}>Monthly</span>
          <button
            type="button"
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              annual ? 'bg-white' : 'bg-white/20'
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
            Annual <span className="text-xs text-white/60">(save 2 months)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} annual={annual} />
          ))}
        </div>

        {/* Enterprise row */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[rgba(15,15,15,0.85)] px-6 py-5 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Enterprise</p>
            <p className="mt-0.5 text-sm text-[var(--text-muted)]">
              White-label reporting, multi-brand management, custom integrations, and a dedicated success team.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-[5px] border border-white/20 px-6 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-white/40 hover:text-white"
          >
            Contact us
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="mb-4 text-xs text-[var(--text-muted)]">
            Save 2 months with annual billing &middot; No long-term contracts &middot; Cancel anytime
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
          >
            See full pricing details
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

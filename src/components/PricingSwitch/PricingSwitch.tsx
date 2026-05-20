'use client';

import Link from 'next/link';
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

function PlanCard({ plan }: { plan: PricingPlan }) {
  const primaryButtonClass = `mt-8 block w-full rounded-[5px] py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 ${
    plan.featured
      ? 'bg-white text-black shadow-lg shadow-white/10 hover:bg-gray-100'
      : 'border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
  }`;

  return (
    <div
      className={`relative rounded-2xl border p-6 sm:p-8 ${
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

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
        {plan.headline}
      </p>
      <h3 className="mt-2 text-lg font-bold text-[var(--text-primary)]">{plan.name}</h3>
      <p className="mt-1 text-sm text-[var(--text-muted)]">{plan.bestFor}</p>

      <div className="mt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[var(--text-primary)]">
            ${plan.monthlyPrice.toLocaleString()}
          </span>
          <span className="text-sm text-[var(--text-muted)]">/mo</span>
        </div>
        <p className="mt-2 text-[11px] text-white/50">
          No setup fees. Cancel any time.
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

      <div className="mt-8 flex flex-col gap-3">
        <Link href={`/signup?plan=${plan.tier}`} className={primaryButtonClass}>
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default function PricingSwitch() {
  return (
    <section className="mb-16 sm:mb-24">
      <p className="mb-10 text-center text-sm text-[var(--text-secondary)]">
        Founding offer: first 10 customers per tier get 25% off the first three months.
      </p>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>

      {/* Enterprise row */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[var(--bg-elevated)] px-6 py-5 sm:flex-row">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Enterprise</p>
          <p className="mt-0.5 text-sm text-[var(--text-muted)]">
            Multi-location med spas above 2 sites, custom integrations, dedicated account management, and white-label reporting.
          </p>
        </div>
        <CalBookingLink
          calLink="rhemic-ai/discovery-call"
          className="shrink-0 rounded-[5px] border border-white/20 px-6 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-white/40 hover:text-white"
        >
          Talk to us
        </CalBookingLink>
      </div>
    </section>
  );
}

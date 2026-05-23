'use client';

import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import { customPlan, plans, type PricingPlan } from '@/data/pricing';

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200/70"
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

function BoundaryIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-white/35"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M5 10h10" />
    </svg>
  );
}

function PlanCard({ plan }: { plan: PricingPlan }) {
  const ctaClass = `mt-8 block w-full rounded-[5px] py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 ${
    plan.featured
      ? 'bg-white text-black shadow-lg shadow-white/10 hover:bg-gray-100'
      : 'border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
  }`;

  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
        plan.featured
          ? 'border-cyan-200/40 bg-[var(--bg-elevated)] shadow-[0_0_44px_rgba(103,232,249,0.08)]'
          : 'border-white/10 bg-[var(--bg-elevated)]'
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block rounded-[5px] bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-black">
            Main recommendation
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{plan.name}</h3>
          <p className="mt-2 text-sm leading-[1.55] text-[var(--text-muted)]">{plan.primaryUseCase}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-[var(--text-primary)]">
            ${plan.monthlyPrice.toLocaleString()}
          </p>
          <p className="text-xs text-[var(--text-muted)]">/month</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Best fit</p>
        <p className="mt-2 text-sm leading-[1.6] text-[var(--text-secondary)]">{plan.bestFor}</p>
      </div>

      <div className="mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Plain-English promise</p>
        <p className="mt-2 text-sm leading-[1.6] text-[var(--text-primary)]">{plan.promise}</p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-[var(--text-primary)]">What they get</p>
        <ul className="mt-3 space-y-3">
          {plan.whatTheyGet.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-[1.5] text-[var(--text-secondary)]">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Not included / boundaries</p>
        <ul className="mt-3 space-y-3">
          {plan.boundaries.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-[1.5] text-[var(--text-tertiary)]">
              <BoundaryIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {plan.upgradePath ? (
        <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-[1.6] text-[var(--text-secondary)]">
          {plan.upgradePath}
        </p>
      ) : null}

      {plan.explanation ? (
        <p className="mt-6 rounded-xl border border-cyan-200/15 bg-cyan-200/[0.04] p-4 text-sm leading-[1.6] text-[var(--text-secondary)]">
          {plan.explanation}
        </p>
      ) : null}

      <CalBookingLink calLink={plan.calLink} className={ctaClass}>
        Book a 20-minute med-spa growth audit
      </CalBookingLink>
    </article>
  );
}

function CustomCard() {
  return (
    <article className="rounded-2xl border border-white/10 bg-[var(--bg-elevated)] p-6 sm:p-7 lg:col-span-3">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:items-start">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">{customPlan.name}</h3>
          <p className="mt-2 text-sm leading-[1.6] text-[var(--text-muted)]">{customPlan.primaryUseCase}</p>
          <p className="mt-5 text-3xl font-bold text-[var(--text-primary)]">{customPlan.monthlyPriceLabel}</p>
          <p className="text-xs text-[var(--text-muted)]">No package price quoted publicly</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Best fit</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {customPlan.bestFor.map((item) => (
              <div key={item} className="rounded-[5px] border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-[var(--text-secondary)]">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-[1.6] text-[var(--text-secondary)]">{customPlan.fixes}</p>
        </div>

        <div className="lg:text-right">
          <CalBookingLink
            calLink={customPlan.calLink}
            className="inline-flex w-full items-center justify-center rounded-[5px] border border-white/20 px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-white/40 hover:text-white lg:w-auto"
          >
            Book a custom med-spa growth audit
          </CalBookingLink>
        </div>
      </div>
    </article>
  );
}

export default function PricingSwitch() {
  return (
    <section className="mb-16 sm:mb-24">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
        <CustomCard />
      </div>
    </section>
  );
}

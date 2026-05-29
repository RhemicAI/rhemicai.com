'use client';

import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import { customPlan, plans, type PricingPlan } from '@/data/pricing';

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
  const buttonClass = `block w-full rounded-full border py-3 text-center text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
    plan.featured
      ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] shadow-lg shadow-[var(--pulse-soft)] hover:bg-[var(--pulse)]'
      : 'border-white/10 text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
  }`;

  return (
    <div
      className={`relative flex flex-col gap-6 rounded-2xl border p-6 sm:p-8 lg:grid lg:gap-0 lg:[grid-template-rows:subgrid] lg:row-span-6 ${
        plan.featured
          ? 'border-white/25 bg-[var(--bg-elevated)] shadow-[0_0_40px_rgba(255,255,255,0.05)]'
          : 'border-white/10 bg-[var(--bg-elevated)]'
      }`}
    >
      {plan.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block rounded-full bg-[var(--pulse-soft)] px-4 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--pulse-deep)]">
            Main recommendation
          </span>
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold text-[var(--text-primary)]">{plan.name}</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{plan.primaryUseCase}</p>
      </div>

      <div className="lg:mt-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-[var(--text-primary)]">
            ${plan.monthlyPrice.toLocaleString()}
          </span>
          <span className="text-sm text-[var(--text-muted)]">/mo</span>
        </div>
        <p className="mt-2 text-[11px] text-white/50">
          Starts with a visibility and call leak audit.
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 lg:mt-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Included locations</p>
          <p className="mt-1 text-sm text-[var(--text-primary)]">{plan.includedLocations}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Best use</p>
          <p className="mt-1 text-sm leading-[1.5] text-[var(--text-secondary)]">{plan.bestFor}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Meant to fix</p>
          <p className="mt-1 text-sm leading-[1.5] text-[var(--text-secondary)]">{plan.fixes}</p>
        </div>
      </div>

      <div className="lg:mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">Focus</p>
        <p className="mt-1 text-sm leading-[1.5] text-[var(--text-primary)]">{plan.promise}</p>
      </div>

      <ul className="space-y-3 lg:mt-6">
        {plan.whatTheyGet.slice(0, 5).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            {feature.startsWith('Everything in') ? (
              <span className="w-full font-semibold text-[var(--text-tertiary)]">{feature}</span>
            ) : (
              <>
                <CheckIcon />
                <span>{feature}</span>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="lg:mt-8 lg:self-end">
        <CalBookingLink calLink={plan.calLink} className={buttonClass}>
          Get a visibility + call leak audit
        </CalBookingLink>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-20 md:py-28">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
            Plans
          </p>
          <h2 className="mb-4 font-display text-3xl font-extrabold leading-[1.1] text-[var(--text-primary)] sm:text-4xl md:text-5xl">
            Plans for finding leaks and routing more intent.
          </h2>
          <p className="mx-auto max-w-2xl font-body text-base font-normal leading-relaxed text-[var(--text-primary)] opacity-80 md:text-lg">
            Rhemic helps med spas find lost consult opportunities and route more booking intent to the right team across search visibility, AI answers, calls, handoffs, and source context.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-[var(--bg-elevated)] px-6 py-6 sm:flex-row sm:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--text-primary)]">{customPlan.name}</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {customPlan.includedLocations} · {customPlan.primaryUseCase} {customPlan.fixes}
            </p>
          </div>
          <CalBookingLink
            calLink={customPlan.calLink}
            className="shrink-0 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--pulse)] hover:text-[var(--pulse-deep)]"
          >
            Get the audit
          </CalBookingLink>
        </div>
      </div>
    </section>
  );
}

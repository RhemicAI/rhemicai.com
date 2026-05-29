'use client';

import Link from 'next/link';
import { useState } from 'react';
import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import { smbPlans } from '@/data/pricing';

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

export default function SmbPricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="relative z-10 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
            Pricing
          </p>
          <h2 className="mb-6 font-display text-2xl font-bold text-[var(--text-primary)] sm:text-3xl md:text-4xl">
            Med spa pricing for finding leaks and routing intent.
          </h2>

          <div className="mb-2 flex items-center justify-center gap-3">
            <span className={`font-body text-sm ${!annual ? 'text-white' : 'text-white/50'}`}>Monthly</span>
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
            <span className={`font-body text-sm ${annual ? 'text-white' : 'text-white/50'}`}>
              Annual <span className="text-xs text-white/60">(save 2 months)</span>
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {smbPlans.map((plan) => {
            const displayPrice = annual ? plan.annualPrice : plan.monthlyPrice;
            const priceSuffix = annual ? '/year' : '/mo';
            const savings = plan.monthlyPrice * 12 - plan.annualPrice;
            const primaryButtonClass = `block w-full rounded-full py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 font-body ${
              plan.featured
                ? 'bg-[var(--ink)] text-[var(--bg)] shadow-lg shadow-[var(--pulse-soft)] hover:bg-[var(--pulse)]'
                : 'border border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`;
            const secondaryButtonClass = `block w-full rounded-full border py-3 text-center text-sm font-semibold transition-all duration-200 hover:scale-105 font-body ${
              plan.featured
                ? 'border-white/20 bg-white/[0.03] text-white hover:bg-white/10'
                : 'border-[var(--border-strong)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 sm:p-8 ${
                  plan.featured
                    ? 'border-white/25 bg-[var(--bg-elevated)] shadow-[0_0_40px_rgba(255,255,255,0.05)]'
                    : 'border-white/10 bg-[var(--bg-elevated)]'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--bg)]">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">{plan.name}</h3>
                <p className="mt-1 font-body text-sm text-[var(--text-muted)]">{plan.bestFor}</p>

                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-[var(--text-primary)]">
                      ${displayPrice.toLocaleString()}
                    </span>
                    <span className="font-body text-sm text-[var(--text-muted)]">{priceSuffix}</span>
                  </div>
                  {!annual && (
                    <p className="mt-1 font-body text-sm text-[var(--text-muted)] line-through">
                      Was ${plan.wasPrice}/mo
                    </p>
                  )}
                  {annual ? (
                    <p className="mt-1 font-body text-xs text-white/60">
                      Save ${savings.toLocaleString()}/year
                    </p>
                  ) : null}
                  <p className="mt-2 font-body text-[11px] text-white/50">
                    Founding member pricing. Locks in at signup. Price increases after first 100 customers.
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 font-body text-sm text-[var(--text-secondary)]"
                    >
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

                <div className="mt-8 flex flex-col gap-3">
                  {annual && (
                    <Link href="/contact" className={primaryButtonClass}>
                      Contact for annual billing
                    </Link>
                  )}
                  <CalBookingLink calLink={plan.calLink} className={secondaryButtonClass}>
                    Get the audit
                  </CalBookingLink>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center font-body text-base text-[var(--text-secondary)]">
          One missed job costs $5,000-$15,000. This costs less than one service call per month.
        </p>
      </div>
    </section>
  );
}

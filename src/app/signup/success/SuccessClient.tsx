'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { plans, type PricingTier } from '@/data/pricing';

function isTier(value: string | null): value is PricingTier {
  return value === 'starter' || value === 'growth' || value === 'scale';
}

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan');
  const tier: PricingTier = isTier(planParam) ? planParam : 'growth';
  const plan = plans.find((p) => p.tier === tier) ?? plans[1];
  const email = searchParams.get('email');
  const business = searchParams.get('business');

  return (
    <section className="relative z-10 pt-32 pb-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="inline-flex w-16 h-16 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] items-center justify-center mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--text-primary)]"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <p className="text-sm font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
          You&apos;re in
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
          Welcome to Rhemic, {business || 'partner'}.
        </h1>
        <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
          Your {plan.name} plan is active. Your dashboard is ready and the
          onboarding team will reach out within one business hour to schedule
          your AI receptionist setup call.
        </p>

        <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl p-6 text-left mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
            Receipt
          </p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-muted)]">Plan</dt>
              <dd className="text-[var(--text-primary)] font-semibold">
                {plan.name}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-muted)]">Charged</dt>
              <dd className="text-[var(--text-primary)] font-semibold">
                ${plan.monthlyPrice.toLocaleString()}/month
              </dd>
            </div>
            {business && (
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--text-muted)]">Med spa</dt>
                <dd className="text-[var(--text-primary)] font-semibold break-all">
                  {business}
                </dd>
              </div>
            )}
            {email && (
              <div className="flex justify-between gap-4">
                <dt className="text-[var(--text-muted)]">Email</dt>
                <dd className="text-[var(--text-primary)] font-semibold break-all">
                  {email}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-6 text-left mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
            What happens next
          </p>
          <ol className="space-y-3 text-sm text-[var(--text-secondary)] list-decimal list-inside leading-relaxed">
            <li>Receipt and dashboard credentials hit your inbox in under a minute.</li>
            <li>We run the first AEO scan and pull your GBP baseline.</li>
            <li>Onboarding call to configure the AI receptionist on Vapi.</li>
            <li>Optimizations ship within 7 days. First report in 30.</li>
          </ol>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://app.rhemicai.com"
            className="inline-block px-8 py-3 text-sm font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-[5px] hover:scale-[1.02] transition-transform"
          >
            Open dashboard
          </a>
          <Link
            href="/"
            className="inline-block px-8 py-3 text-sm font-semibold text-[var(--text-primary)] border border-[var(--border-default)] rounded-[5px] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            Back to home
          </Link>
        </div>

        <p className="text-[11px] text-[var(--text-muted)] italic mt-6">
          Placeholder confirmation. Dashboard URL is wired once auth ships.
        </p>
      </div>
    </section>
  );
}

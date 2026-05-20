'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { plans, type PricingPlan, type PricingTier } from '@/data/pricing';

function isTier(value: string | null): value is PricingTier {
  return value === 'starter' || value === 'growth' || value === 'scale';
}

type FormState = {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const initialForm: FormState = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export default function SignupClient() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan');
  const initialTier: PricingTier = isTier(planParam) ? planParam : 'growth';

  const [selectedTier, setSelectedTier] = useState<PricingTier>(initialTier);
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPlan = useMemo<PricingPlan>(
    () => plans.find((p) => p.tier === selectedTier) ?? plans[1],
    [selectedTier]
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): string | null => {
    if (!form.businessName.trim()) return 'Med spa name is required.';
    if (!form.contactName.trim()) return 'Your name is required.';
    if (!form.email.includes('@')) return 'A valid work email is required.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    if (!form.acceptTerms) return 'You must accept the terms to continue.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          account: {
            businessName: form.businessName,
            contactName: form.contactName,
            email: form.email,
            phone: form.phone,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.redirectUrl) {
        throw new Error(data.error || 'Could not create your account. Try again.');
      }

      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 pt-32 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
            Sign up
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Get your med spa on AI in days, not months.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Create your account, pay your first month, and get instant access to your
            Rhemic dashboard. No setup fees, cancel any time.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-6 sm:p-10 space-y-10"
          >
            <fieldset>
              <legend className="block text-sm font-semibold text-[var(--text-primary)] mb-4">
                1. Choose your plan
              </legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {plans.map((plan) => {
                  const isSelected = plan.tier === selectedTier;
                  return (
                    <button
                      key={plan.tier}
                      type="button"
                      onClick={() => setSelectedTier(plan.tier)}
                      aria-pressed={isSelected}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[var(--btn-primary-bg)] bg-[var(--bg-elevated)] ring-2 ring-[var(--btn-primary-bg)]/40'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-glass)] hover:border-[var(--border-default)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[var(--text-primary)]">
                          {plan.name}
                        </span>
                        {plan.featured && (
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-[var(--text-primary)]">
                        ${plan.monthlyPrice.toLocaleString()}
                        <span className="text-sm font-normal text-[var(--text-muted)]">
                          /mo
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-2 leading-snug">
                        {plan.headline}
                      </p>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="block text-sm font-semibold text-[var(--text-primary)] mb-4">
                2. Your med spa
              </legend>
              <Field
                label="Med spa name"
                id="businessName"
                value={form.businessName}
                onChange={(v) => update('businessName', v)}
                placeholder="Acme Aesthetics"
                autoComplete="organization"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Your name"
                  id="contactName"
                  value={form.contactName}
                  onChange={(v) => update('contactName', v)}
                  placeholder="Jane Doe"
                  autoComplete="name"
                />
                <Field
                  label="Phone"
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update('phone', v)}
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                  required={false}
                />
              </div>
              <Field
                label="Work email"
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => update('email', v)}
                placeholder="you@yourmedspa.com"
                autoComplete="email"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Password"
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(v) => update('password', v)}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                />
                <Field
                  label="Confirm password"
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(v) => update('confirmPassword', v)}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                />
              </div>
            </fieldset>

            <label className="flex items-start gap-3 text-sm text-[var(--text-secondary)] cursor-pointer">
              <input
                type="checkbox"
                checked={form.acceptTerms}
                onChange={(e) => update('acceptTerms', e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[var(--border-default)] bg-[var(--bg-elevated)]"
              />
              <span>
                I agree to the{' '}
                <Link
                  href="/terms-of-service"
                  className="text-[var(--text-primary)] underline underline-offset-2"
                >
                  terms of service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy-policy"
                  className="text-[var(--text-primary)] underline underline-offset-2"
                >
                  privacy policy
                </Link>
                . Billing is handled by Stripe. I authorize Rhemic AI to bill
                ${selectedPlan.monthlyPrice.toLocaleString()}/month for {selectedPlan.name}
                {' '}until cancelled.
              </span>
            </label>

            {error && (
              <div
                role="alert"
                className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 text-base font-semibold rounded-[5px] transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] hover:scale-[1.02]'
              }`}
            >
              {isSubmitting
                ? 'Creating your account...'
                : `Continue to secure checkout, $${selectedPlan.monthlyPrice.toLocaleString()}/mo`}
            </button>

            <p className="text-xs text-[var(--text-muted)] text-center">
              You&apos;ll be redirected to Stripe to complete payment. Dashboard access is granted the moment Stripe confirms your subscription.
            </p>
          </form>

          <aside className="lg:col-span-2">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-6 sm:p-8 sticky top-32">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
                Order summary
              </p>
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--text-tertiary)] mb-2">
                {selectedPlan.headline}
              </p>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                {selectedPlan.name}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-6 leading-snug">
                {selectedPlan.bestFor}
              </p>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-[var(--text-primary)]">
                  ${selectedPlan.monthlyPrice.toLocaleString()}
                </span>
                <span className="text-sm text-[var(--text-muted)]">/month</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-6">
                Billed monthly via Stripe. No setup fees. Cancel any time from your dashboard.
              </p>

              <div className="h-px bg-[var(--border-subtle)] my-6" />

              <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-3">
                What&apos;s included
              </p>
              <ul className="space-y-3">
                {selectedPlan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-[var(--text-tertiary)]"
                      />
                      <path
                        d="M6 10L9 13L14 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--text-primary)]"
                      />
                    </svg>
                    <span className="text-[var(--text-secondary)] leading-snug">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="h-px bg-[var(--border-subtle)] my-6" />

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Running more than 2 locations or need a custom contract?{' '}
                <Link
                  href="/contact"
                  className="text-[var(--text-primary)] underline underline-offset-2 hover:opacity-80"
                >
                  Talk to a founder
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: 'text' | 'numeric' | 'email' | 'tel' | 'search' | 'url';
  autoComplete?: string;
  required?: boolean;
};

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  inputMode,
  autoComplete,
  required = true,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-[var(--text-primary)] mb-2"
      >
        {label}
        {required && <span className="text-[var(--text-muted)]"> *</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all"
      />
    </div>
  );
}

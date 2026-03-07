import Link from 'next/link';

const tiers = [
  {
    name: 'Starter',
    originalPrice: 899,
    price: 599,
    description: 'For small businesses getting their first foothold in AI search.',
    popular: false,
    calLink: 'rhemic-ai/starter-plan-onboarding',
    features: [
      'AI Visibility Audit (monthly)',
      '1 competitor tracked across 4 AI platforms',
      'Schema markup + JSON-LD generation',
      '1 topic cluster optimized',
      'Monthly AEO score report',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    originalPrice: 1199,
    price: 999,
    description: 'For growing brands that want to dominate their category in AI search.',
    popular: true,
    calLink: 'rhemic-ai/growth-plan-onboarding',
    features: [
      'Everything in Starter, plus:',
      'AI Visibility Audit (bi-weekly)',
      '5 competitors tracked',
      '3 topic clusters optimized',
      'Competitor gap analysis report',
      'Priority email + Slack support',
      'Monthly 30-min strategy call',
    ],
  },
  {
    name: 'Scale',
    originalPrice: 1999,
    price: 1499,
    description: 'For agencies and multi-location brands managing visibility at scale.',
    popular: false,
    calLink: 'rhemic-ai/scale-plan-onboarding',
    features: [
      'Everything in Growth, plus:',
      'AI Visibility Audit (weekly)',
      'Unlimited competitors tracked',
      'Unlimited topic clusters',
      'Dedicated account manager',
      'White-label reporting for agencies',
      'Early access to new features',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28 px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400/80 mb-5 font-body">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] font-display mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-base md:text-lg text-[var(--text-primary)] font-normal max-w-xl mx-auto leading-relaxed opacity-80 font-body">
            For agencies and businesses of all sizes. No hidden fees, no long-term contracts.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-xs font-semibold text-amber-400 tracking-wide">Limited Time Offer — save up to 25%</span>
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col bg-[var(--bg-glass)] rounded-2xl p-8 border ${
                tier.popular
                  ? 'border-violet-500/50 ring-1 ring-violet-500/20'
                  : 'border-[var(--border-default)]'
              }`}
            >
              {/* Limited Time badge */}
              <div className="mb-4 flex items-center gap-2 flex-wrap">
                {tier.popular && (
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1">
                    Most Popular
                  </span>
                )}
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
                  Limited Time Offer
                </span>
              </div>

              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 font-display">
                {tier.name}
              </h3>

              {/* Pricing with strikethrough */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-[var(--text-primary)] font-display">
                  ${tier.price.toLocaleString()}
                </span>
                <span className="text-base text-[var(--text-secondary)]">/mo</span>
              </div>
              <div className="mb-4">
                <span className="text-sm text-[var(--text-muted)] line-through">
                  ${tier.originalPrice.toLocaleString()}/mo
                </span>
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-body">
                {tier.description}
              </p>

              <a
                href="#"
                data-cal-link={tier.calLink}
                className={`block w-full text-center px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 mb-8 ${
                  tier.popular
                    ? 'text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] hover:scale-105'
                    : 'text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-default)] hover:bg-[var(--bg-glass-hover)]'
                }`}
              >
                Get Started
              </a>

              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.startsWith('Everything in') ? (
                      <span className="w-5 shrink-0" />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-tertiary)]" />
                        <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)]" />
                      </svg>
                    )}
                    <span
                      className={`text-sm leading-relaxed font-body ${
                        feature.startsWith('Everything in')
                          ? 'text-[var(--text-tertiary)] font-semibold'
                          : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* See full pricing link */}
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

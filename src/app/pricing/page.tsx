import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';

export const metadata: Metadata = {
  title: 'Pricing - Simple, Transparent AI Visibility Plans',
  description:
    'Three clear AI visibility pricing plans for agencies and businesses. Starter from $599/mo, Growth $999/mo, Scale $1,499/mo. No hidden fees, no long-term contracts.',
  alternates: { canonical: 'https://rhemicai.com/pricing' },
  openGraph: {
    title: 'Pricing - Simple, Transparent AI Visibility Plans',
    description:
      'Three clear AI visibility pricing plans for agencies. Starter $599/mo, Growth $999/mo, Scale $1,499/mo. Limited time offer.',
    url: 'https://rhemicai.com/pricing',
  },
};

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
      '1 competitor tracked across ChatGPT, Claude, Gemini, Perplexity',
      'Schema markup + JSON-LD generation (up to 10 pages)',
      '1 topic cluster optimized',
      'Monthly AEO score report',
      'Email support (48hr response)',
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
      'Schema markup + JSON-LD generation (unlimited pages)',
      '3 topic clusters optimized',
      'Bi-weekly AEO score report + recommendations',
      'Priority email + Slack support',
      'Monthly 30-min strategy call',
      'Competitor gap analysis report',
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
      'Weekly AEO score report',
      'Dedicated account manager',
      'Weekly 30-min strategy call',
      'White-label reporting (for agencies)',
      'Early access to new Rhemic AI features',
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <FixedNav />

      <PageHero
        subtitle="Pricing"
        title="Simple, transparent pricing."
        description="Three plans built for every stage of growth. No hidden fees, no long-term contracts."
        showBackLink={false}
      />

      <div className="relative z-10 pb-12 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          {/* Pricing Tiers */}
          <section className="mb-16 sm:mb-24">
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

                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                      {tier.name}
                    </h3>

                    <div className="flex items-baseline gap-1 mb-1">
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

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
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
                            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)] pt-0.5 w-5 shrink-0" />
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              className="shrink-0 mt-0.5"
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
                          )}
                          <span
                            className={`text-sm leading-relaxed ${
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
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-[var(--text-muted)] mt-6">
              Save 20% with annual billing &middot; Contact us for annual pricing
            </p>
          </section>

          {/* CTA Section */}
          <section className="text-center py-10 sm:py-16 px-4 sm:px-6 bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl sm:rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Book a 30-minute discovery call and we&apos;ll walk you through what Rhemic AI can do for your brand.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#" data-cal-link="rhemic-ai/discovery-call"
                className="px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
              >
                Book a Demo
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-full hover:bg-[var(--bg-glass-hover)] transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-6">
              No hidden fees · No long-term contracts
            </p>
          </section>

          {/* FAQ */}
          <SubpageFAQ
            heading="Pricing FAQ"
            faqs={[
              {
                question: 'How much does Rhemic AI cost?',
                answer:
                  'Three founding member plans: Starter at $599/mo (regular $899), Growth at $999/mo (regular $1,199), and Scale at $1,499/mo (regular $1,999). Month-to-month, no contracts. Save 20% with annual billing — contact us for details.',
              },
              {
                question: 'Is there a free trial?',
                answer:
                  'Yes. We offer a personalized free trial that includes a website audit, competitor benchmarking, and an AEO score baseline. Book a 30-minute discovery call to get started.',
              },
              {
                question: 'Do I need a long-term contract?',
                answer:
                  'No. All plans are month-to-month with no long-term contracts required. You can upgrade, downgrade, or cancel at any time.',
              },
              {
                question: 'What is included in every plan?',
                answer:
                  'Every plan includes AI visibility audits, competitor tracking, schema markup + JSON-LD generation, AEO score reporting, and topic cluster optimization. Higher-tier plans increase the frequency, scope, and level of support included.',
              },
            ]}
          />
        </div>
      </div>

      <RelatedLinks
        heading="Explore more"
        links={[
          {
            title: 'Our Products',
            description: 'Website auditing, competitor analysis, and code generation tools.',
            href: '/products',
          },
          {
            title: 'Start Free Trial',
            description: 'Get a personalized trial with a custom website audit and AEO score.',
            href: '/start-free-trial',
          },
          {
            title: 'About Rhemic AI',
            description: 'Meet the team building AI Engine Optimization infrastructure.',
            href: '/about',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

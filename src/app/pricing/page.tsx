import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PricingSwitch from '@/components/PricingSwitch/PricingSwitch';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { plans } from '@/data/pricing';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';
import SubpageFAQ from '@/components/shared/SubpageFAQ';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing for AI Visibility Audits, Tracking, and AEO Implementation',
  description:
    'Transparent Rhemic AI pricing for businesses and agencies, including audit coverage, competitor tracking, implementation support, and what each plan is built for.',
  path: '/pricing',
  keywords: ['Rhemic AI pricing', 'AI visibility pricing', 'AEO pricing', 'AI audit pricing'],
});

const starterPlan = plans.find((p) => p.tier === 'starter')!;
const growthPlan = plans.find((p) => p.tier === 'growth')!;
const scalePlan = plans.find((p) => p.tier === 'scale')!;

const pricingFaqs = [
  {
    question: 'How much does Rhemic AI cost for small businesses?',
    answer: `SMB plans: ${starterPlan.name} at $${starterPlan.monthlyPrice}/mo, ${growthPlan.name} at $${growthPlan.monthlyPrice}/mo, ${scalePlan.name} at $${scalePlan.monthlyPrice}/mo. These are founding member rates — the price locks in when you sign up. No contracts on any plan. Cancel any time. Save 2 months with annual billing.`,
  },
  {
    question: 'What is agency or partner pricing?',
    answer: 'Agencies delivering AI visibility services to multiple clients work on partner pricing — contact Rhemic via the Book Partner Demo to discuss. Agency pricing is not listed publicly and is negotiated based on client volume and delivery model.',
  },
  {
    question: 'Can I talk to someone before I subscribe?',
    answer: 'Yes. You can book a demo if you want help choosing a plan, understanding the setup, or talking through your use case before you start online.',
  },
  {
    question: 'Do I need a long-term contract?',
    answer: 'No. All SMB plans are month-to-month with no long-term contracts required. You can upgrade, downgrade, or cancel at any time.',
  },
  {
    question: 'What is included in every SMB plan?',
    answer: `Every plan includes AI visibility audits across ChatGPT, Claude, Gemini, and Perplexity, a competitor gap report, and prioritized fix recommendations. ${growthPlan.name} adds monthly re-scans, a progress dashboard, and priority support. ${scalePlan.name} adds weekly audits, unlimited competitors and topics, a free professional website build, and a dedicated account manager.`,
  },
];

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Rhemic AI Platform',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web-based',
  url: 'https://rhemicai.com/pricing',
  provider: {
    '@type': 'Organization',
    name: 'Rhemic AI',
  },
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: String(Math.min(...plans.map((plan) => plan.monthlyPrice))),
    highPrice: String(Math.max(...plans.map((plan) => plan.monthlyPrice))),
    priceCurrency: 'USD',
    offerCount: String(plans.length),
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="pricing-page-schemas"
        service={{
          name: 'Rhemic AI Pricing and Service Plans',
          description:
            'Pricing for AI visibility audits, competitor tracking, schema implementation, and answer engine optimization support.',
          path: '/pricing',
          audience: 'Businesses and agencies evaluating AI Engine Optimization software',
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingSchema),
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Pricing"
        title="Simple, transparent pricing."
        description="Start by seeing where you stand. Scale up as you start winning. No hidden fees, no long-term contracts."
        showBackLink={false}
      />

      <div className="relative z-10 pb-12 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <PricingSwitch />

          <section className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] px-4 py-10 text-center sm:rounded-3xl sm:px-6 sm:py-16">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[var(--text-secondary)]">
              Start online with the plan that fits today, or book a discovery call if you want help choosing the right setup.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                data-cal-link="rhemic-ai/discovery-call"
                className="rounded-[5px] bg-[var(--btn-primary-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                Book a Demo
              </a>
              <Link
                href="/contact"
                className="rounded-[5px] border border-[var(--border-default)] bg-[var(--bg-glass)] px-8 py-4 text-base font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                Contact Us
              </Link>
            </div>
            <p className="mt-6 text-xs text-[var(--text-muted)]">
              No hidden fees · No long-term contracts
            </p>
          </section>

          {/* Agency section */}
          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">For Agencies</p>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">Agency and partner pricing</h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Agencies delivering AI visibility services to multiple clients work on partner pricing.
              The economics are different from SMB plans. Book a partner demo to discuss multi-client
              delivery, reporting, and pricing.
            </p>
            <a
              href="#"
              data-cal-link="rhemic-ai/discovery-call"
              className="inline-flex items-center justify-center rounded-[5px] bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
            >
              Book Partner Demo
            </a>
          </section>

          <SubpageFAQ
            heading="Pricing FAQ"
            faqs={pricingFaqs}
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
            title: 'Book a Demo',
            description: 'See the platform with us and get help choosing the right setup.',
            href: '/contact',
          },
          {
            title: 'FAQ',
            description: 'Answer the buyer questions that usually come up before choosing a plan.',
            href: '/faq',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

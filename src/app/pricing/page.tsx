import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PricingSwitch from '@/components/PricingSwitch/PricingSwitch';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { agencyTiers, smbPlans } from '@/data/pricing';
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

const allPlans = [...smbPlans, ...agencyTiers];
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
    lowPrice: String(Math.min(...allPlans.map((plan) => plan.monthlyPrice))),
    highPrice: String(Math.max(...allPlans.map((plan) => plan.monthlyPrice))),
    priceCurrency: 'USD',
    offerCount: String(allPlans.length),
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
                className="rounded-full bg-[var(--btn-primary-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                Book a Demo
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-8 py-4 text-base font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                Contact Us
              </Link>
            </div>
            <p className="mt-6 text-xs text-[var(--text-muted)]">
              No hidden fees · No long-term contracts
            </p>
          </section>

          <SubpageFAQ
            heading="Pricing FAQ"
            faqs={[
              {
                question: 'How much does Rhemic AI cost?',
                answer:
                  'We have three pricing tracks. For small businesses: Starter at $199/mo, Growth at $299/mo, and Scale at $499/mo. For agencies: Starter at $599/mo, Growth at $999/mo, and Scale at $1,499/mo. For enterprise organizations that need white-label reporting, multi-brand management, or custom integrations, we offer tailored pricing. Book a consultation to discuss your needs. All SMB and Agency plans are founding member rates with no contracts. Cancel any time. Save 2 months with annual billing.',
              },
              {
                question: 'Can I talk to someone before I subscribe?',
                answer:
                  'Yes. You can book a demo if you want help choosing a plan, understanding the setup, or talking through your use case before you start online.',
              },
              {
                question: 'Do I need a long-term contract?',
                answer:
                  'No. All plans are month-to-month with no long-term contracts required. You can upgrade, downgrade, or cancel at any time.',
              },
              {
                question: 'What is included in every plan?',
                answer:
                  'Every plan includes AI visibility audits across ChatGPT, Claude, Gemini, and Perplexity, competitor tracking, schema markup and JSON-LD generation, AEO score reporting, and topic cluster optimization. Higher-tier plans increase the frequency of audits, the number of competitors tracked, the breadth of topic coverage, and the level of dedicated support you receive.',
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

import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PricingSwitch from '@/components/PricingSwitch/PricingSwitch';

export const metadata: Metadata = {
  title: 'Pricing - Simple, Transparent AI Visibility Plans',
  description:
    'AI visibility pricing for small businesses ($199/mo) and agencies ($599/mo). No hidden fees, no long-term contracts.',
  alternates: { canonical: 'https://rhemicai.com/pricing' },
  openGraph: {
    title: 'Pricing - Simple, Transparent AI Visibility Plans',
    description:
      'AI visibility pricing for small businesses ($199/mo) and agencies ($599/mo). Limited time founding member rates.',
    url: 'https://rhemicai.com/pricing',
  },
};

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
    lowPrice: '199',
    highPrice: '1499',
    priceCurrency: 'USD',
    offerCount: '6',
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
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

          {/* Pricing Tiers */}
          <PricingSwitch />

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
                  'We have three pricing tracks. For small businesses: Starter at $199/mo, Growth at $299/mo, and Scale at $499/mo. For agencies: Starter at $599/mo, Growth at $999/mo, and Scale at $1,499/mo. For enterprise organizations that need white-label reporting, multi-brand management, or custom integrations, we offer tailored pricing. Book a consultation to discuss your needs. All SMB and Agency plans are founding member rates with no contracts. Cancel any time. Save 2 months with annual billing.',
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

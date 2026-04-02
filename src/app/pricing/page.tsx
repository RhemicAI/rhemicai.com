import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PricingSwitch from '@/components/PricingSwitch/PricingSwitch';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing for AI Visibility Audits, Tracking, and AEO Implementation',
  description:
    'Transparent Rhemic AI pricing for businesses and agencies, including audit coverage, competitor tracking, implementation support, and what each plan is built for.',
  path: '/pricing',
  keywords: ['Rhemic AI pricing', 'AI visibility pricing', 'AEO pricing', 'AI audit pricing'],
});

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
      <FixedNav />

      <PageHero
        subtitle="Pricing"
        title="Simple, transparent pricing."
        description="Start by seeing where you stand. Scale up as you start winning. No hidden fees, no long-term contracts."
        showBackLink={false}
      />

      <div className="relative z-10 pb-12 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              Definition
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Rhemic pricing is structured around one question: how much AI visibility support does your team need, from baseline audits to recurring tracking and implementation guidance.
            </p>
          </section>

          {/* Pricing Tiers */}
          <PricingSwitch />

          <section className="my-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Starter</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Best for teams that need a baseline, a clean answer to where they are losing visibility, and a manageable implementation queue.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Growth</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Built for operators who need recurring audits, broader coverage, and faster iteration after each round of changes ships.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Scale</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                A fit for organizations or agencies that need more brands, more monitoring cadence, and a tighter operating rhythm across multiple stakeholders.
              </p>
            </div>
          </section>

          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">What you are actually paying for</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The value is not a dashboard alone. It is the combination of visibility measurement, competitive benchmarking, recommendations, and the implementation momentum that comes from having a clear queue instead of vague AI anxiety.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                That is also the ROI framing. The cost is the price of getting operational clarity. The cost of doing nothing is letting competitors become the default names AI keeps recommending in your category.
              </p>
            </div>
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

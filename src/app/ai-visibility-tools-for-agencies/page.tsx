import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'AI Visibility Tools for Agencies',
  description:
    'The best AI visibility tools for marketing and SEO agencies that want to productize AI search visibility as a client-facing service.',
  path: '/ai-visibility-tools-for-agencies',
  keywords: ['AI visibility tools for agencies', 'agency AEO tools', 'AI search visibility for marketing agencies'],
  noindex: true,
});

const faqs = [
  {
    question: 'What should an agency look for in an AI visibility tool?',
    answer: 'Agencies need client-ready reporting, competitive benchmarking, multi-client management, recurring scan capabilities, and implementation-ready outputs. A tool that only produces a score without a fix plan is harder to sell as a recurring service.',
  },
  {
    question: 'Can Rhemic AI be used for agency client delivery?',
    answer: 'Yes. Rhemic AI has an agency/partner model. Contact Rhemic via the partner demo booking for details on multi-client delivery, partner pricing, and reporting customization.',
  },
];

export default function AiVisibilityToolsForAgenciesPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="agency-ai-tools-schemas"
        service={{
          name: 'AI visibility tools for agencies',
          description: 'A guide to AI visibility tools suited for agency client delivery and productized AEO services.',
          path: '/ai-visibility-tools-for-agencies',
          audience: 'Marketing agencies, SEO agencies, and digital agencies',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="AI Visibility Tools for Agencies"
        title="AI visibility tools built for agency delivery"
        description="For agencies that want to productize AI search visibility as a repeatable client service. This page is published by Rhemic AI. Verify competitor information at their sites."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <section className="mb-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">Transparency</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Published by Rhemic AI. Competitor data may be out of date. Verify at each vendor&apos;s site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">What agencies need from AI visibility tooling</h2>
            <div className="space-y-3">
              {[
                ['Client-ready reporting', 'Outputs agencies can present to clients without extensive reformatting.'],
                ['Competitive benchmarking', 'Show clients where they stand vs. competitors in AI answers — not just a score in isolation.'],
                ['Recurring scan capability', 'Visibility movement over time is the proof of work. Agencies need re-scan workflows.'],
                ['Implementation outputs', 'Schema code, content briefs, and prioritized fix lists — not just diagnostic scores.'],
                ['Partner/multi-client pricing', 'Economics that work for agency delivery models.'],
              ].map(([label, detail]) => (
                <div key={label} className="flex gap-3 text-sm">
                  <span className="text-[var(--text-tertiary)] mt-0.5 shrink-0">+</span>
                  <div>
                    <span className="font-semibold text-[var(--text-primary)]">{label}: </span>
                    <span className="text-[var(--text-secondary)]">{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">Rhemic AI for agencies</h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Rhemic AI has an agency/partner model with dedicated partner pricing and delivery support.
              If you are an agency running AEO services for clients, book a partner demo to discuss the
              delivery model.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/for-agencies"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                Agency overview
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                See pricing
              </Link>
            </div>
          </section>
        </div>

        <SubpageFAQ heading="Agency AI visibility tools FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'For Agencies', description: 'Rhemic AI\'s full agency delivery model.', href: '/for-agencies' },
          { title: 'How Agencies Can Sell AI Visibility', description: 'The delivery model and service structure.', href: '/answers/how-marketing-agencies-can-sell-ai-visibility' },
          { title: 'Best AI Visibility Tools', description: 'The broader category.', href: '/best-ai-visibility-tools' },
        ]}
      />

      <Footer />
    </main>
  );
}

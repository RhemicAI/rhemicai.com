import type { Metadata } from 'next';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import ComparisonTable from '@/components/shared/ComparisonTable';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rhemic AI vs Traditional SEO Agency: What Is the Difference?',
  description:
    'How Rhemic AI compares to hiring a traditional SEO agency when your goal is AI search visibility — not just Google rankings.',
  path: '/compare/rhemic-ai-vs-traditional-seo-agency',
  keywords: ['Rhemic vs SEO agency', 'AI visibility vs SEO agency', 'AEO vs traditional SEO'],
});

const faqs = [
  {
    question: 'Can a traditional SEO agency do AEO?',
    answer: 'Some can, but most traditional SEO agencies are optimized for Google rankings — keyword research, link building, technical crawl audits. AEO requires different tooling, different content approaches, and different measurement systems. Some agencies are adding AEO capabilities; most have not yet.',
  },
  {
    question: 'Should I use Rhemic instead of an SEO agency?',
    answer: 'Rhemic is complementary to an SEO agency in most cases. An SEO agency handles broader web presence. Rhemic handles the AI visibility layer specifically. If your SEO agency does not cover AI visibility, Rhemic fills that gap.',
  },
  {
    question: 'Is AEO replacing SEO?',
    answer: 'No. Traditional SEO remains important for Google traffic. AEO adds the layer needed for AI answer engine visibility. The businesses winning in 2026 are doing both.',
  },
];

export default function RhemicVsTraditionalSeoAgencyPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="rhemic-vs-seo-agency-schemas"
        service={{
          name: 'Rhemic AI vs traditional SEO agency',
          description: 'A comparison for buyers deciding between AI visibility tooling and traditional SEO agency services.',
          path: '/compare/rhemic-ai-vs-traditional-seo-agency',
          audience: 'Businesses evaluating SEO and AI visibility investment',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Compare"
        title="Rhemic AI vs traditional SEO agency"
        description="For teams deciding whether AI visibility requires a new tool, a new agency, or both. This comparison looks at the two approaches side by side."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">What each approach does</h2>
            <ComparisonTable
              headers={['Capability', 'Rhemic AI', 'Traditional SEO Agency']}
              rows={[
                { label: 'Measures AI answer visibility', values: ['Yes — core product', 'Rarely — few have AI visibility tooling'] },
                { label: 'Tracks competitor AI mentions', values: ['Yes', 'Rarely'] },
                { label: 'Google SEO optimization', values: ['Yes — schema, structure, content signals', 'Yes — core service'] },
                { label: 'Schema markup implementation', values: ['Yes — includes implementation guidance', 'Often — depends on agency'] },
                { label: 'Backlink building', values: ['No', 'Yes'] },
                { label: 'Content production', values: ['Recommendations + guidance', 'Often included in retainer'] },
                { label: 'AI-specific prompt audits', values: ['Yes', 'Rarely'] },
                { label: 'Monthly pricing', values: ['From $199/mo', 'Typically $1,500+/mo for full service'] },
              ]}
            />
          </section>

          <section className="mb-16 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Choose Rhemic AI if</h2>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                <li>You need to specifically measure and improve AI answer visibility</li>
                <li>Your SEO agency is not covering the AI recommendation layer</li>
                <li>You want a lower-cost diagnostic and fix workflow before investing in full agency retainers</li>
                <li>You are an agency that needs AI visibility tooling for client delivery</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Choose an SEO agency if</h2>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                <li>You need full-service content strategy, production, and link building</li>
                <li>You want a managed service that does the work, not just recommendations</li>
                <li>Your Google traffic issues are the primary problem</li>
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">The honest answer: most businesses need both</h2>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              Google traffic and AI answer visibility are complementary. A traditional SEO agency can
              handle your search presence. Rhemic handles the AI recommendation layer. If you can only
              invest in one right now, the question is: where are your buyers starting their search?
            </p>
          </section>
        </div>

        <SubpageFAQ heading="AEO vs SEO FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'Answer Engine Optimization', description: 'The full AEO discipline explained.', href: '/answer-engine-optimization' },
          { title: 'For Agencies', description: 'How agencies can use Rhemic in their delivery.', href: '/for-agencies' },
          { title: 'Pricing', description: 'Rhemic AI plan details.', href: '/pricing' },
        ]}
      />

      <Footer />
    </main>
  );
}

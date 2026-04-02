import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Case Studies: Improving AI Visibility with Rhemic AI',
  description:
    'A truthful case study hub starting with Rhemic AI’s own dogfooding work on rhemicai.com, including baseline metrics and the implementation plan now being shipped.',
  path: '/case-studies',
  keywords: ['AI visibility case study', 'AEO case study', 'Rhemic AI case studies'],
});

const baselineMetrics = [
  { label: 'Visibility Score', value: '22', note: 'Critical: nearly invisible to AI' },
  { label: 'Topic Coverage', value: '33', note: 'Poor: missing key commercial topics' },
  { label: 'Mention Consistency', value: '25', note: 'Only one major engine mentioned the brand' },
  { label: 'Competitive Share', value: '5', note: 'Competitors dominated the answer landscape' },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="case-studies-schemas"
        service={{
          name: 'Rhemic AI case studies',
          description:
            'Case studies that document how AI visibility is measured and improved, beginning with Rhemic AI’s own site.',
          path: '/case-studies',
          audience: 'Buyers looking for proof and implementation detail',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Case Studies"
        title="Proof starts with dogfooding."
        description="Until external customer case studies are published, the most honest place to start is Rhemic’s own site, baseline, and implementation work."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-10 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">Case study 01: rhemicai.com</h2>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              On March 31, 2026, Rhemic scanned its own site and found a visibility score of 22, weak topic coverage, zero dedicated FAQ coverage, and no detectable schema footprint in the scan summary. The work in this sprint is the direct response: build the missing pages, deepen the weak money pages, add structured data, and improve the site’s AI legibility end to end.
            </p>
          </section>

          <section className="mb-10 grid gap-6 md:grid-cols-2">
            {baselineMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  {metric.label}
                </p>
                <p className="mb-2 text-4xl font-bold text-[var(--text-primary)]">{metric.value}</p>
                <p className="text-[var(--text-secondary)]">{metric.note}</p>
              </div>
            ))}
          </section>

          <section className="mb-10 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">What changed in response</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The site is adding the exact page types the scan identified as missing: FAQ, how-it-works, comparison pages, glossary definitions, case-study content, and intent-specific landing pages for agencies and local businesses.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The sprint also adds structured data, broader sitemap coverage, stronger internal linking, deeper pricing and product context, and a blog cluster aligned to the highest-priority answer-engine queries.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">What comes next</h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--text-secondary)]">
              The next honest milestone is not a vanity claim. It is a re-scan that shows whether visibility score, mention consistency, and competitive share moved after the implementation shipped.
            </p>
            <Link
              href="/free-ai-visibility-check"
              className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
            >
              Run the same style of visibility check
            </Link>
          </section>
        </div>
      </div>

      <RelatedLinks
        heading="Related proof and planning"
        links={[
          {
            title: 'How It Works',
            description: 'See the workflow behind the metrics and implementation steps in the case study.',
            href: '/how-it-works',
          },
          {
            title: 'Compare Rhemic',
            description: 'Use the comparison pages to understand where Rhemic fits in a broader SEO software stack.',
            href: '/compare',
          },
          {
            title: 'FAQ',
            description: 'Answer the common buyer questions that usually appear before a purchase decision.',
            href: '/faq',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

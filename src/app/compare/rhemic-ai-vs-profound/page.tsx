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
  title: 'Rhemic AI vs Profound: AI Visibility Platform Comparison',
  description:
    'Compare Rhemic AI and Profound for measuring and improving AI search visibility. Key differences in focus, audience, and service model.',
  path: '/compare/rhemic-ai-vs-profound',
  keywords: ['Rhemic AI vs Profound', 'Profound alternative', 'AI visibility platform comparison'],
});

const faqs = [
  {
    question: 'What is Profound?',
    answer: 'Profound is an AI visibility analytics platform that tracks brand mentions in AI answer engines. It is primarily analytics-focused. Specific feature details should be verified on profound.com as capabilities may have changed.',
  },
  {
    question: 'What is the main difference between Rhemic AI and Profound?',
    answer: 'Based on publicly available information, Profound focuses on AI mention analytics and tracking. Rhemic AI combines visibility measurement with structured implementation guidance — schema recommendations, content fixes, and prioritized action plans. Verify current capabilities on each platform\'s site.',
  },
  {
    question: 'Which is better for small businesses?',
    answer: 'Rhemic AI\'s Local Starter plan at $199/month is designed specifically for small and local businesses. For Profound pricing and SMB fit, check profound.com directly.',
  },
];

export default function RhemicVsProfoundPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="rhemic-vs-profound-schemas"
        service={{
          name: 'Rhemic AI vs Profound comparison',
          description: 'A fair comparison for buyers evaluating AI visibility platforms.',
          path: '/compare/rhemic-ai-vs-profound',
          audience: 'Buyers evaluating AI visibility platforms',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Compare"
        title="Rhemic AI vs Profound"
        description="A comparison for teams evaluating AI visibility platforms. Rhemic AI publishes this page. Verify competitor data at profound.com before making a purchasing decision."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <section className="mb-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">Transparency note</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This page is published by Rhemic AI. Competitor data marked TBD is unverified or subject to change.
              Always check profound.com for current features and pricing before deciding.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Feature comparison</h2>
            <ComparisonTable
              headers={['Capability', 'Rhemic AI', 'Profound']}
              rows={[
                { label: 'AI visibility audits', values: ['Yes — across ChatGPT, Claude, Perplexity, Gemini', 'Yes (verify scope at profound.com)'] },
                { label: 'Competitor mention tracking', values: ['Yes', 'Yes (TBD — verify current features)'] },
                { label: 'Implementation recommendations', values: ['Yes — schema fixes, content plans, prioritized list', 'TBD — primarily analytics focus per public info'] },
                { label: 'Schema markup guidance', values: ['Yes', 'TBD'] },
                { label: 'Agency delivery model', values: ['Yes — partner pricing available', 'TBD'] },
                { label: 'SMB pricing', values: ['$199/mo Local Starter', 'TBD — check profound.com'] },
              ]}
            />
          </section>

          <section className="mb-16">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">When to choose Rhemic AI</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Rhemic AI is the better fit if you need implementation outputs — not just analytics.
              The audit tells you what is wrong. The recommendations tell you what to fix and how.
              If you are a local business or agency that needs to move from measurement to implementation,
              Rhemic&apos;s workflow is built for that.
            </p>
          </section>
        </div>

        <SubpageFAQ heading="Rhemic AI vs Profound FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'AI Search Visibility', description: 'Understand what AI visibility means and how it is measured.', href: '/ai-search-visibility' },
          { title: 'Best AI Visibility Platforms', description: 'A broader look at the category.', href: '/compare/best-ai-visibility-platforms' },
          { title: 'Pricing', description: 'Rhemic AI plan details.', href: '/pricing' },
        ]}
      />

      <Footer />
    </main>
  );
}

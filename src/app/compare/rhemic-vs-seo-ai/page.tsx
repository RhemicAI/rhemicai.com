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
  title: 'Rhemic AI vs SEO.ai',
  description:
    'Compare Rhemic AI and SEO.ai if your team is deciding between AI visibility operations and a broader AI-assisted SEO content workflow.',
  path: '/compare/rhemic-vs-seo-ai',
  keywords: ['Rhemic vs SEO.ai', 'AI visibility software comparison'],
});

export default function RhemicVsSeoAiPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="rhemic-vs-seo-ai-schemas"
        service={{
          name: 'Rhemic AI vs SEO.ai comparison',
          description:
            'A comparison for buyers deciding between answer engine visibility software and AI-assisted SEO content workflows.',
          path: '/compare/rhemic-vs-seo-ai',
          audience: 'Buyers evaluating AI visibility and SEO platforms',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Compare"
        title="Rhemic AI vs SEO.ai"
        description="A practical comparison for teams that need to know whether the main problem is content production or AI answer visibility."
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              The real choice here is workflow. Rhemic is built for measuring whether answer engines recommend your brand, identifying why they do not, and shipping the pages and schema that close the gap. SEO.ai is more likely to appear in evaluations when a team wants AI-assisted support for broader SEO content operations.
            </p>
          </section>

          <ComparisonTable
            headers={['Dimension', 'Rhemic AI', 'SEO.ai']}
            rows={[
              { label: 'Primary job', values: ['AI visibility audits and implementation workflow', 'Broader SEO and AI-assisted content workflow'] },
              { label: 'Core KPI', values: ['Mentions, brand share, and recommendation visibility', 'Content production and SEO execution support'] },
              { label: 'Best fit', values: ['Teams asking why AI does not mention them', 'Teams focused on a larger SEO content motion'] },
              { label: 'High-leverage pages', values: ['FAQ, pricing, compare, proof pages, schema-heavy assets', 'Editorial and SEO content programs'] },
              { label: 'Why buyers switch to Rhemic', values: ['Need answer-engine-specific tracking and implementation', 'Need more direct AI recommendation visibility workflows'] },
            ]}
          />

          <section className="my-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">Choose Rhemic when</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Your leadership team is asking why competitors appear in ChatGPT or Perplexity while your brand does not, and you need audits, schema, comparison pages, FAQ coverage, and a way to measure improvement over repeated scans.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">Keep evaluating alternatives when</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Your main bottleneck is still SEO editorial throughput rather than answer-engine visibility. In that situation, a more general SEO content workflow may remain part of the stack even if Rhemic handles the visibility layer.
              </p>
            </div>
          </section>

          <SubpageFAQ
            heading="Rhemic vs SEO.ai FAQ"
            faqs={[
              {
                question: 'Are these tools direct replacements for each other?',
                answer:
                  'Not always. Some teams use an SEO content tool for editorial execution and Rhemic for answer-engine visibility measurement and implementation. The question is whether your current stack already solves the visibility problem.',
              },
              {
                question: 'Why compare them at all?',
                answer:
                  'Because buyers often start with a broad SEO tooling search and only later realize that being absent from AI answers is a different operational problem with different success metrics.',
              },
              {
                question: 'What makes Rhemic more AI-native in this comparison?',
                answer:
                  'Rhemic is organized around answer-engine outcomes: visibility score, mention share, FAQ coverage, comparison content, schema, and proof pages. It is designed for being understood and cited by AI systems rather than only publishing more SEO content.',
              },
            ]}
          />
        </div>
      </div>

      <RelatedLinks
        links={[
          {
            title: 'Rhemic vs SurferSEO',
            description: 'Compare answer-engine execution with a search-content optimization workflow.',
            href: '/compare/rhemic-vs-surferseo',
          },
          {
            title: 'Rhemic vs Clearscope',
            description: 'See how editorial optimization differs from AI visibility operations.',
            href: '/compare/rhemic-vs-clearscope',
          },
          {
            title: 'How It Works',
            description: 'Review the implementation workflow behind the comparison.',
            href: '/how-it-works',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

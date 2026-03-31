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
  title: 'Rhemic AI vs Clearscope',
  description:
    'Compare Rhemic AI and Clearscope when your team needs to decide between editorial optimization software and a platform focused on AI recommendation visibility.',
  path: '/compare/rhemic-vs-clearscope',
  keywords: ['Rhemic vs Clearscope', 'AI visibility comparison'],
});

export default function RhemicVsClearscopePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <PageSchemas
        id="rhemic-vs-clearscope-schemas"
        service={{
          name: 'Rhemic AI vs Clearscope comparison',
          description:
            'A comparison for teams choosing between editorial optimization and answer-engine visibility software.',
          path: '/compare/rhemic-vs-clearscope',
          audience: 'Content and growth teams evaluating AI visibility tooling',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Compare"
        title="Rhemic AI vs Clearscope"
        description="This comparison is useful when the team has already invested in content quality but still needs a system for visibility inside generated answers."
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              Clearscope is often part of an editorial optimization stack. Rhemic addresses a later-stage question: once your content is strong, are answer engines actually using it to recommend your brand? If the answer is no, you need a workflow built for visibility, proof pages, and implementation depth.
            </p>
          </section>

          <ComparisonTable
            headers={['Dimension', 'Rhemic AI', 'Clearscope']}
            rows={[
              { label: 'Primary use case', values: ['AI answer visibility operations', 'Editorial optimization and content refinement'] },
              { label: 'Core proof asset', values: ['Visibility reports, FAQs, compare pages, implementation fixes', 'High-quality optimized content assets'] },
              { label: 'Measurement style', values: ['Prompt visibility and recommendation share', 'Content improvement workflow'] },
              { label: 'Strongest fit', values: ['Teams losing mention share in AI answers', 'Teams improving content quality and completeness'] },
              { label: 'Why Rhemic enters the stack', values: ['Need visibility-specific diagnosis and execution', 'Need a layer focused on citations and AI recommendations'] },
            ]}
          />

          <SubpageFAQ
            heading="Rhemic vs Clearscope FAQ"
            faqs={[
              {
                question: 'Is editorial optimization enough for answer engines?',
                answer:
                  'Not by itself. Strong content matters, but answer engines also depend on entity clarity, page architecture, schema, FAQ coverage, and proof-oriented commercial pages. Rhemic is designed to expose those missing layers.',
              },
              {
                question: 'When should a team look beyond content scoring?',
                answer:
                  'When the content is already respectable but the brand still does not appear in AI answers. That is usually the point where answer-engine-specific measurement and implementation become necessary.',
              },
              {
                question: 'Does this mean editorial quality no longer matters?',
                answer:
                  'No. Editorial quality remains foundational. The point is that answer-engine visibility requires additional structure and measurement beyond content quality alone.',
              },
            ]}
          />
        </div>
      </div>

      <RelatedLinks
        links={[
          {
            title: 'Compare Hub',
            description: 'Review the full set of Rhemic comparison pages.',
            href: '/compare',
          },
          {
            title: 'Glossary',
            description: 'Understand the AI visibility terminology used throughout the comparisons.',
            href: '/resources/glossary',
          },
          {
            title: 'FAQ',
            description: 'Answer the buyer questions that usually come up during evaluation.',
            href: '/faq',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

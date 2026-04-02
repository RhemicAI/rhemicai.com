import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import ComparisonTable from '@/components/shared/ComparisonTable';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Rhemic AI Works: Audits, Competitor Analysis, and AI Visibility Fixes',
  description:
    'See how Rhemic AI audits a site, benchmarks competitors, generates recommendations, and turns answer engine findings into implementation-ready changes.',
  path: '/how-it-works',
  keywords: ['how Rhemic AI works', 'AI visibility workflow', 'AEO implementation process'],
});

const steps = [
  {
    title: 'Audit the current state',
    description:
      'Rhemic starts by testing how answer engines currently understand your site, your brand, and your core commercial pages. The goal is to establish a baseline before anyone starts guessing about fixes.',
  },
  {
    title: 'Benchmark the competitors already winning',
    description:
      'The platform maps which competitors appear in the same AI prompts, then compares coverage, content depth, structured data, and answer quality so your team can see what is actually beating you.',
  },
  {
    title: 'Generate a prioritized recommendation set',
    description:
      'Recommendations are ranked by impact and implementation logic: fix entity clarity first, expand weak pages second, add missing schema, close FAQ gaps, and strengthen supporting pages and internal links.',
  },
  {
    title: 'Ship the technical and content changes',
    description:
      'Teams use the output to update metadata, schema, content depth, page structure, and cross-linking. The work is designed to be actionable for both marketers and engineers.',
  },
  {
    title: 'Re-scan and measure movement',
    description:
      'Once updates ship, Rhemic measures whether your visibility score, brand share, and competitor gap improve. The system is meant for iteration, not one-off reports.',
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="how-it-works-schemas"
        service={{
          name: 'Rhemic AI workflow',
          description:
            'An AI visibility workflow that combines auditing, competitor analysis, implementation guidance, and recurring measurement.',
          path: '/how-it-works',
          audience: 'Marketing, growth, and engineering teams improving answer engine visibility',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="How It Works"
        title="From missing in AI answers to operational visibility."
        description="Rhemic is designed as an execution workflow: measure, compare, fix, and re-check instead of guessing at what answer engines might reward."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-16 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              Definition
            </p>
            <p className="text-xl leading-relaxed text-[var(--text-primary)]">
              Rhemic AI is an answer engine optimization platform that turns AI visibility problems into a prioritized implementation plan your team can actually ship.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">The workflow</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6"
                >
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">What the outputs look like</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Executive view</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  A baseline visibility score, brand share, and a clear answer to the question leadership actually cares about: are we being recommended or not?
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Competitive view</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Prompt-level competitor coverage showing who appears, where they win, and which questions are still open territory for your brand.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Implementation view</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Technical and content recommendations that point to the pages, structures, and schema changes most likely to improve answer-engine understanding.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">How this differs from traditional SEO work</h2>
            <ComparisonTable
              headers={['Dimension', 'Traditional SEO workflow', 'Rhemic AI workflow']}
              rows={[
                { label: 'Primary output', values: ['Ranking and traffic analysis', 'Recommendation and mention analysis'] },
                { label: 'Key unit of measurement', values: ['SERP position', 'Presence inside generated answers'] },
                { label: 'Core technical lever', values: ['Indexation and ranking signals', 'Entity clarity, schema, answerable content'] },
                { label: 'Competitive question', values: ['Who outranks us?', 'Who AI cites instead of us?'] },
                { label: 'Implementation focus', values: ['Search performance improvements', 'Answer engine comprehension and proof pages'] },
              ]}
            />
          </section>

          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">Next step</h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--text-secondary)]">
              If your team is already seeing demand shift toward conversational discovery, the right first move is not a giant refactor. It is a clear baseline, a shortlist of high-impact fixes, and faster implementation on the pages that matter most.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/free-ai-visibility-check"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                Run the visibility check
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                Read the FAQ
              </Link>
            </div>
          </section>
        </div>
      </div>

      <RelatedLinks
        heading="Build the cluster"
        links={[
          {
            title: 'FAQ',
            description: 'Read direct answers to the high-intent buyer questions that answer engines often surface.',
            href: '/faq',
          },
          {
            title: 'Products',
            description: 'See how the audit, competitor analysis, and code generation pieces fit together.',
            href: '/products',
          },
          {
            title: 'Compare Rhemic',
            description: 'Use the comparison hub when evaluating AI visibility tools against SEO-first alternatives.',
            href: '/compare',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

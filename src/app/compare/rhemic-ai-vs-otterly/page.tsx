import type { Metadata } from 'next';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import ComparisonTable from '@/components/shared/ComparisonTable';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';
import { plans } from '@/data/pricing';

export const metadata: Metadata = buildMetadata({
  title: 'Rhemic AI vs Otterly.ai: AI Visibility Platform Comparison',
  description:
    'Compare Rhemic AI and Otterly.ai for measuring and improving AI search visibility across ChatGPT, Claude, and Perplexity.',
  path: '/compare/rhemic-ai-vs-otterly',
  keywords: ['Rhemic AI vs Otterly', 'Otterly.ai alternative', 'AI visibility monitoring tools'],
  noindex: true,
});

const basicPlan = plans.find((p) => p.tier === 'basic')!;

const faqs = [
  {
    question: 'What is Otterly.ai?',
    answer: 'Otterly.ai is an AI search visibility monitoring tool focused on tracking brand and topic mentions across AI engines. Specific features should be verified at otterly.ai.',
  },
  {
    question: 'What makes Rhemic AI different from Otterly?',
    answer: 'Otterly.ai focuses on monitoring and analytics. Rhemic AI combines monitoring with structured AEO recommendations — schema guidance, content fixes, and prioritized implementation plans. Verify current Otterly features at otterly.ai.',
  },
];

export default function RhemicVsOtterlyPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="rhemic-vs-otterly-schemas"
        service={{
          name: 'Rhemic AI vs Otterly.ai comparison',
          description: 'A fair comparison for buyers evaluating AI visibility platforms.',
          path: '/compare/rhemic-ai-vs-otterly',
          audience: 'Buyers evaluating AI visibility and monitoring platforms',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Compare"
        title="Rhemic AI vs Otterly.ai"
        description="A comparison for teams evaluating AI visibility monitoring platforms. Published by Rhemic AI. Verify competitor data at otterly.ai."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <section className="mb-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">Transparency note</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This comparison is published by Rhemic AI. Competitor data marked TBD is unverified. Check otterly.ai for current details before deciding.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Feature comparison</h2>
            <ComparisonTable
              headers={['Capability', 'Rhemic AI', 'Otterly.ai']}
              rows={[
                { label: 'AI visibility tracking', values: ['Yes — ChatGPT, Claude, Perplexity, Gemini', 'Yes (verify scope at otterly.ai)'] },
                { label: 'Brand mention monitoring', values: ['Yes', 'Yes (primary focus per public info)'] },
                { label: 'Implementation guidance', values: ['Yes — schema, content, technical fix plans', 'TBD — monitoring-first platform'] },
                { label: 'Schema markup support', values: ['Yes', 'TBD'] },
                { label: 'Agency model', values: ['Yes', 'TBD'] },
                { label: 'Entry price', values: [`$${basicPlan.monthlyPrice}/mo`, 'TBD. Check otterly.ai'] },
              ]}
            />
          </section>

          <section className="mb-16">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">The monitoring vs. implementation distinction</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Monitoring tools tell you where you stand. Rhemic AI tells you where you stand and
              what to do about it. If your team already knows it has an AI visibility problem and
              needs implementation-ready outputs, Rhemic AI&apos;s approach is designed for that next step.
            </p>
          </section>
        </div>

        <SubpageFAQ heading="Rhemic AI vs Otterly FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'AI Search Visibility', description: 'The full picture of AI visibility as a discipline.', href: '/ai-search-visibility' },
          { title: 'Best AI Visibility Platforms', description: 'A broader category comparison.', href: '/compare/best-ai-visibility-platforms' },
          { title: 'Pricing', description: 'Rhemic AI plan details.', href: '/pricing' },
        ]}
      />

      <Footer />
    </main>
  );
}

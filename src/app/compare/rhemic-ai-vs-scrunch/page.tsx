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
  title: 'Rhemic AI vs Scrunch AI: AI Visibility Platform Comparison',
  description:
    'Compare Rhemic AI and Scrunch AI for tracking and improving how your brand appears in AI-generated answers.',
  path: '/compare/rhemic-ai-vs-scrunch',
  keywords: ['Rhemic AI vs Scrunch', 'Scrunch AI alternative', 'AI visibility tools comparison'],
});

const starterPlan = plans.find((p) => p.tier === 'starter')!;

const faqs = [
  {
    question: 'What is Scrunch AI?',
    answer: 'Scrunch AI is an AI search analytics platform that tracks how brands appear in generative AI answers. Specific current features should be verified at scrunch.ai.',
  },
  {
    question: 'How does Rhemic AI differ from Scrunch AI?',
    answer: 'Rhemic AI combines AI visibility measurement with actionable implementation guidance. Based on public information, Scrunch focuses primarily on analytics and brand mention tracking. Verify current Scrunch features at scrunch.ai.',
  },
];

export default function RhemicVsScrunchPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="rhemic-vs-scrunch-schemas"
        service={{
          name: 'Rhemic AI vs Scrunch AI comparison',
          description: 'A fair comparison for buyers evaluating AI visibility platforms.',
          path: '/compare/rhemic-ai-vs-scrunch',
          audience: 'Buyers evaluating AI visibility platforms',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Compare"
        title="Rhemic AI vs Scrunch AI"
        description="A comparison for teams evaluating AI visibility and analytics platforms. This page is published by Rhemic AI. Verify competitor data at scrunch.ai."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <section className="mb-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">Transparency note</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This comparison is published by Rhemic AI. Competitor data marked TBD is unverified. Check scrunch.ai for current features before deciding.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Feature comparison</h2>
            <ComparisonTable
              headers={['Capability', 'Rhemic AI', 'Scrunch AI']}
              rows={[
                { label: 'AI answer visibility tracking', values: ['Yes — ChatGPT, Claude, Perplexity, Gemini', 'Yes (verify scope at scrunch.ai)'] },
                { label: 'Competitor mention analysis', values: ['Yes', 'TBD — verify at scrunch.ai'] },
                { label: 'Implementation guidance', values: ['Yes — schema, content, technical fixes', 'TBD'] },
                { label: 'Agency model', values: ['Yes — partner pricing available', 'TBD'] },
                { label: 'SMB-friendly pricing', values: [`From $${starterPlan.monthlyPrice}/mo`, 'TBD — check scrunch.ai'] },
              ]}
            />
          </section>

          <section className="mb-16">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">When to choose Rhemic AI</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              If you need to go from &ldquo;I can see the problem&rdquo; to &ldquo;here is how to fix it,&rdquo; Rhemic AI&apos;s
              implementation-first workflow is designed for that. The audit identifies your gaps. The
              recommendations tell you what to change. The re-scans confirm it worked.
            </p>
          </section>
        </div>

        <SubpageFAQ heading="Rhemic AI vs Scrunch AI FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'AI Search Visibility', description: 'What AI visibility means and how it is measured.', href: '/ai-search-visibility' },
          { title: 'Best AI Visibility Platforms', description: 'The broader category comparison.', href: '/compare/best-ai-visibility-platforms' },
          { title: 'For Agencies', description: 'Agency-specific delivery model.', href: '/for-agencies' },
        ]}
      />

      <Footer />
    </main>
  );
}

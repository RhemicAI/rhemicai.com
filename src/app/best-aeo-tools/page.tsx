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
  title: 'Best AEO Tools in 2026 (Answer Engine Optimization)',
  description:
    'The best tools for Answer Engine Optimization (AEO): platforms that help businesses appear in AI-generated answers from ChatGPT, Claude, Perplexity, and Gemini.',
  path: '/best-aeo-tools',
  keywords: ['best AEO tools', 'answer engine optimization tools', 'AEO software 2026'],
});

const faqs = [
  {
    question: 'What makes a tool an AEO tool?',
    answer: 'An AEO tool specifically addresses the workflow of measuring, improving, and tracking how your business appears in AI answer engines. This is distinct from general SEO tools, which focus on search rankings.',
  },
  {
    question: 'Can I use Google Search Console for AEO?',
    answer: 'Google Search Console covers Google search performance. It does not measure AI answer visibility across ChatGPT, Claude, or Perplexity. For AEO-specific measurement, you need dedicated AI visibility tooling.',
  },
];

export default function BestAeoToolsPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="best-aeo-tools-schemas"
        service={{
          name: 'Best AEO tools guide',
          description: 'A guide to the best AEO tools for businesses improving AI answer engine visibility.',
          path: '/best-aeo-tools',
          audience: 'Businesses, agencies, and marketing teams evaluating AEO tools',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Best AEO Tools"
        title="Best AEO tools in 2026"
        description="Tools that specifically address Answer Engine Optimization — measuring, improving, and tracking your visibility in AI-generated answers. Published by Rhemic AI. Verify competitor details at their sites."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <section className="mb-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">Transparency</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This page is published by Rhemic AI. We have included ourselves and competitors.
              Competitor information may be out of date. Verify at each vendor&apos;s site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">The AEO tooling landscape</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              AEO is a new and fast-moving category. Most dedicated AEO tools focus on one or more of:
              AI answer visibility measurement, competitor mention tracking, schema generation,
              content gap analysis, and crawlability auditing for AI crawlers.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Some SEO tools are adding AEO features. Purpose-built AEO platforms are better at
              prompt-level visibility tracking and AI-specific implementation guidance.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Tools in the AEO category</h2>
            <div className="space-y-5">
              {[
                {
                  name: 'Rhemic AI',
                  focus: 'Visibility measurement + AEO implementation guidance',
                  bestFor: 'Local businesses, SMBs, and agencies that need both measurement and actionable fixes',
                  pricing: 'From $199/mo',
                  href: '/pricing',
                  internal: true,
                },
                {
                  name: 'Profound',
                  focus: 'AI answer analytics',
                  bestFor: 'Analytics-focused teams',
                  pricing: 'TBD — check profound.com',
                  href: 'https://profound.com',
                  internal: false,
                },
                {
                  name: 'Otterly.ai',
                  focus: 'AI mention monitoring',
                  bestFor: 'Monitoring-first workflows',
                  pricing: 'TBD — check otterly.ai',
                  href: 'https://otterly.ai',
                  internal: false,
                },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className={`rounded-2xl border p-6 ${tool.internal ? 'border-[var(--border-default)]' : 'border-[var(--border-subtle)]'} bg-[var(--bg-glass)]`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <h3 className="text-base font-bold text-[var(--text-primary)]">{tool.name}</h3>
                    {tool.internal ? (
                      <Link href={tool.href} className="text-xs text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded px-3 py-1.5 hover:opacity-90 transition-opacity">
                        See pricing
                      </Link>
                    ) : (
                      <a href={tool.href} target="_blank" rel="noopener noreferrer" className="text-xs border border-[var(--border-subtle)] text-[var(--text-muted)] rounded px-3 py-1.5 hover:border-[var(--border-default)] transition-colors">
                        Visit site
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1"><span className="font-semibold text-[var(--text-primary)]">Focus:</span> {tool.focus}</p>
                  <p className="text-sm text-[var(--text-secondary)] mb-1"><span className="font-semibold text-[var(--text-primary)]">Best for:</span> {tool.bestFor}</p>
                  <p className="text-sm text-[var(--text-muted)]"><span className="font-semibold">Pricing:</span> {tool.pricing}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <SubpageFAQ heading="AEO tools FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'Answer Engine Optimization', description: 'The full AEO discipline explained.', href: '/answer-engine-optimization' },
          { title: 'Best AI Visibility Tools', description: 'Broader AI visibility tooling landscape.', href: '/best-ai-visibility-tools' },
          { title: 'Pricing', description: 'Compare Rhemic AI plans.', href: '/pricing' },
        ]}
      />

      <Footer />
    </main>
  );
}

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
  title: 'Best AI Search Optimization Tools in 2026',
  description:
    'Tools for optimizing your presence in AI-powered search and answer engines. Covers AEO platforms, schema tools, and visibility monitoring.',
  path: '/best-ai-search-optimization-tools',
  keywords: ['best AI search optimization tools', 'AI search optimization software', 'GEO tools 2026'],
  noindex: true,
});

const faqs = [
  {
    question: 'What is AI search optimization?',
    answer: 'AI search optimization (also called AEO, GEO, or AI Engine Optimization) is the practice of making your business more likely to appear in AI-generated answers. It covers entity clarity, schema markup, content structure, and competitive presence in AI answer engines.',
  },
  {
    question: 'Do AI search optimization tools replace SEO tools?',
    answer: 'No. Traditional SEO tools cover Google rankings. AI search optimization tools cover AI answer engine visibility. Most businesses need both. The signals overlap in some areas but each requires dedicated tooling for best results.',
  },
];

export default function BestAiSearchOptimizationToolsPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="best-ai-search-opt-tools-schemas"
        service={{
          name: 'Best AI search optimization tools guide',
          description: 'A guide to tools for optimizing business visibility in AI-powered search and answer engines.',
          path: '/best-ai-search-optimization-tools',
          audience: 'Businesses, agencies, and marketing teams',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Best AI Search Optimization Tools"
        title="Best AI search optimization tools in 2026"
        description="The tools that help businesses improve their presence in AI-powered answer engines. Published by Rhemic AI. Verify competitor details at their sites."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <section className="mb-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">Transparency</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This page is published by Rhemic AI. We have included ourselves and competitors.
              Competitor information may be out of date. Verify at each vendor&apos;s site before purchasing.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">Categories of AI search optimization tooling</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: 'AI visibility measurement', detail: 'Tracks how often your brand appears in AI answers across ChatGPT, Claude, Perplexity, and Gemini.' },
                { label: 'Schema markup tools', detail: 'Generates or audits structured data markup (Organization, FAQPage, Service, etc.) to make your content machine-readable.' },
                { label: 'Content optimization', detail: 'Helps structure existing content to answer buyer questions more directly and earn AI citation.' },
              ].map(({ label, detail }) => (
                <div key={label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
                  <h3 className="font-bold text-[var(--text-primary)] mb-2 text-sm">{label}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Rhemic AI</h2>
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-6">
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Rhemic AI covers all three categories: AI visibility measurement, schema implementation
                guidance, and content gap analysis. Rhemic&apos;s current public offer is focused on
                U.S. med spas through Diagnose, Capture, Scale, and Custom plans.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                See pricing
              </Link>
            </div>
          </section>
        </div>

        <SubpageFAQ heading="AI search optimization FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'Best AI Visibility Tools', description: 'The broader AI visibility tooling landscape.', href: '/best-ai-visibility-tools' },
          { title: 'Answer Engine Optimization', description: 'The full AEO discipline.', href: '/answer-engine-optimization' },
          { title: 'Pricing', description: 'Rhemic AI plan details.', href: '/pricing' },
        ]}
      />

      <Footer />
    </main>
  );
}

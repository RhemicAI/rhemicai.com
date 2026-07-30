import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Compare Rhemic AI to SEO.ai, SurferSEO, and Clearscope',
  description:
    'A comparison hub for teams evaluating Rhemic AI against SEO.ai, SurferSEO, and Clearscope when answer engine visibility becomes a core buying requirement.',
  path: '/compare',
  keywords: ['Rhemic vs SEO.ai', 'Rhemic vs SurferSEO', 'Rhemic vs Clearscope'],
});

const comparisons = [
  {
    title: 'Rhemic vs SEO.ai',
    href: '/compare/rhemic-vs-seo-ai',
    description:
      'For teams deciding between an AI visibility workflow and a broader AI-assisted SEO content motion.',
  },
  {
    title: 'Rhemic vs SurferSEO',
    href: '/compare/rhemic-vs-surferseo',
    description:
      'For teams moving from search-content optimization toward answer-engine recommendation visibility.',
  },
  {
    title: 'Rhemic vs Clearscope',
    href: '/compare/rhemic-vs-clearscope',
    description:
      'For operators comparing editorial optimization tooling with a platform designed around AI citations and mentions.',
  },
];

export default function CompareHubPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="compare-hub-schemas"
        service={{
          name: 'Rhemic AI comparison hub',
          description:
            'Comparison pages for evaluating Rhemic AI against SEO-first alternatives when answer engine visibility matters.',
          path: '/compare',
          audience: 'Buyers evaluating AI visibility and SEO software',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Compare"
        title="Evaluate Rhemic against SEO-first alternatives."
        description="These pages are written for buyers trying to decide whether they need content optimization alone or a workflow built specifically for answer engine visibility."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              Buyer framing
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              The right tool depends on the job. If your team is mainly optimizing briefs, outlines, and content scoring, an SEO-first platform may fit. If the commercial problem is that AI engines do not mention your brand, you need visibility measurement, competitor answer-share analysis, FAQ and proof-page coverage, and implementation outputs designed for that problem.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {comparisons.map((comparison) => (
              <Link
                key={comparison.href}
                href={comparison.href}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6 transition-colors duration-300 hover:border-[var(--border-default)]"
              >
                <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">{comparison.title}</h2>
                <p className="mb-4 text-[var(--text-secondary)] leading-relaxed">{comparison.description}</p>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Read comparison</span>
              </Link>
            ))}
          </section>
        </div>
      </div>

      <RelatedLinks
        heading="Support pages"
        links={[
          {
            title: 'How It Works',
            description: 'Understand the Rhemic workflow before comparing it to other software categories.',
            href: '/how-it-works',
          },
          {
            title: 'Pricing',
            description: 'Compare plans once you know whether you need AI visibility execution or lighter analysis.',
            href: '/pricing',
          },
          {
            title: 'Case Studies',
            description: 'Review the dogfooding case study based on improving rhemicai.com itself.',
            href: '/case-studies',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

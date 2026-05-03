import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, absoluteUrl, siteConfig } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Sample AI Visibility Report: What a Rhemic Audit Looks Like',
  description:
    'An illustrative sample of a Rhemic AI visibility audit. See the report structure, metrics, and recommendation format before committing.',
  path: '/sample-ai-visibility-report',
  keywords: ['AI visibility report sample', 'AEO audit example', 'Rhemic AI report'],
});

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Sample AI Visibility Report',
  description: 'An illustrative sample of a Rhemic AI visibility audit report.',
  url: absoluteUrl('/sample-ai-visibility-report'),
  isPartOf: { '@type': 'WebSite', url: siteConfig.url, name: siteConfig.name },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Sample Report', item: absoluteUrl('/sample-ai-visibility-report') },
    ],
  },
};

export default function SampleAiVisibilityReportPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <JsonLd id="sample-report-webpage" data={webPageSchema} />
      <FixedNav />

      <PageHero
        subtitle="Sample Report"
        title="What a Rhemic AI visibility audit looks like"
        description="An illustrative sample of the report structure and findings format. See the methodology before committing."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          {/* Disclaimer */}
          <section className="mb-10 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">Important Disclaimer</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This is an illustrative sample report. It does not represent a real customer or real scan result.
              All business names, prompt results, and scores shown here are generic examples created to
              illustrate report structure and methodology. No real company data is shown.
            </p>
          </section>

          {/* Section 1: Summary */}
          <section className="mb-10">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Section 1: AI visibility summary</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: 'Overall visibility score', value: '34 / 100', note: 'Baseline — significant gaps identified' },
                { label: 'Prompts tracked', value: '40', note: 'Across 4 buyer intent categories' },
                { label: 'Brand appears in', value: '14 / 40', note: '35% citation rate across engines' },
              ].map(({ label, value, note }) => (
                <div key={label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] mb-2">{label}</p>
                  <p className="text-3xl font-extrabold text-[var(--text-primary)] font-display mb-1">{value}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Engine breakdown */}
          <section className="mb-10">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Section 2: Visibility by engine</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/10">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] font-body">Engine</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] font-body">Prompts tested</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] font-body">Citations found</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] font-body">Citation rate</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['ChatGPT', '10', '4', '40%'],
                    ['Perplexity', '10', '3', '30%'],
                    ['Claude', '10', '4', '40%'],
                    ['Gemini', '10', '3', '30%'],
                  ].map(([engine, tested, found, rate], i) => (
                    <tr key={engine} className={`border-b border-white/[0.05] last:border-0 ${i % 2 === 1 ? 'bg-white/[0.015]' : ''}`}>
                      <td className="px-5 py-4 text-[var(--text-primary)] font-body font-semibold">{engine}</td>
                      <td className="px-5 py-4 text-[var(--text-secondary)] font-body">{tested}</td>
                      <td className="px-5 py-4 text-[var(--text-secondary)] font-body">{found}</td>
                      <td className="px-5 py-4 text-[var(--text-primary)] font-body">{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Sample prompts */}
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">Section 3: Sample prompt results</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">Generic example prompts — not real customer data.</p>
            <div className="space-y-4">
              {[
                { prompt: 'What are the best [service category] companies in [city]?', engine: 'ChatGPT', result: 'Not cited. Competitors A, B, C appeared.', status: 'miss' },
                { prompt: 'Who should I hire for [service type] near me?', engine: 'Perplexity', result: 'Not cited. Competitor A appeared as top recommendation.', status: 'miss' },
                { prompt: 'What is the difference between [service A] and [service B]?', engine: 'Claude', result: 'Cited in content context. Brand mentioned as example provider.', status: 'hit' },
                { prompt: 'How much does [service] cost in [city]?', engine: 'Gemini', result: 'Not cited. Generic pricing guidance provided with no brand mention.', status: 'miss' },
              ].map(({ prompt, engine, result, status }) => (
                <div key={prompt} className={`rounded-xl border p-5 ${status === 'hit' ? 'border-green-900/40 bg-green-950/20' : 'border-[var(--border-subtle)] bg-[var(--bg-glass)]'}`}>
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <p className="text-sm font-mono text-[var(--text-tertiary)]">{prompt}</p>
                    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${status === 'hit' ? 'text-green-400 bg-green-900/40' : 'text-red-400 bg-red-900/30'}`}>
                      {status === 'hit' ? 'Cited' : 'Not cited'}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">Engine: {engine}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{result}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Top gaps */}
          <section className="mb-10">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Section 4: Top identified gaps</h2>
            <div className="space-y-3">
              {[
                { priority: 'High', gap: 'No FAQPage schema on service pages', impact: 'Missing structured FAQ signals for AI extractability' },
                { priority: 'High', gap: 'Service page copy is generic — does not answer specific buyer questions', impact: 'AI engines favor pages that directly answer the prompt' },
                { priority: 'Medium', gap: 'Organization schema missing on homepage', impact: 'Reduces entity confidence for AI systems' },
                { priority: 'Medium', gap: 'Absent from comparison and "best X" content in this category', impact: 'These pages are frequently cited by AI engines for shortlist queries' },
                { priority: 'Low', gap: 'PerplexityBot blocked in robots.txt', impact: 'Perplexity cannot crawl the site for live retrieval' },
              ].map(({ priority, gap, impact }) => (
                <div key={gap} className="flex gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
                  <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded h-fit shrink-0 ${priority === 'High' ? 'text-red-400 bg-red-900/30' : priority === 'Medium' ? 'text-yellow-400 bg-yellow-900/30' : 'text-[var(--text-muted)] bg-white/5'}`}>
                    {priority}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] text-sm mb-1">{gap}</p>
                    <p className="text-xs text-[var(--text-muted)]">{impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">Get a real report for your business</h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              The sample above shows the structure. A real report uses your actual domain, your actual
              competitors, and your actual buyer-intent prompts. Plans start at $199/month.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-[5px] bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                See pricing
              </Link>
              <Link
                href="/free-ai-visibility-check"
                className="inline-flex items-center justify-center rounded-[5px] border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                Free AI visibility check
              </Link>
            </div>
          </section>
        </div>
      </div>

      <RelatedLinks
        links={[
          { title: 'How It Works', description: 'The full audit and implementation workflow.', href: '/how-it-works' },
          { title: 'AI Search Visibility', description: 'The full guide to what the report measures.', href: '/ai-search-visibility' },
          { title: 'Pricing', description: 'Plan details for a real report.', href: '/pricing' },
        ]}
      />

      <Footer />
    </main>
  );
}

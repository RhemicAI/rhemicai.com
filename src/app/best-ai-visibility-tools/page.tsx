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
  title: 'Best AI Visibility Tools in 2026',
  description:
    'The top tools for measuring and improving how your business appears in AI-generated answers from ChatGPT, Claude, Perplexity, and Gemini.',
  path: '/best-ai-visibility-tools',
  keywords: ['best AI visibility tools', 'AI visibility software', 'top AI visibility platforms 2026'],
  noindex: true,
});

const faqs = [
  {
    question: 'What do AI visibility tools do?',
    answer: 'AI visibility tools measure how often your business appears in AI-generated answers, track which competitors are cited instead, and typically provide recommendations for improving your citation rate.',
  },
  {
    question: 'Are AI visibility tools different from SEO tools?',
    answer: 'Yes. SEO tools measure search rankings and organic traffic. AI visibility tools measure whether and how your brand appears in synthesized answers from tools like ChatGPT, Claude, and Perplexity — a completely different output.',
  },
];

export default function BestAiVisibilityToolsPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="best-ai-visibility-tools-schemas"
        service={{
          name: 'Best AI visibility tools guide',
          description: 'A buyer-focused guide to the best AI visibility tools for businesses and agencies.',
          path: '/best-ai-visibility-tools',
          audience: 'Businesses, agencies, and marketing teams evaluating AI visibility tools',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Best AI Visibility Tools"
        title="The best AI visibility tools in 2026"
        description="Tools for measuring and improving how your business appears in AI-generated answers. This list is published by Rhemic AI — we have an inherent perspective and have included competitors. Verify all data at each vendor's site."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <section className="mb-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">Transparency</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This page is published by Rhemic AI. We have included ourselves and known competitors.
              Information about competitors reflects public data as of May 2026 and may be out of date.
              Verify at each vendor&apos;s website before purchasing.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">What makes a strong AI visibility tool</h2>
            <p className="mb-6 text-[var(--text-secondary)] leading-relaxed">
              The category is new and moving fast. The best tools share these characteristics:
              they measure across multiple AI engines, they track competitors, they surface
              actionable gaps, and they connect measurement to implementation.
            </p>

            <div className="space-y-5">
              {[
                {
                  name: 'Rhemic AI',
                  description: 'AI visibility audits, competitor mention analysis, schema recommendations, and AEO implementation guidance. Designed for local businesses, SMBs, and agencies.',
                  href: '/pricing',
                  linkLabel: 'See Rhemic AI pricing',
                  internal: true,
                },
                {
                  name: 'Profound',
                  description: 'AI answer analytics and brand mention tracking. Verify current features at profound.com.',
                  href: 'https://profound.com',
                  linkLabel: 'profound.com',
                  internal: false,
                },
                {
                  name: 'Otterly.ai',
                  description: 'AI search visibility monitoring. Verify current features at otterly.ai.',
                  href: 'https://otterly.ai',
                  linkLabel: 'otterly.ai',
                  internal: false,
                },
                {
                  name: 'Scrunch AI',
                  description: 'AI search analytics and brand visibility tracking. Verify current features at scrunch.ai.',
                  href: 'https://scrunch.ai',
                  linkLabel: 'scrunch.ai',
                  internal: false,
                },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className={`rounded-2xl border p-6 flex items-start justify-between gap-4 flex-wrap ${tool.internal ? 'border-[var(--border-default)]' : 'border-[var(--border-subtle)]'} bg-[var(--bg-glass)]`}
                >
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{tool.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{tool.description}</p>
                  </div>
                  {tool.internal ? (
                    <Link
                      href={tool.href}
                      className="text-xs text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded px-3 py-1.5 hover:opacity-90 transition-opacity shrink-0"
                    >
                      {tool.linkLabel}
                    </Link>
                  ) : (
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--text-muted)] border border-[var(--border-subtle)] rounded px-3 py-1.5 hover:border-[var(--border-default)] transition-colors shrink-0"
                    >
                      {tool.linkLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">See Rhemic AI in action</h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Book a demo to review how Rhemic tracks citations, competitors, and implementation priorities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
            >
              Get the audit
            </Link>
          </section>
        </div>

        <SubpageFAQ heading="AI visibility tools FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'Best AEO Tools', description: 'Tools focused specifically on answer engine optimization.', href: '/best-aeo-tools' },
          { title: 'AI Visibility Tools for Agencies', description: 'Tools built for agency delivery.', href: '/ai-visibility-tools-for-agencies' },
          { title: 'Compare Platforms', description: 'Side-by-side comparison hub.', href: '/compare/best-ai-visibility-platforms' },
        ]}
      />

      <Footer />
    </main>
  );
}

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
  title: 'Best AI Visibility Platforms in 2026',
  description:
    'A buyer\'s guide to the best AI visibility and AEO platforms: what they measure, who they are for, and what to look for when evaluating them.',
  path: '/compare/best-ai-visibility-platforms',
  keywords: ['best AI visibility platforms', 'AI visibility tools 2026', 'AEO platforms comparison', 'best AEO tools'],
});

const faqs = [
  {
    question: 'What should I look for in an AI visibility platform?',
    answer: 'Look for prompt-level visibility tracking across the major engines (ChatGPT, Claude, Perplexity, Gemini), competitor mention analysis, actionable implementation recommendations, schema markup support, and a pricing model that fits your scale. A dashboard without a playbook is not enough.',
  },
  {
    question: 'Are AI visibility platforms worth it for small businesses?',
    answer: 'For small businesses in competitive local categories, yes. AI answer engines are increasingly where buyers start their search. An affordable entry-level audit and fix plan can produce meaningful visibility movement.',
  },
  {
    question: 'How is AI visibility measurement different from SEO analytics?',
    answer: 'SEO analytics measure clicks, impressions, and rankings in search results. AI visibility measurement tracks whether your brand appears in synthesized answers — a completely different output. Most SEO analytics tools do not measure this.',
  },
];

const platforms = [
  {
    name: 'Rhemic AI',
    url: 'https://rhemicai.com',
    focus: 'AI visibility measurement + AEO implementation guidance',
    bestFor: 'Local businesses, SMBs, and agencies that need measurement + actionable fixes',
    note: 'Published by Rhemic AI — we have an inherent perspective. Evaluate us alongside competitors.',
    internal: true,
  },
  {
    name: 'Profound',
    url: 'https://profound.com',
    focus: 'AI answer analytics and brand mention tracking',
    bestFor: 'Teams focused on AI mention analytics',
    note: 'Verify current features at profound.com',
    internal: false,
  },
  {
    name: 'Otterly.ai',
    url: 'https://otterly.ai',
    focus: 'AI search visibility monitoring',
    bestFor: 'Businesses that need brand mention monitoring across AI engines',
    note: 'Verify current features at otterly.ai',
    internal: false,
  },
  {
    name: 'Scrunch AI',
    url: 'https://scrunch.ai',
    focus: 'AI search analytics and brand visibility tracking',
    bestFor: 'Teams focused on AI search analytics',
    note: 'Verify current features at scrunch.ai',
    internal: false,
  },
];

export default function BestAiVisibilityPlatformsPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="best-ai-visibility-platforms-schemas"
        service={{
          name: 'Best AI visibility platforms comparison',
          description: 'A buyer\'s guide to AI visibility and AEO platforms.',
          path: '/compare/best-ai-visibility-platforms',
          audience: 'Businesses and agencies evaluating AI visibility tools',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Compare"
        title="Best AI visibility platforms in 2026"
        description="A buyer-focused overview of the platforms in the AI visibility and AEO space. This page is published by Rhemic AI. We have included competitors. Verify all competitor data before purchasing."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          <section className="mb-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-2">Transparency</p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              This page is published by Rhemic AI. We have included competitors fairly. Competitor data reflects publicly available information as of May 2026 and may be out of date. Always verify at each vendor&apos;s website.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">Platforms in the category</h2>
            <div className="space-y-5">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className={`rounded-2xl border p-6 ${p.internal ? 'border-[var(--border-default)] bg-[var(--bg-glass)]' : 'border-[var(--border-subtle)] bg-[var(--bg-glass)]'}`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{p.name}</h3>
                      <p className="text-sm text-[var(--text-tertiary)] mb-2">{p.focus}</p>
                      <p className="text-sm text-[var(--text-secondary)]"><span className="font-semibold">Best for:</span> {p.bestFor}</p>
                    </div>
                    {!p.internal && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--text-muted)] border border-[var(--border-subtle)] rounded px-3 py-1.5 hover:border-[var(--border-default)] transition-colors shrink-0"
                      >
                        Visit site
                      </a>
                    )}
                    {p.internal && (
                      <Link
                        href="/pricing"
                        className="text-xs text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded px-3 py-1.5 hover:opacity-90 transition-opacity shrink-0"
                      >
                        See pricing
                      </Link>
                    )}
                  </div>
                  <p className="mt-3 text-xs text-[var(--text-muted)] italic">{p.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">What to look for when evaluating</h2>
            <div className="space-y-3">
              {[
                ['Prompt-level visibility tracking', 'Does it test actual buyer-intent prompts across the engines you care about?'],
                ['Competitor analysis', 'Does it show you who is being recommended in your place?'],
                ['Implementation outputs', 'Does it tell you what to fix, or only what is broken?'],
                ['Schema markup support', 'Does it generate or guide schema implementation?'],
                ['Engine coverage', 'Does it cover ChatGPT, Claude, Perplexity, and Gemini?'],
                ['Pricing transparency', 'Can you understand what you are paying for before committing?'],
              ].map(([label, detail]) => (
                <div key={label} className="flex gap-3 text-sm">
                  <span className="text-[var(--text-tertiary)] mt-0.5">+</span>
                  <div>
                    <span className="font-semibold text-[var(--text-primary)]">{label}: </span>
                    <span className="text-[var(--text-secondary)]">{detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <SubpageFAQ heading="AI visibility platform FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'Best AEO Tools', description: 'The broader AEO tooling landscape.', href: '/best-aeo-tools' },
          { title: 'AI Search Visibility', description: 'What AI visibility means.', href: '/ai-search-visibility' },
          { title: 'Free AI Visibility Check', description: 'Try a free Rhemic scan.', href: '/free-ai-visibility-check' },
        ]}
      />

      <Footer />
    </main>
  );
}

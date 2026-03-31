import type { Metadata } from 'next';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Glossary: AI Engine Optimization and AI Visibility Terms',
  description:
    'A glossary of the most important AI visibility concepts, including AI Engine Optimization, brand share, topic coverage, citation analysis, schema, and FAQ JSON-LD.',
  path: '/resources/glossary',
  keywords: ['AI Engine Optimization glossary', 'AI visibility glossary', 'FAQ JSON-LD definition'],
});

const terms = [
  ['AI Engine Optimization (AEO)', 'The practice of improving how well your brand is understood, cited, and recommended inside AI-generated answers.'],
  ['AI Visibility Score', 'A summary score that estimates how prepared a site is to be surfaced in answer engines based on structural and content signals.'],
  ['Brand Share', 'The percentage of target prompts where your brand appears relative to the competitive set being tracked.'],
  ['Topic Coverage', 'A measure of how thoroughly your site addresses the high-intent questions and themes buyers ask AI tools.'],
  ['Mention Consistency', 'How reliably your brand appears across different AI engines and prompt variations instead of only showing up sporadically.'],
  ['Competitive Share', 'A comparative view of how often competitors are surfaced instead of your brand across the same prompt set.'],
  ['Citation Analysis', 'The process of examining which pages, sources, and competitors answer engines rely on when forming recommendations.'],
  ['AI Answer Engines', 'Tools such as ChatGPT, Claude, Perplexity, Gemini, and Google AI experiences that synthesize answers instead of only returning links.'],
  ['Structured Data / Schema', 'Machine-readable page markup that helps systems understand entities, services, FAQs, articles, and relationships on a site.'],
  ['FAQ JSON-LD', 'Schema markup that turns a page’s questions and answers into a structured FAQPage entity that machines can parse cleanly.'],
];

const glossarySchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Rhemic AI Visibility Glossary',
  description:
    'Definitions for core AI visibility and answer engine optimization terminology.',
  url: absoluteUrl('/resources/glossary'),
  hasDefinedTerm: terms.map(([name, description], index) => ({
    '@type': 'DefinedTerm',
    name,
    description,
    url: `${absoluteUrl('/resources/glossary')}#term-${index + 1}`,
    inDefinedTermSet: absoluteUrl('/resources/glossary'),
  })),
};

export default function GlossaryPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <JsonLd id="glossary-defined-term-set" data={glossarySchema} />
      <FixedNav />

      <PageHero
        subtitle="Resources"
        title="Glossary for the answer engine era."
        description="Short, useful definitions written to be cited, shared, and used inside real implementation conversations."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6">
            {terms.map(([term, definition], index) => (
              <section
                key={term}
                id={`term-${index + 1}`}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6"
              >
                <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">{term}</h2>
                <p className="text-[var(--text-secondary)] leading-relaxed">{definition}</p>
              </section>
            ))}
          </div>
        </div>
      </div>

      <RelatedLinks
        links={[
          {
            title: 'FAQ',
            description: 'See the glossary terms applied in direct buyer questions.',
            href: '/faq',
          },
          {
            title: 'What Is AEO?',
            description: 'Read the long-form guide behind the glossary definitions.',
            href: '/blog/what-is-aeo',
          },
          {
            title: 'How It Works',
            description: 'See how these terms connect to a real implementation workflow.',
            href: '/how-it-works',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

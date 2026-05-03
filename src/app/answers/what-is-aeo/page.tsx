import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is AEO (Answer Engine Optimization)?',
  description:
    'AEO (Answer Engine Optimization) is the practice of making your website easier for AI answer engines like ChatGPT, Claude, and Perplexity to understand and recommend.',
  path: '/answers/what-is-aeo',
  keywords: ['what is AEO', 'answer engine optimization definition', 'AEO explained'],
});

export default function WhatIsAeoPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / What is AEO"
      title="What is AEO (Answer Engine Optimization)?"
      path="/answers/what-is-aeo"
      directAnswer="AEO, or Answer Engine Optimization, is the practice of making your website, content, and brand easier for AI-powered answer engines to understand, cite, and recommend. It is the discipline behind improving AI visibility. Also called AI Engine Optimization or Generative Engine Optimization (GEO)."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            AEO focuses on the signals that influence whether AI engines include your brand in their
            synthesized answers. These are not the same signals that drive Google rankings. They
            include entity clarity (how well an AI engine can model your business), structured data
            (schema markup that makes your content machine-readable), content directness (pages
            that answer buyer questions without making the reader work for the answer), and competitive
            presence (whether you appear in the comparison content AI engines cite).
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            AEO is additive to traditional SEO. Many of the technical improvements that help AI
            engines (schema, crawlability, content depth) also help Google. But AEO has distinct
            requirements — particularly around FAQ structure, entity definition, and buyer-intent
            prompt mapping — that traditional SEO workflows do not address.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The term AEO is sometimes used interchangeably with GEO (Generative Engine Optimization)
            and AI Engine Optimization. These all refer to the same core practice.
          </p>
        </div>
      }
      relatedQuestions={[
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
        { question: 'How is AEO different from SEO?', href: '/blog/seo-vs-aeo' },
        { question: 'How do I improve my ChatGPT visibility?', href: '/answers/how-to-improve-chatgpt-visibility' },
      ]}
      relatedPages={[
        { title: 'Answer Engine Optimization', href: '/answer-engine-optimization' },
        { title: 'AI Search Visibility', href: '/ai-search-visibility' },
        { title: 'AEO Guide (Blog)', href: '/blog/what-is-aeo' },
        { title: 'Pricing', href: '/pricing' },
      ]}
      faqs={[
        {
          question: 'When did AEO become important?',
          answer: 'AEO became a meaningful business concern as ChatGPT, Perplexity, and similar tools scaled to hundreds of millions of users. The tipping point was when a non-trivial share of buyer-intent queries began appearing in AI tools rather than Google.',
        },
        {
          question: 'Is AEO only for large businesses?',
          answer: 'No. Local businesses and SMBs are often more affected by AI recommendation gaps than large enterprises, because local buyers increasingly ask AI tools for service recommendations in their area.',
        },
      ]}
    />
  );
}

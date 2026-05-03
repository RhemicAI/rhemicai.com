import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How to Improve Your Perplexity Visibility',
  description:
    'Steps to improve how your business appears in Perplexity answers: allow PerplexityBot, add schema, write direct content, appear in cited sources.',
  path: '/answers/how-to-improve-perplexity-visibility',
  keywords: ['improve Perplexity visibility', 'get recommended by Perplexity', 'Perplexity business recommendations'],
});

export default function HowToImprovePerplexityVisibilityPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / How to improve Perplexity visibility"
      title="How to improve your Perplexity visibility"
      path="/answers/how-to-improve-perplexity-visibility"
      directAnswer="Perplexity is a citation-heavy answer engine — it actively cites sources in its answers. To improve your Perplexity visibility, allow PerplexityBot in robots.txt, write directly answerable content that earns citation, add schema markup for structured data clarity, and ensure your pages load fast and are fully server-rendered so Perplexity can read them."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Perplexity differs from ChatGPT in that it actively retrieves live web content and cites
            sources in its answers. This means your pages need to be crawlable, fast, and written
            in a way that earns citation. Perplexity tends to prefer pages that give direct,
            structured answers over pages that bury the answer in marketing copy.
          </p>
          <div className="space-y-3">
            {[
              { label: 'Allow PerplexityBot', detail: 'Check that your robots.txt does not block PerplexityBot. Perplexity actively crawls and retrieves content for its answers. Blocking it means zero organic citation.' },
              { label: 'Write pages that earn citation', detail: 'Perplexity cites pages that directly answer questions. Lead with the answer, use clear headings, and structure content so it is extractable in a short citation window.' },
              { label: 'Ensure server-side rendering', detail: 'Perplexity\'s crawler may not fully execute client-side JavaScript. Ensure your key content is in the HTML response, not rendered client-side only.' },
              { label: 'Add structured data', detail: 'Schema markup gives Perplexity\'s systems context about your entity, services, and FAQs. FAQPage schema is particularly useful for Perplexity because it frequently surfaces FAQ-style answers.' },
              { label: 'Appear in authoritative category sources', detail: 'Perplexity aggregates from high-authority sources. Being cited or mentioned in reputable directories, review platforms, and industry content increases your citation probability.' },
            ].map(({ label, detail }) => (
              <div key={label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-5">
                <h3 className="font-bold text-[var(--text-primary)] mb-1 text-sm">{label}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      }
      relatedQuestions={[
        { question: 'How to improve ChatGPT visibility?', href: '/answers/how-to-improve-chatgpt-visibility' },
        { question: 'Why does your competitor show up in AI answers?', href: '/answers/why-your-competitor-shows-up-in-ai-answers' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
      ]}
      relatedPages={[
        { title: 'AI Search Visibility', href: '/ai-search-visibility' },
        { title: 'Answer Engine Optimization', href: '/answer-engine-optimization' },
        { title: 'Free AI Visibility Check', href: '/free-ai-visibility-check' },
      ]}
      faqs={[
        {
          question: 'How often does Perplexity crawl websites?',
          answer: 'Perplexity crawls both live (real-time retrieval) and indexed content. The frequency depends on the query type. Live search queries trigger fresh crawls; standard queries use indexed content.',
        },
        {
          question: 'Can I submit my sitemap to Perplexity?',
          answer: 'Perplexity does not have a formal sitemap submission tool like Google Search Console. The best path is ensuring your sitemap is discoverable at /sitemap.xml and your robots.txt allows PerplexityBot.',
        },
      ]}
    />
  );
}

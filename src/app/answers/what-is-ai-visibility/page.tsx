import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is AI Visibility?',
  description:
    'AI visibility is how often and how accurately your brand appears in AI-generated answers from ChatGPT, Claude, Perplexity, and Gemini. Learn what determines it.',
  path: '/answers/what-is-ai-visibility',
  keywords: ['what is AI visibility', 'AI visibility definition', 'AI brand visibility'],
});

export default function WhatIsAiVisibilityPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / What is AI visibility"
      title="What is AI visibility?"
      path="/answers/what-is-ai-visibility"
      directAnswer="AI visibility is how often and how accurately your brand, business, or content appears in AI-generated answers. High AI visibility means AI engines like ChatGPT, Claude, Perplexity, and Gemini cite and recommend you when users ask relevant questions. Low AI visibility means you are absent from those answers."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            AI visibility is distinct from traditional search visibility. In search, visibility means
            appearing in a list of results. In AI answers, visibility means being cited in the synthesized
            response an AI engine produces. There is no ranked list — either you appear in the answer
            or you do not.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            AI visibility is measured by running structured sets of buyer-intent prompts across the
            relevant AI engines and recording citation rate, mention context, and competitive share.
            A business with 40% AI visibility across its target prompts is cited in 40% of the
            relevant queries. A competitor with 70% visibility is winning a larger share of buyer attention.
          </p>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">What determines AI visibility</h2>
          <ul className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed list-disc list-inside">
            <li>Entity clarity: how well AI engines understand who you are and what you do</li>
            <li>Content depth: whether your pages directly answer the questions buyers ask AI tools</li>
            <li>Schema markup: structured data that makes your business machine-readable</li>
            <li>Competitive coverage: presence in comparison content and category lists</li>
            <li>Mention consistency: how reliably you are cited across multiple sources</li>
            <li>AI crawler access: whether GPTBot, ClaudeBot, and PerplexityBot can read your pages</li>
          </ul>
        </div>
      }
      relatedQuestions={[
        { question: 'What is AI search visibility?', href: '/ai-search-visibility' },
        { question: 'What is AEO?', href: '/answers/what-is-aeo' },
        { question: 'How do I improve my ChatGPT visibility?', href: '/answers/how-to-improve-chatgpt-visibility' },
      ]}
      relatedPages={[
        { title: 'AI Search Visibility', href: '/ai-search-visibility' },
        { title: 'Answer Engine Optimization', href: '/answer-engine-optimization' },
        { title: 'Glossary', href: '/glossary' },
        { title: 'Pricing', href: '/pricing' },
      ]}
      faqs={[
        {
          question: 'Is AI visibility the same as brand visibility?',
          answer: 'AI visibility is a specific subset of brand visibility. It specifically measures how your brand is represented in AI-generated answers, not just overall awareness or search presence.',
        },
        {
          question: 'Can I measure AI visibility myself without a tool?',
          answer: 'You can do rough manual testing by running prompts across ChatGPT, Claude, and Perplexity yourself. However, systematic measurement across prompt variations, multiple engines, and competitor comparisons requires a structured workflow that tools like Rhemic automate.',
        },
      ]}
    />
  );
}

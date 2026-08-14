import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'What Is AI Visibility?',
  description:
    'AI visibility is how often and how accurately your brand appears in AI-generated answers from ChatGPT, Claude, Perplexity, and Gemini. Learn what determines it.',
  path: '/answers/what-is-ai-visibility',
  keywords: [
    'what is AI visibility',
    'AI visibility definition',
    'AI brand visibility',
    'visibility in ai',
    'llm visibility meaning',
    'ai content visibility',
    'how to appear in ai answers',
    'get found in ai answers',
    'show up in chatgpt',
  ],
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

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Other names for the same thing
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            The category is young and the vocabulary has not settled. LLM visibility, AI search
            visibility, AI content visibility, answer engine visibility, and generative visibility
            all describe the same measurement: how often an AI engine names you when someone asks a
            question you should win. The discipline of improving it is called answer engine
            optimization (AEO) when the work is on your own pages, and generative engine
            optimization (GEO) when the work is on the sources the engine reads before it answers.
          </p>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            How to appear in AI answers
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Getting found in AI answers follows a repeatable order. Confirm the engines can crawl
            you. Give each buyer question a page that answers it directly in the first paragraph, in
            language a model can lift verbatim. Mark the page up so the facts are machine-readable.
            Make sure the sources the engine already trusts describe your business accurately and
            consistently. Then measure the same prompt set on a schedule, because answers move.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            One practical detail decides more outcomes than most people expect. ChatGPT search and
            Microsoft Copilot ground on the Bing index. A business that Bing has barely indexed will
            stay absent from those two engines regardless of how good its pages are, which makes
            Bing Webmaster Tools setup a prerequisite rather than an afterthought.
          </p>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            How AI visibility differs from ranking
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            A search ranking is relative and gradual: position 11 still exists and can climb. An AI
            answer is closer to binary. The engine names three businesses, or five, and everyone else
            is absent from the response entirely. This is why competitors who rank below you on
            Google can still be the ones an AI engine recommends, and why AI visibility needs its own
            measurement rather than an inference from rankings.
          </p>
        </div>
      }
      relatedQuestions={[
        { question: 'What is AI search visibility?', href: '/ai-search-visibility' },
        { question: 'What is AEO?', href: '/answers/what-is-aeo' },
        { question: 'How do I improve my ChatGPT visibility?', href: '/answers/how-to-improve-chatgpt-visibility' },
        { question: 'Why does my competitor show up in AI answers?', href: '/answers/why-your-competitor-shows-up-in-ai-answers' },
        { question: 'Which sources do AI engines cite about my industry?', href: '/answers/which-sources-ai-engines-cite' },
        { question: 'How much does an AI visibility audit cost?', href: '/answers/ai-visibility-audit-cost' },
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
        {
          question: 'What does LLM visibility mean?',
          answer: 'LLM visibility is another name for AI visibility. It measures how often a large language model names your business in its answer when someone asks a question you should win, and how accurately it describes you when it does.',
        },
        {
          question: 'How do I get found in AI answers?',
          answer: 'Confirm AI crawlers can reach your site, give each buyer question a page that answers it directly in the opening paragraph, mark those pages up with schema so the facts are machine-readable, get the sources the engine already trusts to describe you accurately, and then re-measure the same prompt set on a schedule.',
        },
        {
          question: 'Why do I rank on Google but never appear in ChatGPT?',
          answer: 'Ranking and citation are different mechanisms. ChatGPT search and Microsoft Copilot ground on the Bing index rather than Google, so strong Google rankings do not carry over. A site that Bing has barely indexed stays absent from those engines until its Bing coverage improves.',
        },
      ]}
    />
  );
}

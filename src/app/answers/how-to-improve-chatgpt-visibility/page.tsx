import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How to Improve Your ChatGPT Visibility',
  description:
    'Practical steps to improve how your business appears in ChatGPT answers: entity clarity, schema markup, FAQ structure, content depth, and AI crawler access.',
  path: '/answers/how-to-improve-chatgpt-visibility',
  keywords: ['improve ChatGPT visibility', 'get recommended by ChatGPT', 'ChatGPT business recommendations'],
});

export default function HowToImproveChatgptVisibilityPage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / How to improve ChatGPT visibility"
      title="How to improve your ChatGPT visibility"
      path="/answers/how-to-improve-chatgpt-visibility"
      directAnswer="To improve your ChatGPT visibility, start with entity clarity — make sure your business name, category, services, and location are unambiguous across your site and schema. Add FAQPage schema that directly answers buyer questions. Ensure GPTBot is allowed in your robots.txt. Deepen service pages with specific, structured content. Appear in comparison and category content that ChatGPT uses as reference."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            ChatGPT (and OpenAI&apos;s broader system) uses web-sourced data, structured content,
            and training signals to decide which businesses to recommend. The improvements that
            matter most are those that help its systems understand your business clearly and
            consistently.
          </p>
          <div className="space-y-3">
            {[
              { label: 'Allow GPTBot in robots.txt', detail: 'OpenAI\'s crawler is called GPTBot. If your robots.txt blocks it, ChatGPT cannot read your content. Verify your robots.txt explicitly allows GPTBot.' },
              { label: 'Add Organization schema', detail: 'A well-structured Organization schema block on every page tells ChatGPT\'s systems exactly who you are, what you do, and where you are located. This is the single highest-leverage structural change most businesses can make.' },
              { label: 'Add FAQPage schema', detail: 'FAQPage schema turns your FAQ content into structured question-answer pairs that AI systems can parse cleanly. Include the buyer questions you want to be cited on.' },
              { label: 'Write direct service pages', detail: 'ChatGPT recommends businesses whose pages directly answer the questions buyers ask. Rewrite vague service pages to lead with specific answers, clear service descriptions, and concrete outcomes.' },
              { label: 'Appear in comparison content', detail: 'ChatGPT frequently synthesizes answers from comparison pages and category lists. If you are absent from "best X in [city]" and "X vs Y" content, you will not appear in shortlist answers.' },
              { label: 'Build consistent off-site citations', detail: 'Consistent NAP (Name, Address, Phone) across directories, review platforms, and authoritative content reinforces entity recognition.' },
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
        { question: 'How to improve Perplexity visibility?', href: '/answers/how-to-improve-perplexity-visibility' },
        { question: 'Why does your competitor show up in AI answers?', href: '/answers/why-your-competitor-shows-up-in-ai-answers' },
        { question: 'What is AEO?', href: '/answers/what-is-aeo' },
      ]}
      relatedPages={[
        { title: 'AI Search Visibility', href: '/ai-search-visibility' },
        { title: 'Answer Engine Optimization', href: '/answer-engine-optimization' },
        { title: 'Free AI Visibility Check', href: '/free-ai-visibility-check' },
        { title: 'Pricing', href: '/pricing' },
      ]}
      faqs={[
        {
          question: 'Does having more backlinks help ChatGPT visibility?',
          answer: 'Authority signals matter, but ChatGPT visibility is more directly driven by entity clarity, content structure, and whether your pages answer buyer questions. Backlinks alone will not move you into recommendations.',
        },
        {
          question: 'How fast can ChatGPT visibility improve?',
          answer: 'Technical fixes like robots.txt and schema can be implemented immediately. ChatGPT\'s reflection of those changes depends on when it last crawled and updated its model. Content changes typically take longer to propagate than technical fixes.',
        },
      ]}
    />
  );
}

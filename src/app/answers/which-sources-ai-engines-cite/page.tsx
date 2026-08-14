import type { Metadata } from 'next';
import AnswerPageLayout from '@/components/shared/AnswerPageLayout';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How to Find Which Sources AI Engines Cite About Your Industry',
  description:
    'Perplexity, ChatGPT, and Gemini each ground their answers on a small set of repeat sources. Here is how to find which ones they use for your category, and how to get represented there.',
  path: '/answers/which-sources-ai-engines-cite',
  keywords: [
    'how do i find out which sources perplexity is citing',
    'which sources do ai engines cite',
    'ai engine citation sources',
    'is there a tool that shows how ai platforms describe my company',
    'ai engine audit',
  ],
});

export default function WhichSourcesAiEnginesCitePage() {
  return (
    <AnswerPageLayout
      subtitle="Answers / Which sources AI engines cite"
      title="How do I find out which sources AI engines cite about my industry?"
      path="/answers/which-sources-ai-engines-cite"
      directAnswer="Run the buyer-intent prompts your customers actually type, on each engine, and record the citations the engine shows. Perplexity and Microsoft Copilot list their sources directly under the answer. ChatGPT and Gemini show sources when the answer triggers a web search. Repeat each prompt several ways across several days, then count which domains appear again and again. Those repeat domains are what the engine grounds on for your category, and they are the list worth getting represented on."
      details={
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Answer engines do not read the whole web when they answer a question. They ground on a
            narrow set of sources they already trust for that category. For most local and service
            categories that set is smaller than people expect, often ten to thirty domains, and it is
            stable enough to be worth mapping deliberately.
          </p>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">The method, step by step</h2>
          <ol className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed list-decimal list-inside">
            <li>
              Write the prompts a buyer types, in their words. &ldquo;Best HVAC company in
              Plano&rdquo; behaves differently from &ldquo;who should I call for emergency AC
              repair.&rdquo;
            </li>
            <li>
              Run each prompt on Perplexity, ChatGPT, Gemini, Claude, and Microsoft Copilot. Use a
              signed-out or fresh session so personalization stays out of the result.
            </li>
            <li>
              Record every cited domain, the position of each citation, and whether your business
              appears in the answer text.
            </li>
            <li>
              Re-run the same prompts on different days. Answers drift, so one run tells you very
              little.
            </li>
            <li>
              Count domain frequency across all runs. Sort by how often each domain appears rather
              than by how authoritative it looks.
            </li>
            <li>
              Compare the resulting list against where your business is currently present, reviewed,
              and described accurately.
            </li>
          </ol>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            Which engines show their sources
          </h2>
          <ul className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed list-disc list-inside">
            <li>
              <strong className="text-[var(--text-primary)]">Perplexity</strong> lists numbered
              citations under every answer, which makes it the fastest engine to audit.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Microsoft Copilot</strong> shows
              footnoted sources and grounds on the Bing index, so Bing coverage predicts Copilot
              coverage closely.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">ChatGPT</strong> shows sources when the
              answer triggers a search. Answers from model memory alone carry no citations, which is
              itself a signal about how the model already describes you.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Gemini</strong> surfaces sources through
              its verification control and inside Google AI Overviews.
            </li>
            <li>
              <strong className="text-[var(--text-primary)]">Claude</strong> cites when web search is
              enabled for the conversation.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            What the source list usually contains
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            For local and service categories the repeat sources are rarely competitor websites. They
            are review platforms, directories, community threads, licensing and association
            registries, local press, and comparison roundups. This is why answer-engine work splits
            into two halves: making your own pages quotable, and getting represented in the sources
            the engine already reads. Rhemic treats the second half as generative engine
            optimization.
          </p>

          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            A detail worth checking first
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Before auditing sources, confirm the engines can read your site at all. Check that your
            robots.txt allows GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, and Google-Extended. A
            business blocked at the robots layer will stay absent from answers no matter how strong
            its content is.
          </p>
        </div>
      }
      relatedQuestions={[
        { question: 'How much does an AI visibility audit cost?', href: '/answers/ai-visibility-audit-cost' },
        { question: 'Why does my competitor show up in AI answers?', href: '/answers/why-your-competitor-shows-up-in-ai-answers' },
        { question: 'How do I improve my Perplexity visibility?', href: '/answers/how-to-improve-perplexity-visibility' },
        { question: 'What is AI visibility?', href: '/answers/what-is-ai-visibility' },
      ]}
      relatedPages={[
        { title: 'Generative Engine Optimization', href: '/services/geo' },
        { title: 'Answer Engine Optimization', href: '/services/aeo' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'How it works', href: '/how-it-works' },
      ]}
      faqs={[
        {
          question: 'How do I find out which sources Perplexity is citing for queries about my industry?',
          answer: 'Run your buyer-intent prompts on Perplexity in a signed-out session and read the numbered citations under each answer. Repeat each prompt several ways across several days, then count which domains recur. The recurring domains are what Perplexity grounds on for your category.',
        },
        {
          question: 'Is there a tool that shows how AI platforms describe my company?',
          answer: 'Manual prompting shows you a snapshot at no cost. Tracking description accuracy and citation share over time, across several engines and against named competitors, requires a structured workflow. Rhemic runs that measurement as part of its engagements.',
        },
        {
          question: 'Why do AI engines cite an association or directory instead of my own site?',
          answer: 'Engines prefer sources they already treat as neutral and authoritative for a category. A directory or association page that describes many providers reads as a reference; a company page describing itself reads as a claim. Getting represented accurately in those reference sources is usually faster than trying to displace them.',
        },
        {
          question: 'How often should I re-check which sources an engine cites?',
          answer: 'Monthly is enough for most local categories. Answers drift continuously, so a single audit ages quickly, and a dated baseline you can compare against matters more than any one run.',
        },
      ]}
      ctaLabel="Get the audit"
      ctaHref="/pricing"
    />
  );
}

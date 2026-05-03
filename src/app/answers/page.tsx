import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Answers — AI Visibility and AEO Questions',
  description:
    'Direct answers to common questions about AI search visibility, Answer Engine Optimization (AEO), and how to improve how your business appears in AI-generated answers.',
  path: '/answers',
  keywords: ['AEO questions', 'AI visibility answers', 'answer engine optimization FAQ'],
});

const answerPages = [
  {
    href: '/answers/what-is-rhemic-ai',
    title: 'What is Rhemic AI?',
    description: 'An AI visibility platform that helps businesses track and improve how they appear in AI-generated answers.',
  },
  {
    href: '/answers/what-is-aeo',
    title: 'What is AEO (Answer Engine Optimization)?',
    description: 'AEO is the practice of making your website and brand easier for AI answer engines to understand, cite, and recommend.',
  },
  {
    href: '/answers/what-is-ai-visibility',
    title: 'What is AI visibility?',
    description: 'How often and how accurately your brand appears in AI-generated answers from tools like ChatGPT, Claude, and Perplexity.',
  },
  {
    href: '/answers/how-does-rhemic-ai-work',
    title: 'How does Rhemic AI work?',
    description: 'Rhemic runs visibility audits across AI engines, identifies gaps, and delivers prioritized fixes to improve your recommendation rate.',
  },
  {
    href: '/answers/who-is-rhemic-ai-for',
    title: 'Who is Rhemic AI for?',
    description: 'Local businesses, SMBs, and agencies that want to measure and improve how AI engines recommend them.',
  },
  {
    href: '/answers/how-to-improve-chatgpt-visibility',
    title: 'How do I improve my ChatGPT visibility?',
    description: 'Entity clarity, schema markup, FAQ content, and AI crawler access are the four levers that move ChatGPT recommendation rates.',
  },
  {
    href: '/answers/how-to-improve-perplexity-visibility',
    title: 'How do I improve my Perplexity visibility?',
    description: 'Perplexity cites real sources. Crawlability, authoritative content, and structured data are the key inputs.',
  },
  {
    href: '/answers/how-local-businesses-can-show-up-in-ai-answers',
    title: 'How can local businesses show up in AI answers?',
    description: 'Google Business Profile optimization, LocalBusiness schema, and direct-answer content are the highest-leverage starting points.',
  },
  {
    href: '/answers/how-marketing-agencies-can-sell-ai-visibility',
    title: 'How can marketing agencies sell AI visibility?',
    description: 'How to position, package, and deliver AI visibility as a productized service to clients.',
  },
  {
    href: '/answers/why-your-competitor-shows-up-in-ai-answers',
    title: 'Why does my competitor show up in AI answers and I do not?',
    description: 'Entity clarity, content depth, schema coverage, and competitive mention signals are the usual culprits.',
  },
];

export default function AnswersIndexPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />

      <PageHero
        subtitle="Answers"
        title="AI visibility and AEO questions"
        description="Direct answers to common questions about AI search visibility and Answer Engine Optimization."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-3">
            {answerPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="flex flex-col gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-6 py-5 hover:border-[var(--border-default)] transition-all duration-200"
              >
                <span className="text-sm font-semibold text-[var(--text-primary)]">{page.title}</span>
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{page.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

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
  title: 'How to Show Up in AI Answers: A Plain-Language Guide',
  description:
    'A practical, non-technical guide to getting your business recommended in ChatGPT, Claude, Perplexity, and Gemini answers — written for business owners, not developers.',
  path: '/show-up-in-ai-answers',
  keywords: ['show up in AI answers', 'get recommended by ChatGPT', 'appear in AI search', 'AI recommendation guide'],
});

const faqs = [
  {
    question: 'How do AI tools decide which businesses to recommend?',
    answer: 'AI tools synthesize answers from their training data and live web sources. They recommend businesses whose information is clear, consistent, and directly answers the buyer\'s question. There is no paid placement. Clarity and relevance drive recommendations.',
  },
  {
    question: 'Do I need to pay AI companies to show up?',
    answer: 'No. AI answer recommendations are organic. They are based on how well your business is understood and how relevant it is to the buyer\'s question. The work is on your end: clearer information, better content, and proper structured data.',
  },
  {
    question: 'How long does it take to start showing up?',
    answer: 'Technical fixes can be implemented immediately. AI engines reflect those changes on their own crawl and update schedule, which varies by platform. Most businesses see meaningful directional movement within 30-90 days of focused improvements.',
  },
  {
    question: 'What is the single most important thing I can do?',
    answer: 'Define your business clearly. Make sure your name, what you do, who you serve, where you are, and what makes you different are stated explicitly and consistently on your website. Everything else builds on that foundation.',
  },
];

export default function ShowUpInAiAnswersPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="show-up-ai-answers-schemas"
        service={{
          name: 'How to show up in AI answers',
          description: 'A plain-language guide to improving your business visibility in AI-generated answers.',
          path: '/show-up-in-ai-answers',
          audience: 'Business owners, founders, and non-technical operators',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="AI Answer Visibility"
        title="How to show up when customers ask AI for recommendations"
        description="A plain-language guide for business owners. No jargon. Just the things that actually move the needle."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          {/* The core idea */}
          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              The core idea
            </p>
            <p className="text-xl leading-relaxed text-[var(--text-primary)]">
              When someone asks ChatGPT or Perplexity to recommend a business, the AI picks whoever
              it understands most clearly and who most directly answers the question. The businesses
              that show up are not paying for placement. They have just done a better job of making
              themselves easy for AI to understand and recommend.
            </p>
          </section>

          {/* 5 plain-language things */}
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">5 things you can do right now</h2>
            <div className="space-y-5">
              {[
                {
                  num: '1',
                  title: 'Say clearly who you are and what you do',
                  body: 'Your website homepage should start with a plain sentence: "We are [business name], a [type of business] in [location]. We help [type of customer] with [specific service]." AI tools scan that sentence. If it is vague or missing, they move on to someone clearer.',
                },
                {
                  num: '2',
                  title: 'Write pages that answer the questions your customers actually ask',
                  body: 'Think about the questions people ask before hiring you. How much does it cost? How long does it take? What areas do you serve? Do you offer emergency appointments? Write a page that answers each of those questions directly. AI tools cite pages that answer questions, not pages that just list services.',
                },
                {
                  num: '3',
                  title: 'Make sure review platforms have consistent information',
                  body: 'Your name, address, and phone number should be exactly the same on Google, Yelp, your website, and any other directory. Inconsistency confuses AI tools. Consistency builds confidence.',
                },
                {
                  num: '4',
                  title: 'Do not block the AI crawlers',
                  body: 'There is a file on your website called robots.txt. It tells crawlers what they can and cannot read. If it was set up to block advertising crawlers, it may also be blocking the AI crawlers that feed ChatGPT and Perplexity. Your developer can check this in about five minutes.',
                },
                {
                  num: '5',
                  title: 'Get more reviews and respond to them',
                  body: 'Reviews are one of the signals AI tools use to assess business quality. More recent, detailed reviews on reputable platforms improve your recommendation probability, especially for local service queries.',
                },
              ].map(({ num, title, body }) => (
                <div key={num} className="flex gap-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                  <span className="text-2xl font-extrabold text-[var(--text-muted)] font-display shrink-0 w-8">{num}</span>
                  <div>
                    <h3 className="mb-2 font-bold text-[var(--text-primary)]">{title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* If you want a full audit */}
          <section className="mb-16 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">If you want a full picture</h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              The 5 steps above are the high-leverage, easy-to-start actions. A full AI visibility audit
              goes deeper: it tests the actual prompts your customers are typing, shows you exactly which
              competitors are appearing in your place, and gives you a specific, prioritized list of what
              to change. That is what Rhemic does.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-[5px] bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                See what a full audit costs
              </Link>
              <Link
                href="/sample-ai-visibility-report"
                className="inline-flex items-center justify-center rounded-[5px] border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                See a sample report first
              </Link>
            </div>
          </section>
        </div>

        <SubpageFAQ heading="Showing up in AI answers: FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          { title: 'For Local Businesses', description: 'Local-specific AI visibility guide.', href: '/for-local-businesses' },
          { title: 'AI Search Visibility for Small Businesses', description: 'Practical steps for small operators.', href: '/ai-search-visibility-for-small-businesses' },
          { title: 'Free AI Visibility Check', description: 'See where you stand today.', href: '/free-ai-visibility-check' },
        ]}
      />

      <Footer />
    </main>
  );
}

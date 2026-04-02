import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ: AI Engine Optimization, AI Visibility Audits, and Rhemic AI',
  description:
    'Answers to the highest-intent questions about AI Engine Optimization, AI visibility audits, pricing, local business discovery, and how Rhemic AI works.',
  path: '/faq',
  keywords: ['AEO FAQ', 'AI visibility FAQ', 'AI Engine Optimization questions', 'Rhemic AI FAQ'],
});

const faqs = [
  {
    question: 'What is AI Engine Optimization (AEO)?',
    answer:
      'AI Engine Optimization is the practice of making your website easier for AI answer engines to understand, cite, and recommend. It combines entity clarity, strong content structure, schema markup, and measurable visibility tracking across tools like ChatGPT, Claude, Perplexity, and Gemini.',
  },
  {
    question: 'How is AEO different from traditional SEO?',
    answer:
      'Traditional SEO is built around ranking pages in search results. AEO is built around earning inclusion in generated answers. The overlap is real, but answer engines reward clearer definitions, stronger structured data, better topical coverage, and pages that directly answer buyer questions.',
  },
  {
    question: 'What is an AI visibility audit?',
    answer:
      'An AI visibility audit measures how well your site is understood by answer engines. It reviews crawlability, schema coverage, entity signals, content structure, FAQ coverage, competitor presence, and whether your brand appears in the prompts that matter to your market.',
  },
  {
    question: 'Why is my business not showing up in AI answers?',
    answer:
      'The usual causes are weak entity clarity, thin or generic service pages, missing schema, shallow FAQ coverage, poor competitive coverage, or stronger alternatives that answer the prompt more directly. The fix is rarely one tag. It is usually a focused combination of technical cleanup and better content depth.',
  },
  {
    question: 'What does Rhemic AI actually measure?',
    answer:
      'Rhemic measures the factors that drive recommendation probability: visibility score, topic coverage, mention consistency, competitive share, and brand share across AI answer engines. The goal is not vanity traffic. The goal is whether your brand appears in the answer.',
  },
  {
    question: 'What does a typical AI visibility report include?',
    answer:
      'A typical report includes your baseline visibility metrics, prompt coverage, competitor benchmarking, structural issues, content gaps, schema opportunities, and a prioritized implementation plan. Good reports do not stop at diagnosis. They tell you what to fix first and why.',
  },
  {
    question: 'How long does it take to see results from AEO?',
    answer:
      'The diagnostic work happens quickly. Visibility movement depends on how fast the fixes are implemented and how much authority already exists around your brand. Teams that ship structural improvements and deepen key pages usually see directional movement faster than teams that only publish surface-level content.',
  },
  {
    question: 'How much does AI Engine Optimization usually cost?',
    answer:
      'Cost depends on scope. Some teams need only audits and implementation guidance. Others need recurring tracking, competitor monitoring, and content expansion. Rhemic keeps pricing transparent on the pricing page so buyers can map spend to a defined scope instead of a vague retainer.',
  },
  {
    question: 'What should I look for in an AI visibility platform?',
    answer:
      'Look for prompt-level visibility tracking, competitor analysis, actionable recommendations, schema support, content-gap identification, and implementation outputs your team can actually ship. A dashboard without a playbook is not enough.',
  },
  {
    question: 'Can local businesses benefit from AEO?',
    answer:
      'Yes. Local service businesses are increasingly discovered through AI recommendations for nearby providers, best-in-city lists, and comparison questions. Local AEO requires especially strong service clarity, geographic signals, trust indicators, and FAQ content.',
  },
  {
    question: 'Is AI search replacing Google for local recommendations?',
    answer:
      'It is not a full replacement, but buyer behavior is clearly shifting. More searches start as conversational prompts, and many users accept the shortlist they receive. That means local businesses now need visibility in both search engines and answer engines.',
  },
  {
    question: 'How do I track if my brand is being mentioned by AI?',
    answer:
      'You need recurring prompt testing across the engines that matter, plus a way to compare your mention frequency and answer-share against competitors over time. Rhemic is designed to turn that monitoring into a repeatable operational workflow.',
  },
  {
    question: 'Does schema markup really matter for AI answers?',
    answer:
      'Yes. Schema will not compensate for weak content, but it gives answer engines cleaner signals about who you are, what you do, how your pages are organized, and which questions a page answers. It is one of the highest-leverage technical improvements for AEO.',
  },
  {
    question: 'What kinds of pages help the most with AI visibility?',
    answer:
      'The highest-leverage pages are usually product pages, service pages, pricing, comparison pages, FAQ pages, case studies, and glossary-style definitions. These are the pages that make your business legible to both buyers and models.',
  },
  {
    question: 'Do I need engineers to improve AI visibility?',
    answer:
      'Not always, but engineering support helps when schema, metadata, page templates, or CMS constraints are involved. The most effective workflow is shared ownership: marketing drives content and positioning while engineering ships the structural improvements cleanly.',
  },
  {
    question: 'How does Rhemic AI help agencies?',
    answer:
      'Rhemic gives agencies a way to productize AI visibility work: recurring audits, competitive monitoring, implementation-ready outputs, and a clear narrative for clients who want to know why their brand is absent from AI recommendations.',
  },
  {
    question: 'Can Rhemic generate implementation guidance instead of just reports?',
    answer:
      'Yes. Rhemic is built to connect findings to execution. That includes prioritized recommendations and code-oriented outputs that help teams ship schema, metadata, and content structure changes faster.',
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />

      <PageHero
        subtitle="FAQ"
        title="Straight answers about AI visibility."
        description="The operational questions buyers, founders, and agencies ask before they invest in AI Engine Optimization."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              Definition
            </p>
            <p className="text-xl text-[var(--text-primary)] leading-relaxed">
              AI Engine Optimization is the work required to make your business understandable and recommendable inside AI-generated answers, not just visible in search results.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                Review pricing
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                See how it works
              </Link>
            </div>
          </section>
        </div>

        <SubpageFAQ heading="AI Visibility FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        heading="Continue the evaluation"
        links={[
          {
            title: 'How It Works',
            description: 'See the audit, analysis, recommendation, and implementation workflow step by step.',
            href: '/how-it-works',
          },
          {
            title: 'Pricing',
            description: 'Compare the plan structures for businesses and agencies.',
            href: '/pricing',
          },
          {
            title: 'Free AI Visibility Check',
            description: 'Run the public scan flow without inventing a fake tool.',
            href: '/free-ai-visibility-check',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

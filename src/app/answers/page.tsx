import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, absoluteUrl, siteConfig } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Answers: AI Visibility, AI Search, and Answer Engine Optimization',
  description:
    'Direct answers on AI visibility, why competitors get named in AI answers, which sources AI engines cite, what an AI visibility audit costs, and how to show up in ChatGPT, Perplexity, and Google AI Overviews.',
  path: '/answers',
  keywords: [
    'ai visibility answers',
    'answer engine optimization',
    'how to appear in ai answers',
    'ai search visibility',
  ],
});

type AnswerPage = { href: string; title: string; description: string };
type AnswerCluster = { heading: string; blurb: string; pages: AnswerPage[] };

/**
 * Grouped as clusters rather than a flat list. Each group is a topic an
 * answer engine treats as one question space, and the hub is the page that
 * ties them together. Keep every /answers/* route listed here — an answer
 * page with no route into it from this hub earns no internal link at all.
 */
const clusters: AnswerCluster[] = [
  {
    heading: 'Losing AI answers to a competitor',
    blurb:
      'What it means when an engine names someone else, and what actually moves it.',
    pages: [
      {
        href: '/answers/why-your-competitor-shows-up-in-ai-answers',
        title: 'Why does my competitor show up in AI answers and I do not?',
        description:
          'The mechanisms that decide who gets named, and why the business that ranks lower on Google can still win the answer.',
      },
      {
        href: '/answers/how-to-improve-chatgpt-visibility',
        title: 'How do I improve my ChatGPT visibility?',
        description:
          'What ChatGPT reads before it answers, and why Bing coverage decides more of the outcome than most people expect.',
      },
      {
        href: '/answers/how-to-improve-perplexity-visibility',
        title: 'How do I improve my Perplexity visibility?',
        description:
          'Perplexity shows its citations, which makes it the fastest engine to audit and the clearest one to work on.',
      },
    ],
  },
  {
    heading: 'Understanding the category',
    blurb: 'The definitions, in plain terms, with the differences that matter.',
    pages: [
      {
        href: '/answers/what-is-ai-visibility',
        title: 'What is AI visibility?',
        description:
          'How often and how accurately AI engines name your business, why it is closer to binary than ranking, and what determines it.',
      },
      {
        href: '/answers/what-is-aeo',
        title: 'What is AEO?',
        description:
          'Answer engine optimization: making your own pages quotable by the engines that answer buyer questions.',
      },
      {
        href: '/answers/how-local-businesses-can-show-up-in-ai-answers',
        title: 'How can local businesses show up in AI answers?',
        description:
          'The order of operations for a local or service business, from crawler access through to citation share.',
      },
    ],
  },
  {
    heading: 'Auditing and measuring',
    blurb: 'What to measure, how to find it yourself, and what the work costs.',
    pages: [
      {
        href: '/answers/which-sources-ai-engines-cite',
        title: 'Which sources do AI engines cite about my industry?',
        description:
          'A repeatable method for mapping the small set of domains an engine grounds on for your category.',
      },
      {
        href: '/answers/ai-visibility-audit-cost',
        title: 'How much does an AI visibility audit cost?',
        description:
          'Published pricing, what moves the number, and what a real audit should hand you.',
      },
    ],
  },
  {
    heading: 'About Rhemic',
    blurb: 'What the company does and who it serves.',
    pages: [
      {
        href: '/answers/what-is-rhemic-ai',
        title: 'What is Rhemic AI?',
        description:
          'A search and answer-engine visibility firm for local and SMB service businesses.',
      },
      {
        href: '/answers/who-is-rhemic-ai-for',
        title: 'Who is Rhemic AI for?',
        description:
          'Local and SMB service operators, vertical-agnostic, leading with home services.',
      },
      {
        href: '/answers/how-does-rhemic-ai-work',
        title: 'How does Rhemic AI work?',
        description:
          'The four service lines and how an engagement runs from audit through to measured citation share.',
      },
      {
        href: '/answers/how-marketing-agencies-can-sell-ai-visibility',
        title: 'How can marketing agencies sell AI visibility?',
        description:
          'How agencies position and price answer-engine work for their own clients.',
      },
    ],
  },
];

const allPages = clusters.flatMap((c) => c.pages);

export default function AnswersIndexPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Rhemic AI answers',
    description:
      'Direct answers on AI visibility, answer engine optimization, and getting named in AI-generated answers.',
    url: absoluteUrl('/answers'),
    numberOfItems: allPages.length,
    itemListElement: allPages.map((page, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: page.title,
      url: absoluteUrl(page.href),
    })),
    isPartOf: { '@type': 'WebSite', url: siteConfig.url, name: siteConfig.name },
  };

  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />
      <JsonLd id="answers-item-list" data={itemListSchema} />

      <PageHero
        subtitle="Answers"
        title="Direct answers on AI visibility."
        description="When a customer asks an AI engine who to call, one business gets named. These pages explain how that decision gets made, how to measure where you stand, and what changes it."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6 space-y-12">
          {clusters.map((cluster) => (
            <section key={cluster.heading}>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{cluster.heading}</h2>
              <p className="mt-1 mb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                {cluster.blurb}
              </p>
              <div className="space-y-3">
                {cluster.pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="flex flex-col gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-6 py-5 hover:border-[var(--border-default)] transition-all duration-200"
                  >
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {page.title}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {page.description}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-6 py-6">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Where this work happens
            </h2>
            <p className="mt-1 mb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
              The four service lines behind the answers above.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { title: 'Answer engine optimization', href: '/services/aeo' },
                { title: 'Generative engine optimization', href: '/services/geo' },
                { title: 'SEO', href: '/services/seo' },
                { title: 'Google Business Profile', href: '/services/google-business-profile' },
                { title: 'Pricing', href: '/pricing' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg border border-[var(--border-subtle)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:border-[var(--border-default)] hover:text-[var(--text-primary)] transition-all duration-200"
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

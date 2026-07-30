import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata, absoluteUrl, siteConfig } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Answer Engine Optimization (AEO): The Complete Guide',
  description:
    'Answer Engine Optimization (AEO) is the practice of making your business easier for AI answer engines like ChatGPT, Claude, and Perplexity to understand, cite, and recommend.',
  path: '/answer-engine-optimization',
  keywords: [
    'answer engine optimization',
    'AEO',
    'AI engine optimization',
    'AEO guide',
    'AEO strategy',
    'AEO for businesses',
    'optimize for ChatGPT',
    'generative engine optimization',
  ],
});

const faqs = [
  {
    question: 'What is Answer Engine Optimization (AEO)?',
    answer:
      'Answer Engine Optimization (AEO) is the practice of making your website, content, and brand easier for AI-powered answer engines to understand, cite, and recommend. It covers entity clarity, structured data, content depth, FAQ structure, competitive coverage, and crawlability for AI systems.',
  },
  {
    question: 'Is AEO the same as GEO (Generative Engine Optimization)?',
    answer:
      'AEO and GEO refer to overlapping practices. GEO tends to focus on the generative AI layer (LLMs producing answers), while AEO is broader and includes traditional answer engines like featured snippets. In practice, most teams use the terms interchangeably.',
  },
  {
    question: 'How does AEO differ from SEO?',
    answer:
      'SEO targets search engine rankings and click-through rates. AEO targets inclusion in synthesized answers that AI engines produce in response to natural language questions. The signals overlap in some areas (schema, content authority) but diverge significantly in others (entity clarity, FAQ structure, direct answer framing).',
  },
  {
    question: 'What is the first step in AEO?',
    answer:
      'The first step is an AI visibility audit. You need to know your current citation rate across the AI engines your buyers use, which competitors are cited instead, and what content and structural gaps are causing your absence. Without that baseline, you are optimizing blind.',
  },
  {
    question: 'How long does AEO take to work?',
    answer:
      'Technical fixes like schema markup and robots.txt improvements can be implemented immediately. Content depth improvements typically take days to weeks to produce. Citation pattern changes in AI engines follow their own retraining and indexing cycles, which vary by platform. Most teams see directional movement within 30-90 days of focused implementation.',
  },
  {
    question: 'Do I need a separate AEO budget from SEO?',
    answer:
      'Not always. Many AEO improvements overlap with SEO: better structured data, clearer page structure, stronger FAQ content, and more specific service pages benefit both. Where AEO adds distinct spend is in prompt-level visibility tracking and AI-specific content that answers conversational buyer questions.',
  },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Answer Engine Optimization (AEO): The Complete Guide',
  description:
    'AEO is the practice of making your business easier for AI answer engines to understand, cite, and recommend.',
  url: absoluteUrl('/answer-engine-optimization'),
  isPartOf: { '@type': 'WebSite', url: siteConfig.url, name: siteConfig.name },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Answer Engine Optimization', item: absoluteUrl('/answer-engine-optimization') },
    ],
  },
};

export default function AnswerEngineOptimizationPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <JsonLd id="aeo-webpage" data={webPageSchema} />
      <PageSchemas
        id="aeo-service-schema"
        service={{
          name: 'Answer Engine Optimization (AEO) Services',
          description:
            'Rhemic AI provides AEO audits, competitive analysis, schema implementation guidance, and visibility tracking to help businesses appear in AI-generated answers.',
          path: '/answer-engine-optimization',
          audience: 'Businesses, marketing teams, agencies, and founders',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Answer Engine Optimization"
        title="AEO: how you get cited in AI answers."
        description="Answer Engine Optimization is the practice of making your business easier for ChatGPT, Claude, Perplexity, and Gemini to understand, cite, and recommend. It is the discipline behind AI search visibility."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          {/* Direct answer */}
          <section className="mb-16 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              Definition
            </p>
            <p className="text-xl leading-relaxed text-[var(--text-primary)]">
              Answer Engine Optimization (AEO) is the work required to make your business clearly understandable
              and recommendable by AI answer engines. It combines technical structure, content clarity,
              and competitive positioning to increase the probability that AI systems cite your brand
              in response to buyer questions.
            </p>
          </section>

          {/* The 5 pillars */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">The five pillars of AEO</h2>
            <div className="space-y-4">
              {[
                {
                  num: '01',
                  label: 'Entity clarity',
                  detail: 'AI engines construct a model of your organization. Your name, location, category, services, and differentiators need to be consistent, specific, and unambiguous across your site, schema markup, and off-site citations. Vague entity signals produce vague or absent recommendations.',
                },
                {
                  num: '02',
                  label: 'Content that directly answers buyer questions',
                  detail: 'AI engines are pattern-matching against questions real buyers ask. Pages that directly answer those questions — clearly, specifically, and with enough depth — are much more likely to be cited. Thin service pages and generic marketing copy do not register.',
                },
                {
                  num: '03',
                  label: 'Structured data and schema markup',
                  detail: 'Schema.org vocabulary gives machines a structured representation of your organization, services, FAQs, articles, and pricing. FAQPage schema is especially high-leverage. BreadcrumbList, Organization, and Service schemas reinforce entity context.',
                },
                {
                  num: '04',
                  label: 'Competitive coverage and mention presence',
                  detail: 'Comparison pages, "best X" lists, and category aggregators are frequently cited sources for AI recommendations. If you are absent from those pages — or those pages do not exist — you will not appear in the answers they feed.',
                },
                {
                  num: '05',
                  label: 'Crawlability and AI crawler access',
                  detail: 'AI engines cannot cite content they cannot read. Your robots.txt, page rendering, and technical SEO health determine whether GPTBot, ClaudeBot, PerplexityBot, and Google-Extended can actually index your pages.',
                },
              ].map(({ num, label, detail }) => (
                <div key={num} className="flex gap-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                  <span className="text-2xl font-extrabold text-[var(--text-muted)] font-display shrink-0 w-10">{num}</span>
                  <div>
                    <h3 className="mb-2 text-base font-bold text-[var(--text-primary)]">{label}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AEO vs SEO comparison */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">AEO vs SEO at a glance</h2>
            <div className="-mx-6 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0">
              <div className="min-w-[680px] overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/10">
                      <th className="w-1/3 px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] font-body"></th>
                      <th className="w-1/3 px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)] font-body">Traditional SEO</th>
                      <th className="w-1/3 px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] font-body">AEO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Goal', 'Rank in search results', 'Appear in AI-generated answers'],
                      ['Output measured', 'Rankings, organic traffic', 'Citation rate, brand share in answers'],
                      ['Key technical lever', 'Backlinks, page speed, crawl health', 'Schema markup, entity clarity, AI crawler access'],
                      ['Key content lever', 'Keywords, E-E-A-T, content depth', 'Direct answers, FAQ structure, topic coverage'],
                      ['Competitor analysis', 'Keyword gap, backlink gap', 'Mention gap, AI recommendation share'],
                      ['Rhemic covers this', 'Yes', 'Yes'],
                    ].map(([label, seo, aeo], i) => (
                      <tr key={label} className={`border-b border-white/[0.05] last:border-0 ${i % 2 === 1 ? 'bg-white/[0.015]' : ''}`}>
                        <td className="px-5 py-4 align-top text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] font-body">{label}</td>
                        <td className="px-5 py-4 align-top text-[var(--text-tertiary)] font-body">{seo}</td>
                        <td className="px-5 py-4 align-top text-[var(--text-primary)] font-body">{aeo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">Start with a visibility audit</h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Rhemic runs AEO audits that tell you exactly where you stand across ChatGPT, Claude, Perplexity,
              and Gemini. You get a baseline visibility score, a competitive benchmark, and a prioritized
              implementation plan.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                See pricing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                Get the audit
              </Link>
            </div>
          </section>
        </div>

        <SubpageFAQ heading="AEO FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          {
            title: 'AI Search Visibility',
            description: 'Understand what AI search visibility is and how it is measured.',
            href: '/ai-search-visibility',
          },
          {
            title: 'Glossary',
            description: 'Definitions for every AEO and AI visibility term you need.',
            href: '/glossary',
          },
          {
            title: 'For Agencies',
            description: 'How to productize AEO as a client-facing service line.',
            href: '/for-agencies',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

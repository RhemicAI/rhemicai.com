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
  title: 'AI Search Visibility: What It Is and How to Improve It',
  description:
    'AI search visibility measures how often your business is cited and recommended by ChatGPT, Claude, Perplexity, and Gemini. Learn what drives it and how to improve it.',
  path: '/ai-search-visibility',
  keywords: [
    'AI search visibility',
    'AI visibility platform',
    'improve AI search visibility',
    'ChatGPT visibility',
    'answer engine visibility',
    'AI recommendation tracking',
  ],
});

const faqs = [
  {
    question: 'What is AI search visibility?',
    answer:
      'AI search visibility is a measure of how often and how accurately your business appears in AI-generated answers across tools like ChatGPT, Claude, Perplexity, and Gemini. It tracks whether AI engines cite, recommend, or mention your brand when users ask relevant questions.',
  },
  {
    question: 'How is AI search visibility different from Google rankings?',
    answer:
      'Google rankings measure where a page appears in a list of links. AI search visibility measures whether your brand is included in the synthesized answer an AI engine produces. There is no page-one list. Either you are in the answer or you are not.',
  },
  {
    question: 'What factors affect AI search visibility?',
    answer:
      'The primary factors are entity clarity (do AI engines understand who you are and what you do), content depth (do your pages directly answer buyer questions), schema markup (is your data machine-readable), competitive coverage (how do you compare to alternatives), and mention consistency across the web.',
  },
  {
    question: 'How do I measure AI search visibility?',
    answer:
      'Measuring AI visibility requires running a structured set of buyer-intent prompts across multiple engines and tracking how often your brand is cited, what context it appears in, and how your citation rate compares to competitors over time. Rhemic automates this process.',
  },
  {
    question: 'Can I improve AI search visibility without changing my website?',
    answer:
      'Some improvements are off-site: building citations, earning mentions in authoritative sources, and improving brand consistency across platforms. But most of the high-leverage work is on-site: schema markup, entity clarity, FAQ structure, and content depth.',
  },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Search Visibility: What It Is and How to Improve It',
  description:
    'AI search visibility measures how often your business is cited and recommended by ChatGPT, Claude, Perplexity, and Gemini.',
  url: absoluteUrl('/ai-search-visibility'),
  isPartOf: { '@type': 'WebSite', url: siteConfig.url, name: siteConfig.name },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'AI Search Visibility', item: absoluteUrl('/ai-search-visibility') },
    ],
  },
};

export default function AiSearchVisibilityPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <JsonLd id="ai-search-visibility-webpage" data={webPageSchema} />
      <PageSchemas
        id="ai-search-visibility-schemas"
        service={{
          name: 'AI Search Visibility Platform',
          description:
            'Rhemic AI measures and improves how often businesses are cited in AI-generated answers across ChatGPT, Claude, Perplexity, and Gemini.',
          path: '/ai-search-visibility',
          audience: 'Businesses, marketing teams, and agencies',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="AI Search Visibility"
        title="Your business needs to show up where buyers are asking."
        description="AI search visibility is the measure of how often and how accurately your brand appears in answers from ChatGPT, Claude, Perplexity, and Gemini. If you are not visible there, buyers who never reach Google do not find you."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">

          {/* Direct answer block */}
          <section className="mb-16 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              Direct Answer
            </p>
            <p className="text-xl leading-relaxed text-[var(--text-primary)]">
              AI search visibility is how often your business is cited and recommended in AI-generated answers.
              It is determined by entity clarity, content structure, schema markup, and competitive coverage.
              Businesses with high AI visibility appear in answers. Businesses with low AI visibility do not.
            </p>
          </section>

          {/* Why it matters */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">Why AI search visibility matters now</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">Buyers start with AI, not Google</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  A growing share of purchase-intent queries now begin as conversational prompts in ChatGPT, Claude, or Perplexity. When someone asks &ldquo;what is the best [service] near me,&rdquo; the answer they receive shapes their entire consideration set.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">No page-two problem — there is no page one</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  In traditional search, appearing on page two is bad but recoverable. In AI answers, you either appear in the response or you do not exist. The stakes of visibility are binary.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">Competitors are already optimizing</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  Early-moving businesses are actively improving their AI visibility. Waiting means yielding your position in shortlists that buyers trust as neutral third-party recommendations.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">It compounds over time</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  AI engines learn from citation patterns, web content, and authority signals. The businesses that establish entity clarity and content depth earliest build a compounding advantage.
                </p>
              </div>
            </div>
          </section>

          {/* What drives it */}
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">What drives AI search visibility</h2>
            <div className="space-y-4">
              {[
                {
                  label: 'Entity clarity',
                  detail: 'AI engines build an internal model of your business. If that model is vague, inconsistent, or confused with a competitor, you will not be cited reliably. Entity clarity means your name, category, services, and location are unambiguous across your site and the web.',
                },
                {
                  label: 'Content depth and directness',
                  detail: 'Pages that directly answer the buyer questions AI engines receive are more likely to be cited. Thin pages, jargon-heavy copy, and generic service descriptions are poor signals. Specific, structured answers perform better.',
                },
                {
                  label: 'Schema markup and structured data',
                  detail: 'Schema.org markup gives AI engines machine-readable context about your organization, services, FAQs, and pricing. It is not a magic fix, but it is one of the highest-leverage technical improvements for AEO.',
                },
                {
                  label: 'Competitive coverage',
                  detail: 'If you are absent from the comparison and "best X" content that buyers and AI engines rely on, you will not appear in shortlists. Being present in the pages AI engines use as sources matters.',
                },
                {
                  label: 'Mention consistency',
                  detail: 'AI engines aggregate signals from many sources. A business that is cited consistently and accurately across directories, press, reviews, and authoritative content builds stronger recommendation probability than one with sparse or inconsistent mentions.',
                },
              ].map(({ label, detail }) => (
                <div key={label} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                  <h3 className="mb-2 text-base font-bold text-[var(--text-primary)]">{label}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How Rhemic measures it */}
          <section className="mb-16 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">How Rhemic measures and improves AI visibility</h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              Rhemic runs structured prompt audits across ChatGPT, Claude, Perplexity, and Gemini to measure your current citation rate. We track which competitors appear in your place, identify the content and structural gaps causing your absence, and deliver a prioritized implementation plan.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                See pricing
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                How it works
              </Link>
            </div>
          </section>
        </div>

        <SubpageFAQ heading="AI Search Visibility FAQ" faqs={faqs} />
      </div>

      <RelatedLinks
        links={[
          {
            title: 'Answer Engine Optimization',
            description: 'The full discipline behind improving AI visibility — what it covers and how to apply it.',
            href: '/answer-engine-optimization',
          },
          {
            title: 'For Local Businesses',
            description: 'How local service businesses can show up in AI recommendations for their area.',
            href: '/for-local-businesses',
          },
          {
            title: 'Sample AI Visibility Report',
            description: 'See what a Rhemic audit looks like before committing.',
            href: '/sample-ai-visibility-report',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

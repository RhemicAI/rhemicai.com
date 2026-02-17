import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import AEOEngine from '@/components/AEOEngine/AEOEngine';
import ProductSchema from '@/components/SchemaOrg/ProductSchema';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import UpdatedDate from '@/components/shared/UpdatedDate';

export const metadata: Metadata = {
  title: 'Competitor Analysis - Track Rivals in AI Search',
  description:
    'Monitor competitors across ChatGPT, Claude, Perplexity, and Gemini. Identify gaps and outrank rivals in AI-generated answers.',
  alternates: { canonical: 'https://rhemicai.com/products/competitor-analysis' },
  openGraph: {
    title: 'Competitor Analysis - Track Rivals in AI Search',
    description:
      'Monitor competitors across ChatGPT, Claude, Perplexity, and Gemini. Identify gaps and outrank rivals.',
    url: 'https://rhemicai.com/products/competitor-analysis',
  },
};

const features = [
  {
    title: 'Multi-Engine Tracking',
    description:
      'Monitor which competitors appear in ChatGPT, Claude, Perplexity, Gemini, and other AI answer engines for your target queries.',
  },
  {
    title: 'Citation Analysis',
    description:
      "See which sources AI engines cite most frequently. Understand why your competitors get mentioned and you don't.",
  },
  {
    title: 'Gap Identification',
    description:
      "Discover opportunities where competitors are weak. Find queries they're missing and claim that visibility for yourself.",
  },
  {
    title: 'Strategy Reverse Engineering',
    description:
      'Analyze what content, schema markup, and technical optimizations your rivals use to dominate AI answers.',
  },
];

const benefits = [
  'Track 5+ competitors across all major AI engines',
  'Automated weekly reports showing ranking changes',
  'Identify low-hanging fruit where you can outrank rivals',
  "Learn from what's working in your industry",
];

export default function CompetitorAnalysisPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <ProductSchema
        name="Rhemic AI Competitor Analysis"
        description="Monitor competitors across ChatGPT, Claude, Perplexity, and Gemini. Identify gaps and outrank rivals in AI-generated answers."
        url="https://rhemicai.com/products/competitor-analysis"
      />
      <FixedNav />

      <PageHero
        subtitle="Competitor Analysis"
        title="Decode rival strategies and outrank them in AI responses."
        description="Know exactly where your competitors appear in AI answers - and how to beat them."
      />

      <div className="mx-auto max-w-5xl px-6 mb-8">
        <UpdatedDate date="2026-02-14" />
      </div>

      <div className="relative z-10 py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Overview */}
          <section className="mb-24">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                How does competitor analysis improve AI visibility?
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                In the AI search economy, visibility isn&apos;t about ranking #1 on Google.
                It&apos;s about being cited in AI-generated answers when customers ask
                questions about your industry.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Our competitor analysis shows you who&apos;s winning in AI search, why they&apos;re
                winning, and exactly what you need to do to outrank them.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              What we analyze
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-colors"
                >
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              What you get
            </h2>
            <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-8">
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-lg text-[var(--text-secondary)]"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="shrink-0 mt-0.5"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-[var(--text-tertiary)]"
                      />
                      <path
                        d="M6 10L9 13L14 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--text-primary)]"
                      />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Engine Demo */}
        <AEOEngine />

        {/* CTA */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                See where your competitors are winning
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
                Book a demo and we&apos;ll show you a live competitor analysis for your
                industry. See which rivals dominate AI answers and how to beat them.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://cal.com/rhemic-ai/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Book a Demo
                </a>
                <Link
                  href="/products"
                  className="px-8 py-4 text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-full hover:bg-[var(--bg-glass-hover)] transition-colors duration-300"
                >
                  Explore All Products
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <div className="px-6">
          <div className="mx-auto max-w-5xl">
            <SubpageFAQ
              heading="Competitor Analysis FAQ"
              faqs={[
                {
                  question: 'Which AI engines do you track?',
                  answer:
                    'We track competitor visibility across ChatGPT, Claude, Perplexity, Gemini, and other major AI answer engines. Our multi-engine tracking shows which competitors appear in AI-generated answers for your target queries.',
                },
                {
                  question: 'How many competitors can I track?',
                  answer:
                    'Our platform supports tracking 5 or more competitors simultaneously across all major AI engines. You receive automated weekly reports showing ranking changes and new opportunities.',
                },
                {
                  question: 'What insights does competitor analysis provide?',
                  answer:
                    'You get citation analysis showing which sources AI engines prefer, gap identification revealing queries competitors miss, and strategy reverse engineering that reveals their content, schema, and technical optimizations.',
                },
              ]}
            />
          </div>
        </div>
      </div>

      <RelatedLinks
        heading="Related products"
        links={[
          {
            title: 'Website Auditing',
            description: 'Comprehensive audits to ensure AI engines can discover your site.',
            href: '/products/website-auditing',
          },
          {
            title: 'Code Generation',
            description: 'Auto-generate valid schema markup and metadata for AI search.',
            href: '/products/code-generation',
          },
          {
            title: 'Start Free Trial',
            description: 'Get a personalized trial with competitor benchmarking included.',
            href: '/start-free-trial',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

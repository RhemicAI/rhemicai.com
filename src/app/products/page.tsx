import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import ServiceListSchema from '@/components/SchemaOrg/ServiceListSchema';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Products for AI Visibility Auditing, Competitor Analysis, and Schema Deployment',
  description:
    'Explore Rhemic AI products for auditing AI visibility, benchmarking competitors, and shipping the technical changes needed to get cited by answer engines.',
  path: '/products',
  keywords: ['AI visibility tools', 'AEO software', 'schema generation', 'competitor analysis for AI'],
});

const icons = {
  audit: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  competitor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
};

const products = [
  {
    title: 'Website Auditing',
    description:
      'Find out exactly why AI engines aren\'t recommending your business, and get a prioritized checklist to fix it.',
    href: '/products/website-auditing',
    icon: icons.audit,
  },
  {
    title: 'Competitor Analysis',
    description:
      'See every competitor that shows up when customers ask AI about your industry. Know exactly who\'s winning your leads and why.',
    href: '/products/competitor-analysis',
    icon: icons.competitor,
  },
  {
    title: 'Code Generation',
    description:
      'Get the exact code your website needs so AI engines can understand and recommend your business. Copy, paste, done.',
    href: '/products/code-generation',
    icon: icons.code,
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <ServiceListSchema />
      <FixedNav />

      <PageHero
        subtitle="Products"
        title="Three Tools. One Goal: Get You Recommended by AI."
        description="Scan your AI presence, map the competitors beating you, and get the exact fixes to overtake them. Results in your first scan."
        showBackLink={false}
      />


      <div className="relative z-10">
        <section className="pb-12 px-6">
          <div className="mx-auto max-w-5xl rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              Definition
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Rhemic’s product stack is designed around a practical sequence: measure how answer engines see you, identify who is beating you, then ship the technical and content fixes that close the gap.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="pb-16 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.title}
                  href={product.href}
                  className="group bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--border-default)] transition-all duration-300 hover:scale-105"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-tertiary)] mb-4 group-hover:text-white group-hover:border-[var(--border-default)] transition-colors">
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-white transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <span className="text-sm text-[var(--text-primary)] group-hover:text-white transition-colors inline-flex items-center gap-2">
                    Learn more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 px-6">
          <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Who it is for</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Teams that already know AI discovery is changing buyer behavior and need a measurable way to respond instead of waiting for rankings alone to explain the shift.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">How the products connect</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Auditing finds the weak signals, competitor analysis shows what alternatives are winning, and code generation helps teams move from ideas to implementation quickly.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-xl font-bold text-[var(--text-primary)]">What success looks like</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Better answer visibility, stronger mention consistency across engines, and fewer blind spots on the pages buyers actually use to make decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Education Mission */}
        <section className="pb-16 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Want to understand why this matters?
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
                The shift from Google to AI search is the biggest change in how customers
                find businesses since the internet. We break it down on our blog.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/blog"
                  className="px-8 py-4 text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-full hover:bg-[var(--bg-glass-hover)] transition-colors duration-300"
                >
                  Read Our Blog
                </Link>
                <a
                  href="#" data-cal-link="rhemic-ai/discovery-call"
                  className="inline-block px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Book a Demo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <div className="px-6">
          <div className="mx-auto max-w-5xl">
            <SubpageFAQ
              heading="Product FAQ"
              faqs={[
                {
                  question: 'What is AI Engine Optimization (AEO)?',
                  answer:
                    'AEO is the practice of optimizing your website so AI answer engines like ChatGPT, Claude, Perplexity, and Gemini can understand, cite, and recommend your business in their responses. It goes beyond traditional SEO by focusing on structured data, content clarity, and schema markup.',
                },
                {
                  question: 'How do Rhemic AI products work together?',
                  answer:
                    'Our three tools form a complete AEO workflow. Website Auditing identifies optimization gaps. Competitor Analysis reveals what rivals do differently. Code Generation produces deployment-ready schema markup and metadata to fix those gaps, all in one platform.',
                },
                {
                  question: 'Do I need technical skills to use Rhemic AI?',
                  answer:
                    'No. Our platform is designed for marketers, founders, and business owners. The code generation tool produces copy-paste-ready schema markup, and our audits provide plain-language recommendations anyone can follow.',
                },
              ]}
            />
          </div>
        </div>
      </div>

      <RelatedLinks
        heading="Learn more"
        links={[
          {
            title: 'Pricing',
            description: 'Plans from $199/mo for businesses. $599/mo for agencies.',
            href: '/pricing',
          },
          {
            title: 'Start Free Trial',
            description: 'Get a personalized trial with website audit and AEO score baseline.',
            href: '/start-free-trial',
          },
          {
            title: 'How It Works',
            description: 'See how the product stack turns findings into implementation.',
            href: '/how-it-works',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

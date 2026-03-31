import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import DashboardPreview from '@/components/DashboardPreview/DashboardPreview';
import ProductSchema from '@/components/SchemaOrg/ProductSchema';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Website Auditing for AI Visibility and Answer Engine Readiness',
  description:
    'Audit how AI engines read your site, find the structural gaps blocking citations, and get a prioritized plan for improving answer engine visibility.',
  path: '/products/website-auditing',
  keywords: ['AI visibility audit', 'AEO audit', 'website audit for ChatGPT', 'schema audit'],
});

const features = [
  {
    title: 'Business Identity Check',
    description:
      'We verify that AI engines can read your business name, location, services, hours, and reviews. If this data is missing or broken, AI literally can\'t recommend you.',
  },
  {
    title: 'Content Clarity Score',
    description:
      'We check whether your pages answer the questions customers actually ask AI. If your content is vague, buried, or disorganized, AI will cite a competitor with clearer answers.',
  },
  {
    title: 'Crawlability Check',
    description:
      'We make sure AI bots can actually find and read every page on your site. Broken links, slow pages, and mobile issues all make you invisible.',
  },
  {
    title: 'Your AEO Score',
    description:
      'A single number that tells you how AI-ready your site is. Track it over time to see your visibility improve as you implement our fixes.',
  },
];

const benefits = [
  'Enterprise-grade crawls at accessible pricing',
  'Actionable recommendations, not just data dumps',
  'Track improvements with before/after metrics',
  'Understand exactly what AI engines see',
];

export default function WebsiteAuditingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <PageSchemas
        id="website-auditing-page-schemas"
        service={{
          name: 'AI Visibility Website Auditing',
          description:
            'Website audits that evaluate schema, technical signals, entity clarity, and content structure for answer engine visibility.',
          path: '/products/website-auditing',
          audience: 'Marketing teams, local businesses, and SaaS companies',
        }}
        softwareApplication={{
          name: 'Rhemic AI Website Auditing',
          description:
            'Software for auditing how AI answer engines understand and recommend a website.',
          path: '/products/website-auditing',
          offerDescription: 'Book a demo to review a live AI visibility audit and pricing options.',
        }}
      />
      <ProductSchema
        name="Rhemic AI Website Auditing"
        description="Comprehensive audits for AI discovery. Analyze schema markup, content structure, and technical SEO signals to ensure AI answer engines recommend your business."
        url="https://rhemicai.com/products/website-auditing"
      />
      <FixedNav />

      <PageHero
        subtitle="Website Auditing"
        title="Find Out Why AI Doesn't Recommend You. And How to Fix It."
        description="Most businesses have no idea how AI engines see their website. Our audit shows you exactly what's broken, what's missing, and what to fix first."
      />


      <div className="relative z-10 py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Overview */}
          <section className="mb-24">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Why website audits matter in the AI age
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Your website might rank great on Google. But AI answer engines read your site completely differently. If they can&apos;t understand your content, find your business details, or parse your page structure, they&apos;ll recommend a competitor instead. Our audit shows you exactly what AI sees and what&apos;s missing.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              What we audit
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

        {/* Dashboard Preview */}
        <DashboardPreview />

        {/* CTA */}
        <section className="py-16 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Ready to see how AI engines view your site?
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
                Book a demo and we&apos;ll run a live audit on your website. See exactly
                what needs fixing and how much visibility you&apos;re leaving on the table.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#" data-cal-link="rhemic-ai/discovery-call"
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
              heading="Website Auditing FAQ"
              faqs={[
                {
                  question: 'What does an AI website audit check?',
                  answer:
                    'Our audit analyzes schema markup validity, content structure for AI comprehension, technical SEO signals like crawlability and site speed, and AI readability scoring. It shows you exactly how AI engines like ChatGPT and Claude interpret your website.',
                },
                {
                  question: 'How long does an audit take?',
                  answer:
                    'Most website audits complete within minutes. Enterprise-scale sites with thousands of pages may take longer. You receive a full report with actionable recommendations immediately after the audit finishes.',
                },
                {
                  question: 'How is this different from a traditional SEO audit?',
                  answer:
                    'Traditional SEO audits check Google ranking factors. Our AI Engine Optimization audit checks how AI answer engines parse, understand, and cite your content, including schema markup, content semantics, and structured data that AI models rely on.',
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
            title: 'Competitor Analysis',
            description: 'Track rivals across ChatGPT, Claude, Perplexity, and Gemini.',
            href: '/products/competitor-analysis',
          },
          {
            title: 'Code Generation',
            description: 'Auto-generate valid schema markup and metadata for AI search.',
            href: '/products/code-generation',
          },
          {
            title: 'Pricing',
            description: 'Plans from $199/mo for businesses. $599/mo for agencies.',
            href: '/pricing',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

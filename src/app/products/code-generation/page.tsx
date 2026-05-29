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
  title: 'Schema and Metadata Code Generation for AI Engines',
  description:
    'Generate deployment-ready JSON-LD, metadata, and structured content changes that help ChatGPT, Claude, Perplexity, and Google understand your business.',
  path: '/products/code-generation',
  keywords: ['schema generator', 'JSON-LD generator', 'AI metadata generator', 'AEO implementation'],
  noindex: true,
});

const features = [
  {
    title: 'Schema Markup Generation',
    description:
      'Automatically generate valid JSON-LD structured data for your products, services, articles, FAQs, and more. Compliant with schema.org standards.',
  },
  {
    title: 'Meta Tag Optimization',
    description:
      'Create optimized title tags, meta descriptions, Open Graph tags, and Twitter Cards that maximize AI engine comprehension.',
  },
  {
    title: 'One-Click Deployment',
    description:
      'Copy and paste generated code directly into your website. No technical expertise required - we provide clear installation instructions.',
  },
  {
    title: 'Validation & Testing',
    description:
      "All generated code is pre-validated against Google's Rich Results Test and schema.org validators before delivery.",
  },
];

const codeExample = `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Brew & Bean Co",
  "image": "https://example.com/logo.jpg",
  "telephone": "+1-555-0100",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Coffee St",
    "addressLocality": "Brooklyn",
    "addressRegion": "NY",
    "postalCode": "11201"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}`;

const benefits = [
  'Generate schema markup in seconds, not hours',
  'Eliminate coding errors with pre-validated output',
  'Deploy immediately with copy-paste simplicity',
  'Update schemas as your business evolves',
];

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Rhemic AI Code Generation',
  description:
    'Auto-generate valid JSON-LD schema markup, meta tags, and structured data optimized for AI answer engines. Deploy with one click.',
  url: 'https://rhemicai.com/products/code-generation',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  provider: {
    '@type': 'Organization',
    name: 'Rhemic AI',
    url: 'https://rhemicai.com',
  },
};

export default function CodeGenerationPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="code-generation-page-schemas"
        service={{
          name: 'AI Visibility Code Generation',
          description:
            'Generate schema markup, metadata, and implementation-ready technical changes for answer engine optimization.',
          path: '/products/code-generation',
          audience: 'Marketing and engineering teams implementing AEO fixes',
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Code Generation"
        title="The Code Your Website Needs to Get Recommended by AI"
        description="AI engines need structured data to understand your business. We generate it automatically. You just copy, paste, and publish. No coding skills needed."
      />


      <div className="relative z-10 py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Overview */}
          <section className="mb-24">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Why does your website need this?
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                AI answer engines don&apos;t read your website the way a person does. They look for structured data: specific code that describes your business, services, location, and reviews in a format they understand. Without it, you&apos;re invisible to them. Our engine generates this code in seconds, validated and ready to paste into your site.
              </p>
            </div>
          </section>

          {/* Code Example */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              Example output
            </h2>
            <div className="bg-[var(--bg-2)] border border-[var(--border-default)] rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-[var(--border-subtle)] pb-3">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-[var(--text-muted)] font-medium">
                  schema.json
                </span>
              </div>
              <pre className="font-mono text-sm text-emerald-400/90 overflow-x-auto leading-relaxed">
                <code>{codeExample}</code>
              </pre>
            </div>
          </section>

          {/* Features */}
          <section className="mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              What we generate
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

          {/* CTA */}
          <section>
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Get deployment-ready code in minutes
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
                Book a demo and we&apos;ll generate live schema markup for your business.
                See how easy it is to optimize for AI search.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/free-consult-leak-calculator"
                  className="inline-block px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Calculate your leaks for free
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-4 text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-full hover:bg-[var(--bg-glass-hover)] transition-colors duration-300"
                >
                  Explore All Products
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <SubpageFAQ
            heading="Code Generation FAQ"
            faqs={[
              {
                question: 'What types of schema markup can you generate?',
                answer:
                  'We generate JSON-LD structured data for products, services, local businesses, articles, FAQs, organizations, events, and more. All output complies with schema.org standards and is pre-validated against Google\'s Rich Results Test.',
              },
              {
                question: 'Do I need coding experience to use the generated code?',
                answer:
                  'No. All generated code is copy-paste ready with clear installation instructions. You paste the JSON-LD snippet into your website\'s HTML head section, no programming knowledge required.',
              },
              {
                question: 'How does code generation improve AI visibility?',
                answer:
                  'AI answer engines rely on structured data to understand your business. Properly formatted schema markup helps ChatGPT, Claude, and Perplexity accurately describe and cite your services in their responses, increasing the chance they recommend you.',
              },
            ]}
          />
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
            title: 'Competitor Analysis',
            description: 'Track rivals across ChatGPT, Claude, Perplexity, and Gemini.',
            href: '/products/competitor-analysis',
          },
          {
            title: 'Pricing',
            description: 'Med spa plans are Diagnose, Capture, Scale, and Custom.',
            href: '/pricing',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

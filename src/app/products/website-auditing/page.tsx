import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import DashboardPreview from '@/components/DashboardPreview/DashboardPreview';

export const metadata: Metadata = {
  title: 'Website Auditing - AI Engine Optimization Audits',
  description:
    'Comprehensive audits for AI discovery. Analyze schema markup, content structure, and technical SEO signals to ensure AI answer engines recommend your business.',
  alternates: { canonical: 'https://rhemicai.com/products/website-auditing' },
};

const features = [
  {
    title: 'Schema Markup Analysis',
    description:
      'Verify your structured data is properly formatted and optimized for AI understanding. We check JSON-LD, microdata, and ensure compliance with schema.org standards.',
  },
  {
    title: 'Content Structure Review',
    description:
      'Analyze how AI engines parse your content. We evaluate heading hierarchy, internal linking, content depth, and semantic relevance for AI comprehension.',
  },
  {
    title: 'Technical SEO Signals',
    description:
      'Audit crawlability, site speed, mobile responsiveness, canonical tags, and all technical factors that influence AI engine indexing.',
  },
  {
    title: 'AI Readability Scoring',
    description:
      'Measure how well your content answers common questions in your industry. Get an AEO Score that tracks your optimization progress over time.',
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
      <FixedNav />

      <PageHero
        subtitle="Website Auditing"
        title="Ensure your site is technically optimized for AI discovery."
        description="Comprehensive audits that show you exactly how AI engines see your website - and how to fix what's broken."
      />

      <div className="relative z-10 py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Overview */}
          <section className="mb-24">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Why website audits matter in the AI age
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Traditional SEO audits check for Google's algorithms. AI Engine
                Optimization audits check for how ChatGPT, Claude, Perplexity, and
                other answer engines understand your content.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                If AI can't parse your schema markup, understand your content structure,
                or crawl your pages efficiently, you're invisible in AI-generated answers
                — even if you rank well in traditional Google search.
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
                Book a demo and we'll run a live audit on your website. See exactly
                what needs fixing and how much visibility you're leaving on the table.
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
      </div>

      <Footer />
    </main>
  );
}

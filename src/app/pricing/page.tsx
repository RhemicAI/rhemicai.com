import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Pricing | Rhemic AI',
  description:
    'Custom AEO pricing tailored to your business. Book a discovery call to learn how Rhemic AI can help you dominate AI-generated search results.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <FixedNav />

      <PageHero
        subtitle="Pricing"
        title="Built for your business."
        description="Every company has unique needs. We create custom pricing based on your goals, scale, and industry."
        showBackLink={false}
      />

      <div className="relative z-10 py-12 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* How Pricing Works */}
          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              How pricing works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-default)] mb-4">
                  <span className="text-lg font-bold text-[var(--text-primary)]">1</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                  Discovery Call
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  We learn about your business, goals, and current AI search visibility.
                </p>
              </div>

              <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-default)] mb-4">
                  <span className="text-lg font-bold text-[var(--text-primary)]">2</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                  Custom Proposal
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  We design a plan with specific deliverables, timelines, and transparent pricing.
                </p>
              </div>

              <div className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-default)] mb-4">
                  <span className="text-lg font-bold text-[var(--text-primary)]">3</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                  Flexible Engagement
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Monthly retainers, project-based work, or audit-only packages — you choose.
                </p>
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              What's included
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'AI Engine Audits',
                  description:
                    'Full website crawls analyzing schema markup, content structure, and technical SEO signals for AI answer engines.',
                },
                {
                  title: 'Competitor Analysis',
                  description:
                    'Track your rivals across ChatGPT, Claude, Perplexity, and Gemini to identify gaps and opportunities.',
                },
                {
                  title: 'Automated Code Generation',
                  description:
                    'AI-generated schema markup, JSON-LD, and optimized metadata ready to deploy with one click.',
                },
                {
                  title: 'AEO Score Tracking',
                  description:
                    'Monitor your AI search visibility over time with actionable recommendations for continuous improvement.',
                },
                {
                  title: 'Priority Support',
                  description:
                    'Direct access to our team via email and Slack for questions, strategy sessions, and troubleshooting.',
                },
                {
                  title: 'Custom Reporting',
                  description:
                    'Tailored dashboards and reports designed for your stakeholders and business objectives.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] hover:border-[var(--border-default)] transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="shrink-0 mt-0.5"
                  >
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-tertiary)]" />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[var(--text-primary)]"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-10 sm:py-16 px-4 sm:px-6 bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl sm:rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Book a 15-minute discovery call and we'll walk you through what Rhemic AI can do for your brand.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://cal.com/rhemic-ai/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
              >
                Book a Demo
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-full hover:bg-[var(--bg-glass-hover)] transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-6">
              Custom pricing · No long-term contracts
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

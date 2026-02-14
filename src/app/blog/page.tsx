'use client';

import { useState } from 'react';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <FixedNav />

      <PageHero
        subtitle="Blog"
        title="Insights on AI search optimization."
        description="Articles, research, and updates on the future of visibility in AI-generated answers."
        showBackLink={false}
      />

      <div className="relative z-10 py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Latest */}
          <section className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-6">
              Latest
            </h2>
            <Link
              href="/blog/what-is-aeo"
              className="group block bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--border-default)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] mb-4">
                <time dateTime="2026-02-14">February 14, 2026</time>
                <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                <span>15 min read</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-white transition-colors">
                The Complete Guide to AI Engine Optimization (AEO) in 2026
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Everything you need to know about optimizing your website for AI answer engines
                - from foundational concepts to platform-specific strategies for ChatGPT, Claude,
                Perplexity, and Google AI Overviews.
              </p>
              <span className="text-sm text-[var(--text-primary)] group-hover:text-white transition-colors inline-flex items-center gap-2">
                Read article
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </section>

          {/* Email Signup */}
          <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              More articles coming soon
            </h2>

            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
              We&apos;re preparing more in-depth content on AI search optimization,
              visibility strategies, and the evolving landscape of AI-generated
              answers. Be the first to know when we publish.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-full text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300 whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl p-4 max-w-md mx-auto mb-6">
                <p className="text-[var(--text-primary)] font-semibold">
                  You&apos;re on the list!
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  We&apos;ll notify you when we publish our next article.
                </p>
              </div>
            )}

            <p className="text-sm text-[var(--text-muted)]">
              In the meantime, explore our{' '}
              <Link
                href="/products"
                className="text-[var(--text-primary)] hover:text-white transition-colors underline underline-offset-4"
              >
                AI Engine Optimization tools
              </Link>{' '}
              or{' '}
              <Link
                href="/contact"
                className="text-[var(--text-primary)] hover:text-white transition-colors underline underline-offset-4"
              >
                book a discovery call
              </Link>
              .
            </p>
          </div>

          {/* Related Resources */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            <Link
              href="/products/website-auditing"
              className="group bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-all"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-white transition-colors">Website Auditing</h3>
              <p className="text-sm text-[var(--text-secondary)]">See how AI engines view your site with a comprehensive audit.</p>
            </Link>
            <Link
              href="/about"
              className="group bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-all"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-white transition-colors">About Rhemic AI</h3>
              <p className="text-sm text-[var(--text-secondary)]">Meet the team building the future of AI search visibility.</p>
            </Link>
            <Link
              href="/pricing"
              className="group bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-all"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-white transition-colors">Pricing</h3>
              <p className="text-sm text-[var(--text-secondary)]">Custom plans tailored to your business goals and scale.</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

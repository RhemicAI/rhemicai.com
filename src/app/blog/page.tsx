'use client';

import { useState } from 'react';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import { blogPosts } from '@/lib/content';

const displayedPosts = blogPosts.filter(
  (post) =>
    ![
      'how-marketing-agencies-can-get-recommended-by-ai-tools',
      'local-business-ai-recommendations',
    ].includes(post.slug)
);

export default function BlogPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email subscription service
    setSubscribed(true);
    setEmail('');
  };

  return (
    <main className="min-h-screen bg-transparent">
      <FixedNav />

      <PageHero
        subtitle="Blog"
        title="Med spa growth notes from the Rhemic team."
        description="Practical thinking on Google visibility, AI search, reviews, treatment pages, missed calls, handoffs, and source context."
        showBackLink={false}
      />

      <div className="relative z-10 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <section className="glass-panel mb-16 p-6 sm:p-8">
            <p className="section-label mb-4">Editorial focus</p>
            <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
              The research library is being refocused around med spa acquisition.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Rhemic is narrowing public content around how med spas find lost consult opportunities across search visibility, AI answers, calls, handoffs, and source context. Older AI search articles remain available as foundation material.
            </p>
          </section>

          {/* Latest */}
          <section className="mb-16">
            <h2 className="section-label mb-6">
              Foundation archive
            </h2>
            <div className="grid gap-6">
              {displayedPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="glass-panel group block p-8 transition-all duration-300 hover:border-[var(--border-default)]"
                >
                  <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] mb-4">
                    <time dateTime={post.publishedAt}>
                      {new Date(`${post.publishedAt}T12:00:00Z`).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                    <span>{post.readingTime}</span>
                    {index === 0 && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                        <span>Foundational</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--pulse-deep)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                    {post.description}
                  </p>
                  <span className="text-sm text-[var(--text-primary)] group-hover:text-[var(--pulse-deep)] transition-colors inline-flex items-center gap-2">
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
              ))}
            </div>
          </section>

          {/* Email Signup */}
          <div className="glass-panel p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Med spa acquisition articles are coming next.
            </h2>

            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
              We&apos;re preparing deeper notes on Google Business Profile, AI search visibility, reviews, treatment pages, missed-call recovery, AI receptionist coverage, and Meta Ads intelligence.
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
                    className="flex-1 px-4 py-3 bg-[var(--glass-bg-2)] border border-[var(--border-default)] rounded-full text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--pulse-soft)] transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-[var(--bg)] bg-[var(--ink)] rounded-full hover:bg-[var(--pulse)] hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
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
                href="/#what-we-optimize"
                className="text-[var(--text-primary)] hover:text-[var(--pulse-deep)] transition-colors underline underline-offset-4"
              >
                med spa growth system
              </Link>{' '}
              or{' '}
              <Link
                href="/contact"
                className="text-[var(--text-primary)] hover:text-[var(--pulse-deep)] transition-colors underline underline-offset-4"
              >
                get the audit
              </Link>
              .
            </p>
          </div>

          {/* Related Resources */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            <Link
              href="/#what-we-optimize"
              className="glass-panel group p-6 transition-all hover:border-[var(--border-default)]"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--pulse-deep)] transition-colors">What We Optimize</h3>
              <p className="text-sm text-[var(--text-secondary)]">Google, AI search, reviews, treatment pages, calls, and Meta Ads intelligence.</p>
            </Link>
            <Link
              href="/faq"
              className="glass-panel group p-6 transition-all hover:border-[var(--border-default)]"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--pulse-deep)] transition-colors">FAQ</h3>
              <p className="text-sm text-[var(--text-secondary)]">Answers about AI receptionist coverage, AI search, Meta Ads intelligence, and plan fit.</p>
            </Link>
            <Link
              href="/pricing"
              className="glass-panel group p-6 transition-all hover:border-[var(--border-default)]"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--pulse-deep)] transition-colors">Pricing</h3>
              <p className="text-sm text-[var(--text-secondary)]">Basic, Growth, Premium, and Custom plans for med spas.</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl, siteConfig } from '@/lib/seo';

interface RelatedQuestion {
  question: string;
  href: string;
}

interface RelatedPage {
  title: string;
  href: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface AnswerPageLayoutProps {
  title: string;
  subtitle?: string;
  directAnswer: string;
  details: React.ReactNode;
  example?: React.ReactNode;
  relatedQuestions: RelatedQuestion[];
  relatedPages: RelatedPage[];
  faqs: FAQItem[];
  path: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function AnswerPageLayout({
  title,
  subtitle,
  directAnswer,
  details,
  example,
  relatedQuestions,
  relatedPages,
  faqs,
  path,
  ctaLabel = 'See pricing',
  ctaHref = '/pricing',
}: AnswerPageLayoutProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: directAnswer,
    url: absoluteUrl(path),
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    datePublished: '2026-05-03',
    dateModified: '2026-05-03',
    isPartOf: { '@type': 'WebSite', url: siteConfig.url, name: siteConfig.name },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Answers', item: absoluteUrl('/answers') },
        { '@type': 'ListItem', position: 3, name: title, item: absoluteUrl(path) },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-transparent">
      <JsonLd id={`answer-article-${path.split('/').pop()}`} data={articleSchema} />
      <FixedNav />

      {/* Page hero */}
      <div className="relative z-10 overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          style={{
            background: `radial-gradient(ellipse 60% 42% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 72%)`,
          }}
        />
        <div className="mx-auto max-w-4xl px-6">
          {subtitle && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-5 font-body">
              {subtitle}
            </p>
          )}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 font-display"
            style={{ textShadow: '0 0 28px rgba(3, 7, 18, 0.5)' }}
          >
            {title}
          </h1>
        </div>
      </div>

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6">

          {/* Direct answer */}
          <section className="mb-10 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">
              Direct Answer
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-primary)]">
              {directAnswer}
            </p>
          </section>

          {/* Details */}
          <section className="mb-10 prose-custom">
            {details}
          </section>

          {/* Example */}
          {example && (
            <section className="mb-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">
                Example
              </p>
              {example}
            </section>
          )}

          {/* Related questions */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Related questions</h2>
            <ul className="space-y-2">
              {relatedQuestions.map((q) => (
                <li key={q.href}>
                  <Link
                    href={q.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
                  >
                    {q.question}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Related Rhemic pages */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Related Rhemic pages</h2>
            <div className="flex flex-wrap gap-3">
              {relatedPages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-all duration-200"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-base text-[var(--text-secondary)]">
              Ready to measure your AI visibility?
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105 shrink-0"
            >
              {ctaLabel}
            </Link>
          </section>
        </div>

        <SubpageFAQ heading="Frequently asked questions" faqs={faqs} />
      </div>

      <Footer />
    </main>
  );
}

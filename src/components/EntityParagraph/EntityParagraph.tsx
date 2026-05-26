import Link from 'next/link';

/**
 * EntityParagraph — server-rendered, above-the-fold entity block.
 * Purpose: give AI crawlers and language models a clean, extractable
 * paragraph that defines what Rhemic AI is, who it serves, and what
 * category it belongs to. Invisible visually below the hero fold but
 * present in the HTML output.
 */
export default function EntityParagraph() {
  return (
    <section
      className="relative z-10 py-10 md:py-14 px-6 border-b border-[var(--border-subtle)]"
      aria-label="About Rhemic AI"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.75] font-body max-w-4xl">
          Rhemic helps U.S. med spas recover missed calls, route booking intent, and see which channels
          create patient demand with AI receptionist coverage. It helps
          clinics improve Google Business Profile quality, Google Maps visibility, local SEO, reviews,
          citations, schema, treatment pages, AI search visibility, missed-call opportunity mapping, Meta Ads
          intelligence, and approved handoff workflows.{' '}
          <Link
            href="/answer-engine-optimization"
            className="text-[var(--text-primary)] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            AI search visibility
          </Link>{' '}
          is one layer of that med spa growth and call capture system.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link
            href="/pricing"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            Med spa plans
          </Link>
          <Link
            href="#what-we-optimize"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            What Rhemic optimizes
          </Link>
          <Link
            href="/contact"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            Book an audit
          </Link>
          <Link
            href="/answers/what-is-rhemic-ai"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            What is Rhemic AI?
          </Link>
        </div>
      </div>
    </section>
  );
}

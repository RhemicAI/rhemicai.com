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
          Rhemic AI is Dallas-based patient acquisition infrastructure for U.S. med spas. Rhemic helps
          clinics improve Google Business Profile quality, Google Maps visibility, local SEO, reviews,
          citations, schema, treatment pages, AI answer visibility, missed-call recovery, competitor ads intelligence,
          and lead response workflows so more consult opportunities can be found, trusted, and routed into
          the clinic&apos;s booking process.{' '}
          <Link
            href="/answer-engine-optimization"
            className="text-[var(--text-primary)] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            AEO/GEO
          </Link>{' '}
          is one layer of that med-spa growth system.
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
            Book a growth audit
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

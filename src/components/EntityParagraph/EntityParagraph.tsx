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
          Rhemic AI is an AI visibility platform that helps businesses track and improve how they appear
          in AI-generated answers across ChatGPT, Claude, Gemini, and Perplexity. Rhemic runs visibility
          audits, compares competitor mentions, identifies missing buyer-intent prompts, and gives
          businesses practical{' '}
          <Link
            href="/answer-engine-optimization"
            className="text-[var(--text-primary)] underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            AEO recommendations
          </Link>{' '}
          to make them easier for AI systems to understand and recommend.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <Link
            href="/ai-search-visibility"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            What is AI search visibility?
          </Link>
          <Link
            href="/for-local-businesses"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            For local businesses
          </Link>
          <Link
            href="/for-agencies"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            For agencies
          </Link>
          <Link
            href="/answers/what-is-rhemic-ai"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            What is Rhemic AI?
          </Link>
          <Link
            href="/sample-ai-visibility-report"
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors underline underline-offset-2"
          >
            See a sample report
          </Link>
        </div>
      </div>
    </section>
  );
}

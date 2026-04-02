import Link from 'next/link';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  showBackLink?: boolean;
}

export default function PageHero({ title, subtitle, description, showBackLink = true }: PageHeroProps) {
  return (
    <section className="relative z-10 overflow-hidden px-6 pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          background: `
            radial-gradient(ellipse 58% 56% at 50% 18%, rgba(56, 189, 248, 0.12) 0%, rgba(56, 189, 248, 0.045) 36%, transparent 74%),
            linear-gradient(180deg, rgba(2, 6, 23, 0.04) 0%, rgba(2, 6, 23, 0.12) 45%, rgba(2, 6, 23, 0) 100%)
          `,
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto flex min-h-[32vh] max-w-4xl flex-col items-center justify-center text-center sm:min-h-[38vh]">
        {showBackLink && (
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            &larr; Back to Home
          </Link>
        )}

        {subtitle && (
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300/75 font-body sm:text-xs">
            {subtitle}
          </p>
        )}

        <h1
          className="mb-6 max-w-[14ch] text-balance font-display text-4xl font-extrabold leading-[0.98] tracking-[-0.045em] text-[var(--text-primary)] sm:text-5xl lg:max-w-[15ch] lg:text-6xl xl:text-[4.4rem]"
          style={{ textShadow: '0 0 24px rgba(3, 7, 18, 0.4)' }}
        >
          {title}
        </h1>

        {description && (
          <p
            className="mx-auto max-w-3xl text-base leading-[1.7] text-[var(--text-primary)] opacity-80 font-body md:text-lg"
            style={{ textShadow: '0 0 16px rgba(3, 7, 18, 0.3)' }}
          >
            {description}
          </p>
        )}
        </div>
      </div>
    </section>
  );
}

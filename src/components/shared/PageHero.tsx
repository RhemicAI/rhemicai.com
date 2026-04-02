import Link from 'next/link';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  showBackLink?: boolean;
}

export default function PageHero({ title, subtitle, description, showBackLink = true }: PageHeroProps) {
  return (
    <div className="relative z-10 overflow-hidden px-6 pt-10 sm:pt-14 pb-14 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 62% 64% at 50% 34%, rgba(56, 189, 248, 0.14) 0%, rgba(56, 189, 248, 0.06) 34%, transparent 72%),
            radial-gradient(circle at 50% 12%, rgba(147, 197, 253, 0.12), transparent 30%),
            linear-gradient(180deg, rgba(2, 6, 23, 0.04) 0%, rgba(2, 6, 23, 0.18) 58%, rgba(2, 6, 23, 0) 100%)
          `,
        }}
      />
      <div className="relative mx-auto flex min-h-[44vh] max-w-5xl items-center justify-center text-center sm:min-h-[50vh]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-1/2 h-[70%] -translate-y-1/2 rounded-[3rem] border border-white/6 bg-[radial-gradient(ellipse_at_center,rgba(7,18,34,0.18),rgba(7,18,34,0.08),transparent_78%)] backdrop-blur-[1px]"
        />
        <div className="relative w-full">
        {showBackLink && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8"
          >
            &larr; Back to Home
          </Link>
        )}

        {subtitle && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/75 mb-5 font-body">
            {subtitle}
          </p>
        )}

        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 font-display"
          style={{ textShadow: '0 0 28px rgba(3, 7, 18, 0.5)' }}
        >
          {title}
        </h1>

        {description && (
          <p
            className="text-base md:text-lg text-[var(--text-primary)] opacity-75 leading-[1.6] max-w-2xl mx-auto font-body"
            style={{ textShadow: '0 0 18px rgba(3, 7, 18, 0.38)' }}
          >
            {description}
          </p>
        )}
        </div>
      </div>
    </div>
  );
}

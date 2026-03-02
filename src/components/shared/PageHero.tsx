import Link from 'next/link';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  showBackLink?: boolean;
}

export default function PageHero({ title, subtitle, description, showBackLink = true }: PageHeroProps) {
  return (
    <div className="relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-16">
      <div className="mx-auto max-w-4xl px-6">
        {showBackLink && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8"
          >
            &larr; Back to Home
          </Link>
        )}

        {subtitle && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/80 mb-5 font-body">
            {subtitle}
          </p>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 font-display">
          {title}
        </h1>

        {description && (
          <p className="text-base md:text-lg text-[var(--text-primary)] opacity-70 leading-[1.6] max-w-2xl font-body">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

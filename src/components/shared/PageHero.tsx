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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
            {subtitle}
          </p>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
          {title}
        </h1>

        {description && (
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

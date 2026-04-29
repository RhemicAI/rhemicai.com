import Link from 'next/link';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  showBackLink?: boolean;
}

export default function PageHero({ title, subtitle, description, showBackLink = true }: PageHeroProps) {
  return (
    <div className="relative z-10 overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          background: `radial-gradient(ellipse 60% 42% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 72%)`,
        }}
      />
      <div className="mx-auto max-w-5xl px-6 text-center">
        {showBackLink && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8"
          >
            &larr; Back to Home
          </Link>
        )}

        {subtitle && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-5 font-body">
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
  );
}

import Link from 'next/link';

interface RelatedLink {
  title: string;
  description: string;
  href: string;
}

interface RelatedLinksProps {
  links: RelatedLink[];
  heading?: string;
}

export default function RelatedLinks({ links, heading = 'Explore more' }: RelatedLinksProps) {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">
          {heading}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-white transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                {link.description}
              </p>
              <span className="text-sm text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1">
                Learn more
                <svg
                  width="14"
                  height="14"
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
      </div>
    </section>
  );
}

import Link from 'next/link';

interface FurtherReadingLink {
  title: string;
  href: string;
  source?: string;
  external?: boolean;
}

interface FurtherReadingProps {
  links: FurtherReadingLink[];
  heading?: string;
}

export default function FurtherReading({ links, heading = 'Further reading' }: FurtherReadingProps) {
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{heading}</h2>
      <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl divide-y divide-[var(--border-subtle)]">
        {links.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-4 hover:bg-[var(--bg-elevated)] transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div>
                <span className="text-[var(--text-primary)] font-medium">{link.title}</span>
                {link.source && (
                  <span className="ml-2 text-xs text-[var(--text-muted)]">{link.source}</span>
                )}
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--text-muted)] shrink-0"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between px-6 py-4 hover:bg-[var(--bg-elevated)] transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <span className="text-[var(--text-primary)] font-medium">{link.title}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--text-muted)] shrink-0"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

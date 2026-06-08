import Link from 'next/link';
import AuditButton from './AuditButton';

const cols: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '/#how', label: 'How it works' },
      { href: '/testimonials', label: 'Results' },
      { href: '/pricing', label: 'Pricing' },
      { href: '#audit', label: 'Get audit' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy' },
      { href: '/terms-of-service', label: 'Terms' },
    ],
  },
];

export default function PaperFooter() {
  return (
    <footer className="ink-block relative">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/rhemic-logo.svg" alt="Rhemic AI" width={36} height={36} className="h-9 w-9 rounded-[8px]" />
              <span className="font-display text-2xl font-bold text-[var(--paper)]">Rhemic</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-[var(--spot)]">AI</span>
            </div>
            <p className="mt-4 max-w-xs font-body text-[0.95rem] leading-relaxed text-[rgba(244,238,222,0.62)]">
              Visibility for the AI era. We make sure your business is the answer customers
              find, and turn that demand into booked work.
            </p>
            <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[rgba(244,238,222,0.4)]">
              Dallas, Texas
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[rgba(244,238,222,0.45)]">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => {
                  const cls =
                    'font-body text-[0.95rem] text-[rgba(244,238,222,0.78)] transition-colors hover:text-[var(--paper)]';
                  return (
                    <li key={l.href + l.label}>
                      {l.href === '#audit' ? (
                        <AuditButton className={`${cls} text-left`}>{l.label}</AuditButton>
                      ) : (
                        <Link href={l.href} className={cls}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[rgba(244,238,222,0.14)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[rgba(244,238,222,0.4)]">
            © {new Date().getFullYear()} Rhemic AI
          </p>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[rgba(244,238,222,0.4)]">
            contact@rhemicai.com
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const labelMap: Record<string, string> = {
  products: 'Products',
  'website-auditing': 'Website Auditing',
  'competitor-analysis': 'Competitor Analysis',
  'code-generation': 'Code Generation',
  about: 'About',
  blog: 'Blog',
  careers: 'Careers',
  contact: 'Contact',
  pricing: 'Pricing',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'start-free-trial': 'Start Free Trial',
  faq: 'FAQ',
  'how-it-works': 'How It Works',
  compare: 'Compare',
  'rhemic-vs-seo-ai': 'Rhemic vs SEO.ai',
  'rhemic-vs-surferseo': 'Rhemic vs SurferSEO',
  'rhemic-vs-clearscope': 'Rhemic vs Clearscope',
  'case-studies': 'Case Studies',
  'for-agencies': 'For Agencies',
  resources: 'Resources',
  glossary: 'Glossary',
  'free-ai-visibility-check': 'AI Visibility Check Paused',
  'seo-vs-aeo': 'SEO vs AEO',
  'how-to-audit-your-websites-ai-visibility': 'Audit AI Visibility',
  'how-marketing-agencies-can-get-recommended-by-ai-tools': 'Agencies and AI Recommendations',
  'my-business-isnt-showing-up-in-ai-chat-answers': 'Fix Missing AI Mentions',
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((seg, i) => ({
      label: labelMap[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `https://rhemicai.com${crumb.href}`,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <nav
        aria-label="Breadcrumb"
        className="relative z-10 pt-20 sm:pt-24 px-6"
      >
        <ol className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-body max-w-5xl mx-auto">
          {crumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {i > 0 && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-[var(--text-faint)]"
                >
                  <path
                    d="M4.5 2.5L7.5 6L4.5 9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {i === crumbs.length - 1 ? (
                <span className="text-[var(--text-tertiary)]">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-[var(--text-secondary)] transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const labelMap: Record<string, string> = {
  // Service stack. Acronyms must not be title-cased from the slug.
  services: 'Services',
  aeo: 'AEO',
  geo: 'GEO',
  seo: 'SEO',
  'google-business-profile': 'Google Business Profile',
  // Answers
  answers: 'Answers',
  'what-is-aeo': 'What Is AEO',
  'what-is-ai-visibility': 'What Is AI Visibility',
  'why-your-competitor-shows-up-in-ai-answers': 'Why Your Competitor Shows Up',
  'how-local-businesses-can-show-up-in-ai-answers': 'Local Businesses in AI Answers',
  'how-to-improve-chatgpt-visibility': 'Improve ChatGPT Visibility',
  'how-to-improve-perplexity-visibility': 'Improve Perplexity Visibility',
  'how-marketing-agencies-can-sell-ai-visibility': 'Agencies Selling AI Visibility',
  'what-is-rhemic-ai': 'What Is Rhemic AI',
  'who-is-rhemic-ai-for': 'Who Rhemic AI Is For',
  'how-does-rhemic-ai-work': 'How Rhemic AI Works',
  // Compare
  'best-ai-visibility-platforms': 'Best AI Visibility Platforms',
  'rhemic-ai-vs-otterly': 'Rhemic vs Otterly',
  'rhemic-ai-vs-profound': 'Rhemic vs Profound',
  'rhemic-ai-vs-scrunch': 'Rhemic vs Scrunch',
  'rhemic-ai-vs-traditional-seo-agency': 'Rhemic vs a Traditional SEO Agency',
  // Category pages
  'answer-engine-optimization': 'Answer Engine Optimization',
  'ai-search-visibility': 'AI Search Visibility',
  'ai-search-visibility-for-small-businesses': 'AI Search Visibility for Small Businesses',
  'for-local-businesses': 'For Local Businesses',
  'show-up-in-ai-answers': 'Show Up in AI Answers',
  // Glossary terms
  'generative-engine-optimization': 'Generative Engine Optimization',
  'ai-citation': 'AI Citation',
  'llm-visibility': 'LLM Visibility',
  'schema-markup': 'Schema Markup',
  'entity-authority': 'Entity Authority',
  'brand-share': 'Brand Share',
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
  'start-free-trial': 'Get the Audit',
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
  // Lead-magnet landing page uses a stripped minimal header — no breadcrumb.
  if (pathname === '/free-consult-leak-calculator') return null;

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

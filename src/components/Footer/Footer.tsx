'use client';

import Image from 'next/image';
import Link from 'next/link';

const linkRoutes: Record<string, string> = {
  // Product
  'Website Auditing': '/products/website-auditing',
  'Competitor Analysis': '/products/competitor-analysis',
  'Code Generation': '/products/code-generation',
  'Pricing': '/pricing',
  // Company
  'About': '/about',
  'Blog': '/blog',
  'Careers': '/careers',
  'Contact': '/contact',
  // Legal
  'Privacy Policy': '/privacy-policy',
  'Terms of Service': '/terms-of-service',
};

const footerLinks = {
  Product: ['Website Auditing', 'Competitor Analysis', 'Code Generation', 'Pricing'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service'],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-base)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <p className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">
              Rhemic AI
            </p>
            <p className="mt-3 text-sm text-[var(--text-muted)] font-normal leading-[1.6] max-w-xs font-body">
              Visibility reimagined for the AI age.
            </p>
            <Image
              src="/Rhemic logo(:bg).png"
              alt="Rhemic AI Logo"
              width={120}
              height={120}
              className="mt-6 object-contain w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
            />
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)] mb-4 font-body">
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    {linkRoutes[link] ? (
                      <Link
                        href={linkRoutes[link]}
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200"
                      >
                        {link}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200"
                      >
                        {link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA column */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <a
              href="https://cal.com/rhemic-ai/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; 2026 Rhemic AI. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-[var(--text-muted)] hover:text-[var(--text-tertiary)] transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="#"
              aria-label="Twitter"
              className="text-[var(--text-muted)] hover:text-[var(--text-tertiary)] transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

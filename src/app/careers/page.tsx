import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';

export const metadata: Metadata = {
  title: 'Careers - Join the Rhemic AI Team',
  description:
    'Join Rhemic AI and help build the future of AI search optimization. We\'re looking for engineers, designers, and go-to-market talent.',
  alternates: { canonical: 'https://rhemicai.com/careers' },
  openGraph: {
    title: 'Careers - Join the Rhemic AI Team',
    description:
      'Join Rhemic AI and help build the future of AI search optimization. Engineers, designers, and go-to-market talent.',
    url: 'https://rhemicai.com/careers',
  },
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <FixedNav />

      <PageHero
        subtitle="Careers"
        title="Build the future with us."
        description="We're growing our team. Check back soon for open positions."
        showBackLink={false}
      />

      <div className="relative z-10 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--text-primary)]"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Coming Soon
            </h2>

            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
              We're a small, fast-moving team building the infrastructure for
              AI-native search optimization. As we grow, we'll be looking for
              world-class engineers, designers, and go-to-market talent who share
              our vision.
            </p>

            <div className="space-y-4 text-[var(--text-secondary)] mb-8">
              <p className="text-sm">
                <strong className="text-[var(--text-primary)]">What we value:</strong>{' '}
                Craftsmanship, speed, clarity, measurable outcomes
              </p>
              <p className="text-sm">
                <strong className="text-[var(--text-primary)]">Where we work:</strong>{' '}
                Remote-first with periodic in-person collaboration
              </p>
              <p className="text-sm">
                <strong className="text-[var(--text-primary)]">What we're building:</strong>{' '}
                Enterprise-grade AI search optimization at accessible pricing
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
              >
                Get in Touch
              </Link>
              <a
                href="mailto:contact@rhemicai.com"
                className="px-8 py-4 text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-full hover:bg-[var(--bg-glass-hover)] transition-colors duration-300"
              >
                contact@rhemicai.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <RelatedLinks
        heading="Learn more about Rhemic AI"
        links={[
          {
            title: 'About Us',
            description: 'Meet the team and learn about our mission and values.',
            href: '/about',
          },
          {
            title: 'Our Products',
            description: 'Website auditing, competitor analysis, and code generation tools.',
            href: '/products',
          },
          {
            title: 'Contact Us',
            description: 'Reach out with questions about opportunities at Rhemic AI.',
            href: '/contact',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

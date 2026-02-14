import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import DashboardPreview from '@/components/DashboardPreview/DashboardPreview';
import AEOEngine from '@/components/AEOEngine/AEOEngine';

export const metadata: Metadata = {
  title: 'Products | Rhemic AI',
  description:
    'Discover Rhemic AI\'s suite of AI Engine Optimization tools - Website Auditing, Competitor Analysis, and Code Generation for the AI search economy.',
};

const icons = {
  audit: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  competitor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
};

const products = [
  {
    title: 'Website Auditing',
    description:
      'Ensure your site is technically optimized for AI discovery with comprehensive audits of schema markup, content structure, and technical SEO signals.',
    href: '/products/website-auditing',
    icon: icons.audit,
  },
  {
    title: 'Competitor Analysis',
    description:
      'Decode rival strategies and outrank them in AI responses by tracking what your competitors appear in and identifying gaps you can exploit.',
    href: '/products/competitor-analysis',
    icon: icons.competitor,
  },
  {
    title: 'Code Generation',
    description:
      'AI-generated schema markup, JSON-LD, and optimized metadata ready to deploy with one click - no manual coding required.',
    href: '/products/code-generation',
    icon: icons.code,
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <FixedNav />

      <PageHero
        subtitle="Products"
        title="Built for the AI search economy."
        description="Comprehensive tools to help your business thrive in the age of AI-generated answers."
        showBackLink={false}
      />

      <div className="relative z-10 pb-24">
        {/* Product Grid */}
        <section className="pt-4 pb-16 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Everything you need to win in AI search
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                Our platform democratizes access to enterprise-grade optimization tools.
                Whether you're a startup or an enterprise, you get the same powerful
                infrastructure to compete in the AI-first web.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {products.map((product) => (
                <Link
                  key={product.title}
                  href={product.href}
                  className="group bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--border-default)] transition-all duration-300 hover:scale-105"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-tertiary)] mb-4 group-hover:text-white group-hover:border-[var(--border-default)] transition-colors">
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-white transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <span className="text-sm text-[var(--text-primary)] group-hover:text-white transition-colors inline-flex items-center gap-2">
                    Learn more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Live Dashboard Preview */}
        <DashboardPreview />

        {/* Live Engine Demo */}
        <AEOEngine />

        {/* Education Mission */}
        <section className="py-12 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-12 text-center">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                Learn the AI search economy
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
                We're not just building tools — we're helping businesses understand
                how AI answer engines work and why they're rapidly replacing traditional
                Google search. Knowledge is power in this new landscape.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/blog"
                  className="px-8 py-4 text-base font-semibold text-[var(--text-primary)] bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-full hover:bg-[var(--bg-glass-hover)] transition-colors duration-300"
                >
                  Read Our Blog
                </Link>
                <a
                  href="https://cal.com/rhemic-ai/discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300"
                >
                  Book a Demo
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

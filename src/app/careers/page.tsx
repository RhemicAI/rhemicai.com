import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';

export const metadata: Metadata = {
  title: 'Careers - Join the Rhemic AI Team',
  description:
    "Join Rhemic AI and help build the future of AI search optimization. We're looking for engineers, marketers, and researchers who care about measurable outcomes.",
  alternates: { canonical: 'https://rhemicai.com/careers' },
  openGraph: {
    title: 'Careers - Join the Rhemic AI Team',
    description:
      "Join Rhemic AI and help build the future of AI search optimization.",
    url: 'https://rhemicai.com/careers',
  },
};

const roles = [
  {
    title: 'Growth Marketer',
    type: 'Full-time · Remote',
    description:
      'Drive agency and SMB acquisition through content, partnerships, and performance channels. You understand AI/SEO audiences and can build pipelines from scratch.',
    tags: ['Marketing', 'Growth', 'SEO'],
  },
  {
    title: 'AI Research Engineer',
    type: 'Full-time · Remote',
    description:
      'Build and improve the systems that measure brand visibility across ChatGPT, Claude, Gemini, and Perplexity. Experience with LLM evaluation and prompt engineering required.',
    tags: ['Engineering', 'AI/ML', 'Research'],
  },
  {
    title: 'Full-Stack Engineer',
    type: 'Full-time · Remote',
    description:
      'Own product features end-to-end — from data pipelines to the dashboard UI. We work in TypeScript, Next.js, Python, and PostgreSQL.',
    tags: ['Engineering', 'Full-Stack', 'TypeScript'],
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <FixedNav />

      <PageHero
        subtitle="Careers"
        title="We're Growing."
        description="A small, fast-moving team building the infrastructure for AI-native search optimization. If you care about craftsmanship and measurable outcomes, we want to hear from you."
        showBackLink={false}
      />

      <div className="relative z-10 py-20">
        <div className="mx-auto max-w-4xl px-6">

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {[
              { label: 'Craftsmanship', desc: 'We build things properly, not just quickly.' },
              { label: 'Speed', desc: 'Ship fast, learn faster, iterate constantly.' },
              { label: 'Outcomes', desc: 'Everything we do has a measurable result.' },
            ].map((v) => (
              <div key={v.label} className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl p-6">
                <p className="text-sm font-bold text-[var(--text-primary)] mb-2">{v.label}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Open roles */}
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">
            Open Roles
          </h2>
          <div className="space-y-4 mb-16">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl p-7 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{role.title}</h3>
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-1">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-3">{role.type}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{role.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {role.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-[var(--text-tertiary)] bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-full px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="mailto:contact@rhemicai.com"
                  className="shrink-0 px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-full hover:bg-[var(--bg-glass-hover)] transition-colors duration-200 self-start"
                >
                  Express Interest
                </a>
              </div>
            ))}
          </div>

          {/* Speculative applications */}
          <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              Don&apos;t see your role?
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xl mx-auto">
              We&apos;re always interested in exceptional people. Send us a note with what you&apos;re great at and what problem you want to work on.
            </p>
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
            title: 'Pricing',
            description: 'Transparent plans for agencies and businesses of all sizes.',
            href: '/pricing',
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

import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'About | Rhemic AI',
  description:
    'Learn about Rhemic AI, our mission to bridge the gap between businesses and the AI-first web, and the team building the future of AI search optimization.',
};

const founders = [
  {
    name: 'Ittehadul Karim',
    role: 'CEO',
    linkedin: 'https://www.linkedin.com/in/ittehadul-karim-3302a51a5/',
  },
  {
    name: 'Shifat Santo',
    role: 'CTO',
    linkedin: 'https://www.linkedin.com/in/shifatislam-santo/',
  },
  {
    name: 'Raahil Shaik',
    role: 'COO/CFO',
    linkedin: 'https://www.linkedin.com/in/raahil-shaik/',
  },
];

const values = [
  {
    title: 'Precision',
    description:
      'Every audit, every recommendation, every line of code is built with exactness. We deliver accuracy that drives real outcomes.',
  },
  {
    title: 'Speed',
    description:
      'AI moves fast. So do we. Our platform delivers enterprise-grade analysis in seconds, not weeks.',
  },
  {
    title: 'Clarity',
    description:
      'Complex technology, simple explanations. We believe powerful tools should be accessible to everyone.',
  },
  {
    title: 'Measurable Outcomes',
    description:
      'Every feature we build, every strategy we deliver, is designed to produce trackable, tangible results.',
  },
  {
    title: 'Craftsmanship',
    description:
      "We're engineers at heart. We build with pride, test relentlessly, and never ship anything less than excellent.",
  },
  {
    title: 'Trust',
    description:
      'Your data, your insights, your competitive edge — all protected with enterprise-grade security and transparency.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <FixedNav />

      <PageHero
        subtitle="About"
        title="Built by engineers. Focused on outcomes."
        description="We're building the infrastructure that makes businesses visible in the AI-first web."
        showBackLink={false}
      />

      <div className="relative z-10 py-12 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Founding Story */}
          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                The web is changing. Search engines are becoming answer engines.
                Businesses that don't adapt will disappear from AI-generated
                results.
              </p>
              <p>
                We saw this shift coming. As engineers who built high-performance
                systems at scale, we knew traditional SEO wasn't enough. AI
                doesn't rank pages — it synthesizes answers. Visibility in this
                new world requires a fundamentally different approach.
              </p>
              <p>
                So we built Rhemic AI: an AI-native platform that gives
                businesses the tools to understand, optimize, and win in
                AI-generated search results. Enterprise-grade infrastructure at
                accessible pricing. Precision analytics that drive measurable
                outcomes.
              </p>
              <p>
                We're not here to replace traditional SEO. We're here to evolve
                it for the AI age.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="mb-16 sm:mb-24 bg-[var(--bg-glass)] border border-[var(--border-default)] rounded-3xl p-6 sm:p-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              We bridge the gap between businesses and the AI-first web by
              providing enterprise-grade optimization infrastructure that makes
              visibility in AI-generated answers accessible and affordable.
            </p>
          </section>

          {/* Team */}
          <section className="mb-16 sm:mb-24">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              Leadership Team
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {founders.map((founder) => (
                <div
                  key={founder.name}
                  className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--border-default)] transition-colors"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-[var(--text-primary)]">
                        {founder.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                      {founder.name}
                    </h3>
                    <p className="text-sm text-[var(--text-tertiary)] mb-4">
                      {founder.role}
                    </p>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-colors"
                >
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import ComparisonTable from '@/components/shared/ComparisonTable';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Rhemic AI Works: Find Consult Leaks and Route Intent',
  description:
    'See how Rhemic AI helps U.S. med spas find lost consult opportunities and route more booking intent to the right team across search visibility, AI answers, calls, handoffs, and source context.',
  path: '/how-it-works',
  keywords: ['how Rhemic AI works', 'med spa consult leaks', 'med spa AI receptionist'],
});

const steps = [
  {
    title: 'Find the leaks',
    description:
      'Rhemic starts by reviewing search visibility, AI answers, calls, handoffs, and source context so your team can see where consult opportunities may be getting lost.',
  },
  {
    title: 'Prioritize what matters',
    description:
      'Recommendations focus on the surfaces most likely to block booking intent: Google Business Profile, treatment pages, reviews, citations, schema, and missed-call opportunities.',
  },
  {
    title: 'Route booking intent',
    description:
      'Growth and Premium help route calls, missed calls, after-hours inquiries, website inquiries where available, and campaign handoffs into approved handoff workflows.',
  },
  {
    title: 'Add source context',
    description:
      'Rhemic helps show which sources are creating consult opportunities so owners can decide what to fix, pause, or scale.',
  },
  {
    title: 'Review and adjust',
    description:
      'The system is meant for recurring review, not one-time guesswork. Rhemic does not guarantee rankings, revenue, patients, or booked consults.',
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="how-it-works-schemas"
        service={{
          name: 'Rhemic AI workflow',
          description:
            'A med spa workflow for finding lost consult opportunities and routing booking intent through approved handoff workflows.',
          path: '/how-it-works',
          audience: 'U.S. med spa owners and operators',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="How It Works"
        title="Find the leaks, then route the intent."
        description="Rhemic helps med spas spot where consult opportunities leak across search visibility, AI answers, calls, handoffs, and source context."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-16 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              Definition
            </p>
            <p className="text-xl leading-relaxed text-[var(--text-primary)]">
              Rhemic AI helps U.S. med spas find lost consult opportunities and route more booking intent to the right team across search visibility, AI answers, calls, handoffs, and source context.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">The workflow</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6"
                >
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">What the outputs help clarify</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Executive view</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Where consult opportunities may be leaking across search visibility, AI answers, calls, and handoffs.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Competitive view</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Which competitors, treatments, sources, or handoffs deserve closer review before more budget is spent.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
                <h3 className="mb-3 text-xl font-bold text-[var(--text-primary)]">Implementation view</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Practical priorities for pages, local trust, calls, and approved handoff workflows.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">How this differs from SEO-only work</h2>
            <ComparisonTable
              headers={['Dimension', 'Traditional SEO workflow', 'Rhemic AI workflow']}
              rows={[
                { label: 'Primary output', values: ['Ranking and traffic analysis', 'Consult opportunity leak map'] },
                { label: 'Key question', values: ['Where do we rank?', 'Where is booking intent getting lost?'] },
                { label: 'Scope', values: ['Search pages and rankings', 'Search, AI answers, calls, handoffs, and source context'] },
                { label: 'Competitive question', values: ['Who outranks us?', 'Who is capturing patient demand we may be missing?'] },
                { label: 'Implementation focus', values: ['Search performance improvements', 'Visibility, trust, routing, and source-context fixes'] },
              ]}
            />
          </section>

          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">Next step</h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--text-secondary)]">
              If your team suspects consult opportunities are leaking, the right first move is a clear audit. Start with visibility, calls, handoffs, and source context before spending more on demand.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                Get the audit
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                Read the FAQ
              </Link>
            </div>
          </section>
        </div>
      </div>

      <RelatedLinks
        heading="Build the cluster"
        links={[
          {
            title: 'FAQ',
            description: 'Read direct answers about search leaks, call leaks, handoffs, and clinical boundaries.',
            href: '/faq',
          },
          {
            title: 'Products',
            description: 'See how visibility, handoffs, and source context fit together.',
            href: '/products',
          },
          {
            title: 'Compare Rhemic',
            description: 'Review fit when comparing Rhemic with SEO-only alternatives.',
            href: '/compare',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

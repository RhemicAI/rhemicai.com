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
  title: 'AI Visibility for Agencies',
  description:
    'A dedicated Rhemic AI page for agencies that want to productize AI visibility services, benchmark clients against competitors, and ship implementation-ready recommendations faster.',
  path: '/for-agencies',
  keywords: ['AI visibility for agencies', 'agency AEO', 'white-label AI visibility'],
});

export default function ForAgenciesPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="for-agencies-schemas"
        service={{
          name: 'Rhemic AI for agencies',
          description:
            'AI visibility software for agencies that need client audits, competitive tracking, implementation guidance, and productized delivery.',
          path: '/for-agencies',
          audience: 'Marketing, SEO, and performance agencies',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="For Agencies"
        title="Turn AI visibility into a client-facing service line."
        description="Rhemic gives agencies a way to audit, explain, and improve AI recommendation visibility without forcing every engagement into a custom research project."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-16 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4">
              Definition
            </p>
            <p className="text-xl leading-relaxed text-[var(--text-primary)]">
              For agencies, AEO is a productized way to show clients whether AI systems recommend them, why they do not, and what to fix next.
            </p>
          </section>

          <section className="mb-16 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">Why agencies buy</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Agencies need a faster way to explain AI discovery risk, benchmark clients against their competitive set, and convert vague AI interest into a scoped recurring service.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
              <h2 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">What Rhemic enables</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Rhemic supports recurring audits, client-ready framing, actionable implementation plans, and a workflow agencies can package as white-label or high-touch strategic delivery.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">Agency use cases</h2>
            <ComparisonTable
              headers={['Agency need', 'What Rhemic provides', 'Client-facing outcome']}
              rows={[
                { label: 'New business differentiation', values: ['AI visibility audits and competitive benchmarking', 'A clear reason to choose the agency over generic SEO shops'] },
                { label: 'Recurring retention work', values: ['Repeatable scans and implementation follow-through', 'A monthly visibility roadmap tied to outcomes'] },
                { label: 'White-label delivery', values: ['Outputs agencies can adapt into their reporting layer', 'Faster client communication without starting from scratch'] },
                { label: 'Cross-functional execution', values: ['Technical and content recommendations', 'Easier coordination between strategy, content, and dev resources'] },
              ]}
            />
          </section>

          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">Implementation model</h2>
            <p className="mb-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              The best agency model is simple: run the audit, review competitive share, convert findings into a scoped action plan, then package the fixes into content, technical, and reporting workstreams. The more repeatable that process becomes, the easier it is to sell and retain.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-[5px] bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                Review agency pricing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[5px] border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                Talk through the model
              </Link>
            </div>
          </section>
        </div>
      </div>

      <RelatedLinks
        links={[
          {
            title: 'How Agencies Can Get Recommended by AI Tools',
            description: 'Read the supporting blog post for agency-specific AEO positioning.',
            href: '/blog/how-marketing-agencies-can-get-recommended-by-ai-tools',
          },
          {
            title: 'Compare Rhemic',
            description: 'Use the comparison pages during software evaluation.',
            href: '/compare',
          },
          {
            title: 'FAQ',
            description: 'Answer buyer questions before the sales call.',
            href: '/faq',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

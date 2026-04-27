import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import AiVisibilityWidget from '@/components/AiVisibilityWidget/AiVisibilityWidget';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Free AI Visibility Check',
  description:
    'Run Rhemic AI’s public visibility check to see how answer engines understand your site, then use the results to decide what to fix first.',
  path: '/free-ai-visibility-check',
  keywords: ['free AI visibility check', 'AI visibility scan', 'AEO audit tool'],
});

export default function FreeAiVisibilityCheckPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="free-ai-visibility-check-schemas"
        service={{
          name: 'Free AI visibility check',
          description:
            'A public scan flow for checking how answer engines understand and surface a website.',
          path: '/free-ai-visibility-check',
          audience: 'Businesses exploring AI answer visibility',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Free Tool"
        title="Check your AI visibility before you guess."
        description="This page uses the existing public scan flow. Run the check, review the baseline, then decide whether you need deeper tracking and implementation support."
        showBackLink={false}
      />

      <div className="relative z-10">
        <div className="mx-auto max-w-5xl px-6 pb-10">
          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">What this free check does</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <p className="text-[var(--text-secondary)] leading-relaxed">
                It gives you a baseline view of how answer engines currently interpret your site.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                It helps you spot whether the problem is visibility, coverage, structural weakness, or competitive pressure.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                It does not pretend to replace a full implementation plan. It is a clean first step into the workflow.
              </p>
            </div>
          </section>
        </div>

        <AiVisibilityWidget />

        <div className="mx-auto max-w-5xl px-6 pb-16 sm:pb-24">
          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">What to do after the scan</h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--text-secondary)]">
              Once you have the baseline, the next move is usually one of three things: fix the page architecture, deepen the commercial pages that answer engines should cite, or review the competitor pages that are taking your place in the answer.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-[5px] bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                See the implementation workflow
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[5px] border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                Talk through the results
              </Link>
            </div>
          </section>
        </div>
      </div>

      <RelatedLinks
        links={[
          {
            title: 'FAQ',
            description: 'Get answers to the common questions that follow the free scan.',
            href: '/faq',
          },
          {
            title: 'Pricing',
            description: 'See what deeper recurring visibility work looks like.',
            href: '/pricing',
          },
          {
            title: 'Case Studies',
            description: 'Review the dogfooding example built from Rhemic’s own site baseline.',
            href: '/case-studies',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

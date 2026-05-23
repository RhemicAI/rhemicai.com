import type { Metadata } from 'next';
import Link from 'next/link';
import CalBookingLink from '@/components/CalEmbed/CalBookingLink';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'AI Visibility Check Temporarily Paused',
    description:
      'Rhemic AI’s public visibility check is temporarily paused while backend scan infrastructure is being updated.',
    path: '/free-ai-visibility-check',
    keywords: ['AI visibility check', 'AI visibility scan', 'AEO audit tool'],
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function FreeAiVisibilityCheckPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <PageSchemas
        id="free-ai-visibility-check-schemas"
        service={{
          name: 'Free AI visibility check',
          description:
            'A temporarily paused visibility check for reviewing how answer engines understand and surface a website.',
          path: '/free-ai-visibility-check',
          audience: 'Businesses exploring AI answer visibility',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Public Scan Paused"
        title="The public AI visibility check is temporarily offline."
        description="We are updating the backend scan infrastructure. The public widget is hidden for now, but you can still book a demo to review how Rhemic measures and improves AI visibility."
        showBackLink={false}
      />

      <div className="relative z-10">
        <div className="mx-auto max-w-5xl px-6 pb-10">
          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">Public scan temporarily unavailable</h2>
            <p className="max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)]">
              We are making backend scan changes and have removed the public widget while that work is in progress. If you need a visibility baseline now, book a demo and we&apos;ll walk through the right workflow with you.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CalBookingLink
                calLink="rhemic-ai/discovery-call"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                Book a Demo
              </CalBookingLink>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
              >
                See how it works
              </Link>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-16 sm:pb-24">
          <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <h2 className="mb-4 text-3xl font-bold text-[var(--text-primary)]">What we review instead</h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--text-secondary)]">
              The next move is usually one of three things: fix the page architecture, deepen the commercial pages that answer engines should cite, or review the competitor pages that are taking your place in the answer.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary-bg)] px-6 py-3 text-sm font-semibold text-[var(--btn-primary-text)] transition-transform duration-300 hover:scale-105"
              >
                See the implementation workflow
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border-default)] bg-[var(--bg-glass)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-300 hover:bg-[var(--bg-glass-hover)]"
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
            description: 'Get answers to the common questions about AI visibility and AEO.',
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

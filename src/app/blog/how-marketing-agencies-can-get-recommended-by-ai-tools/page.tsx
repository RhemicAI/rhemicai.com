import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import ArticleSchema from '@/components/SchemaOrg/ArticleSchema';
import KeyTakeaways from '@/components/shared/KeyTakeaways';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'How Marketing Agencies Can Get Recommended by AI Tools',
  description:
    'How agencies can improve the odds that AI tools recommend them by strengthening service clarity, proof pages, structured data, and niche positioning.',
  path: '/blog/how-marketing-agencies-can-get-recommended-by-ai-tools',
  type: 'article',
  keywords: ['agencies recommended by AI', 'agency AEO guide'],
  noindex: true,
});

export default function AgenciesRecommendedByAiPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <ArticleSchema
        title="How Marketing Agencies Can Get Recommended by AI Tools"
        description="How agencies can improve the odds that AI tools recommend them by strengthening service clarity, proof pages, structured data, and niche positioning."
        url="https://rhemicai.com/blog/how-marketing-agencies-can-get-recommended-by-ai-tools"
        datePublished="2026-03-31"
        wordCount={1700}
      />
      <FixedNav />

      <PageHero
        subtitle="Blog"
        title="How Marketing Agencies Can Get Recommended by AI Tools"
        description="Agencies win AI recommendations by being easier to trust, easier to classify, and easier to compare than generic competitors."
      />

      <article className="relative z-10 mx-auto max-w-3xl px-6 pb-16">
        <KeyTakeaways
          takeaways={[
            'Generic positioning loses. Agencies need clear category and vertical language.',
            'Proof pages, case studies, and comparison assets matter more than slogan-heavy homepages.',
            'The best agency sites answer who they help, what they do, how they work, and why they are different in language a model can cite.',
          ]}
        />

        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">What agencies get wrong</h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Many agency sites are visually polished but structurally vague. They say they drive growth, unlock performance, and build category leaders, but they never define the actual services, vertical strengths, pricing approach, or proof that answer engines need to confidently recommend them.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">The pages that create recommendation readiness</h2>
          <p className="mb-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            Agencies should invest in service pages that name deliverables clearly, case studies that describe the work honestly, comparison pages that explain fit, and FAQ pages that answer common buyer objections. Answer engines reward specificity. They struggle with positioning that could describe any agency on earth.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Rhemic’s <Link href="/for-agencies" className="text-[var(--text-primary)] underline underline-offset-4">for-agencies page</Link>, <Link href="/case-studies" className="text-[var(--text-primary)] underline underline-offset-4">case studies</Link>, and <Link href="/compare" className="text-[var(--text-primary)] underline underline-offset-4">comparison hub</Link> are good examples of the page types agencies should build for themselves.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">The operational checklist</h2>
          <ul className="space-y-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            <li>Define the agency in one sentence that names service, buyer, and specialty.</li>
            <li>Publish FAQ, pricing framing, and comparison content before adding more vague thought leadership.</li>
            <li>Add structured data that makes the organization, services, and articles machine-readable.</li>
            <li>Track whether the agency is actually being named in the prompts it wants to win.</li>
          </ul>
        </section>

        <SubpageFAQ
          heading="Agency AEO FAQ"
          faqs={[
            {
              question: 'Do agencies need separate pages for each vertical?',
              answer:
                'If vertical specialization is a core differentiator, yes. It is much easier for a model to recommend a clearly specialized agency than a generic one.',
            },
            {
              question: 'What type of proof matters most?',
              answer:
                'Specific proof with context. Real case studies, examples of deliverables, and clear descriptions of the work beat abstract claims every time.',
            },
            {
              question: 'How can an agency sell AEO to clients?',
              answer:
                'By showing the visibility gap directly: who AI recommends today, where the client is missing, and what changes would improve recommendation odds.',
            },
          ]}
        />
      </article>

      <RelatedLinks
        links={[
          {
            title: 'For Agencies',
            description: 'See the dedicated agency landing page on rhemicai.com.',
            href: '/for-agencies',
          },
          {
            title: 'How to Audit AI Visibility',
            description: 'Use the audit workflow when turning agency positioning into a service.',
            href: '/blog/how-to-audit-your-websites-ai-visibility',
          },
          {
            title: 'Pricing',
            description: 'Review the agency plan structure.',
            href: '/pricing',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

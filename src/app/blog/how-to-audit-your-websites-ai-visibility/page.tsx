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
  title: 'How to Audit Your Website’s AI Visibility (Step-by-Step Guide)',
  description:
    'A step-by-step process for auditing how AI answer engines understand your site, identify competitors, and decide what to fix first.',
  path: '/blog/how-to-audit-your-websites-ai-visibility',
  type: 'article',
  keywords: ['AI visibility audit', 'how to audit answer engine visibility'],
});

const steps = [
  'List the prompts buyers actually ask when they are searching for your category, service, or alternative.',
  'Check whether your brand appears in answers across the major engines, not just one.',
  'Map which competitors appear instead and which pages appear to support those mentions.',
  'Review your own commercial pages for definition clarity, FAQ coverage, pricing clarity, and proof.',
  'Validate your schema, metadata, internal links, and supporting content depth.',
  'Create a short implementation queue and re-run the audit after shipping changes.',
];

export default function AuditAiVisibilityPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <ArticleSchema
        title="How to Audit Your Website’s AI Visibility (Step-by-Step Guide)"
        description="A step-by-step process for auditing how AI answer engines understand your site, identify competitors, and decide what to fix first."
        url="https://rhemicai.com/blog/how-to-audit-your-websites-ai-visibility"
        datePublished="2026-03-31"
        wordCount={1900}
      />
      <FixedNav />

      <PageHero
        subtitle="Blog"
        title="How to Audit Your Website’s AI Visibility"
        description="A useful audit is not a vague score. It is a structured process that explains why your brand is absent from answers and what should ship next."
      />

      <article className="relative z-10 mx-auto max-w-3xl px-6 pb-16">
        <KeyTakeaways
          takeaways={[
            'Start with prompts and competitors, not with a random checklist.',
            'The pages that matter most are usually product, pricing, FAQ, compare, and proof pages.',
            'Every audit should end with a short prioritized implementation queue.',
          ]}
        />

        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">What an AI visibility audit is supposed to do</h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            The purpose of an audit is not to produce a long document. It is to reduce ambiguity. After the audit, your team should know whether the problem is structural, competitive, editorial, or all three. If the output does not help the team choose what to implement next, it is not an operational audit.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">The six-step process</h2>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6 text-[var(--text-secondary)] leading-relaxed">
                <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                  Step {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">Where teams usually miss the signal</h2>
          <p className="mb-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            Many teams spend too much time optimizing generic blog content and too little time on pages that answer engines actually need to trust. Thin pricing pages, no FAQ page, weak definitions, no comparison content, and missing proof assets are common failure points.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            If you need a fast starting point, review <Link href="/pricing" className="text-[var(--text-primary)] underline underline-offset-4">pricing</Link>, <Link href="/products" className="text-[var(--text-primary)] underline underline-offset-4">product pages</Link>, <Link href="/faq" className="text-[var(--text-primary)] underline underline-offset-4">FAQ</Link>, and <Link href="/compare" className="text-[var(--text-primary)] underline underline-offset-4">compare pages</Link> before publishing another top-of-funnel article.
          </p>
        </section>

        <SubpageFAQ
          heading="AI Visibility Audit FAQ"
          faqs={[
            {
              question: 'How often should a company run an audit?',
              answer:
                'That depends on change velocity, but recurring measurement is important. If you are shipping new pages or technical changes, re-running the audit after those changes is the fastest way to see whether the work had any effect.',
            },
            {
              question: 'What is the first page most companies should improve?',
              answer:
                'Usually a thin commercial page. Pricing, product, FAQ, and comparison pages often offer more immediate visibility gains than another broad awareness post.',
            },
            {
              question: 'Can I use the free check as a first audit pass?',
              answer:
                'Yes. A public scan is a good first baseline. Teams that need competitive detail and implementation guidance usually move into a fuller workflow after that.',
            },
          ]}
        />
      </article>

      <RelatedLinks
        links={[
          {
            title: 'Free AI Visibility Check',
            description: 'Run the existing public scan flow as the first step.',
            href: '/free-ai-visibility-check',
          },
          {
            title: 'FAQ',
            description: 'Answer the buyer questions that should exist on your own site.',
            href: '/faq',
          },
          {
            title: 'Case Studies',
            description: 'See how Rhemic is applying the same audit logic to its own site.',
            href: '/case-studies',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

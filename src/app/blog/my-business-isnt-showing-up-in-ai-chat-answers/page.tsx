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
  title: 'My Business Isn’t Showing Up in AI Chat Answers. Here’s How to Fix It',
  description:
    'A direct guide to diagnosing why a business is absent from AI chat answers and the structural, content, and competitive fixes that usually matter most.',
  path: '/blog/my-business-isnt-showing-up-in-ai-chat-answers',
  type: 'article',
  keywords: ['business not showing up in AI answers', 'fix AI visibility'],
});

export default function MissingInAiAnswersPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <ArticleSchema
        title="My Business Isn’t Showing Up in AI Chat Answers. Here’s How to Fix It"
        description="A direct guide to diagnosing why a business is absent from AI chat answers and the structural, content, and competitive fixes that usually matter most."
        url="https://rhemicai.com/blog/my-business-isnt-showing-up-in-ai-chat-answers"
        datePublished="2026-03-31"
        wordCount={1800}
      />
      <FixedNav />

      <PageHero
        subtitle="Blog"
        title="My Business Isn’t Showing Up in AI Chat Answers"
        description="If your business is missing from AI answers, the problem is usually diagnosable. The fix is almost never ‘publish more random content.’"
      />

      <article className="relative z-10 mx-auto max-w-3xl px-6 pb-16">
        <KeyTakeaways
          takeaways={[
            'Missing entity clarity, thin commercial pages, and weak proof assets are the most common causes.',
            'Competitor analysis matters because answer engines compare you against alternatives, not in isolation.',
            'The fastest wins often come from FAQ, pricing, compare, and service pages rather than more awareness content.',
          ]}
        />

        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">Start with diagnosis, not panic</h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            If your brand is not being surfaced, there is usually a short list of reasons: the business is hard to classify, the site does not answer the right questions, the proof is weak, the schema is thin, or competitors simply have better coverage for the prompts that matter. Good teams diagnose first and implement second.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">The fastest fixes</h2>
          <p className="mb-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            Start with pages that answer engines rely on for confidence: product pages, service pages, pricing, FAQ, compare pages, and case studies. Add direct definitions near the top. Explain exactly who the business serves. Publish the questions buyers ask before they buy. Make the site easier to cite.
          </p>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Then clean up the technical layer. Add schema. Validate metadata. Strengthen internal linking. Make sure important pages are in the sitemap. These are not glamorous changes, but they are often the difference between being ignored and being understandable.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">What to do next</h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            Run a baseline check, compare the current answer set against your competitors, then build a short implementation queue. If you need a starting point, use the <Link href="/free-ai-visibility-check" className="text-[var(--text-primary)] underline underline-offset-4">free visibility check</Link>, read the <Link href="/faq" className="text-[var(--text-primary)] underline underline-offset-4">FAQ</Link>, and review the <Link href="/how-it-works" className="text-[var(--text-primary)] underline underline-offset-4">implementation workflow</Link>.
          </p>
        </section>

        <SubpageFAQ
          heading="Missing from AI Answers FAQ"
          faqs={[
            {
              question: 'How long does it take to recover visibility?',
              answer:
                'That depends on what is missing and how quickly the fixes ship. Teams that improve page structure and publish stronger commercial assets usually move faster than teams that only adjust metadata.',
            },
            {
              question: 'Should I create more blog content first?',
              answer:
                'Only if the commercial pages are already strong. Many sites need better pricing, FAQ, compare, and proof pages before another awareness article will help.',
            },
            {
              question: 'Can a local business fix this too?',
              answer:
                'Yes. Local businesses often benefit from better service-area definitions, trust signals, FAQ content, and stronger geographic clarity.',
            },
          ]}
        />
      </article>

      <RelatedLinks
        links={[
          {
            title: 'Free AI Visibility Check',
            description: 'Get a baseline before deciding what to fix.',
            href: '/free-ai-visibility-check',
          },
          {
            title: 'For Local Businesses',
            description: 'See the local-business landing page built around AI recommendation visibility.',
            href: '/for-local-businesses',
          },
          {
            title: 'FAQ',
            description: 'Review the high-intent questions your own site should answer.',
            href: '/faq',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

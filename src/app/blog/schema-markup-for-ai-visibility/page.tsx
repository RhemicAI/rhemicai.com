import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import ArticleSchema from '@/components/SchemaOrg/ArticleSchema';
import KeyTakeaways from '@/components/shared/KeyTakeaways';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';

export default function SchemaMarkupForAiVisibilityPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <ArticleSchema
        title="Schema Markup for AI Visibility: Which Types Matter Most"
        description="A practical guide to the schema markup types that most improve AI answer engine visibility."
        url="https://rhemicai.com/blog/schema-markup-for-ai-visibility"
        datePublished="2026-05-03"
        wordCount={2100}
      />
      <FixedNav />

      <PageHero
        subtitle="Blog"
        title="Schema markup for AI visibility: which types matter most"
        description="Not all schema markup has equal impact on AI answer engine recommendations. Here is where to focus."
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs text-[var(--text-muted)] mb-10 font-body">May 3, 2026 · 8 min read</p>

          <KeyTakeaways takeaways={[
            'FAQPage schema is the highest-leverage AEO schema type for most businesses',
            'Organization schema on every page builds entity confidence for AI systems',
            'LocalBusiness schema is critical for service-area businesses',
            'BreadcrumbList helps AI systems understand your site structure',
            'All schema should be valid JSON-LD with no undefined values',
          ]} />

          <div className="prose-custom space-y-8 mt-10">
            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Why schema markup matters for AI visibility</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                AI answer engines build models of the entities they encounter on the web.
                Schema markup gives those systems structured, machine-readable context about
                your organization, services, FAQs, and content structure. Without it, AI
                systems are inferring your entity model from unstructured text — which is
                less reliable and less specific.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Schema will not compensate for weak content. But on top of good content,
                it is one of the highest-leverage technical improvements you can make for
                AEO. Here is where to focus.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">FAQPage schema</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                FAQPage is the schema type most directly useful for AI visibility. It converts
                your question-and-answer content into structured pairs that AI systems can
                extract and cite cleanly. AI engines frequently look for FAQPage schema when
                generating answers to question-format queries.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Add FAQPage schema to any page that contains FAQ content. The questions in
                the schema should match the buyer questions your customers actually ask —
                not generic questions that no buyer ever types.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Organization schema</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Organization schema on your homepage and across your global layout tells
                every AI crawler who you are, what you do, where you are, and how to reach
                you. It is the entity definition that AI systems use to build their model
                of your business.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Include at minimum: name, url, description, foundingDate, address,
                contactPoint, and knowsAbout. The knowsAbout field is particularly useful
                — it is a direct statement of your domain expertise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">LocalBusiness schema</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                For local service businesses, LocalBusiness schema extends Organization with
                geographically specific signals: areaServed, address, openingHours, and
                hasOfferCatalog. These signals are critical for local AI recommendations —
                &ldquo;best plumber in [city]&rdquo; queries heavily weight geographic clarity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Service schema</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Add Service schema to individual service pages. Include the service name,
                description, url, provider (your organization), and audience. This gives
                AI systems a structured representation of each service your business offers,
                making it easier to match your pages to specific buyer queries about those
                services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">BreadcrumbList schema</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                BreadcrumbList schema helps AI systems understand how your pages relate to
                each other hierarchically. It is less directly impactful than FAQPage or
                Organization, but it contributes to overall site legibility and is easy
                to implement globally. It also benefits Google rich results alongside AI
                visibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">The implementation priority order</h2>
              <ol className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed list-decimal list-inside">
                <li>Organization schema — global, on every page</li>
                <li>FAQPage schema — any page with FAQ content</li>
                <li>LocalBusiness schema — if you are a local service provider</li>
                <li>Service schema — individual service pages</li>
                <li>BreadcrumbList — global, on every subpage</li>
                <li>Article schema — blog posts and long-form content</li>
              </ol>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                Start with Organization and FAQPage. Those two alone address the majority
                of the entity clarity and answer-structure gaps that cause businesses to
                be absent from AI recommendations.{' '}
                <Link href="/how-it-works" className="text-[var(--text-primary)] underline underline-offset-2 hover:opacity-80 transition-opacity">
                  See how Rhemic reviews schema coverage.
                </Link>
              </p>
            </section>
          </div>

          <SubpageFAQ
            heading="Schema markup FAQ"
            faqs={[
              {
                question: 'Does schema markup guarantee AI citations?',
                answer: 'No. Schema improves the clarity of your entity signals for AI systems, but citation depends on content relevance, competitive standing, and authority signals as well. Schema is a high-leverage input, not a guarantee.',
              },
              {
                question: 'Should I use JSON-LD or Microdata for schema?',
                answer: 'JSON-LD is the recommended format. It is cleaner to implement, easier to maintain, and the format most AI systems parse reliably. Add it in a <script type="application/ld+json"> block.',
              },
            ]}
          />
        </div>
      </div>

      <RelatedLinks
        links={[
          { title: 'Answer Engine Optimization', description: 'The full AEO discipline.', href: '/answer-engine-optimization' },
          { title: 'Glossary: Schema Markup', description: 'Definition and context for schema markup.', href: '/glossary/schema-markup' },
          { title: 'How It Works', description: 'How Rhemic audits schema and provides implementation guidance.', href: '/how-it-works' },
        ]}
      />

      <Footer />
    </main>
  );
}

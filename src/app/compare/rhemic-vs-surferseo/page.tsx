import type { Metadata } from 'next';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import ComparisonTable from '@/components/shared/ComparisonTable';
import SubpageFAQ from '@/components/shared/SubpageFAQ';
import RelatedLinks from '@/components/shared/RelatedLinks';
import PageSchemas from '@/components/seo/PageSchemas';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rhemic AI vs SurferSEO',
  description:
    'Compare Rhemic AI and SurferSEO when your team is shifting from search-content optimization toward AI recommendation visibility and answer-engine measurement.',
  path: '/compare/rhemic-vs-surferseo',
  keywords: ['Rhemic vs SurferSEO', 'AI visibility vs SEO content optimization'],
});

export default function RhemicVsSurferSeoPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <PageSchemas
        id="rhemic-vs-surferseo-schemas"
        service={{
          name: 'Rhemic AI vs SurferSEO comparison',
          description:
            'A comparison for teams deciding whether SEO content optimization is enough or whether answer engine visibility needs a dedicated workflow.',
          path: '/compare/rhemic-vs-surferseo',
          audience: 'Marketing teams evaluating AI visibility software',
        }}
      />
      <FixedNav />

      <PageHero
        subtitle="Compare"
        title="Rhemic AI vs SurferSEO"
        description="Useful for teams that already know SEO content optimization and now need a direct answer to a different question: will AI systems actually recommend us?"
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <section className="mb-12 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-8 sm:p-12">
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              SurferSEO is commonly considered when the team wants better search-content execution. Rhemic becomes relevant when that team realizes SEO health is not the same thing as AI recommendation visibility. The two jobs overlap, but they are not the same operating system.
            </p>
          </section>

          <ComparisonTable
            headers={['Dimension', 'Rhemic AI', 'SurferSEO']}
            rows={[
              { label: 'Primary outcome', values: ['Brand inclusion in AI-generated answers', 'Search-oriented content optimization'] },
              { label: 'Reporting lens', values: ['Prompt visibility and competitive answer share', 'SEO content performance and optimization workflow'] },
              { label: 'Implementation focus', values: ['Schema, entity clarity, FAQ and proof pages, answer coverage', 'Content optimization and editorial improvements'] },
              { label: 'Best buying trigger', values: ['Competitors are being cited by AI tools', 'Content team wants stronger SEO production'] },
              { label: 'Why teams add Rhemic', values: ['Need an AI-native layer beyond SEO optimization', 'Need answer-engine-specific measurement'] },
            ]}
          />

          <SubpageFAQ
            heading="Rhemic vs SurferSEO FAQ"
            faqs={[
              {
                question: 'Can a team use both?',
                answer:
                  'Yes. A common pattern is to keep a search-content workflow for editorial execution while using Rhemic to measure answer-engine visibility, identify gaps, and prioritize the page types that influence recommendations.',
              },
              {
                question: 'What is the simplest way to choose between them?',
                answer:
                  'Look at the KPI that matters most. If the KPI is content output and search optimization, a search-content tool may fit. If the KPI is whether your brand is named in AI answers, you need a system designed for that outcome.',
              },
              {
                question: 'Does Rhemic replace SEO strategy?',
                answer:
                  'No. Rhemic extends it into answer-engine behavior. Strong SEO foundations still matter, but answer engines require additional visibility signals, stronger definitional content, proof pages, and structured data.',
              },
            ]}
          />
        </div>
      </div>

      <RelatedLinks
        links={[
          {
            title: 'Rhemic vs SEO.ai',
            description: 'Compare Rhemic to a broader AI-assisted SEO workflow.',
            href: '/compare/rhemic-vs-seo-ai',
          },
          {
            title: 'Rhemic vs Clearscope',
            description: 'See the difference between editorial optimization and AI visibility execution.',
            href: '/compare/rhemic-vs-clearscope',
          },
          {
            title: 'Products',
            description: 'Review the product stack behind the comparison.',
            href: '/products',
          },
        ]}
      />

      <Footer />
    </main>
  );
}

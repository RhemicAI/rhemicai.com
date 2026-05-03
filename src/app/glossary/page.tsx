import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import PageHero from '@/components/shared/PageHero';
import RelatedLinks from '@/components/shared/RelatedLinks';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl, buildMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'AI Visibility Glossary: AEO, LLM Visibility, Brand Share, and More',
  description:
    'Definitions for every important AI visibility and answer engine optimization term: AEO, GEO, AI citation, brand share, entity authority, schema markup, and LLM visibility.',
  path: '/glossary',
  keywords: ['AI visibility glossary', 'AEO glossary', 'answer engine optimization terms', 'LLM visibility definition'],
});

const terms = [
  {
    slug: 'ai-search-visibility',
    term: 'AI Search Visibility',
    definition: 'How often and how accurately your brand appears in AI-generated answers from tools like ChatGPT, Claude, Perplexity, and Gemini.',
    whyItMatters: 'High AI search visibility means buyers find you through AI recommendations. Low AI search visibility means you are absent from the answers they trust.',
    example: 'A business with 60% AI search visibility appears in 6 out of 10 relevant AI prompts. A competitor with 30% visibility appears in 3 out of 10.',
  },
  {
    slug: 'answer-engine-optimization',
    term: 'Answer Engine Optimization (AEO)',
    definition: 'The practice of making your website, brand, and content easier for AI answer engines to understand, cite, and recommend.',
    whyItMatters: 'As more buyers use AI tools to find businesses, AEO determines whether you appear in those answers. It is the AI-era equivalent of search engine optimization.',
    example: 'Adding FAQPage schema, rewriting service pages to directly answer buyer questions, and ensuring AI crawlers can access your content are all AEO improvements.',
  },
  {
    slug: 'generative-engine-optimization',
    term: 'Generative Engine Optimization (GEO)',
    definition: 'An alternative term for AEO, specifically referencing optimization for AI systems that generate synthesized answers rather than returning ranked lists of links.',
    whyItMatters: 'GEO and AEO refer to the same practice. Understanding both terms helps when evaluating vendors, reading research, or explaining the discipline to clients.',
    example: 'A team doing GEO work might focus on improving how ChatGPT represents their brand in generative answers about their product category.',
  },
  {
    slug: 'ai-citation',
    term: 'AI Citation',
    definition: 'When an AI answer engine includes your brand, business, or content as a source or recommendation in a generated answer.',
    whyItMatters: 'Being cited by AI engines drives brand awareness among buyers who use those tools for discovery. A citation in a ChatGPT answer functions like an organic recommendation.',
    example: 'When Perplexity answers "what are the best HVAC companies in Dallas" and includes your business in its response, that is an AI citation.',
  },
  {
    slug: 'brand-share',
    term: 'Brand Share',
    definition: 'The percentage of target AI prompts where your brand appears, relative to the total prompts tracked or to competitors.',
    whyItMatters: 'Brand share gives a quantitative view of how your AI visibility compares to competitors. A business with 40% brand share appears in 40% of the prompts that matter to its category.',
    example: 'If you track 50 buyer-intent prompts and your brand appears in 20 of them, your brand share is 40%.',
  },
  {
    slug: 'llm-visibility',
    term: 'LLM Visibility',
    definition: 'How well your brand and content are represented in the training data, retrieval systems, and output patterns of large language models.',
    whyItMatters: 'LLMs power the AI tools buyers use. If your brand is underrepresented or misrepresented in how these models understand your category, you will not be recommended.',
    example: 'A business with strong LLM visibility is mentioned accurately and frequently in AI answers about its category. A business with weak LLM visibility is absent or mischaracterized.',
  },
  {
    slug: 'schema-markup',
    term: 'Schema Markup',
    definition: 'Structured data added to web pages in JSON-LD format that tells AI systems and search engines what your content means — not just what it says.',
    whyItMatters: 'Schema markup is one of the highest-leverage technical improvements for AEO. It makes your organization, services, FAQs, and prices machine-readable, improving how AI engines model and cite you.',
    example: 'Adding FAQPage schema to a FAQ page turns question-answer pairs into structured data that AI engines can extract and cite directly.',
  },
  {
    slug: 'entity-authority',
    term: 'Entity Authority',
    definition: 'The strength and clarity of your brand as a recognized, distinct entity in AI systems and knowledge graphs.',
    whyItMatters: 'AI engines build internal models of entities. High entity authority means AI systems understand your business clearly, consistently, and distinctly from competitors. Low entity authority means you are vague, confused, or absent.',
    example: 'A business with high entity authority has consistent name, address, and category signals across its website, structured data, and off-site citations — leaving no ambiguity for AI engines.',
  },
];

const glossarySchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Rhemic AI Visibility and AEO Glossary',
  description: 'Definitions for AI visibility, answer engine optimization, and related terms.',
  url: absoluteUrl('/glossary'),
  publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
  hasDefinedTerm: terms.map((t) => ({
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.definition,
    url: absoluteUrl(`/glossary/${t.slug}`),
    inDefinedTermSet: absoluteUrl('/glossary'),
  })),
};

export default function GlossaryIndexPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <JsonLd id="glossary-defined-term-set" data={glossarySchema} />
      <FixedNav />

      <PageHero
        subtitle="Glossary"
        title="AI visibility terms, defined."
        description="Definitions for every important AEO and AI visibility concept. Written to be cited, shared, and used in real implementation conversations."
        showBackLink={false}
      />

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6">
            {terms.map((t) => (
              <section
                key={t.slug}
                id={t.slug}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.term}</h2>
                  <Link
                    href={`/glossary/${t.slug}`}
                    className="text-xs text-[var(--text-muted)] border border-[var(--border-subtle)] rounded px-3 py-1 hover:border-[var(--border-default)] transition-colors shrink-0"
                  >
                    Full definition
                  </Link>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-3">{t.definition}</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  <span className="font-semibold text-[var(--text-tertiary)]">Why it matters: </span>
                  {t.whyItMatters}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>

      <RelatedLinks
        links={[
          { title: 'Answer Engine Optimization', description: 'The full AEO guide.', href: '/answer-engine-optimization' },
          { title: 'FAQ', description: 'Common buyer questions about AI visibility.', href: '/faq' },
          { title: 'How It Works', description: 'How the Rhemic audit and implementation workflow applies these concepts.', href: '/how-it-works' },
        ]}
      />

      <Footer />
    </main>
  );
}

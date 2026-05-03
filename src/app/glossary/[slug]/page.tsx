import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import FixedNav from '@/components/FixedNav/FixedNav';
import Footer from '@/components/Footer/Footer';
import JsonLd from '@/components/seo/JsonLd';
import RelatedLinks from '@/components/shared/RelatedLinks';
import { buildMetadata, absoluteUrl, siteConfig } from '@/lib/seo';

const terms: Record<string, {
  term: string;
  definition: string;
  whyItMatters: string;
  example: string;
  relatedTerms: string[];
  relatedTermSlugs: string[];
}> = {
  'ai-search-visibility': {
    term: 'AI Search Visibility',
    definition: 'How often and how accurately your brand appears in AI-generated answers from tools like ChatGPT, Claude, Perplexity, and Gemini. Measured as citation rate across a defined set of buyer-intent prompts.',
    whyItMatters: 'As buyers shift from Google to AI tools for discovery, AI search visibility determines whether those buyers find you. High visibility means you are in the answer. Low visibility means you are not.',
    example: 'A business tracking 50 prompts and appearing in 20 of them has 40% AI search visibility. A competitor appearing in 35 of those prompts has 70% visibility and is winning a larger share of buyer attention.',
    relatedTerms: ['Answer Engine Optimization (AEO)', 'Brand Share', 'LLM Visibility'],
    relatedTermSlugs: ['answer-engine-optimization', 'brand-share', 'llm-visibility'],
  },
  'answer-engine-optimization': {
    term: 'Answer Engine Optimization (AEO)',
    definition: 'The practice of making your website, brand, and content easier for AI answer engines to understand, cite, and recommend. Covers entity clarity, structured data, content depth, FAQ structure, competitive coverage, and AI crawler access.',
    whyItMatters: 'AEO is the discipline behind AI search visibility. Without it, you are relying on luck to appear in AI answers. With it, you have a systematic way to improve and track your recommendation probability.',
    example: 'An AEO implementation might include adding FAQPage schema, rewriting a service page to directly answer the top 10 buyer questions for your category, and verifying that GPTBot and PerplexityBot can crawl your site.',
    relatedTerms: ['Generative Engine Optimization (GEO)', 'Schema Markup', 'Entity Authority'],
    relatedTermSlugs: ['generative-engine-optimization', 'schema-markup', 'entity-authority'],
  },
  'generative-engine-optimization': {
    term: 'Generative Engine Optimization (GEO)',
    definition: 'An alternative term for AEO, specifically referencing optimization for AI systems that generate synthesized answers. GEO and AEO describe the same practice — improving how AI tools understand and recommend your business.',
    whyItMatters: 'Both terms are used in the industry. Understanding both helps when reading research, evaluating vendors, or explaining the practice to stakeholders.',
    example: 'A team focusing on GEO work might improve how their brand is represented in ChatGPT-generated answers about their industry by adding schema, FAQ content, and entity definitions.',
    relatedTerms: ['Answer Engine Optimization (AEO)', 'LLM Visibility', 'AI Search Visibility'],
    relatedTermSlugs: ['answer-engine-optimization', 'llm-visibility', 'ai-search-visibility'],
  },
  'ai-citation': {
    term: 'AI Citation',
    definition: 'When an AI answer engine includes your brand, business, or content as a source or recommendation in a generated answer. A citation can be a named mention, a sourced link, or a recommendation in a shortlist.',
    whyItMatters: 'AI citations drive brand awareness and discovery for buyers who start their research in AI tools. Being cited in a ChatGPT or Perplexity answer is equivalent to an organic third-party recommendation.',
    example: 'When Perplexity answers "best marketing agencies in Austin" and lists your agency, that is an AI citation. When ChatGPT recommends your restaurant in response to "best Thai food in Dallas," that is also a citation.',
    relatedTerms: ['Brand Share', 'AI Search Visibility', 'LLM Visibility'],
    relatedTermSlugs: ['brand-share', 'ai-search-visibility', 'llm-visibility'],
  },
  'brand-share': {
    term: 'Brand Share',
    definition: 'The percentage of tracked buyer-intent prompts where your brand appears in AI-generated answers, expressed as a proportion of either total prompts tracked or of competitor citation rates.',
    whyItMatters: 'Brand share converts AI visibility into a quantitative metric. It makes the competitive gap concrete: if your brand share is 30% and your main competitor is at 60%, you can measure the gap and track improvement over time.',
    example: 'If you track 100 prompts and your brand appears in 40 of them, your brand share is 40%. If a competitor appears in 70 of those prompts, their brand share is 70% — a 30-point gap you can measure and close.',
    relatedTerms: ['AI Citation', 'AI Search Visibility', 'Competitive Share'],
    relatedTermSlugs: ['ai-citation', 'ai-search-visibility', 'ai-search-visibility'],
  },
  'llm-visibility': {
    term: 'LLM Visibility',
    definition: 'How well your brand and content are represented in the training data, retrieval systems, and output patterns of large language models (LLMs). LLM visibility is the upstream signal that drives AI answer visibility.',
    whyItMatters: 'LLMs power the AI tools buyers use. If your brand is underrepresented, misrepresented, or absent from the signals these models rely on, you will not be recommended — even if you are well-known in traditional search.',
    example: 'A business that publishes detailed service pages, earns mentions in authoritative sources, and maintains consistent entity signals across the web builds stronger LLM visibility than a business with thin or inconsistent content.',
    relatedTerms: ['AI Search Visibility', 'Entity Authority', 'Answer Engine Optimization (AEO)'],
    relatedTermSlugs: ['ai-search-visibility', 'entity-authority', 'answer-engine-optimization'],
  },
  'schema-markup': {
    term: 'Schema Markup',
    definition: 'Structured data added to web pages in JSON-LD (or Microdata/RDFa) format that provides machine-readable descriptions of your content. Common types include Organization, Service, FAQPage, LocalBusiness, Article, BreadcrumbList, and Product.',
    whyItMatters: 'Schema markup is one of the highest-leverage AEO improvements. It gives AI systems a clean, structured model of your entity, services, and content — reducing ambiguity and improving citation accuracy.',
    example: 'Adding FAQPage schema to a page turns each question and answer into a structured pair that AI engines can extract and cite. Adding Organization schema tells every AI crawler exactly who you are, where you are located, and what you do.',
    relatedTerms: ['Entity Authority', 'Answer Engine Optimization (AEO)', 'AI Citation'],
    relatedTermSlugs: ['entity-authority', 'answer-engine-optimization', 'ai-citation'],
  },
  'entity-authority': {
    term: 'Entity Authority',
    definition: 'The strength and clarity of your brand as a recognized, distinct entity across AI systems, knowledge graphs, and structured data sources. High entity authority means AI engines understand you clearly and confidently. Low entity authority means you are vague, confused with others, or absent.',
    whyItMatters: 'AI systems recommend entities they understand with confidence. If your entity is unclear — inconsistent name, overlapping category with competitors, missing structured data — AI systems will default to entities they can model more clearly.',
    example: 'A business with high entity authority has matching schema markup, consistent business information across directories, a well-defined organizational description, and clear category signals. An AI engine encountering this business can confidently represent it in answers.',
    relatedTerms: ['Schema Markup', 'LLM Visibility', 'Answer Engine Optimization (AEO)'],
    relatedTermSlugs: ['schema-markup', 'llm-visibility', 'answer-engine-optimization'],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = terms[slug];
  if (!term) return {};
  return buildMetadata({
    title: `${term.term} — AI Visibility Glossary`,
    description: term.definition,
    path: `/glossary/${slug}`,
    keywords: [term.term, 'AI visibility glossary', 'AEO definition'],
  });
}

export async function generateStaticParams() {
  return Object.keys(terms).map((slug) => ({ slug }));
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const term = terms[slug];
  if (!term) notFound();

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.definition,
    url: absoluteUrl(`/glossary/${slug}`),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Rhemic AI Visibility Glossary',
      url: absoluteUrl('/glossary'),
    },
    publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <main className="min-h-screen bg-transparent">
      <JsonLd id={`glossary-term-${slug}`} data={definedTermSchema} />
      <FixedNav />

      <div className="relative z-10 overflow-hidden pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-full"
          style={{ background: `radial-gradient(ellipse 60% 42% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, transparent 72%)` }}
        />
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-5 font-body">
            Glossary
          </p>
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 font-display"
            style={{ textShadow: '0 0 28px rgba(3, 7, 18, 0.5)' }}
          >
            {term.term}
          </h1>
        </div>
      </div>

      <div className="relative z-10 pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6 space-y-8">

          <section className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-glass)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">Definition</p>
            <p className="text-lg leading-relaxed text-[var(--text-primary)]">{term.definition}</p>
          </section>

          <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">Why It Matters</p>
            <p className="text-[var(--text-secondary)] leading-relaxed">{term.whyItMatters}</p>
          </section>

          <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">Example</p>
            <p className="text-[var(--text-secondary)] leading-relaxed">{term.example}</p>
          </section>

          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--text-tertiary)] mb-4">Related Terms</p>
            <div className="flex flex-wrap gap-3">
              {term.relatedTerms.map((relatedTerm, i) => (
                <Link
                  key={relatedTerm}
                  href={`/glossary/${term.relatedTermSlugs[i]}`}
                  className="rounded-[5px] border border-[var(--border-subtle)] bg-[var(--bg-glass)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)] transition-all duration-200"
                >
                  {relatedTerm}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <Link
              href="/glossary"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-1"
            >
              &larr; Back to Glossary
            </Link>
          </section>
        </div>
      </div>

      <RelatedLinks
        links={[
          { title: 'Glossary Index', description: 'All AI visibility and AEO definitions.', href: '/glossary' },
          { title: 'Answer Engine Optimization', description: 'The full AEO guide.', href: '/answer-engine-optimization' },
          { title: 'AI Search Visibility', description: 'How AI visibility is measured and improved.', href: '/ai-search-visibility' },
        ]}
      />

      <Footer />
    </main>
  );
}

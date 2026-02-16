'use client';

import { useState } from 'react';
import Script from 'next/script';

const faqs = [
  {
    question: 'What is AEO (AI Engine Optimization)?',
    answer:
      'AEO is the practice of optimizing your digital presence so AI answer engines like ChatGPT, Claude, Perplexity, and Gemini recommend your business when users ask for suggestions. Unlike traditional SEO which focuses on ranking in search results, AEO focuses on being the answer that AI systems provide directly to users.',
  },
  {
    question: 'How is AEO different from traditional SEO?',
    answer:
      'Traditional SEO optimizes for search engine rankings — getting your website to appear in a list of blue links. AEO optimizes for AI-generated answers — ensuring your business is recommended when someone asks an AI assistant for advice. AI engines synthesize information differently than search engines, so the strategies are fundamentally different. Rhemic AI bridges both worlds.',
  },
  {
    question: 'How does Rhemic AI help my business appear in AI answers?',
    answer:
      'Rhemic AI audits your website for AI-readability signals including schema markup, content structure, and technical SEO factors that AI crawlers use to understand and recommend your business. We then generate optimized code, provide actionable recommendations, and track your visibility across all major AI platforms.',
  },
  {
    question: 'Which AI platforms does Rhemic AI optimize for?',
    answer:
      'We optimize for all major AI answer engines including ChatGPT (OpenAI), Claude (Anthropic), Perplexity, Google Gemini, Microsoft Copilot, and emerging AI search platforms. Our platform continuously monitors your visibility across these platforms and adapts as they evolve.',
  },
  {
    question: 'How much does Rhemic AI cost?',
    answer:
      'We offer custom pricing tailored to your business needs, scale, and goals. Options include monthly retainers, project-based engagements, and one-time audit packages. Book a free 15-minute discovery call to get a custom proposal with transparent pricing and specific deliverables.',
  },
  {
    question: 'How quickly will I see results?',
    answer:
      'Most clients see measurable improvements in their AI visibility within 2-4 weeks of implementing our recommendations. Technical fixes like schema markup and structured data can have immediate impact on how AI engines understand your content. Full optimization typically shows significant results within 60-90 days.',
  },
];

// Static JSON-LD — all content is hardcoded, no user input
const faqSchemaString = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      {/* FAQ Schema — static content only */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {faqSchemaString}
      </Script>

      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4 font-body">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-[rgba(15,15,15,0.85)] hover:border-[var(--border-default)] transition-colors"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-semibold text-[var(--text-primary)] font-body">
                  {faq.question}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`shrink-0 text-[var(--text-tertiary)] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

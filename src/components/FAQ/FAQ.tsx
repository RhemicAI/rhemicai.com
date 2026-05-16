'use client';

import { useState } from 'react';
import Script from 'next/script';

const faqs = [
  {
    question: 'What is AEO (AI Engine Optimization)?',
    answer:
      'AEO is the practice of ensuring your brand gets recommended when buyers ask AI assistants for suggestions. Rhemic measures this as Brand Share %: how often your brand appears in AI answers compared to competitors across ChatGPT, Claude, Gemini, and Perplexity.',
  },
  {
    question: 'How is AEO different from traditional SEO?',
    answer:
      'Traditional SEO optimizes for search engine rankings, getting your website to appear in a list of blue links. AEO optimizes for AI-generated answers, ensuring your business is recommended when someone asks an AI assistant for advice. AI engines synthesize information differently than search engines, so the strategies differ — but the technical foundations overlap significantly. Rhemic covers both: we run the SEO work and the AI visibility optimization in the same workflow, because fixing one often improves the other.',
  },
  {
    question: 'How does Rhemic AI help my business appear in AI answers?',
    answer:
      'Rhemic runs buyer-intent prompts across ChatGPT, Claude, Gemini, and Perplexity to measure your Brand Share %, then identifies exactly which competitors are capturing the demand you\'re missing. You get ranked recommendations and 30-day delta tracking to see your real progress.',
  },
  {
    question: 'Which AI platforms does Rhemic AI optimize for?',
    answer:
      'We optimize for all major AI answer engines including ChatGPT (OpenAI), Claude (Anthropic), Perplexity, Google Gemini, Microsoft Copilot, and emerging AI search platforms. Our platform continuously monitors your visibility across these platforms and adapts as they evolve.',
  },
  {
    question: 'Does Rhemic do traditional SEO?',
    answer:
      'Yes. Every SMB plan includes SEO recommendations alongside AI citation checks. Starter includes an on-page audit for the homepage and priority pages. Growth adds agentic schema and on-page deployment on up to 10 pages. Scale adds unlimited agentic on-page and schema deployment plus local SEO assets such as a GBP optimization plan, NAP audit, local schema, and review response templates. Hands-on GBP management and manual citation cleanup are Enterprise scope.',
  },
  {
    question: 'How much does Rhemic AI cost?',
    answer:
      'We offer three plans: Starter at $199/mo, Growth at $299/mo, and Scale at $499/mo. All are founding member rates — the price locks in when you sign up. Enterprise organizations that need white-label reporting, multi-brand management, or custom integrations get tailored pricing — contact us to discuss. No contracts on any plan. Cancel any time. Save 2 months with annual billing.',
  },
  {
    question: 'How quickly will I see results?',
    answer:
      'Most clients see measurable improvements in their AI visibility within 2-4 weeks of implementing our recommendations. Technical fixes like schema markup and structured data can have immediate impact on how AI engines understand your content. Full optimization typically shows significant results within 60-90 days.',
  },
];

// Static JSON-LD, all content is hardcoded, no user input
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
      {/* FAQ Schema, static content only */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {faqSchemaString}
      </Script>

      <div className="mx-auto max-w-5xl">
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
              className="border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-[var(--bg-elevated)] hover:border-[var(--border-default)] transition-colors"
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
                  className={`shrink-0 text-[var(--text-tertiary)] ${
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

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

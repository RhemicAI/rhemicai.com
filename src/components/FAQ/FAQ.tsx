'use client';

import { useState } from 'react';
import Script from 'next/script';

const faqs = [
  {
    question: 'Is this just SEO?',
    answer:
      'No. SEO is one layer. Rhemic works across Google Maps, Google Business Profile, treatment pages, AI answer visibility, reviews, missed calls, ads intelligence, and lead response so consult opportunities are easier to find, trust, and route.',
  },
  {
    question: 'What is AEO/GEO?',
    answer:
      'AEO/GEO helps AI systems and answer engines understand when to recommend a med spa for treatment and location-based searches. For Rhemic, it is one part of the larger patient acquisition system, not the whole offer.',
  },
  {
    question: 'Do you replace our front desk?',
    answer:
      'No. Rhemic helps recover missed-call opportunities, answer common non-clinical questions, capture lead details, and route booking requests to your team. Medical advice, diagnosis, and treatment decisions stay with licensed staff.',
  },
  {
    question: 'Do we need to switch CRMs?',
    answer:
      "No. Rhemic should integrate with or route into the clinic's existing booking flow when possible. The audit identifies the cleanest handoff before implementation begins.",
  },
  {
    question: 'How fast can we start?',
    answer:
      'Onboarding happens in phases. Rhemic starts with a visibility audit, then local trust cleanup, treatment-page optimization, and later missed-call recovery and reporting. Founding customers should expect a practical phased rollout, not instant full automation.',
  },
];

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 px-6 py-20 md:py-28">
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {faqSchemaString}
      </Script>

      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
            FAQ
          </p>
          <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Straight answers for med-spa operators
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-colors hover:border-[var(--border-default)]"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-body text-base font-semibold text-[var(--text-primary)]">
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
                  <p className="font-body text-sm leading-relaxed text-[var(--text-secondary)]">
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

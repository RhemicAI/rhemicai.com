'use client';

import { useState } from 'react';
import Script from 'next/script';

const faqs = [
  {
    question: 'Does every plan include the AI receptionist?',
    answer:
      'Yes. Every Rhemic plan includes AI receptionist coverage for common non-clinical questions, lead capture, and booking request routing. Growth and Premium add stronger missed-call recovery, more advanced scripts, and deeper reporting.',
  },
  {
    question: 'What does the AI receptionist actually do?',
    answer:
      'The AI receptionist answers common non-clinical questions, captures lead details, and routes booking requests to your team. It helps recover calls that would otherwise go to voicemail or get missed after hours.',
  },
  {
    question: 'Does it give medical advice?',
    answer:
      'No. The AI receptionist does not provide medical advice, diagnosis, treatment recommendations, or clinical intake. Clinical decisions stay with licensed staff.',
  },
  {
    question: 'What is Meta ads intelligence?',
    answer:
      'Meta ads intelligence is a Premium dashboard for connected Meta Ads accounts. It helps your med spa see ad performance, KPIs, costs, and optimization opportunities inside the Rhemic platform.',
  },
  {
    question: 'Does Rhemic run our ads?',
    answer:
      'Not by default. Premium includes Meta Ads intelligence for connected-account reporting and optimization visibility. Paid ad management is separate unless explicitly scoped.',
  },
  {
    question: 'Which plan includes deeper ads intelligence?',
    answer:
      'Premium includes Meta ads intelligence through the connected-account dashboard and Meta MCP connection. Growth can include lighter competitor visibility review. Basic focuses on foundation work.',
  },
  {
    question: 'Does Rhemic integrate with our med spa software?',
    answer:
      'Direct integrations with systems like AestheticsPro, Boulevard, Mangomint, Zenoti, Meevo, and similar platforms are on the roadmap. Today, Rhemic can still capture lead details, support missed-call recovery, and route booking requests through approved handoff workflows.',
  },
  {
    question: 'Can the AI receptionist book appointments directly?',
    answer:
      'Direct booking is planned for supported systems, but we do not enable it blindly. In the current phase, the AI receptionist captures caller details, requested treatment, urgency, and booking intent, then routes the request to your team.',
  },
  {
    question: 'Do we need to switch software?',
    answer:
      'No. Rhemic is being built to work around the systems med spas already use. You should not need to switch your booking, CRM, EMR, or practice-management platform to start.',
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
            Questions about AI reception, ads, and software
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

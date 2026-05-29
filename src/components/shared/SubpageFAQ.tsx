interface FAQItem {
  question: string;
  answer: string;
}

interface SubpageFAQProps {
  faqs: FAQItem[];
  heading?: string;
}

export default function SubpageFAQ({ faqs, heading = 'Frequently asked questions' }: SubpageFAQProps) {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8 text-center">
          {heading}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="bg-[var(--bg-glass)] border border-[var(--border-subtle)] rounded-xl p-6 hover:border-[var(--border-default)] transition-colors group"
            >
              <summary className="font-semibold text-[var(--text-primary)] cursor-pointer list-none flex items-center justify-between">
                {faq.question}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 group-open:rotate-180 transition-transform"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

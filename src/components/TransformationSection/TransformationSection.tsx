'use client';

import Script from 'next/script';

const steps = [
  {
    number: '01',
    heading: 'Your AI Visibility Report',
    body: 'We test 200+ real questions your customers are asking across ChatGPT, Claude, Gemini, and Perplexity. You get a Brand Share score: the percentage of AI answers where you get recommended vs. your competitors. Most businesses score under 15%.',
  },
  {
    number: '02',
    heading: 'Your Competitor Map',
    body: 'A ranked breakdown of every competitor showing up in AI answers for your industry. For each one, we show exactly what they have that you don\'t, and how to close the gap.',
  },
  {
    number: '03',
    heading: 'Your Action Plan',
    body: 'Specific content changes, schema code you can copy-paste, and structural fixes prioritized by impact. Run a scan again in 30 days and watch your Brand Share percentage climb.',
  },
];

const howToSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Three steps to get your business recommended in AI answers',
  description:
    'Three steps to improve your visibility in AI answer engines like ChatGPT, Claude, Perplexity, and Gemini.',
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.heading,
    text: s.body,
  })),
});

export default function TransformationSection() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      <Script
        id="howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {howToSchema}
      </Script>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#8B5CF6] mb-4 font-body">
            The Transformation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--text-primary)] leading-tight font-display">
            How Rhemic Gets You Into the AI Answer
          </h2>
        </div>

        <div className="space-y-14">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="text-sm font-semibold text-[#8B5CF6] font-body mb-2 block">
                {step.number}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] font-display mb-3">
                {step.heading}
              </h3>
              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-body">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

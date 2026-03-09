'use client';

import Script from 'next/script';

const steps = [
  {
    number: '01',
    heading: 'First, we show you the gap.',
    body: 'We run 200+ real buyer prompts across ChatGPT, Claude, Gemini, and Perplexity. Not keyword checks \u2014 actual questions your clients\u2019 customers ask. You get a Brand Share % score: the percentage of AI answers where your client gets recommended vs. competitors.',
  },
  {
    number: '02',
    heading: 'Then, we show you who\u2019s winning and why.',
    body: 'A ranked competitor map. Which brands appear in AI answers for every topic that matters. For each gap, exactly what the competitor has that your client doesn\u2019t \u2014 content depth, schema markup, citation signals.',
  },
  {
    number: '03',
    heading: 'Then, we give you the playbook.',
    body: 'Specific content briefs. Schema code you can copy-paste. Structural changes prioritized by impact. Run the scan again in 30 days. The before-and-after delta is the slide that renews retainers.',
  },
];

const howToSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Three steps agencies use to get clients recommended in AI answers',
  description:
    'Three steps agencies use to improve client visibility in AI answer engines like ChatGPT, Claude, Perplexity, and Gemini.',
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
      <div className="max-w-3xl mx-auto">
        <span className="inline-block text-xs font-semibold tracking-[0.12em] uppercase text-[#8B5CF6] mb-4 font-body">
          The Transformation
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] text-[var(--text-primary)] leading-tight font-display mb-16">
          Rhemic Is the Bridge Between Invisible and Recommended
        </h2>

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

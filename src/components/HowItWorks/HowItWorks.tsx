import Script from 'next/script';

const steps = [
  {
    number: '01',
    heading: 'Audit Your Presence',
    description:
      'Submit your URL and our AI agents crawl every page \u2014 analyzing schema markup, content structure, and technical signals that determine whether AI answer engines recommend you.',
  },
  {
    number: '02',
    heading: 'Analyze Competitors',
    description:
      'We query ChatGPT, Claude, Perplexity, and Gemini with your target keywords \u2014 mapping exactly which businesses get recommended and identifying the gaps you need to close.',
  },
  {
    number: '03',
    heading: 'Deploy Optimizations',
    description:
      'Review AI-generated schema markup, FAQ content, and technical fixes. Approve with one click and watch your AEO score climb as AI engines start recommending your business.',
  },
];

/* ── Mini Visual: URL Input + Run Audit Button ── */
function AuditVisual() {
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl p-5 font-mono text-sm space-y-3">
      <div className="flex items-center gap-2 text-[var(--text-faint)] text-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <span className="ml-2">AEO Audit Tool</span>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-[var(--bg-glass)] border border-[var(--border-strong)] rounded-lg px-3 py-2.5 min-w-0">
          <span className="text-[var(--text-faint)] shrink-0">https://</span>
          <span className="text-[var(--text-tertiary)] truncate">yourbusiness.com</span>
        </div>
        <div className="px-4 py-2.5 bg-violet-600/80 text-white text-xs font-semibold rounded-lg text-center shrink-0">
          Run Audit
        </div>
      </div>
      <div className="space-y-2 pt-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-emerald-400">&#10003;</span>
          <span className="text-[var(--text-muted)]">Schema markup</span>
          <span className="ml-auto text-emerald-400/70">detected</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-amber-400">&#9888;</span>
          <span className="text-[var(--text-muted)]">FAQ structure</span>
          <span className="ml-auto text-amber-400/70">missing</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-emerald-400">&#10003;</span>
          <span className="text-[var(--text-muted)]">Content depth</span>
          <span className="ml-auto text-emerald-400/70">strong</span>
        </div>
      </div>
    </div>
  );
}

/* ── Mini Visual: Competitor Ranking Table ── */
function CompetitorVisual() {
  const rows = [
    { name: 'CompetitorA.com', score: 92, bar: 'w-[92%]', color: 'bg-violet-500/60' },
    { name: 'CompetitorB.com', score: 78, bar: 'w-[78%]', color: 'bg-indigo-500/50' },
    { name: 'yourbusiness.com', score: 65, bar: 'w-[65%]', color: 'bg-[var(--text-faint)]', highlight: true },
  ];

  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl p-5 font-mono text-sm space-y-3">
      <div className="flex items-center gap-2 text-[var(--text-faint)] text-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <span className="ml-2">AI Visibility Rankings</span>
      </div>
      <div className="flex items-center justify-between text-[10px] text-[var(--text-faint)] uppercase tracking-wider px-1">
        <span>Domain</span>
        <span>AEO Score</span>
      </div>
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className={r.highlight ? 'text-[var(--text-secondary)] font-medium' : 'text-[var(--text-muted)]'}>
                {r.name}
              </span>
              <span className={r.highlight ? 'text-[var(--text-secondary)] font-bold' : 'text-[var(--text-tertiary)]'}>
                {r.score}
              </span>
            </div>
            <div className="h-1.5 bg-[var(--bg-glass)] rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${r.bar} ${r.color}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mini Visual: Code Editor with JSON-LD ── */
function DeployVisual() {
  return (
    <div className="bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl p-5 font-mono text-sm space-y-3">
      <div className="flex items-center gap-2 text-[var(--text-faint)] text-xs">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <span className="ml-2">schema.json</span>
      </div>
      <div className="text-[11px] leading-relaxed space-y-0.5">
        <div className="text-[var(--text-faint)]">{'{'}</div>
        <div className="pl-4 text-[var(--text-faint)]">
          &quot;@context&quot;: <span className="text-violet-400/70">&quot;schema.org&quot;</span>,
        </div>
        <div className="pl-4 bg-emerald-500/[0.08] border-l-2 border-emerald-500/40 -ml-1 pl-5 py-0.5 text-emerald-300/70">
          &quot;@type&quot;: <span className="text-emerald-400/80">&quot;LocalBusiness&quot;</span>,
        </div>
        <div className="pl-4 bg-emerald-500/[0.08] border-l-2 border-emerald-500/40 -ml-1 pl-5 py-0.5 text-emerald-300/70">
          &quot;name&quot;: <span className="text-emerald-400/80">&quot;Your Business&quot;</span>,
        </div>
        <div className="pl-4 bg-emerald-500/[0.08] border-l-2 border-emerald-500/40 -ml-1 pl-5 py-0.5 text-emerald-300/70">
          &quot;hasOfferCatalog&quot;: <span className="text-emerald-400/80">{'{...}'}</span>
        </div>
        <div className="text-[var(--text-faint)]">{'}'}</div>
      </div>
      <div className="flex items-center gap-3 pt-1">
        <div className="px-3 py-1.5 bg-emerald-600/60 text-white text-[10px] font-semibold rounded-md">
          Apply Changes
        </div>
        <span className="text-[10px] text-emerald-400/60">+3 optimizations ready</span>
      </div>
    </div>
  );
}

const visuals = [AuditVisual, CompetitorVisual, DeployVisual];

const howToSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to optimize for AI answer engines',
  description:
    'Three steps to improve your business visibility in AI answer engines like ChatGPT, Claude, Perplexity, and Gemini.',
  step: steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.heading,
    text: s.description,
  })),
});

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 md:py-40 px-6 overflow-hidden">
      <Script
        id="howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {howToSchema}
      </Script>
      {/* Section header */}
      <div className="max-w-5xl mx-auto text-center mb-24 md:mb-32">
        <p className="text-sm font-medium tracking-[0.15em] uppercase text-violet-400/90 mb-4 font-body">
          How It Works
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] text-[var(--text-primary)] font-display">
          Three steps to AI visibility
        </h2>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
        {steps.map((step, i) => {
          const Visual = visuals[i];
          const isReversed = i % 2 === 1;

          return (
            <div key={step.number} className="relative">
              {/* Oversized background number */}
              <div
                className="absolute -top-4 md:-top-12 pointer-events-none select-none text-[6rem] md:text-[14rem] lg:text-[18rem] font-bold leading-none text-[var(--text-primary)] opacity-[0.03]"
                style={{ [isReversed ? 'right' : 'left']: 0 }}
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Content grid */}
              <div
                className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
                style={isReversed ? { direction: 'rtl' } : undefined}
              >
                {/* Text column */}
                <div
                  className="space-y-4"
                  style={isReversed ? { direction: 'ltr' } : undefined}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-violet-400/80 tracking-wider">
                      Step {step.number}
                    </span>
                    <span className="h-px flex-1 bg-[var(--border-default)]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] tracking-[-0.02em] font-display">
                    {step.heading}
                  </h3>
                  <p className="text-base md:text-lg text-[var(--text-primary)] font-normal leading-[1.6] max-w-lg opacity-80 font-body">
                    {step.description}
                  </p>
                </div>

                {/* Visual column */}
                <div
                  style={isReversed ? { direction: 'ltr' } : undefined}
                >
                  <Visual />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

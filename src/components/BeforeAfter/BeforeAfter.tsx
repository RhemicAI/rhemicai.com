'use client';

const competitors = [
  { name: 'Apex Roofing Co.', appearances: 5, total: 5 },
  { name: 'Summit Home Services', appearances: 4, total: 5 },
  { name: 'ProTech Contractors', appearances: 3, total: 5 },
  { name: 'Your Business', appearances: 0, total: 5, isProspect: true },
];

const engines = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'Copilot'] as const;

function PresenceRow({
  name,
  appearances,
  total,
  isProspect,
}: {
  name: string;
  appearances: number;
  total: number;
  isProspect?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl border px-4 py-3 ${
        isProspect
          ? 'border-red-500/30 bg-red-500/5'
          : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            isProspect ? 'text-red-400' : 'text-white/90'
          }`}
        >
          {name}
          {isProspect && (
            <span className="ml-2 text-[10px] uppercase tracking-wider text-red-400/70">
              (You)
            </span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 w-2.5 rounded-full ${
              i < appearances
                ? isProspect
                  ? 'bg-red-500/60'
                  : 'bg-emerald-400'
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <span
        className={`min-w-[3ch] text-right text-sm font-mono font-semibold ${
          isProspect ? 'text-red-400' : 'text-emerald-400'
        }`}
      >
        {appearances}/{total}
      </span>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4 font-body">
            Before Rhemic
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display">
            Here&apos;s what your competitors see when they check AI right now.
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[rgba(15,15,15,0.85)] p-5 sm:p-8">
          {/* Engine header */}
          <div className="mb-4 flex items-center justify-end gap-1.5 pr-[3ch] mr-4">
            {engines.map((e) => (
              <div
                key={e}
                className="h-2.5 w-2.5 rounded-full bg-white/20"
                title={e}
              />
            ))}
          </div>

          <div className="space-y-3">
            {competitors.map((c) => (
              <PresenceRow key={c.name} {...c} />
            ))}
          </div>

          <p className="mt-4 text-xs text-[var(--text-muted)] text-center">
            Prompt tested: &ldquo;Who is the best roofer near me?&rdquo; across 5 AI engines
          </p>
        </div>

        <p className="mt-6 text-center text-base text-[var(--text-secondary)] font-body leading-relaxed max-w-xl mx-auto">
          Your competitor shows up every time someone asks AI who to hire. You&apos;re not on the list — yet.
        </p>
      </div>
    </section>
  );
}

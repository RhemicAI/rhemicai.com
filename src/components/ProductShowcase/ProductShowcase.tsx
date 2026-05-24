import Image from 'next/image';
import Reveal from '@/components/shared/Reveal';

const bullets = [
  'Track SEO scan results and high-impact fixes',
  'See AEO visibility and citation opportunities',
  'Monitor deployed optimizations',
  'Review AI receptionist insights and missed-call recovery',
];

export default function ProductShowcase() {
  return (
    <section className="relative z-10 overflow-hidden px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 max-w-3xl">
          <p className="section-label mb-4">Command center</p>
          <h2 className="font-display text-3xl font-semibold leading-[1.08] text-[var(--text-primary)] md:text-5xl">
            See the growth command center behind the consults.
          </h2>
          <p className="mt-5 text-base leading-[1.75] text-[var(--text-secondary)] md:text-lg">
            Rhemic gives med spas one place to monitor SEO scans, AEO visibility, deployed optimizations, and AI receptionist intelligence.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.35fr] lg:items-center">
          <Reveal delay={1}>
            <div className="glass-panel p-6 md:p-8">
              <p className="mb-5 font-body text-sm font-semibold text-[var(--text-primary)]">
                What the dashboard helps your team review
              </p>
              <ul className="space-y-4">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-[1.6] text-[var(--text-secondary)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--pulse)] shadow-[0_0_10px_var(--pulse-glow)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="relative rounded-[22px] border border-[var(--glass-border)] bg-[var(--console)] p-2 shadow-[0_40px_80px_-40px_rgba(77,214,224,0.45),var(--glass-shadow)]">
              <div className="overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--bg-2)]">
                <Image
                  src="/images/rhemic-command-center.png"
                  alt="Rhemic AI command center showing SEO scans, AEO visibility, optimizations, and AI receptionist intelligence for med spas"
                  width={1586}
                  height={992}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="h-auto w-full"
                  priority={false}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

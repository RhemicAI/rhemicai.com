'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ── Streaming data for left column ──
const CRAWL_LINES = [
  '<meta name="description" content="..."  />',
  '<h1>Best Coffee in Brooklyn</h1>',
  '<script type="application/ld+json">',
  '  "@type": "LocalBusiness",',
  '  "name": "Brew & Bean Co",',
  '  "aggregateRating": { "ratingValue": 4.8 }',
  '</script>',
  '<title>Brew & Bean | Specialty Coffee</title>',
  '<link rel="canonical" href="..." />',
  '<meta property="og:title" content="..." />',
  'robots.txt: Allow: /',
  'sitemap.xml: 42 URLs indexed',
  '<article> 2,400 words </article>',
  'schema: FAQPage detected',
  'headers: h1(1) h2(6) h3(12)',
  'internal links: 38 found',
  'load time: 1.2s (good)',
  'mobile: responsive ✓',
];

// ── Engine processing stages ──
const ENGINE_STAGES = [
  { label: 'Crawling site...', duration: 3000 },
  { label: 'Parsing schema markup...', duration: 2250 },
  { label: 'Analyzing content depth...', duration: 2700 },
  { label: 'Scoring AEO readiness...', duration: 2400 },
  { label: 'Generating recommendations...', duration: 2100 },
  { label: 'Complete ✓', duration: 3000 },
];

// ── Output cards for right column ──
const OUTPUT_CARDS = [
  {
    source: 'ChatGPT',
    dot: 'bg-emerald-500',
    text: '"For specialty coffee in Brooklyn, I\'d recommend Brew & Bean Co — they have a 4.8 rating and are known for their single-origin roasts..."',
  },
  {
    source: 'Perplexity',
    dot: 'bg-blue-500',
    text: 'Brew & Bean Co [1] is a top-rated specialty coffee shop in Brooklyn. Sources: brewandbean.com, yelp.com, timeout.com',
  },
  {
    source: 'Claude',
    dot: 'bg-violet-500',
    text: 'Based on reviews and ratings, the best coffee shops in Brooklyn include: 1. Brew & Bean Co (4.8★) 2. ...',
  },
  {
    source: 'Gemini',
    dot: 'bg-amber-500',
    text: 'Brew & Bean Co appears in the AI Overview for "best coffee Brooklyn" with a featured snippet highlighting their specialty roasts.',
  },
  {
    source: 'AI Overview',
    dot: 'bg-rose-500',
    text: 'Top result: Brew & Bean Co — Mentioned in 4/5 AI answer engines for "specialty coffee Brooklyn" queries.',
  },
];

// ── Metrics shown in engine ──
const METRICS = [
  { label: 'AEO Score', value: '94' },
  { label: 'Schema', value: '✓' },
  { label: 'Citations', value: '4/5' },
  { label: 'Content', value: 'A+' },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ── Left Column: Streaming website data ──
function InputColumn({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [lines, setLines] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active || reduced) {
      if (reduced) setLines(CRAWL_LINES.slice(0, 8));
      return;
    }
    setLines([]);
    indexRef.current = 0;

    intervalRef.current = setInterval(() => {
      setLines(prev => {
        const next = [...prev, CRAWL_LINES[indexRef.current % CRAWL_LINES.length]];
        if (next.length > 10) next.shift();
        return next;
      });
      indexRef.current++;
    }, 600);

    return () => clearInterval(intervalRef.current);
  }, [active, reduced]);

  return (
    <div className="flex flex-col h-full">
      <div className="text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-3 font-mono">
        Website Data
      </div>
      <div className="flex-1 border border-[var(--border-default)] rounded-lg bg-black/75 backdrop-blur-xl p-3 overflow-hidden font-mono text-xs leading-relaxed relative">
        {/* Fade overlay at top */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none rounded-t-lg" />
        <div className="space-y-1">
          {lines.map((line, i) => (
            <div
              key={`${i}-${line}`}
              className="text-emerald-400/90 whitespace-nowrap overflow-hidden"
              style={{
                opacity: reduced ? 1 : 0,
                animation: reduced ? 'none' : 'aeo-fade-in 0.3s ease forwards',
                animationDelay: '0ms',
              }}
            >
              <span className="text-[var(--text-faint)] mr-2 select-none">{String(i + 1).padStart(2, '0')}</span>
              {line}
            </div>
          ))}
        </div>
        {/* Flow arrow indicator */}
        <div className="absolute bottom-2 right-2 text-[var(--text-faint)] text-lg select-none" aria-hidden="true">
          →
        </div>
      </div>
    </div>
  );
}

// ── Center Column: Processing engine ──
function EngineColumn({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (!active || reduced) {
      if (reduced) {
        setStageIndex(ENGINE_STAGES.length - 1);
        setProgress(100);
      }
      return;
    }

    setStageIndex(0);
    setProgress(0);
    let stage = 0;

    const runStage = () => {
      if (stage >= ENGINE_STAGES.length) {
        // Loop after pause
        setTimeout(() => {
          setStageIndex(0);
          setProgress(0);
          stage = 0;
          runStage();
        }, 2000);
        return;
      }

      setStageIndex(stage);
      setProgress(0);
      startTimeRef.current = performance.now();
      const duration = ENGINE_STAGES[stage].duration;

      const tick = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const pct = Math.min((elapsed / duration) * 100, 100);
        setProgress(pct);
        if (pct < 100) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          stage++;
          setTimeout(runStage, 200);
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    };

    runStage();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [active, reduced]);

  const currentStage = ENGINE_STAGES[stageIndex];
  const isComplete = stageIndex === ENGINE_STAGES.length - 1 && progress >= 100;

  return (
    <div className="flex flex-col h-full">
      <div className="text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-3 font-mono text-center">
        AEO Engine
      </div>
      <div className="flex-1 border border-[var(--border-strong)] rounded-lg bg-black/80 backdrop-blur-xl p-4 font-mono text-sm relative overflow-hidden">
        {/* ASCII border decoration */}
        <div className="text-[var(--text-faint)] text-[10px] mb-3 select-none" aria-hidden="true">
          ╔══════════════════════════╗
        </div>

        {/* Engine label */}
        <div className="text-center mb-3">
          <span className={`text-base font-bold tracking-wider ${isComplete ? 'text-emerald-400' : 'text-[var(--text-primary)]'}`}>
            RHEMIC AI
          </span>
        </div>

        {/* Current stage */}
        <div className="mb-3 text-center">
          <span className={`text-xs ${isComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
            {currentStage?.label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-4 px-2">
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-faint)]">
            <span>[</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-none"
                style={{
                  width: `${progress}%`,
                  backgroundColor: isComplete ? '#34d399' : '#f59e0b',
                }}
              />
            </div>
            <span>]</span>
            <span className="w-8 text-right">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center py-2 bg-white/[0.06] rounded border border-[var(--border-subtle)]">
              <div className={`text-base font-bold ${isComplete ? 'text-emerald-400' : 'text-[var(--text-primary)]'}`}>
                {m.value}
              </div>
              <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </div>

        {/* ASCII border decoration */}
        <div className="text-[var(--text-faint)] text-[10px] select-none" aria-hidden="true">
          ╚══════════════════════════╝
        </div>
      </div>
    </div>
  );
}

// ── Right Column: AI output cards ──
function OutputColumn({ active, reduced }: { active: boolean; reduced: boolean }) {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!active) {
      setVisibleCards([]);
      return;
    }
    if (reduced) {
      setVisibleCards(OUTPUT_CARDS.map((_, i) => i));
      return;
    }

    setVisibleCards([]);
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    // Stagger card reveals
    const reveal = (index: number) => {
      const t = setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, 4500 + index * 1800);
      timeoutRefs.current.push(t);
    };

    OUTPUT_CARDS.forEach((_, i) => reveal(i));

    // Loop: hide all and restart after all cards shown
    const loopTimeout = setTimeout(() => {
      setVisibleCards([]);
      // Re-trigger by toggling — handled by parent cycle
    }, 4500 + OUTPUT_CARDS.length * 1800 + 3000);
    timeoutRefs.current.push(loopTimeout);

    return () => timeoutRefs.current.forEach(clearTimeout);
  }, [active, reduced]);

  return (
    <div className="flex flex-col h-full">
      <div className="text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-3 font-mono text-right">
        AI Answers
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        {OUTPUT_CARDS.map((card, i) => {
          const visible = visibleCards.includes(i);
          return (
            <div
              key={card.source}
              className="border border-[var(--border-default)] rounded-lg bg-black/75 backdrop-blur-xl p-3 font-mono text-xs leading-relaxed transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(20px)',
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${card.dot}`} />
                <span className="text-[var(--text-primary)] font-semibold text-[11px] uppercase tracking-wider">
                  {card.source}
                </span>
                <span className="text-emerald-400 text-[11px] ml-auto">✓</span>
              </div>
              <div className="text-[var(--text-secondary)] line-clamp-2">
                {card.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Section ──
export default function AEOEngine() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);
  const reduced = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  // Restart the animation cycle periodically
  useEffect(() => {
    if (!inView || reduced) return;
    const interval = setInterval(() => {
      setCycle(c => c + 1);
    }, 24000); // Full cycle duration
    return () => clearInterval(interval);
  }, [inView, reduced]);

  // Pause when tab hidden
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const handler = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  const active = inView && tabVisible;

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      {/* Section header */}
      <div className="scroll-reveal max-w-5xl mx-auto text-center mb-16">
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-[var(--text-muted)] mb-4 font-mono">
          The Engine
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          Watch your visibility transform
        </h2>
        <p className="text-base md:text-lg text-[var(--text-tertiary)] max-w-xl mx-auto font-light leading-relaxed">
          From website crawl to AI recommendation — see how Rhemic AI makes your business the answer.
        </p>
      </div>

      {/* 3-column engine visualization */}
      <div className="max-w-6xl mx-auto">
        {/* Flow arrows for md+ screens */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-0 items-stretch" style={{ minHeight: '420px' }}>
          {/* Input */}
          <div className="min-w-0">
            <InputColumn active={active} reduced={reduced} key={`input-${cycle}`} />
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center px-3">
            <div className="text-[var(--text-faint)] text-2xl font-mono select-none" aria-hidden="true">→</div>
          </div>

          {/* Engine */}
          <div className="min-w-0">
            <EngineColumn active={active} reduced={reduced} key={`engine-${cycle}`} />
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center px-3">
            <div className="text-[var(--text-faint)] text-2xl font-mono select-none" aria-hidden="true">→</div>
          </div>

          {/* Output */}
          <div className="min-w-0">
            <OutputColumn active={active} reduced={reduced} key={`output-${cycle}`} />
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div className="md:hidden space-y-6">
          <InputColumn active={active} reduced={reduced} key={`input-m-${cycle}`} />
          <div className="text-center text-[var(--text-faint)] text-2xl font-mono select-none" aria-hidden="true">↓</div>
          <EngineColumn active={active} reduced={reduced} key={`engine-m-${cycle}`} />
          <div className="text-center text-[var(--text-faint)] text-2xl font-mono select-none" aria-hidden="true">↓</div>
          <OutputColumn active={active} reduced={reduced} key={`output-m-${cycle}`} />
        </div>
      </div>
    </section>
  );
}

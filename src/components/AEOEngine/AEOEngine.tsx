'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import SummaryModal from '@/components/SummaryModal/SummaryModal';

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
  { label: 'AI Audit', duration: 2500 },
  { label: 'Complete ✓', duration: 2000 },
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
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

// ── Left Column: Streaming website data with realistic typing ──
function InputColumn({
  active,
  onComplete,
  isActive,
  isOnScreenRef
}: {
  active: boolean;
  onComplete?: () => void;
  isActive: boolean;
  isOnScreenRef: React.RefObject<boolean>;
}) {
  const [lines, setLines] = useState<Array<{ full: string; typed: string }>>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const lineIndexRef = useRef(0);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    setLines([]);
    lineIndexRef.current = 0;
    hasCompletedRef.current = false;

    // Start typing animation - calm and smooth like a real developer
    const typeNextChar = () => {
      if (!isOnScreenRef.current) return;
      setLines(prev => {
        if (prev.length === 0) return prev;

        const lastLineIndex = prev.length - 1;
        const lastLine = prev[lastLineIndex];

        // If current line is fully typed, don't change anything
        if (lastLine.typed === lastLine.full) {
          return prev;
        }

        // Type next character
        const nextTyped = lastLine.full.slice(0, lastLine.typed.length + 1);
        const updated = [...prev];
        updated[lastLineIndex] = { ...lastLine, typed: nextTyped };
        return updated;
      });
    };

    // Character-by-character typing (40ms = calm, smooth pace)
    typingIntervalRef.current = setInterval(typeNextChar, 40);

    // Add new lines periodically (1200ms = calm pace between lines)
    intervalRef.current = setInterval(() => {
      if (!isOnScreenRef.current) return;
      // Stop after 10 lines (one complete cycle)
      if (lineIndexRef.current >= 10) {
        clearInterval(intervalRef.current);
        // Brief pause for last line to finish typing, then complete
        setTimeout(() => {
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete?.();
          }
        }, 300); // Quick transition after last line
        return;
      }

      setLines(prev => {
        const newLine = CRAWL_LINES[lineIndexRef.current % CRAWL_LINES.length];
        const next = [...prev, { full: newLine, typed: '' }];
        lineIndexRef.current++;
        return next;
      });
    }, 1200);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(typingIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, onComplete]);

  return (
    <div className={`flex flex-col h-full transition-[border-color,background-color,box-shadow] duration-700 ${isActive ? 'ring-2 ring-emerald-500/50 ring-offset-2 ring-offset-transparent' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-emerald-500 text-black' : 'bg-[var(--bg-glass)] text-[var(--text-tertiary)]'}`}>
          Step 1
        </span>
        <div className="text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)] font-mono">
          Website Data
        </div>
      </div>
      <div className={`flex-1 border rounded-lg p-3 overflow-hidden font-mono text-xs leading-relaxed relative transition-[border-color,background-color,box-shadow] duration-700 ${isActive ? 'border-emerald-500/50 bg-emerald-950/40 shadow-lg shadow-emerald-500/10' : 'border-[var(--border-default)] bg-black/90'}`}>
        {/* Fade overlay at top */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none rounded-t-lg" />
        <div className="space-y-1">
          {lines.map((line, i) => (
            <div
              key={`${i}-${line.full}`}
              className="text-emerald-400/90 whitespace-nowrap overflow-hidden"
            >
              <span className="text-[var(--text-faint)] mr-2 select-none">{String(i + 1).padStart(2, '0')}</span>
              {line.typed}
              {line.typed !== line.full && (
                <span className="inline-block w-1.5 h-3 bg-emerald-400/70 ml-0.5 animate-cursor-blink" />
              )}
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
function EngineColumn({
  active,
  onComplete,
  isActive,
  isOnScreenRef
}: {
  active: boolean;
  onComplete?: () => void;
  isActive: boolean;
  isOnScreenRef: React.RefObject<boolean>;
}) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    setStageIndex(0);
    setProgress(0);
    hasCompletedRef.current = false;
    let stage = 0;

    const runStage = () => {
      // Stop after all stages complete (no loop)
      if (stage >= ENGINE_STAGES.length) {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          // Quick completion after final stage
          setTimeout(() => {
            onComplete?.();
          }, 300);
        }
        return;
      }

      setStageIndex(stage);
      setProgress(0);
      startTimeRef.current = performance.now();
      const duration = ENGINE_STAGES[stage].duration;

      const tick = (now: number) => {
        const elapsed = now - startTimeRef.current;
        const pct = Math.min((elapsed / duration) * 100, 100);
        if (isOnScreenRef.current) {
          setProgress(pct);
        }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, onComplete]);

  const currentStage = ENGINE_STAGES[stageIndex];
  const isComplete = stageIndex === ENGINE_STAGES.length - 1 && progress >= 100;

  return (
    <div className={`flex flex-col h-full transition-[border-color,background-color,box-shadow] duration-700 ${isActive ? 'ring-2 ring-blue-500/50 ring-offset-2 ring-offset-transparent' : ''}`}>
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-blue-500 text-black' : 'bg-[var(--bg-glass)] text-[var(--text-tertiary)]'}`}>
          Step 2
        </span>
        <div className="text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)] font-mono text-center">
          AEO Engine
        </div>
      </div>
      <div className={`flex-1 border rounded-lg p-4 font-mono text-sm relative overflow-hidden transition-[border-color,background-color,box-shadow] duration-700 ${isActive ? 'border-blue-500/50 bg-blue-950/40 shadow-lg shadow-blue-500/10' : 'border-[var(--border-strong)] bg-black/90'}`}>
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
function OutputColumn({
  active,
  onComplete,
  isActive,
}: {
  active: boolean;
  onComplete?: () => void;
  isActive: boolean;
  isOnScreenRef: React.RefObject<boolean>;
}) {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleCards([]);
      return;
    }

    setVisibleCards([]);
    hasCompletedRef.current = false;
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    // Stagger card reveals (no loop - one time only)
    OUTPUT_CARDS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleCards(prev => [...prev, i]);

        // If this is the last card, notify completion
        if (i === OUTPUT_CARDS.length - 1 && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          setTimeout(() => {
            onComplete?.();
          }, 200); // Quick completion after last card
        }
      }, i * 800); // 800ms between cards (calm pace)
      timeoutRefs.current.push(t);
    });

    return () => timeoutRefs.current.forEach(clearTimeout);
  }, [active, onComplete]);

  return (
    <div className={`flex flex-col h-full transition-[border-color,background-color,box-shadow] duration-700 ${isActive ? 'ring-2 ring-violet-500/50 ring-offset-2 ring-offset-transparent' : ''}`}>
      <div className="flex items-center justify-end gap-2 mb-3">
        <div className="text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)] font-mono text-right">
          AI Answers
        </div>
        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-violet-500 text-black' : 'bg-[var(--bg-glass)] text-[var(--text-tertiary)]'}`}>
          Step 3
        </span>
      </div>
      <div className={`flex-1 space-y-2 overflow-hidden transition-[border-color,background-color] duration-700 rounded-lg ${isActive ? 'p-2 bg-violet-950/30 border border-violet-500/30' : ''}`}>
        {OUTPUT_CARDS.map((card, i) => {
          const visible = visibleCards.includes(i);
          return (
            <div
              key={card.source}
              className="border border-[var(--border-default)] rounded-lg bg-black/95 p-3 font-mono text-xs leading-relaxed transition-[opacity,transform] duration-700"
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
  const vizRef = useRef<HTMLDivElement>(null);
  // Observe the visualization container (Step 1), not the section header
  const vizInView = useInView(vizRef, 0.1);
  const pathname = usePathname();

  // Two-way visibility tracking (ref, not state — no re-renders from this)
  // Columns check this before calling setState to avoid React work while offscreen
  const isOnScreenRef = useRef(true);
  useEffect(() => {
    const el = vizRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { isOnScreenRef.current = e.isIntersecting; },
      { threshold: 0, rootMargin: '100px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Sequential workflow state
  const [workflowPhase, setWorkflowPhase] = useState<'idle' | 'input' | 'engine' | 'output' | 'complete'>('idle');
  const hasStarted = useRef(false);

  // Reset animation state on route change so it replays
  useEffect(() => {
    hasStarted.current = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWorkflowPhase('idle');
  }, [pathname]);

  // Start workflow when the visualization enters view (once per page load)
  useEffect(() => {
    if (vizInView && !hasStarted.current) {
      hasStarted.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWorkflowPhase('input');
    }
  }, [vizInView]);

  const active = vizInView;

  // Phase callbacks - called when each phase completes
  const handleInputComplete = useCallback(() => {
    setWorkflowPhase('engine');
  }, []);

  const handleEngineComplete = useCallback(() => {
    setWorkflowPhase('output');
  }, []);

  const handleOutputComplete = useCallback(() => {
    setWorkflowPhase('complete');
  }, []);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ contain: 'layout style paint' }}
    >
      {/* Section header */}
      <div className="text-over-globe max-w-5xl mx-auto text-center mb-16">
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-[var(--text-secondary)] mb-4 font-mono">
          The Engine
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          Watch your visibility transform
        </h2>
        <p className="text-base md:text-lg text-[var(--text-primary)] max-w-xl mx-auto font-normal leading-relaxed opacity-80">
          From website crawl to AI recommendation — see how Rhemic AI makes your business the answer.
        </p>
        <div className="mt-6">
          <SummaryModal
            buttonText="Summarize and Understand our Engine"
            modalTitle="Understand our Engine"
          />
        </div>
      </div>

      {/* 3-column engine visualization — vizRef triggers the animation */}
      <div ref={vizRef} className="max-w-6xl mx-auto">
        {/* Flow arrows for md+ screens */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-0 items-stretch" style={{ minHeight: '420px' }}>
          {/* Input */}
          <div className="min-w-0">
            <InputColumn
              active={active && workflowPhase === 'input'}
              onComplete={handleInputComplete}
              isActive={workflowPhase === 'input'}
              isOnScreenRef={isOnScreenRef}
            />
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center px-3">
            <div className="text-[var(--text-muted)] text-2xl font-mono select-none" aria-hidden="true">→</div>
          </div>

          {/* Engine */}
          <div className="min-w-0">
            <EngineColumn
              active={active && (workflowPhase === 'engine' || workflowPhase === 'output' || workflowPhase === 'complete')}
              onComplete={handleEngineComplete}
              isActive={workflowPhase === 'engine'}
              isOnScreenRef={isOnScreenRef}
            />
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center px-3">
            <div className="text-[var(--text-muted)] text-2xl font-mono select-none" aria-hidden="true">→</div>
          </div>

          {/* Output */}
          <div className="min-w-0">
            <OutputColumn
              active={active && (workflowPhase === 'output' || workflowPhase === 'complete')}
              onComplete={handleOutputComplete}
              isActive={workflowPhase === 'output'}
              isOnScreenRef={isOnScreenRef}
            />
          </div>
        </div>

        {/* Mobile: stacked layout — same sequential animation as desktop */}
        <div className="md:hidden space-y-6">
          <InputColumn
            active={active && workflowPhase === 'input'}
            onComplete={handleInputComplete}
            isActive={workflowPhase === 'input'}
            isOnScreenRef={isOnScreenRef}
          />
          <div className="text-center text-[var(--text-muted)] text-2xl font-mono select-none" aria-hidden="true">↓</div>
          <EngineColumn
            active={active && (workflowPhase === 'engine' || workflowPhase === 'output' || workflowPhase === 'complete')}
            onComplete={handleEngineComplete}
            isActive={workflowPhase === 'engine'}
            isOnScreenRef={isOnScreenRef}
          />
          <div className="text-center text-[var(--text-muted)] text-2xl font-mono select-none" aria-hidden="true">↓</div>
          <OutputColumn
            active={active && (workflowPhase === 'output' || workflowPhase === 'complete')}
            onComplete={handleOutputComplete}
            isActive={workflowPhase === 'output'}
            isOnScreenRef={isOnScreenRef}
          />
        </div>
      </div>
    </section>
  );
}

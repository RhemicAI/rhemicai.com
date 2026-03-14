'use client';

import { useState, useEffect } from 'react';
import FixedNav from '@/components/FixedNav/FixedNav';
import SmbHero from '@/components/SmbHero/SmbHero';
import AiVisibilityWidget from '@/components/AiVisibilityWidget/AiVisibilityWidget';
import BeforeAfter from '@/components/BeforeAfter/BeforeAfter';
import WebsiteOffer from '@/components/WebsiteOffer/WebsiteOffer';
import SmbPricing from '@/components/SmbPricing/SmbPricing';
import IndustryTrust from '@/components/IndustryTrust/IndustryTrust';
import Footer from '@/components/Footer/Footer';

function slowScrollTo(id: string, duration = 2200) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = window.scrollY;
  const end = el.getBoundingClientRect().top + window.scrollY - 80;
  const startTime = performance.now();
  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + (end - start) * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── Section 3: The Shift ── */
function TheShift() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4 font-body">
            The Shift
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display">
            Buyers aren&apos;t Googling anymore.
          </h2>
        </div>

        <div className="space-y-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-body max-w-2xl mx-auto">
          <p>
            More customers now ask AI assistants who to hire before they ever search Google.
          </p>
          <p className="text-[var(--text-muted)] italic">
            &ldquo;Best plumber in Austin.&rdquo; &ldquo;Top-rated roofer near me.&rdquo; &ldquo;Who does HVAC in my area?&rdquo;
          </p>
          <p>
            AI gives them an answer — a short list of businesses it recommends. If you&apos;re not on that list, you don&apos;t exist in that moment. Doesn&apos;t matter how good your work is.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-[rgba(15,15,15,0.85)] p-5 text-center">
            <p className="text-3xl font-bold text-violet-400 font-display">1 in 3</p>
            <p className="mt-1 text-sm text-[var(--text-muted)] font-body">
              More than 1 in 3 buyers now start their search inside an AI assistant
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[rgba(15,15,15,0.85)] p-5 text-center">
            <p className="text-3xl font-bold text-violet-400 font-display">&darr;</p>
            <p className="mt-1 text-sm text-[var(--text-muted)] font-body">
              Search engine volume is projected to decline significantly as AI answers replace traditional results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 5: How It Works ── */
const steps = [
  {
    number: '01',
    title: 'We scan',
    description:
      'Test the exact questions your customers are asking right now across ChatGPT, Claude, Gemini, and Perplexity.',
  },
  {
    number: '02',
    title: 'We show you',
    description:
      'See which competitors are stealing your leads in AI, name by name.',
  },
  {
    number: '03',
    title: 'We tell you how to fix it',
    description:
      'Plain-English steps, no jargon, no guesswork.',
  },
];

function HowItWorks() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4 font-body">
            How It Works
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display">
            We show you what AI says about your business — and your competitors.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-white/10 bg-[rgba(15,15,15,0.85)] p-6 hover:border-violet-500/30 transition-colors duration-300"
            >
              <span className="inline-block text-sm font-mono font-bold text-violet-400 mb-3">
                {step.number}
              </span>
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-display mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 9: FAQ ── */
const smbFaqs = [
  {
    question: 'Will this work if I don\'t have a website?',
    answer:
      'Yes — and if you don\'t have one, we\'ll build it for you on the Growth plan. Included in the price, no extra charge.',
  },
  {
    question: 'How is this different from SEO?',
    answer:
      'SEO gets you ranked on Google. This gets you into AI recommendations — where more buyers are starting their search every day. They\'re different systems. Most local businesses are ignoring AI entirely right now. That\'s your window.',
  },
  {
    question: 'How fast does it work?',
    answer:
      'The scan takes 60 seconds. Visibility improvements depend on how quickly you implement the recommendations — most businesses see movement within a few weeks.',
  },
  {
    question: 'Do I need any tech skills?',
    answer:
      'None. You enter your business name, we run the scan, you get a plain-English report telling you exactly what to fix.',
  },
  {
    question: 'What kinds of businesses is this built for?',
    answer:
      'Any local service business — roofing, plumbing, HVAC, electrical, landscaping, legal, dental, auto repair. If customers search for your type of service, they\'re starting to ask AI instead. That\'s who we help.',
  },
];

function SmbFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-20 md:py-28 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-4 font-body">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] font-display">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {smbFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-[rgba(15,15,15,0.85)] hover:border-[var(--border-default)] transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-semibold text-[var(--text-primary)] font-body">
                  {faq.question}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 ${
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

              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: openIndex === index ? '500px' : '0px' }}
              >
                <div className="px-6 pb-5">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-body">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 10: Footer CTA ── */
function SmbFooterCTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[1200px] h-[800px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top center, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 30%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)] font-display">
          Your competitors are already in the AI answer. Find out where you stand — free.
        </h2>

        <div className="mt-8">
          <a
            href="#ai-visibility-scan"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-full shadow-lg shadow-violet-500/50 transition-all duration-200 hover:scale-105 font-body"
          >
            Run your free scan
          </a>
        </div>

        <p className="mt-4 text-sm text-[var(--text-muted)] font-body">
          No signup, no credit card. Results in 60 seconds.
        </p>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function ForLocalBusinesses() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href="#ai-visibility-scan"]');
      if (!anchor) return;
      e.preventDefault();
      slowScrollTo('ai-visibility-scan');
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <main className="min-h-screen selection:bg-violet-500/20 selection:text-white">
      <FixedNav />
      {/* Section 1: Hero */}
      <SmbHero />
      {/* Section 2: Live Scan Widget */}
      <AiVisibilityWidget placeholder="Enter your business name" />
      {/* Section 3: The Shift */}
      <TheShift />
      {/* Section 4: Before / After Mock */}
      <BeforeAfter />
      {/* Section 5: How It Works */}
      <HowItWorks />
      {/* Section 6: Free Website Offer */}
      <WebsiteOffer />
      {/* Section 7: Pricing */}
      <SmbPricing />
      {/* Section 8: Trust Signals */}
      <IndustryTrust />
      {/* Section 9: FAQ */}
      <SmbFAQ />
      {/* Section 10: Footer CTA */}
      <SmbFooterCTA />
      <Footer />
    </main>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const DISMISS_KEY = 'rhemic_offer_popup_dismissed_at';
const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 3000;
const EXIT_MS = 260;

function recentlyDismissed(): boolean {
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const at = Number(raw);
    if (!at) return false;
    return Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export default function OfferPopup() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false); // in the DOM (kept during exit anim)
  const [visible, setVisible] = useState(false); // drives enter/exit transition

  // Never show on the calculator page itself (it's the destination).
  const suppressed = pathname?.startsWith('/free-consult-leak-calculator') ?? false;

  const persistDismiss = useCallback(() => {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore storage failures
    }
  }, []);

  // Animate out, then unmount.
  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => setMounted(false), EXIT_MS);
  }, []);

  const dismiss = useCallback(() => {
    persistDismiss();
    close();
  }, [persistDismiss, close]);

  const goToCalculator = useCallback(() => {
    persistDismiss();
    setVisible(false);
    window.setTimeout(() => {
      setMounted(false);
      router.push('/free-consult-leak-calculator');
    }, EXIT_MS);
  }, [persistDismiss, router]);

  // Show after the delay on a fresh visit.
  useEffect(() => {
    if (suppressed || recentlyDismissed()) return;
    const timer = window.setTimeout(() => setMounted(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [suppressed]);

  // Trigger the enter transition one frame after mount.
  useEffect(() => {
    if (!mounted) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  // Lock scroll + Esc to close while mounted.
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mounted, dismiss]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Free consult leak snapshot offer"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div
        className={`absolute inset-0 bg-[#030507]/85 backdrop-blur-xl transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`relative z-10 grid max-h-[90svh] w-full max-w-[940px] overflow-y-auto rounded-[24px] border border-white/10 bg-[#07090c] shadow-[0_28px_90px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out will-change-transform motion-reduce:transition-none md:grid-cols-2 ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.97] opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 rounded-full border border-white/15 bg-black/40 p-2 text-white/80 transition-colors hover:border-[var(--pulse)] hover:text-[var(--pulse-deep)]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Image panel — top banner on mobile, left column on desktop */}
        <div className="relative h-40 w-full sm:h-52 md:h-auto md:min-h-[460px]">
          <Image
            src="/popup-offer.png"
            alt="Modern med spa"
            fill
            sizes="(min-width: 768px) 470px, 100vw"
            className="object-cover object-[50%_30%] md:object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090c] via-[#07090c]/25 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#07090c]" />
        </div>

        {/* Offer panel */}
        <div className="relative flex flex-col justify-center gap-5 bg-[radial-gradient(ellipse_at_top_right,rgba(77,214,224,0.16),transparent_55%)] px-7 py-9 sm:px-9 sm:py-12">
          <h2 className="font-display text-[28px] font-semibold leading-[1.05] text-[var(--text-primary)] sm:text-4xl">
            See where your med spa is leaking money.
          </h2>

          <p className="text-[15px] leading-[1.65] text-[var(--text-secondary)]">
            Run the free 60-second Consult Leak Calculator. Then lock <strong className="font-semibold text-[var(--text-primary)]">25% off plus your setup fee waived</strong> when you book your audit.
          </p>

          <div>
            <button
              type="button"
              onClick={goToCalculator}
              className="inline-block w-full rounded-full bg-[var(--ink)] px-7 py-4 text-center text-base font-semibold text-[var(--bg)] shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--pulse)] sm:w-auto"
            >
              Get my free snapshot
            </button>
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            60 seconds. No card. U.S. med spas only.
          </p>

          <button
            type="button"
            onClick={dismiss}
            className="w-fit text-left text-xs text-[var(--text-muted)] underline underline-offset-4 transition-colors hover:text-[var(--text-secondary)]"
          >
            No thanks, I&apos;m not losing consults.
          </button>
        </div>
      </div>
    </div>
  );
}

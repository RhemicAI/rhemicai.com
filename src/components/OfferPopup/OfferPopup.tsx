'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const DISMISS_KEY = 'rhemic_offer_popup_dismissed_at';
const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 3000;

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
  const [open, setOpen] = useState(false);

  // Never show on the calculator page itself (it's the destination).
  const suppressed = pathname?.startsWith('/free-consult-leak-calculator') ?? false;

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore storage failures
    }
    setOpen(false);
  }, []);

  const goToCalculator = useCallback(() => {
    dismiss();
    router.push('/free-consult-leak-calculator');
  }, [dismiss, router]);

  useEffect(() => {
    if (suppressed || recentlyDismissed()) return;
    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [suppressed]);

  useEffect(() => {
    if (!open) return;
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
  }, [open, dismiss]);

  if (!open) return null;

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
      <div className="absolute inset-0 bg-[#030507]/85 backdrop-blur-xl" />

      <div className="relative z-10 grid w-full max-w-[940px] overflow-hidden rounded-[24px] border border-white/10 bg-[#07090c] shadow-[0_28px_90px_rgba(0,0,0,0.7)] md:grid-cols-2">
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

        {/* Image panel */}
        <div className="relative hidden min-h-[460px] md:block">
          <Image
            src="/popup-offer.png"
            alt="Modern med spa"
            fill
            sizes="(min-width: 768px) 470px, 0px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#07090c]" />
        </div>

        {/* Offer panel */}
        <div className="relative flex flex-col justify-center gap-5 bg-[radial-gradient(ellipse_at_top_right,rgba(77,214,224,0.16),transparent_55%)] px-7 py-10 sm:px-9 sm:py-12">
          <h2 className="font-display text-3xl font-semibold leading-[1.05] text-[var(--text-primary)] sm:text-4xl">
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

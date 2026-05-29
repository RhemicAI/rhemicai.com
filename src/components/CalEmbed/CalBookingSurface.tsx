'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CAL_BOOKING_EVENT_NAME,
  getCalBookingUrl,
  getCalEmbedUrl,
  type CalBookingDetail,
  type CalLink,
} from '@/lib/calEmbed';

type BookingEvent = CustomEvent<CalBookingDetail>;

const DEFAULT_CAL_LINK: CalLink = 'rhemic-ai/medspa-discovery-call';
const DEFAULT_DURATION_LABEL = '30 minute audit';
const DEFAULT_TITLE = 'Book the visibility + call leak audit.';
const DEFAULT_SUBTITLE = 'Select a slot, then complete the med spa qualifier.';
const DEFAULT_PREP_NOTE = 'Pick a time and answer the short qualifier. We use the details to review your clinic before the audit.';

function isBookingEvent(event: Event): event is BookingEvent {
  return event.type === CAL_BOOKING_EVENT_NAME;
}

export default function CalBookingSurface() {
  const [isOpen, setIsOpen] = useState(false);
  const [calLink, setCalLink] = useState<CalLink>(DEFAULT_CAL_LINK);
  const [prefill, setPrefill] = useState<Record<string, string> | undefined>(undefined);
  const [durationLabel, setDurationLabel] = useState<string>(DEFAULT_DURATION_LABEL);
  const [title, setTitle] = useState<string>(DEFAULT_TITLE);
  const [subtitle, setSubtitle] = useState<string>(DEFAULT_SUBTITLE);
  const [prepNote, setPrepNote] = useState<string>(DEFAULT_PREP_NOTE);

  const bookingUrl = useMemo(() => getCalBookingUrl(calLink, prefill), [calLink, prefill]);
  const embedUrl = useMemo(() => getCalEmbedUrl(calLink, prefill), [calLink, prefill]);

  useEffect(() => {
    const openBooking = (event: Event) => {
      if (!isBookingEvent(event)) return;
      setCalLink(event.detail?.calLink ?? DEFAULT_CAL_LINK);
      setPrefill(event.detail?.prefill);
      setDurationLabel(event.detail?.durationLabel ?? DEFAULT_DURATION_LABEL);
      setTitle(event.detail?.title ?? DEFAULT_TITLE);
      setSubtitle(event.detail?.subtitle ?? DEFAULT_SUBTITLE);
      setPrepNote(event.detail?.prepNote ?? DEFAULT_PREP_NOTE);
      setIsOpen(true);
    };

    window.addEventListener(CAL_BOOKING_EVENT_NAME, openBooking);
    return () => window.removeEventListener(CAL_BOOKING_EVENT_NAME, openBooking);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center px-3 py-3 sm:items-center sm:px-6 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Book a Rhemic AI visibility and call leak audit"
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <div className="absolute inset-0 bg-[#030507]/82 backdrop-blur-xl" />
      <div className="relative z-10 grid max-h-[94svh] w-full max-w-[1180px] overflow-hidden rounded-[24px] border border-white/10 bg-[#07090c] shadow-[0_28px_90px_rgba(0,0,0,0.68)] lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="relative hidden min-h-[680px] border-r border-white/10 bg-[radial-gradient(ellipse_at_top_left,rgba(77,214,224,0.18),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-8 lg:block">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(238,242,247,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(238,242,247,0.045)_1px,transparent_1px)] bg-[length:40px_40px]" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(77,214,224,0.22)] bg-[rgba(77,214,224,0.12)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--pulse-deep)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--pulse)] shadow-[0_0_10px_var(--pulse-glow)]" />
              {durationLabel}
            </div>

            <div className="mt-10">
              <p className="section-label mb-4">Rhemic AI</p>
              <h2 id="cal-booking-title" className="max-w-[360px] text-[2.75rem] font-semibold leading-[0.96] tracking-normal text-[var(--ink)]">
                {title}
              </h2>
              <p className="mt-5 max-w-[360px] text-base leading-7 text-[var(--mute)]">
                We review where consult opportunities may be leaking across search, AI answers, calls, handoffs, and source clarity before the call.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {[
                'Clinic website and location profile',
                'Current consult leak pattern',
                'Booking and front desk setup',
                'Marketing spend and urgency',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm text-[var(--ink-2)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--pulse)] shadow-[0_0_10px_var(--pulse-glow)]" />
                  {item}
                </div>
              ))}
            </div>

            {prepNote ? (
              <div className="mt-auto rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--pulse-deep)]">
                  Before the call
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--mute)]">
                  {prepNote}
                </p>
              </div>
            ) : null}
          </div>
        </aside>

        <section className="flex h-[94svh] min-h-0 flex-col bg-[#0a0d11] lg:h-auto lg:min-h-[680px]">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
            <div className="min-w-0 lg:hidden">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--pulse-deep)]">{durationLabel}</p>
              <h2 id="cal-booking-title-mobile" className="mt-1 text-xl font-semibold text-[var(--ink)]">
                {title}
              </h2>
            </div>
            <div className="hidden min-w-0 lg:block">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--pulse-deep)]">
                Choose your audit time
              </p>
              <p className="mt-1 text-sm text-[var(--mute)]">
                {subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2 text-[var(--ink)] transition-colors hover:border-[var(--pulse)] hover:text-[var(--pulse-deep)]"
              aria-label="Close booking"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1 bg-[#101418]">
            <iframe
              title="Book a Rhemic AI visibility and call leak audit"
              src={embedUrl}
              className="h-full min-h-0 w-full border-0 bg-[#101418]"
              allow="camera; microphone; fullscreen; payment"
            />
          </div>

          <div className="flex flex-col gap-2 border-t border-white/10 bg-[#07090c] px-4 py-3 text-xs text-[var(--mute)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>Your Zoom link and reminders are sent automatically after booking.</span>
            <a className="text-[var(--pulse-deep)] hover:text-[var(--pulse)]" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Open full calendar
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

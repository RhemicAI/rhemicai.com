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

const DEFAULT_CAL_LINK: CalLink = 'rhemic-ai/rhemic-ai-audit-walkthrough';
const DEFAULT_DURATION_LABEL = '20 minute audit';
const DEFAULT_TITLE = 'Run your revenue leak audit.';
const DEFAULT_SUBTITLE = 'Pick a time. We will show you where leads leak.';
const DEFAULT_PREP_NOTE =
  'We scan your AI visibility, Google presence, and call capture before the call, so it is specific to your business.';

const CHECKLIST = [
  'Where you show up in AI answers',
  'Google Business and local search presence',
  'Missed-call and after-hours capture',
  'Where your customers come from',
];

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
      aria-label="Run your Rhemic AI revenue leak audit"
      onClick={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <div className="absolute inset-0 bg-[#1b1813]/70 backdrop-blur-md" />
      <div className="relative z-10 grid max-h-[94svh] w-full max-w-[1180px] overflow-hidden rounded-[6px] border-[1.5px] border-[var(--ink)] bg-[var(--paper)] shadow-[6px_8px_0_rgba(33,29,22,0.18)] lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left rail — our cream UI */}
        <aside className="relative hidden min-h-[660px] border-r border-[var(--line)] bg-[var(--paper-2)] p-8 lg:block">
          <div className="relative z-10 flex h-full flex-col">
            <div className="inline-flex w-fit items-center gap-2 border border-[var(--line-strong)] bg-[var(--spot-soft)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-spot-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--spot)]" />
              {durationLabel}
            </div>

            <div className="mt-10">
              <p className="kicker mb-4">Rhemic AI</p>
              <h2 id="cal-booking-title" className="max-w-[360px] font-display text-[2.5rem] font-medium leading-[1.0] text-ink">
                {title}
              </h2>
              <p className="mt-5 max-w-[360px] font-body text-base leading-7 text-ink-2">
                We review where leads leak across AI answers, search, calls, and handoffs before the
                call, so the time is spent on your numbers, not a generic pitch.
              </p>
            </div>

            <div className="mt-9 space-y-3">
              {CHECKLIST.map((item) => (
                <div key={item} className="flex items-center gap-3 border border-[var(--line)] bg-[var(--paper)] px-4 py-3 font-body text-sm text-ink-2">
                  <span className="h-1.5 w-1.5 shrink-0 bg-spot" />
                  {item}
                </div>
              ))}
            </div>

            {prepNote ? (
              <div className="mt-auto border border-[var(--line)] bg-[var(--paper)] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-spot-deep">Before the call</p>
                <p className="mt-2 font-body text-sm leading-6 text-ink-2">{prepNote}</p>
              </div>
            ) : null}
          </div>
        </aside>

        {/* Right — Cal embed inside our chrome */}
        <section className="flex h-[94svh] min-h-0 flex-col bg-[var(--paper)] lg:h-auto lg:min-h-[660px]">
          <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-4 py-4 sm:px-6">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-spot-deep lg:hidden">{durationLabel}</p>
              <p className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-spot-deep lg:block">Choose your audit time</p>
              <h2 className="mt-1 font-display text-xl font-semibold text-ink lg:text-[1.05rem] lg:font-medium lg:text-ink-2">
                <span className="lg:hidden">{title}</span>
                <span className="hidden lg:inline">{subtitle}</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="shrink-0 rounded-[2px] border border-[var(--ink)] bg-transparent p-2 text-ink transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              aria-label="Close booking"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1 bg-[var(--paper)]">
            <iframe
              title="Run your Rhemic AI revenue leak audit"
              src={embedUrl}
              className="h-full min-h-0 w-full border-0 bg-[var(--paper)]"
              allow="camera; microphone; fullscreen; payment"
            />
          </div>

          <div className="flex flex-col gap-2 border-t border-[var(--line)] bg-[var(--paper-2)] px-4 py-3 font-body text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>Your call link and reminders are sent automatically after booking.</span>
            <a className="link-rule font-mono uppercase tracking-[0.12em] text-spot-deep" href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Open full calendar
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export const CAL_EMBED_SCRIPT_SRC = 'https://app.cal.com/embed/embed.js';
// Cal.com updates embed.js frequently without publishing SRI hashes.
// Using integrity= causes a silent browser block whenever the file is updated.
// Removed — the CSP allowlist (app.cal.com) is the security boundary instead.
export const CAL_ORIGIN = 'https://cal.com';
export const CAL_BOOKING_EVENT_NAME = 'rhemic:open-cal-booking';

// Add new approved Cal paths here instead of widening component props.
export type CalLink =
  | 'rhemic-ai'
  | 'rhemic-ai/medspa-discovery-call'
  | 'rhemic-ai/medspa-consult-leak-audit';

export function getCalBookingUrl(calLink: CalLink, prefill?: Record<string, string>): string {
  const base = `${CAL_ORIGIN}/${calLink}`;
  if (!prefill || Object.keys(prefill).length === 0) return base;
  const url = new URL(base);
  for (const [key, value] of Object.entries(prefill)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

export function getCalEmbedUrl(calLink: CalLink, prefill?: Record<string, string>): string {
  const url = new URL(getCalBookingUrl(calLink, prefill));
  url.searchParams.set('embed', 'true');
  url.searchParams.set('theme', 'dark');
  return url.toString();
}

// Detail payload for the CAL_BOOKING_EVENT_NAME custom event. Lets callers open the
// in-page booking surface with a specific event, prefilled fields, and matching copy.
export type CalBookingDetail = {
  calLink?: CalLink;
  prefill?: Record<string, string>;
  durationLabel?: string;
  title?: string;
  subtitle?: string;
  // Left-rail "Before the call" note. Pass an empty string to hide the block entirely.
  prepNote?: string;
};

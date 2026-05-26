export const CAL_EMBED_SCRIPT_SRC = 'https://app.cal.com/embed/embed.js';
// Cal.com updates embed.js frequently without publishing SRI hashes.
// Using integrity= causes a silent browser block whenever the file is updated.
// Removed — the CSP allowlist (app.cal.com) is the security boundary instead.
export const CAL_ORIGIN = 'https://cal.com';
export const CAL_BOOKING_EVENT_NAME = 'rhemic:open-cal-booking';

// Add new approved Cal paths here instead of widening component props.
export type CalLink =
  | 'rhemic-ai'
  | 'rhemic-ai/medspa-discovery-call';

export function getCalBookingUrl(calLink: CalLink): string {
  return `${CAL_ORIGIN}/${calLink}`;
}

export function getCalEmbedUrl(calLink: CalLink): string {
  const url = new URL(getCalBookingUrl(calLink));
  url.searchParams.set('embed', 'true');
  url.searchParams.set('theme', 'dark');
  return url.toString();
}

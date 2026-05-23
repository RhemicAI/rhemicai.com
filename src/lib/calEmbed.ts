export const CAL_EMBED_SCRIPT_SRC = 'https://app.cal.com/embed/embed.js';
// Cal.com updates embed.js frequently without publishing SRI hashes.
// Using integrity= causes a silent browser block whenever the file is updated.
// Removed — the CSP allowlist (app.cal.com) is the security boundary instead.
export const CAL_ORIGIN = 'https://cal.com';

// Add new approved Cal paths here instead of widening component props.
export type CalLink =
  | 'rhemic-ai'
  | 'rhemic-ai/medspa-discovery-call';

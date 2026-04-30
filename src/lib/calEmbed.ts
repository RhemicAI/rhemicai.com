export const CAL_EMBED_SCRIPT_SRC = 'https://app.cal.com/embed/embed.js';
export const CAL_EMBED_SCRIPT_INTEGRITY =
  'sha384-gxWkCO+L70TzEh27QvIxKCbY4PQbxJ8AdyRyJpwC0+HL4q7GXC8UNRF/XzerVZ3F';
export const CAL_ORIGIN = 'https://cal.com';

// Add new approved Cal paths here instead of widening component props.
export type CalLink =
  | 'rhemic-ai'
  | 'rhemic-ai/discovery-call'
  | 'rhemic-ai/smb-starter-onboarding'
  | 'rhemic-ai/smb-growth-onboarding'
  | 'rhemic-ai/smb-scale-onboarding';

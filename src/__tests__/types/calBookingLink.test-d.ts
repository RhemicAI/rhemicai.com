import type { CalLink } from '@/lib/calEmbed';
import type { CalBookingLinkProps } from '@/components/CalEmbed/CalBookingLink';

const approvedRootLink: CalLink = 'rhemic-ai';
const approvedDiscoveryLink: CalLink = 'rhemic-ai/discovery-call';
const approvedPricingLink: CalLink = 'rhemic-ai/smb-growth-onboarding';

const approvedProps: CalBookingLinkProps = {
  calLink: approvedDiscoveryLink,
  children: null,
};

void approvedRootLink;
void approvedPricingLink;
void approvedProps;

// @ts-expect-error - calLink rejects non-approved literal
const rejectedCalLink: CalLink = 'javascript:alert(1)';

// @ts-expect-error - calLink rejects non-approved literal
const rejectedProps: CalBookingLinkProps = {
  calLink: 'rhemic-ai/unreviewed-booking-path',
  children: null,
};

void rejectedCalLink;
void rejectedProps;

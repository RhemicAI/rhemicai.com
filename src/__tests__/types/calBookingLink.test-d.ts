import type { CalLink } from '@/lib/calEmbed';
import type { CalBookingLinkProps } from '@/components/CalEmbed/CalBookingLink';

const approvedRootLink: CalLink = 'rhemic-ai';
const approvedDiscoveryLink: CalLink = 'rhemic-ai/medspa-discovery-call';

const approvedProps: CalBookingLinkProps = {
  calLink: approvedDiscoveryLink,
  children: null,
};

void approvedRootLink;
void approvedProps;

// @ts-expect-error - calLink rejects non-approved literal
const rejectedCalLink: CalLink = 'javascript:alert(1)';

const rejectedProps: CalBookingLinkProps = {
  // @ts-expect-error - calLink rejects non-approved literal
  calLink: 'rhemic-ai/unreviewed-booking-path',
  children: null,
};

void rejectedCalLink;
void rejectedProps;

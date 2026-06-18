'use client';

import type { CSSProperties, ReactNode } from 'react';
import { CAL_BOOKING_EVENT_NAME, AUDIT_BOOKING_DETAIL } from '@/lib/calEmbed';

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onActivate?: () => void;
};

// Opens the in-page booking modal (CalBookingSurface) with the audit event.
// No redirect — the Cal embed renders inside our own cream UI.
// Booking detail is shared via AUDIT_BOOKING_DETAIL so header, blog CTAs, and
// inline blog links all open the identical flow.
export function openAuditBooking() {
  window.dispatchEvent(
    new CustomEvent(CAL_BOOKING_EVENT_NAME, { detail: AUDIT_BOOKING_DETAIL })
  );
}

export default function AuditButton({ className, style, children, onActivate }: Props) {
  const open = () => {
    openAuditBooking();
    onActivate?.();
  };

  return (
    <button type="button" onClick={open} className={className} style={style}>
      {children}
    </button>
  );
}

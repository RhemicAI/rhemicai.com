'use client';

import type { MouseEventHandler, ReactNode } from 'react';
import {
  CAL_BOOKING_EVENT_NAME,
  getCalBookingUrl,
  type CalLink,
} from '@/lib/calEmbed';

export interface CalBookingLinkProps {
  calLink?: CalLink;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

export default function CalBookingLink({ calLink, className, onClick, children }: CalBookingLinkProps) {
  // Default to the canonical audit event. The med-spa discovery call is a
  // retired single-vertical event.
  const resolvedCalLink = calLink ?? 'rhemic-ai/rhemic-ai-audit-walkthrough';
  const href = getCalBookingUrl(resolvedCalLink);

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        event.preventDefault();
        window.dispatchEvent(
          new CustomEvent(CAL_BOOKING_EVENT_NAME, {
            detail: { calLink: resolvedCalLink },
          }),
        );
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

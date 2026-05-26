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
  const resolvedCalLink = calLink ?? 'rhemic-ai/medspa-discovery-call';
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

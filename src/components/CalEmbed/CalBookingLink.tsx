'use client';

import type { MouseEventHandler, ReactNode } from 'react';
import type { CalLink } from '@/lib/calEmbed';

export interface CalBookingLinkProps {
  calLink?: CalLink;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

export default function CalBookingLink({ calLink, className, onClick, children }: CalBookingLinkProps) {
  const resolvedCalLink = calLink ?? 'rhemic-ai/medspa-discovery-call';
  const href = `https://cal.com/${resolvedCalLink}`;

  return (
    <a
      href={href}
      data-cal-link={resolvedCalLink}
      data-cal-namespace=""
      data-cal-config='{"layout":"month_view"}'
      className={className}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

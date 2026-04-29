'use client';

import type { MouseEventHandler, ReactNode } from 'react';

interface CalBookingLinkProps {
  calLink?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

export default function CalBookingLink({ calLink, className, onClick, children }: CalBookingLinkProps) {
  const resolvedCalLink = calLink ?? 'rhemic-ai';
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

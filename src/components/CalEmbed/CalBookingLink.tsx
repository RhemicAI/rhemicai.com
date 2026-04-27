'use client';

interface CalBookingLinkProps {
  calLink?: string;
  className?: string;
  children: React.ReactNode;
}

export default function CalBookingLink({ calLink, className, children }: CalBookingLinkProps) {
  const resolvedCalLink = calLink ?? 'rhemic-ai';
  const href = `https://cal.com/${resolvedCalLink}`;

  return (
    <a
      href={href}
      data-cal-link={resolvedCalLink}
      data-cal-namespace=""
      data-cal-config='{"layout":"month_view"}'
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

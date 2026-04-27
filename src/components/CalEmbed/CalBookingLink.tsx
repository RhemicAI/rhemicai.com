'use client';

interface CalBookingLinkProps {
  calLink?: string;
  className?: string;
  children: React.ReactNode;
}

export default function CalBookingLink({ calLink, className, children }: CalBookingLinkProps) {
  if (!calLink) {
    return <span className={className}>{children}</span>;
  }
  return (
    <a href={`https://cal.com/${calLink}`} data-cal-link={calLink} className={className}>
      {children}
    </a>
  );
}

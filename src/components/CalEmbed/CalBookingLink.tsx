'use client';

type Props = {
  calLink?: string;
  className: string;
  children: React.ReactNode;
};

export default function CalBookingLink({ calLink, className, children }: Props) {
  const href = calLink ? `https://cal.com/${calLink}` : 'https://cal.com/rhemic-ai';
  return (
    <a
      href={href}
      data-cal-link={calLink ?? 'rhemic-ai'}
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

interface UpdatedDateProps {
  date: string;
  className?: string;
}

export default function UpdatedDate({ date, className = '' }: UpdatedDateProps) {
  const formatted = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <p className={`text-sm text-[var(--text-muted)] flex items-center gap-2 ${className}`}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      Updated: {formatted}
    </p>
  );
}

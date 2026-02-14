interface KeyTakeawaysProps {
  takeaways: string[];
  heading?: string;
}

export default function KeyTakeaways({ takeaways, heading = 'Key Takeaways' }: KeyTakeawaysProps) {
  return (
    <div className="bg-[var(--bg-glass)] border border-[var(--border-default)] border-l-4 border-l-[var(--btn-primary-bg)] rounded-2xl p-8 my-8">
      <div className="flex items-center gap-3 mb-4">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--btn-primary-bg)] shrink-0"
        >
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
        </svg>
        <h3 className="text-xl font-bold text-[var(--text-primary)]">{heading}</h3>
      </div>
      <ul className="space-y-3">
        {takeaways.map((takeaway) => (
          <li key={takeaway} className="flex items-start gap-3 text-[var(--text-secondary)]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              className="shrink-0 mt-0.5"
            >
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--text-tertiary)]"
              />
              <path
                d="M6 10L9 13L14 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--text-primary)]"
              />
            </svg>
            {takeaway}
          </li>
        ))}
      </ul>
    </div>
  );
}

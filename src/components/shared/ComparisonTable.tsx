interface ComparisonTableProps {
  headers: string[];
  rows: { label: string; values: (string | boolean)[] }[];
  caption?: string;
}

export default function ComparisonTable({ headers, rows, caption }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border border-[var(--border-default)] rounded-xl overflow-hidden text-sm">
        {caption && (
          <caption className="text-left text-sm text-[var(--text-muted)] mb-2 px-1">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-[var(--bg-elevated)]">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] border-b border-[var(--border-default)]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`${
                i % 2 === 0 ? 'bg-[var(--bg-glass)]' : 'bg-transparent'
              } hover:bg-[var(--bg-elevated)] transition-colors`}
            >
              <td className="px-4 py-3 font-medium text-[var(--text-primary)] border-b border-[var(--border-subtle)]">
                {row.label}
              </td>
              {row.values.map((value, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-[var(--text-secondary)] border-b border-[var(--border-subtle)]"
                >
                  {typeof value === 'boolean' ? (
                    value ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-emerald-400"
                      >
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M6 10L9 13L14 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-red-400"
                      >
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M7 7L13 13M13 7L7 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

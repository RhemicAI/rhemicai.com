import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComparisonTable from '@/components/shared/ComparisonTable';

describe('ComparisonTable', () => {
  const headers = ['Feature', 'SEO', 'AEO'];
  const rows = [
    { label: 'Keywords', values: ['Yes', 'No'] },
    { label: 'Schema', values: [true, true] },
    { label: 'Citations', values: [false, true] },
  ];

  it('renders headers and rows', () => {
    render(<ComparisonTable headers={headers} rows={rows} />);
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('SEO')).toBeInTheDocument();
    expect(screen.getByText('AEO')).toBeInTheDocument();
    expect(screen.getByText('Keywords')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('renders boolean checkmark and x-mark as SVGs', () => {
    const { container } = render(<ComparisonTable headers={headers} rows={rows} />);
    const emeraldSvgs = container.querySelectorAll('.text-emerald-400');
    const redSvgs = container.querySelectorAll('.text-red-400');
    expect(emeraldSvgs.length).toBeGreaterThan(0);
    expect(redSvgs.length).toBeGreaterThan(0);
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UpdatedDate from '@/components/shared/UpdatedDate';

describe('UpdatedDate', () => {
  it('renders formatted date', () => {
    render(<UpdatedDate date="2026-02-14" />);
    expect(screen.getByText(/February 2026/)).toBeInTheDocument();
  });

  it('renders clock icon', () => {
    const { container } = render(<UpdatedDate date="2026-02-14" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

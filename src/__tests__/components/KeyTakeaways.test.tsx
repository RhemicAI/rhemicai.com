import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import KeyTakeaways from '@/components/shared/KeyTakeaways';

describe('KeyTakeaways', () => {
  const takeaways = ['First takeaway', 'Second takeaway', 'Third takeaway'];

  it('renders heading and takeaway items', () => {
    render(<KeyTakeaways takeaways={takeaways} />);
    expect(screen.getByText('Key Takeaways')).toBeInTheDocument();
    expect(screen.getByText('First takeaway')).toBeInTheDocument();
    expect(screen.getByText('Second takeaway')).toBeInTheDocument();
    expect(screen.getByText('Third takeaway')).toBeInTheDocument();
  });

  it('uses custom heading when provided', () => {
    render(<KeyTakeaways takeaways={takeaways} heading="Summary" />);
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });
});

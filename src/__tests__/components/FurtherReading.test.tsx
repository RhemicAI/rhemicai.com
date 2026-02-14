import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FurtherReading from '@/components/shared/FurtherReading';

// Mock next/link
import { vi } from 'vitest';
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('FurtherReading', () => {
  it('renders internal links', () => {
    const links = [{ title: 'Our Products', href: '/products' }];
    render(<FurtherReading links={links} />);
    const link = screen.getByText('Our Products');
    expect(link.closest('a')).toHaveAttribute('href', '/products');
  });

  it('renders external links with target _blank', () => {
    const links = [{ title: 'Google Guide', href: 'https://google.com', external: true }];
    render(<FurtherReading links={links} />);
    const link = screen.getByText('Google Guide').closest('a');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

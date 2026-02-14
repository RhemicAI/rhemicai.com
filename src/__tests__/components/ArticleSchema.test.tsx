import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';

// Mock next/script to render a real script tag
vi.mock('next/script', () => ({
  default: ({ children, id, type }: { children: string; id: string; type: string }) => (
    <script id={id} type={type}>{children}</script>
  ),
}));

import ArticleSchema from '@/components/SchemaOrg/ArticleSchema';

describe('ArticleSchema', () => {
  it('renders JSON-LD script tag with correct schema type', () => {
    const { container } = render(
      <ArticleSchema
        title="Test Article"
        description="A test description"
        url="https://rhemicai.com/blog/test"
        datePublished="2026-02-14"
      />
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    const schema = JSON.parse(script!.textContent || '');
    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.headline).toBe('Test Article');
    expect(schema.author.name).toBe('Rhemic AI');
  });
});

import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';

describe('Sitemap', () => {
  const entries = sitemap();

  it('returns all 14 routes including blog post', () => {
    expect(entries).toHaveLength(14);
  });

  it('includes the blog post route', () => {
    const blogPost = entries.find((e) => e.url.includes('/blog/what-is-aeo'));
    expect(blogPost).toBeDefined();
    expect(blogPost!.priority).toBe(0.7);
  });

  it('all URLs use rhemicai.com base', () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/rhemicai\.com/);
    }
  });
});

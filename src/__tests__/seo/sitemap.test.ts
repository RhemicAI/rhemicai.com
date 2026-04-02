import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { indexableRoutes } from '@/lib/content';

describe('Sitemap', () => {
  const entries = sitemap();

  it('returns an entry for every indexable route', () => {
    expect(entries).toHaveLength(indexableRoutes.length);
  });

  it('includes the blog post route', () => {
    const blogPost = entries.find((e) => e.url.includes('/blog/what-is-aeo'));
    expect(blogPost).toBeDefined();
    expect(blogPost!.priority).toBe(0.76);
  });

  it('all URLs use rhemicai.com base', () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/rhemicai\.com/);
    }
  });
});

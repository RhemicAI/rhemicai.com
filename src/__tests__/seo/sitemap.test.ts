import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { indexableRoutes } from '@/lib/content';

describe('Sitemap', () => {
  const entries = sitemap();

  it('returns an entry for every indexable route', () => {
    expect(entries).toHaveLength(indexableRoutes.length);
  });

  it('includes the med spa entity answer route', () => {
    const answerPage = entries.find((e) => e.url.includes('/answers/what-is-rhemic-ai'));
    expect(answerPage).toBeDefined();
    expect(answerPage!.lastModified).toBe('2026-05-22');
  });

  it('all URLs use rhemicai.com base', () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/rhemicai\.com/);
    }
  });
});

import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { indexableRoutes, getAllPosts } from '@/lib/content';

describe('Sitemap', () => {
  const entries = sitemap();
  const posts = getAllPosts();

  // Total expected: 1 blog index entry + all static indexable routes + one entry per MDX post
  const expectedLength = 1 + indexableRoutes.length + posts.length;

  it('returns an entry for every indexable route plus the blog index and all blog posts', () => {
    expect(entries).toHaveLength(expectedLength);
  });

  it('includes the /blog index entry with defined lastModified and correct priority', () => {
    const blogIndex = entries.find((e) => e.url.endsWith('/blog'));
    expect(blogIndex).toBeDefined();
    expect(blogIndex!.lastModified).toBeDefined();
    expect(blogIndex!.priority).toBe(0.84);
  });

  it('includes each individual blog post entry with defined lastModified', () => {
    for (const post of posts) {
      const entry = entries.find((e) => e.url.includes(`/blog/${post.slug}`));
      expect(entry).toBeDefined();
      expect(entry!.lastModified).toBeDefined();
    }
  });

  it('includes the seed post /blog/why-home-service-businesses-lose-leads-to-ai-answers', () => {
    const seedEntry = entries.find((e) =>
      e.url.includes('/blog/why-home-service-businesses-lose-leads-to-ai-answers')
    );
    expect(seedEntry).toBeDefined();
    expect(seedEntry!.lastModified).toBeDefined();
    expect(seedEntry!.priority).toBeGreaterThan(0);
  });

  it('includes the med spa entity answer route', () => {
    const answerPage = entries.find((e) => e.url.includes('/answers/what-is-rhemic-ai'));
    expect(answerPage).toBeDefined();
    expect(answerPage!.lastModified).toBe('2026-05-26');
  });

  it('includes the med spa how-it-works answer route', () => {
    const answerPage = entries.find((e) => e.url.includes('/answers/how-does-rhemic-ai-work'));
    expect(answerPage).toBeDefined();
    expect(answerPage!.lastModified).toBe('2026-05-26');
  });

  it('all URLs use rhemicai.com base', () => {
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/rhemicai\.com/);
    }
  });
});

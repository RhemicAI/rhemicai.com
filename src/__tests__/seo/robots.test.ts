import { describe, it, expect } from 'vitest';
import robots from '@/app/robots';

describe('Robots', () => {
  const config = robots();

  it('allows all AI crawlers', () => {
    const aiCrawlers = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended'];
    const userAgents = config.rules
      ? (Array.isArray(config.rules) ? config.rules : [config.rules]).map((r) =>
          typeof r.userAgent === 'string' ? r.userAgent : r.userAgent?.[0]
        )
      : [];

    for (const crawler of aiCrawlers) {
      expect(userAgents).toContain(crawler);
    }
  });

  it('disallows /api/ and /_next/', () => {
    const wildcardRule = Array.isArray(config.rules)
      ? config.rules.find((r) => r.userAgent === '*')
      : config.rules;

    expect(wildcardRule).toBeDefined();
    const disallowed = Array.isArray(wildcardRule!.disallow)
      ? wildcardRule!.disallow
      : [wildcardRule!.disallow];
    expect(disallowed).toContain('/api/');
    expect(disallowed).toContain('/_next/');
  });
});

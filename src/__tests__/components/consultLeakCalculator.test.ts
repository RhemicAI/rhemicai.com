import { describe, expect, it } from 'vitest';
import { getLeakTeaser } from '@/components/ConsultLeakCalculator/ConsultLeakCalculator';

describe('getLeakTeaser', () => {
  it('keeps exact dollar estimates out of the pre-gate teaser', () => {
    const teaser = getLeakTeaser(13750);
    const teaserText = Object.values(teaser).join(' ');

    expect(teaser.range).toBe('$10k-$20k /mo range');
    expect(teaserText).not.toContain('$13,750');
    expect(teaserText).not.toContain('$165,000');
    expect(teaserText).toContain('exact estimate');
  });

  it('uses broad severity ranges instead of exact values', () => {
    expect(getLeakTeaser(9500).range).toBe('Under $10k /mo');
    expect(getLeakTeaser(10000).range).toBe('$10k-$20k /mo range');
    expect(getLeakTeaser(20000).range).toBe('$20k+ /mo range');
  });
});

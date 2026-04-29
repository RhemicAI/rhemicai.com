import { describe, expect, it } from 'vitest';
import nextConfig from '../../../next.config';
import { getSecurityHeaders } from '@/lib/securityHeaders';

describe('Security headers', () => {
  it('keeps the production header snapshot stable', () => {
    const headers = Object.fromEntries(
      getSecurityHeaders().map(({ key, value }) => [key, value])
    );

    expect(headers).toMatchInlineSnapshot(`
      {
        "Content-Security-Policy": "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline' https://app.cal.com https://cal.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; frame-src 'self' https://cal.com https://app.cal.com; connect-src 'self' https://api.cal.com https://app.cal.com https://cal.com https://www.google-analytics.com https://region1.google-analytics.com https://vitals.vercel-insights.com; worker-src 'self' blob:; upgrade-insecure-requests",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-Robots-Tag": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      }
    `);
  });

  it('wires the headers into the Next config', async () => {
    const headers = await nextConfig.headers?.();

    expect(headers).toEqual([
      {
        source: '/(.*)',
        headers: getSecurityHeaders(),
      },
    ]);
  });
});

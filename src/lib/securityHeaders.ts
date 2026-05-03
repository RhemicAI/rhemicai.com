import { CAL_ORIGIN, CAL_EMBED_SCRIPT_SRC } from './calEmbed';

type Header = {
  key: string;
  value: string;
};

type SecurityHeaderOptions = {
  isDevelopment?: boolean;
};

const CAL_APP_ORIGIN = new URL(CAL_EMBED_SCRIPT_SRC).origin;

export function getContentSecurityPolicy({ isDevelopment = false }: SecurityHeaderOptions = {}) {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
    CAL_APP_ORIGIN,
    CAL_ORIGIN,
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://va.vercel-scripts.com',
  ];

  const connectSrc = [
    "'self'",
    'https://api.rhemicai.com',
    'https://api.cal.com',
    CAL_APP_ORIGIN,
    CAL_ORIGIN,
    'https://www.google-analytics.com',
    'https://region1.google-analytics.com',
    'https://vitals.vercel-insights.com',
    ...(isDevelopment ? ['ws:', 'http://localhost:*', 'http://127.0.0.1:*'] : []),
  ];

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    `script-src ${scriptSrc.join(' ')}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `frame-src 'self' ${CAL_ORIGIN} ${CAL_APP_ORIGIN}`,
    `connect-src ${connectSrc.join(' ')}`,
    "worker-src 'self' blob:",
    'upgrade-insecure-requests',
  ].join('; ');
}

export function getSecurityHeaders(options: SecurityHeaderOptions = {}): Header[] {
  return [
    {
      key: 'X-Robots-Tag',
      value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      key: 'Content-Security-Policy',
      value: getContentSecurityPolicy(options),
    },
    {
      key: 'X-Frame-Options',
      value: 'DENY',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=()',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
  ];
}

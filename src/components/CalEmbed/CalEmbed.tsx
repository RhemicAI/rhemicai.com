'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import {
  CAL_EMBED_SCRIPT_INTEGRITY,
  CAL_EMBED_SCRIPT_SRC,
  CAL_ORIGIN,
} from '@/lib/calEmbed';

const calBootstrapScript = `
  (function (C) {
    C.Cal = C.Cal || function () {
      C.Cal.q = C.Cal.q || [];
      C.Cal.q.push(arguments);
    };
    C.Cal.loaded = true;
    C.Cal.ns = C.Cal.ns || {};
    C.Cal.q = C.Cal.q || [];
  })(window);
  Cal("init", { origin: "${CAL_ORIGIN}" });
`;

export default function CalEmbed() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.('a[data-cal-link]');
      if (el) e.preventDefault();
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <>
      <Script
        id="cal-embed-bootstrap"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: calBootstrapScript }}
      />
      <Script
        id="cal-embed-loader"
        src={CAL_EMBED_SCRIPT_SRC}
        strategy="afterInteractive"
        integrity={CAL_EMBED_SCRIPT_INTEGRITY}
        crossOrigin="anonymous"
      />
    </>
  );
}

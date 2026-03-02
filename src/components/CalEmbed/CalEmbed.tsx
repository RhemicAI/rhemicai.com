'use client';

import { useEffect } from 'react';
import Script from 'next/script';

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
    <Script
      id="cal-embed"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function (C, A, L) {
            let p = function (a, ar) { a.q.push(ar); };
            let d = C.document;
            C.Cal = C.Cal || function () {
              let cal = C.Cal; let ar = arguments;
              if (!cal.loaded) {
                cal.ns = {}; cal.q = cal.q || [];
                d.head.appendChild(d.createElement("script")).src = A;
                cal.loaded = true;
              }
              if (ar[0] === L) {
                const api = function () { p(api, arguments); };
                const namespace = ar[1];
                api.q = api.q || [];
                if (typeof namespace === "string") {
                  cal.ns[namespace] = cal.ns[namespace] || api;
                  p(cal.ns[namespace], ar);
                  p(cal, ["-", namespace, api]);
                } else { p(cal, ar); }
                return;
              }
              p(cal, ar);
            };
          })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", { origin: "https://cal.com" });
        `,
      }}
    />
  );
}

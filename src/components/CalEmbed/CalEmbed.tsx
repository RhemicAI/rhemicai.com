'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import {
  CAL_EMBED_SCRIPT_SRC,
  CAL_ORIGIN,
} from '@/lib/calEmbed';

// Stub Cal so that data-cal-link elements can register clicks before embed.js
// loads. The real Cal() function replays the queue once the script loads.
const calBootstrapScript = `
  (function (C) {
    C.Cal = C.Cal || function () {
      C.Cal.q = C.Cal.q || [];
      C.Cal.q.push(arguments);
    };
    C.Cal.ns = C.Cal.ns || {};
    C.Cal.q = C.Cal.q || [];
  })(window);
`;

function handleCalLoad() {
  // Runs after the real Cal() is available. Must call init here, not in the
  // bootstrap stub, because the stub's Cal() is a no-op queue; init called
  // against it gets dropped before embed.js has a chance to replay it.
  if (typeof window !== 'undefined' && typeof (window as Record<string, unknown>).Cal === 'function') {
    const Cal = (window as Record<string, unknown>).Cal as (cmd: string, opts: Record<string, unknown>) => void;
    Cal('init', { origin: CAL_ORIGIN });
  }
}

export default function CalEmbed() {
  useEffect(() => {
    // Prevent default navigation on data-cal-link anchors — Cal.com embed
    // handles the click itself via its own delegated listener.
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest?.('a[data-cal-link]');
      if (el) e.preventDefault();
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <>
      {/* Bootstrap stub must execute first so the queue exists before embed.js */}
      <Script
        id="cal-embed-bootstrap"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: calBootstrapScript }}
      />
      {/* No integrity= — Cal.com updates the file without publishing new hashes,
          so a stale hash silently blocks the script in every browser.
          The CSP allowlist for app.cal.com is the security boundary. */}
      <Script
        id="cal-embed-loader"
        src={CAL_EMBED_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={handleCalLoad}
      />
    </>
  );
}

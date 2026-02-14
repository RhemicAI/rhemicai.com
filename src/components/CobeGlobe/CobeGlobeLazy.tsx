'use client';

import dynamic from 'next/dynamic';

const CobeGlobe = dynamic(() => import('./CobeGlobe'), {
  ssr: false,
});

export default function CobeGlobeLazy() {
  return <CobeGlobe />;
}

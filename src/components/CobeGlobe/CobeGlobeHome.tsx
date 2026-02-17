'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const CobeGlobe = dynamic(() => import('./CobeGlobe'), { ssr: false });

export default function CobeGlobeHome() {
  const pathname = usePathname();
  if (pathname !== '/') return null;
  return <CobeGlobe />;
}

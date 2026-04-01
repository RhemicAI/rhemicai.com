'use client';

import dynamic from 'next/dynamic';

const BackgroundCanvas = dynamic(() => import('./BackgroundCanvas'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#030712]" />,
});

export default function NeuralBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <BackgroundCanvas />
    </div>
  );
}

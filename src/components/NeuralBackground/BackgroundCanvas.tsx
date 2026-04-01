'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import NeuralField from './NeuralField';

export default function BackgroundCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 24], fov: 52 }}
      dpr={[1, 1.2]}
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 12, 36]} />
        <NeuralField />
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.55} luminanceThreshold={0.18} />
          <Vignette eskil={false} offset={0.16} darkness={0.75} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

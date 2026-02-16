'use client';

import { useEffect, useRef, useCallback } from 'react';
import createGlobe from 'cobe';

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [40.7128, -74.006], size: 0.03 },   // New York
  { location: [51.5074, -0.1278], size: 0.03 },   // London
  { location: [35.6762, 139.6503], size: 0.03 },  // Tokyo
  { location: [1.3521, 103.8198], size: 0.03 },   // Singapore
  { location: [-33.8688, 151.2093], size: 0.03 },  // Sydney
  { location: [48.8566, 2.3522], size: 0.03 },    // Paris
  { location: [25.2048, 55.2708], size: 0.03 },   // Dubai
];

function getDpr(): number {
  if (typeof window === 'undefined') return 1;
  // Cap at 1 — globe is a subtle background element, no need for retina rendering
  return 1;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0);
  const resizeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isBuilding = useRef(false);

  const buildGlobe = useCallback(() => {
    if (isBuilding.current) return;
    isBuilding.current = true;

    const canvas = canvasRef.current;
    if (!canvas) {
      isBuilding.current = false;
      return;
    }

    if (globeRef.current) {
      globeRef.current.destroy();
      globeRef.current = null;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    // Always rotate — globe is a subtle background, not a motion-sickness trigger
    const rotationSpeed = prefersReducedMotion() ? 0.001 : 0.003;

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: getDpr(),
      width: w * getDpr(),
      height: h * getDpr(),
      phi: phiRef.current,
      theta: -0.15,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 4000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: [0.4, 0.4, 0.45],
      glowColor: [0.05, 0.05, 0.08],
      scale: 1.5,
      offset: [0, h * 0.15],
      markers: MARKERS,
      onRender: (state) => {
        state.phi = phiRef.current;
        phiRef.current += rotationSpeed;
      },
    });

    isBuilding.current = false;
  }, []);

  // Init
  useEffect(() => {
    buildGlobe();
    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [buildGlobe]);

  // Visibility API — pause when tab hidden
  useEffect(() => {
    const onVisibility = () => {
      if (!globeRef.current) return;
      globeRef.current.toggle(!document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);


  // IntersectionObserver toggle — pause WebGL when globe canvas is offscreen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        globeRef.current?.toggle(e.isIntersecting);
      },
      { rootMargin: '200px 0px' }
    );
    obs.observe(canvas);
    return () => obs.disconnect();
  }, []);

  // Debounced resize
  useEffect(() => {
    const onResize = () => {
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        buildGlobe();
      }, 300);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer.current);
    };
  }, [buildGlobe]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 w-full h-full"
      style={{ pointerEvents: 'none', backgroundColor: '#0a0a0a' }}
    />
  );
}

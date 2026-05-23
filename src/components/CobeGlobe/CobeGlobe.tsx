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

const WHEEL_QUERY = '(pointer: fine)';

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

function getDpr(): number {
  if (typeof window === 'undefined') return 1;
  // Cap at 1, globe is a subtle background element, no need for retina rendering
  return 1;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function supportsWheelMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(WHEEL_QUERY).matches && !prefersReducedMotion();
}

export default function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const phiRef = useRef(0);
  const resizeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isBuilding = useRef(false);
  const currentScrollVelocityRef = useRef(0);
  const targetScrollVelocityRef = useRef(0);
  const scrollIdleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const buildGlobe = useCallback(() => {
    if (isBuilding.current) return;
    isBuilding.current = true;

    const canvas = canvasRef.current;
    if (!canvas) {
      isBuilding.current = false;
      return;
    }

    if (!canvas.getContext('webgl') && !canvas.getContext('experimental-webgl')) {
      isBuilding.current = false;
      return;
    }

    if (globeRef.current) {
      globeRef.current.destroy();
      globeRef.current = null;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;
    const reducedMotion = prefersReducedMotion();
    const rotationSpeed = reducedMotion ? 0.0008 : isMobile ? 0.0018 : 0.0024;

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: getDpr(),
      width: w * getDpr(),
      height: h * getDpr(),
      phi: phiRef.current,
      theta: -0.15,
      dark: 1,
      diffuse: 2.0,
      mapSamples: isMobile ? 9000 : 14000,
      mapBrightness: isMobile ? 10 : 12,
      baseColor: [0.05, 0.05, 0.05],
      markerColor: [1, 1, 1],
      glowColor: [0.1, 0.1, 0.1],
      scale: isMobile ? 1.32 : 1.5,
      offset: [0, isMobile ? h * 0.1 : h * 0.15],
      markers: MARKERS,
      onRender: (state) => {
        currentScrollVelocityRef.current = lerp(
          currentScrollVelocityRef.current,
          targetScrollVelocityRef.current,
          0.08
        );
        targetScrollVelocityRef.current *= 0.9;
        if (Math.abs(targetScrollVelocityRef.current) < 0.00002) {
          targetScrollVelocityRef.current = 0;
        }
        if (Math.abs(currentScrollVelocityRef.current) < 0.00002) {
          currentScrollVelocityRef.current = 0;
        }

        state.phi = phiRef.current;
        phiRef.current += rotationSpeed + currentScrollVelocityRef.current;
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

  // Visibility API, pause when tab hidden
  useEffect(() => {
    const onVisibility = () => {
      if (!globeRef.current) return;
      globeRef.current.toggle(!document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);


  // IntersectionObserver toggle, pause WebGL when globe canvas is offscreen
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
        currentScrollVelocityRef.current = 0;
        targetScrollVelocityRef.current = 0;
        buildGlobe();
      }, 250);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      clearTimeout(resizeTimer.current);
    };
  }, [buildGlobe]);

  // Scroll-driven rotation: scroll down = spin right, scroll up = spin left.
  // Trackpads keep dispatching wheel momentum, so this writes to a target
  // velocity that the render loop eases toward instead of snapping per event.
  useEffect(() => {
    if (!supportsWheelMotion()) return;

    const onWheel = (e: WheelEvent) => {
      targetScrollVelocityRef.current = clamp(
        targetScrollVelocityRef.current + e.deltaY * 0.000035,
        -0.006,
        0.006
      );
      clearTimeout(scrollIdleTimer.current);
      scrollIdleTimer.current = setTimeout(() => {
        targetScrollVelocityRef.current = 0;
      }, 220);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      clearTimeout(scrollIdleTimer.current);
      currentScrollVelocityRef.current = 0;
      targetScrollVelocityRef.current = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 w-full h-full"
      style={{
        pointerEvents: 'none',
        backgroundColor: '#0a0a0a',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
    />
  );
}

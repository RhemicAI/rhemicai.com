'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const COARSE_POINTER_QUERY = '(pointer: coarse)';

function easeExpoOut(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function getSamePageHashTarget(anchor: HTMLAnchorElement): HTMLElement | null {
  if (!anchor.hash || anchor.hash === '#') return null;

  const url = new URL(anchor.href, window.location.href);
  if (
    url.origin !== window.location.origin ||
    url.pathname !== window.location.pathname ||
    url.search !== window.location.search
  ) {
    return null;
  }

  try {
    return document.getElementById(decodeURIComponent(url.hash.slice(1)));
  } catch {
    return null;
  }
}

function focusAnchorTarget(target: HTMLElement) {
  const previousTabIndex = target.getAttribute('tabindex');

  if (previousTabIndex === null) {
    target.setAttribute('tabindex', '-1');
  }

  target.focus({ preventScroll: true });

  if (previousTabIndex === null) {
    target.addEventListener(
      'blur',
      () => {
        target.removeAttribute('tabindex');
      },
      { once: true }
    );
  }
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const coarsePointerQuery = window.matchMedia(COARSE_POINTER_QUERY);

    const shouldUseLenis = () => !reducedMotionQuery.matches && !coarsePointerQuery.matches;

    const stopLenis = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      lenisRef.current?.destroy();
      lenisRef.current = null;
    };

    const startLenis = () => {
      if (lenisRef.current) return;

      const lenis = new Lenis({
        duration: 1.15,
        easing: easeExpoOut,
        smoothWheel: true,
        wheelMultiplier: 0.65,
        touchMultiplier: 1,
        infinite: false,
        anchors: false,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }

      rafIdRef.current = requestAnimationFrame(raf);
    };

    const syncLenis = () => {
      if (shouldUseLenis()) {
        startLenis();
        if (typeof lenisRef.current?.resize === 'function') {
          lenisRef.current.resize();
        }
      } else {
        stopLenis();
      }
    };

    syncLenis();
    reducedMotionQuery.addEventListener('change', syncLenis);
    coarsePointerQuery.addEventListener('change', syncLenis);
    window.addEventListener('resize', syncLenis);

    return () => {
      reducedMotionQuery.removeEventListener('change', syncLenis);
      coarsePointerQuery.removeEventListener('change', syncLenis);
      window.removeEventListener('resize', syncLenis);
      stopLenis();
    };
  }, []);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const hashTarget = getSamePageHashTarget(anchor);
      if (!hashTarget) return;

      requestAnimationFrame(() => {
        focusAnchorTarget(hashTarget);
      });
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Scroll to top instantly on every page navigation when Lenis owns desktop wheel scroll.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}

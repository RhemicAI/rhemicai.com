'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TRAIL_LERP = 0.12;
const MAGNETIC_RADIUS = 180;
const MAGNETIC_STRENGTH = 0.35;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const tick = () => {
      let { x: mx, y: my } = mouseRef.current;
      let { x: cx, y: cy } = posRef.current;

      const hero = document.querySelector('[data-hero-text]');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = mx - centerX;
        const dy = my - centerY;
        const dist = Math.hypot(dx, dy);
        if (dist < MAGNETIC_RADIUS && dist > 0) {
          const pull = 1 - dist / MAGNETIC_RADIUS;
          const strength = MAGNETIC_STRENGTH * pull;
          mx = mx + (centerX - mx) * strength;
          my = my + (centerY - my) * strength;
        }
      }

      const tx = cx + (mx - cx) * TRAIL_LERP;
      const ty = cy + (my - cy) * TRAIL_LERP;
      posRef.current.x = tx;
      posRef.current.y = ty;

      gsap.set(cursor, { x: tx, y: ty, xPercent: -50, yPercent: -50 });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener('mousemove', moveCursor);
    document.body.style.cursor = 'none';

    const handleHover = () => gsap.to(cursor, { scale: 1.4, duration: 0.25 });
    const handleLeave = () => gsap.to(cursor, { scale: 1, duration: 0.25 });

    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = 'auto';
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white/60 pointer-events-none z-[9999] bg-transparent"
      style={{ willChange: 'transform' }}
    />
  );
}

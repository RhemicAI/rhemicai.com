'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset classes so animations replay on client-side navigation
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      el.classList.remove('revealed', 'is-visible');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;

            // Set per-element delay from data-delay attribute
            const delay = el.dataset.delay;
            if (delay) {
              el.style.setProperty('--reveal-delay', delay + 's');
            }

            // Add both classes for backwards compatibility
            el.classList.add('revealed', 'is-visible');

            // Observe once — no re-trigger on scroll up
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

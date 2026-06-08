'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  as?: 'div' | 'section' | 'li' | 'article';
};

export default function Reveal({ children, className = '', delay, as = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as 'div';
  const delayClass = delay ? `reveal-d${delay}` : '';

  return (
    <Tag ref={ref as never} className={`reveal ${delayClass} ${className}`}>
      {children}
    </Tag>
  );
}

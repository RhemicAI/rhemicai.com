'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/#how', label: 'How it works' },
  { href: '/testimonials', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
];

export default function PaperNav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 16) {
        nav.classList.add('nav-stuck');
        nav.classList.remove('nav-top');
      } else {
        nav.classList.add('nav-top');
        nav.classList.remove('nav-stuck');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="nav-top fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    >
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Rhemic AI home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/rhemic-logo.svg" alt="Rhemic AI" width={34} height={34} className="h-[34px] w-[34px] rounded-[7px] border border-[var(--line)]" />
          <span className="font-display text-[1.35rem] font-bold tracking-tight text-ink">Rhemic</span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-spot-deep">AI</span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-rule font-mono text-[0.74rem] uppercase tracking-[0.14em] text-ink-2"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary !px-5 !py-3 text-[0.7rem]">
            Book a call
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-[5px]">
            <span className="block h-[1.5px] w-6 bg-ink" />
            <span className="block h-[1.5px] w-6 bg-ink" />
            <span className="block h-[1.5px] w-6 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--paper)] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-ink-2"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              Book a call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

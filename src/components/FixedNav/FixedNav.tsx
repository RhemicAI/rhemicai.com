'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function FixedNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver sentinels — zero JS during scroll
  useEffect(() => {
    const navSentinel = document.createElement('div');
    navSentinel.style.cssText = 'position:absolute;top:50px;left:0;width:1px;height:1px;pointer-events:none;visibility:hidden;';
    document.body.prepend(navSentinel);

    const ctaSentinel = document.createElement('div');
    ctaSentinel.style.cssText = 'position:absolute;top:600px;left:0;width:1px;height:1px;pointer-events:none;visibility:hidden;';
    document.body.prepend(ctaSentinel);

    const navObs = new IntersectionObserver(([e]) => {
      const nav = navRef.current;
      if (!nav) return;
      if (e.isIntersecting) {
        nav.classList.remove('nav-scrolled');
        nav.classList.add('nav-transparent');
      } else {
        nav.classList.add('nav-scrolled');
        nav.classList.remove('nav-transparent');
      }
    });

    const ctaObs = new IntersectionObserver(([e]) => {
      const cta = ctaRef.current;
      if (!cta) return;
      if (e.isIntersecting) {
        cta.classList.remove('cta-visible');
        cta.classList.add('cta-hidden');
      } else {
        cta.classList.add('cta-visible');
        cta.classList.remove('cta-hidden');
      }
    });

    navObs.observe(navSentinel);
    ctaObs.observe(ctaSentinel);

    return () => {
      navObs.disconnect();
      ctaObs.disconnect();
      navSentinel.remove();
      ctaSentinel.remove();
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 transition-[background-color,border-color] duration-300 nav-transparent"
      >
        {/* Left — Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/Rhemic logo(:bg).png"
            alt="Rhemic AI"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-[var(--text-primary)] text-lg font-bold tracking-tight font-display">
            Rhemic AI
          </span>
        </Link>

        {/* Center — Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 font-body tracking-[0.02em]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right — CTA (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-4">
          <a
            href="https://cal.com/rhemic-ai/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-5 py-2.5 text-sm font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300 font-body tracking-[0.01em]"
          >
            Book a Demo
          </a>

          {/* Hamburger button (mobile only) */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`absolute w-6 h-0.5 bg-[var(--text-primary)] transition-[transform,opacity] duration-300 ease-in-out ${
                menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-[var(--text-primary)] transition-[transform,opacity] duration-300 ease-in-out ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-[var(--text-primary)] transition-[transform,opacity] duration-300 ease-in-out ${
                menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-[visibility,opacity] duration-300 ease-in-out ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className={`absolute inset-0 bg-[var(--bg-base)] transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2 px-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-xl font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 py-4 font-body tracking-[0.02em]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8">
              <a
                href="https://cal.com/rhemic-ai/discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="px-8 py-3 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-transform duration-300 font-body tracking-[0.01em]"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA — fixed at bottom, appears after scrolling past hero */}
      <div
        ref={ctaRef}
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-[transform,opacity] duration-300 cta-hidden ${
          menuOpen ? 'translate-y-full opacity-0' : ''
        }`}
      >
        <div className="px-4 pb-[env(safe-area-inset-bottom,8px)] pt-3 bg-[var(--bg-base)] border-t border-[var(--border-subtle)]"
        >
          <a
            href="https://cal.com/rhemic-ai/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3.5 text-center text-sm font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 font-body tracking-[0.01em]"
          >
            Book a Discovery Call
          </a>
        </div>
      </div>
    </>
  );
}

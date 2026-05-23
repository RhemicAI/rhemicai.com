'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CalBookingLink from '@/components/CalEmbed/CalBookingLink';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'What We Optimize', href: '/#what-we-optimize' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function FixedNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bookingCalLink = 'rhemic-ai/discovery-call';

  // IntersectionObserver for bg/border toggle (binary, no JS on scroll)
  useEffect(() => {
    const navSentinel = document.createElement('div');
    navSentinel.style.cssText = 'position:absolute;top:50px;left:0;width:1px;height:1px;pointer-events:none;visibility:hidden;';
    document.body.prepend(navSentinel);

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

    navObs.observe(navSentinel);

    return () => {
      navObs.disconnect();
      navSentinel.remove();
    };
  }, []);

  // Scroll-driven compression: linearly tracks scrollY, stops at threshold
  useEffect(() => {
    const THRESHOLD = 180; // px of scroll to reach fully compressed state
    const PAD_START = 2;   // rem - matches px-8
    const PAD_END   = 2.75; // rem - how far inward the logo/button travel
    const GAP_START = 3;   // rem - initial link gap (gap-12)
    const GAP_END   = 1.75; // rem - compressed link gap

    const update = () => {
      const nav   = navRef.current;
      const links = linksRef.current;
      if (!nav) return;

      const progress = Math.min(window.scrollY / THRESHOLD, 1);
      const padding  = PAD_START + progress * (PAD_END - PAD_START);
      const gap      = GAP_START - progress * (GAP_START - GAP_END);

      nav.style.paddingLeft  = `${padding}rem`;
      nav.style.paddingRight = `${padding}rem`;
      if (links) links.style.gap = `${gap}rem`;
    };

    update(); // apply correct state on mount
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
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
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-5 transition-[background-color,border-color] duration-300 nav-transparent"
      >
        {/* Left, Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/rhemic-icon.png"
            alt="Rhemic AI"
            width={44}
            height={44}
            className="object-contain"
          />
        </Link>

        {/* Center, Nav Links (desktop) */}
        <div ref={linksRef} className="hidden md:flex items-center">
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

        {/* Right, CTA (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-4">
          <CalBookingLink
            calLink={bookingCalLink}
            className="hidden rounded-full bg-[var(--btn-primary-bg)] px-5 py-2.5 font-body text-sm font-semibold tracking-[0.01em] text-[var(--btn-primary-text)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--pulse)] md:block"
          >
            Get the audit
          </CalBookingLink>

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
              <CalBookingLink
                calLink={bookingCalLink}
                onClick={() => setMenuOpen(false)}
                className="rounded-full bg-[var(--btn-primary-bg)] px-8 py-3 font-body text-base font-semibold tracking-[0.01em] text-[var(--btn-primary-text)] transition-all duration-300 hover:bg-[var(--pulse)]"
              >
                Get the audit
              </CalBookingLink>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile CTA, fixed at bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-[transform,opacity] duration-300 ${
          menuOpen ? 'translate-y-full opacity-0' : ''
        }`}
      >
        <div className="flex justify-center px-5 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] bg-[var(--bg-base)]/95 border-t border-[var(--border-subtle)] backdrop-blur-2xl">
          <CalBookingLink
            calLink={bookingCalLink}
            className="w-full rounded-full bg-[var(--btn-primary-bg)] px-5 py-3 text-center font-body text-sm font-semibold tracking-[0.01em] text-[var(--btn-primary-text)] shadow-lg shadow-[var(--pulse-soft)] transition-all duration-200 hover:bg-[var(--pulse)] active:scale-[0.98]"
          >
            Get a visibility + call leak audit
          </CalBookingLink>
        </div>
      </div>
    </>
  );
}

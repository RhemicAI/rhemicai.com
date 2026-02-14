'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function FixedNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]'
            : 'bg-transparent'
        }`}
        style={scrolled ? { WebkitBackdropFilter: 'blur(24px)' } : undefined}
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
            className="hidden md:block px-5 py-2.5 text-sm font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-all duration-300 font-body tracking-[0.01em]"
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
              className={`absolute w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ease-in-out ${
                menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ease-in-out ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ease-in-out ${
                menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className={`absolute inset-0 bg-[var(--bg-base)]/95 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ WebkitBackdropFilter: 'blur(24px)' }}
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
                className="px-8 py-3 text-base font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-all duration-300 font-body tracking-[0.01em]"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

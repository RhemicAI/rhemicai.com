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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
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

      {/* Center — Nav Links */}
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

      {/* Right — CTA */}
      <div className="flex items-center gap-4">
        <button className="px-5 py-2.5 text-sm font-semibold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-all duration-300 font-body tracking-[0.01em]">
          Book a Demo
        </button>
      </div>
    </nav>
  );
}

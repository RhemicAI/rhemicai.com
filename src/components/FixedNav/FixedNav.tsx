'use client';

import Image from 'next/image';

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function FixedNav() {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 bg-[var(--bg-glass)] border-b border-[var(--border-default)] backdrop-blur-[20px] supports-[backdrop-filter]:bg-[var(--bg-glass)]"
      style={{ WebkitBackdropFilter: 'blur(20px)' }}
    >
      {/* Left — Logo + Brand */}
      <a href="/" className="flex items-center gap-3">
        <Image
          src="/Rhemic logo(:bg).png"
          alt="Rhemic AI"
          width={32}
          height={32}
          className="object-contain"
        />
        <span className="text-[var(--text-primary)] text-lg font-bold tracking-tight">
          Rhemic AI
        </span>
      </a>

      {/* Center — Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right — CTA */}
      <div className="flex items-center gap-4">
        <button className="px-5 py-2.5 text-sm font-medium text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-full hover:scale-105 transition-all duration-300">
          Book a Demo
        </button>
      </div>
    </nav>
  );
}

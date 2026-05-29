import Link from 'next/link';
import Image from 'next/image';

// Stripped-down site header for the consult leak calculator: logo + name only,
// no nav links and no CTAs.
export default function MinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] flex h-[64px] items-center px-6 sm:px-10">
      <Link href="/" aria-label="Rhemic AI home" className="flex items-center gap-2.5 no-underline">
        <Image
          src="/rhemic-icon.png"
          alt="Rhemic AI"
          width={28}
          height={28}
          priority
          className="h-[26px] w-auto object-contain"
          style={{ filter: 'brightness(1.1)' }}
        />
        <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
          Rhemic AI
        </span>
      </Link>
    </header>
  );
}

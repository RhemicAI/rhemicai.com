'use client';

import Image from 'next/image';

export default function FixedNav() {
    return (
        <nav
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 bg-white/[0.06] border-b border-white/10 backdrop-blur-[20px] supports-[backdrop-filter]:bg-white/[0.04]"
            style={{ WebkitBackdropFilter: 'blur(20px)' }}
        >
            {/* Left — Logo + Brand */}
            <a href="/" className="flex items-center gap-3 cursor-none">
                <Image
                    src="/Rhemic logo(:bg).png"
                    alt="Rhemic AI"
                    width={32}
                    height={32}
                    className="object-contain"
                />
                <span className="text-[#FFFFFF] text-lg font-bold tracking-tight">
                    Rhemic AI
                </span>
            </a>

            {/* Right — CTA (glass-morphism) */}
            <button className="px-5 py-2.5 text-sm font-medium text-[#FFFFFF] border border-white/25 rounded-full bg-white/[0.08] backdrop-blur-[20px] hover:bg-white/[0.14] hover:border-white/30 transition-all duration-300 cursor-none">
                Book a Demo
            </button>
        </nav>
    );
}

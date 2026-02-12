
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function StickyHeader() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 w-full mix-blend-difference">
            <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity">
                    {/* Assuming logo is in public folder. Using a placeholder or the file name if known. */}
                    {/* If the user specified 'Rhemic logo(:bg).png', we need to handle the filename carefully or use a simpler one if renamed. 
               Let's assume we can use the one from previous context or a text fallback for now if image fails. */}
                    {/* Attempting to use the file mentioned in prompt: Rhemic logo(:bg).png which might need encoding */}
                    <Image
                        src="/Rhemic logo(:bg).png"
                        alt="Rhemic AI Logo"
                        fill
                        className="object-contain invert" // invert for dark mode if logo is dark, assuming logo is usable
                    />
                </div>
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                    Rhemic AI
                </span>
            </Link>

            <nav>
                {/* Minimalist nav - maybe just contact or empty as requested 'Minimalist' */}
            </nav>
        </header>
    );
}

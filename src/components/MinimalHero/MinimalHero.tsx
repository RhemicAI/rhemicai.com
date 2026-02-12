
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MinimalHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const visualsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Text Fade/Scale Effect on Scroll
            gsap.to(textRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    pin: false, // Text scrolls away but fades
                },
                opacity: 0,
                scale: 0.9,
                y: -50,
                ease: 'power1.out'
            });

            // Pin the visual side
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                pin: visualsRef.current,
                pinSpacing: false, // Allow next section to overlap if desired, or true for standard pinning
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[200vh] flex flex-col items-start bg-black text-white">
            {/* 200vh to give room for scroll effect */}

            <div className="sticky top-0 w-full h-screen grid grid-cols-1 md:grid-cols-2">
                {/* Left: Text */}
                <div className="flex flex-col justify-center px-12 md:px-24 h-full z-10">
                    <div ref={textRef} className="max-w-2xl">
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                            Dominate AI-Generated Search Results.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
                            Visibility reimagined for the AI age.
                        </p>
                    </div>
                </div>

                {/* Right: Animation Placeholder */}
                <div ref={visualsRef} className="h-full w-full flex items-center justify-center bg-zinc-900/50 relative overflow-hidden">
                    {/* Abstract animated background or 3D placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 to-purple-900/20 opacity-50" />
                    <div className="w-64 h-64 border border-white/10 rounded-full animate-pulse flex items-center justify-center">
                        <div className="w-32 h-32 border border-white/20 rounded-full animate-spin-slow" />
                    </div>
                    <p className="absolute bottom-12 right-12 text-xs text-white/30 uppercase tracking-widest">
                        Interactive Visuals
                    </p>
                </div>
            </div>
        </section>
    );
}

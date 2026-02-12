'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxHero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textGroupRef = useRef<HTMLDivElement>(null);
    const videoWrapRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (
            !sectionRef.current ||
            !textGroupRef.current ||
            !videoWrapRef.current
        )
            return;

        const ctx = gsap.context(() => {
            // The text group LIVES in the left half (its natural DOM position).
            // We push it to the centre of the viewport on load, then scroll
            // brings it back to its natural left-half position. This way the
            // text never overflows out of bounds.
            const offsetToCenter = window.innerWidth * 0.25;

            // Set initial state: text pushed to centre, video hidden
            gsap.set(textGroupRef.current, {
                x: offsetToCenter,
                scale: 1,
            });
            gsap.set(videoWrapRef.current, { opacity: 0, x: 80 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=150%',
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // 1. Text settles back into left half
            tl.to(
                textGroupRef.current,
                { x: 0, scale: 0.85, ease: 'none', duration: 1 },
                0,
            );

            // 2. Video fades in on the right
            tl.to(
                videoWrapRef.current,
                { opacity: 1, x: 0, ease: 'none', duration: 1 },
                0.05,
            );

            // 3. Optional: scroll-sync video currentTime
            if (videoRef.current) {
                const video = videoRef.current;
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=150%',
                    scrub: true,
                    onUpdate: (self) => {
                        if (video.duration) {
                            video.currentTime = self.progress * video.duration;
                        }
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Play/pause video on visibility
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                entry.isIntersecting ? video.play().catch(() => { }) : video.pause();
            },
            { threshold: 0.25 },
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden">
            {/* 
        Text lives natively in the LEFT HALF.
        GSAP pushes it to viewport center on load, 
        then scrolls it back here — so it never clips.
      */}
            <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center z-10">
                <div ref={textGroupRef} className="text-center px-10 max-w-2xl">
                    <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-white/50 mb-6">
                        Visibility reimagined for the AI age
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tighter text-white">
                        Dominate{' '}
                        <span className="bg-gradient-to-r from-white via-white to-neutral-500 bg-clip-text text-transparent">
                            AI-Generated
                        </span>{' '}
                        Search Results.
                    </h1>
                </div>
            </div>

            {/* Video — right half, starts invisible */}
            <div
                ref={videoWrapRef}
                className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center z-20"
            >
                <video
                    ref={videoRef}
                    src="/intelligence-web.mp4"
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain"
                />
            </div>
        </section>
    );
}

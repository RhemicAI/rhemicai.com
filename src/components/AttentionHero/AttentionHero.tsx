'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AttentionHero() {
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoInnerRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const videoWrap = videoWrapRef.current;
    const videoInner = videoInnerRef.current;
    const subtext = subtextRef.current;
    if (!section || !text || !videoWrap || !videoInner || !subtext) return;

    const ctx = gsap.context(() => {
      // Initial: text pushed to centre, video hidden
      const pushToCenter = window.innerWidth * 0.25;
      gsap.set(text, { x: pushToCenter, scale: 1 });
      gsap.set(videoWrap, { opacity: 0, scale: 0.92 });
      gsap.set(subtext, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%',
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Text: centre → left half
      tl.to(text, { x: 0, scale: 0.85, ease: 'none', duration: 1 }, 0);

      // Video: fade in on right
      tl.to(videoWrap, { opacity: 1, scale: 1, ease: 'power1.out', duration: 1 }, 0.15);

      // Subtext fades in after split
      tl.to(subtext, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.4 }, 0.7);

      // Continuous floating hover on inner video
      gsap.to(videoInner, {
        y: -14,
        x: 8,
        rotation: 0.6,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Text — left half, pushed to centre by GSAP */}
      <div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center z-10 pointer-events-none">
        <div
          ref={textRef}
          data-hero-text
          className="text-center px-8 max-w-xl"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)' }}
        >
          <p className="text-sm md:text-base font-medium tracking-[0.25em] uppercase text-white/60 mb-6">
            Visibility reimagined for the AI age
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tighter text-[#FFFFFF]">
            Dominate<br />
            <span className="text-[#FFFFFF]">AI-Generated</span><br />
            Search Results.
          </h1>
          <div ref={subtextRef} className="mt-6">
            <p className="text-sm md:text-base text-white/60 max-w-sm mx-auto font-light leading-relaxed">
              Secure your brand&apos;s presence in every AI-generated answer,
              at 99% lower infrastructure costs.
            </p>
          </div>
        </div>
      </div>

      {/* Video — right half, floating */}
      <div
        ref={videoWrapRef}
        className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center z-[5]"
      >
        <div
          ref={videoInnerRef}
          className="w-[90%] h-[70%] rounded-2xl overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {mounted && (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/intelligence-web.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </section>
  );
}

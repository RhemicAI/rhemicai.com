'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroOverlay.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroOverlay() {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current || !overlayRef.current) return;

        const children = contentRef.current.children;

        // Set initial state
        gsap.set(children, {
            opacity: 0,
            y: 40,
        });

        const ctx = gsap.context(() => {
            // Stagger-fade text elements in
            gsap.to(children, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: overlayRef.current,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Subtle parallax on deeper scroll
            ScrollTrigger.create({
                trigger: overlayRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    if (contentRef.current) {
                        gsap.set(contentRef.current, {
                            y: -self.progress * 80,
                            opacity: 1 - self.progress * 0.6,
                        });
                    }
                },
            });
        }, overlayRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={overlayRef} className={styles.overlay}>
            <div ref={contentRef} className={styles.content}>
                {/* Badge */}
                <div className={styles.badge}>
                    <span className={styles.badgeDot} />
                    AEO Platform
                </div>

                {/* H2 — Secondary hook */}
                <h2 className={styles.h2}>
                    Visibility Reimagined for the AI Age
                </h2>

                {/* H1 — Main catch */}
                <h1 className={styles.h1}>
                    Dominate AI-Generated Search Results with{' '}
                    <span className={styles.h1Gradient}>
                        Adaptive Engagement Optimization
                    </span>
                </h1>

                {/* Sub-text */}
                <p className={styles.subtext}>
                    Secure your brand&apos;s presence in AI answers through high-performance
                    audits at 99% lower infrastructure costs.
                </p>

                {/* CTA Group */}
                <div className={styles.ctaGroup}>
                    <button className={styles.ctaPrimary}>Book a Demo</button>
                    <button className={styles.ctaSecondary}>Learn More</button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={styles.scrollIndicator}>
                <div className={styles.scrollLine} />
                <span className={styles.scrollText}>Scroll</span>
            </div>
        </div>
    );
}

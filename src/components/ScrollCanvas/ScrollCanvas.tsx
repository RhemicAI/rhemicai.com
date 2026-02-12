'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollCanvas.module.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;

function getFramePath(index: number): string {
    const num = String(index + 1).padStart(3, '0');
    return `/frames/ezgif-frame-${num}.jpg`;
}

interface ScrollCanvasProps {
    children?: React.ReactNode;
}

export default function ScrollCanvas({ children }: ScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef<number>(0);
    const [loadProgress, setLoadProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete) return;

        // Size canvas to viewport
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);
        }

        // Cover-fit the image
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = w / h;
        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (imgAspect > canvasAspect) {
            drawH = h;
            drawW = h * imgAspect;
            drawX = (w - drawW) / 2;
            drawY = 0;
        } else {
            drawW = w;
            drawH = w / imgAspect;
            drawX = 0;
            drawY = (h - drawH) / 2;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }, []);

    // Preload all frames
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new window.Image();
            img.src = getFramePath(i);
            img.onload = () => {
                loadedCount++;
                setLoadProgress(loadedCount / FRAME_COUNT);
                if (loadedCount === FRAME_COUNT) {
                    setLoaded(true);
                    // Draw first frame
                    drawFrame(0);
                }
            };
            img.onerror = () => {
                loadedCount++;
                setLoadProgress(loadedCount / FRAME_COUNT);
                if (loadedCount === FRAME_COUNT) {
                    setLoaded(true);
                    drawFrame(0);
                }
            };
            images.push(img);
        }

        imagesRef.current = images;
    }, [drawFrame]);

    // GSAP ScrollTrigger for frame scrubbing
    useEffect(() => {
        if (!loaded || !containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(currentFrameRef, {
                current: FRAME_COUNT - 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.5,
                    onUpdate: (self) => {
                        const frameIndex = Math.min(
                            Math.floor(self.progress * (FRAME_COUNT - 1)),
                            FRAME_COUNT - 1
                        );
                        if (frameIndex !== currentFrameRef.current) {
                            currentFrameRef.current = frameIndex;
                            drawFrame(frameIndex);
                        }
                    },
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [loaded, drawFrame]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            drawFrame(currentFrameRef.current);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame]);

    return (
        <div ref={containerRef} className={styles.canvasContainer}>
            <div className={styles.stickyWrapper}>
                <canvas ref={canvasRef} className={styles.canvas} />

                {/* Loading overlay */}
                <div className={`${styles.loadingOverlay} ${loaded ? styles.loaded : ''}`}>
                    <div className={styles.loadingBar}>
                        <div
                            className={styles.loadingFill}
                            style={{ width: `${loadProgress * 100}%` }}
                        />
                    </div>
                    <span className={styles.loadingText}>Loading experience</span>
                </div>

                {/* Children (overlay content) rendered on top */}
                {children}
            </div>
        </div>
    );
}

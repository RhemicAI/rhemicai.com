'use client';

import { useEffect, useRef, useState } from 'react';

interface TypewriterTextProps {
  lines: string[];
  speed?: number;        // ms per character
  linePause?: number;    // ms pause between lines
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p';
}

export default function TypewriterText({
  lines,
  speed = 30,
  linePause = 200,
  className = '',
  tag: Tag = 'h1',
}: TypewriterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedLines, setDisplayedLines] = useState<string[]>(lines.map(() => ''));
  const [cursorVisible, setCursorVisible] = useState(false);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [triggered, setTriggered] = useState(false);

  // IntersectionObserver to trigger animation on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typing animation
  useEffect(() => {
    if (!triggered) return;

    setCursorVisible(true);
    setTyping(true);

    let lineIndex = 0;
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      if (lineIndex >= lines.length) {
        // Done typing — blink cursor 4 more times then hide
        setTyping(false);
        setDone(false);
        setTimeout(() => setDone(true), 3200); // 4 blinks at 800ms
        return;
      }

      const currentLine = lines[lineIndex];

      if (charIndex <= currentLine.length) {
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[lineIndex] = currentLine.slice(0, charIndex);
          return next;
        });
        charIndex++;
        timeout = setTimeout(typeNext, speed);
      } else {
        // Line complete, pause then move to next
        lineIndex++;
        charIndex = 0;
        timeout = setTimeout(typeNext, linePause);
      }
    };

    timeout = setTimeout(typeNext, 300); // Initial delay

    return () => clearTimeout(timeout);
  }, [triggered, lines, speed, linePause]);

  // Hide cursor after done
  useEffect(() => {
    if (done) {
      setCursorVisible(false);
    }
  }, [done]);

  return (
    <div ref={containerRef} className="typewriter-container">
      <Tag className={className}>
        {displayedLines.map((line, i) => (
          <span key={i} className="inline">
            {line}
            {i < displayedLines.length - 1 && <br />}
          </span>
        ))}
        <span
          className={`typewriter-cursor ${cursorVisible ? '' : 'typewriter-cursor-hidden'} ${typing ? 'typewriter-cursor-blink' : (!done ? 'typewriter-cursor-blink' : '')}`}
          aria-hidden="true"
        >
          |
        </span>
      </Tag>
    </div>
  );
}

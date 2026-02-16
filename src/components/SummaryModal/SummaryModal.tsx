'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSummaryRotation } from '@/hooks/useSummaryRotation';

// Typing speed constants (lower = faster)
const TYPE_SPEED_MS = 8; // ~125 chars/sec - snappy modern feel

interface SummaryModalProps {
  /**
   * Static summary text (optional)
   * If provided, shows this specific summary every time.
   * If omitted, uses smart rotation through 50+ variations.
   */
  summary?: string;
  buttonText?: string;
  modalTitle?: string;
}

export default function SummaryModal({
  summary, // Optional: static mode if provided, rotation mode if omitted
  buttonText = "Summarize with our Engine",
  modalTitle = "AI Summary"
}: SummaryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentSummary, setCurrentSummary] = useState('');
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Smart summary rotation (only used when summary prop not provided)
  const { getNextSummary } = useSummaryRotation();

  // Determine if using static or rotation mode
  const isStaticMode = Boolean(summary);

  // Ensure component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get a fresh summary when modal opens (rotation mode only)
  useEffect(() => {
    if (isOpen && !currentSummary) {
      if (isStaticMode) {
        // Static mode: use provided summary
        setCurrentSummary(summary!);
      } else {
        // Rotation mode: get next summary from rotation
        const nextSummary = getNextSummary();
        setCurrentSummary(nextSummary);
      }
    }
  }, [isOpen, currentSummary, getNextSummary, summary, isStaticMode]);

  // Parse **bold** markers into JSX
  const parseTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-[var(--text-primary)]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      // Reset summary when closing (rotation mode only - when no static summary provided)
      if (!summary) {
        setCurrentSummary('');
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, summary]);

  // ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Typing animation effect
  useEffect(() => {
    if (!isOpen || !currentSummary) {
      setDisplayedText('');
      setIsTyping(false);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      return;
    }

    // Start typing when modal opens with fresh summary
    setIsTyping(true);
    setDisplayedText('');
    let charIndex = 0;

    typingIntervalRef.current = setInterval(() => {
      if (charIndex < currentSummary.length) {
        setDisplayedText(currentSummary.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
      }
    }, TYPE_SPEED_MS);

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [isOpen, currentSummary]);

  // Render modal content
  const modalContent = isOpen ? (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--bg-glass)] border border-[var(--border-subtle)]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1L10 5.5L15 6.5L11.5 10L12.5 15L8 12.5L3.5 15L4.5 10L1 6.5L6 5.5L8 1Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <h3 id="modal-title" className="text-lg font-bold text-[var(--text-primary)]">
                {modalTitle}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Generated by Rhemic AI Engine
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)] transition-colors"
            aria-label="Close summary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Summary content with typing animation */}
        <div className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
          {parseTextWithBold(displayedText)}
          {isTyping && (
            <span className="inline-block w-0.5 h-4 bg-[var(--text-primary)] ml-0.5 animate-cursor-blink" />
          )}
        </div>

        {/* Footer - only show after typing completes */}
        {!isTyping && (
          <div className="mt-8 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between">
            <p className="text-xs text-[var(--text-muted)]">
              Generated by Rhemic AI Engine
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:scale-105 transition-transform"
            >
              Got it
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold rounded-full bg-[var(--bg-glass)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all duration-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 4.5H13.5M2.5 8H10M2.5 11.5H7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {buttonText}
      </button>

      {/* Render modal via portal to escape stacking contexts */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}

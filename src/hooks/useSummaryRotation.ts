/**
 * Smart Summary Rotation Hook
 *
 * Manages intelligent summary selection:
 * 1. Shows unseen summaries first (shuffled order)
 * 2. Only repeats after all 50 have been shown
 * 3. Reshuffles when exhausted
 * 4. Persists state across sessions
 */

import { useState, useEffect, useCallback } from 'react';
import { ENGINE_SUMMARIES, TOTAL_SUMMARIES } from '@/data/engineSummaries';

const STORAGE_KEY = 'rhemic-summary-rotation';

interface RotationState {
  shuffledIndices: number[];
  currentIndex: number;
  lastShownIndex: number;
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffleArray(array: number[]): number[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Initialize rotation state
 */
function initializeState(): RotationState {
  // Create array of indices [0, 1, 2, ..., 49]
  const indices = Array.from({ length: TOTAL_SUMMARIES }, (_, i) => i);

  // Shuffle for random but non-repeating order
  const shuffledIndices = shuffleArray(indices);

  return {
    shuffledIndices,
    currentIndex: 0,
    lastShownIndex: -1,
  };
}

/**
 * Load state from localStorage
 */
function loadState(): RotationState | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as RotationState;

    // Validate structure
    if (
      !Array.isArray(parsed.shuffledIndices) ||
      typeof parsed.currentIndex !== 'number' ||
      typeof parsed.lastShownIndex !== 'number'
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

/**
 * Save state to localStorage
 */
function saveState(state: RotationState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage might be disabled or full - fail silently
  }
}

/**
 * Hook for managing summary rotation
 */
export function useSummaryRotation() {
  const [state, setState] = useState<RotationState>(() => {
    // Try to load from storage, otherwise initialize fresh
    return loadState() || initializeState();
  });

  // Persist state changes to localStorage
  useEffect(() => {
    saveState(state);
  }, [state]);

  /**
   * Get the next summary
   * Returns a different summary each time, cycling through all 50 before repeating
   */
  const getNextSummary = useCallback((): string => {
    setState((prevState) => {
      let nextIndex = prevState.currentIndex;

      // If we've shown all summaries, reshuffle and restart
      if (nextIndex >= TOTAL_SUMMARIES) {
        const indices = Array.from({ length: TOTAL_SUMMARIES }, (_, i) => i);
        const shuffledIndices = shuffleArray(indices);

        return {
          shuffledIndices,
          currentIndex: 1, // Move to next after returning first
          lastShownIndex: shuffledIndices[0],
        };
      }

      // Move to next index
      const newState = {
        ...prevState,
        currentIndex: nextIndex + 1,
        lastShownIndex: prevState.shuffledIndices[nextIndex],
      };

      return newState;
    });

    // Return the summary at current position
    const summaryIndex = state.shuffledIndices[state.currentIndex];
    return ENGINE_SUMMARIES[summaryIndex] || ENGINE_SUMMARIES[0];
  }, [state]);

  /**
   * Get current summary without advancing
   */
  const getCurrentSummary = useCallback((): string => {
    const summaryIndex = state.shuffledIndices[state.currentIndex];
    return ENGINE_SUMMARIES[summaryIndex] || ENGINE_SUMMARIES[0];
  }, [state]);

  /**
   * Reset rotation (useful for testing)
   */
  const resetRotation = useCallback((): void => {
    const newState = initializeState();
    setState(newState);
    saveState(newState);
  }, []);

  /**
   * Get progress through current cycle
   */
  const getProgress = useCallback((): {
    seen: number;
    total: number;
    percentComplete: number;
  } => {
    const seen = Math.min(state.currentIndex, TOTAL_SUMMARIES);
    const total = TOTAL_SUMMARIES;
    const percentComplete = (seen / total) * 100;

    return { seen, total, percentComplete };
  }, [state]);

  return {
    getNextSummary,
    getCurrentSummary,
    resetRotation,
    getProgress,
  };
}

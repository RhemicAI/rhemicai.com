# Debug Report: AEOEngine Workflow Animations Not Triggering
Generated: 2026-02-14

## Symptom
The AEOEngine workflow animation stays permanently in the `'idle'` state and never transitions to `'input'`. The 3-step visualization (Website Data -> AEO Engine -> AI Answers) appears static with no typing animation, no progress bar movement, and output cards invisible.

## Investigation Steps

1. Read the full AEOEngine.tsx component (593 lines) to understand the animation logic
2. Verified IntersectionObserver implementation in `useInView` hook -- implementation is correct
3. Verified `useReducedMotion` hook -- implementation is correct, and browser reports `false`
4. Checked sessionStorage key `rhemic-aeo-workflow-v2` behavior across page loads
5. Tested in browser: fresh session (sessionStorage clear) -- animation runs correctly
6. Tested in browser: reloaded page (same tab) -- animation permanently blocked
7. Checked for HMR interference during development -- Fast Refresh preserves React state, which means `hasRun` stays `true` even after code edits

## Evidence

### Finding 1: sessionStorage blocks repeat plays
- **Location:** `/Users/bivourr/Desktop/myAgents/RhemicAI-dot-com/src/components/AEOEngine/AEOEngine.tsx:458-461`
- **Observation:** The `hasRun` state initializes from sessionStorage:
  ```tsx
  const [hasRun, setHasRun] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('rhemic-aeo-workflow-v2') === 'true';
  });
  ```
  Once the animation runs, line 469 sets `sessionStorage.setItem('rhemic-aeo-workflow-v2', 'true')`. On any subsequent page load within the same browser tab/session, `hasRun` initializes as `true`, and the useEffect on line 464-471 never fires because `!hasRun` is `false`.
- **Relevance:** This is the primary root cause. The animation plays exactly once per browser session and then is permanently blocked. Any page refresh, navigation back, or HMR reload during development will prevent it from running again.

### Finding 2: HMR preserves stale `hasRun` state during development
- **Location:** Same file, same state variable
- **Observation:** During development with Next.js Turbopack, Fast Refresh preserves React component state across hot reloads. This means:
  1. Developer loads page, scrolls to section, animation plays, `hasRun` becomes `true`
  2. Developer edits code, Fast Refresh fires
  3. React state is preserved: `hasRun` is still `true`
  4. Even without sessionStorage, the animation would not replay
  5. With sessionStorage, even a full page refresh does not help
- **Relevance:** This makes the bug particularly frustrating during development -- it appears the animation "stopped working" after code changes, when in reality the guard mechanism is working as designed but too aggressively.

### Finding 3: The `workflowPhase` stays `'idle'` but child columns receive no `active` prop
- **Location:** Lines 528, 542, 558 (desktop) and 568-587 (mobile)
- **Observation:** When `workflowPhase === 'idle'`:
  - InputColumn gets `active={active && workflowPhase === 'input'}` which is `false`
  - EngineColumn gets `active={active && (workflowPhase === 'engine' || ...)}` which is `false`
  - OutputColumn gets `active={active && (workflowPhase === 'output' || ...)}` which is `false`
  - Result: All three columns sit in their initial empty/zero state. The engine shows "AI Audit" at 0%, output cards have opacity 0.
- **Relevance:** Confirms the visual symptom is a direct consequence of `workflowPhase` never advancing from `'idle'`.

### Finding 4: No secondary CSS blocking
- **Location:** `/Users/bivourr/Desktop/myAgents/RhemicAI-dot-com/src/app/globals.css:77-80`
- **Observation:** The `.scroll-reveal` CSS sets `opacity: 0` initially, but this only affects the wrapper divs with class `scroll-reveal` (the header and the 3-column container). The ScrollRevealInit component properly adds the `is-visible` class when the section intersects. The child animation logic within InputColumn/EngineColumn/OutputColumn is independent of the scroll-reveal CSS. This is NOT a contributing factor.

## Root Cause Analysis

**Primary Root Cause:** The `sessionStorage.setItem('rhemic-aeo-workflow-v2', 'true')` on line 469 permanently prevents the animation from replaying within the same browser session. On page reload, the `useState` initializer on line 458-461 reads `'true'` from sessionStorage, sets `hasRun = true`, and the trigger useEffect (line 464-471) is gated by `!hasRun` -- so `setWorkflowPhase('input')` is never called.

**Secondary Contributing Factor (dev-only):** Next.js Fast Refresh preserves React state, so even without sessionStorage, the `hasRun = true` state persists across code edits.

**Confidence:** High -- verified through live browser testing with Playwright. Fresh session with cleared sessionStorage triggers animation correctly. Same session after page reload does not.

**Alternative hypotheses (ruled out):**
- `reduced` motion blocking: Verified `false` in browser -- ruled out
- IntersectionObserver not firing: Verified `inView` becomes `true` on scroll -- ruled out
- CSS `opacity: 0` from scroll-reveal hiding content: The scroll-reveal classes are on wrapper divs and work independently -- ruled out
- JavaScript errors: No console errors observed -- ruled out

## Recommended Fix

**Files to modify:**
- `/Users/bivourr/Desktop/myAgents/RhemicAI-dot-com/src/components/AEOEngine/AEOEngine.tsx` (lines 455-471)

**Option A: Remove sessionStorage entirely (recommended)**
The animation should replay every time the user scrolls to the section on a new page load. It is a key product demonstration and should not be hidden after the first view.

Replace lines 455-471:
```tsx
// Sequential workflow state
const [workflowPhase, setWorkflowPhase] = useState<'idle' | 'input' | 'engine' | 'output' | 'complete'>('idle');

// Track if workflow has started this mount (prevents re-trigger on scroll oscillation)
const hasStarted = useRef(false);

// Start workflow when section comes into view (once per page load)
useEffect(() => {
  if (inView && !hasStarted.current && !reduced) {
    hasStarted.current = true;
    setWorkflowPhase('input');
  }
}, [inView, reduced]);
```

This replaces `useState` + `sessionStorage` with a simple `useRef` that:
- Runs the animation once per page load (not once per session)
- Uses `useRef` instead of `useState` to avoid unnecessary re-renders
- Removes the sessionStorage dependency entirely
- Still prevents re-triggering if user scrolls away and back

**Option B: Keep sessionStorage but make it expire**
If the "once per session" behavior is intentional but the session window is too long, use a timestamp-based approach:

```tsx
const [hasRun, setHasRun] = useState(() => {
  if (typeof window === 'undefined') return false;
  const lastRun = sessionStorage.getItem('rhemic-aeo-workflow-v2');
  if (!lastRun) return false;
  // Expire after 5 minutes so it replays on return visits within session
  return (Date.now() - parseInt(lastRun, 10)) < 5 * 60 * 1000;
});

// In the useEffect, store timestamp instead of 'true':
sessionStorage.setItem('rhemic-aeo-workflow-v2', String(Date.now()));
```

**Recommended: Option A.** The animation is a product showcase -- it should always run when a visitor scrolls to it on each page load. The sessionStorage guard is overly aggressive and creates a poor UX where the most important product demonstration appears broken.

## Prevention

1. Avoid using `sessionStorage`/`localStorage` to gate animations unless there is a strong UX reason (e.g., intrusive modals). Product demonstrations should replay on each page load.
2. During development, add a dev-only override: `if (process.env.NODE_ENV === 'development') sessionStorage.removeItem('rhemic-aeo-workflow-v2')` at the top of the component to prevent state from persisting during HMR cycles.
3. Consider adding a visible "replay" button below the animation for users who want to see it again, as a UX alternative to automatic replay.

import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';

type LenisInstance = {
  options: Record<string, unknown>;
  raf: ReturnType<typeof vi.fn>;
  scrollTo: ReturnType<typeof vi.fn>;
  destroy: ReturnType<typeof vi.fn>;
};

type MediaQueryListMock = {
  matches: boolean;
  media: string;
  listeners: Set<(event: MediaQueryListEvent) => void>;
  addEventListener: (type: string, listener: (event: MediaQueryListEvent) => void) => void;
  removeEventListener: (type: string, listener: (event: MediaQueryListEvent) => void) => void;
};

const mocks = vi.hoisted(() => ({
  pathname: '/',
  lenisConstructor: vi.fn(),
  instances: [] as LenisInstance[],
}));

vi.mock('next/navigation', () => ({
  usePathname: () => mocks.pathname,
}));

vi.mock('lenis', () => ({
  default: mocks.lenisConstructor,
}));

const mediaQueries = new Map<string, MediaQueryListMock>();
let rafCallbacks = new Map<number, FrameRequestCallback>();
let rafId = 0;

function media(query: string) {
  const existing = mediaQueries.get(query);
  if (existing) return existing;

  const entry: MediaQueryListMock = {
    matches: false,
    media: query,
    listeners: new Set(),
    addEventListener: (_type, listener) => {
      entry.listeners.add(listener);
    },
    removeEventListener: (_type, listener) => {
      entry.listeners.delete(listener);
    },
  };

  mediaQueries.set(query, entry);
  return entry;
}

function setMedia(query: string, matches: boolean) {
  const entry = media(query);
  entry.matches = matches;
  const event = { matches, media: query } as MediaQueryListEvent;
  entry.listeners.forEach((listener) => listener(event));
}

function installMedia({ reducedMotion = false, coarsePointer = false } = {}) {
  mediaQueries.clear();
  media('(prefers-reduced-motion: reduce)').matches = reducedMotion;
  media('(pointer: coarse)').matches = coarsePointer;

  vi.spyOn(window, 'matchMedia').mockImplementation((query) => media(query) as unknown as MediaQueryList);
}

function flushRaf() {
  const callbacks = Array.from(rafCallbacks.values());
  rafCallbacks = new Map();
  callbacks.forEach((callback) => callback(performance.now()));
}

beforeEach(() => {
  mocks.pathname = '/';
  mocks.instances.length = 0;
  mocks.lenisConstructor.mockReset();
  mocks.lenisConstructor.mockImplementation(function LenisMock(options: Record<string, unknown>) {
    const instance = {
      options,
      raf: vi.fn(),
      scrollTo: vi.fn(),
      destroy: vi.fn(),
    };
    mocks.instances.push(instance);
    return instance;
  });

  installMedia();
  window.history.pushState({}, '', '/');

  rafId = 0;
  rafCallbacks = new Map();
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    const id = ++rafId;
    rafCallbacks.set(id, callback);
    return id;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
    rafCallbacks.delete(id);
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('SmoothScroll', () => {
  it('skips Lenis for reduced-motion users', () => {
    installMedia({ reducedMotion: true });

    render(<SmoothScroll />);

    expect(mocks.lenisConstructor).not.toHaveBeenCalled();
  });

  it('skips Lenis for coarse pointer users', () => {
    installMedia({ coarsePointer: true });

    render(<SmoothScroll />);

    expect(mocks.lenisConstructor).not.toHaveBeenCalled();
  });

  it('keeps Lenis enabled for fine pointer devices even when maxTouchPoints is present', () => {
    Object.defineProperty(window.navigator, 'maxTouchPoints', {
      configurable: true,
      value: 5,
    });

    render(<SmoothScroll />);

    expect(mocks.lenisConstructor).toHaveBeenCalledTimes(1);
    expect(mocks.instances[0].options).toMatchObject({
      smoothWheel: true,
      anchors: false,
    });
  });

  it('destroys Lenis on unmount', () => {
    const { unmount } = render(<SmoothScroll />);
    const instance = mocks.instances[0];

    unmount();

    expect(instance.destroy).toHaveBeenCalledTimes(1);
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('toggles Lenis when media query preferences change', () => {
    render(<SmoothScroll />);
    const firstInstance = mocks.instances[0];

    act(() => setMedia('(prefers-reduced-motion: reduce)', true));
    expect(firstInstance.destroy).toHaveBeenCalledTimes(1);

    act(() => setMedia('(prefers-reduced-motion: reduce)', false));
    expect(mocks.lenisConstructor).toHaveBeenCalledTimes(2);
  });

  it('scrolls to top on pathname changes only when Lenis is active', () => {
    const { rerender } = render(<SmoothScroll />);
    const instance = mocks.instances[0];
    instance.scrollTo.mockClear();

    mocks.pathname = '/pricing';
    rerender(<SmoothScroll />);

    expect(instance.scrollTo).toHaveBeenCalledWith(0, { immediate: true });
  });

  it('does not scroll to top on pathname changes when Lenis is inactive', () => {
    installMedia({ coarsePointer: true });
    const { rerender } = render(<SmoothScroll />);

    mocks.pathname = '/pricing';
    rerender(<SmoothScroll />);

    expect(mocks.lenisConstructor).not.toHaveBeenCalled();
  });

  it('lets native same-page hash navigation run while focusing the target for assistive tech', () => {
    installMedia({ reducedMotion: true });
    render(<SmoothScroll />);
    document.body.innerHTML = `
      <a href="#ai-visibility-scan">Run scan</a>
      <section id="ai-visibility-scan">Scan</section>
    `;

    const target = document.getElementById('ai-visibility-scan')!;
    const focusSpy = vi.spyOn(target, 'focus');
    const anchor = document.querySelector('a')!;
    const click = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });

    anchor.dispatchEvent(click);
    flushRaf();

    expect(click.defaultPrevented).toBe(false);
    expect(target).toHaveAttribute('tabindex', '-1');
    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });

    fireEvent.blur(target);
    expect(target).not.toHaveAttribute('tabindex');
  });

  it('no-ops for missing same-page hash targets', () => {
    installMedia({ reducedMotion: true });
    render(<SmoothScroll />);
    document.body.innerHTML = '<a href="#missing">Missing</a>';
    const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus');

    document.querySelector('a')!.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 })
    );
    flushRaf();

    expect(focusSpy).not.toHaveBeenCalled();
  });
});

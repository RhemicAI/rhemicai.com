import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const pushMock = vi.fn();
let currentPath = '/';

vi.mock('next/navigation', () => ({
  usePathname: () => currentPath,
  useRouter: () => ({ push: pushMock }),
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

import OfferPopup from '@/components/OfferPopup/OfferPopup';

const SHOW = 3000;
const EXIT = 300; // > component EXIT_MS

describe('OfferPopup', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    pushMock.mockReset();
    currentPath = '/';
    window.localStorage.clear();
  });
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  function advance(ms: number) {
    act(() => {
      vi.advanceTimersByTime(ms);
    });
  }

  it('does not render immediately, then appears after the delay', () => {
    render(<OfferPopup />);
    expect(screen.queryByRole('dialog')).toBeNull();
    advance(SHOW);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/See where your med spa is leaking money/i)).toBeInTheDocument();
    expect(screen.getByText(/25% off plus your setup fee waived/i)).toBeInTheDocument();
  });

  it('CTA persists dismissal immediately and routes to the calculator after the exit animation', () => {
    render(<OfferPopup />);
    advance(SHOW);
    fireEvent.click(screen.getByText(/Get my free snapshot/i));
    // dismissal persists right away; navigation happens after the exit animation
    expect(window.localStorage.getItem('rhemic_offer_popup_dismissed_at')).toBeTruthy();
    advance(EXIT);
    expect(pushMock).toHaveBeenCalledWith('/free-consult-leak-calculator');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('does not show again once recently dismissed', () => {
    window.localStorage.setItem('rhemic_offer_popup_dismissed_at', String(Date.now()));
    render(<OfferPopup />);
    advance(SHOW);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('is suppressed on the calculator page', () => {
    currentPath = '/free-consult-leak-calculator';
    render(<OfferPopup />);
    advance(SHOW);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('close button dismisses (after exit animation) without navigating', () => {
    render(<OfferPopup />);
    advance(SHOW);
    fireEvent.click(screen.getByLabelText(/close/i));
    advance(EXIT);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(pushMock).not.toHaveBeenCalled();
  });
});

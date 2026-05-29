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

  it('does not render immediately, then appears after the delay', () => {
    render(<OfferPopup />);
    expect(screen.queryByRole('dialog')).toBeNull();
    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText(/See where your med spa is leaking money/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/25% off plus your setup fee waived/i)).toBeInTheDocument();
  });

  it('CTA routes to the calculator and persists dismissal', () => {
    render(<OfferPopup />);
    act(() => {
      vi.advanceTimersByTime(7000);
    });
    fireEvent.click(screen.getByText(/Get my free snapshot/i));
    expect(pushMock).toHaveBeenCalledWith('/free-consult-leak-calculator');
    expect(window.localStorage.getItem('rhemic_offer_popup_dismissed_at')).toBeTruthy();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('does not show again once recently dismissed', () => {
    window.localStorage.setItem('rhemic_offer_popup_dismissed_at', String(Date.now()));
    render(<OfferPopup />);
    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('is suppressed on the calculator page', () => {
    currentPath = '/free-consult-leak-calculator';
    render(<OfferPopup />);
    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('close button dismisses without navigating', () => {
    render(<OfferPopup />);
    act(() => {
      vi.advanceTimersByTime(7000);
    });
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(pushMock).not.toHaveBeenCalled();
  });
});

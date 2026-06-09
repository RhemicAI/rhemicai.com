'use client';

import type { ReactNode } from 'react';
import { CAL_BOOKING_EVENT_NAME } from '@/lib/calEmbed';

type Props = {
  className?: string;
  children: ReactNode;
  onActivate?: () => void;
};

// Opens the in-page booking modal (CalBookingSurface) with the audit event.
// No redirect — the Cal embed renders inside our own cream UI.
export default function AuditButton({ className, children, onActivate }: Props) {
  const open = () => {
    window.dispatchEvent(
      new CustomEvent(CAL_BOOKING_EVENT_NAME, {
        detail: {
          calLink: 'rhemic-ai/rhemic-ai-audit-walkthrough',
          durationLabel: '20 minute audit',
          title: 'Run your revenue leak audit.',
          subtitle: 'Pick a time. We will show you exactly where leads leak.',
          prepNote:
            'We scan your AI visibility, Google presence, and call capture before the call, so it is specific to your business.',
        },
      })
    );
    onActivate?.();
  };

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

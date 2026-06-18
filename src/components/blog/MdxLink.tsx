'use client';

import type { AnchorHTMLAttributes } from 'react';
import { openAuditBooking } from '@/components/redesign/AuditButton';

// MDX anchor override. A link with href="#book-audit" opens the same Cal booking
// modal as the header "Get audit" button instead of navigating to the stale
// /contact form. Everything else renders as a normal link.
export default function MdxLink({
  href = '',
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href === '#book-audit') {
    return (
      <a
        href="#book-audit"
        onClick={(e) => {
          e.preventDefault();
          openAuditBooking();
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

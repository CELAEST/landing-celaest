"use client";

import React from "react";
import { buildMailtoUrl } from "@/lib/contact";
import { useContactModal } from "./contact-context";

interface ContactTriggerLinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  subject?: string;
  source?: string;
  to?: string;
  children: React.ReactNode;
}

/**
 * Progressive-enhancement contact trigger: keeps native mailto: href for
 * analytics tracking, SEO, and middle-click, while opening the in-app
 * ContactModal on standard left-click.
 */
export function ContactTriggerLink({
  subject,
  source,
  to,
  onClick,
  children,
  ...rest
}: ContactTriggerLinkProps) {
  const contact = useContactModal();
  const href = buildMailtoUrl({ to, subject });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    if (contact) {
      e.preventDefault();
      contact.openContactModal({ subject, source });
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

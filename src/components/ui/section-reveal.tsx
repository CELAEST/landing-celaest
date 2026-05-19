"use client";

import { createElement, useEffect, useRef, useState, ReactNode, ElementType } from "react";

/**
 * Lightweight CSS-only section reveal component.
 *
 * Replaces heavy framer-motion `whileInView` triggers with a single
 * IntersectionObserver + a CSS class swap. Massively cheaper because:
 *  - no per-frame interpolation by JS (CSS does it on the compositor)
 *  - no big motion runtime needed for simple "fade up on enter"
 *  - the observer only fires once and disconnects
 */
export function SectionReveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `section-reveal ${visible ? "is-visible" : ""} ${className}`.trim(),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}

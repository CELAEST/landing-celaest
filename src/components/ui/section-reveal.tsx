"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  ReactNode,
  ElementType,
  HTMLAttributes,
} from "react";

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
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
} & HTMLAttributes<HTMLElement>) {
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
      { rootMargin: "250px 0px 250px 0px", threshold: 0 },
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
      ...rest,
    },
    children,
  );
}

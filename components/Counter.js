"use client";
import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts up when scrolled into view.
 *
 * The value is written straight to the text node rather than held in state —
 * four of these run together in the hero, and a state update per counter per
 * frame meant ~240 React renders a second during the entrance animation.
 */
export const Counter = ({
  to,
  suffix = "",
  duration = 1600,
  className = "",
}) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduce) {
      node.textContent = `${to}${suffix}`;
      return;
    }

    if (!inView) return;

    let raf;
    let last = -1;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const value = Math.round(to * (1 - Math.pow(1 - t, 3)));

      if (value !== last) {
        last = value;
        node.textContent = `${value}${suffix}`;
      }

      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, suffix, duration]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {`0${suffix}`}
    </span>
  );
};

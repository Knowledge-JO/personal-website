"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*_-#$%&";

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/**
 * Decrypt-on-reveal text. Characters resolve left to right while the
 * unresolved tail keeps cycling, so the layout never shifts.
 *
 * The cycling frames are written directly to the text node: every heading on
 * the site uses this, and a state update every 32ms per instance re-rendered
 * the whole header subtree ~30 times a second each.
 *
 * The scrambled span is hidden from assistive tech and the real string is
 * exposed alongside it — otherwise screen readers announce random glyphs for
 * every section heading, and the accessible name changes on every tick.
 */
export const ScrambleText = ({
  text,
  className = "",
  tickMs = 32,
  charsPerTick = 1,
  delay = 0,
  trigger = "view",
}) => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const outRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const active = reduce ? false : trigger === "mount" || inView;

  useEffect(() => {
    const node = outRef.current;
    if (!node) return;

    if (reduce) {
      node.textContent = text;
      return;
    }

    if (!active) return;

    const chars = Array.from(text);
    const buffer = chars.slice();
    let revealed = 0;
    let interval;

    const timer = setTimeout(() => {
      interval = setInterval(() => {
        revealed = Math.min(chars.length, revealed + charsPerTick);

        for (let i = 0; i < chars.length; i += 1) {
          if (i < revealed || chars[i] === " ") buffer[i] = chars[i];
          else buffer[i] = randomChar();
        }

        node.textContent = buffer.join("");

        if (revealed >= chars.length) clearInterval(interval);
      }, tickMs);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [active, reduce, text, tickMs, charsPerTick, delay]);

  return (
    <span ref={ref} className={className}>
      <span ref={outRef} aria-hidden="true" suppressHydrationWarning>
        {reduce ? text : " "}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
};

/** Cycles through a list of strings with a scramble transition between each. */
export const RotatingScramble = ({ items, className = "", holdMs = 2600 }) => {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      holdMs
    );
    return () => clearInterval(id);
  }, [items.length, holdMs, reduce]);

  return (
    <span className={className}>
      <ScrambleText
        key={index}
        text={items[index]}
        trigger="mount"
        tickMs={26}
        charsPerTick={1}
      />
    </span>
  );
};

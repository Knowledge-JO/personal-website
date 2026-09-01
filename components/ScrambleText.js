"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*_-#$%&";

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/**
 * Decrypt-on-reveal text. Characters resolve left to right while the
 * unresolved tail keeps cycling, so the layout never shifts.
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
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [output, setOutput] = useState(reduce ? text : "");

  const active = reduce ? false : trigger === "mount" || inView;

  useEffect(() => {
    if (!active || reduce) {
      if (reduce) setOutput(text);
      return;
    }

    let revealed = 0;
    let frame;
    let interval;

    const run = () => {
      interval = setInterval(() => {
        revealed = Math.min(text.length, revealed + charsPerTick);

        const next = text
          .split("")
          .map((char, i) => {
            if (i < revealed) return char;
            if (char === " ") return " ";
            return randomChar();
          })
          .join("");

        setOutput(next);

        if (revealed >= text.length) clearInterval(interval);
      }, tickMs);
    };

    frame = setTimeout(run, delay);

    return () => {
      clearTimeout(frame);
      clearInterval(interval);
    };
  }, [active, reduce, text, tickMs, charsPerTick, delay]);

  return (
    <span ref={ref} className={className}>
      {output || (reduce ? text : "\u00A0")}
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

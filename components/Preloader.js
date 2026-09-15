"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { languages } from "../utils/languages";

const bootLines = [
  "init kernel ......... ok",
  "mount /dev/portfolio  ok",
  "handshake rs256 ..... ok",
  "ledger integrity .... ok",
  "agent tools [20] .... ok",
  "render pipeline ..... ok",
];

const TOTAL_MS = 2200;

/** Own component so its 180ms interval only re-renders this one node. */
const Greeting = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % languages.length),
      180
    );
    return () => clearInterval(id);
  }, []);

  return (
    <motion.span
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono text-[0.65rem] tracking-[0.2em] text-slate-500"
    >
      {languages[index]}
    </motion.span>
  );
};

export const Preloader = ({ onSetIsLoading }) => {
  const reduce = useReducedMotion();
  const pctRef = useRef(null);
  const barRef = useRef(null);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      onSetIsLoading(false);
      return;
    }

    const start = performance.now();
    let raf;
    let lastPct = -1;
    let lastLines = -1;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / TOTAL_MS);
      const eased = 1 - Math.pow(1 - t, 2.2);
      const pct = Math.round(eased * 100);

      // Written straight to the DOM: this runs during hydration and the hero's
      // entrance animation, where a React render per frame is the worst thing
      // we could be doing.
      if (pct !== lastPct) {
        lastPct = pct;
        if (pctRef.current) {
          pctRef.current.textContent = String(pct).padStart(3, "0");
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${pct / 100})`;
        }
      }

      const lines = Math.ceil(eased * bootLines.length);
      if (lines !== lastLines) {
        lastLines = lines;
        setLineCount(lines);
      }

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const done = setTimeout(() => onSetIsLoading(false), TOTAL_MS + 280);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [onSetIsLoading, reduce]);

  if (reduce) return null;

  return (
    <motion.div
      className="boot-failsafe fixed inset-0 z-[80] flex items-center justify-center bg-void-950"
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid-fine absolute inset-0 opacity-50" />
      <div className="scanlines absolute inset-0" />

      <div className="relative w-full max-w-md px-8">
        <div className="mb-8 flex items-baseline justify-between">
          <span className="hud-label">system boot</span>
          <Greeting />
        </div>

        <div className="mb-8 font-display text-6xl font-black tabular-nums text-white sm:text-7xl">
          <span ref={pctRef} suppressHydrationWarning>
            000
          </span>
          <span className="ml-2 text-lg text-neon-cyan/70">%</span>
        </div>

        <div className="relative mb-8 h-[3px] w-full overflow-hidden bg-white/[0.08]">
          {/*
            scaleX rather than width: a linear gradient renders identically
            either way, and this keeps the bar off the layout path.
          */}
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta transition-transform duration-100 ease-out will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
          <div className="absolute inset-0 animate-sweep bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        <div className="grid gap-1.5 font-mono text-[0.66rem] tracking-wider text-slate-500">
          {bootLines.slice(0, lineCount).map((line) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2"
            >
              <span className="text-neon-cyan/60">›</span>
              <span>{line}</span>
            </motion.div>
          ))}
          <span className="inline-block h-3 w-[7px] animate-blink bg-neon-cyan/80" />
        </div>
      </div>
    </motion.div>
  );
};

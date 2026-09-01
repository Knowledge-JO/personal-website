"use client";
import { useEffect, useState } from "react";
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

export const Preloader = ({ onSetIsLoading }) => {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [greetIndex, setGreetIndex] = useState(0);

  useEffect(() => {
    if (reduce) {
      onSetIsLoading(false);
      return;
    }

    const start = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / TOTAL_MS);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setProgress(Math.round(eased * 100));
      setLineCount(Math.ceil(eased * bootLines.length));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const greetId = setInterval(
      () => setGreetIndex((i) => (i + 1) % languages.length),
      180
    );

    const done = setTimeout(() => onSetIsLoading(false), TOTAL_MS + 280);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(greetId);
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
          <motion.span
            key={greetIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[0.65rem] tracking-[0.2em] text-slate-500"
          >
            {languages[greetIndex]}
          </motion.span>
        </div>

        <div className="mb-8 font-display text-6xl font-black tabular-nums text-white sm:text-7xl">
          {String(progress).padStart(3, "0")}
          <span className="ml-2 text-lg text-neon-cyan/70">%</span>
        </div>

        <div className="relative mb-8 h-[3px] w-full overflow-hidden bg-white/[0.08]">
          <div
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
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

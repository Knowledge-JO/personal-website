"use client";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Full-viewport CRT treatment: static scanlines, film grain, a slow sweeping
 * beam and an edge vignette. Sits above content, ignores pointer events.
 */
export const CrtOverlay = () => {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      <div className="scanlines absolute inset-0" />

      <div className="noise-layer absolute inset-0 opacity-[0.035] mix-blend-overlay" />

      {!reduce && (
        <div className="absolute inset-x-0 top-0 h-[38vh] animate-scanline bg-gradient-to-b from-transparent via-neon-cyan/[0.045] to-transparent" />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 42%, rgba(3,4,10,0.55) 88%, rgba(3,4,10,0.92) 100%)",
        }}
      />
    </div>
  );
};

/**
 * A neon glow that trails the pointer. Desktop-only — it never mounts on
 * touch devices, where it would just be a stuck blob.
 */
export const CursorGlow = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.4 });
  const background = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(0,229,255,0.09), rgba(157,92,255,0.05) 40%, transparent 68%)`;

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    setEnabled(true);

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{ background }}
    />
  );
};

/**
 * Layered ambient backdrop: fine grid, drifting perspective floor and two
 * slow-breathing colour blooms.
 */
export const Backdrop = () => {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void-950" />

      <div className="grid-fine absolute inset-0 opacity-60" />

      {/* Perspective floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[52vh] overflow-hidden"
        style={{
          perspective: "300px",
          maskImage: "linear-gradient(to top, #000 5%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to top, #000 5%, transparent 92%)",
        }}
      >
        <div
          className={`grid-floor absolute inset-x-[-60%] bottom-[-40%] h-[180%] ${
            reduce ? "" : "animate-grid-drift"
          }`}
          style={{ transform: "rotateX(72deg)", transformOrigin: "bottom" }}
        />
      </div>

      {/* Colour blooms */}
      <motion.div
        className="absolute -left-40 top-[-10%] h-[46rem] w-[46rem] rounded-full bg-neon-cyan/[0.07] blur-[130px]"
        animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-40 top-[34%] h-[40rem] w-[40rem] rounded-full bg-neon-magenta/[0.06] blur-[130px]"
        animate={reduce ? {} : { scale: [1.1, 1, 1.1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-1/3 h-[34rem] w-[34rem] rounded-full bg-neon-violet/[0.05] blur-[140px]"
        animate={reduce ? {} : { scale: [1, 1.18, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

/** Thin animated progress rail pinned to the top of the viewport. */
export const ScrollRail = ({ progress }) => (
  <motion.div
    aria-hidden="true"
    className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta"
    style={{ scaleX: progress }}
  />
);

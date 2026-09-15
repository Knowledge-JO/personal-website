"use client";
import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

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
        <div className="animate-scanline absolute inset-x-0 top-0 h-[38vh] bg-gradient-to-b from-transparent via-neon-cyan/[0.045] to-transparent" />
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

/* The gradient is a 420px-radius circle, so a 840px box reproduces it exactly. */
const GLOW = 840;

/* Pointer capability is read through the store API rather than set from an
 * effect, which used to cost every visitor an extra render of this subtree. */
const subscribePointer = () => () => {};
const hasFinePointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const noFinePointerOnServer = () => false;

/**
 * A neon glow that trails the pointer. Desktop-only — it never mounts on
 * touch devices, where it would just be a stuck blob.
 *
 * The glow is a fixed-size layer moved with a transform rather than a
 * viewport-sized layer whose `background` gradient is recomputed per frame.
 * Repainting a full-screen gradient on every pointer frame was the single
 * most expensive thing on the page; a transform is a compositor-only change.
 */
export const CursorGlow = () => {
  const reduce = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribePointer,
    hasFinePointer,
    noFinePointerOnServer
  );
  const enabled = !reduce && finePointer;

  const x = useMotionValue(-GLOW);
  const y = useMotionValue(-GLOW);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55] overflow-hidden"
    >
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: sx,
          y: sy,
          left: -GLOW / 2,
          top: -GLOW / 2,
          width: GLOW,
          height: GLOW,
          background:
            "radial-gradient(420px circle at center, rgba(0,229,255,0.09), rgba(157,92,255,0.05) 40%, transparent 68%)",
        }}
      />
    </div>
  );
};

/**
 * One breathing colour bloom.
 *
 * The blur lives on a static inner element so the browser rasterises it once;
 * the animated wrapper only changes transform and opacity, which the
 * compositor handles without re-running a 130px gaussian blur every frame.
 */
const Bloom = ({ className, blob, animate, duration, reduce }) => (
  <motion.div
    className={`absolute will-change-transform ${className}`}
    animate={reduce ? undefined : animate}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className={`h-full w-full rounded-full ${blob}`} />
  </motion.div>
);

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
      <Bloom
        reduce={reduce}
        className="-left-40 top-[-10%] h-[46rem] w-[46rem]"
        blob="bg-neon-cyan/[0.07] blur-[130px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.55, 1, 0.55] }}
        duration={13}
      />
      <Bloom
        reduce={reduce}
        className="-right-40 top-[34%] h-[40rem] w-[40rem]"
        blob="bg-neon-magenta/[0.06] blur-[130px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.9, 0.4] }}
        duration={16}
      />
      <Bloom
        reduce={reduce}
        className="bottom-[-15%] left-1/3 h-[34rem] w-[34rem]"
        blob="bg-neon-violet/[0.05] blur-[140px]"
        animate={{ scale: [1, 1.18, 1] }}
        duration={19}
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

"use client";
import { useReducedMotion } from "framer-motion";

/**
 * Chromatic-aberration glitch. Two clipped, colour-shifted copies of the text
 * jitter behind the real one; the real one stays legible at all times.
 */
export const GlitchText = ({ text, className = "", intensity = "normal" }) => {
  const reduce = useReducedMotion();

  const layers =
    intensity === "loud"
      ? ["animate-glitch-a", "animate-glitch-b"]
      : ["animate-glitch-a", "animate-glitch-b"];

  return (
    <span className={`relative inline-block ${className}`}>
      {!reduce && (
        <>
          <span
            aria-hidden="true"
            className={`absolute inset-0 select-none text-neon-cyan/60 mix-blend-screen ${layers[0]}`}
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 46%, 0 46%)" }}
          >
            {text}
          </span>
          <span
            aria-hidden="true"
            className={`absolute inset-0 select-none text-neon-magenta/60 mix-blend-screen ${layers[1]}`}
            style={{ clipPath: "polygon(0 54%, 100% 54%, 100% 100%, 0 100%)" }}
          >
            {text}
          </span>
        </>
      )}
      <span className="relative">{text}</span>
    </span>
  );
};

/** Glitches only while its parent `.group` is hovered. */
export const GlitchOnHover = ({ text, className = "" }) => {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-block ${className}`}>
      {!reduce && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 select-none text-neon-cyan/0 mix-blend-screen transition-none group-hover:animate-glitch-a group-hover:text-neon-cyan/70"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 46%, 0 46%)" }}
          >
            {text}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 select-none text-neon-magenta/0 mix-blend-screen group-hover:animate-glitch-b group-hover:text-neon-magenta/70"
            style={{ clipPath: "polygon(0 54%, 100% 54%, 100% 100%, 0 100%)" }}
          >
            {text}
          </span>
        </>
      )}
      <span className="relative">{text}</span>
    </span>
  );
};

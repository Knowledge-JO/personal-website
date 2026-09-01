"use client";
import { useReducedMotion } from "framer-motion";
import { marqueeItems } from "@/data/profile";

export const TechMarquee = ({ reverse = false }) => {
  const reduce = useReducedMotion();
  const row = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative border-y border-neon-cyan/10 bg-void-900/40 py-4">
      <div className="mask-fade-x flex overflow-hidden">
        <div
          className={`flex w-max shrink-0 items-center gap-10 ${
            reduce ? "" : "animate-marquee"
          }`}
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
          {row.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.24em] text-slate-500 transition-colors hover:text-neon-cyan">
                {item}
              </span>
              <span className="h-1 w-1 shrink-0 rotate-45 bg-neon-magenta/50" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

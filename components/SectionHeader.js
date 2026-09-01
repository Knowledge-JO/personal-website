"use client";
import { Reveal } from "./Reveal";
import { ScrambleText } from "./ScrambleText";

export const SectionHeader = ({
  id,
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}) => (
  <div
    className={`${
      align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
    } ${className}`}
  >
    <Reveal>
      <div
        className={`flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {id && (
          <span className="font-mono text-[0.62rem] tracking-[0.3em] text-neon-magenta/70">
            {id}
          </span>
        )}
        <span className="h-[1px] w-8 bg-neon-cyan/50" />
        <span className="hud-label">{eyebrow}</span>
      </div>
    </Reveal>

    <Reveal delay={0.08}>
      <h2 className="mt-5 font-display text-3xl font-black uppercase leading-[1.05] tracking-wide text-white sm:text-4xl lg:text-5xl">
        <ScrambleText text={title} tickMs={22} charsPerTick={2} />
      </h2>
    </Reveal>

    {lede && (
      <Reveal delay={0.16}>
        <p
          className={`mt-5 text-sm leading-relaxed text-slate-400 sm:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lede}
        </p>
      </Reveal>
    )}
  </div>
);

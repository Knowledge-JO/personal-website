"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiArrowNarrowRight } from "react-icons/hi";
import { profile } from "@/data/profile";
import { Counter } from "./Counter";
import { GlitchText } from "./GlitchText";
import { RotatingScramble, ScrambleText } from "./ScrambleText";

const EASE = [0.16, 1, 0.3, 1];

const rise = (delay) => ({
  initial: { opacity: 0, y: 26, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: EASE },
});

export const Hero = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      {/* HUD frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-5 hidden sm:block lg:inset-9"
      >
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map(
          (pos) => (
            <motion.span
              key={pos}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
              className={`absolute h-10 w-10 border-neon-cyan/35 ${pos}`}
            />
          )
        )}
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-14">
        <motion.div
          {...rise(0.1)}
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-neon-lime/80">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-neon-lime" />
            Available for remote · US · UK · DE · AE · AU
          </span>
          <span className="hidden h-[1px] w-10 bg-white/15 sm:block" />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-500">
            {profile.location}
          </span>
        </motion.div>

        <motion.p
          {...rise(0.25)}
          className="mt-9 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-neon-cyan/70"
        >
          <ScrambleText text="// identity confirmed" trigger="mount" tickMs={26} />
        </motion.p>

        <motion.h1
          {...rise(0.4)}
          className={`mt-4 font-display text-[2.7rem] font-black uppercase leading-[0.86] tracking-tight text-white sm:text-[5.2rem] lg:text-[7.5rem] ${
            reduce ? "" : "animate-flicker"
          }`}
        >
          <span className="block">
            <GlitchText text="Knowledge" />
          </span>
          <span className="block text-stroke">Okhakumhe</span>
        </motion.h1>

        <motion.div
          {...rise(0.6)}
          className="mt-7 flex flex-col gap-2 border-l border-neon-cyan/30 pl-5 sm:pl-7"
        >
          <p className="font-display text-base font-bold uppercase tracking-[0.18em] text-neon-cyan sm:text-xl">
            <RotatingScramble items={profile.roles} />
          </p>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
            {profile.tagline}
          </p>
        </motion.div>

        <motion.div {...rise(0.78)} className="mt-11 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="btn-neon clip-tag group flex items-center gap-3 px-8 py-4"
          >
            View selected work
            <HiArrowNarrowRight className="text-base transition-transform duration-500 group-hover:translate-x-1.5" />
          </Link>
          <Link href="/contact" className="btn-ghost clip-tag px-8 py-4">
            Start a conversation
          </Link>
        </motion.div>

        {/* Live readout strip */}
        <motion.div
          {...rise(0.95)}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px border border-white/[0.06] sm:grid-cols-4"
        >
          {profile.stats.map((s) => (
            <div key={s.label} className="bg-void-900/60 px-4 py-4">
              <p className="font-display text-2xl font-black leading-none tabular-nums text-white">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-mono text-[0.55rem] uppercase leading-tight tracking-[0.16em] text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        >
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-slate-600">
            scroll
          </span>
          <span className="relative h-14 w-[1px] overflow-hidden bg-white/10">
            <motion.span
              className="absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-neon-cyan to-transparent"
              animate={{ y: [-20, 56] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      )}
    </section>
  );
};

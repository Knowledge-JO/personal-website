"use client";
import Link from "next/link";
import { profile } from "@/data/profile";
import { Socials } from "./Socials";

export const Footer = () => (
  <footer className="relative border-t border-neon-cyan/10 bg-void-950/60">
    <div className="rule-neon opacity-60" />

    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="hud-label">end of transmission</p>
          <p className="mt-3 font-display text-2xl font-black uppercase tracking-wide text-white">
            Let&apos;s build something
            <span className="text-neon-cyan"> hard</span>.
          </p>
          <Link
            href={`mailto:${profile.email}`}
            className="mt-3 inline-block font-mono text-xs tracking-widest text-slate-400 underline-offset-4 transition-colors hover:text-neon-cyan hover:underline"
          >
            {profile.email}
          </Link>
        </div>

        <Socials />
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-6 font-mono text-[0.62rem] tracking-[0.18em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name.toUpperCase()}</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-neon-lime" />
          Open to remote · Worldwide
        </span>
        <span>Built with Next.js · Deployed on Vercel</span>
      </div>
    </div>
  </footer>
);

"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { BiLinkExternal } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import { HiArrowNarrowRight } from "react-icons/hi";
import { accentMap } from "@/data/projects";
import { GlitchOnHover } from "./GlitchText";

const EASE = [0.16, 1, 0.3, 1];

/** Pointer-tracked spotlight shared by both card variants. */
function useSpotlight() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const onLeave = () => {
    mx.set(-9999);
    my.set(-9999);
  };

  return { mx, my, onMove, onLeave };
}

function Spotlight({ mx, my, rgb }) {
  const background = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgba(${rgb},0.13), transparent 72%)`;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ background }}
    />
  );
}

function MetricStrip({ metrics, accent, dense = false }) {
  const a = accentMap[accent];

  return (
    <div
      className={`grid gap-px border border-white/[0.06] bg-white/[0.03] ${
        dense ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      }`}
    >
      {metrics.map((m) => (
        <div
          key={m.label}
          className="flex flex-col gap-1 bg-void-900/70 px-3 py-3 transition-colors duration-500 group-hover:bg-void-800/70"
        >
          <span
            className={`font-display text-lg font-black leading-none tabular-nums ${a.text}`}
          >
            {m.value}
          </span>
          <span className="font-mono text-[0.55rem] uppercase leading-tight tracking-[0.14em] text-slate-500">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function LinkRow({ links }) {
  if (!links?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost clip-tag flex items-center gap-2 px-4 py-2"
        >
          {l.type === "github" ? (
            <AiFillGithub className="text-sm" />
          ) : (
            <BiLinkExternal className="text-sm" />
          )}
          {l.label}
        </Link>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Compact card — used in the "Selected Work" grid on the landing page        */
/* ────────────────────────────────────────────────────────────────────────── */

export const ProjectCard = ({ project }) => {
  const a = accentMap[project.accent] ?? accentMap.cyan;
  const { mx, my, onMove, onLeave } = useSpotlight();

  const chips = Object.values(project.stack).flat().slice(0, 6);

  return (
    <Link
      href={`/projects#${project.id}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group panel panel-hover brackets clip-notch relative block h-full overflow-hidden p-6 sm:p-7"
    >
      <Spotlight mx={mx} my={my} rgb={a.rgb} />

      <div
        className={`absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-gradient-to-r from-transparent ${a.from} to-transparent opacity-0 transition-all duration-700 group-hover:scale-x-100 group-hover:opacity-100`}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[0.62rem] tracking-[0.3em] text-slate-600">
            {project.index}
          </span>
          <span
            className={`chip clip-tag border-none ${a.text} bg-white/[0.04]`}
          >
            {project.domain.split("·")[0].trim()}
          </span>
        </div>

        <h3 className="mt-5 font-display text-2xl font-black uppercase tracking-wide text-white">
          <GlitchOnHover text={project.name} />
        </h3>

        <p className={`mt-1.5 font-mono text-[0.7rem] tracking-wider ${a.text}`}>
          {project.subtitle}
        </p>

        <p className="mt-4 text-[0.82rem] leading-relaxed text-slate-400">
          {project.summary}
        </p>

        <div className="mt-6">
          <MetricStrip
            metrics={project.metrics.slice(0, 3)}
            accent={project.accent}
            dense
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <span key={c} className="chip clip-tag">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-6 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-500 transition-colors group-hover:text-white">
          Open dossier
          <HiArrowNarrowRight className="text-base transition-transform duration-500 group-hover:translate-x-1.5" />
        </div>
      </div>
    </Link>
  );
};

/* ────────────────────────────────────────────────────────────────────────── */
/* Full dossier — used on /projects                                           */
/* ────────────────────────────────────────────────────────────────────────── */

export const ProjectDossier = ({ project, defaultOpen = false }) => {
  const a = accentMap[project.accent] ?? accentMap.cyan;
  const [open, setOpen] = useState(defaultOpen);
  const { mx, my, onMove, onLeave } = useSpotlight();

  return (
    <article
      id={project.id}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group panel panel-hover brackets clip-hud relative scroll-mt-28 overflow-hidden"
    >
      <Spotlight mx={mx} my={my} rgb={a.rgb} />

      <div
        className={`absolute left-0 top-0 h-full w-[2px] ${a.bg} opacity-30 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative p-6 sm:p-9 lg:p-11">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[0.62rem] tracking-[0.3em] text-slate-600">
                {project.index}
              </span>
              <span className="h-[1px] w-6 bg-white/15" />
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
                {project.kind}
              </span>
              {project.flagship && (
                <span className="chip clip-tag border-neon-cyan/40 text-neon-cyan">
                  Flagship
                </span>
              )}
            </div>

            <h2 className="mt-4 font-display text-3xl font-black uppercase leading-none tracking-wide text-white sm:text-4xl lg:text-5xl">
              <GlitchOnHover text={project.name} />
            </h2>

            <p
              className={`mt-3 font-mono text-xs tracking-[0.14em] sm:text-sm ${a.text}`}
            >
              {project.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-slate-500">
              <span>
                <span className="text-slate-600">Role /</span> {project.role}
              </span>
              <span>
                <span className="text-slate-600">Period /</span> {project.period}
              </span>
              <span>
                <span className="text-slate-600">Domain /</span> {project.domain}
              </span>
            </div>
          </div>

          {project.imageSrc && (
            <div className="relative w-full shrink-0 overflow-hidden border border-white/10 lg:w-64">
              <Image
                src={project.imageSrc}
                alt={`${project.name} interface`}
                width={512}
                height={320}
                className="h-40 w-full object-cover opacity-50 saturate-50 transition-all duration-700 group-hover:opacity-90 group-hover:saturate-100 lg:h-36"
              />
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${a.from} to-transparent mix-blend-overlay`}
              />
              <div className="scanlines pointer-events-none absolute inset-0" />
            </div>
          )}
        </div>

        <p className="mt-7 max-w-4xl text-sm leading-relaxed text-slate-300 sm:text-[0.95rem]">
          {project.summary}
        </p>

        <div className="mt-7">
          <MetricStrip metrics={project.metrics} accent={project.accent} />
        </div>

        {/* Stack */}
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(project.stack).map(([group, items]) => (
            <div key={group}>
              <p className="hud-label mb-2.5">{group}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span key={item} className="chip clip-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Toggle */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="btn-neon clip-tag flex items-center gap-2.5 px-5 py-3"
          >
            {open ? "Collapse breakdown" : "Read the breakdown"}
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-flex"
            >
              <HiArrowNarrowRight className="text-base" />
            </motion.span>
          </button>

          <LinkRow links={project.links} />
        </div>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-9 grid gap-9">
                <div className="rule-neon" />

                <div className="grid gap-7 lg:grid-cols-2">
                  <div>
                    <p className="hud-label">The problem</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <p className="hud-label">The approach</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {project.approach}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="hud-label">Engineering highlights</p>
                  <div className="mt-4 grid gap-px border border-white/[0.06] sm:grid-cols-2">
                    {project.highlights.map((h, i) => (
                      <motion.div
                        key={h.title}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.5, ease: EASE }}
                        className="relative bg-void-900/70 p-5 transition-colors duration-400 hover:bg-void-800/80"
                      >
                        <span
                          className={`absolute left-0 top-0 h-full w-[1px] ${a.bg} opacity-0 transition-opacity duration-400 hover:opacity-70`}
                        />
                        <div className="flex items-baseline gap-2.5">
                          <span className="font-mono text-[0.58rem] tracking-[0.2em] text-slate-600">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                            {h.title}
                          </h4>
                        </div>
                        <p className="mt-2.5 pl-8 text-[0.8rem] leading-relaxed text-slate-400">
                          {h.body}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};

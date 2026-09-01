import Link from "next/link";
import { HiArrowNarrowRight } from "react-icons/hi";
import {
  Hero,
  ProjectCard,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeader,
  TechMarquee,
} from "@/components";
import { profile } from "@/data/profile";
import { accentMap, featuredProjects } from "@/data/projects";
import { BootSequence } from "./boot";

const SECTION = "relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32";

const spec = [
  { key: "Designation", value: profile.roles[0] },
  { key: "Base", value: profile.location },
  { key: "Focus", value: "MCP · RAG · agent authorisation" },
  { key: "Shipped", value: "7 production systems · solo and team" },
];

export default function Home() {
  return (
    <>
      <BootSequence />

      <Hero />

      <TechMarquee />

      {/* ── Profile ─────────────────────────────────────────────────── */}
      <section id="profile" className={SECTION}>
        <SectionHeader
          id="01"
          eyebrow="profile"
          title="Who you're hiring"
          lede="I work on the parts of an AI product that quietly decide whether it can be trusted — tool permissions, retrieval boundaries, and the machinery that keeps a model inside the caller's own authority."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="grid gap-6">
            {profile.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-sm leading-[1.85] text-slate-400 sm:text-[0.95rem]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.14} y={40}>
            <div className="panel brackets clip-hud relative overflow-hidden p-7">
              <div className="grid-fine pointer-events-none absolute inset-0 opacity-30" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="hud-label">operator.spec</p>
                  <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-neon-lime" />
                </div>

                <div className="rule-neon my-6" />

                <dl className="grid gap-5">
                  {spec.map((row) => (
                    <div key={row.key}>
                      <dt className="font-mono text-[0.55rem] uppercase tracking-[0.24em] text-slate-600">
                        {row.key}
                      </dt>
                      <dd className="mt-1.5 font-display text-[0.82rem] font-bold uppercase tracking-wider text-slate-200">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="rule-neon my-6" />

                <Link
                  href="/contact"
                  className="group flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.24em] text-neon-cyan/80 transition-colors hover:text-neon-cyan"
                >
                  Open a channel
                  <HiArrowNarrowRight className="text-base transition-transform duration-500 group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Capabilities ────────────────────────────────────────────── */}
      <section id="capabilities" className={SECTION}>
        <SectionHeader
          id="02"
          eyebrow="capabilities"
          title="What I build"
          lede="Four areas where I have shipped something real, not read a tutorial."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {profile.capabilities.map((capability) => {
            const accent = accentMap[capability.accent];

            return (
              <RevealItem key={capability.index}>
                <article className="group panel panel-hover brackets clip-notch relative h-full overflow-hidden p-7">
                  <div
                    className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${accent.from} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                  />

                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[0.62rem] tracking-[0.3em] text-slate-600">
                      {capability.index}
                    </span>
                    <span
                      className={`h-2 w-2 rotate-45 ${accent.bg} opacity-50 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                  </div>

                  <h3 className="mt-5 font-display text-xl font-black uppercase tracking-wide text-white">
                    {capability.title}
                  </h3>

                  <p className="mt-3.5 text-[0.84rem] leading-relaxed text-slate-400">
                    {capability.body}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {capability.tags.map((tag) => (
                      <span key={tag} className="chip clip-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* ── Selected work ───────────────────────────────────────────── */}
      <section id="work" className={SECTION}>
        <SectionHeader
          id="03"
          eyebrow="selected work"
          title="Systems, not screenshots"
          lede="Flagship AI systems first — then the platforms around them. Open a dossier for the problem, the approach, and the decisions I would defend in review. Team work is labelled as such."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <RevealItem key={project.id}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="btn-neon clip-tag group flex items-center gap-3 px-8 py-4"
            >
              Read the full dossiers
              <HiArrowNarrowRight className="text-base transition-transform duration-500 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Principles ──────────────────────────────────────────────── */}
      <section id="principles" className={SECTION}>
        <SectionHeader
          id="04"
          eyebrow="engineering principles"
          title="How I make decisions"
          lede="The rules I apply before anyone asks me to."
        />

        <RevealGroup className="mt-14 grid gap-px border border-white/[0.06] sm:grid-cols-2">
          {profile.principles.map((principle, i) => (
            <RevealItem key={principle.title}>
              <div className="h-full bg-void-900/70 p-7 transition-colors duration-500 hover:bg-void-800/80">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.58rem] tracking-[0.24em] text-neon-magenta/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-bold uppercase tracking-wider text-white">
                    {principle.title}
                  </h3>
                </div>
                <p className="mt-3 pl-7 text-[0.84rem] leading-relaxed text-slate-400">
                  {principle.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ── Stack ───────────────────────────────────────────────────── */}
      <section id="stack" className={SECTION}>
        <SectionHeader
          id="05"
          eyebrow="technology"
          title="Working stack"
          lede="Tools I have used in production, grouped by where they sit in the system."
        />

        <RevealGroup className="mt-14 grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(profile.stack).map(([group, items]) => (
            <RevealItem key={group}>
              <div className="group">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-6 bg-neon-cyan/40 transition-all duration-500 group-hover:w-10" />
                  <p className="hud-label">{group}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="chip clip-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <TechMarquee reverse />

      {/* ── Closing call to action ──────────────────────────────────── */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal y={40}>
          <div className="panel brackets clip-hud relative overflow-hidden p-9 text-center sm:p-14">
            <div className="grid-fine pointer-events-none absolute inset-0 opacity-30" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 80% at 50% 0%, rgba(0,229,255,0.09), transparent 70%)",
              }}
            />

            <div className="relative">
              <p className="hud-label">open channel</p>

              <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-black uppercase leading-[1.06] tracking-wide text-white sm:text-4xl lg:text-5xl">
                Need an agent that transacts inside{" "}
                <span className="text-neon-cyan text-glow-cyan">
                  real permissions
                </span>
                ?
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-400">
                Open to backend, AI-platform and full-stack roles — remote or
                on-site in the US, UK, Germany, UAE and Australia. I read
                everything that comes through.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="btn-neon clip-tag group flex items-center gap-3 px-8 py-4"
                >
                  Start a conversation
                  <HiArrowNarrowRight className="text-base transition-transform duration-500 group-hover:translate-x-1.5" />
                </Link>
                <Link
                  href={`mailto:${profile.email}`}
                  className="btn-ghost clip-tag px-8 py-4"
                >
                  {profile.email}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

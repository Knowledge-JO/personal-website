import Link from "next/link";
import { ProjectDossier, Reveal, SectionHeader } from "@/components";
import { accentMap, projects } from "@/data/projects";

export const metadata = {
  title: "Selected Work",
  description:
    "AI infrastructure and production systems by Knowledge Okhakumhe — a WhatsApp-native agentic commerce platform, a dual-boundary MCP server, a voice-first companion API, and supporting backends.",
};

export default function Projects() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 lg:pt-40">
      <SectionHeader
        id="//"
        eyebrow="project manifest"
        title="Selected work"
        lede="Nine systems, AI infrastructure first. Team work is labelled. Metrics are counted from source — endpoints, tools, tables — not lines of code."
      />

      {/* Manifest index */}
      <Reveal delay={0.2}>
        <nav
          aria-label="Project index"
          className="mt-14 grid gap-px border border-white/[0.06] sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => {
            const accent = accentMap[project.accent];

            return (
              <Link
                key={project.id}
                href={`#${project.id}`}
                className="group flex items-center gap-4 bg-void-900/70 px-5 py-4 transition-colors duration-400 hover:bg-void-800/80"
              >
                <span className="font-mono text-[0.6rem] tracking-[0.24em] text-slate-600">
                  {project.index}
                </span>
                <span
                  className={`h-1.5 w-1.5 shrink-0 rotate-45 ${accent.bg} opacity-50 transition-opacity duration-400 group-hover:opacity-100`}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-[0.8rem] font-bold uppercase tracking-wider text-slate-200 transition-colors group-hover:text-white">
                    {project.name}
                  </span>
                  <span className="mt-1 block truncate font-mono text-[0.58rem] uppercase tracking-[0.14em] text-slate-600">
                    {project.domain}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </Reveal>

      <div className="mt-16 grid gap-7">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={0.04} y={36}>
            <ProjectDossier project={project} defaultOpen={i === 0} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-20 flex flex-col items-center gap-6 text-center">
          <div className="rule-neon w-full max-w-sm" />
          <p className="max-w-xl text-sm leading-relaxed text-slate-400">
            Several of these systems are private client or commercial
            repositories, so source access is available on request during a
            technical conversation.
          </p>
          <Link href="/contact" className="btn-neon clip-tag px-8 py-4">
            Request a walkthrough
          </Link>
        </div>
      </Reveal>
    </main>
  );
}

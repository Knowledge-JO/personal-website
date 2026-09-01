"use client";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiSolidPaperPlane } from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";
import { profile } from "@/data/profile";
import { InputField } from "./Input";
import { Socials } from "./Socials";
import { Reveal } from "./Reveal";
import { ScrambleText } from "./ScrambleText";

export const Contact = () => {
  const [sending, setSending] = useState(false);

  /**
   * There is no backend behind this site, so rather than swallow the message
   * the form hands off to the visitor's mail client with everything prefilled.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.trim();
    const email = data.get("email")?.trim();
    const message = data.get("message")?.trim();

    if (!name || !email || !message) {
      toast.error("All fields are required.");
      return;
    }

    setSending(true);

    const subject = encodeURIComponent(`Portfolio enquiry — ${name}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      toast.success("Opening your mail client…");
    }, 700);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:pt-40">
      {/* Left column */}
      <div>
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-neon-cyan/50" />
            <span className="hud-label">open channel</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-wide text-white sm:text-5xl lg:text-6xl">
            <ScrambleText text="Get in" tickMs={26} charsPerTick={1} />
            <br />
            <span className="text-neon-cyan text-glow-cyan">
              <ScrambleText text="touch" tickMs={26} charsPerTick={1} delay={220} />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-400">
            Whether you have a role in mind — AI platform, backend, or
            full-stack — or an agent integration you want built with real
            permission boundaries, I&apos;d like to hear about it. Remote or
            on-site in the US, UK, Germany, UAE and Australia.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 grid gap-px border border-white/[0.06]">
            <div className="bg-void-900/70 p-5">
              <p className="hud-label">Direct</p>
              <Link
                href={`mailto:${profile.email}`}
                className="mt-2 block break-all font-mono text-sm tracking-wide text-slate-200 transition-colors hover:text-neon-cyan"
              >
                {profile.email}
              </Link>
            </div>
            <div className="bg-void-900/70 p-5">
              <p className="hud-label">Location</p>
              <p className="mt-2 font-mono text-sm tracking-wide text-slate-200">
                {profile.location}
              </p>
            </div>
            <div className="bg-void-900/70 p-5">
              <p className="hud-label">Status</p>
              <p className="mt-2 flex items-center gap-2.5 font-mono text-sm tracking-wide text-slate-200">
                <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-neon-lime" />
                Open to remote · US · UK · DE · AE · AU
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-10">
            <p className="hud-label mb-4">Elsewhere</p>
            <Socials size="lg" />
          </div>
        </Reveal>
      </div>

      {/* Form */}
      <Reveal delay={0.2} y={40}>
        <form
          onSubmit={handleSubmit}
          className="panel brackets clip-hud relative p-7 sm:p-10"
        >
          <div className="grid-fine pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="hud-label">transmit_message.sh</p>
              <div className="flex gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-magenta/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-neon-amber/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-neon-lime/60" />
              </div>
            </div>

            <div className="rule-neon my-6" />

            <div className="grid gap-6">
              <InputField name="name" label="Identifier" placeholder="Your name" />
              <InputField
                type="email"
                name="email"
                label="Return address"
                placeholder="you@company.com"
              />
              <InputField
                textarea
                name="message"
                label="Payload"
                placeholder="What are you building?"
                rows={6}
              />

              <button
                type="submit"
                disabled={sending}
                className="btn-neon clip-tag mt-2 flex items-center justify-center gap-3 px-8 py-4 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{sending ? "Transmitting…" : "Send message"}</span>
                {sending ? (
                  <ImSpinner9 className="animate-spin text-base" />
                ) : (
                  <BiSolidPaperPlane className="text-base" />
                )}
              </button>
            </div>
          </div>
        </form>
      </Reveal>

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#0c1020",
            color: "#dbe4f0",
            border: "1px solid rgba(0,229,255,0.25)",
            borderRadius: 0,
            fontSize: "0.8rem",
            fontFamily: "var(--font-mono), monospace",
            letterSpacing: "0.04em",
          },
        }}
      />
    </div>
  );
};

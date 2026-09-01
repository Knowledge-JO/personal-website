"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const links = [
  { id: "01", label: "Index", href: "/" },
  { id: "02", label: "Profile", href: "/#profile" },
  { id: "03", label: "Work", href: "/projects" },
  { id: "04", label: "Stack", href: "/#stack" },
  { id: "05", label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-neon-cyan/[0.14] bg-void-950/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            aria-label="Home"
            className="group flex items-center gap-3"
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="absolute inset-0 border border-neon-cyan/50 transition-transform duration-700 group-hover:rotate-45" />
              <span className="absolute inset-[5px] bg-neon-cyan/70 transition-all duration-500 group-hover:bg-neon-magenta/80" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[0.7rem] font-bold tracking-hud text-white">
                K.OKHAKUMHE
              </span>
              <span className="mt-1 font-mono text-[0.55rem] tracking-[0.24em] text-neon-cyan/60">
                ENGINEER
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((link) => {
              const active =
                link.href === pathname ||
                (link.href === "/projects" && pathname === "/projects");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative font-mono text-[0.68rem] uppercase tracking-[0.22em] transition-colors"
                >
                  <span className="mr-1.5 text-neon-cyan/40 transition-colors group-hover:text-neon-cyan">
                    {link.id}
                  </span>
                  <span
                    className={
                      active
                        ? "text-white"
                        : "text-slate-400 transition-colors group-hover:text-white"
                    }
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[1px] bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all duration-500 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-50 flex h-10 w-10 items-center justify-center border border-neon-cyan/25 text-neon-cyan transition-colors hover:border-neon-cyan/70 md:hidden"
          >
            {open ? <HiX className="text-lg" /> : <HiMenuAlt4 className="text-lg" />}
          </button>
        </nav>

        <div className="rule-neon opacity-50" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void-950/97 px-8 backdrop-blur-2xl md:hidden"
          >
            <div className="grid-fine absolute inset-0 opacity-40" />

            <div className="relative grid gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.07,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-baseline gap-4 border-b border-white/5 py-4"
                  >
                    <span className="font-mono text-[0.62rem] tracking-[0.28em] text-neon-cyan/50">
                      {link.id}
                    </span>
                    <span className="font-display text-2xl font-bold uppercase tracking-widest text-slate-200 transition-colors group-hover:text-neon-cyan">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

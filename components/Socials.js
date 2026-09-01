"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { profile } from "@/data/profile";

const items = [
  { label: "GitHub", href: profile.socials.github, Icon: AiFillGithub },
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: AiFillLinkedin },
  { label: "X", href: profile.socials.x, Icon: FaXTwitter },
  { label: "Email", href: `mailto:${profile.email}`, Icon: MdAlternateEmail },
];

export const Socials = ({ className = "", size = "md" }) => {
  const box = size === "lg" ? "h-12 w-12 text-lg" : "h-10 w-10 text-base";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map(({ label, href, Icon }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
        >
          <Link
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={label}
            className={`group clip-tag relative flex items-center justify-center border border-neon-cyan/20 bg-neon-cyan/[0.03] text-slate-400 transition-all duration-400 hover:border-neon-cyan/70 hover:bg-neon-cyan/10 hover:text-white ${box}`}
          >
            <Icon className="transition-transform duration-400 group-hover:scale-110" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

/** Vertical rail pinned to the left edge on wide screens. */
export const SocialRail = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-5 xl:flex"
  >
    {items.slice(0, 3).map(({ label, href, Icon }) => (
      <Link
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:text-neon-cyan"
      >
        <Icon className="text-lg" />
      </Link>
    ))}
    <span className="h-24 w-[1px] bg-gradient-to-b from-neon-cyan/50 to-transparent" />
  </motion.div>
);

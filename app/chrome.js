"use client";
import { useScroll, useSpring } from "framer-motion";
import {
  Backdrop,
  CrtOverlay,
  CursorGlow,
  Footer,
  Navbar,
  ScrollRail,
  SocialRail,
} from "@/components";

export function Chrome({ children }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:border focus:border-neon-cyan focus:bg-void-950 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-neon-cyan"
      >
        Skip to content
      </a>

      <Backdrop />
      <CursorGlow />
      <CrtOverlay />
      <ScrollRail progress={progress} />

      <Navbar />
      <SocialRail />

      <div id="main">{children}</div>

      <Footer />
    </>
  );
}

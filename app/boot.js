"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components";

const SESSION_KEY = "kjo:booted";

/**
 * Overlays the boot sequence on first load. The page renders underneath rather
 * than behind a gate, so the markup is still in the initial HTML for crawlers,
 * and the sequence is skipped for the rest of the session.
 */
export function BootSequence() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Opened in a background tab, the boot animation is driven by
    // requestAnimationFrame that never runs, so skip straight to the page.
    if (
      sessionStorage.getItem(SESSION_KEY) ||
      document.visibilityState !== "visible"
    ) {
      setLoading(false);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  useEffect(() => {
    if (!loading) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && <Preloader onSetIsLoading={setLoading} />}
    </AnimatePresence>
  );
}

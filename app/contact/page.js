"use client";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInAnimation } from "@/utils/framerAnimOptions";
import { Contact, Navbar } from "@/components";

export default function Page() {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          className="container mx-auto flex min-h-screen items-center justify-center text-white"
          {...fadeInAnimation}
        >
          <motion.div className="page-content" {...fadeInAnimation}>
            <Navbar />
            <Contact />
          </motion.div>
        </motion.main>
      </AnimatePresence>
    </>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Blur, Navbar, Preloader, Socials } from "@/components";
import { fadeInAnimation } from "@/utils/framerAnimOptions";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const paragraphElement = useRef();

  useEffect(() => {
    console.log(paragraphElement);
    const current = paragraphElement.current;
    const textLoad = () => {
      if (!current) return;
      console.log(current);
      setInterval(() => {
        current.textContent = "A full-stack developer";
      }, 4000);
    };
    // setInterval(textLoad, 12000);
    textLoad();
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader onSetIsLoading={setIsLoading} />
        ) : (
          <motion.main
            className="container relative mx-auto flex min-h-screen w-full items-center justify-center uppercase text-white"
            {...fadeInAnimation}
          >
            <motion.div className="page-content" {...fadeInAnimation}>
              <Navbar />

              <Blur />

              <motion.div className="z-20 grid gap-4">
                <motion.p
                  {...fadeInAnimation}
                  transition={{ delay: 1, duration: 1 }}
                  className="pl-16 text-sm font-normal tracking-widest text-neutral-400 sm:pl-36"
                >
                  I am
                </motion.p>
                <motion.h1
                  className="text-4xl font-black tracking-wide lg:text-7xl sm:text-5xl"
                  {...fadeInAnimation}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  Knowledge
                </motion.h1>
                <motion.div className=" flex justify-end">
                  <motion.p
                    className="text-base w-fit tracking-widest text-neutral-400 sm:text-lg  overflow-hidden relative after:absolute after:left-0 after:bottom-0 after:h-[100%] after:w-[100%] after:bg-black after:border-l-2 after:border-grey-500 after:animate-typing_anim "
                    {...fadeInAnimation}
                    ref={paragraphElement}
                  ></motion.p>
                </motion.div>
              </motion.div>

              <motion.div
                {...fadeInAnimation}
                transition={{ delay: 3, duration: 3 }}
              >
                <Image
                  src="/arrow-up.svg"
                  alt=""
                  width={125}
                  height={125}
                  className="absolute right-4 top-28 animate-pulse opacity-90 md:right-28"
                />
              </motion.div>

              <Socials />
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

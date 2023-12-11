import { motion } from "framer-motion";
import { languages } from "../utils/languages";
import { fadeInAnimation } from "../utils/framerAnimOptions";
import { useEffect, useState } from "react";

export const Preloader = ({ onSetIsLoading }) => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  useEffect(() => {
    const preloaderInterval = setInterval(() => {
      setCurrentLanguageIndex((prevIndex) => {
        if (prevIndex === languages.length - 1) {
          return prevIndex;
        } else {
          return prevIndex + 1;
        }
      });
    }, 200);

    setTimeout(() => {
      clearInterval(preloaderInterval);
      onSetIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(preloaderInterval);
    };
  }, [onSetIsLoading]);

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center uppercase text-white"
      {...fadeInAnimation}
    >
      <motion.div className="preloader-text" {...fadeInAnimation}>
        <p className="text-3xl font-bold">{languages[currentLanguageIndex]}</p>
      </motion.div>
    </motion.div>
  );
};

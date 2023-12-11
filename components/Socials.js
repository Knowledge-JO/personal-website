import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../utils/framerAnimOptions";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

export const Socials = ({ positioned = true }) => {
  return (
    <motion.div
      className={`${
        positioned ? "fixed bottom-6 left-0" : ""
      }  w-full flex justify-center`}
      {...fadeInAnimation}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <motion.div className="flex gap-8 text-xl text-neutral-400 w-fit">
        <Link href="https://github.com/Knowledge-JO" target="blank">
          <AiFillGithub className="transition-all duration-300 hover:scale-125" />
        </Link>

        <Link
          href="https://www.linkedin.com/in/knowledge-okhakumhe-250b05209/"
          target="blank"
        >
          <AiFillLinkedin className="transition-all duration-300 hover:scale-125" />
        </Link>

        <Link href="https://x.com/Knowledge_JO" target="blank">
          <FaXTwitter className="transition-all duration-300 hover:scale-125" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

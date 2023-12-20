"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Navbar } from "@/components";
import { fadeInAnimation } from "@/utils/framerAnimOptions";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import {
  BiLinkExternal,
  BiLogoCss3,
  BiLogoGithub,
  BiLogoHtml5,
  BiLogoJavascript,
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript,
  BiLogoPostgresql,
} from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";
import {
  SiFramer,
  SiNextdotjs,
  SiSolidity,
  SiDjango,
  SiAmazonaws,
  SiSqlite,
} from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { DiDjango } from "react-icons/di";

export default function Projects() {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.main
          className="mx-auto flex min-h-screen items-center justify-center text-white"
          {...fadeInAnimation}
        >
          <motion.div className="page-content" {...fadeInAnimation}>
            <Navbar />

            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              modules={[EffectCoverflow, Pagination]}
              spaceBetween={35}
              className="mySwiper"
            >
              {projectsData.map((project, index) => (
                <SwiperSlide key={index}>
                  <ProjectCard project={project} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.main>
      </AnimatePresence>
    </>
  );
}

function ProjectCard({ project, index }) {
  const { name, link, githubLink, description, logos, imageSrc } = project;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      <div className="cursor-alias">
        {isLoading && (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
            <ImSpinner9 className="animate-spin text-4xl" />
          </div>
        )}
        <Image
          alt={`${name} screenshot`}
          width={575}
          height={575}
          src={imageSrc}
          priority={index === 0}
          onLoad={() => setIsLoading(false)}
          className="rounded-xl bg-black/30 grayscale-[0.7] filter transition-all hover:grayscale-0"
        />
      </div>

      <div className="absolute bottom-0 left-0 flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-black/60 py-4 text-center">
        <p className="text-sm font-medium sm:text-lg">{description}</p>

        <div className="flex items-center gap-4 text-2xl">
          {link && (
            <Link href={link} target="blank" rel="noopener noreferrer">
              <BiLinkExternal />
            </Link>
          )}
          {githubLink && (
            <Link href={githubLink} target="blank" rel="noopener noreferrer">
              <BiLogoGithub />
            </Link>
          )}
          {logos}
        </div>
      </div>
    </div>
  );
}

const projectsData = [
  {
    name: "Rebirthclaimsite",
    link: "rebirthclaimsite.com",
    description:
      "A claim site built with django to aid acceptance of students into rebirth classes",
    logos: [
      <FaPython key="python" />,
      <SiDjango key="django" />,
      <BiLogoHtml5 key="html" />,
      <BiLogoCss3 key="css" />,
      <BiLogoPostgresql key="postgres" />,
      <SiAmazonaws key="aws" />,
    ],
    imageSrc: "/rebirthclaimsite.png",
  },
  {
    name: "Django CRM",
    link: "",
    githubLink: "",
    description: "A customer relationship manager built with django",
    logos: [
      <FaPython key="python" />,
      <SiDjango key="django" />,
      <BiLogoHtml5 key="html" />,
      <BiLogoCss3 key="css" />,
      <BiLogoPostgresql key="postgres" />,
      <SiAmazonaws key="aws" />,
    ],
    imageSrc: "/crm.png",
  },
  {
    name: "online Market place",
    link: "https://github.com/Knowledge-JO/django-online-marketplace",
    githubLink: "https://github.com/Knowledge-JO/django-online-marketplace",
    description:
      "An online market place for purchasing clothes, gadget, home appliances, etc built with django",
    logos: [
      <FaPython key="python" />,
      <SiDjango key={"django"} />,
      <BiLogoHtml5 key="html" />,
      <BiLogoCss3 key="css" />,
      <SiSqlite key="sqlite" />,
    ],
    imageSrc: "/marketplace.png",
  },
  {
    name: "SentFi",
    link: "https://senti-fi-loan.vercel.app/",
    githubLink: "https://github.com/Knowledge-JO/sentiFiLoan",
    description:
      "A decentralized world of commerce where you can Buy, sell, get loans, insure your NFTs, earn and source anything safely without the risk of getting scammed. Truly secure transactions.",
    logos: [
      <FaPython key="python" />,
      <SiDjango key={"django"} />,
      <BiLogoJavascript key="js" />,
      <BiLogoHtml5 key="html" />,
      <BiLogoCss3 key="css" />,
      <SiSolidity className="" key="solidity" />,
    ],
    imageSrc: "/sentfi.jpg",
  },
  {
    name: "Blockpay",
    link: "https://blockpayo.vercel.app/",
    githubLink: "https://github.com/BlockpayO/",
    description: "A decentralized payment and personal subscription manager",
    logos: [
      <SiNextdotjs className="text-xl" key="next.js" />,
      <BiLogoJavascript key="javascript" />,
      <BiLogoTailwindCss key="tailwind" />,
      <SiFramer className="text-lg" key="framer" />,
      <SiSolidity className="" key="solidity" />,
    ],
    imageSrc: "/blockpay.png",
  },

  {
    name: "Shortly",
    link: "https://shortly-flax.vercel.app/",
    description:
      "URL shortner website with real time insights into how your links are performing",
    logos: [
      <BiLogoReact key="react" />,
      <BiLogoJavascript key="js" />,
      <BiLogoTailwindCss key="tailwind" />,
    ],
    imageSrc: "/shortly.png",
  },
  {
    name: "Starbasev3",
    link: "https://starbasev3.vercel.app/",
    description:
      "Starbasev3 is a deployer for ERC20 tokens. The deployer works with Ethereum, Binance, and Arbitrium blockchain.",
    logos: [
      <BiLogoReact key="react" />,
      <BiLogoJavascript key="js" />,
      <BiLogoTailwindCss key="tailwind" />,
    ],
    imageSrc: "/starbase.png",
  },
];

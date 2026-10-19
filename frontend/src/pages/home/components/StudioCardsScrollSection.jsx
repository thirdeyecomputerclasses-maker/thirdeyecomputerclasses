import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import awardSuumitSharma from "../../../assets/award_suumit_sharma.webp";
import awardPreetiSharma from "../../../assets/award_preeti_sharma.webp";
import awardCeremonyGroup from "../../../assets/award_ceremony_group.webp";

// Minimalist 3D Isometric Cube Vector Icon (100% transparent, perfectly visible on all card themes)
function IsometricCubeIcon({ className = "w-[26px] h-[26px]", isDark = false }) {
  const strokeColor = isDark ? "#09090b" : "#ffffff";
  const facetOpacity = isDark ? "0.14" : "0.18";

  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 select-none`}
    >
      {/* Outer Hexagon Isometric Contour */}
      <polygon
        points="14,2 25,8.5 25,20.5 14,27 3,20.5 3,8.5"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top 3D Facet */}
      <polygon
        points="14,2 25,8.5 14,14.5 3,8.5"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={strokeColor}
        fillOpacity={facetOpacity}
      />
      {/* Central Y Junction Line */}
      <line
        x1="14"
        y1="14.5"
        x2="14"
        y2="27"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Geometric Inset Diamond */}
      <polygon
        points="14,7 19.5,10.2 14,13.4 8.5,10.2"
        stroke={strokeColor}
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

// 3 Core Pillars Specifically Tailored for Third Eye Computer Classes & Coaching Institute
const cardsData = [
  {
    id: "left",
    stat: "300+",
    unit: "Courses",
    heading: "Complete Digital Coaching",
    desc: "Master Programming, Web Development, Digital Marketing, Video Editing, Graphic Design, and 3D Animation with job-oriented practical courses.",
    img: awardSuumitSharma,
    objectPosition: "50% 20%",
  },
  {
    id: "center",
    stat: "100%",
    unit: "Practical Labs",
    heading: "1 Student = 1 PC Training",
    desc: "Dedicated computer system for every student, daily hands-on lab coaching, flexible morning & evening batch timings, and personal 1-on-1 teacher guidance.",
    img: awardPreetiSharma,
    objectPosition: "50% 20%",
  },
  {
    id: "right",
    stat: "100%",
    unit: "Job Assistance",
    heading: "Certified & Placement Support",
    desc: "ISO recognized certifications, real-world project portfolios, interview coaching, and active placement tie-ups with 300+ hiring companies across India.",
    img: awardCeremonyGroup,
    objectPosition: "48% 20%",
  },
];

// Exact authentic background gradients for the 3 flipped cards
const cardGradients = [
  "linear-gradient(145deg, #cfcfcf 0%, #696969 100%)",
  "linear-gradient(145deg, #953fff 0%, #592699 100%)",
  "linear-gradient(145deg, #161616 0%, #2f2f2f 100%)",
];

// Interactive 3D Card Component with Hardware-Accelerated Flip
function StudioCard({ card, index, scrollYProgress }) {
  const isLeft = index === 0;
  const isRight = index === 2;

  // Gap separation translation: Left moves -20px, Right moves +20px
  const x = useTransform(
    scrollYProgress,
    [0, 0.45],
    isLeft ? ["0px", "-20px"] : isRight ? ["0px", "20px"] : ["0px", "0px"]
  );

  // Dynamic corner rounding: When 0 gap, inner corners are sharp (0px) to form 1 unified image;
  // as gap expands, inner corners smoothly round to 18px!
  const borderTopLeftRadius = useTransform(
    scrollYProgress,
    [0, 0.45],
    isLeft ? ["18px", "18px"] : ["0px", "18px"]
  );
  const borderTopRightRadius = useTransform(
    scrollYProgress,
    [0, 0.45],
    isRight ? ["18px", "18px"] : ["0px", "18px"]
  );
  const borderBottomLeftRadius = useTransform(
    scrollYProgress,
    [0, 0.45],
    isLeft ? ["18px", "18px"] : ["0px", "18px"]
  );
  const borderBottomRightRadius = useTransform(
    scrollYProgress,
    [0, 0.45],
    isRight ? ["18px", "18px"] : ["0px", "18px"]
  );

  // 3D Flip Rotation:
  // Left: 0 to -186deg
  // Center: 0 to 180deg
  // Right: 0 to 186deg
  const rotateY = useTransform(
    scrollYProgress,
    [0.45, 1],
    isLeft ? [0, -186] : isRight ? [0, 186] : [0, 180]
  );

  return (
    <div className="flex-1 relative" style={{ perspective: "1800px" }}>
      <motion.div
        className="absolute inset-0"
        style={{
          x,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* FRONT: IMAGE SLICE */}
        <motion.div
          className="sc-card-front absolute inset-0 overflow-hidden bg-[#111] z-20"
          style={{
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            transform: "rotateY(0deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <img
            src={card.img}
            alt={card.heading || `slice-${card.id}`}
            className="w-full h-full object-cover block select-none pointer-events-none"
            style={{
              objectPosition: card.objectPosition || "center",
              transformOrigin: isLeft
                ? "left center"
                : isRight
                ? "right center"
                : "center center",
            }}
          />
        </motion.div>

        {/* BACK: STAT BOX */}
        <motion.div
          className="sc-card-back absolute inset-0 overflow-hidden z-10"
          style={{
            background: cardGradients[index],
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-between p-[clamp(16px,2vw,28px)]">
            <IsometricCubeIcon isDark={index === 0} className="w-[28px] h-[28px]" />

            <div className="flex flex-col gap-1 my-auto py-2">
              <span
                className={`text-[clamp(36px,4.5vw,66px)] font-bold leading-none tracking-tight ${
                  index === 0 ? "text-black" : "text-white"
                }`}
              >
                {card.stat}
              </span>
              <span
                className={`font-clash text-[clamp(14px,1.5vw,22px)] font-bold tracking-wide leading-tight ${
                  index === 0 ? "text-black/85" : "text-white/90"
                }`}
              >
                {card.unit}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 max-w-full">
              <h3
                className={`font-clash text-[clamp(15px,1.35vw,20px)] font-semibold leading-snug tracking-wide ${
                  index === 0
                    ? "text-black"
                    : index === 1
                    ? "text-white"
                    : "text-white/90"
                }`}
              >
                {card.heading}
              </h3>
              <p
                className={`font-clash text-[clamp(11px,0.95vw,13.5px)] leading-relaxed ${
                  index === 0
                    ? "text-black/80"
                    : index === 1
                    ? "text-white/[0.85]"
                    : "text-white/[0.6]"
                }`}
              >
                {card.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function StudioCardsScrollSection() {
  const containerRef = useRef(null);

  // Scroll tracker with precise container offset
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative hidden md:block w-full bg-transparent select-none">
      {/* ================================================================= */}
      {/* DESKTOP & TABLET: THE EXACT PINNED STICKY 3D SCROLL SCRUB (250vh) */}
      {/* ================================================================= */}
      <div
        ref={containerRef}
        className="relative w-full bg-transparent"
        style={{ height: "250vh" }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div style={{ perspective: "1800px", perspectiveOrigin: "50% 50%" }}>
            <div className="flex items-stretch relative w-[94vw] lg:w-[min(1080px,88vw)] h-[clamp(240px,32vw,440px)] lg:h-[clamp(280px,33vw,520px)]">
              {cardsData.map((card, index) => (
                <StudioCard
                  key={card.id}
                  card={card}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Compass,
} from "lucide-react";

import humanHandImg from "../../../assets/human_hand.png";
import robotHandImg from "../../../assets/robot_hand.png";

// 4 Sections matching Sheryians pattern: Come -> Connect -> Grow -> Succeed
const timelineSections = [
  {
    id: 0,
    number: "01",
    title: "Come",
    subtitle: "Step Into Third Eye",
    desc: "Take your first step. Discover our advanced studio labs, personalized mentoring, and career tracks.",
    icon: Compass,
    metric: "10,000+ Students",
  },
  {
    id: 1,
    number: "02",
    title: "Connect",
    subtitle: "Human + AI Synthesis",
    desc: "Connect your creative intuition with industry-grade software, AI workflows, and expert guidance.",
    icon: Zap,
    metric: "Maya • React • CAD",
  },
  {
    id: 2,
    number: "03",
    title: "Grow",
    subtitle: "Live Studio Labs",
    desc: "Develop real-world confidence. Build client projects, 3D character rigs, and scalable systems.",
    icon: TrendingUp,
    metric: "100+ Live Builds",
  },
  {
    id: 3,
    number: "04",
    title: "Succeed",
    subtitle: "100% Career Launch",
    desc: "Land top-tier studio and tech roles with industry-leading packages from ₹7.5L to ₹47L.",
    icon: Award,
    metric: "100% Placements",
  },
];

export default function Immersive3DJourneySection() {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 668);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Exact Framer Motion scroll tracker matching bootcamp.sheryians.com
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", isDesktop ? "end end" : "end center"],
  });

  // Left human hand: travels from -55vw (outside left edge of screen) into center (5vw)
  const leftHandX = useTransform(scrollYProgress, [0, 0.9, 1], ["-55vw", "5vw", "5vw"]);

  // Right robot hand: travels from 55vw (outside right edge of screen) into center (-5vw)
  const rightHandX = useTransform(scrollYProgress, [0, 0.9, 1], ["55vw", "-5vw", "-5vw"]);

  // Fingertip connection light flare scale & opacity
  const lightScale = useTransform(scrollYProgress, [0, 0.82, 1], [0.1, 0.1, 1.25]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.82, 1], [0, 0, 0.98]);

  // Timeline golden laser progress beam: grows across the four sections (Come -> Connect -> Grow -> Succeed)
  const timelineWidth = useTransform(
    scrollYProgress,
    [0, 0.55, 0.9, 1],
    ["0%", "0%", "75%", "75%"]
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full md:min-h-[100vh] lg:min-h-[110vh] bg-transparent overflow-hidden flex flex-col items-center justify-start md:justify-between py-6 sm:py-10 md:py-16 z-10 select-none"
    >

      {/* 2. Heading Section */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center z-20 mb-2 sm:mb-4 md:mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-white/[0.04] text-[#f6d96b] border border-white/[0.12] mb-3 sm:mb-4">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f6d96b] animate-pulse" />
          <span className="font-mono tracking-widest uppercase text-[10px] sm:text-[11px]">
            The Third Eye Roadmap
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.15]">
          <span className="text-[#f6d96b]">One Journey.</span> Every Skill That Matters.
        </h2>
      </div>

      {/* 3. The Hands Arena: Both hands travel smoothly from outside the screen to the center */}
      <div className="relative w-full h-[180px] sm:h-[240px] md:h-[45vh] lg:h-[50vh] my-2 sm:my-4 md:mt-16 md:mb-0 md:flex-grow flex items-center justify-center pointer-events-none overflow-visible">
        {/* Left Human Hand: Coming from offscreen left (-55vw) */}
        <motion.div
          className="absolute right-1/2 top-1/2 w-[72vw] sm:w-[65vw] md:w-[60vw] z-10 aspect-[16/9] will-change-transform pointer-events-none"
          style={{ x: leftHandX, y: "-50%" }}
        >
          <img
            src={humanHandImg}
            alt="Human Hand"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] select-none"
            draggable={false}
          />
        </motion.div>

        {/* Right Robot Hand: Coming from offscreen right (55vw) */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[72vw] sm:w-[65vw] md:w-[60vw] z-10 aspect-[16/9] will-change-transform pointer-events-none"
          style={{ x: rightHandX, y: "-50%" }}
        >
          <img
            src={robotHandImg}
            alt="Robot Hand"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_35px_rgba(246,217,107,0.2)] select-none"
            draggable={false}
          />
        </motion.div>

        {/* Connection Point Solar Light Flare: Erupts when fingertips connect */}
        <motion.div
          className="absolute md:w-[220px] md:h-[220px] w-[110px] h-[110px] left-1/2 top-[18%] sm:top-[18%] md:top-[22%] lg:top-[24%] pointer-events-none z-20 will-change-transform"
          style={{
            x: "-50%",
            y: "-50%",
            scale: lightScale,
            opacity: lightOpacity,
            background: `
              radial-gradient(
                circle,
                rgba(255, 255, 255, 0.98) 0%,
                rgba(255, 255, 255, 0.85) 12%,
                rgba(246, 217, 107, 0.85) 32%,
                rgba(255, 211, 90, 0.5) 55%,
                rgba(217, 119, 6, 0.25) 75%,
                transparent 100%
              )
            `,
            filter: "blur(22px)",
          }}
        />

        {/* Sharp Anamorphic Laser Flare Streaks at fingertip contact */}
        <motion.div
          className="absolute left-1/2 top-[18%] sm:top-[18%] md:top-[22%] lg:top-[24%] pointer-events-none z-25 will-change-transform flex items-center justify-center"
          style={{
            x: "-50%",
            y: "-50%",
            scale: lightScale,
            opacity: lightOpacity,
          }}
        >
          {/* Intense center spark */}
          <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_0_20px_#ffffff,0_0_50px_#f6d96b,0_0_90px_#ffd35a]" />

          {/* Horizontal laser flare streak */}
          <div className="absolute w-60 sm:w-[460px] md:w-[580px] h-[2px] sm:h-[2.5px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_15px_#f6d96b]" />

          {/* Vertical light ray */}
          <div className="absolute h-28 sm:h-56 md:h-72 w-[1.5px] sm:w-[2px] bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_12px_#f6d96b]" />

          {/* Concentric pulsing energy wave */}
          <div className="absolute w-20 h-20 sm:w-32 sm:h-32 rounded-full border-2 border-[#f6d96b] animate-ping opacity-75" />
        </motion.div>
      </div>

      {/* 4. Timeline Below: Four Sections (Come, Connect, Grow, Succeed) */}
      <div className="w-full max-w-[1100px] mx-auto px-3 sm:px-6 md:px-12 z-20 mt-2 sm:mt-4 md:mt-10">
        <div className="relative flex justify-between items-start w-full">
          {/* Base Background Track Rail connecting column 1 center to column 4 center (12.5% to 87.5%) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 md:top-10 h-[2.5px] bg-[#1d170f] -z-10 rounded-full" />

          {/* Active Golden Laser Rail that smoothly grows as user scrolls and hands connect */}
          <motion.div
            className="absolute left-[12.5%] top-8 md:top-10 h-[2.5px] bg-gradient-to-r from-[#ffd35a] via-[#f6d96b] to-[#ffd35a] shadow-[0_0_15px_#f6d96b,0_0_25px_rgba(246,217,107,0.5)] -z-10 rounded-full will-change-[width]"
            style={{ width: timelineWidth }}
          />

          {/* 4 Timeline Nodes: Come -> Connect -> Grow -> Succeed */}
          {timelineSections.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center w-1/4 px-1 md:px-3 group cursor-pointer"
              >
                {/* Square Icon Container */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 bg-gradient-to-b from-[#18130d] to-[#0d0a07] border border-[#261f15] group-hover:border-[#f6d96b]/60 group-hover:shadow-[0_0_20px_rgba(246,217,107,0.3)] shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                  {/* Subtle inner glass shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                  {/* Icon */}
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#f6d96b] stroke-[1.8] transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Section Title */}
                <h3 className="mt-3 sm:mt-4 font-semibold text-xs sm:text-base md:text-xl text-white group-hover:text-[#f6d96b] transition-colors tracking-tight">
                  {item.title}
                </h3>

                {/* Subtitle / Tagline on Desktop & Tablet */}
                <span className="hidden sm:block text-[11px] font-mono text-[#f6d96b]/80 mt-0.5">
                  {item.subtitle}
                </span>

                {/* Description on Desktop (matching Sheryians pattern) */}
                <p className="hidden md:block mt-2 text-[0.82rem] text-zinc-400 leading-relaxed max-w-[200px]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

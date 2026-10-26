import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import aboutTeamPhoto from "../../../assets/about/team.webp";

export default function AboutScrollExpandTeam() {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 24,
    restDelta: 0.001,
  });

  // Desktop transforms
  const textOpacity = useTransform(smoothProgress, [0, 0.38], [1, 0]);
  const textX = useTransform(smoothProgress, [0, 0.38], [0, -60]);
  const textScale = useTransform(smoothProgress, [0, 0.38], [1, 0.94]);

  const imgWidth = useTransform(
    smoothProgress,
    [0, 0.8],
    isDesktop ? ["42vw", "92vw"] : ["90vw", "96vw"]
  );
  const imgHeight = useTransform(
    smoothProgress,
    [0, 0.8],
    isDesktop ? ["38vh", "75vh"] : ["32vh", "60vh"]
  );
  const imgX = useTransform(
    smoothProgress,
    [0, 0.8],
    isDesktop ? ["23vw", "0vw"] : ["0vw", "0vw"]
  );
  const imgScale = useTransform(smoothProgress, [0, 0.8], [1, 1.02]);
  const imgBorderRadius = useTransform(smoothProgress, [0, 0.8], ["20px", "28px"]);

  // Overlay badge opacity when enlarged
  const badgeOpacity = useTransform(smoothProgress, [0.45, 0.75], [0, 1]);
  const textPointerEvents = useTransform(smoothProgress, (v) => (v > 0.4 ? "none" : "auto"));

  return (
    <section
      ref={containerRef}
      id="team-scroll-section"
      className="relative h-[200vh] lg:h-[230vh] bg-[#050505] text-white overflow-clip select-none"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Ambient Blur Glows (Sheryians style) */}
        <div className="absolute h-96 w-96 bg-[#f6d96b]/[0.08] rounded-full blur-3xl -top-10 -right-20 pointer-events-none z-0" />
        <div className="absolute h-96 w-96 bg-[#d97706]/[0.08] rounded-full blur-3xl -bottom-10 -left-20 pointer-events-none z-0" />

        {/* Content Area */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          {/* Desktop Left Text (fades out as you scroll down) */}
          {isDesktop && (
            <motion.div
              style={{
                opacity: textOpacity,
                x: textX,
                scale: textScale,
                pointerEvents: textPointerEvents,
              }}
              className="absolute left-8 xl:left-12 w-[48%] z-10 pr-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1a140b] text-[#f6d96b] border border-[#f6d96b]/25 mb-4">
                <Users className="w-3.5 h-3.5 text-[#f6d96b]" />
                <span className="font-mono uppercase tracking-wider text-[11px]">The Collective</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] text-white mb-6">
                The People Who Make <br />
                <span className="bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">
                  ThirdEye A Team
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed mb-6">
                At ThirdEye, our strength lies in the people who dream, build, and innovate together. From veteran 3D animators and VFX supervisors to creative designers and relentless coders — every member fuels our mission to redefine IT education. We don't just work; we collaborate, experiment, and evolve as one unstoppable team. Together, we turn ideas into impact and curiosity into creation.
              </p>

              <div className="flex items-center gap-4">
                <Link
                  to="/our-team-new"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/[0.06] hover:bg-[#f6d96b]/15 text-zinc-200 hover:text-white border border-white/10 hover:border-[#f6d96b]/35 transition-all duration-200"
                >
                  <span>Meet All Faculty & Mentors</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#f6d96b] transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="text-[11px] font-mono text-zinc-400">
                  ↓ Scroll down to expand
                </div>
              </div>
            </motion.div>
          )}

          {/* Mobile Text (Vertical stack) */}
          {!isDesktop && (
            <motion.div
              style={{
                opacity: textOpacity,
                y: textX,
              }}
              className="absolute top-16 left-4 right-4 text-center z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#1a140b] text-[#f6d96b] border border-[#f6d96b]/25 mb-2">
                <Users className="w-3 h-3 text-[#f6d96b]" />
                <span>The Collective</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mb-2">
                The People Who Make ThirdEye A Team
              </h2>
              <p className="text-xs text-zinc-400 font-normal line-clamp-3 max-w-md mx-auto">
                At ThirdEye, our strength lies in the people who dream, build, and innovate together. Mentors, animators, coders, and designers united.
              </p>
            </motion.div>
          )}

          {/* Expanding Image Box (Starts right, expands to full center on scroll down, shrinks on scroll up) */}
          <motion.div
            style={{
              width: imgWidth,
              height: imgHeight,
              x: imgX,
              scale: imgScale,
              borderRadius: imgBorderRadius,
            }}
            className="relative z-20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-[#f6d96b]/30 bg-[#0a0805] shrink-0"
          >
            <img
              src={aboutTeamPhoto}
              alt="ThirdEye Core Mentors & Team"
              className="w-full h-full object-cover object-[center_28%]"
            />

            {/* Gradient shadow edges */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/20" />

            {/* Overlay Title badge when fully expanded */}
            <motion.div
              style={{ opacity: badgeOpacity }}
              className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10"
            >
              <div>
                <div className="text-xs font-mono font-bold text-[#f6d96b] uppercase tracking-wider mb-0.5">
                  ✦ ThirdEye Core Mentors & Leaders
                </div>
                <div className="text-sm font-semibold text-white">
                  Over a century of collective industry experience across 3D, VFX, AI & Software
                </div>
              </div>

              <Link
                to="/our-team-new"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#f6d96b] hover:bg-[#ffe07a] transition-colors"
              >
                <span>Full Team Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Handshake, Trophy, GraduationCap } from "lucide-react";

import brandLogo1 from "../../../assets/brand logo/brandlogo1.png";
import brandLogo2 from "../../../assets/brand logo/brandlogo2.png";
import brandLogo3 from "../../../assets/brand logo/brandlogo3.png";
import brandLogo4 from "../../../assets/brand logo/brandlogo4.png";
import brandLogo5 from "../../../assets/brand logo/brandlogo5.png";
import brandLogo6 from "../../../assets/brand logo/brandlogo6.png";
import brandLogo7 from "../../../assets/brand logo/brandlogo7.png";
import brandLogo8 from "../../../assets/brand logo/brandlogo8.png";
import brandLogo9 from "../../../assets/brand logo/brandlogo9.png";
import brandLogo10 from "../../../assets/brand logo/brandlogo10.png";
import brandLogo11 from "../../../assets/brand logo/brandlogo11.png";

// Interactive 3D tilt card component
function TiltCard({ children, className = "" }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#14110c] to-[#0c0906] border border-[#2b2216] hover:border-[#f6d96b]/70 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(246,217,107,0.15)] overflow-hidden group ${className}`}
    >
      {/* Top Edge Golden Micro-Glow Accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#f6d96b]/35 to-transparent pointer-events-none" />

      {children}
    </div>
  );
}

// Smooth count-up counter component triggered on viewport entry or trigger prop
function AnimatedCounter({ end, decimals = 0, suffix = "", duration = 1800, trigger = false }) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      let startTime = null;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        // Cubic ease out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(easeOut * end);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    };

    if (trigger) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.15 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [trigger, end, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

// Official brand recruiter and partner logos from assets/brand logo
const companyLogos = [
  { name: "AU Small Finance Bank", src: brandLogo1 },
  { name: "Reliance Industries", src: brandLogo2 },
  { name: "Tanishq", src: brandLogo3 },
  { name: "DMart", src: brandLogo4 },
  { name: "Lenskart", src: brandLogo5 },
  { name: "Zomato", src: brandLogo6 },
  { name: "Genpact", src: brandLogo7 },
  { name: "Fortis Healthcare", src: brandLogo8 },
  { name: "Swiggy", src: brandLogo9 },
  { name: "Cinépolis", src: brandLogo10 },
  { name: "Bajaj Capital", src: brandLogo11 },
];

export default function PlacementStatsMarquee() {
  const [cardsInView, setCardsInView] = useState(false);
  const cardsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsInView(true);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const el = cardsRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section className="relative z-10 pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden w-full">
      {/* 1. Top Section: Centered 4 Animative 3D Metric Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12 sm:mb-16"
        >
          {/* Card 1: 7.5 Lakh Average Package */}
          <div
            style={{ transitionDelay: cardsInView ? "100ms" : "0ms" }}
            className={`transition-all duration-700 ease-out transform ${
              cardsInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-[0.96]"
            }`}
          >
            <TiltCard className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    <AnimatedCounter end={7.5} decimals={1} trigger={cardsInView} />
                    <span className="text-2xl sm:text-3xl font-normal text-[#f6d96b] ml-2">
                      Lakh
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-medium text-zinc-300 mt-2">
                    Average Package
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#f6d96b]/10 border border-[#f6d96b]/25 flex items-center justify-center text-[#f6d96b] group-hover:scale-110 group-hover:bg-[#f6d96b] group-hover:text-black transition-all duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <div className="text-xs text-zinc-400 font-normal">
                Across tech & animation placements
              </div>
            </TiltCard>
          </div>

          {/* Card 2: 47 Lakh Highest Package */}
          <div
            style={{ transitionDelay: cardsInView ? "220ms" : "0ms" }}
            className={`transition-all duration-700 ease-out transform ${
              cardsInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-[0.96]"
            }`}
          >
            <TiltCard className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    <AnimatedCounter end={47} trigger={cardsInView} />
                    <span className="text-2xl sm:text-3xl font-normal text-[#f6d96b] ml-2">
                      Lakh
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-medium text-zinc-300 mt-2">
                    Highest Package
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#f6d96b]/10 border border-[#f6d96b]/25 flex items-center justify-center text-[#f6d96b] group-hover:scale-110 group-hover:bg-[#f6d96b] group-hover:text-black transition-all duration-300">
                  <Handshake className="w-6 h-6" />
                </div>
              </div>
              <div className="text-xs text-zinc-400 font-normal">
                Top global studio offer record
              </div>
            </TiltCard>
          </div>

          {/* Card 3: 300+ Hiring Partners */}
          <div
            style={{ transitionDelay: cardsInView ? "340ms" : "0ms" }}
            className={`transition-all duration-700 ease-out transform ${
              cardsInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-[0.96]"
            }`}
          >
            <TiltCard className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    <AnimatedCounter end={300} suffix="+" trigger={cardsInView} />
                  </div>
                  <div className="text-sm sm:text-base font-medium text-zinc-300 mt-2">
                    Hiring Partners
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#f6d96b]/10 border border-[#f6d96b]/25 flex items-center justify-center text-[#f6d96b] group-hover:scale-110 group-hover:bg-[#f6d96b] group-hover:text-black transition-all duration-300">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>
              <div className="text-xs text-zinc-400 font-normal">
                Active campus placement network
              </div>
            </TiltCard>
          </div>

          {/* Card 4: 10M+ Monthly Tech Reach */}
          <div
            style={{ transitionDelay: cardsInView ? "460ms" : "0ms" }}
            className={`transition-all duration-700 ease-out transform ${
              cardsInView
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-[0.96]"
            }`}
          >
            <TiltCard className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    <AnimatedCounter end={10} suffix=" M+" trigger={cardsInView} />
                  </div>
                  <div className="text-sm sm:text-base font-medium text-zinc-300 mt-2">
                    Monthly Tech Reach
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#f6d96b]/10 border border-[#f6d96b]/25 flex items-center justify-center text-[#f6d96b] group-hover:scale-110 group-hover:bg-[#f6d96b] group-hover:text-black transition-all duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>
              <div className="text-xs text-zinc-400 font-normal">
                10,000+ certified alumni community
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Recruiter Marquee Header */}
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f6d96b] animate-pulse" />
            Top Recruiters & Hiring Partners Network
          </span>
        </div>
      </div>

      {/* 2. Full-Width Infinite Scrolling Marquee */}
      <div className="relative w-full overflow-hidden py-4 bg-transparent">
        {/* Left Edge Subtle Dark Fade Mask (Short & Clean) */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#0c0a04]/90 to-transparent z-20 pointer-events-none" />

        {/* Right Edge Subtle Dark Fade Mask (Short & Clean) */}
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#0c0a04]/90 to-transparent z-20 pointer-events-none" />

        {/* Continuous Full-Width Marquee Track */}
        <div className="flex items-center gap-12 sm:gap-16 md:gap-20 w-max animate-marquee pause-hover py-4 sm:py-5">
          {/* First Set of Brand Logos */}
          {companyLogos.map((item, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex items-center justify-center opacity-75 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer select-none px-2 group shrink-0"
            >
              <img
                src={item.src}
                alt={item.name}
                title={item.name}
                loading="lazy"
                decoding="async"
                className="h-9 sm:h-11 md:h-12 w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[180px] object-contain filter brightness-0 invert transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(246,217,107,0.35)]"
              />
            </div>
          ))}

          {/* Duplicate Set for Seamless Continuous Infinite Loop */}
          {companyLogos.map((item, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex items-center justify-center opacity-75 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer select-none px-2 group shrink-0"
            >
              <img
                src={item.src}
                alt={item.name}
                title={item.name}
                loading="lazy"
                decoding="async"
                className="h-9 sm:h-11 md:h-12 w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[180px] object-contain filter brightness-0 invert transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(246,217,107,0.35)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

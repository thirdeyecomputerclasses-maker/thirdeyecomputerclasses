import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Play,
  CheckCircle2,
} from "lucide-react";
import WebThreads from "./WebThreads";

// Disciplines that rotate smoothly in the headline
const rotatingDisciplines = [
  { text: "2D & 3D Animation", tag: "Creative Studio" },
  { text: "Full Stack Development", tag: "Tech & Software" },
  { text: "3D CAD Matrix Design", tag: "CAD & Jewelry" },
  { text: "UI/UX & Visual Design", tag: "Product & Identity" },
  { text: "VFX & Motion Graphics", tag: "Media & Film" },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [fadeAnim, setFadeAnim] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger entering animation from downwards to upwards whenever page loads/reloads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  // Rotate headline discipline every 2.8 seconds with smooth fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeAnim(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % rotatingDisciplines.length);
        setFadeAnim(true);
      }, 250);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const current = rotatingDisciplines[index];

  return (
    <section
      className="relative z-10 min-h-[90vh] lg:min-h-screen pt-36 sm:pt-44 md:pt-48 lg:pt-52 pb-10 sm:pb-14 overflow-hidden flex flex-col items-center justify-between"
    >
      {/* React Bits WebThreads Background (https://reactbits.dev/backgrounds/web-threads) */}
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        <WebThreads
          color1="#f6d96b" // Third Eye Brand Gold
          color2="#eab308" // Rich Amber Gold
          color3="#ffffff" // Radiant White-Gold Core Flare
          speed={0.2}
          threadCount={6}
          frequency={5.0}
          spread={0.18}
          taper={1.0}
          position={0.5}
          fanMode="center"
          glow={0.02}
          falloff={0.6}
          thickness={1.1}
          brightness={0.55}
          opacity={1.0}
          mirror={true}
          shimmer={false}
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.3}
          backgroundColor="#0c0a04"
        />
        {/* Soft subtle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0c0a04]/40 to-transparent pointer-events-none" />
        {/* Soft subtle top fade below navbar */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0c0a04]/50 via-[#0c0a04]/15 to-transparent pointer-events-none" />
      </div>

      {/* 4. Main Clean Centered Content with Staggered Downwards-to-Upwards Transitions */}
      <div className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center my-auto w-full">
        {/* Layer 1: Live Status Accreditation Pill */}
        <div
          className={`mt-2 sm:mt-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full text-xs font-medium bg-[#0f0c08]/90 text-[#f6d96b] border border-[#f6d96b]/35 shadow-[0_4px_25px_rgba(0,0,0,0.85)] backdrop-blur-md mb-6 sm:mb-8 transition-transform hover:scale-105 duration-300 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f6d96b] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f6d96b]" />
            </span>
            <span className="uppercase tracking-wider font-mono text-[11px] font-bold text-[#f6d96b]">
              Jaipur's Premier 3D Tech, Creative & IT Academy
            </span>
            <span className="hidden sm:inline text-zinc-300 font-medium">
              • ISO 9001:2015 Certified
            </span>
          </div>
        </div>

        {/* Layer 2: Main Headline & Animated Rotating Discipline with Contrast Protector */}
        <div className="relative mb-8 sm:mb-10 font-sans w-full flex flex-col items-center">
          {/* Subtle ambient radial dark shield to guarantee 100% text legibility over WebGL threads */}
          <div className="absolute inset-0 -inset-x-8 sm:-inset-x-20 -my-10 bg-[#0b0904]/75 rounded-full blur-3xl pointer-events-none -z-10" />

          <h1
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px] font-bold text-white tracking-tight leading-[1.1] mb-2 sm:mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] sm:whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Master Practical Skills In
          </h1>

          {/* Rotating Discipline with Smooth Transition */}
          <div
            className={`min-h-[48px] sm:min-h-[68px] md:min-h-[82px] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span
              className={`inline-block text-3xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px] font-bold tracking-tight sm:whitespace-nowrap bg-gradient-to-r from-[#fff3b0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] transition-all duration-300 transform ${
                fadeAnim
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-3 scale-95"
              }`}
            >
              {current.text}
            </span>
          </div>
        </div>

        {/* Action CTAs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 mb-4 sm:mb-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-400 font-sans ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Link
            to="/courses"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-zinc-950 bg-gradient-to-r from-[#ffe894] via-[#f6d96b] to-[#f59e0b] hover:from-[#fff0ad] hover:via-[#fedf7c] hover:to-[#f59e0b] shadow-[0_0_24px_rgba(246,217,107,0.35)] hover:shadow-[0_0_35px_rgba(246,217,107,0.55)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore All Courses</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
          </Link>

          <Link
            to="/contact-us"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-zinc-100 bg-[#0e0c08]/90 border border-[#f6d96b]/30 hover:border-[#f6d96b]/60 hover:text-white hover:bg-[#19150e] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
          >
            <Play className="w-3.5 h-3.5 text-[#f6d96b] fill-[#f6d96b] transition-transform group-hover:scale-110" />
            <span>Book Free Demo Session</span>
          </Link>
        </div>
      </div>

      {/* Trust Badges - Pinned to bottom of the Hero Fold */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto pt-6 pb-2 font-sans flex justify-center">
        <div
          className={`inline-flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-8 px-6 py-2.5 rounded-full bg-[#0c0a06]/80 border border-white/[0.1] shadow-[0_4px_25px_rgba(0,0,0,0.7)] backdrop-blur-md text-xs sm:text-sm text-zinc-200 font-medium transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f6d96b]" />
            <span>15+ Years Legacy</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f6d96b]" />
            <span>10,000+ Placed Students</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f6d96b]" />
            <span>100% Practical Studio Labs</span>
          </div>
        </div>
      </div>
    </section>
  );
}

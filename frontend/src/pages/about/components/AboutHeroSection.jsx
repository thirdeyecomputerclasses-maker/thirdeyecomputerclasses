import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";
import logo from "../../../assets/logo.webp";

const quickStats = [
  { value: "18+", label: "Years of Legacy", sub: "Estd. 2008 in Jaipur" },
  { value: "25,000+", label: "Alumni Sculpted", sub: "Placed Across Global Studios & Tech" },
  { value: "500+", label: "Hiring Partners", sub: "Top Animation, VFX & IT Firms" },
  { value: "98.4%", label: "Practical Mastery", sub: "100% Studio-First Pedagogy" },
];

export default function AboutHeroSection({ onScrollToExplore }) {
  return (
    <section className="relative z-10 pt-36 sm:pt-40 md:pt-44 pb-12 sm:pb-16 overflow-hidden flex flex-col justify-between bg-[#050505] text-white">
      {/* Background Ambient Focal Glows */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] pointer-events-none -z-10 blur-[130px] opacity-35 bg-gradient-to-b from-[#f6d96b]/20 to-[#d97706]/10" />
      <div className="absolute top-10 right-[15%] w-[320px] h-[320px] rounded-full bg-[#f6d96b]/5 blur-[100px] pointer-events-none -z-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Innovation Pill Badge (Sheryians /about style) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold bg-[#120e08]/90 text-[#f6d96b] border border-[#f6d96b]/30 shadow-[0_0_20px_rgba(246,217,107,0.12)] backdrop-blur-md mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f6d96b] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f6d96b]" />
          </span>
          <span className="tracking-widest uppercase font-mono font-bold text-[11px] sm:text-xs">
            ✦ THE THIRDEYE CREATIVE REVOLUTION • ESTD. 2008
          </span>
        </motion.div>

        {/* Small Logo Badge */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-5"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1c160a] to-[#0c0904] border border-[#f6d96b]/30 p-2.5 flex items-center justify-center shadow-[0_0_25px_rgba(246,217,107,0.15)]">
            <img src={logo} alt="ThirdEye Logo" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* Grand Headline (Sheryians /about style) */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.12] max-w-4xl mb-6"
        >
          Where Dreams Transform{" "}
          <span className="block sm:inline bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">
            Into Code & Art
          </span>
        </motion.h1>

        {/* Thoughtful Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10"
        >
          At ThirdEye, we turn curiosity into creation. Where disciplined technical rigor unites with creative imagination. Together, we shape ambitious minds into creators who lead the global digital frontier.
        </motion.p>

        {/* Action Buttons (Sheryians style: Let's Connect -> / Why ThirdEye ->) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Link
            to="/contact-us"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-zinc-950 bg-gradient-to-r from-[#ffe894] via-[#f6d96b] to-[#f59e0b] hover:from-[#fff0ad] hover:via-[#fedf7c] hover:to-[#f59e0b] shadow-[0_0_25px_rgba(246,217,107,0.35)] hover:shadow-[0_0_35px_rgba(246,217,107,0.55)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
          </Link>

          <button
            type="button"
            onClick={onScrollToExplore}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base text-zinc-200 bg-[#120e08]/90 border border-[#f6d96b]/30 hover:border-[#f6d96b]/60 hover:text-white hover:bg-[#1c160d] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Why ThirdEye</span>
            <ArrowDown className="w-4 h-4 text-[#f6d96b] transition-transform group-hover:translate-y-0.5" />
          </button>
        </motion.div>

        {/* Ember Agency Style Minimalist Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          {quickStats.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0f0d08]/80 border border-[#f6d96b]/15 backdrop-blur-sm transition-all duration-300 hover:border-[#f6d96b]/40 hover:-translate-y-1 group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white group-hover:text-[#f6d96b] transition-colors mb-0.5">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-zinc-200">
                {item.label}
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                {item.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, MapPin, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutFinalCTA() {
  return (
    <section className="relative z-10 py-20 sm:py-24 bg-[#050505] text-white border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#f6d96b]/15 via-[#d97706]/10 to-[#f6d96b]/15 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 md:p-16 rounded-[32px] bg-gradient-to-b from-[#13100a] to-[#080603] border border-[#f6d96b]/25 shadow-[0_25px_70px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle top ember glow line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#f6d96b] to-transparent" />

          {/* Ember Agency Inspired Quote */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1e170c] text-[#f6d96b] border border-[#f6d96b]/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#f6d96b]" />
            <span className="font-mono uppercase tracking-wider text-[11px]">Next Generation Creators</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto mb-6">
            Bold ideas become reality through{" "}
            <span className="bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">
              thoughtful execution.
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl mx-auto mb-10">
            Whether your dream is mastering 3D Animation, Hollywood-grade VFX, Full-Stack Software Engineering, or CAD Architecture — your journey begins at Third Eye.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Link
              to="/our-courses"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm sm:text-base text-zinc-950 bg-gradient-to-r from-[#ffe894] via-[#f6d96b] to-[#f59e0b] hover:from-[#fff0ad] hover:via-[#fedf7c] hover:to-[#f59e0b] shadow-[0_0_25px_rgba(246,217,107,0.35)] hover:shadow-[0_0_35px_rgba(246,217,107,0.55)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Explore 300+ Courses</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
            </Link>

            <Link
              to="/contact-us"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm sm:text-base text-zinc-200 bg-[#120e08]/90 border border-[#f6d96b]/30 hover:border-[#f6d96b]/60 hover:text-white hover:bg-[#1c160d] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4 text-[#f6d96b]" />
              <span>Connect With Admissions</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#f6d96b]" />
              <span>4 Campuses in Jaipur</span>
            </div>
            <span>•</span>
            <span>Government Recognized & ISO 9001:2015</span>
            <span>•</span>
            <span>18+ Years Legacy</span>
          </div>
        </div>
      </div>
    </section>
  );
}

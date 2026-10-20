import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play, CheckCircle2, Sparkles } from "lucide-react";

/**
 * ThirdEyeBrandTorchSection (Pre-Footer Finale Section)
 * Modern, high-impact CTA section that bridges the page content into the new footer.
 */
export default function ThirdEyeBrandTorchSection() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent py-20 sm:py-24 border-t border-[#f6d96b]/15 select-none">

      {/* Ambient Central Lens Flare */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#f6d96b]/[0.06] rounded-full blur-[100px] -z-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1f1508] text-[#f6d96b] border border-[#f6d96b]/30 shadow-[0_0_20px_rgba(246,217,107,0.12)] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#f6d96b]" />
          <span>Launch Your Tech & Creative Career</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-5">
          Ready to Build What's{" "}
          <span className="bg-gradient-to-r from-[#ffe894] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">
            Next?
          </span>
        </h2>

        {/* Supporting description */}
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
          Join Jaipur's premier academy for 3D Animation, VFX, Matrix CAD, UI/UX, and Full Stack Development. 100% practical, studio-grade training designed for real careers.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link
            to="/our-courses"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm sm:text-base text-zinc-950 bg-gradient-to-r from-[#ffe894] via-[#f6d96b] to-[#f59e0b] hover:from-[#fff0ad] hover:via-[#fedf7c] hover:to-[#f59e0b] shadow-[0_0_25px_rgba(246,217,107,0.35)] hover:shadow-[0_0_35px_rgba(246,217,107,0.55)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore 300+ Courses</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
          </Link>

          <Link
            to="/contact-us"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-zinc-100 bg-[#0e0c08]/90 border border-[#f6d96b]/30 hover:border-[#f6d96b]/60 hover:text-white hover:bg-[#19150e] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
          >
            <Play className="w-3.5 h-3.5 text-[#f6d96b] fill-[#f6d96b] transition-transform group-hover:scale-110" />
            <span>Book Free Demo Session</span>
          </Link>
        </div>

        {/* Trust Badges Row */}
        <div className="inline-flex flex-wrap items-center justify-center gap-y-2 gap-x-6 sm:gap-x-8 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f6d96b]" />
            <span>15+ Years Legacy</span>
          </div>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f6d96b]" />
            <span>10,000+ Placed Students</span>
          </div>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#f6d96b]" />
            <span>ISO 9001:2015 Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}

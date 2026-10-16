import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Award, ArrowDown, ExternalLink, CheckCircle2 } from "lucide-react";

const trustMetrics = [
  { value: "100%", label: "Authorized Access", sub: "Official Examination Center" },
  { value: "7+", label: "Global Alliances", sub: "Microsoft, Adobe, Google, Autodesk" },
  { value: "ISO 9001", label: "Quality Certified", sub: "International Benchmark Standard" },
  { value: "Instant QR", label: "Online Verification", sub: "24/7 Digital Credential Check" },
];

export default function CertificationHero({ onScrollToGrid }) {
  return (
    <section className="relative z-10 pt-36 sm:pt-40 md:pt-44 pb-12 sm:pb-16 overflow-hidden flex flex-col justify-between bg-[#050505] text-white">
      {/* Background Tech Mesh & Warm Amber Glows */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] pointer-events-none -z-10 blur-[140px] opacity-30 bg-gradient-to-b from-[#f6d96b]/20 to-[#d97706]/10" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Accreditation Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold bg-[#120e08]/90 text-[#f6d96b] border border-[#f6d96b]/30 shadow-[0_0_20px_rgba(246,217,107,0.12)] backdrop-blur-md mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f6d96b] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f6d96b]" />
          </span>
          <span className="tracking-widest uppercase font-mono font-bold text-[11px] sm:text-xs">
            ✦ AUTHORIZED EXAMINATION & TRAINING CENTER • JAIPUR
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.14] max-w-4xl mb-5"
        >
          Authorized Certifications That{" "}
          <span className="block sm:inline bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">
            Power Global Careers
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto mb-9"
        >
          Third Eye holds authorized testing, training, and credentialing access from global technology leaders. Every certificate is globally authenticated, ISO accredited, and employer-verified.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <button
            type="button"
            onClick={onScrollToGrid}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-zinc-950 bg-gradient-to-r from-[#ffe894] via-[#f6d96b] to-[#f59e0b] hover:from-[#fff0ad] hover:via-[#fedf7c] hover:to-[#f59e0b] shadow-[0_0_25px_rgba(246,217,107,0.35)] hover:shadow-[0_0_35px_rgba(246,217,107,0.55)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore 7+ Certifications</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <Link
            to="/certificate-verification"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base text-zinc-200 bg-[#120e08]/90 border border-[#f6d96b]/30 hover:border-[#f6d96b]/60 hover:text-white hover:bg-[#1c160d] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#f6d96b]" />
            <span>Verify Existing Certificate</span>
          </Link>
        </motion.div>

        {/* 4 Trust Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          {trustMetrics.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0f0d08]/85 border border-[#f6d96b]/15 backdrop-blur-sm transition-all duration-300 hover:border-[#f6d96b]/40 hover:-translate-y-1 group"
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

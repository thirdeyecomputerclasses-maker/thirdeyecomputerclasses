import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ShieldCheck,
  RotateCw,
  ZoomIn,
  Award,
  CheckCircle,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FlipCard({ cert, onZoom }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[420px] w-full [perspective:1200px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* 3D Rotating Inner Container */}
      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ================= FRONT OF CARD ================= */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#0d0b07] border-2 border-[#f6d96b]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between [backface-visibility:hidden]">
          {/* Certificate Image Frame */}
          <div className="relative w-full h-[255px] bg-[#141009] overflow-hidden border-b border-[#f6d96b]/20">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Top Partner Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-black/85 text-[#f6d96b] border border-[#f6d96b]/40 backdrop-blur-md shadow-md">
                <ShieldCheck className="w-3 h-3 text-[#f6d96b]" />
                {cert.partner}
              </span>
            </div>

            {/* Quick Zoom Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onZoom(cert);
              }}
              className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-black/80 hover:bg-black text-white hover:text-[#f6d96b] border border-white/20 transition-all shadow-md cursor-pointer"
              title="Inspect Full Certificate"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            {/* Bottom status line */}
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-300">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Authorized Credential
              </span>
              <span className="text-zinc-400">{cert.id}</span>
            </div>
          </div>

          {/* Front Content & Info */}
          <div className="p-4 flex flex-col justify-between flex-grow bg-gradient-to-b from-[#0f0c08] to-[#070503]">
            <div>
              <div className="text-[11px] font-mono text-[#f6d96b] font-semibold uppercase tracking-wider mb-1">
                {cert.category}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-1 group-hover:text-[#f6d96b] transition-colors">
                {cert.title}
              </h3>
              <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-normal leading-relaxed">
                {cert.description}
              </p>
            </div>

            {/* Flip Prompt Trigger */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(!isFlipped);
                }}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#f6d96b] hover:text-[#ffe07a] transition-colors cursor-pointer"
              >
                <RotateCw className="w-3 h-3 transition-transform group-hover:rotate-180 duration-500" />
                <span>Flip For Details</span>
              </button>

              <span className="text-[10px] text-zinc-400 font-mono">
                ISO 9001:2015
              </span>
            </div>
          </div>
        </div>

        {/* ================= BACK OF CARD ================= */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br from-[#16120b] via-[#0f0c08] to-[#080603] border-2 border-[#f6d96b]/60 shadow-[0_15px_40px_rgba(246,217,107,0.15)] p-5 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div>
            {/* Back Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.1] mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#f6d96b]/15 border border-[#f6d96b]/30 flex items-center justify-center text-[#f6d96b]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{cert.partner}</div>
                  <div className="text-[10px] font-mono text-zinc-400">Authorized Program</div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                title="Flip back"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Title & Authority */}
            <h4 className="text-sm font-semibold text-[#f6d96b] mb-1">
              {cert.title}
            </h4>
            <div className="text-[11px] text-zinc-300 mb-3 flex items-center gap-1.5">
              <Building className="w-3 h-3 text-[#f6d96b] shrink-0" />
              <span className="truncate">{cert.issuer}</span>
            </div>

            {/* Competencies Verified */}
            <div className="mb-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Key Competencies Validated:
              </div>
              <div className="space-y-1">
                {cert.skills.split(", ").map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-1.5 text-xs text-zinc-200">
                    <CheckCircle className="w-3 h-3 text-[#f6d96b] shrink-0" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Recognition note */}
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06] text-[11px] text-zinc-300 leading-snug">
              <span className="font-semibold text-white">Global Value: </span>
              {cert.impact || "Accepted across global IT firms, game studios, and corporate hiring networks."}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-white/[0.1] space-y-2">
            <Link
              to="/certificate-verification"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-[#ffe894] via-[#f6d96b] to-[#f59e0b] hover:from-[#fff0ad] hover:via-[#fedf7c] hover:to-[#f59e0b] transition-all shadow-md"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify This Credential</span>
            </Link>

            <Link
              to="/apply-certificate"
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-[11px] font-semibold text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-colors"
            >
              <span>Apply for Examination</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

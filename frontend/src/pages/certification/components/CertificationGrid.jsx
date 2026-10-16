import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers, RotateCw } from "lucide-react";
import FlipCard from "./FlipCard";
import { CERTIFICATES } from "../certificationData";

const categories = [
  "All Credentials",
  "Global Tech",
  "Creative & CAD",
  "Industry & Hiring",
];

export default function CertificationGrid({ onZoom }) {
  const [selectedCategory, setSelectedCategory] = useState("All Credentials");

  const filteredCerts = CERTIFICATES.filter((cert) => {
    if (selectedCategory === "All Credentials") return true;
    return cert.category === selectedCategory;
  });

  return (
    <section id="certifications-vault" className="relative z-10 py-16 sm:py-20 bg-[#050505] text-white border-t border-white/[0.06]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#f6d96b]/[0.03] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1a140b] text-[#f6d96b] border border-[#f6d96b]/25 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#f6d96b]" />
              <span className="font-mono uppercase tracking-wider text-[11px]">3D Interactive Credential Vault</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Authorized Certificates &{" "}
              <span className="bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">
                Accreditations
              </span>
            </h2>
          </div>

          {/* Hint */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#120e08] border border-white/[0.08] text-xs font-mono text-[#f6d96b] shrink-0">
            <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
            <span>Hover or tap card to flip 3D details</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-2">
          {categories.map((cat) => {
            const count =
              cat === "All Credentials"
                ? CERTIFICATES.length
                : CERTIFICATES.filter((c) => c.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#f6d96b] text-black shadow-[0_0_20px_rgba(246,217,107,0.3)] font-bold scale-105"
                    : "bg-[#141009] text-zinc-300 hover:text-white hover:bg-[#1f170c] border border-white/[0.08]"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-black/20 text-black font-black" : "bg-white/10 text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D FlipCard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <FlipCard cert={cert} onZoom={onZoom} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

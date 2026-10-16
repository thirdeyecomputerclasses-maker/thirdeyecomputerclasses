import React from "react";
import { ShieldCheck, Cpu, Briefcase, Award, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
  {
    num: "01",
    title: "IAF Precision & Discipline",
    tag: "The Foundation",
    icon: ShieldCheck,
    desc: "Founded in 2008 by an Indian Air Force veteran instructor. We impart technological mastery with uncompromising discipline, personal accountability, and a student-first ethos inspired by Swami Vivekananda.",
    points: ["Ex-Air Force technical pedagogy", "Zero compromise on foundational concepts", "Dedicated individual lab mentorship"],
  },
  {
    num: "02",
    title: "100% Studio-Grade Production",
    tag: "The Environment",
    icon: Cpu,
    desc: "No boring slide decks or rote textbooks. Students immerse directly in production-spec GPU labs working with Maya, Unreal Engine 5, Blender, Next.js, and Full-Stack cloud architectures from day one.",
    points: ["High-spec workstation infrastructure", "Live industry client briefs & game jams", "Portfolio-driven evaluation standards"],
  },
  {
    num: "03",
    title: "Lifetime Career Launchpad",
    tag: "The Outcome",
    icon: Briefcase,
    desc: "Our relationship doesn't conclude at graduation. With an active network of 500+ studio recruiters and 25,000+ alumni worldwide, we provide ongoing placement assistance and creative portfolio reviews.",
    points: ["500+ studio & tech recruitment drives", "1-on-1 interview & showreel preparation", "Alumni network spanning leading studios"],
  },
];

export default function AboutCorePillars() {
  return (
    <section className="relative z-10 py-20 sm:py-24 bg-[#050505] text-white border-t border-white/[0.06] overflow-hidden">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#f6d96b]/[0.03] blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#120e08] text-[#f6d96b] border border-[#f6d96b]/25 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#f6d96b]" />
            <span className="font-mono uppercase tracking-wider text-[11px]">The Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Crafted for <span className="bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">Excellence</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-normal">
            Three core principles that have anchored Third Eye Computer Classes as Jaipur's premier creative technology academy for over 18 years.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative p-7 sm:p-8 rounded-3xl bg-[#0c0a06] border border-[#f6d96b]/15 hover:border-[#f6d96b]/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(246,217,107,0.1)]"
              >
                <div>
                  {/* Top indicator & number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-[#f6d96b] uppercase px-3 py-1 rounded-full bg-[#1b150a] border border-[#f6d96b]/20">
                      {pillar.tag}
                    </span>
                    <span className="text-3xl font-mono font-bold text-zinc-700 group-hover:text-[#f6d96b]/40 transition-colors">
                      {pillar.num}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-[#1a140a] border border-[#f6d96b]/30 flex items-center justify-center text-[#f6d96b] mb-5 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#f6d96b] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] space-y-2">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#f6d96b] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

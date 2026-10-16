import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, FileCheck, Award, ArrowUpRight, CheckCircle2, PhoneCall, QrCode } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Practical Studio Training",
    desc: "Complete your hands-on lab modules, practical projects, and capstone portfolio under mentor guidance.",
    icon: FileCheck,
  },
  {
    step: "02",
    title: "Authorized Global Exam",
    desc: "Appear for authorized partner testing (Certiport, Microsoft, Google, Autodesk) or Third Eye's institutional board.",
    icon: Award,
  },
  {
    step: "03",
    title: "QR Authenticated Credential",
    desc: "Receive your tamper-proof ISO 9001:2015 stamped certificate with instant 24/7 online QR verification.",
    icon: QrCode,
  },
];

export default function CertificationProcessCTA() {
  return (
    <section className="relative z-10 py-20 bg-[#050505] text-white border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#f6d96b]/15 via-[#d97706]/10 to-[#f6d96b]/15 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step-by-step 3 cards */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1a140b] text-[#f6d96b] border border-[#f6d96b]/25 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f6d96b]" />
            <span className="font-mono uppercase tracking-wider text-[11px]">The Credentialing Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            How You Earn Your <span className="bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">Certification</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-normal">
            A transparent, industry-standard 3-step credentialing process designed to validate real-world technical competency.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-3xl bg-[#0d0a06] border border-[#f6d96b]/15 hover:border-[#f6d96b]/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#1b150a] border border-[#f6d96b]/30 flex items-center justify-center text-[#f6d96b]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-mono font-bold text-zinc-700">
                      {st.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grand CTA Banner */}
        <div className="p-8 sm:p-12 rounded-[30px] bg-gradient-to-b from-[#13100a] to-[#080603] border border-[#f6d96b]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#f6d96b] to-transparent" />

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Ready to Verify or Apply for Your Credential?
          </h3>
          <p className="text-sm sm:text-base text-zinc-300 font-normal max-w-xl mx-auto mb-8">
            Access our student examination portal to request course completion credentials, or instantly verify authenticity for corporate recruiters.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Link
              to="/apply-certificate"
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-zinc-950 bg-gradient-to-r from-[#ffe894] via-[#f6d96b] to-[#f59e0b] hover:from-[#fff0ad] hover:via-[#fedf7c] hover:to-[#f59e0b] shadow-[0_0_25px_rgba(246,217,107,0.35)] hover:shadow-[0_0_35px_rgba(246,217,107,0.55)] transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Apply for Certificate</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/certificate-verification"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base text-zinc-200 bg-[#120e08]/90 border border-[#f6d96b]/30 hover:border-[#f6d96b]/60 hover:text-white hover:bg-[#1c160d] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#f6d96b]" />
              <span>Certificate Verification Portal</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-5 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
            <span>✓ ISO 9001:2015 Accredited</span>
            <span>•</span>
            <span>✓ Government Recognized Institution</span>
            <span>•</span>
            <span>✓ 18+ Years Academic Legacy</span>
          </div>
        </div>
      </div>
    </section>
  );
}

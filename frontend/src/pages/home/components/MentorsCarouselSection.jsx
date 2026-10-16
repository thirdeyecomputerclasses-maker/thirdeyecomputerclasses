import React from "react";
import { Sparkles } from "lucide-react";
import TiltedCard from "./TiltedCard";

import mlChaudharyImg from "../../../assets/leadership/ml_chaudhary.png";
import preetiSharmaImg from "../../../assets/leadership/preeti_sharma.png";
import suumitSharmaImg from "../../../assets/leadership/suumit_sharma.png";

// 3 Executive Leadership Profiles
const LEADERSHIP = [
  {
    id: 1,
    name: "Mr. M.L. Chaudhary",
    designation: "Founder & Chief Patron",
    image: mlChaudharyImg,
  },
  {
    id: 2,
    name: "Preeti Sharma",
    designation: "CHIEF MANAGING DIRECTOR",
    image: preetiSharmaImg,
  },
  {
    id: 3,
    name: "Suumit sharrma",
    designation: "Chief Operating Officer",
    image: suumitSharmaImg,
  },
];

export default function MentorsCarouselSection() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent py-16 md:py-24 select-none">

      {/* ── Section Header ── */}
      <div className="relative z-10 text-center mb-10 md:mb-16 px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-[#f6d96b]/10 text-[#f6d96b] border border-[#f6d96b]/20 mb-3 sm:mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#f6d96b] animate-pulse" />
          <span className="font-mono tracking-wider uppercase text-[10px] sm:text-[11px]">
            The Leadership Behind Third Eye
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mx-auto leading-tight tracking-tight">
          Learn From People Who&apos;ve{" "}
          <span className="text-[#f6d96b]">Actually Done the Work</span>
        </h2>

        <p className="text-xs sm:text-base text-zinc-400 max-w-xl mx-auto mt-3 leading-relaxed">
          Pioneering educators and creative studio executives shaping world-class design, animation, and tech careers.
        </p>
      </div>

      {/* ── 3 Leadership Tilted Cards Grid ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 justify-items-center">
          {LEADERSHIP.map((leader) => (
            <div key={leader.id} className="w-full max-w-[340px]">
              <TiltedCard
                imageSrc={leader.image}
                altText={leader.name}
                name={leader.name}
                designation={leader.designation}
                captionText={`${leader.name} • ${leader.designation}`}
                containerHeight="440px"
                containerWidth="100%"
                scaleOnHover={1.04}
                rotateAmplitude={12}
                showTooltip={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

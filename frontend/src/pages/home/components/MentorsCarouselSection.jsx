import React from "react";
import { Sparkles } from "lucide-react";
import TiltedCard from "./TiltedCard";

import mlChaudharyImg from "../../../assets/leadership/ml_chaudhary.png";
import preetiSharmaImg from "../../../assets/leadership/preeti_sharma.png";
import puneetSharmaImg from "../../../assets/leadership/puneet_sharma.png";
import suumitSharmaImg from "../../../assets/leadership/suumit_sharma.png";
import neelamSharmaImg from "../../../assets/leadership/neelam_sharma.png";

// 5 Executive Leadership Profiles
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
    designation: "Chief Managing Director",
    image: preetiSharmaImg,
  },
  {
    id: 3,
    name: "Puneet Sharma",
    designation: "Managing Director",
    image: puneetSharmaImg,
  },
  {
    id: 4,
    name: "Suumit sharrma",
    designation: "Chief Operating Officer",
    image: suumitSharmaImg,
  },
  {
    id: 5,
    name: "Neelam Sharma",
    designation: "Recruitment Head",
    image: neelamSharmaImg,
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
            The Leadership Behind ThirdEye
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

      {/* ── 5 Leadership Tilted Cards ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-7 lg:gap-8">
          {LEADERSHIP.map((leader) => (
            <div
              key={leader.id}
              className="w-full sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-22px)] max-w-[340px] flex justify-center"
            >
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

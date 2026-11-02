import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Sparkles, Users, Award, GraduationCap } from "lucide-react";
import TiltedCard from "./TiltedCard";
import { fetchMedia, resolveMediaUrl } from "../../../services/mediaApi";

// Local Fallbacks (Latest updated assets)
import mlChaudharyImg from "../../../assets/leadership/ml_chaudhary.png";
import preetiSharmaWebp from "../../../assets/leadership/preeti_sharma.webp";
import puneetSharmaImg from "../../../assets/leadership/puneet_sharma.png";
import suumitSharmaWebp from "../../../assets/leadership/suumit_sharma.webp";
import neelamSharmaWebp from "../../../assets/leadership/neelam_sharma.webp";
import sheetalSharmaImg from "../../../assets/leadership/sheetal_sharma.png";
import khushwangSharmaImg from "../../../assets/leadership/khushwang_sharma.png";
import student9Img from "../../../assets/students/student_9.jpg";
import student7Img from "../../../assets/students/student_7.jpg";

// Comprehensive Mentors & Faculty registry synced with Team page media slots
const INITIAL_MEMBERS = [
  // ── 1. Executive Leadership ──
  {
    id: "ml-chaudhary",
    slotKey: "team_member_6",
    carouselSlotKey: "carousel_mentor_6",
    nameMatch: "chaudhary",
    name: "Mr. M.L. Chaudhary",
    designation: "Founder & Chief Patron",
    category: "leadership",
    defaultImage: mlChaudharyImg,
  },
  {
    id: "preeti-sharma",
    slotKey: "team_member_2",
    carouselSlotKey: "carousel_mentor_2",
    nameMatch: "preeti",
    name: "Preeti Sharma",
    designation: "Chief Managing Director",
    category: "leadership",
    defaultImage: preetiSharmaWebp,
  },
  {
    id: "puneet-sharma",
    slotKey: "team_member_3",
    carouselSlotKey: "carousel_mentor_3",
    nameMatch: "puneet",
    name: "Puneet Sharma",
    designation: "Managing Director",
    category: "leadership",
    defaultImage: puneetSharmaImg,
  },
  {
    id: "suumit-sharma",
    slotKey: "team_member_1",
    carouselSlotKey: "carousel_mentor_1",
    nameMatch: "suumit",
    name: "Suumit sharrma",
    designation: "Chief Operating Officer",
    category: "leadership",
    defaultImage: suumitSharmaWebp,
  },
  {
    id: "neelam-sharma",
    slotKey: "team_member_4",
    carouselSlotKey: "carousel_mentor_4",
    nameMatch: "neelam",
    name: "Neelam Sharma",
    designation: "Recruitment Head",
    category: "leadership",
    defaultImage: neelamSharmaWebp,
  },

  // ── 2. Expert Faculty & Mentors ──
  {
    id: "rahul-verma",
    slotKey: "team_member_26",
    carouselSlotKey: "carousel_mentor_26",
    nameMatch: "rahul",
    name: "Rahul Verma",
    designation: "Designing Executive",
    category: "faculty",
    defaultImage: student9Img,
  },
  {
    id: "pramendra-sankhla",
    slotKey: "team_member_27",
    carouselSlotKey: "carousel_mentor_27",
    nameMatch: "pramendra",
    name: "Pramendra Sankhla",
    designation: "Civil & Mechanical Trainer",
    category: "faculty",
    defaultImage: student7Img,
  },
  {
    id: "sheetal-sharma",
    slotKey: "team_member_7",
    carouselSlotKey: "carousel_mentor_7",
    nameMatch: "sheetal",
    name: "Sheetal Sharma",
    designation: "Sales & B.D. Head",
    category: "faculty",
    defaultImage: sheetalSharmaImg,
  },
  {
    id: "khushwang-sharma",
    slotKey: "team_member_5",
    carouselSlotKey: "carousel_mentor_5",
    nameMatch: "kushwang",
    name: "Kushwang Sharma",
    designation: "Social Media & Operations",
    category: "faculty",
    defaultImage: khushwangSharmaImg,
  },
];

export default function MentorsCarouselSection() {
  const [activeCategory, setActiveCategory] = useState("leadership");
  const [slotMap, setSlotMap] = useState({});

  // Dynamic fetch directly from backend Team media slots
  const loadMedia = useCallback(() => {
    fetchMedia({ page: "team", type: "image" })
      .then((data) => {
        if (!data || !Array.isArray(data)) return;
        const newMap = {};
        data.forEach((slot) => {
          if (!slot.url) return;
          // Guard against local /uploads/ orphaned URLs when viewed on production
          const isLocalUpload = typeof slot.url === "string" && slot.url.startsWith("/uploads/");
          const isProd =
            typeof window !== "undefined" &&
            window.location.hostname !== "localhost" &&
            window.location.hostname !== "127.0.0.1";
          if (isProd && isLocalUpload) return;

          const resolved = resolveMediaUrl(slot.url);
          if (slot.slotKey) {
            newMap[slot.slotKey] = resolved;
          }
          if (slot.title) {
            const lower = slot.title.toLowerCase();
            if (lower.includes("chaudhary") || lower.includes("chaudhry") || lower.includes("m.l.")) {
              newMap["chaudhary"] = resolved;
            }
            if (lower.includes("preeti")) newMap["preeti"] = resolved;
            if (lower.includes("puneet")) newMap["puneet"] = resolved;
            if (lower.includes("suumit") || lower.includes("sumit")) newMap["suumit"] = resolved;
            if (lower.includes("neelam")) newMap["neelam"] = resolved;
            if (lower.includes("rahul")) newMap["rahul"] = resolved;
            if (lower.includes("pramendra")) newMap["pramendra"] = resolved;
            if (lower.includes("sheetal")) newMap["sheetal"] = resolved;
            if (lower.includes("kushwang") || lower.includes("khushwang")) newMap["kushwang"] = resolved;
          }
        });
        setSlotMap(newMap);
      })
      .catch((err) => {
        console.warn("Failed to fetch live team media for home page:", err);
      });
  }, []);

  useEffect(() => {
    loadMedia();

    // Auto-update instantly whenever an admin uploads/updates a media slot
    const handleUpdate = () => loadMedia();
    window.addEventListener("thirdeye_media_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("focus", handleUpdate);

    return () => {
      window.removeEventListener("thirdeye_media_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, [loadMedia]);

  // Compute live profiles with ImageKit dynamic photo or fallback
  const resolvedMembers = useMemo(() => {
    return INITIAL_MEMBERS.map((member) => {
      const liveUrl =
        slotMap[member.slotKey] ||
        slotMap[member.carouselSlotKey] ||
        (member.nameMatch && slotMap[member.nameMatch]) ||
        member.defaultImage;

      return {
        ...member,
        image: liveUrl,
      };
    });
  }, [slotMap]);

  // Filter based on active category tab
  const displayedMembers = useMemo(() => {
    if (activeCategory === "all") return resolvedMembers;
    return resolvedMembers.filter((m) => m.category === activeCategory);
  }, [resolvedMembers, activeCategory]);

  return (
    <section className="relative w-full overflow-hidden bg-transparent py-16 md:py-24 select-none">
      {/* ── Section Header ── */}
      <div className="relative z-10 text-center mb-8 md:mb-12 px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-[#f6d96b]/10 text-[#f6d96b] border border-[#f6d96b]/20 mb-3 sm:mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#f6d96b] animate-pulse" />
          <span className="font-mono tracking-wider uppercase text-[10px] sm:text-[11px]">
            The Leadership & Mentors Behind ThirdEye
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mx-auto leading-tight tracking-tight">
          Learn From People Who&apos;ve{" "}
          <span className="text-[#f6d96b]">Actually Done the Work</span>
        </h2>

        <p className="text-xs sm:text-base text-zinc-400 max-w-xl mx-auto mt-3 leading-relaxed">
          Pioneering educators and creative studio executives shaping world-class design, animation, and tech careers.
        </p>

        {/* ── Interactive Category Filter Tabs ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveCategory("leadership")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 border ${
              activeCategory === "leadership"
                ? "bg-[#f6d96b] text-black border-[#f6d96b] shadow-lg shadow-[#f6d96b]/20 font-semibold"
                : "bg-white/5 text-zinc-400 border-white/10 hover:border-[#f6d96b]/40 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Executive Leadership (5)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("faculty")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 border ${
              activeCategory === "faculty"
                ? "bg-[#f6d96b] text-black border-[#f6d96b] shadow-lg shadow-[#f6d96b]/20 font-semibold"
                : "bg-white/5 text-zinc-400 border-white/10 hover:border-[#f6d96b]/40 hover:text-white"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Faculty & Mentors (4)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 border ${
              activeCategory === "all"
                ? "bg-[#f6d96b] text-black border-[#f6d96b] shadow-lg shadow-[#f6d96b]/20 font-semibold"
                : "bg-white/5 text-zinc-400 border-white/10 hover:border-[#f6d96b]/40 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>All Profiles (9)</span>
          </button>
        </div>
      </div>

      {/* ── Dynamic Tilted Cards Grid ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-6 sm:gap-7 lg:gap-8">
          {displayedMembers.map((leader) => (
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

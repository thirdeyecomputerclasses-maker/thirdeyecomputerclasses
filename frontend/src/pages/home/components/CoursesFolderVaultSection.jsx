import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  TrendingUp,
  Palette,
  Code2,
  Film,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  BookOpen,
} from "lucide-react";
import FolderFloat from "./FolderFloat";

// 4 Flagship Digital Programs Matching the 4 Discipline Tracks
const vaultCourseItems = [
  {
    value: "marketing",
    label: "Digital Marketing",
    subtitle: "Meta Ads • Google Growth",
    accentColor: "#10b981",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80",
    link: "/courses",
  },
  {
    value: "uiux",
    label: "UI/UX Designing",
    subtitle: "Figma • Design Systems",
    accentColor: "#a855f7",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=200&auto=format&fit=crop&q=80",
    link: "/courses",
  },
  {
    value: "software",
    label: "Software Development",
    subtitle: "React 19 • Python • Cloud",
    accentColor: "#38bdf8",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&auto=format&fit=crop&q=80",
    link: "/courses",
  },
  {
    value: "video",
    label: "Video Editing",
    subtitle: "Premiere • DaVinci Color",
    accentColor: "#f6d96b",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&auto=format&fit=crop&q=80",
    link: "/courses",
  },
];

// 4 Flagship Career Tracks with High-Demand Tech Tools & Curriculum Metrics
const disciplineCards = [
  {
    id: "marketing",
    title: "Digital Marketing & Growth",
    modules: "75+ Modules",
    duration: "3–4 Months",
    description:
      "Meta & Google Ads mastery, performance funnels, technical SEO, GA4 analytics & viral ROI campaigns.",
    tools: ["Meta Ads", "Google GA4", "Growth SEO", "Funnels"],
    icon: TrendingUp,
    color: "#10b981", // Emerald Green
    link: "/courses",
  },
  {
    id: "uiux",
    title: "UI/UX & Product Design",
    modules: "90+ Modules",
    duration: "3–5 Months",
    description:
      "Figma design systems, mobile app UX, user psychology, wireframing & high-fidelity prototyping.",
    tools: ["Figma Systems", "Prototyping", "Design Tokens", "Wireframing"],
    icon: Palette,
    color: "#c084fc", // Electric Violet
    link: "/courses",
  },
  {
    id: "software",
    title: "Software & AI Development",
    modules: "120+ Modules",
    duration: "4–6 Months",
    description:
      "Enterprise Full-Stack, React 19, Python AI agents, Node.js backends, Docker & cloud deployment.",
    tools: ["React 19", "Python AI", "Node.js", "Docker"],
    icon: Code2,
    color: "#38bdf8", // Cyber Blue
    link: "/courses",
  },
  {
    id: "video",
    title: "Cinematic Video & Motion",
    modules: "85+ Modules",
    duration: "3–5 Months",
    description:
      "Premiere Pro CC, DaVinci Resolve color grading, After Effects motion VFX & cinematic audio mixing.",
    tools: ["Premiere Pro", "DaVinci Color", "After Effects", "Sound FX"],
    icon: Film,
    color: "#f6d96b", // Cinematic Gold
    link: "/courses",
  },
];

// Sleek, Executive-Grade Career Track Card
function DisciplineTrackCard({ item }) {
  const IconComponent = item.icon;

  return (
    <Link
      to={item.link}
      className="group relative flex flex-col justify-between p-5 sm:p-5.5 rounded-2xl bg-gradient-to-b from-[#13100a] via-[#0d0a06] to-[#070503] border border-white/[0.08] hover:border-white/[0.22] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.85)] cursor-pointer overflow-hidden"
      style={{
        boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
      }}
    >
      {/* Top Accent Gradient Bar on Hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
        }}
      />

      {/* Ambient Top Glow on Hover */}
      <div
        className="absolute -top-14 -right-14 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: item.color }}
      />

      <div>
        {/* Top Header: Icon + Modules Badge + Arrow */}
        <div className="flex items-center justify-between mb-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
            style={{
              backgroundColor: `${item.color}15`,
              borderColor: `${item.color}35`,
            }}
          >
            <IconComponent
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              style={{ color: item.color }}
            />
          </div>

          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border"
              style={{
                color: item.color,
                borderColor: `${item.color}30`,
                backgroundColor: `${item.color}12`,
              }}
            >
              {item.modules}
            </span>
            <div className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/25 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-white transition-colors mb-1.5">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-3.5">
          {item.description}
        </p>

        {/* Key Tools Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tools.map((tool) => (
            <span
              key={tool}
              className="text-[10px] sm:text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-300 group-hover:border-white/[0.12] transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Duration & CTA */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between mt-auto">
        <span className="text-[11px] text-zinc-400 font-mono">
          {item.duration} • 100% Placement
        </span>
        <span
          className="text-xs font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all"
          style={{ color: item.color }}
        >
          <span>Explore Track</span>
          <span className="text-sm">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function CoursesFolderVaultSection() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Open folder when section is scrolled into view and keep open while viewing
          setIsOpen(true);
        } else {
          // Reset when scrolled away completely out of view
          setIsOpen(false);
        }
      },
      { threshold: 0.12 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-12 sm:py-20 lg:py-24 bg-transparent overflow-hidden w-full select-none"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header (displayed on mobile, hidden on lg) */}
        <div className="block lg:hidden text-center mb-7 px-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium bg-[#f6d96b]/10 text-[#f6d96b] border border-[#f6d96b]/20 mb-3">
            <Layers className="w-3.5 h-3.5 text-[#f6d96b] animate-pulse" />
            <span className="font-mono tracking-wider uppercase text-[10px] sm:text-[11px]">
              Jaipur&apos;s Largest Creative &amp; Tech Academy
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            300+ Digital Courses.{" "}
            <span className="text-[#f6d96b]">One Unstoppable Career.</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed">
            Master industry-standard tools through project-driven curriculums led by active studio mentors.
          </p>
        </div>

        {/* 2-Column Responsive Layout: Folder on Left, Relevant 3D Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* ============================================================ */}
          {/* LEFT COLUMN: FOLDER WITH 4 2x2 BALANCED FLOATING CARDS       */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center w-full">
            {/* Arena Container for Folder: strictly overflow-hidden so cards NEVER escape */}
            <div className="relative w-full max-w-[480px] lg:max-w-[500px] min-h-[480px] sm:min-h-[620px] lg:min-h-[690px] rounded-3xl bg-[#0b0805] border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-3 sm:p-5 lg:p-6 flex flex-col items-center justify-between overflow-hidden group">
              {/* Top Arena Indicator Pill */}
              <div className="w-full flex items-center justify-between pointer-events-none z-10 pt-1">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#18120a] border border-[#f6d96b]/25 text-[10px] sm:text-[11px] font-mono text-[#f6d96b] shadow-[0_0_12px_rgba(246,217,107,0.12)]">
                  <Sparkles className="w-3 h-3 text-[#f6d96b] animate-pulse" />
                  <span>Curated Tracks</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">300+ Courses</span>
              </div>

              {/* Folder and Floating Items: positioned with generous vertical headroom & wide spread */}
              <div className="relative flex justify-center items-end w-full mt-auto mb-3 sm:mb-4 pt-12 sm:pt-28 lg:pt-32 pb-3 sm:pb-4 z-10">
                <FolderFloat
                  items={vaultCourseItems}
                  label="300+ Digital Programs"
                  sublabel=""
                  trigger="hover"
                  isOpen={isOpen}
                  closeOnLeave={false}
                  closeOnSelect={false}
                  physics={false}
                  drift={0.4}
                  width={isMobile ? 240 : 320}
                  height={isMobile ? 155 : 255}
                  radius={isMobile ? 14 : 20}
                  spread={isMobile ? 110 : 190}
                  lift={isMobile ? 24 : 26}
                  tilt={isMobile ? 2 : 4}
                  flapAngle={34}
                  restAngle={14}
                  isMobile={isMobile}
                  folderColor="#17120a"
                  frontColor="#251c12"
                  paperColor="#fcf8f0"
                  itemColor="#130e08"
                  itemTextColor="#ffffff"
                  labelColor="#ffffff"
                  onSelect={(val, i, item) => {
                    if (item?.link) navigate(item.link);
                  }}
                  onOpenChange={(next) => setIsOpen(next)}
                />
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: RELEVANT HEADLINE & 4 INTERACTIVE TRACK CARDS  */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-6">
            {/* Desktop Headline & Badge */}
            <div className="hidden lg:block space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#f6d96b]/10 text-[#f6d96b] border border-[#f6d96b]/20">
                <Layers className="w-3.5 h-3.5 text-[#f6d96b] animate-pulse" />
                <span className="font-mono tracking-wider uppercase text-[11px]">
                  Jaipur&apos;s Largest Creative &amp; Tech Academy
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.16]">
                300+ Digital Courses.
                <br />
                <span className="text-[#f6d96b]">One Unstoppable Career.</span>
              </h2>

              <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                Master industry-standard tools through project-driven curriculums led by active studio mentors, with 1-on-1 portfolio reviews and placement support.
              </p>
            </div>

            {/* 4 Interactive Discipline Track Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {disciplineCards.map((card) => (
                <DisciplineTrackCard key={card.id} item={card} />
              ))}
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-zinc-950 bg-[#f6d96b] hover:bg-[#fae183] transition-all duration-200 shadow-[0_4px_16px_rgba(246,217,107,0.22)] group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-zinc-950" />
                <span>Explore All 300+ Courses</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-xs sm:text-sm text-zinc-300 hover:text-white bg-[#14120e] hover:bg-[#1c1913] border border-white/[0.1] transition-all duration-200 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#f6d96b]" />
                <span>Book Free 2-Day Trial</span>
              </Link>
            </div>

            {/* Trust Highlights Strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[11px] sm:text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f6d96b]" />
                <span>100% Practical Studio Training</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                <span>1-on-1 Mentorship &amp; Portfolio</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                <span>Recognized Certification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

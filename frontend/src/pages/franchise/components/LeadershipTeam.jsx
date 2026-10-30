import React, { useState } from "react";
import "./LeadershipTeam.css";
import {
  Users,
  Crown,
  Sparkles,
  Award,
  TrendingUp,
  Briefcase,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  PhoneCall
} from "lucide-react";

// Official leadership photos
import mlChaudharyImg from "../../../assets/leadership/ml_chaudhary.png";
import preetiSharmaImg from "../../../assets/leadership/preeti_sharma.png";
import puneetSharmaImg from "../../../assets/leadership/puneet_sharma.png";
import suumitSharmaImg from "../../../assets/leadership/suumit_sharma.png";
import sheetalSharmaImg from "../../../assets/leadership/sheetal_sharma.png";
import neelamSharmaImg from "../../../assets/leadership/neelam_sharma.png";
import muskanAvesthiImg from "../../../assets/leadership/muskan_avesthi.png";
import khushwangSharmaImg from "../../../assets/leadership/khushwang_sharma.png";
import shubhamSainiImg from "../../../assets/leadership/shubham_saini.png";
import amitSainiImg from "../../../assets/leadership/amit_saini.png";
import mohitSharmaImg from "../../../assets/leadership/mohit_sharma.png";
import gauravSinghImg from "../../../assets/leadership/gaurav_singh.png";

export default function LeadershipTeam({ onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Leaders", count: 12, icon: Users },
    { id: "board", label: "Executive Board", count: 4, icon: Crown },
    { id: "growth", label: "Admissions & Placements", count: 4, icon: TrendingUp },
    { id: "academic", label: "Training & Operations", count: 4, icon: Briefcase }
  ];

  const leaders = [
    {
      id: "ml-chaudhary",
      name: "Mr. M.L. Chaudhary",
      role: "FOUNDER & CHIEF PATRON",
      category: "board",
      tier: "Founder",
      tag: "Ex-Indian Air Force",
      focus: "Institutional Governance & Vision",
      image: mlChaudharyImg,
      desc: "Trained in technical management with Indian Airforce Commendation. Visionary pioneer who established ThirdEye’s educational foundation and values.",
      impact: "Guiding institutional integrity & high-level governance for every branch"
    },
    {
      id: "preeti-sharma",
      name: "Preeti Sharma",
      role: "CHIEF MANAGING DIRECTOR",
      category: "board",
      tier: "Directorate",
      tag: "15+ Years Mastery",
      focus: "Corporate Growth & Alliances",
      image: preetiSharmaImg,
      desc: "Proven executive with 15+ years experience in Business Development, strategic corporate alliances, and institutional growth across India.",
      impact: "Drives partner unit-economics & national brand positioning"
    },
    {
      id: "puneet-sharma",
      name: "Puneet Sharma",
      role: "MANAGING DIRECTOR",
      category: "board",
      tier: "Directorate",
      tag: "20+ Years Mastery",
      focus: "Network Expansion & ROI",
      image: puneetSharmaImg,
      desc: "Results-oriented visionary with 20+ years expertise in institutional expansion, center profitability modeling, and ongoing partner handholding.",
      impact: "Direct partner onboarding, location feasibility & P&L guidance"
    },
    {
      id: "suumit-sharma",
      name: "Suumit Sharrma",
      role: "CHIEF OPERATING OFFICER",
      category: "board",
      tier: "Directorate",
      tag: "Operations Command",
      focus: "Pan-India Operations & SOPs",
      image: suumitSharmaImg,
      desc: "Oversees daily operational execution, standardized quality delivery, and seamless cross-branch coordination across our entire network.",
      impact: "Enforces 360° standard operating procedures & center compliance"
    },
    {
      id: "sheetal-sharma",
      name: "Sheetal Sharma",
      role: "SALES & B.D. HEAD",
      category: "growth",
      tier: "Executive Head",
      tag: "27 Years Corporate",
      focus: "Territory Sales & Expansion",
      image: sheetalSharmaImg,
      desc: "27 years of corporate leadership, specialized in franchise growth, territorial market mapping, and high-velocity student enrollment funnels.",
      impact: "Delivers catchment territory analysis & student admissions roadmaps"
    },
    {
      id: "neelam-sharma",
      name: "Neelam Sharma",
      role: "RECRUITMENT HEAD",
      category: "growth",
      tier: "Executive Head",
      tag: "Master Trainer",
      focus: "Counseling & Conversion",
      image: neelamSharmaImg,
      desc: "Heads centralized admission strategy, student guidance protocols, and master counselor training across all branches.",
      impact: "Trains your front-desk counseling team for 40%+ conversion rates"
    },
    {
      id: "muskan-avesthi",
      name: "Muskan Avesthi",
      role: "PLACEMENT MANAGER",
      category: "growth",
      tier: "Executive Head",
      tag: "500+ Recruiter Ties",
      focus: "Corporate Placements & Drives",
      image: muskanAvesthiImg,
      desc: "Directs weekly corporate placement drives, national recruiter relationships, and student interview preparation pipelines.",
      impact: "Brings Saturday placement drives directly to your enrolled students"
    },
    {
      id: "khushwang-sharma",
      name: "Khushwang Sharma",
      role: "SOCIAL MEDIA & OPERATIONS HEAD",
      category: "growth",
      tier: "Executive Head",
      tag: "Digital Lead Gen",
      focus: "Omnichannel Brand Reach",
      image: khushwangSharmaImg,
      desc: "Drives centralized digital branding, hyper-targeted student acquisition campaigns, and localized promotional collateral for partners.",
      impact: "Supplies verified student inquiries & readymade ad creatives"
    },
    {
      id: "shubham-saini",
      name: "Shubham Saini",
      role: "SR. TRAINING MANAGER",
      category: "academic",
      tier: "Executive Head",
      tag: "Master Tech Trainer",
      focus: "Pedagogy & Faculty Audits",
      image: shubhamSainiImg,
      desc: "Spearheads instructor certification, live syllabus calibration, and continuous teaching quality audits across regional branches.",
      impact: "Onboards & certifies your teaching faculty to headquarter standards"
    },
    {
      id: "amit-saini",
      name: "Amit Saini",
      role: "SR. DIGITAL MARKETING MANAGER",
      category: "academic",
      tier: "Executive Head",
      tag: "9+ Years Experience",
      focus: "Performance Ad Funnels",
      image: amitSainiImg,
      desc: "9+ years of expertise in search & social performance ads, geo-targeted catchment campaigns, and lead funnels.",
      impact: "Executes localized Google & Meta lead campaigns for your territory"
    },
    {
      id: "mohit-sharma",
      name: "Mohit Sharma",
      role: "ADMIN MANAGER",
      category: "academic",
      tier: "Executive Head",
      tag: "Logistics & Labs",
      focus: "Infrastructure & Lab Setup",
      image: mohitSharmaImg,
      desc: "Ensures seamless IT lab setup, hardware logistics, operational compliance, and center facility readiness.",
      impact: "Guides lab hardware procurement & center floor-plan layouts"
    },
    {
      id: "gaurav-singh",
      name: "Gaurav Singh Panwar",
      role: "IVR & CRM SUPPORT MANAGER",
      category: "academic",
      tier: "Executive Head",
      tag: "Real-Time Telephony",
      focus: "CRM Portal & Telephony",
      image: gauravSinghImg,
      desc: "Oversees student lead response tracking, CRM portal access, telephony integration, and 24/7 partner support desk.",
      impact: "Configures zero-lead-leakage tracking & real-time analytics portal"
    }
  ];

  const filteredLeaders =
    activeCategory === "all"
      ? leaders
      : leaders.filter((l) => l.category === activeCategory);

  const handleInquiryClick = () => {
    if (onOpenInquiry) {
      onOpenInquiry();
    } else {
      const el = document.getElementById("franchise-inquiry");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="leadership-franchise-section" id="leadership">
      {/* Ambient background glows */}
      <div className="leadership-ambient-glow glow-top-left" />
      <div className="leadership-ambient-glow glow-bottom-right" />

      <div className="leadership-franchise-container">
        {/* Header Block with Executive Metrics (No boring paragraph) */}
        <div className="leadership-header-block">
          <div className="leadership-badge">
            <Crown size={15} className="leadership-badge-icon" />
            <span>EXECUTIVE BACKING & COMMAND</span>
          </div>

          <h2 className="leadership-title">
            MEET THE TEAM <span className="leadership-title-gold">BEHIND THE BRAND</span>
          </h2>

          {/* Directorate Trust Metrics Bar (High-Impact alternative to paragraphs) */}
          <div className="leadership-stats-strip">
            <div className="leadership-stat-pill">
              <span className="stat-pill-num">15+</span>
              <span className="stat-pill-label">Years of Legacy</span>
            </div>
            <div className="leadership-stat-sep" />
            <div className="leadership-stat-pill">
              <span className="stat-pill-num">12</span>
              <span className="stat-pill-label">Corporate Heads</span>
            </div>
            <div className="leadership-stat-sep" />
            <div className="leadership-stat-pill">
              <span className="stat-pill-num">100%</span>
              <span className="stat-pill-label">Direct Directorate Access</span>
            </div>
            <div className="leadership-stat-sep" />
            <div className="leadership-stat-pill">
              <span className="stat-pill-num">24/7</span>
              <span className="stat-pill-label">Operational Desk</span>
            </div>
          </div>

          {/* Interactive Department Filter Tabs */}
          <div className="leadership-tabs-bar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`leadership-tab-btn ${isActive ? "active" : ""}`}
                >
                  <Icon size={15} />
                  <span>{cat.label}</span>
                  <span className="tab-count-bubble">{cat.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Leaders Grid */}
        <div className="leaders-grid">
          {filteredLeaders.map((leader) => (
            <div key={leader.id} className={`leader-card ${leader.category}`}>
              {/* Card Laser Top Rim Accent */}
              <div className="leader-card-glow-rim" />

              {/* Upper Section: Portrait Image with Overlays */}
              <div className="leader-img-box">
                {/* Tier Badge */}
                <div className="leader-tier-pill">
                  {leader.tier === "Founder" ? (
                    <>
                      <Crown size={12} className="tier-icon gold" />
                      <span>FOUNDER</span>
                    </>
                  ) : leader.tier === "Directorate" ? (
                    <>
                      <Sparkles size={12} className="tier-icon gold" />
                      <span>DIRECTORATE</span>
                    </>
                  ) : (
                    <>
                      <Award size={12} className="tier-icon amber" />
                      <span>CORE HEAD</span>
                    </>
                  )}
                </div>

                {/* Experience / Specialty Tag */}
                <div className="leader-tag-pill">
                  <span>{leader.tag}</span>
                </div>

                {/* Portrait */}
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="leader-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextSibling) {
                      e.currentTarget.nextSibling.style.display = "flex";
                    }
                  }}
                />

                {/* Fallback Avatar */}
                <div className="leader-fallback-avatar" style={{ display: "none" }}>
                  {leader.name
                    .split(" ")
                    .filter((w) => !w.includes("."))
                    .map((w) => w[0])
                    .join("")}
                </div>

                {/* Vignette Gradient Overlay (Seamlessly blends into bottom card) */}
                <div className="leader-img-gradient-overlay" />
              </div>

              {/* Lower Section: Executive Details & Impact */}
              <div className="leader-content">
                <div className="leader-role-badge">
                  <span>{leader.role}</span>
                </div>

                <h3 className="leader-name">{leader.name}</h3>

                <div className="leader-focus-pill">
                  <span className="focus-dot" />
                  <span>{leader.focus}</span>
                </div>

                <p className="leader-desc">{leader.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Directorate Assurance Callout */}
        <div className="leadership-assurance-card">
          <div className="assurance-left">
            <div className="assurance-badge">
              <ShieldCheck size={16} />
              <span>DIRECT EXECUTIVE ENGAGEMENT</span>
            </div>
            <h4 className="assurance-title">Direct Monthly Strategy Reviews With Our C-Suite</h4>
            <p className="assurance-text">
              Unlike generic corporate franchisors where you only deal with junior reps, ThirdEye franchise partners enjoy direct, unfiltered access to our Managing Directors, curriculum heads, and corporate placement team.
            </p>
          </div>
          <div className="assurance-right">
            <button
              type="button"
              onClick={handleInquiryClick}
              className="assurance-cta-btn"
            >
              <span>Speak With Our Directorate</span>
              <ArrowRight size={17} />
            </button>
            <span className="assurance-guarantee-note">
              ✓ 100% Confidential Discovery Call
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import "./HowThirdEyeHelpsYouGrow.css";
import {
  Headset,
  BookOpen,
  Users,
  Briefcase,
  Layers,
  Megaphone,
  PhoneCall,
  Clock,
  Sparkles,
  Wrench,
  TrendingUp,
  BarChart3,
  Target,
  Building2,
  Infinity as InfinityIcon,
  PackageCheck,
  CreditCard,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Percent,
  Check
} from "lucide-react";

// EMI Partner Logos
import emiBadgeEasy from "../../../assets/awards/emi_badge_easy_plan.png";
import emiLogoBajaj from "../../../assets/awards/emi_logo_bajaj.png";
import emiLogoFinz from "../../../assets/awards/emi_logo_finz.png";

export default function HowThirdEyeHelpsYouGrow({ onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All 16 Pillars" },
    { id: "academics", label: "Academics & Faculty" },
    { id: "marketing", label: "Marketing & Leads" },
    { id: "placement", label: "Placement & Tie-Ups" },
    { id: "operations", label: "24/7 Operations" }
  ];

  const growthPillars = [
    {
      id: "p1",
      number: "01",
      category: "operations",
      icon: <Headset size={20} />,
      title: "Dedicated Partner Support Team",
      desc: "Direct single-point-of-contact desk at Head Office for operational queries."
    },
    {
      id: "p2",
      number: "02",
      category: "academics",
      icon: <BookOpen size={20} />,
      title: "Updated Curriculum & Course Content",
      desc: "Continually refreshed course modules aligning with emerging IT market trends."
    },
    {
      id: "p3",
      number: "03",
      category: "academics",
      icon: <Users size={20} />,
      title: "Student Batch & Faculty Management Support",
      desc: "Standardized timetables, classroom scheduling SOPs, and lab optimization."
    },
    {
      id: "p4",
      number: "04",
      category: "placement",
      icon: <Briefcase size={20} />,
      title: "Corporate Training & Placement Tie-up Assistance",
      desc: "State-level corporate tie-ups with leading software firms and MNC employers."
    },
    {
      id: "p5",
      number: "05",
      category: "academics",
      icon: <Layers size={20} />,
      title: "Continuous Addition of New Courses & Business Verticals",
      desc: "Instant access to high-demand AI, Cloud, Cybersecurity and Design modules."
    },
    {
      id: "p6",
      number: "06",
      category: "marketing",
      icon: <Megaphone size={20} />,
      title: "Centralized Digital Marketing & Lead Generation Support",
      desc: "Targeted Google & Meta ad campaigns funneling verified local admission inquiries."
    },
    {
      id: "p7",
      number: "07",
      category: "marketing",
      icon: <PhoneCall size={20} />,
      title: "Feedback Calls Support on Visits from H.O.",
      desc: "Scheduled Head Office audit visits and quality feedback calls to assure student satisfaction."
    },
    {
      id: "p8",
      number: "08",
      category: "academics",
      icon: <Clock size={20} />,
      title: "Refined Hiring Assistance Within 72 Hours",
      desc: "Rapid faculty & lab instructor recruitment through our verified trainer talent pool."
    },
    {
      id: "p9",
      number: "09",
      category: "placement",
      icon: <Sparkles size={20} />,
      title: "Continuous Training & Skill Enhancement",
      desc: "Train-the-Trainer (TTT) workshops ensuring instructors stay ahead of curriculum changes."
    },
    {
      id: "p10",
      number: "10",
      category: "operations",
      icon: <Wrench size={20} />,
      title: "24/7 Technical & Operational Support",
      desc: "Hardware troubleshooting, software licensing, and LMS infrastructure assistance."
    },
    {
      id: "p11",
      number: "11",
      category: "operations",
      icon: <TrendingUp size={20} />,
      title: "Cost Management Guidance",
      desc: "Operational budget blueprints to optimize overheads and maximize net profit margins."
    },
    {
      id: "p12",
      number: "12",
      category: "operations",
      icon: <BarChart3 size={20} />,
      title: "Regular Performance Reviews & Audits",
      desc: "Monthly benchmark reviews to track student retention, pass rates, and center growth."
    },
    {
      id: "p13",
      number: "13",
      category: "marketing",
      icon: <Target size={20} />,
      title: "Student Retention & Growth Strategies",
      desc: "Proven engagement programs, hackathons, and certifications that keep dropout rates near zero."
    },
    {
      id: "p14",
      number: "14",
      category: "placement",
      icon: <Building2 size={20} />,
      title: "Enrolled Students Placement Support Through Multiple Company Tie-Ups",
      desc: "Dedicated recruitment drives ensuring job readiness and verified career placements."
    },
    {
      id: "p15",
      number: "15",
      category: "operations",
      icon: <InfinityIcon size={20} />,
      title: "Lifetime Training Support",
      desc: "Perpetual training rights for partner management and academic personnel."
    },
    {
      id: "p16",
      number: "16",
      category: "marketing",
      icon: <PackageCheck size={20} />,
      title: "Franchise Onboarding Kit",
      desc: "Complete branded welcome kit: prospectus collateral, signage files, and administrative SOPs."
    }
  ];

  const filteredPillars =
    activeCategory === "all"
      ? growthPillars
      : growthPillars.filter((p) => p.category === activeCategory);

  const emiAdvantages = [
    { title: "Zero Student Barrier", desc: "0% interest, no upfront cost" },
    { title: "Instant 15-Min Approvals", desc: "Digital paperless KYC" },
    { title: "100% Upfront Disbursal", desc: "Immediate payout to branch" },
    { title: "3.5x Conversion Rate", desc: "Higher close rate on leads" }
  ];

  return (
    <section className="growth-support-section" id="how-helps-you-grow">
      {/* Background ambient lighting */}
      <div className="growth-ambient-glow glow-amber" />
      <div className="growth-ambient-glow glow-gold" />

      <div className="growth-support-container">
        {/* Section Header with Creative Highlighted Oval */}
        <div className="growth-header-block">
          <div className="growth-top-pill">
            <Zap size={14} className="pill-zap" />
            <span>360° OPERATIONAL & BUSINESS BACKING</span>
          </div>

          <h2 className="growth-main-title">
            HOW{" "}
            <span className="growth-title-highlight">
              THIRDEYE
              {/* Hand-drawn neon yellow oval matching user flyer */}
              <svg
                className="title-oval-svg"
                viewBox="0 0 250 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="125"
                  cy="42.5"
                  rx="118"
                  ry="36"
                  stroke="#f6d96b"
                  strokeWidth="3.5"
                  strokeDasharray="9 6"
                  className="oval-path-pulse"
                />
              </svg>
            </span>{" "}
            HELPS YOU GROW
          </h2>

          <p className="growth-header-sub">
            From Day 1 setup to ongoing student placements, we provide every operational,
            technical, and financial tool required to run a thriving, high-margin IT campus.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="growth-master-grid">
          {/* ========================================================= */}
          {/* LEFT: 16 Growth Pillars with Interactive Filter Pills     */}
          {/* ========================================================= */}
          <div className="growth-left-column">
            {/* Category Filter Pills */}
            <div className="growth-filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`growth-filter-pill ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  {cat.id === "all" && (
                    <span className="pill-count">{growthPillars.length}</span>
                  )}
                </button>
              ))}
            </div>

            {/* 16 Pillars Grid */}
            <div className="growth-cards-grid">
              {filteredPillars.map((item) => (
                <div key={item.id} className="growth-pillar-card">
                  <div className="pillar-laser-beam" />
                  
                  <div className="pillar-top-row">
                    <div className="pillar-icon-box">{item.icon}</div>
                    <span className="pillar-number">#{item.number}</span>
                  </div>

                  <h3 className="pillar-title">{item.title}</h3>
                  <p className="pillar-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: Financial Enablement (EMI) + Golden Partner Motto  */}
          {/* ========================================================= */}
          <div className="growth-right-column">
            {/* ── CARD 1: EXCLUSIVE EMI FACILITIES ── */}
            <div className="growth-emi-console-card">
              <div className="console-ambient-glow" />

              {/* Yellow Banner (Exact Match to User Flyer) */}
              <div className="emi-banner-header">
                <h3 className="emi-banner-title">
                  EXCLUSIVE EMI FACILITIES THROUGH PARTNER BANKS
                </h3>
              </div>

              <p className="emi-console-intro">
                Empower prospective students to enroll immediately with easy, zero-cost
                monthly installments — while your campus receives 100% upfront tuition fees.
              </p>

              {/* The 3 Official Financial Partner Badges */}
              <div className="emi-logos-shelf">
                <div className="emi-logo-item badge-wrap">
                  <img
                    src={emiBadgeEasy}
                    alt="Easy EMI Plan for Students"
                    className="emi-shelf-logo logo-easy"
                  />
                </div>

                <div className="emi-logo-item">
                  <img
                    src={emiLogoBajaj}
                    alt="Bajaj Finserv"
                    className="emi-shelf-logo logo-bajaj"
                  />
                </div>

                <div className="emi-logo-item">
                  <img
                    src={emiLogoFinz}
                    alt="FINZ"
                    className="emi-shelf-logo logo-finz"
                  />
                </div>
              </div>

              {/* 4 EMI Advantages */}
              <div className="emi-features-matrix">
                {emiAdvantages.map((adv, idx) => (
                  <div key={idx} className="emi-matrix-cell">
                    <div className="matrix-check">
                      <Check size={14} />
                    </div>
                    <div>
                      <strong className="matrix-title">{adv.title}</strong>
                      <span className="matrix-sub">{adv.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CARD 2: GOLDEN PARTNER MOTTO ── */}
            <div className="growth-motto-banner-card">
              <div className="motto-laser-border" />
              
              <div className="motto-top-badge">
                <ShieldCheck size={16} />
                <span>OUR MUTUAL SUCCESS COMMITMENT</span>
              </div>

              <blockquote className="motto-quote-text">
                "#YOUR GROWTH IS OUR PRIORITY, BECAUSE THIRDEYE GROWS ONLY WHEN THEIR PARTNERS SUCCEED"
              </blockquote>

              <p className="motto-explainer">
                Unlike traditional franchise models that charge heavy recurring royalties,
                our entire infrastructure is engineered around maximizing your center's enrollment
                profitability, student career outcomes, and regional leadership.
              </p>

              {onOpenInquiry && (
                <button
                  type="button"
                  className="motto-cta-btn"
                  onClick={onOpenInquiry}
                >
                  <span>Apply For Your Territory Today</span>
                  <ArrowRight size={17} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

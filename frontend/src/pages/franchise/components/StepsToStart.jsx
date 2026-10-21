import React from "react";
import "./StepsToStart.css";
import {
  PhoneCall,
  FileSignature,
  MapPin,
  UserPlus,
  Rocket,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  Building2,
  CalendarCheck
} from "lucide-react";

export default function StepsToStart({ onOpenInquiry }) {
  const steps = [
    {
      num: "01",
      phase: "WEEK 1",
      timeline: "Days 1–5",
      icon: <PhoneCall size={22} />,
      title: "Consultation & Territory Selection",
      desc: "Meet our Franchise Directorate to evaluate city demographics, catchment footfalls, competitive advantages, and personalized ROI projections.",
      deliverable: "Territory Viability & Unit Economics Report"
    },
    {
      num: "02",
      phase: "WEEK 2",
      timeline: "Days 6–10",
      icon: <FileSignature size={22} />,
      title: "Agreement & Territorial Exclusivity",
      desc: "Execute the formal franchise agreement securing guaranteed geographic exclusivity rights with 100% transparent, partner-first commercial terms.",
      deliverable: "Exclusive Geographic Rights Agreement"
    },
    {
      num: "03",
      phase: "WEEK 3",
      timeline: "Days 11–22",
      icon: <Building2 size={22} />,
      title: "Site Finalization & Turnkey Setup",
      desc: "Select prime commercial premises with head-office property vetting. Receive turnkey 3D lab blueprints, interior branding, and hardware specs.",
      deliverable: "Turnkey Lab Blueprint & Signage Guidelines"
    },
    {
      num: "04",
      phase: "WEEK 4",
      timeline: "Days 23–30",
      icon: <UserPlus size={22} />,
      title: "Staff Hiring & Master Training",
      desc: "Head Office assists in recruiting front-desk counselors, branch managers, and trainers, followed by comprehensive master certification.",
      deliverable: "Certified Faculty & Counselors On-Site"
    },
    {
      num: "05",
      phase: "WEEK 5",
      timeline: "Days 31–38",
      icon: <Rocket size={22} />,
      title: "Hyper-Local Launch Marketing",
      desc: "Execute a multi-channel local launch blitz with geo-targeted Google/Meta ads, print flyers, banner placement, and senior HQ launch support.",
      deliverable: "Verified Student Leads & Pre-Registrations"
    },
    {
      num: "06",
      phase: "WEEK 6",
      timeline: "Days 40–45",
      icon: <GraduationCap size={22} />,
      title: "Batch Inauguration & Revenue",
      desc: "Inaugurate your first student batch, connect into the centralized corporate placement cell, and generate immediate recurring monthly tuition revenue.",
      deliverable: "Live Batches & Active Placement Cell Access"
    }
  ];

  const handleStepMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    e.currentTarget.style.setProperty("--step-mx", `${x}%`);
    e.currentTarget.style.setProperty("--step-my", `${y}%`);
  };

  return (
    <section className="steps-franchise-section" id="how-to-start">
      {/* Ambient background glows */}
      <div className="steps-ambient-glow glow-top-left" />
      <div className="steps-ambient-glow glow-bottom-right" />

      <div className="steps-franchise-container">
        {/* Section Header */}
        <div className="steps-header-block">
          <div className="steps-badge">
            <Sparkles size={16} className="steps-badge-icon" />
            <span>30–45 DAYS TO LAUNCH</span>
          </div>

          <h2 className="steps-title">
            HOW TO GET <span className="steps-title-gold">STARTED</span>
          </h2>

          {/* Launch Velocity Strip (No boring paragraph) */}
          <div className="steps-velocity-strip">
            <div className="velocity-stat-pill">
              <Clock size={16} className="velocity-icon" />
              <span className="velocity-num">30–45 Days</span>
              <span className="velocity-label">Launch Turnaround</span>
            </div>
            <div className="velocity-stat-sep" />
            <div className="velocity-stat-pill">
              <ShieldCheck size={16} className="velocity-icon" />
              <span className="velocity-num">100%</span>
              <span className="velocity-label">Exclusive Territory</span>
            </div>
            <div className="velocity-stat-sep" />
            <div className="velocity-stat-pill">
              <Building2 size={16} className="velocity-icon" />
              <span className="velocity-num">Turnkey</span>
              <span className="velocity-label">Lab Architecture</span>
            </div>
            <div className="velocity-stat-sep" />
            <div className="velocity-stat-pill">
              <CalendarCheck size={16} className="velocity-icon" />
              <span className="velocity-num">Day 1</span>
              <span className="velocity-label">Faculty Certified</span>
            </div>
          </div>
        </div>

        {/* 6-Step Roadmap Grid — Vibrant Filled Yellow Cards */}
        <div className="steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card" onMouseMove={handleStepMouseMove}>
              {/* Step Top Bar */}
              <div className="step-card-header">
                <div className="step-badge-cluster">
                  <span className="step-number-pill">STEP {step.num}</span>
                  <span className="step-timeline-pill">{step.phase} • {step.timeline}</span>
                </div>
                <div className="step-icon-box">{step.icon}</div>
              </div>

              {/* Title & Description */}
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Console — Vibrant Yellow Console */}
        <div className="steps-bottom-cta">
          <div className="cta-text-left">
            <div className="cta-status-tag">
              <ShieldCheck size={14} />
              <span>TERRITORY LOCK RESERVATION</span>
            </div>
            <h3 className="cta-heading">Ready to Lock Your Exclusive City Territory?</h3>
            <p className="cta-sub">
              Territories are allotted on a strict first-come, first-served basis. Secure your catchment zone before another partner reserves it.
            </p>
          </div>

          <div className="cta-action-right">
            <button 
              type="button" 
              className="steps-apply-btn"
              onClick={onOpenInquiry}
            >
              <span>Lock My Territory & Apply</span>
              <ArrowRight size={18} />
            </button>
            <span className="cta-helpline-note">
              ⚡ 100% Confidential Discovery Call
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

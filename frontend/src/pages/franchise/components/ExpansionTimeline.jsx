import React, { useState } from "react";
import "./ExpansionTimeline.css";
import { 
  Milestone, 
  MapPin, 
  Calendar, 
  Compass, 
  TrendingUp, 
  Radio, 
  Sparkles,
  ArrowRight,
  Building2,
  CheckCircle2
} from "lucide-react";

export default function ExpansionTimeline() {
  const [activeBar, setActiveBar] = useState(7); // Default to ACROSS 50+

  const barData = [
    {
      date: "MARCH 2023",
      count: 10,
      heightPercent: 20,
      label: "10",
      milestone: "Genesis Branch — Sanganer Hub",
      desc: "First flagship tech campus launched in Jaipur"
    },
    {
      date: "AUGUST 2023",
      count: 15,
      heightPercent: 30,
      label: "15",
      milestone: "Pratap Nagar & Jagatpura",
      desc: "Rapid expansion into major student education belts"
    },
    {
      date: "JANUARY 2024",
      count: 20,
      heightPercent: 40,
      label: "20",
      milestone: "Vaishali & Mansarovar",
      desc: "Prime commercial and metro transit corridors covered"
    },
    {
      date: "MARCH 2025",
      count: 25,
      heightPercent: 50,
      label: "25",
      milestone: "Gopalpura & Sodala",
      desc: "City-wide institutional market dominance achieved"
    },
    {
      date: "JULY 2025",
      count: 30,
      heightPercent: 60,
      label: "30",
      milestone: "Jhotwara & Raja Park",
      desc: "High-density retail & residential center footprint"
    },
    {
      date: "AUGUST 2025",
      count: 35,
      heightPercent: 70,
      label: "35",
      milestone: "15+ Running Strong",
      desc: "15+ active branches operating across capital city"
    },
    {
      date: "JANUARY 2026",
      count: 40,
      heightPercent: 80,
      label: "40",
      milestone: "Pan-Rajasthan Rollout",
      desc: "District headquarters entering active onboarding"
    },
    {
      date: "FUTURE VISION",
      count: 50,
      heightPercent: 100,
      label: "ACROSS 50+",
      isTarget: true,
      milestone: "50+ Statewide Network",
      desc: "Pan-India brand recognition with standardized delivery"
    }
  ];

  const upcomingCities = [
    { city: "AJMER", distance: "District Central Hub" },
    { city: "SIKAR", distance: "Coaching Capital Belt" },
    { city: "ALWAR", distance: "Industrial NCR Corridor" },
    { city: "KOTA", distance: "Premier Student Town" },
    { city: "UDAIPUR", distance: "Southern Zone Gateway" }
  ];

  const handleScrollToInquiry = (cityName = "") => {
    const inquirySection = document.getElementById("apply-franchise");
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: "smooth" });
      if (cityName) {
        setTimeout(() => {
          const cityInput = document.querySelector('input[name="city"]');
          if (cityInput) {
            cityInput.value = cityName;
            cityInput.focus();
            cityInput.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }, 500);
      }
    }
  };

  const selectedData = barData[activeBar] || barData[7];

  return (
    <section className="timeline-section" id="timeline">
      {/* Background ambient lighting */}
      <div className="timeline-ambient-glow timeline-ambient-glow-left" />
      <div className="timeline-ambient-glow timeline-ambient-glow-right" />

      <div className="timeline-container">
        {/* Top Yellow Bar Header (Exact match to User Screenshot 5) */}
        <div className="timeline-top-banner">
          <h2 className="timeline-banner-title">
            THIRDEYE EXPANSION TIMELINE (2023–2026)
          </h2>
        </div>

        <p className="timeline-banner-sub">
          From our very first branch in Sanganer, Jaipur in March 2023 to now 15+ branches in less than three years,
          Thirdeye has continued to grow strong and steady across the city.
        </p>

        <div className="timeline-pill-center">
          <div className="growth-journey-pill">
            <TrendingUp size={16} />
            <span>GROWTH JOURNEY</span>
          </div>
        </div>

        {/* ── Ascending Gold Growth Bar Chart (Exact match to User Screenshot 5) ── */}
        <div className="chart-outer-wrapper">
          <div className="chart-viewport">
            {/* Horizontal Gridlines */}
            <div className="chart-gridlines">
              <div className="gridline"><span className="grid-label">50</span><div className="grid-line" /></div>
              <div className="gridline"><span className="grid-label">40</span><div className="grid-line" /></div>
              <div className="gridline"><span className="grid-label">30</span><div className="grid-line" /></div>
              <div className="gridline"><span className="grid-label">20</span><div className="grid-line" /></div>
              <div className="gridline"><span className="grid-label">10</span><div className="grid-line" /></div>
              <div className="gridline gridline-base"><span className="grid-label">0</span><div className="grid-line" /></div>
            </div>

            {/* Bars Container */}
            <div className="chart-bars-container">
              {barData.map((bar, idx) => {
                const isSelected = activeBar === idx;
                return (
                  <div 
                    key={idx} 
                    className={`chart-bar-column ${isSelected ? "bar-is-selected" : ""} ${bar.isTarget ? "bar-is-target" : ""}`}
                    onClick={() => setActiveBar(idx)}
                    onMouseEnter={() => setActiveBar(idx)}
                  >
                    {/* Top Callout Date Label */}
                    <span className="bar-date-header">{bar.date}</span>

                    {/* Bar Pillar */}
                    <div className="bar-pillar-wrap">
                      <div 
                        className="bar-pillar" 
                        style={{ height: `${bar.heightPercent}%` }}
                      >
                        <div className="bar-top-shine" />
                        {bar.isTarget && (
                          <div className="target-glow-ping" />
                        )}
                        <span className="bar-inner-val">{bar.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Milestone Card for Currently Selected Bar */}
          <div className="chart-active-card">
            <div className="active-card-laser" />
            <div className="active-card-meta">
              <span className="active-card-phase">
                <Calendar size={14} className="text-yellow-400" />
                {selectedData.date}
              </span>
              <strong className="active-card-count">
                {selectedData.label} {selectedData.isTarget ? "Vision" : "Milestone Centers"}
              </strong>
            </div>
            <h4 className="active-card-milestone">{selectedData.milestone}</h4>
            <p className="active-card-desc">{selectedData.desc}</p>
          </div>
        </div>

        {/* ── Territory Allotment Radar Module (Upcoming Branches) ── */}
        <div className="upcoming-radar-module">
          <div className="radar-glow-rim" />

          {/* Radar Header */}
          <div className="upcoming-box-header">
            <div className="upcoming-title-left">
              <div className="radar-icon-container">
                <Compass size={24} className="radar-compass-icon" />
              </div>
              <div>
                <div className="radar-sub-tag">
                  <Sparkles size={13} className="radar-sparkle-gold" />
                  <span>NEXT-GEN EXPANSION PIPELINE</span>
                </div>
                <h4 className="upcoming-title">
                  UPCOMING <span className="upcoming-title-yellow">BRANCHES &amp; TERRITORIES</span>
                </h4>
                <p className="upcoming-sub">
                  High-demand territories available for immediate partner allotment across Rajasthan
                </p>
              </div>
            </div>

            <button 
              className="upcoming-cta-btn" 
              onClick={() => handleScrollToInquiry()}
              aria-label="Pre-book franchise territory"
            >
              <span>PRE-BOOK TERRITORY</span>
              <ArrowRight size={16} className="cta-arrow-icon" />
            </button>
          </div>

          {/* Territory Nodes Grid */}
          <div className="upcoming-cities-grid">
            {upcomingCities.map((item, idx) => (
              <div 
                key={idx} 
                className="city-chip-card"
                onClick={() => handleScrollToInquiry(item.city)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleScrollToInquiry(item.city);
                  }
                }}
              >
                <div className="city-pin-wrapper">
                  <MapPin size={18} className="city-pin" />
                </div>
                <div className="city-chip-text">
                  <span className="city-name">{item.city}</span>
                  <span className="city-desc">{item.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

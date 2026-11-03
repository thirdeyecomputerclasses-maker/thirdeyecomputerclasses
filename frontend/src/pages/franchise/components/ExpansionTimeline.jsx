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
  CheckCircle2,
  Sparkle
} from "lucide-react";

export default function ExpansionTimeline() {
  // Default selected bar: Sodala (Newest 2026 branch)
  const [activeBar, setActiveBar] = useState(9);

  // Exact 10 Verified Branches + Vision 2028 Target in Chronological Order
  const barData = [
    {
      id: "sanganer",
      date: "MARCH 2023",
      branch: "Sanganer",
      count: 7,
      heightPercent: 14,
      milestone: "Branch 01 — Sanganer (Head Office)",
      desc: "Genesis flagship tech campus founded in South Jaipur. 120+ high-end workstations with dedicated GPU and Animation labs.",
      location: "Printers Colony, Near Stadium, Sanganer, Jaipur",
      status: "Active Campus",
      isHQ: true
    },
    {
      id: "pratap-nagar",
      date: "AUGUST 2023",
      branch: "Pratap Nagar",
      count: 12,
      heightPercent: 24,
      milestone: "Branch 02 — Pratap Nagar (Haldi Ghati Gate)",
      desc: "Strategic engineering training center launched on Coaching Hub Road, serving Sitapura, Kumbha Marg & South-East students.",
      location: "Haldi Ghati Gate, Coaching Hub Road, Pratap Nagar",
      status: "Active Campus"
    },
    {
      id: "jagatpura",
      date: "JANUARY 2024",
      branch: "Jagatpura",
      count: 16,
      heightPercent: 32,
      milestone: "Branch 03 — Jagatpura (Mahal Road)",
      desc: "Expansion into the premier engineering university corridor, offering Full-Stack Development, Python AI, and AutoCAD infrastructure.",
      location: "Mahal Road, Near SKIT Circle, Jagatpura, Jaipur",
      status: "Active Campus"
    },
    {
      id: "vaishali-nagar",
      date: "MARCH 2025",
      branch: "Vaishali Nagar",
      count: 20,
      heightPercent: 40,
      milestone: "Branch 04 — Vaishali Nagar (Amrapali Circle)",
      desc: "West Jaipur premier tech & creative studio campus. Industry-grade Graphic Design, UI/UX, and 3D Visualizer suites.",
      location: "Amrapali Circle, Vaishali Nagar, Jaipur",
      status: "Active Campus"
    },
    {
      id: "vidhyadhar-nagar",
      date: "JULY 2025",
      branch: "Vidhyadhar Nagar",
      count: 24,
      heightPercent: 48,
      milestone: "Branch 05 — Vidhyadhar Nagar (Sector 2)",
      desc: "North Jaipur flagship tech center catering to Central Spine & Sikar Road education belt with high-tech training labs.",
      location: "Sector 2, Central Spine, Vidhyadhar Nagar, Jaipur",
      status: "Active Campus"
    },
    {
      id: "raja-park",
      date: "AUGUST 2025",
      branch: "Raja Park",
      count: 28,
      heightPercent: 56,
      milestone: "Branch 06 — Raja Park (Commercial Center)",
      desc: "High-street tech campus for East Jaipur students and working executives, specializing in Tally Prime, GST, and Digital Marketing.",
      location: "Near LBS College Marg, Raja Park, Jaipur",
      status: "Active Campus"
    },
    {
      id: "jhotwara",
      date: "AUGUST 2025",
      branch: "Jhotwara",
      count: 32,
      heightPercent: 64,
      milestone: "Branch 07 — Jhotwara (Kalwar Road)",
      desc: "Heavy industrial & tech corridor campus at Kalwar Road Junction with specialized CAD/CAM and mechanical drafting labs.",
      location: "Kalwar Road Junction, Jhotwara, Jaipur",
      status: "Active Campus"
    },
    {
      id: "gopalpura",
      date: "JANUARY 2026",
      branch: "Gopalpura",
      count: 36,
      heightPercent: 72,
      milestone: "Branch 08 — Gopalpura (Education Coaching Belt)",
      desc: "Located right in the heart of Jaipur's premier coaching belt on Gopalpura Bypass with intensive corporate placement cells.",
      location: "Gopalpura Bypass, Main Education Belt, Jaipur",
      status: "Active Campus"
    },
    {
      id: "mansarovar",
      date: "JANUARY 2026",
      branch: "Mansarovar",
      count: 40,
      heightPercent: 80,
      milestone: "Branch 09 — Mansarovar (Madhyam Marg)",
      desc: "Extensive campus in Asia's largest township, featuring smart classrooms, practical coding studios, and career guidance suites.",
      location: "Madhyam Marg, Near VT Road, Mansarovar, Jaipur",
      status: "Active Campus"
    },
    {
      id: "sodala",
      date: "JANUARY 2026",
      branch: "Sodala",
      count: 44,
      heightPercent: 88,
      isNew: true,
      milestone: "Branch 10 — Sodala (Metro Corridor) • 2026 Newest Branch",
      desc: "ThirdEye's newest 2026 flagship branch on New Sanganer Road with ultra-modern smart labs, high-speed workstations, and direct metro connectivity.",
      location: "1st Floor, D.P. Colony, Near Vivek Vihar Metro Station, Sodala, Jaipur",
      status: "Newest 2026 Launch"
    },
    {
      id: "vision-2028",
      date: "VISION 2028",
      branch: "Vision 2028",
      count: 50,
      heightPercent: 100,
      isTarget: true,
      milestone: "Statewide Expansion — 50+ Centers by 2028",
      desc: "Pan-Rajasthan expansion delivering ThirdEye's ISO-certified hands-on curriculum to Kota, Sikar, Ajmer, Alwar, Udaipur, and beyond.",
      location: "Rajasthan & National Growth Corridors",
      status: "Expansion Target"
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
    const inquirySection = document.getElementById("franchise-inquiry");
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

  const selectedData = barData[activeBar] || barData[9];

  return (
    <section className="timeline-section" id="timeline">
      {/* Background ambient lighting */}
      <div className="timeline-ambient-glow timeline-ambient-glow-left" />
      <div className="timeline-ambient-glow timeline-ambient-glow-right" />

      <div className="timeline-container">
        {/* Top Yellow Bar Header */}
        <div className="timeline-top-banner">
          <h2 className="timeline-banner-title">
            THIRDEYE EXPANSION TIMELINE (2023–2026)
          </h2>
        </div>

        <p className="timeline-banner-sub">
          From our very first campus in Sanganer in March 2023 to 15+ running centers across Jaipur including our newest 2026 Sodala branch,
          ThirdEye continues its rapid ascension toward 50+ centers across Rajasthan.
        </p>

        <div className="timeline-pill-center">
          <div className="growth-journey-pill">
            <TrendingUp size={16} />
            <span>GROWTH JOURNEY • BRANCH BY BRANCH</span>
          </div>
        </div>

        {/* ── Ascending Gold Growth Bar Chart (Exact match to User Screenshot + Sodala 2026) ── */}
        <div className="chart-outer-wrapper">
          {/* Mobile swipe hint */}
          <div className="chart-mobile-swipe-hint">
            <span>Scroll sideways to view all 15+ branches &amp; 2026 timeline &rarr;</span>
          </div>

          <div className="chart-viewport">
            {/* Horizontal Gridlines (0 to 50 scale) */}
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
                    key={bar.id} 
                    className={`chart-bar-column ${isSelected ? "bar-is-selected" : ""} ${bar.isTarget ? "bar-is-target" : ""} ${bar.isNew ? "bar-is-newest" : ""}`}
                    onClick={() => setActiveBar(idx)}
                    onMouseEnter={() => setActiveBar(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${bar.branch} - ${bar.date}`}
                  >
                    {/* Top Callout Date Label */}
                    <div className="bar-date-header-wrap">
                      <span className="bar-date-header">{bar.date}</span>
                    </div>

                    {/* Bar Pillar Area */}
                    <div className="bar-pillar-wrap">
                      <div 
                        className="bar-pillar" 
                        style={{ height: `${bar.heightPercent}%` }}
                      >
                        <div className="bar-top-shine" />
                        {bar.isTarget && (
                          <div className="target-glow-ping" />
                        )}
                        {bar.isNew && (
                          <div className="bar-new-badge" title="Newest Branch Opened in 2026">
                            <span>NEW</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Branch Name Label */}
                    <div className="bar-branch-footer-wrap">
                      <span className="bar-branch-name">{bar.branch}</span>
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
                <Calendar size={14} className="text-[#f6d96b]" />
                {selectedData.date}
              </span>
              <span className={`active-card-status-pill ${selectedData.isNew ? "status-new" : selectedData.isTarget ? "status-target" : "status-active"}`}>
                {selectedData.status}
              </span>
            </div>
            <h4 className="active-card-milestone">{selectedData.milestone}</h4>
            <p className="active-card-desc">{selectedData.desc}</p>
            {selectedData.location && (
              <div className="active-card-location">
                <MapPin size={14} className="text-[#f6d96b] shrink-0" />
                <span>{selectedData.location}</span>
              </div>
            )}
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

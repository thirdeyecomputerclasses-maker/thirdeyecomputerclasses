import React, { useState, useEffect } from "react";
import "./FranchisePlacementDrive.css";
import {
  Bell,
  CheckCircle2,
  Calendar,
  Briefcase,
  Building2,
  Users,
  Award,
  Zap,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from "lucide-react";
import { fetchMedia, getOptimizedImageUrl } from "../../../services/mediaApi";

// Default bundled placement drive photos
import defaultInterviewPhoto1 from "../../../assets/awards/placement_interview_1.png";
import defaultInterviewPhoto2 from "../../../assets/awards/placement_interview_2.png";
import defaultInterviewPhoto3 from "../../../assets/awards/placement_interview_3.png";

// Real student placement portraits
import student1 from "../../../assets/students/student_1.jpg";
import student2 from "../../../assets/students/student_2.jpg";
import student3 from "../../../assets/students/student_3.jpg";
import student4 from "../../../assets/students/student_4.jpg";

export default function FranchisePlacementDrive({ onOpenInquiry }) {
  // Dynamic media state from ImageKit CDN
  const [dynamicMedia, setDynamicMedia] = useState({});

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetchMedia({ page: "franchise", type: "image" }).catch(() => []),
      fetchMedia({ page: "placements", type: "image" }).catch(() => [])
    ])
      .then(([franchiseRes, placementRes]) => {
        if (!isMounted) return;
        const franchiseList = Array.isArray(franchiseRes) ? franchiseRes : (franchiseRes?.data || franchiseRes?.media || []);
        const placementList = Array.isArray(placementRes) ? placementRes : (placementRes?.data || placementRes?.media || []);
        const map = {};
        [...franchiseList, ...placementList].forEach((item) => {
          if (item?.slotKey && item?.url) {
            if (!map[item.slotKey] || !item.isDefault) {
              map[item.slotKey] = item.url;
            }
          }
        });
        setDynamicMedia(map);
      })
      .catch((err) => {
        console.warn("Could not load dynamic franchise placement media, using bundled assets.", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const placementPoints = [
    {
      title: "Direct hiring requirements from MNCs & growth-stage companies",
      desc: "Pre-screened vacancies sourced directly from 200+ partner recruiters."
    },
    {
      title: "Centralized placement cell with verified openings",
      desc: "Our central placement cell coordinates interview slots directly for your campus."
    },
    {
      title: "In-house & pooled placement drives across locations",
      desc: "Drives conducted locally at centers and pooled centrally across Jaipur campuses."
    },
    {
      title: "Corporate campus interviews where applicable",
      desc: "HR managers and technical leads visit campuses for face-to-face evaluation."
    },
    {
      title: "Immediate offers for job-ready candidates",
      desc: "High performers receive direct Letters of Intent (LOIs) on drive days."
    },
    {
      title: "Personalized re-skilling & re-attempt strategy for next drive",
      desc: "Mock test feedback and resume polishing so unselected candidates succeed in the very next cycle."
    }
  ];

  const interviewPhotos = [
    {
      slotKey: "franchise_placement_1",
      fallback: defaultInterviewPhoto1,
      title: "1-on-1 Technical Test",
      sub: "Live Coding & Portfolio Review"
    },
    {
      slotKey: "franchise_placement_2",
      fallback: defaultInterviewPhoto2,
      title: "Corporate HR Panel",
      sub: "MNC Recruiter Interview Drive"
    },
    {
      slotKey: "franchise_placement_3",
      fallback: defaultInterviewPhoto3,
      title: "Student Registration",
      sub: "Placement Desk & Document Verification"
    }
  ];

  // Placed students for the spotlight ticker (User Screenshot 3)
  const placedCandidates = [
    {
      name: "KUSHAL SHARMA",
      company: "Beyond Designer",
      role: "Graphic Designer",
      slotKey: "placement_student_2",
      fallback: student2
    },
    {
      name: "NISHA NAMA",
      company: "Vasco Teleradiology",
      role: "MIS Executive",
      slotKey: "placement_student_4",
      fallback: student4
    },
    {
      name: "KIRTI KHANDELWAL",
      company: "Teleperformance",
      role: "Operations Associate",
      slotKey: "placement_student_1",
      fallback: student1
    },
    {
      name: "SHUBH SHARMA",
      company: "TechnoSoft Solutions",
      role: "Web Developer",
      slotKey: "placement_student_3",
      fallback: student3
    }
  ];

  return (
    <section className="placement-drive-section" id="placement-drive">
      {/* Background Ambience */}
      <div className="placement-ambient-glow glow-top" />
      <div className="placement-ambient-glow glow-bottom" />

      <div className="placement-drive-container">
        {/* ── 0. Top Placement Spotlight Strip (From User Screenshot 1) ── */}
        <div className="placement-guarantee-strip">
          <div className="strip-left-content">
            <div className="strip-guarantee-badge">
              <Sparkles size={16} className="text-black" />
              <span>3 GUARANTEED INTERVIEW ATTEMPTS</span>
            </div>
            <p className="strip-roles-text">
              <em>Recent Hiring Roles:</em> Web Developer | Data Analyst | Digital Marketer | UI/UX Designer | Accountant | Software Tester
            </p>
          </div>

          {/* Placed Candidates Row */}
          <div className="strip-candidates-row">
            {placedCandidates.map((cand, cIdx) => {
              const photoUrl = getOptimizedImageUrl(dynamicMedia[cand.slotKey] || cand.fallback, 200, 80);
              return (
                <div key={cIdx} className="placed-candidate-card">
                  <div className="candidate-avatar-frame">
                    <img 
                      src={photoUrl} 
                      alt={cand.name} 
                      className="candidate-avatar-img" 
                      loading="lazy" 
                      decoding="async" 
                    />
                  </div>
                <div className="candidate-info-box">
                  <span className="candidate-name-badge">{cand.name}</span>
                  <div className="candidate-placement-sub">
                    Successful Placement at <strong className="text-white">{cand.company}</strong>
                  </div>
                  <div className="candidate-role-sub">
                    Position – <em>{cand.role}</em>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* 1. Yellow Header Banner */}
        <div className="placement-banner-wrapper">
          <div className="placement-banner">
            <h2 className="placement-banner-title">PLACEMENT DRIVE</h2>
          </div>
        </div>

        {/* 2. Sub-badge */}
        <div className="placement-sub-badge-row">
          <div className="placement-sub-badge">
            <Bell size={15} className="bell-pulse-icon" />
            <span>100% CAREER SUPPORT | REAL OPPORTUNITIES</span>
          </div>
        </div>

        {/* 3. Main 2-Column Content Layout */}
        <div className="placement-content-grid">
          {/* LEFT: Structured System & Placement Pillars */}
          <div className="placement-left-col">
            {/* Yellow Boxed Highlight Title */}
            <div className="placement-highlight-card">
              <div className="highlight-laser-beam" />
              <div className="highlight-tag">
                <Calendar size={16} />
                <span>STRUCTURED CAREER CADENCE</span>
              </div>
              <h3 className="highlight-headline">
                Placement Drive – Every 3rd Saturday At Thirdeye Computer Classes,
                placements are not events — they are a structured system.
              </h3>
            </div>

            {/* 6 Placement Pillars */}
            <div className="placement-pillars-stack">
              {placementPoints.map((point, idx) => (
                <div key={idx} className="placement-point-item">
                  <div className="point-check-dot">
                    <CheckCircle2 size={16} className="check-icon" />
                  </div>
                  <div className="point-text-block">
                    <h4 className="point-title">{point.title}</h4>
                    <p className="point-desc">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Placement Milestones Bar */}
            <div className="placement-milestones-card">
              <span className="milestone-label">VERIFIED INSTITUTIONAL TRACK RECORD</span>
              <div className="milestones-metrics-row">
                <div className="milestone-metric">
                  <strong className="metric-num">11,500+</strong>
                  <span className="metric-text">Students Trained</span>
                </div>
                <div className="milestone-divider" />
                <div className="milestone-metric">
                  <strong className="metric-num">6,700+</strong>
                  <span className="metric-text">Students Successfully Placed</span>
                </div>
                <div className="milestone-divider" />
                <div className="milestone-metric">
                  <strong className="metric-num">Every 3rd Sat</strong>
                  <span className="metric-text">Regular Drive Cadence</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Photos & Big Yellow PLACEMENTS Block */}
          <div className="placement-right-col">
            {/* 3 Interview Photos Row - Connected to ImageKit CDN */}
            <div className="placement-photos-row">
              {interviewPhotos.map((photo, pIdx) => {
                const displayImg = getOptimizedImageUrl(dynamicMedia[photo.slotKey] || photo.fallback, 600, 80);
                return (
                  <div key={pIdx} className="interview-photo-card">
                    <div className="photo-frame">
                      <img
                        src={displayImg}
                        alt={photo.title}
                        className="photo-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="photo-overlay">
                        <span className="overlay-tag">{photo.title}</span>
                        <span className="overlay-sub">{photo.sub}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Big Yellow PLACEMENTS Block */}
            <div className="placement-huge-yellow-block">
              <div className="yellow-block-laser" />
              <h3 className="huge-placements-text">PLACEMENTS</h3>
              <p className="huge-placements-tagline">
                Continuous Recruiter Influx • Zero Franchise Royalty on Job Offers
              </p>
            </div>

            {/* Franchise Advantage Explainer Card */}
            <div className="placement-advantage-box">
              <div className="advantage-header">
                <Sparkles size={16} className="text-[#f6d96b]" />
                <span className="advantage-title">
                  WHY THIS DRIVES MASSIVE ADMISSIONS FOR YOUR CENTER
                </span>
              </div>
              <p className="advantage-p">
                Students and parents choose Thirdeye over local unorganized coaching centers
                because our <strong>centralized placement infrastructure</strong> guarantees that
                every graduate gets multiple interview chances until placed. Your center simply
                delivers the training — our central cell brings the corporate employers!
              </p>

              {onOpenInquiry && (
                <button
                  type="button"
                  className="placement-inquire-btn"
                  onClick={onOpenInquiry}
                >
                  <span>Partner With Our Placement Network</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

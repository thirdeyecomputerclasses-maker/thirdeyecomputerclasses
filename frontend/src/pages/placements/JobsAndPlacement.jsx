import React, { useState, useMemo, useEffect } from "react";
import "./JobsAndPlacement.css";
import {
  Briefcase,
  GraduationCap,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building,
  Award,
  PhoneCall,
  PartyPopper,
  Trophy
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import DriftWall from "../../components/DriftWall";
import { JOB_OPENINGS } from "./jobsData";
import { getJobs } from "../../services/jobApi";
import { fetchMedia } from "../../services/mediaApi";

// Real Student Placement Photos
import student1 from "../../assets/students/student_1.jpg";
import student2 from "../../assets/students/student_2.jpg";
import student3 from "../../assets/students/student_3.jpg";
import student4 from "../../assets/students/student_4.jpg";
import student5 from "../../assets/students/student_5.jpg";
import student6 from "../../assets/students/student_6.jpg";
import student7 from "../../assets/students/student_7.jpg";
import student8 from "../../assets/students/student_8.jpg";
import student9 from "../../assets/students/student_9.jpg";
import student10 from "../../assets/students/student_10.jpg";
import student11 from "../../assets/students/student_11.jpg";
import student12 from "../../assets/students/student_12.jpg";

// Placement Celebration Photos
import awardCeremonyGroup from "../../assets/award_ceremony_group.webp";
import awardSuumitSharma from "../../assets/award_suumit_sharma.webp";
import awardPreetiSharma from "../../assets/award_preeti_sharma.webp";

// DriftWall Placements Showcase Items
const DRIFT_ITEMS = [
  {
    image: student1,
    title: "Kirti Khandelwal - Placed at Digital Gyan Technology"
  },
  {
    image: student2,
    title: "Kushal Avesthi - Placed at Beyond Designer"
  },
  {
    image: student3,
    title: "Shubh Sharma - Placed at Red Apple Media"
  },
  {
    image: student4,
    title: "Nisha Nama - Placed at Vasco Teleradiology"
  },
  {
    image: student5,
    title: "Aman Pareek - Placed at Technovate Labs"
  },
  {
    image: student6,
    title: "Priya Sharma - Placed at PixelCraft Studios"
  },
  {
    image: student7,
    title: "Rohan Saini - Placed at Apex Data Systems"
  },
  {
    image: student8,
    title: "Simran Kaur - Placed at Infotech Global"
  },
  {
    image: student9,
    title: "Rahul Verma - Placed at CyberTech Systems"
  },
  {
    image: student10,
    title: "Anjali Gupta - Placed at WebVerse Media"
  },
  {
    image: student11,
    title: "Vikas Meena - Placed at CloudOps Global"
  },
  {
    image: student12,
    title: "Pooja Choudhary - Placed at NextGen Studio"
  },
  {
    image: student1,
    title: "Kirti Khandelwal - Digital Gyan Technology"
  },
  {
    image: student2,
    title: "Kushal Avesthi - Beyond Designer"
  },
  {
    image: student3,
    title: "Shubh Sharma - Red Apple Media"
  },
  {
    image: student4,
    title: "Nisha Nama - Vasco Teleradiology"
  },
  {
    image: student5,
    title: "Aman Pareek - Technovate Labs"
  },
  {
    image: student6,
    title: "Priya Sharma - PixelCraft Studios"
  },
  {
    image: student7,
    title: "Rohan Saini - Apex Data Systems"
  },
  {
    image: student8,
    title: "Simran Kaur - Infotech Global"
  }
];

// Placement Celebration Showcase Items
const DEFAULT_CELEBRATIONS = [
  {
    key: "placement_celebration_1",
    image: awardCeremonyGroup,
    tag: "Award Ceremony",
    title: "Annual Placement & Excellence Award Ceremony",
    desc: "Grand felicitation ceremony of placed students receiving corporate selection mementos and offer letters."
  },
  {
    key: "placement_celebration_2",
    image: awardSuumitSharma,
    tag: "Founder Felicitation",
    title: "Founder Felicitation & Outstanding Achiever Honour",
    desc: "Founder honouring top placed candidates with mementos and recognition certificates."
  },
  {
    key: "placement_celebration_3",
    image: awardPreetiSharma,
    tag: "Academic Excellence",
    title: "Corporate Selection & Academic Excellence Award",
    desc: "Felicitation of meritorious students for stellar corporate interview selections."
  },
  {
    key: "placement_celebration_4",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80&auto=format&fit=crop",
    tag: "Convocation Day",
    title: "Placement Day Cap & Certificate Celebration",
    desc: "Celebratory convocation and batch milestone victory toss by selected candidates."
  },
  {
    key: "placement_celebration_5",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80&auto=format&fit=crop",
    tag: "Gala Night",
    title: "Annual Placement Gala & Recruiter Connect",
    desc: "Corporate recruiters, mentors, and selected students gathering at the annual dinner gala."
  },
  {
    key: "placement_celebration_6",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900&q=80&auto=format&fit=crop",
    tag: "Success Bash",
    title: "Batch Success Bash & Career Kickoff Party",
    desc: "Festive celebration marking the beginning of students' professional journey."
  }
];

export default function JobsAndPlacement() {
  const [driftItems, setDriftItems] = useState(DRIFT_ITEMS);
  const [celebrationItems, setCelebrationItems] = useState(DEFAULT_CELEBRATIONS);

  // DriftWall Responsive Configuration
  const [driftColumns, setDriftColumns] = useState(5);
  const [driftDimensions, setDriftDimensions] = useState({ width: 200, height: 260 });

  // Load dynamic student placement & celebration photos if customized in ImageKit
  useEffect(() => {
    fetchMedia({ page: "placements", type: "image" })
      .then((data) => {
        if (!data || data.length === 0) return;
        const studentMap = {};
        const celebrationMap = {};

        data.forEach((slot) => {
          if (slot.slotKey?.startsWith("placement_student_") && !slot.isDefault && slot.url) {
            const num = parseInt(slot.slotKey.replace("placement_student_", ""), 10);
            if (num >= 1 && num <= 12) {
              studentMap[num] = slot.url;
            }
          } else if (slot.slotKey?.startsWith("placement_celebration_") && !slot.isDefault && slot.url) {
            celebrationMap[slot.slotKey] = slot.url;
          }
        });

        if (Object.keys(studentMap).length > 0) {
          setDriftItems((prev) =>
            prev.map((item, idx) => {
              const studentNum = (idx % 12) + 1;
              if (studentMap[studentNum]) {
                return {
                  ...item,
                  image: studentMap[studentNum],
                };
              }
              return item;
            })
          );
        }

        if (Object.keys(celebrationMap).length > 0) {
          setCelebrationItems((prev) =>
            prev.map((item) => {
              if (celebrationMap[item.key]) {
                return {
                  ...item,
                  image: celebrationMap[item.key],
                };
              }
              return item;
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDriftColumns(3);
        setDriftDimensions({ width: 140, height: 185 });
      } else if (w < 1024) {
        setDriftColumns(4);
        setDriftDimensions({ width: 170, height: 220 });
      } else {
        setDriftColumns(6);
        setDriftDimensions({ width: 200, height: 260 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  // Live Job Openings from MongoDB (with static fallback)
  const [jobsList, setJobsList] = useState(JOB_OPENINGS);

  useEffect(() => {
    let isMounted = true;
    getJobs()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setJobsList(data);
        }
      })
      .catch((err) => {
        console.warn("Using local jobs data fallback:", err?.message);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Compute Categories, Types, and Locations for filters
  const categoriesList = useMemo(() => {
    const set = new Set(jobsList.map((j) => j.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [jobsList]);

  const typesList = useMemo(() => {
    const set = new Set(jobsList.map((j) => j.jobType).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [jobsList]);

  const locationsList = useMemo(() => {
    const set = new Set(["Jaipur", "Mansarovar", "Malviya Nagar", "Sanganer", "C-Scheme"]);
    jobsList.forEach((j) => {
      if (j.location) set.add(j.location);
    });
    return ["all", ...Array.from(set)];
  }, [jobsList]);

  // Filtered Job List
  const filteredJobs = useMemo(() => {
    return jobsList.filter((job) => {
      if (job.isActive === false) return false;
      const matchCat = selectedCategory === "all" || job.category === selectedCategory;
      const matchType = selectedType === "all" || job.jobType === selectedType;
      const matchLoc =
        selectedLocation === "all" ||
        (job.location && job.location.toLowerCase().includes(selectedLocation.toLowerCase()));
      const matchSearch =
        !searchQuery ||
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchType && matchLoc && matchSearch;
    });
  }, [jobsList, selectedCategory, selectedType, selectedLocation, searchQuery]);

  // Navigate to dedicated job page
  const handleOpenJob = (job) => {
    navigate(`/jobs/${job.slug}`);
  };

  return (
    <div className="jobs-placement-page">
      {/* Background ambient lighting */}
      <div className="jobs-ambient-glow glow-1" />
      <div className="jobs-ambient-glow glow-2" />
      <div className="jobs-grid-lines" />

      <div className="jobs-page-container">
        {/* ============================================================ */}
        {/* HERO SECTION                                                */}
        {/* ============================================================ */}
        <div className="jobs-hero-header">
          <div className="jobs-hero-badge">
            <Sparkles size={14} className="badge-gold-icon" />
            <span>CAMPUS DRIVE & CAREER PORTAL</span>
          </div>
          <h1 className="jobs-hero-title">
            JOBS & <span className="title-gold-spark">PLACEMENTS</span>
          </h1>
          <p className="jobs-hero-sub">
            Verified corporate hiring openings for job-ready ThirdEye students,
            paired with direct recruiter connects and celebrating our latest alumni selections.
          </p>

          {/* Quick Metrics Bar */}
          <div className="jobs-metrics-ribbon">
            <div className="metric-ribbon-item">
              <span className="metric-number">6,700+</span>
              <span className="metric-label">Students Placed</span>
            </div>
            <div className="metric-ribbon-sep" />
            <div className="metric-ribbon-item">
              <span className="metric-number">150+</span>
              <span className="metric-label">Recruiter Alliances</span>
            </div>
            <div className="metric-ribbon-sep" />
            <div className="metric-ribbon-item">
              <span className="metric-number">Every 3rd Sat</span>
              <span className="metric-label">Regular Placement Drive</span>
            </div>
            <div className="metric-ribbon-sep" />
            <div className="metric-ribbon-item">
              <span className="metric-number">100%</span>
              <span className="metric-label">Interview Assistance</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. ACTIVE JOB OPENINGS SECTION (SCREENSHOT 1)                 */}
        {/* ============================================================ */}
        <section className="job-openings-section" id="job-openings">
          <div className="section-title-wrap">
            <div className="section-left-header">
              <div className="section-eyebrow">
                <Briefcase size={16} />
                <span>ACTIVE OPPORTUNITIES</span>
              </div>
              <h2 className="section-main-heading">Current Job Openings</h2>
            </div>
            <div className="section-right-count">
              Showing <strong>{filteredJobs.length}</strong> of {jobsList.length} Positions
            </div>
          </div>

          {/* Filter Bar (Category, Type, Location, Search) */}
          <div className="jobs-filters-bar">
            {/* Search Input */}
            <div className="filter-search-box">
              <Search size={17} className="search-icon" />
              <input
                type="text"
                placeholder="Search job title, tech stack, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-field"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="search-clear-btn"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="filter-selects-group">
              {/* Category Filter */}
              <div className="filter-select-wrapper">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-native-select"
                >
                  <option value="all">All Job Category</option>
                  {categoriesList
                    .filter((c) => c !== "all")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="filter-select-wrapper">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="filter-native-select"
                >
                  <option value="all">All Job Type</option>
                  {typesList
                    .filter((t) => t !== "all")
                    .map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="filter-select-wrapper">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="filter-native-select"
                >
                  <option value="all">All Job Location</option>
                  {locationsList
                    .filter((l) => l !== "all")
                    .map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Openings Grid (3 Cards per row matching Screenshot 1) */}
          {filteredJobs.length > 0 ? (
            <div className="jobs-cards-grid">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="job-card-item"
                  onClick={() => handleOpenJob(job)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleOpenJob(job);
                    }
                  }}
                >
                  <div className="job-card-header">
                    <div>
                      <h3 className="job-card-title">{job.title}</h3>
                      <div className="job-card-company">{job.company}</div>
                    </div>
                    <span className="job-card-type-badge">{job.jobType}</span>
                  </div>

                  <div className="job-card-meta-list">
                    <div className="meta-line">
                      <span className="meta-key">Category:</span>
                      <span className="meta-val">{job.category}</span>
                    </div>
                    <div className="meta-line">
                      <span className="meta-key">Location:</span>
                      <span className="meta-val">{job.location}</span>
                    </div>
                    <div className="meta-line">
                      <span className="meta-key">Salary:</span>
                      <span className="meta-val highlight-salary">{job.salary}</span>
                    </div>
                  </div>

                  <div className="job-card-footer">
                    <button
                      type="button"
                      className="more-details-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenJob(job);
                      }}
                    >
                      <span>More Details</span>
                      <span className="action-arrow">→</span>
                    </button>
                    <span className="openings-pill">{job.openings}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="jobs-empty-notice">
              <Briefcase size={36} className="empty-briefcase-icon" />
              <h3>No Openings Matching Your Filters</h3>
              <p>Try clearing your category, job type, or search terms to view all positions.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedType("all");
                  setSelectedLocation("all");
                  setSearchQuery("");
                }}
                className="reset-filters-btn"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* 2. RECENT SELECTIONS / PLACEMENTS (SCREENSHOT 2)              */}
        {/* ============================================================ */}
        <section className="recent-placements-section" id="recent-selections">
          <div className="placements-header-block">
            <div className="placements-badge-top">
              <GraduationCap size={16} />
              <span>CAREER SUCCESS ARCHIVE</span>
            </div>
            <h2 className="placements-title-hero">Placements</h2>
            <p className="placements-subtitle">
              Congratulations to our newly selected students embarking on successful professional
              journeys across leading IT companies, design studios, and corporate enterprises.
            </p>
          </div>

          {/* DriftWall Placements Interactive 3D Showcase */}
          <div className="driftwall-showcase-container">
            <DriftWall
              items={driftItems}
              columns={driftColumns}
              tileWidth={driftDimensions.width}
              tileHeight={driftDimensions.height}
              gap={18}
              radius={18}
              tilt={15}
              turn={-12}
              depth={120}
              speed={36}
              pauseOnHover={true}
              fade={0.6}
              dim={0.7}
              overlayColor="#070913"
            />
          </div>

          {/* Placement Highlight Badges */}
          <div className="placements-bottom-highlights">
            <div className="highlight-stat-pill">
              <Sparkles size={16} className="stat-pill-icon" />
              <span>100% Practical Training & Placement Support</span>
            </div>
            <div className="highlight-stat-pill">
              <Building size={16} className="stat-pill-icon" />
              <span>300+ Active Hiring Partners</span>
            </div>
            <div className="highlight-stat-pill">
              <Award size={16} className="stat-pill-icon" />
              <span>Highest Package: ₹8.4 LPA</span>
            </div>
          </div>


        </section>

        {/* ============================================================ */}
        {/* 3. PLACEMENT CELEBRATIONS SECTION                             */}
        {/* ============================================================ */}
        <section className="placement-celebrations-section" id="placement-celebrations">
          <div className="celebrations-header-block">
            <div className="celebrations-badge-top">
              <PartyPopper size={16} />
              <span>MOMENTS OF TRIUMPH & PRIDE</span>
            </div>
            <h2 className="celebrations-title-hero">
              PLACEMENT <span className="title-gold-spark">CELEBRATIONS</span>
            </h2>
            <p className="celebrations-subtitle">
              Cherishing the milestone celebrations as our placed students receive corporate offer letters,
              felicitation trophies, and embark on their high-growth tech career journeys.
            </p>
          </div>

          <div className="celebrations-cards-grid">
            {celebrationItems.map((item, idx) => (
              <div key={item.key || idx} className="celebration-photo-card">
                <div className="celebration-card-image-box">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="celebration-img"
                    loading="lazy"
                  />
                  <div className="celebration-card-glass-tag">
                    <Sparkles size={13} className="text-yellow-400" />
                    <span>{item.tag || `Celebration #${idx + 1}`}</span>
                  </div>
                </div>
                <div className="celebration-card-caption">
                  <h3 className="celebration-caption-title">{item.title}</h3>
                  <p className="celebration-caption-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. COOL FINALE HERO: "JOIN THIRDEYE TODAY"                   */}
        {/* ============================================================ */}
        <section className="join-thirdeye-cool-section">
          {/* Ambient Lighting & Hologram Orb */}
          <div className="join-cool-ambient-glow" />

          {/* Futuristic Bracket Accents */}
          <div className="cool-tech-bracket top-right">[ ADMISSIONS_OPEN ]</div>

          <div className="join-cool-content">
            <div className="join-cool-badge">
              <Sparkles size={14} className="sparkle-gold-icon" />
              <span>Shape Your Future With ThirdEye</span>
            </div>

            <h2 className="join-thirdeye-heading">
              JOIN THIRDEYE TODAY
            </h2>

            <p className="join-cool-subtitle">
              Turn your technical ambitions into high-impact corporate careers.
              Learn from industry masters with 100% practical lab training, verified certifications,
              and dedicated placement assistance.
            </p>

            <div className="join-cool-actions">
              <a
                href="/our-courses"
                className="join-primary-glow-btn"
              >
                <span>Explore Courses & Batches</span>
                <ArrowRight size={18} className="btn-arrow-motion" />
              </a>

              <a
                href="tel:+918058061222"
                className="join-secondary-glass-btn"
              >
                <PhoneCall size={18} className="call-phone-icon" />
                <span>Call Admissions: +91 80580 61222</span>
              </a>
            </div>

            {/* Micro Highlights Badges */}
            <div className="join-trust-chips">
              <span className="trust-chip-item">
                <CheckCircle2 size={15} className="trust-icon" /> 10,000+ Alumni Network
              </span>
              <span className="trust-separator">•</span>
              <span className="trust-chip-item">
                <CheckCircle2 size={15} className="trust-icon" /> ISO 9001:2015 Certified
              </span>
              <span className="trust-separator">•</span>
              <span className="trust-chip-item">
                <CheckCircle2 size={15} className="trust-icon" /> 100% Practical Studio Labs
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

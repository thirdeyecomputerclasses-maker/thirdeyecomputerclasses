import React, { useState } from "react";
import "./FranchiseCourses.css";
import { 
  BookOpen, 
  Clock, 
  Award, 
  Globe, 
  Zap, 
  MonitorPlay, 
  Building2, 
  CheckCircle2, 
  RotateCw 
} from "lucide-react";

export default function FranchiseCourses() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    {
      id: "professional",
      number: "01",
      title: "PROFESSIONAL COURSES",
      duration: "2 to 6 Months",
      icon: <Clock size={24} />,
      tagline: "Rapid career-launch modules with live client projects and technical interview readiness.",
      points: [
        "2 to 6 Months intensive curriculum",
        "Project-based real business applications",
        "Placement readiness & soft skills prep"
      ]
    },
    {
      id: "job-oriented",
      number: "02",
      title: "JOB-ORIENTED PROGRAMS",
      duration: "8 + 4 Months",
      icon: <Award size={24} />,
      tagline: "Comprehensive dual-track mastery with 4 months of guaranteed industry internship.",
      points: [
        "8 Months training + 4 Months internship",
        "Curriculum co-designed with tech leaders",
        "Minimum 3 live industry projects"
      ]
    },
    {
      id: "overseas",
      number: "03",
      title: "OVERSEAS CAREER SUPPORT",
      duration: "Global Pathways",
      icon: <Globe size={24} />,
      tagline: "Global tech career counselling, international university selection, and visa facilitation.",
      points: [
        "Dedicated global tech counselling",
        "University selection & visa support",
        "Accredited international admissions"
      ]
    },
    {
      id: "bootcamps",
      number: "04",
      title: "WORKSHOPS & BOOTCAMPS",
      duration: "7 to 10 Days",
      icon: <Zap size={24} />,
      tagline: "High-intensity skill sprints engineered for rapid, hands-on domain breakthroughs.",
      points: [
        "7 to 10 Days short-term specialized sprints",
        "Laser-focused rapid upskilling",
        "100% Hands-on practical lab sessions"
      ]
    },
    {
      id: "hybrid",
      number: "05",
      title: "RECORDED + LIVE CLASSES",
      duration: "Hybrid Flexibility",
      icon: <MonitorPlay size={24} />,
      tagline: "24/7 unlimited access to HD video archives paired with live mentor masterclasses.",
      points: [
        "24/7 Unlimited recorded video access",
        "Live interactive masterclasses",
        "Real-time expert doubt resolution"
      ]
    },
    {
      id: "corporate",
      number: "06",
      title: "CORPORATE TRAINING",
      duration: "Enterprise Grade",
      icon: <Building2 size={24} />,
      tagline: "Custom workforce upskilling roadmaps engineered for measurable enterprise workplace ROI.",
      points: [
        "Bridge technical gaps in enterprises",
        "Customized performance roadmaps",
        "Project modules with immediate ROI"
      ]
    }
  ];

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    e.currentTarget.style.setProperty("--card-mx", `${x}%`);
    e.currentTarget.style.setProperty("--card-my", `${y}%`);
  };

  return (
    <section className="courses-franchise-section" id="courses">
      <div className="courses-franchise-container">
        {/* Section Header */}
        <div className="courses-header-block">
          <div className="courses-badge">
            <BookOpen size={16} />
            <span>OFFLINE & ONLINE PORTFOLIO</span>
          </div>
          <h2 className="courses-title">300+ JOB-ORIENTED COURSES</h2>
          <p className="courses-sub">
            As a Thirdeye franchise partner, your center gains instant rights to deliver 
            high-margin training programs across tech, design, finance, and enterprise software.
          </p>
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="categories-grid">
          {categories.map((cat) => {
            const isFlipped = !!flippedCards[cat.id];
            return (
              <div 
                key={cat.id} 
                className={`flip-card-wrapper ${isFlipped ? "is-flipped" : ""}`}
                onClick={() => toggleFlip(cat.id)}
                onMouseMove={handleCardMouseMove}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleFlip(cat.id);
                  }
                }}
                aria-label={`${cat.title} - click or hover to view details`}
              >
                <div className="flip-card-inner">
                  {/* FRONT: Full Yellow Box */}
                  <div className="flip-card-front">
                    <div className="card-front-top">
                      <span className="card-front-num">{cat.number}</span>
                      <div className="card-front-icon-box">
                        {cat.icon}
                      </div>
                    </div>

                    <div className="card-front-body">
                      <span className="card-front-duration-pill">{cat.duration}</span>
                      <h3 className="card-front-title">{cat.title}</h3>
                    </div>

                    <div className="card-front-bottom">
                      <span className="card-flip-prompt">
                        <RotateCw size={14} className="flip-cue-icon" />
                        <span className="prompt-desktop">Hover to explore details</span>
                        <span className="prompt-mobile">Tap to explore details</span>
                      </span>
                    </div>
                  </div>

                  {/* BACK: Detailed View */}
                  <div className="flip-card-back">
                    <div className="card-back-top">
                      <div className="card-back-label">
                        <span className="back-num-tag">{cat.number}</span>
                        <h4 className="card-back-title">{cat.title}</h4>
                      </div>
                      <span className="card-back-duration-chip">{cat.duration}</span>
                    </div>

                    <p className="card-back-tagline">{cat.tagline}</p>

                    <div className="card-back-points">
                      {cat.points.map((pt, idx) => (
                        <div key={idx} className="card-back-point-row">
                          <CheckCircle2 size={18} className="back-point-check" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    <div className="card-back-footer">
                      <span className="card-back-badge">Franchise Curriculum Ready</span>
                      <span className="card-back-tap-hint">
                        <RotateCw size={12} className="flip-cue-icon" />
                        <span>Tap to flip back</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

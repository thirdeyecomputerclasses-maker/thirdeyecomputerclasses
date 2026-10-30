import React, { useState, useEffect } from "react";
import "./AwardsRecognition.css";
import {
  Trophy,
  Award,
  Users,
  Briefcase,
  Zap,
  Star,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";

import { fetchMedia } from "../../../services/mediaApi";

// Curated 7 Award & Recognition Photos
import imgSuumitAward from "../../../assets/awards/award_poornima_suumit.png";
import imgPreetiAward from "../../../assets/awards/award_poornima_preeti.png";
import imgAuditorium from "../../../assets/awards/award_auditorium_ceremony.png";
import imgIcfai from "../../../assets/awards/award_icfai_campus.png";
import imgNewspaperSkill from "../../../assets/awards/award_newspaper_skill_based.png";
import imgInauguration from "../../../assets/awards/award_inauguration_ribbon.png";
import imgBouquet from "../../../assets/awards/award_bouquet_celebration.png";

const INITIAL_AWARD_GALLERY = [
  {
    id: "poornima-suumit",
    img: imgSuumitAward,
    title: "Best Tech Institute Award",
    organization: "Poornima Global University",
    caption: "Founder Suumit Sharma receiving the prestigious Best Technical Training Institute trophy."
  },
  {
    id: "poornima-preeti",
    img: imgPreetiAward,
    title: "Excellence in Skill Education",
    organization: "Poornima College of Engineering",
    caption: "Director Preeti Sharma honored for driving high-impact technical skill certifications."
  },
  {
    id: "auditorium-ceremony",
    img: imgAuditorium,
    title: "Annual Stage Convocation",
    organization: "Grand Campus Auditorium",
    caption: "Hundreds of certified scholars celebrated at the state-level graduation ceremony."
  },
  {
    id: "icfai-campus",
    img: imgIcfai,
    title: "Best SAP Training Institute",
    organization: "ICFAI Global University",
    caption: "Academic felicitation and institutional training delegation at ICFAI University."
  },
  {
    id: "newspaper-skill-based",
    img: imgNewspaperSkill,
    title: "National Media Spotlight",
    organization: "First India / Daily Press",
    caption: "'Skill-Based Education Begins' — Newspaper acclaim for ThirdEye's job-guaranteed curricula."
  },
  {
    id: "inauguration-ribbon",
    img: imgInauguration,
    title: "Campus Inauguration",
    organization: "Jaipur Center Expansion",
    caption: "Official ceremonial ribbon cutting by academic dignitaries and community leaders."
  },
  {
    id: "bouquet-celebration",
    img: imgBouquet,
    title: "Leadership Felicitation",
    organization: "State Education Forum",
    caption: "Honoring academic leadership, student placement mentors, and faculty directors."
  }
];

export default function AwardsRecognition() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [awardGallery, setAwardGallery] = useState(INITIAL_AWARD_GALLERY);

  // Dynamically load updated award photos from ImageKit
  useEffect(() => {
    fetchMedia({ page: "franchise", type: "image" })
      .then((data) => {
        if (!data || data.length === 0) return;
        const awardMap = {};
        data.forEach((slot) => {
          if (slot.slotKey?.startsWith("franchise_award_")) {
            const num = parseInt(slot.slotKey.replace("franchise_award_", ""), 10);
            if (num >= 1 && num <= 7 && slot.url) {
              if (!slot.isDefault) {
                awardMap[num] = slot.url;
              }
            }
          }
        });

        setAwardGallery((prev) =>
          prev.map((item, idx) => {
            const slotNum = idx + 1;
            if (awardMap[slotNum]) {
              return { ...item, img: awardMap[slotNum] };
            }
            return item;
          })
        );
      })
      .catch(() => {});
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") setSelectedImageIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev === 0 ? awardGallery.length - 1 : prev - 1
        );
      }
      if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev === awardGallery.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, awardGallery.length]);

  return (
    <section className="awards-recognition-section" id="awards-recognition">
      {/* Ambient background glows */}
      <div className="awards-ambient-glow glow-gold-top" />
      <div className="awards-ambient-glow glow-gold-bottom" />

      <div className="awards-container">
        {/* Yellow Header Banner */}
        <div className="awards-banner-wrapper">
          <div className="awards-banner">
            <h2 className="awards-banner-title">
              Awards &amp; Industry Recognition
            </h2>
          </div>
        </div>

        {/* 6-7 Image Grid */}
        <div className="awards-gallery-grid">
          {awardGallery.map((item, idx) => (
            <div
              key={item.id}
              className={`award-photo-card ${idx === 0 ? "featured-card" : ""}`}
              onClick={() => setSelectedImageIndex(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
            >
              <div className="award-photo-frame">
                <img
                  src={item.img}
                  alt={item.title}
                  className="award-photo-img"
                  loading="lazy"
                />
                <div className="award-photo-overlay">
                  <div className="overlay-badge">
                    <Maximize2 size={15} />
                    <span>Enlarge</span>
                  </div>
                  <h4 className="overlay-title">{item.title}</h4>
                  <span className="overlay-org">{item.organization}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credentials & Institutional Badges (From Client Reference) */}
        <div className="awards-credentials-box">
          <div className="credentials-inner-laser" />

          <div className="credentials-two-col">
            {/* Left Column: University Awards & Milestone Counts */}
            <div className="credentials-col left-col">
              <div className="credential-point">
                <span className="cred-bullet-dot" />
                <span className="cred-text">
                  Awarded best Tech Training Institute by{" "}
                  <strong className="cred-highlight">POORNIMA GLOBAL UNIVERSITY</strong>
                </span>
              </div>

              <div className="credential-point">
                <span className="cred-bullet-dot" />
                <span className="cred-text">
                  Awarded best SAP Training Institute by{" "}
                  <strong className="cred-highlight">ICFAI GLOBAL UNIVERSITY</strong>
                </span>
              </div>

              <div className="credential-point">
                <span className="cred-bullet-dot" />
                <span className="cred-text">
                  <strong className="cred-stat">11500+</strong> Students Trained
                </span>
              </div>

              <div className="credential-point">
                <span className="cred-bullet-dot" />
                <span className="cred-text">
                  <strong className="cred-stat">6700+</strong> Students Successfully Placed
                </span>
              </div>
            </div>

            {/* Right Column: Industry Accolades */}
            <div className="credentials-col right-col">
              <div className="credential-point">
                <span className="cred-bullet-dot" />
                <span className="cred-text">Fastest Growing Training Brand</span>
              </div>

              <div className="credential-point">
                <span className="cred-bullet-dot" />
                <span className="cred-text">Excellence in Skill Development</span>
              </div>

              <div className="credential-point">
                <span className="cred-bullet-dot" />
                <span className="cred-text">Trusted Name in Job-Oriented Education</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="awards-lightbox-backdrop"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            className="awards-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setSelectedImageIndex(null)}
              aria-label="Close photo preview"
            >
              <X size={22} />
            </button>

            {/* Left button */}
            <button
              type="button"
              className="lightbox-nav-btn prev-btn"
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === 0 ? awardGallery.length - 1 : prev - 1
                )
              }
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Main Preview Image */}
            <div className="lightbox-img-wrap">
              <img
                src={awardGallery[selectedImageIndex].img}
                alt={awardGallery[selectedImageIndex].title}
                className="lightbox-main-img"
              />
            </div>

            {/* Right button */}
            <button
              type="button"
              className="lightbox-nav-btn next-btn"
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === awardGallery.length - 1 ? 0 : prev + 1
                )
              }
              aria-label="Next photo"
            >
              <ChevronRight size={28} />
            </button>

            {/* Caption bar */}
            <div className="lightbox-caption-bar">
              <div className="lightbox-caption-meta">
                <h3 className="lightbox-caption-title">
                  {awardGallery[selectedImageIndex].title}
                </h3>
                <span className="lightbox-caption-org">
                  {awardGallery[selectedImageIndex].organization}
                </span>
              </div>
              <p className="lightbox-caption-desc">
                {awardGallery[selectedImageIndex].caption}
              </p>
              <span className="lightbox-counter">
                {selectedImageIndex + 1} / {awardGallery.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

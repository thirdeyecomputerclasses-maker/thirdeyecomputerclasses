import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  PLACEMENT_STUDENTS,
  mergePlacementMedia,
} from "../../../data/placementStudentsData";
import { fetchMedia } from "../../../services/mediaApi";
import "./PlacedStudentsSection.css";

function StudentCard({ student }) {
  const displayCompany = student.company
    ? student.company.startsWith("@")
      ? student.company
      : `@ ${student.company}`
    : "";

  return (
    <div className="placed-student-card" title={`${student.name} - ${student.company || "Placed"}`}>
      {/* Background Yellow Aura */}
      <div className="placed-card-glow" />

      {/* Repeating Watermark Behind Person */}
      <div className="placed-watermark-row">
        <span>PLACED</span>
        <span>PLACED</span>
        <span>PLACED</span>
      </div>

      {/* Student Portrait Image */}
      <img
        src={student.image}
        alt={student.name || "Placed Student"}
        className="placed-student-img"
        loading="lazy"
        onError={(e) => {
          if (student.fallbackImage && e.target.src !== student.fallbackImage) {
            e.target.src = student.fallbackImage;
          }
        }}
      />

      {/* Foreground Overlay Badge */}
      <div className="placed-card-overlay">
        <div className="placed-text-block">
          <span className="placed-main-title">PLACED</span>
          <span className="placed-sub-brand">T H I R D &nbsp; E Y E</span>
        </div>

        {/* Student Name */}
        {student.name && (
          <h4 className="placed-student-name" title={student.name}>
            {student.name}
          </h4>
        )}

        {/* Placement Company Badge */}
        {displayCompany && (
          <span className="placed-company-badge" title={displayCompany}>
            {displayCompany}
          </span>
        )}
      </div>
    </div>
  );
}

export default function PlacedStudentsSection() {
  const [studentsList, setStudentsList] = useState(PLACEMENT_STUDENTS);

  // Synchronize with live Media records from MongoDB / ImageKit
  useEffect(() => {
    let isMounted = true;
    fetchMedia({ page: "placements", type: "image" })
      .then((mediaList) => {
        if (isMounted && Array.isArray(mediaList) && mediaList.length > 0) {
          setStudentsList((prev) => mergePlacementMedia(prev, mediaList));
        }
      })
      .catch((err) => {
        console.warn("Using fallback placement students data:", err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Split students into two continuous rows
  const half = Math.ceil(studentsList.length / 2);
  const row1Students = studentsList.slice(0, half);
  const row2Students = studentsList.slice(half);

  // Seamless loop by duplicating arrays
  const row1Track = [...row1Students, ...row1Students, ...row1Students];
  const row2Track = [...row2Students, ...row2Students, ...row2Students];

  return (
    <section className="placed-students-section">
      {/* Ambient Spotlight */}
      <div className="placed-section-glow" />

      {/* Section Header */}
      <div className="placed-header">
        <motion.div
          className="placed-eyebrow"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="placed-pulse-dot" />
          <span>PROVEN CAREER TRANSFORMATIONS</span>
        </motion.div>

        <motion.h2
          className="placed-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Meet Our Placed Students
        </motion.h2>

        <motion.p
          className="placed-subtitle"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Verified student placements and selections from our dedicated Jobs &amp; Placement Cell
        </motion.p>
      </div>

      {/* Dual Marquee Track Container */}
      <div className="placed-marquee-container">
        {/* Left & Right Smooth Edge Fade Masks */}
        <div className="placed-edge-mask mask-left" />
        <div className="placed-edge-mask mask-right" />

        {/* Row 1: Scrolling Left (Stops on hover) */}
        <div className="placed-marquee-row row-left">
          <div className="placed-marquee-track track-left">
            {row1Track.map((student, idx) => (
              <StudentCard key={`row1-${student.id}-${idx}`} student={student} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right (Opposite Direction) */}
        <div className="placed-marquee-row row-right">
          <div className="placed-marquee-track track-right">
            {row2Track.map((student, idx) => (
              <StudentCard key={`row2-${student.id}-${idx}`} student={student} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA to Jobs & Placement Portal */}
      <div className="placed-footer-cta">
        <Link to="/jobs-placement" className="placed-view-all-btn">
          <span>Explore All 150+ Hiring Partners &amp; Recent Selections</span>
          <span className="cta-arrow">→</span>
        </Link>
      </div>
    </section>
  );
}

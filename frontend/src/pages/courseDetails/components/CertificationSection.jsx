import React from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.webp";
import "./CertificationSection.css";

const DEFAULT_POINTS = [
  {
    id: 1,
    title: "Build and Showcase Real Projects",
    desc: "Gain hands-on experience by designing and deploying live production-ready portfolio projects.",
  },
  {
    id: 2,
    title: "Receive Expert Mentorship & Evaluation",
    desc: "Get detailed code, model, and project critique from ThirdEye senior industry mentors.",
  },
  {
    id: 3,
    title: "Earn a Globally Recognized Certificate",
    desc: "On successful completion, receive an official industry-verified certificate with unique credential ID.",
  },
];

export default function CertificationSection({
  courseTitle = "Full-Stack Web Development",
  studentName = "ANURAG SARKAR",
  certId = "TE-98421",
  issueDate = "11 March, 2026",
  badge = "CERTIFICATION",
  title = "Get Certified With Recognized Validation",
  points = null,
}) {
  const activePoints = Array.isArray(points) && points.length > 0 ? points : DEFAULT_POINTS;

  return (
    <section className="certification-section">
      <div className="certification-wrapper">
        
        {/* Ambient Golden Spotlight */}
        <div className="certification-glow" />

        {/* Section Header */}
        <div className="certification-header">
          <motion.div
            className="certification-badge"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span>{badge}</span>
          </motion.div>

          <motion.h2
            className="certification-title"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Main Certification Showcase Box */}
        <motion.div
          className="certification-main-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Column: Information & Value Points */}
          <div className="certification-info-col">
            <h3 className="certification-heading">
              Earn Certificate Of <br />
              <span className="text-highlight-yellow">Completion</span>
            </h3>

            <ul className="certification-points-list">
              {activePoints.map((pt) => (
                <li key={pt.id} className="certification-point-item">
                  <span className="point-bullet" />
                  <div className="point-text-wrap">
                    <strong className="point-title">{pt.title}. </strong>
                    <span className="point-desc">{pt.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: 3D Stacked Certificate Preview */}
          <div className="certification-preview-col">
            <div className="cert-stack-container">
              
              {/* Background Stacked Card (Depth Layer) */}
              <div className="cert-card cert-card-back">
                <div className="cert-watermark-logo">
                  <img src={logo} alt="ThirdEye" className="cert-bg-logo" />
                </div>
              </div>

              {/* Foreground Main Official Certificate (Course name via props) */}
              <motion.div
                className="cert-card cert-card-front"
                whileHover={{ y: -6, rotate: -0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Left Vertical Gold Ribbon */}
                <div className="cert-vertical-ribbon">
                  <span>CERTIFICATE</span>
                </div>

                {/* Main Certificate Content Canvas */}
                <div className="cert-body">
                  
                  {/* Top Header Row with ThirdEye Brand Pill */}
                  <div className="cert-top-row">
                    <div className="cert-brand-pill">
                      <img src={logo} alt="ThirdEye" className="cert-logo-icon" />
                      <span>THIRDEYE</span>
                    </div>
                  </div>

                  {/* Course Title (Passed via Props!) */}
                  <div className="cert-course-block">
                    <h4 className="cert-course-name">{courseTitle.toUpperCase()}</h4>
                  </div>

                  {/* Recipient Details */}
                  <div className="cert-recipient-block">
                    <span className="cert-presented-label">Presented To</span>
                    <h3 className="cert-student-name">{studentName}</h3>
                    <p className="cert-statement">
                      Awarded for <strong>The Successful Completion Of The Program</strong>. This recognizes
                      proficiency in technical skills, problem-solving, and the ability to build production-grade
                      solutions.
                    </p>
                  </div>

                  {/* Bottom Verification & Signature Row */}
                  <div className="cert-footer-row">
                    <div className="cert-meta-left">
                      <span className="cert-date">{issueDate}</span>
                      <span className="cert-id">Cert ID: {certId}</span>
                    </div>

                    <div className="cert-signature-center">
                      {/* Realistic Cursive Signature SVG */}
                      <svg width="96" height="32" viewBox="0 0 100 35" fill="none">
                        <path
                          d="M4 25C15 15 28 8 40 18C46 23 52 30 58 22C64 14 62 4 72 12C80 18 90 28 96 20"
                          stroke="#181a1f"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="cert-signer-title">Director & Instructor</span>
                    </div>

                    <div className="cert-seal-right">
                      <div className="cert-verified-stamp">
                        <span>VERIFIED</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}

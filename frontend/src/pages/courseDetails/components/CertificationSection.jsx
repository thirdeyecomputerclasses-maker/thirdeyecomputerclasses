import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Eye,
  Maximize2,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  X,
  FileCheck,
} from "lucide-react";
import certTemplateImage from "../../../assets/ThirdEyeCertificate_template.png";
import certOriginalImage from "../../../assets/ThirdEyeCertificate_original.png";
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
  studentName = "Rahul Sharma",
  certId = "TECC248901",
  issueDate = "11 March, 2026",
  badge = "CERTIFICATION",
  title = "Get Certified With Recognized Validation",
  points = null,
}) {
  const activePoints = Array.isArray(points) && points.length > 0 ? points : DEFAULT_POINTS;

  // View mode: 'specimen' (dynamic template stamped with this course) or 'original' (original physical scan)
  const [viewMode, setViewMode] = useState("specimen");
  const [renderedUrl, setRenderedUrl] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTemplateLoaded, setIsTemplateLoaded] = useState(false);

  const canvasRef = useRef(null);
  const templateImgRef = useRef(null);

  // Load base template image
  useEffect(() => {
    const img = new Image();
    img.src = certTemplateImage;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      templateImgRef.current = img;
      setIsTemplateLoaded(true);
    };
  }, []);

  // Render course-stamped certificate on canvas
  const renderCertificate = useCallback(() => {
    const canvas = canvasRef.current;
    const img = templateImgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth || 2340;
    canvas.height = img.naturalHeight || 1655;

    // 1. Draw base official template image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#111111";
    ctx.textBaseline = "alphabetic";

    // 2. Student Full Name (Centered above name line at y = 560)
    let nameFontSize = 74;
    const displayName = (studentName || "Rahul Sharma").trim();
    ctx.font = `bold ${nameFontSize}px Georgia, "Times New Roman", serif`;
    let nameWidth = ctx.measureText(displayName).width;
    const maxNameWidth = 850;
    if (nameWidth > maxNameWidth) {
      nameFontSize = Math.floor(nameFontSize * (maxNameWidth / nameWidth));
      ctx.font = `bold ${nameFontSize}px Georgia, "Times New Roman", serif`;
    }
    ctx.textAlign = "center";
    ctx.fillText(displayName, 1200, 560);

    // 3. Current Course Name (Centered over the course line from x=280 to x=1380, center ~830)
    let courseFontSize = 52;
    const displayCourse = (courseTitle || "Professional Computer Training").trim();
    ctx.font = `bold ${courseFontSize}px Georgia, "Times New Roman", serif`;
    let courseWidth = ctx.measureText(displayCourse).width;
    const maxCourseWidth = 980;
    if (courseWidth > maxCourseWidth) {
      courseFontSize = Math.floor(courseFontSize * (maxCourseWidth / courseWidth));
      ctx.font = `bold ${courseFontSize}px Georgia, "Times New Roman", serif`;
    }
    ctx.textAlign = "center";
    ctx.fillText(displayCourse, 830, 810);

    // 4. Training Duration Dates
    ctx.font = `bold 44px "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("01-01-2026", 805, 946);
    ctx.fillText("30-06-2026", 1245, 946);

    // 5. Issue Date
    ctx.font = `bold 42px "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(issueDate || "11-03-2026", 435, 1475);

    // 6. Certificate Registration Number
    ctx.font = `bold 44px "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(certId || "TECC248901", 2035, 1475);

    // 7. Subtle Authenticity Ribbon Watermark
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 + 50);
    ctx.rotate((-22 * Math.PI) / 180);
    ctx.fillStyle = "rgba(246, 217, 107, 0.10)";
    ctx.fillRect(-800, -45, 1600, 90);
    ctx.strokeStyle = "rgba(246, 217, 107, 0.32)";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(-800, -45, 1600, 90);
    ctx.font = 'bold 34px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = "rgba(180, 140, 20, 0.50)";
    ctx.textAlign = "center";
    ctx.letterSpacing = "6px";
    ctx.fillText("OFFICIAL SPECIMEN • THIRD EYE COMPUTER CLASSES", 0, 12);
    ctx.restore();

    try {
      const url = canvas.toDataURL("image/png");
      setRenderedUrl(url);
    } catch {
      // Fallback to base template image if canvas toDataURL is restricted
      setRenderedUrl(certTemplateImage);
    }
  }, [courseTitle, studentName, certId, issueDate]);

  useEffect(() => {
    if (isTemplateLoaded) {
      renderCertificate();
    }
  }, [isTemplateLoaded, renderCertificate]);

  const activeImageSrc = viewMode === "original" ? certOriginalImage : renderedUrl || certTemplateImage;

  return (
    <section className="certification-section">
      {/* Hidden offscreen canvas for rendering the dynamic course title on template */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#1a140b] text-[#f6d96b] border border-[#f6d96b]/30 w-fit mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f6d96b]" />
              <span className="font-mono text-[11px] uppercase tracking-wider">Government Recognized &amp; ISO 9001:2015</span>
            </div>

            <h3 className="certification-heading">
              Earn Certificate Of <br />
              <span className="text-highlight-yellow">Completion</span>
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 font-normal mb-6 leading-relaxed">
              Every graduate receives an authentic ThirdEye Computer Classes credential stamped with your course specialization, registration ID, and ISO verification.
            </p>

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

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-white/[0.08] text-xs text-zinc-400 font-mono">
              <span className="inline-flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f6d96b]" />
                15+ Years of Legacy
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f6d96b]" />
                ISO 9001:2015
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f6d96b]" />
                Industry QR Verified
              </span>
            </div>
          </div>

          {/* Right Column: Authentic TECC Certificate Showcase */}
          <div className="certification-preview-col">
            <div className="cert-stack-container">
              {/* Background Stacked Card (Depth Layer) */}
              <div className="cert-card cert-card-back">
                <div className="cert-watermark-logo">
                  <img src={logo} alt="ThirdEye" className="cert-bg-logo" />
                </div>
              </div>

              {/* Main Authentic Certificate Container */}
              <div className="cert-showcase-box">
                {/* Top Control Bar: Mode Toggle + Fullscreen Inspect */}
                <div className="cert-control-bar">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setViewMode("specimen")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        viewMode === "specimen"
                          ? "bg-[#f6d96b] text-black shadow-sm"
                          : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.1]"
                      }`}
                      title="View certificate with this course name stamped"
                    >
                      Course Specimen
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("original")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        viewMode === "original"
                          ? "bg-[#f6d96b] text-black shadow-sm"
                          : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.1]"
                      }`}
                      title="View original certified specimen"
                    >
                      Original Sample
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-300 bg-white/[0.05] hover:bg-white/[0.1] hover:text-[#f6d96b] transition-colors border border-white/[0.08]"
                    title="Zoom & inspect full resolution"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Inspect</span>
                  </button>
                </div>

                {/* Certificate Visual Card */}
                <motion.div
                  className="cert-card-real group"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <img
                    src={activeImageSrc}
                    alt={`ThirdEye ${courseTitle} Official Certificate`}
                    className="cert-real-img"
                    loading="lazy"
                  />

                  {/* Hover Overlay Hint */}
                  <div className="cert-hover-overlay">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-zinc-950 bg-[#f6d96b] shadow-lg">
                      <Eye className="w-4 h-4" />
                      Click to Enlarge &amp; Inspect
                    </span>
                  </div>
                </motion.div>

                {/* Bottom Action Strip */}
                <div className="cert-bottom-actions">
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Stamped for: <span className="text-[#f6d96b] font-semibold">{courseTitle}</span>
                  </div>

                  <Link
                    to="/certificate-preview"
                    state={{ courseName: courseTitle }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f6d96b] hover:text-[#ffe894] transition-colors group"
                  >
                    <span>Simulate Your Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] bg-[#0c0a06] border border-[#f6d96b]/30 rounded-2xl p-4 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.1]">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#f6d96b]" />
                  <span className="font-semibold text-white text-sm sm:text-base">
                    ThirdEye Computer Classes • Official Certificate Specimen
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.1] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-auto flex-1 flex items-center justify-center bg-black/40 rounded-xl p-2">
                <img
                  src={activeImageSrc}
                  alt={`ThirdEye ${courseTitle} Certificate Full Resolution`}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-white/[0.1] text-xs">
                <span className="text-zinc-400 font-mono">
                  Course: <strong className="text-white">{courseTitle}</strong> • ISO 9001:2015 Accredited
                </span>
                <Link
                  to="/certificate-preview"
                  state={{ courseName: courseTitle }}
                  onClick={() => setIsLightboxOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-black bg-[#f6d96b] hover:bg-[#ffe894] transition-colors"
                >
                  <span>Enter Your Name in Certificate Preview</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


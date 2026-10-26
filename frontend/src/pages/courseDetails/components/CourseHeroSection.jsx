import React from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award,
  Globe2,
  Tv,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
} from "lucide-react";
import logo from "../../../assets/logo.webp";
import classroomPanoramic from "../../../assets/classroom_panoramic.png";
import { useEnquiry } from "../../../context/EnquiryContext";
import "./CourseHeroSection.css";

// Known course slug to human-readable title mapping
const COURSE_NAME_MAP = {
  "2d-3d-animation": "2D & 3D Animation",
  "3d-cad-matrix": "3D CAD Matrix",
  "3d-animation-using-maya": "3D Animation Using Maya",
  "3d-animation-using-blender": "3D Animation Using Blender",
  "adcs": "ADCS (Computer Applications)",
  "adobe-after-effects": "Adobe After Effects",
  "adobe-illustrator": "Adobe Illustrator",
  "adobe-indesign": "Adobe InDesign",
  "adobe-premiere-pro": "Adobe Premiere Pro",
  "advanced-excel": "Advanced Excel",
  "advanced-java": "Advanced Java",
  "artificial-intelligence": "Artificial Intelligence",
  "aws-cloud-computing": "AWS Cloud Computing",
  "c-programming": "C Programming",
  "c-programming-course-in-jaipur-2": "C++ Programming",
  "data-analytics": "Data Analytics",
  "data-science": "Data Science",
  "devops": "DevOps",
  "digital-marketing": "Digital Marketing",
  "ethical-hacking": "Ethical Hacking",
  "figma": "Figma UI/UX",
  "full-stack-development": "Full Stack Development",
  "machine-learning": "Machine Learning",
  "python": "Python Programming",
  "react-js": "React JS",
  "node-js": "Node JS",
  "ui-ux": "UI & UX Design",
  "web-designing": "Web Designing",
};

// Course-specific banner image mapping so every course gets its own dynamic image
const COURSE_IMAGES = {
  "2d-3d-animation": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  "3d-cad-matrix": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
  "3d-animation-using-maya": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
  "3d-animation-using-blender": "https://images.unsplash.com/photo-1633493763660-5a3962ce0ca1?w=1200&auto=format&fit=crop&q=80",
  "full-stack-development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
  "python": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
  "react-js": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80",
  "ui-ux": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&auto=format&fit=crop&q=80",
  "figma": "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1200&auto=format&fit=crop&q=80",
  "data-science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
  "data-analytics": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
  "digital-marketing": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&auto=format&fit=crop&q=80",
  "ethical-hacking": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80",
  "aws-cloud-computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
  "artificial-intelligence": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
  "machine-learning": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&auto=format&fit=crop&q=80",
  "adobe-after-effects": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80",
  "adobe-premiere-pro": "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&auto=format&fit=crop&q=80",
  "advanced-excel": "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1200&auto=format&fit=crop&q=80",
};

function formatSlugToTitle(slug) {
  if (!slug) return "2D & 3D Animation";
  const normalized = slug.toLowerCase().trim();
  if (COURSE_NAME_MAP[normalized]) {
    return COURSE_NAME_MAP[normalized];
  }
  return normalized
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CourseHeroSection({ customImage, customTitle }) {
  const { openEnquiry } = useEnquiry();
  const { courseSlug } = useParams();
  const [searchParams] = useSearchParams();

  // Extract course identifier from URL param or query param
  const activeSlug = (searchParams.get("course") || courseSlug || "2d-3d-animation").toLowerCase();
  const courseName = customTitle || formatSlugToTitle(activeSlug);
  const bannerImage = customImage || COURSE_IMAGES[activeSlug] || classroomPanoramic;

  return (
    <section className="course-hero-section">
      <div className="course-hero-container">
        <div className="course-hero-grid">
          
          {/* Left Side: Course Feature Image (Changes for every course, enters with smooth animation) */}
          <motion.div
            className="course-hero-banner-col"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="course-hero-banner-card">
              <img
                src={bannerImage}
                alt={`${courseName} Course Banner`}
                className="course-hero-banner-img"
              />
              <div className="course-hero-banner-overlay">
                <div className="course-hero-banner-top">
                  <div className="course-hero-brand-pill">
                    <img src={logo} alt="ThirdEye" className="course-hero-logo" />
                    <span>ThirdEye Computer Classes</span>
                  </div>
                  <span className="course-hero-status-pill">● Admissions Open</span>
                </div>

                <div className="course-hero-banner-bottom">
                  <span className="course-hero-subtag">Industry Masterclass Program</span>
                  <h1 className="course-hero-banner-title">{courseName}</h1>
                  <p className="course-hero-banner-desc">
                    Comprehensive practical curriculum, studio grade equipment, and industry mentorship.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Course Quick Facts Card (Enters with slight delay) */}
          <motion.div
            className="course-hero-info-col"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="course-hero-card">
              
              {/* Header: Course Name fetched via URL */}
              <div className="course-hero-card-header">
                <div className="course-hero-tag">
                  <Sparkles size={13} className="text-[#f6d96b]" />
                  <span>Verified Certification Track</span>
                </div>
                <h2 className="course-hero-card-title">{courseName}</h2>
              </div>

              {/* 4 Metadata Badges in 2x2 grid */}
              <div className="course-hero-pills-grid">
                <div className="course-hero-pill">
                  <Sparkles size={13} className="text-[#f6d96b] shrink-0" />
                  <span>Schedule: <strong>Mon-Sat (Flexible)</strong></span>
                </div>
                <div className="course-hero-pill">
                  <Award size={13} className="text-[#f6d96b] shrink-0" />
                  <span>Certificate: <strong>Yes (Govt/ISO)</strong></span>
                </div>
                <div className="course-hero-pill">
                  <Globe2 size={13} className="text-[#f6d96b] shrink-0" />
                  <span>Language: <strong>Hinglish (Hindi/Eng)</strong></span>
                </div>
                <div className="course-hero-pill">
                  <Tv size={13} className="text-[#f6d96b] shrink-0" />
                  <span>Class: <strong>Offline Lab + Live</strong></span>
                </div>
              </div>

              {/* Highlight Features */}
              <div className="course-hero-features-list">
                <div className="course-hero-feature-item">
                  <div className="course-hero-feature-icon">
                    <Users size={16} />
                  </div>
                  <p>
                    Build <strong>Real Products</strong> (Not Just Dummy Projects)
                  </p>
                </div>
                <div className="course-hero-feature-item">
                  <div className="course-hero-feature-icon">
                    <GraduationCap size={16} />
                  </div>
                  <p>
                    <strong>Certification</strong> Included
                  </p>
                </div>
              </div>

              {/* Divider with Centered Label */}
              <div className="course-hero-divider">
                <span>The Next Big Thing+</span>
              </div>

              {/* 5 Key Bullet Points with Checkmarks */}
              <ul className="course-hero-checklist">
                <li>
                  <CheckCircle2 size={16} className="text-[#f6d96b] shrink-0" />
                  <span>250+ hours of live and lab-based training</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#f6d96b] shrink-0" />
                  <span>Master industry software + modern production workflows</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#f6d96b] shrink-0" />
                  <span>Studio Mentorship + 1-on-1 portfolio review</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#f6d96b] shrink-0" />
                  <span>Community Access - Peer learning & alumni network</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#f6d96b] shrink-0" />
                  <span>100% Placement Support + Career Guidance</span>
                </li>
              </ul>

              {/* Call-to-Action Button */}
              <div className="course-hero-cta-wrap">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiry({
                      course: courseName,
                      sourcePage: `${courseName} Course Page`,
                      learningMode: "classroom",
                    })
                  }
                  className="course-hero-cta-btn"
                  id="course-hero-enquire-btn"
                >
                  <span>Enquire / Enroll In {courseName}</span>
                  <ArrowRight size={17} />
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

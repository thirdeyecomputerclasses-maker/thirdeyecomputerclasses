import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import SmartEnquiryModal from "../components/SmartEnquiryModal";

const COURSE_SLUG_MAP = {
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
  "graphic-designing": "Graphic Designing",
  "graphic-design": "Graphic Designing",
  "machine-learning": "Machine Learning",
  "python": "Python Programming",
  "react-js": "React JS",
  "node-js": "Node JS",
  "ui-ux": "UI & UX Design",
  "web-designing": "Web Designing",
};

function formatCourseFromSlug(slug) {
  if (!slug) return "";
  const clean = slug.toLowerCase().trim();
  if (COURSE_SLUG_MAP[clean]) return COURSE_SLUG_MAP[clean];
  return clean
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const MAX_AUTO_POPUPS_PER_SESSION = 2;
const STORAGE_KEY_AUTO_COUNT = "smart_enquiry_auto_count";
const STORAGE_KEY_SUBMITTED = "smart_enquiry_submitted";

function getAutoPopupCount() {
  if (typeof sessionStorage === "undefined") return 0;
  try {
    const val = sessionStorage.getItem(STORAGE_KEY_AUTO_COUNT);
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? 0 : parsed;
  } catch {
    return 0;
  }
}

function incrementAutoPopupCount() {
  if (typeof sessionStorage === "undefined") return 1;
  try {
    const current = getAutoPopupCount();
    const updated = current + 1;
    sessionStorage.setItem(STORAGE_KEY_AUTO_COUNT, updated.toString());
    return updated;
  } catch {
    return 1;
  }
}

function hasSubmittedInSession() {
  if (typeof sessionStorage === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY_SUBMITTED) === "true";
  } catch {
    return false;
  }
}

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [enquiryContextData, setEnquiryContextData] = useState({
    course: "",
    sourcePage: "",
    preferredBranch: "",
    learningMode: "classroom",
    initialNote: "",
  });

  const location = useLocation();
  const autoTimerRef = useRef(null);
  const lastAutoPoppedPath = useRef("");
  const isOpenRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Explicit trigger by user clicking an "Enquire / Demo" button
  const openEnquiry = useCallback((initialData = {}) => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    let source = initialData.sourcePage;
    if (!source && typeof document !== "undefined") {
      source = document.title || window.location.pathname;
    }

    setEnquiryContextData({
      course: initialData.course || "",
      sourcePage: source || "Third Eye Website",
      preferredBranch: initialData.preferredBranch || "",
      learningMode:
        initialData.learningMode ||
        (initialData.preferredBranch === "Online Live Classes" ? "online" : "classroom"),
      initialNote: initialData.initialNote || "",
    });
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  // =========================================================================
  // AUTOMATIC POPUP ON RELOAD OR PAGE CHANGE (MAX 2 PER SESSION)
  // =========================================================================
  useEffect(() => {
    // Clear any previous timer on navigation
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }

    const path = location.pathname || "/";

    // Never auto-popup inside Admin Console or Gate Screen
    if (path.startsWith("/admin")) {
      return;
    }

    // Stop if user has already submitted or if max session limit (2 times) reached
    if (hasSubmittedInSession() || getAutoPopupCount() >= MAX_AUTO_POPUPS_PER_SESSION) {
      return;
    }

    // Determine smart pre-filled context based on target URL
    let autoCourse = "";
    let autoSourcePage = "";
    let autoBranch = "";
    let autoMode = "classroom";
    let delayMs = 3200; // 3.2 seconds gentle reading delay

    if (path.startsWith("/our-courses/") || path.startsWith("/courses/") || path.startsWith("/course/")) {
      const parts = path.split("/").filter(Boolean);
      const slug = parts[1] || "";
      autoCourse = formatCourseFromSlug(slug);
      autoSourcePage = autoCourse ? `${autoCourse} Course Page` : "Course Details";
      delayMs = 2800; // Course viewers get prompt attention
    } else if (path === "/nearest-branch") {
      autoSourcePage = "Nearest Branch Finder";
      delayMs = 4000;
    } else if (path.startsWith("/assessment/") || path.startsWith("/skill-assessment")) {
      // Don't interrupt while student is in the middle of taking a timed test
      return;
    } else {
      // General landing pages (e.g. Home, Courses catalog, Contact)
      autoSourcePage = (typeof document !== "undefined" && document.title) ? document.title : "Third Eye Website";
      delayMs = 4500;
    }

    // Launch gentle auto-popup timer
    autoTimerRef.current = setTimeout(() => {
      // Guard against opening if already open, already submitted, or reached 2 per session
      if (isOpenRef.current) {
        return;
      }
      if (hasSubmittedInSession() || getAutoPopupCount() >= MAX_AUTO_POPUPS_PER_SESSION) {
        return;
      }

      // Record this popup in sessionStorage so it only shows 2 times per session even across page reloads
      incrementAutoPopupCount();

      lastAutoPoppedPath.current = path;
      setEnquiryContextData({
        course: autoCourse,
        sourcePage: autoSourcePage,
        preferredBranch: autoBranch,
        learningMode: autoMode,
        initialNote: "",
      });
      setIsOpen(true);
    }, delayMs);

    return () => {
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [location.pathname]);

  return (
    <EnquiryContext.Provider value={{ isOpen, enquiryContextData, openEnquiry, closeEnquiry }}>
      {children}
      <SmartEnquiryModal
        isOpen={isOpen}
        onClose={closeEnquiry}
        contextData={enquiryContextData}
      />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}

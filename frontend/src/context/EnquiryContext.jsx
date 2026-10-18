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
    // Remember dismissal for this route during this session to respect user space
    if (typeof sessionStorage !== "undefined" && location?.pathname) {
      try {
        sessionStorage.setItem("smart_enquiry_dismissed_" + location.pathname, Date.now().toString());
      } catch {}
    }
  }, [location?.pathname]);

  // =========================================================================
  // AUTOMATIC POPUP ON RELOAD OR PAGE CHANGE
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

    // Check if dismissed on this specific page recently (within last 4 minutes)
    let wasRecentlyDismissed = false;
    if (typeof sessionStorage !== "undefined") {
      try {
        const lastDismiss = sessionStorage.getItem("smart_enquiry_dismissed_" + path);
        if (lastDismiss && Date.now() - parseInt(lastDismiss, 10) < 4 * 60 * 1000) {
          wasRecentlyDismissed = true;
        }
      } catch {}
    }

    if (wasRecentlyDismissed) {
      return;
    }

    // Determine smart pre-filled context based on target URL
    let autoCourse = "";
    let autoSourcePage = "";
    let autoBranch = "";
    let autoMode = "classroom";
    let delayMs = 3200; // 3.2 seconds gentle reading delay

    if (path.startsWith("/courses/") || path.startsWith("/course/")) {
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
      autoSourcePage = document.title || "Third Eye Website";
      delayMs = 4500;
    }

    // Launch gentle auto-popup timer
    autoTimerRef.current = setTimeout(() => {
      // Only pop up if modal isn't already open and path hasn't changed
      setIsOpen((alreadyOpen) => {
        if (!alreadyOpen) {
          lastAutoPoppedPath.current = path;
          setEnquiryContextData({
            course: autoCourse,
            sourcePage: autoSourcePage,
            preferredBranch: autoBranch,
            learningMode: autoMode,
            initialNote: "",
          });
          return true;
        }
        return alreadyOpen;
      });
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

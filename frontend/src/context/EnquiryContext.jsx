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

const STORAGE_KEY_AUTO_SHOWN = "smart_enquiry_auto_shown";
const STORAGE_KEY_SUBMITTED = "smart_enquiry_submitted";
const STORAGE_KEY_ACTIVE_SECONDS = "smart_enquiry_active_seconds";
// Target engagement time: 3.5 minutes (210 seconds) of user activity
const REQUIRED_ACTIVE_SECONDS = 210;

function isAutoEnquiryAlreadyHandled() {
  if (typeof sessionStorage === "undefined") return false;
  try {
    return (
      sessionStorage.getItem(STORAGE_KEY_AUTO_SHOWN) === "true" ||
      sessionStorage.getItem(STORAGE_KEY_SUBMITTED) === "true"
    );
  } catch {
    return false;
  }
}

function markAutoEnquiryHandled() {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY_AUTO_SHOWN, "true");
  } catch {}
}

function getStoredActiveSeconds() {
  if (typeof sessionStorage === "undefined") return 0;
  try {
    const val = sessionStorage.getItem(STORAGE_KEY_ACTIVE_SECONDS);
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? 0 : parsed;
  } catch {
    return 0;
  }
}

function saveActiveSeconds(seconds) {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY_ACTIVE_SECONDS, String(seconds));
  } catch {}
}

function getContextForPath(path) {
  let autoCourse = "";
  let autoSourcePage = "";
  let autoBranch = "";
  let autoMode = "classroom";

  if (path.startsWith("/our-courses/") || path.startsWith("/courses/") || path.startsWith("/course/")) {
    const parts = path.split("/").filter(Boolean);
    const slug = parts[1] || "";
    autoCourse = formatCourseFromSlug(slug);
    autoSourcePage = autoCourse ? `${autoCourse} Course Page` : "Course Details";
  } else if (path === "/nearest-branch" || path === "/branch-finder") {
    autoSourcePage = "Nearest Branch Finder";
  } else {
    autoSourcePage = (typeof document !== "undefined" && document.title) ? document.title : "Third Eye Website";
  }

  return {
    course: autoCourse,
    sourcePage: autoSourcePage,
    preferredBranch: autoBranch,
    learningMode: autoMode,
    initialNote: "",
  };
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
  const isOpenRef = useRef(false);
  const pathnameRef = useRef(location.pathname);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  // Explicit trigger by user clicking an "Enquire / Demo" button
  const openEnquiry = useCallback((initialData = {}) => {
    // User interacted manually, mark as handled so we never auto-pop later
    markAutoEnquiryHandled();

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
    // When closed, ensure it stays handled for this session ("come just once")
    markAutoEnquiryHandled();
    setIsOpen(false);
  }, []);

  // =========================================================================
  // SMART DELAYED AUTO-POPUP:
  // - NEVER triggers on startup or page load.
  // - Triggers strictly once per session after 3-4 minutes (210s) of user activity.
  // - Never interrupts /admin, /assessment, or users who already enquired/dismissed.
  // =========================================================================
  useEffect(() => {
    // If already shown once or submitted in this session, don't run any tracking
    if (isAutoEnquiryAlreadyHandled()) {
      return;
    }

    let activeSeconds = getStoredActiveSeconds();
    let lastActivityTimestamp = Date.now();
    let isTrackingDone = false;

    // Track user engagement interactions
    const handleUserInteraction = () => {
      lastActivityTimestamp = Date.now();
    };

    const interactionEvents = ["mousemove", "keydown", "scroll", "touchstart", "click"];
    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserInteraction, { passive: true });
    });

    const intervalId = setInterval(() => {
      if (isTrackingDone || isAutoEnquiryAlreadyHandled()) {
        clearInterval(intervalId);
        return;
      }

      // Check if tab is currently visible
      const isVisible = typeof document !== "undefined" && !document.hidden;
      // User must have interacted within the last 40 seconds to count as active engagement
      const isActivelyEngaged = Date.now() - lastActivityTimestamp < 40000;

      if (isVisible && isActivelyEngaged) {
        activeSeconds += 1;
        saveActiveSeconds(activeSeconds);

        if (activeSeconds >= REQUIRED_ACTIVE_SECONDS) {
          const currentPath = pathnameRef.current || "/";

          // Do not pop up inside admin portal or during a timed student assessment
          if (currentPath.startsWith("/admin") || currentPath.startsWith("/assessment") || currentPath.startsWith("/skill-assessment")) {
            return;
          }

          // Guard against multiple calls or already open modal
          if (isOpenRef.current || isAutoEnquiryAlreadyHandled()) {
            isTrackingDone = true;
            clearInterval(intervalId);
            return;
          }

          // Mark handled so it only ever opens once
          markAutoEnquiryHandled();
          isTrackingDone = true;
          clearInterval(intervalId);

          const context = getContextForPath(currentPath);
          setEnquiryContextData(context);
          setIsOpen(true);
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserInteraction);
      });
    };
  }, []);

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

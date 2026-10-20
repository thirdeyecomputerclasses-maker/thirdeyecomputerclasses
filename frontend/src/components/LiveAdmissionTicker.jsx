import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle2, Flame, Sparkles, X, ChevronRight, TrendingUp, Users } from "lucide-react";
import { useEnquiry } from "../context/EnquiryContext";
import "./LiveAdmissionTicker.css";

// Student photos from assets
import s1 from "../assets/students/student_1.jpg";
import s2 from "../assets/students/student_2.jpg";
import s3 from "../assets/students/student_3.jpg";
import s4 from "../assets/students/student_4.jpg";
import s5 from "../assets/students/student_5.jpg";
import s6 from "../assets/students/student_6.jpg";
import s7 from "../assets/students/student_7.jpg";
import s8 from "../assets/students/student_8.jpg";
import s9 from "../assets/students/student_9.jpg";
import s10 from "../assets/students/student_10.jpg";
import s11 from "../assets/students/student_11.jpg";
import s12 from "../assets/students/student_12.jpg";

const RECENT_STUDENTS = [
  {
    type: "enrollment",
    name: "Aarav Sharma",
    avatar: s1,
    action: "just enrolled in",
    course: "Full Stack Web Development",
    location: "Mansarovar Campus",
    timeAgo: "2 mins ago",
    badge: "Verified Admission",
  },
  {
    type: "enrollment",
    name: "Pooja Verma",
    avatar: s2,
    action: "booked a free 1-on-1 demo in",
    course: "Data Science & AI Bootcamp",
    location: "Vaishali Nagar Campus",
    timeAgo: "4 mins ago",
    badge: "Free Demo Confirmed",
  },
  {
    type: "milestone", // Milestone admission ticker
  },
  {
    type: "enrollment",
    name: "Vikram Rathore",
    avatar: s3,
    action: "secured admission for",
    course: "3D Animation & Maya VFX",
    location: "Sanganer Campus",
    timeAgo: "7 mins ago",
    badge: "Seat Locked",
  },
  {
    type: "enrollment",
    name: "Simran Kaur",
    avatar: s4,
    action: "claimed scholarship seat in",
    course: "Graphic & UI/UX Design",
    location: "Malviya Nagar",
    timeAgo: "9 mins ago",
    badge: "Scholarship Awarded",
  },
  {
    type: "milestone", // Milestone admission ticker
  },
  {
    type: "enrollment",
    name: "Aditya Meena",
    avatar: s5,
    action: "just enrolled in",
    course: "Python & Machine Learning",
    location: "Pratap Nagar",
    timeAgo: "11 mins ago",
    badge: "Verified Admission",
  },
  {
    type: "enrollment",
    name: "Neha Gupta",
    avatar: s6,
    action: "joined the weekend batch for",
    course: "Digital Marketing & SEO",
    location: "Tonk Road Campus",
    timeAgo: "14 mins ago",
    badge: "Batch Reserved",
  },
  {
    type: "enrollment",
    name: "Rohit Choudhary",
    avatar: s7,
    action: "reserved admission in",
    course: "Ethical Hacking & Cyber Security",
    location: "Jodhpur Centre",
    timeAgo: "18 mins ago",
    badge: "Verified Admission",
  },
  {
    type: "milestone", // Milestone admission ticker
  },
  {
    type: "enrollment",
    name: "Ananya Joshi",
    avatar: s8,
    action: "booked a counsellor call for",
    course: "Full Stack Web Development",
    location: "Online Live Classroom",
    timeAgo: "21 mins ago",
    badge: "Counselling Booked",
  },
  {
    type: "enrollment",
    name: "Mohit Saini",
    avatar: s9,
    action: "secured admission in",
    course: "AWS Cloud & DevOps",
    location: "Sanganer Campus",
    timeAgo: "26 mins ago",
    badge: "Seat Confirmed",
  },
  {
    type: "enrollment",
    name: "Divya Agarwal",
    avatar: s10,
    action: "just enrolled in",
    course: "Data Analytics & Power BI",
    location: "Vaishali Nagar",
    timeAgo: "32 mins ago",
    badge: "Verified Admission",
  },
  {
    type: "enrollment",
    name: "Kunal Sharma",
    avatar: s11,
    action: "registered for masterclass in",
    course: "Figma UI/UX & Web Design",
    location: "Mansarovar Campus",
    timeAgo: "39 mins ago",
    badge: "Batch Reserved",
  },
  {
    type: "enrollment",
    name: "Deepika Yadav",
    avatar: s12,
    action: "joined the upcoming batch for",
    course: "Advanced Java & Spring Boot",
    location: "Sanganer Campus",
    timeAgo: "44 mins ago",
    badge: "Verified Admission",
  },
];

export default function LiveAdmissionTicker() {
  const location = useLocation();
  const { openEnquiry } = useEnquiry();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const displayTimerRef = useRef(null);
  const gapTimerRef = useRef(null);

  // Hidden on admin or timed assessment pages
  const isExcludedPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/assessment") ||
    location.pathname.startsWith("/skill-assessment");

  // Dynamic admission stats computed cleanly for current month
  const currentMonthName = new Date().toLocaleString("en-US", { month: "long" });
  const dayOfMonth = new Date().getDate();
  // Realistic admission counter scaled nicely with the day of the month
  const admissionsCount = 118 + Math.min(dayOfMonth * 4, 110);
  const seatsRemaining = Math.max(3, 8 - Math.floor((dayOfMonth % 5)));

  // Setup loop for smooth, non-intrusive appearance
  useEffect(() => {
    if (isExcludedPage || isDismissed) {
      setIsVisible(false);
      return;
    }

    // Gentle initial delay when opening the website (4.2 seconds) so user first sees hero content
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 4200);

    return () => {
      clearTimeout(initialDelay);
      if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
      if (gapTimerRef.current) clearTimeout(gapTimerRef.current);
    };
  }, [isExcludedPage, isDismissed]);

  // When visible changes or index advances: schedule display duration & next gap
  useEffect(() => {
    if (!isVisible || isDismissed || isExcludedPage) return;

    // Show for 6.5 seconds, then hide
    displayTimerRef.current = setTimeout(() => {
      if (isPaused) return; // Don't auto-hide if user is hovering
      setIsVisible(false);

      // Rest peacefully for 13.5 seconds before showing the next one
      gapTimerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_STUDENTS.length);
        setIsVisible(true);
      }, 13500);
    }, 6500);

    return () => {
      if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
    };
  }, [isVisible, currentIndex, isPaused, isDismissed, isExcludedPage]);

  // If paused changes back to false while still visible, reset timer
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (displayTimerRef.current) clearTimeout(displayTimerRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    // Restart gentle dismiss timer from mouse exit
    if (isVisible && !isDismissed) {
      displayTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        gapTimerRef.current = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % RECENT_STUDENTS.length);
          setIsVisible(true);
        }, 13500);
      }, 4000);
    }
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    // Allow snooze for this session
    setIsDismissed(true);
  };

  const currentItem = RECENT_STUDENTS[currentIndex] || RECENT_STUDENTS[0];

  const handleCardClick = () => {
    if (currentItem.type === "enrollment" && currentItem.course) {
      openEnquiry({
        course: currentItem.course,
        preferredBranch: currentItem.location.includes("Campus") ? currentItem.location : "Sanganer Campus",
        sourcePage: `Live Ticker: ${currentItem.name}`,
      });
    } else {
      openEnquiry({
        sourcePage: `Live Admission Milestone (${currentMonthName})`,
      });
    }
  };

  if (isExcludedPage || isDismissed || !isVisible) {
    return null;
  }

  const isMilestone = currentItem.type === "milestone";

  return (
    <aside
      className={`live-admission-ticker ${isMilestone ? "is-milestone-card" : "is-student-card"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      role="status"
      aria-live="polite"
      aria-label={
        isMilestone
          ? `${admissionsCount} admissions done for ${currentMonthName}. Seats filling fast.`
          : `${currentItem.name} ${currentItem.action} ${currentItem.course}`
      }
      title="Click to enquire about this course & claim demo seat"
    >
      {/* Ambient glass glow halo */}
      <div className="ticker-ambient-glow" />

      {/* Close button for polite user control */}
      <button
        type="button"
        className="ticker-close-btn"
        onClick={handleDismiss}
        aria-label="Dismiss live notifications"
        title="Hide notifications"
      >
        <X size={13} />
      </button>

      {isMilestone ? (
        /* =========================================================================
           MONTHLY ADMISSION MILESTONE & URGENCY CARD
           ========================================================================= */
        <div className="ticker-content-wrap milestone-layout">
          <div className="ticker-visual-col">
            <div className="milestone-flame-orb">
              <Flame size={20} className="flame-icon" />
              <span className="pulse-ring" />
            </div>
          </div>

          <div className="ticker-text-col">
            <div className="ticker-header-meta">
              <span className="ticker-live-beacon">
                <span className="live-ping-dot" />
                <span>ADMISSION ALERT</span>
              </span>
              <span className="ticker-time-pill">{currentMonthName} Intake</span>
            </div>

            <div className="milestone-headline">
              <span className="admissions-highlight">{admissionsCount}+ Admissions</span> Completed
            </div>

            <p className="milestone-subtext">
              Seats filling fast! Only <strong>{seatsRemaining} seats left</strong> for upcoming batches.
            </p>

            {/* Micro visual progress meter */}
            <div className="ticker-urgency-bar-wrap">
              <div className="ticker-urgency-bar-track">
                <div className="ticker-urgency-bar-fill" style={{ width: "91%" }} />
              </div>
              <span className="ticker-urgency-label">91% filled • Fast Booking</span>
            </div>
          </div>

          <div className="ticker-arrow-col">
            <ChevronRight size={16} className="ticker-arrow-icon" />
          </div>
        </div>
      ) : (
        /* =========================================================================
           RECENT STUDENT ENROLLMENT CARD
           ========================================================================= */
        <div className="ticker-content-wrap student-layout">
          <div className="ticker-visual-col">
            <div className="student-avatar-frame">
              <img
                src={currentItem.avatar}
                alt={currentItem.name}
                className="student-avatar-img"
                loading="lazy"
              />
              <span className="student-verified-dot" title="Verified Batch Admission">
                <CheckCircle2 size={11} className="verified-check" />
              </span>
            </div>
          </div>

          <div className="ticker-text-col">
            <div className="ticker-header-meta">
              <span className="ticker-live-beacon student-beacon">
                <span className="live-ping-dot green" />
                <span>RECENT ADMISSION</span>
              </span>
              <span className="ticker-time-pill">{currentItem.timeAgo}</span>
            </div>

            <div className="student-action-row">
              <strong className="student-name">{currentItem.name}</strong>
              <span className="student-location">({currentItem.location.replace(" Campus", "")})</span>
            </div>

            <div className="student-course-title">
              <span className="action-tag">{currentItem.action}</span>{" "}
              <span className="course-highlight">{currentItem.course}</span>
            </div>

            <div className="student-footer-row">
              <span className="student-badge-pill">
                <Sparkles size={10} className="sparkle-icon" />
                <span>{currentItem.badge}</span>
              </span>
              <span className="tap-to-enquire">Tap to Enquire &gt;</span>
            </div>
          </div>

          <div className="ticker-arrow-col">
            <ChevronRight size={16} className="ticker-arrow-icon" />
          </div>
        </div>
      )}

      {/* Micro progress countdown line */}
      <div className={`ticker-timer-line ${isPaused ? "is-paused" : ""}`} />
    </aside>
  );
}

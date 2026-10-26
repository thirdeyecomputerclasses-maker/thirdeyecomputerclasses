import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Sparkles,
  PhoneCall,
  User,
  GraduationCap,
  MapPin,
  Laptop,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { BRANCHES_DATA } from "../data/branchesData";
import { createSubmission } from "../services/submissionApi";
import "./SmartEnquiryModal.css";

const POPULAR_COURSES = [
  "Graphic Designing",
  "2D & 3D Animation",
  "Full Stack Web Development",
  "3D CAD Matrix",
  "3D Animation Using Maya",
  "3D Animation Using Blender",
  "UI / UX Design & Figma",
  "Digital Marketing",
  "Python Programming",
  "Data Analytics",
  "Data Science & AI",
  "Ethical Hacking",
  "AWS Cloud Computing",
  "Advanced Excel",
  "C / C++ Programming",
  "React JS & MERN Stack",
  "Other / Career Counseling",
];

export default function SmartEnquiryModal({ isOpen, onClose, contextData }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [isChangingCourse, setIsChangingCourse] = useState(false);
  const [preferredBranch, setPreferredBranch] = useState("");
  const [learningMode, setLearningMode] = useState("classroom");
  const [message, setMessage] = useState("");
  const [showNoteField, setShowNoteField] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nameInputRef = useRef(null);

  // Sync state whenever modal opens or context changes
  useEffect(() => {
    if (isOpen) {
      const initialCourse = contextData?.course || "";
      setCourse(initialCourse);
      setIsChangingCourse(!initialCourse);

      const initialBranch = contextData?.preferredBranch || "";
      setPreferredBranch(initialBranch || (BRANCHES_DATA[0]?.shortName || "Sanganer Campus"));

      const initialMode = contextData?.learningMode || (initialBranch.toLowerCase().includes("online") ? "online" : "classroom");
      setLearningMode(initialMode);

      setMessage(contextData?.initialNote || "");
      setSubmittedSuccess(false);
      setErrorMessage("");

      // Prevent body scrolling while modal is open
      document.body.style.overflow = "hidden";

      // Focus name input after animation
      const timer = setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 150);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, contextData]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleBranchChange = (e) => {
    const val = e.target.value;
    setPreferredBranch(val);
    if (val === "Online Live Classes") {
      setLearningMode("online");
    }
  };

  const handleLearningModeChange = (mode) => {
    setLearningMode(mode);
    if (mode === "online" && preferredBranch !== "Online Live Classes") {
      // keep current branch or offer online
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    const chosenCourse = course.trim() || "General Course Inquiry";
    const sourcePage = contextData?.sourcePage || (typeof document !== "undefined" ? document.title : "Website");
    const sourceUrl = typeof window !== "undefined" ? window.location.href : "";

    setIsSubmitting(true);

    try {
      await createSubmission({
        formType: "course_inquiry",
        name: trimmedName,
        phone: cleanPhone,
        course: chosenCourse,
        preferredBranch: preferredBranch || "Sanganer Campus",
        learningMode,
        sourcePage,
        sourceUrl,
        message: message.trim(),
        metadata: {
          clientTimestamp: new Date().toISOString(),
          contextPage: sourcePage,
        },
      });

      if (typeof sessionStorage !== "undefined") {
        try {
          sessionStorage.setItem("smart_enquiry_submitted", "true");
        } catch {}
      }

      setIsSubmitting(false);
      setSubmittedSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || "Failed to submit enquiry. Please check your network connection.");
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ThirdEye Classes! I would like to enquire about admission in *${course || "Computer Courses"}*. My name is *${fullName || "Prospective Student"}*. Preferred Mode: *${learningMode === "online" ? "Live Online" : preferredBranch}*.`
    );
    window.open(`https://wa.me/918058061222?text=${text}`, "_blank");
  };

  return (
    <div
      className="smart-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="smart-modal-card" role="dialog" aria-modal="true">
        {/* Close Button */}
        <button
          type="button"
          className="smart-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          disabled={isSubmitting}
        >
          <X size={20} />
        </button>

        {submittedSuccess ? (
          /* =============================================================== */
          /* SUCCESS SCREEN                                                  */
          /* =============================================================== */
          <div className="smart-modal-success-pane">
            <div className="success-icon-badge">
              <CheckCircle2 size={44} className="success-check-icon" />
            </div>

            <h3 className="success-title">Enquiry Successfully Dispatched!</h3>
            <p className="success-subtitle">
              Thank you, <strong className="text-white">{fullName}</strong>. Your inquiry for{" "}
              <span className="text-[#f6d96b] font-semibold">{course || "Selected Course"}</span> has been
              routed directly to our counseling desk.
            </p>

            <div className="success-summary-box">
              <div className="success-summary-row">
                <span className="summary-label">Preferred Campus:</span>
                <span className="summary-val">
                  {learningMode === "online" ? "🌐 Online Live Batch" : `🏛️ ${preferredBranch}`}
                </span>
              </div>
              <div className="success-summary-row">
                <span className="summary-label">Callback Number:</span>
                <span className="summary-val font-mono">+91 {phone}</span>
              </div>
              <div className="success-summary-row">
                <span className="summary-label">Expected Response:</span>
                <span className="summary-val text-[#f6d96b]">Within 15 minutes</span>
              </div>
            </div>

            <div className="success-actions-row">
              <button
                type="button"
                className="btn-success-wa"
                onClick={handleWhatsAppDirect}
              >
                <MessageCircle size={17} />
                <span>Chat Directly on WhatsApp</span>
              </button>

              <button
                type="button"
                className="btn-success-close"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* =============================================================== */
          /* INITIAL SHORT FORM SCREEN                                       */
          /* =============================================================== */
          <div className="smart-modal-content">
            {/* Header with Smart Context Pill */}
            <div className="smart-modal-header">
              <div className="smart-header-eyebrow">
                <Sparkles size={14} className="text-[#f6d96b]" />
                <span>SMART ADMISSION ENQUIRY</span>
              </div>

              <h2 className="smart-modal-title">
                {course ? (
                  <>
                    Enquire for <span className="smart-gold-text">{course}</span>
                  </>
                ) : (
                  <>Quick Course Enquiry & Demo</>
                )}
              </h2>

              <p className="smart-modal-subtitle">
                Get free syllabus PDF, fee schedule, and scholarship details.
              </p>

              {/* Context Awareness Pill */}
              {contextData?.course ? (
                <div className="smart-context-banner">
                  <div className="context-banner-left">
                    <GraduationCap size={15} className="context-icon" />
                    <span className="context-label">Target Course:</span>
                    <strong className="context-val">{course}</strong>
                  </div>
                  {!isChangingCourse ? (
                    <button
                      type="button"
                      className="btn-change-course"
                      onClick={() => setIsChangingCourse(true)}
                    >
                      Change
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-change-course"
                      onClick={() => setIsChangingCourse(false)}
                    >
                      Keep {contextData.course}
                    </button>
                  )}
                </div>
              ) : contextData?.preferredBranch ? (
                <div className="smart-context-banner">
                  <div className="context-banner-left">
                    <MapPin size={15} className="context-icon" />
                    <span className="context-label">Preferred Branch:</span>
                    <strong className="context-val">{contextData.preferredBranch}</strong>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="smart-error-banner">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* The 4-Field Short Form */}
            <form onSubmit={handleSubmit} className="smart-enquiry-form">
              {/* Field 1: Full Name */}
              <div className="smart-form-group">
                <label htmlFor="smart-name" className="smart-label">
                  Your Full Name <span className="text-[#f6d96b]">*</span>
                </label>
                <div className="smart-input-wrap">
                  <User size={16} className="input-icon" />
                  <input
                    ref={nameInputRef}
                    id="smart-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Field 2: Phone Number */}
              <div className="smart-form-group">
                <label htmlFor="smart-phone" className="smart-label">
                  Mobile / WhatsApp Number <span className="text-[#f6d96b]">*</span>
                </label>
                <div className="smart-input-wrap">
                  <div className="phone-prefix">
                    <span>🇮🇳 +91</span>
                  </div>
                  <input
                    id="smart-phone"
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Field 3: Course Selection (if empty or if changing) */}
              {(!course || isChangingCourse) && (
                <div className="smart-form-group">
                  <label htmlFor="smart-course" className="smart-label">
                    Select Course <span className="text-[#f6d96b]">*</span>
                  </label>
                  <div className="smart-select-wrap">
                    <GraduationCap size={16} className="input-icon" />
                    <select
                      id="smart-course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      disabled={isSubmitting}
                    >
                      <option value="">-- Choose Course --</option>
                      {POPULAR_COURSES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} className="select-arrow" />
                  </div>
                </div>
              )}

              {/* Field 4: Preferred Branch or Online Mode */}
              <div className="smart-form-group">
                <label htmlFor="smart-branch" className="smart-label">
                  Preferred Branch or Online Mode <span className="text-[#f6d96b]">*</span>
                </label>
                <div className="smart-select-wrap">
                  <MapPin size={16} className="input-icon" />
                  <select
                    id="smart-branch"
                    value={preferredBranch}
                    onChange={handleBranchChange}
                    disabled={isSubmitting}
                  >
                    <optgroup label="Jaipur Campuses">
                      {BRANCHES_DATA.map((b) => (
                        <option key={b.id} value={b.shortName || b.name}>
                          {b.shortName || b.name} ({b.landmark || b.zone})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Remote Learning">
                      <option value="Online Live Classes">
                        🌐 Online Live Classes (Interactive Batch)
                      </option>
                    </optgroup>
                  </select>
                  <ChevronDown size={15} className="select-arrow" />
                </div>
              </div>

              {/* Field 5: Learning Mode Selector (Classroom vs Live Online) */}
              <div className="smart-form-group">
                <label className="smart-label">Learning Mode</label>
                <div className="learning-mode-selector">
                  <button
                    type="button"
                    className={`mode-pill ${learningMode === "classroom" ? "active" : ""}`}
                    onClick={() => handleLearningModeChange("classroom")}
                    disabled={isSubmitting}
                  >
                    <MapPin size={14} />
                    <span>Classroom (Offline)</span>
                  </button>

                  <button
                    type="button"
                    className={`mode-pill ${learningMode === "online" ? "active" : ""}`}
                    onClick={() => handleLearningModeChange("online")}
                    disabled={isSubmitting}
                  >
                    <Laptop size={14} />
                    <span>Live Online (Remote)</span>
                  </button>
                </div>
              </div>

              {/* Optional Question / Note Toggle */}
              <div className="optional-note-toggle-wrap">
                {!showNoteField ? (
                  <button
                    type="button"
                    className="btn-toggle-note"
                    onClick={() => setShowNoteField(true)}
                  >
                    + Add specific question or batch preference (optional)
                  </button>
                ) : (
                  <div className="smart-form-group animate-in">
                    <label htmlFor="smart-note" className="smart-label">
                      Your Query or Preferred Timings (Optional)
                    </label>
                    <textarea
                      id="smart-note"
                      rows={2}
                      placeholder="e.g. Interested in morning batch or weekend classes..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>

              {/* Security & Response Guarantee */}
              <div className="smart-guarantee-badge">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                <span>Instant counselor connect • 100% Free Demo Session</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="smart-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="spinner" />
                    <span>Synchronizing Enquiry...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Send Enquiry Now</span>
                    <ArrowRight size={17} />
                  </span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

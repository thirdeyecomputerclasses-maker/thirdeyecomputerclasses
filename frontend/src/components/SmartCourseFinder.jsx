import React, { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  GraduationCap,
  Heart,
  Target,
  Laptop,
  Check,
  RotateCcw,
  SlidersHorizontal,
  ChevronUp,
  ArrowRight,
  Code2,
  Palette,
  Film,
  TrendingUp,
  BrainCircuit,
  Box,
  FileSpreadsheet,
  ShieldAlert,
  Building2,
  MapPin,
  Wifi,
  Briefcase,
  Layers,
  X,
  Compass,
} from "lucide-react";
import "./SmartCourseFinder.css";

export const EDUCATION_OPTIONS = [
  { id: "all", label: "Any Background", icon: Compass },
  { id: "10th-12th", label: "10th / 12th Pass", icon: GraduationCap, hint: "Beginner-friendly fundamentals" },
  { id: "college", label: "College / Undergraduate", icon: GraduationCap, hint: "B.Tech, BCA, B.Sc, B.Com" },
  { id: "graduate", label: "Graduate / Working Pro", icon: Briefcase, hint: "Upskilling & higher compensation" },
  { id: "career-switch", label: "Non-Tech / Career Switch", icon: Layers, hint: "Zero prior coding needed" },
];

export const INTEREST_OPTIONS = [
  { id: "all", label: "All Interests", icon: Sparkles },
  { id: "web-dev", label: "Web & Software Development", icon: Code2, hint: "React 19, Node.js, Python, MERN" },
  { id: "ui-ux", label: "UI / UX Design & Figma", icon: Palette, hint: "Mobile interfaces & design systems" },
  { id: "graphic-design", label: "Graphic Design & Branding", icon: Palette, hint: "Photoshop, Illustrator, Corel" },
  { id: "animation-vfx", label: "2D / 3D Animation & VFX", icon: Film, hint: "Maya, Blender, Premiere, Effects" },
  { id: "marketing", label: "Digital Marketing & Growth", icon: TrendingUp, hint: "Meta Ads, SEO, Google Growth" },
  { id: "data-ai", label: "AI, Python & Data Science", icon: BrainCircuit, hint: "Machine Learning & Predictive AI" },
  { id: "cad-drafting", label: "3D CAD Matrix & AutoCAD", icon: Box, hint: "Jewelry matrix & architectural CAD" },
  { id: "basic-accounting", label: "Tally Prime, Excel & ADCS", icon: FileSpreadsheet, hint: "GST accounting & office automation" },
  { id: "cyber-cloud", label: "Cyber Security & AWS Cloud", icon: ShieldAlert, hint: "Ethical hacking & DevOps" },
];

export const GOAL_OPTIONS = [
  { id: "all", label: "All Goals", icon: Target },
  { id: "job", label: "High-Paying Job Placement", icon: Target, hint: "Campus & corporate placement prep" },
  { id: "freelancing", label: "Freelancing & Remote Work", icon: Laptop, hint: "Global clients & high-ticket gigs" },
  { id: "college-project", label: "College Edge & Lab Skills", icon: GraduationCap, hint: "Capstone projects & university marks" },
  { id: "career-switch", label: "Transition to Creative/Tech", icon: Sparkles, hint: "Switch fields confidently" },
  { id: "agency", label: "Start an Agency or Studio", icon: Building2, hint: "Launch client design/dev business" },
];

export const MODE_OPTIONS = [
  { id: "all", label: "Any Mode", icon: Layers },
  { id: "classroom", label: "Classroom (Offline Jaipur)", icon: MapPin, hint: "Dedicated hardware labs & mentor presence" },
  { id: "online", label: "Live Online (Remote)", icon: Wifi, hint: "Live interactive screenshare batches" },
  { id: "hybrid", label: "Flexible / Hybrid", icon: Layers, hint: "Mix of offline labs & remote lectures" },
];

function matchKeyword(text, keyword) {
  if (!text || !keyword) return false;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, "i");
  return regex.test(text);
}

const INTEREST_KEYWORDS = {
  "web-dev": [
    "web development", "web developer", "full stack", "mern", "frontend", "backend",
    "react", "node", "express", "mongodb", "javascript", "html", "css", "c programming", "c++",
    "coding", "software", "next.js"
  ],
  "ui-ux": [
    "ui/ux", "ui-ux", "ui ux", "figma", "wireframe", "wireframing", "prototype", "prototyping",
    "user interface", "user experience", "design system", "design systems", "framer", "adobe xd"
  ],
  "graphic-design": [
    "graphic design", "graphics", "photoshop", "illustrator", "coreldraw", "corel",
    "branding", "logo design", "vector", "print media", "canva"
  ],
  "animation-vfx": [
    "animation", "vfx", "maya", "blender", "after effects", "premiere pro",
    "video editing", "3d animation", "2d animation", "cinematic", "compositing"
  ],
  "marketing": [
    "digital marketing", "seo", "e-commerce", "marketplace", "social media",
    "meta ads", "google ads", "growth marketing", "amazon fba", "affiliate", "ppc"
  ],
  "data-ai": [
    "data analytics", "data science", "business intelligence", "power bi",
    "tableau", "sql", "python", "machine learning", "deep learning", "pandas", "excel analytics"
  ],
  "cad-drafting": [
    "autocad", "cad", "drafting", "3d modeling", "revit", "bim", "civil drafting",
    "mechanical drafting", "architectural", "solid modeling"
  ],
  "basic-accounting": [
    "tally", "tally prime", "accounting", "gst", "tds", "income tax", "balance sheet",
    "bookkeeping", "excel", "payroll", "industrial accountant"
  ],
  "cyber-cloud": [
    "cyber security", "ethical hacking", "hacking", "penetration testing", "pentesting",
    "kali linux", "network security", "information security", "wireshark", "cloud computing", "aws cloud", "devops"
  ],
};

function getCourseSearchableText(course) {
  const parts = [
    course.title || "",
    course.category || "",
    course.description || "",
    course.badge || "",
    course.slug || "",
  ];
  if (Array.isArray(course.tools)) {
    course.tools.forEach((t) => {
      if (t && t.name) parts.push(t.name);
    });
  }
  if (Array.isArray(course.modules)) {
    course.modules.forEach((m) => {
      if (m && m.title) parts.push(m.title);
      if (m && m.description) parts.push(m.description);
    });
  }
  if (Array.isArray(course.prerequisites)) {
    course.prerequisites.forEach((p) => {
      if (p) parts.push(p);
    });
  }
  return parts.join(" ").toLowerCase();
}

export default function SmartCourseFinder({
  isOpen,
  onToggle,
  allCourses = [],
  onApplyResults,
  onReset,
}) {
  const [educationLevel, setEducationLevel] = useState("all");
  const [interest, setInterest] = useState("all");
  const [primaryGoal, setPrimaryGoal] = useState("all");
  const [learningMode, setLearningMode] = useState("all");

  const hasActiveFilters =
    educationLevel !== "all" ||
    interest !== "all" ||
    primaryGoal !== "all" ||
    learningMode !== "all";

  // Dynamic recommendation scoring algorithm operating strictly on available backend courses
  const evaluation = useMemo(() => {
    if (!hasActiveFilters) {
      return {
        matchedCourses: allCourses,
        isFiltering: false,
        matchCount: allCourses.length,
        summary: "",
      };
    }

    const scored = allCourses.map((course) => {
      let score = 0;
      const reasons = [];
      const courseText = getCourseSearchableText(course);

      // 1. Precise Interest Matching (Word-Boundary & Tiered Importance)
      let interestMatched = false;
      if (interest !== "all") {
        const keywords = INTEREST_KEYWORDS[interest] || [];

        const titleMatch = keywords.some((kw) => matchKeyword(course.title, kw));
        const categoryMatch = keywords.some((kw) => matchKeyword(course.category, kw));
        const toolMatch = Array.isArray(course.tools) && course.tools.some((t) => keywords.some((kw) => matchKeyword(t?.name, kw)));
        const descMatch = keywords.some((kw) => matchKeyword(course.description, kw));

        if (titleMatch || categoryMatch || toolMatch || descMatch) {
          interestMatched = true;
          let interestScore = 40;
          if (titleMatch) interestScore += 20;
          if (toolMatch) interestScore += 10;
          if (categoryMatch) interestScore += 5;

          score += interestScore;
          const opt = INTEREST_OPTIONS.find((o) => o.id === interest);
          reasons.push(`Direct match for ${opt?.label || "your interest"}`);
        } else {
          score += 0;
        }
      } else {
        score += 30; // neutral
        interestMatched = true;
      }

      // 2. Primary Goal Matching (Weight: 30 points)
      if (primaryGoal !== "all") {
        const badgeLower = (course.badge || "").toLowerCase();
        const durationLower = (course.duration || "").toLowerCase();
        if (primaryGoal === "job" && (badgeLower.includes("job") || durationLower.includes("month") || courseText.includes("placement"))) {
          score += 30;
          reasons.push("Job-oriented curriculum");
        } else if (primaryGoal === "freelancing" && (courseText.includes("design") || courseText.includes("web") || courseText.includes("video") || courseText.includes("project"))) {
          score += 30;
          reasons.push("High freelancing potential");
        } else if (primaryGoal === "college-project" && (courseText.includes("project") || courseText.includes("code") || courseText.includes("development") || courseText.includes("lab"))) {
          score += 30;
          reasons.push("Practical lab skills & projects");
        } else if (primaryGoal === "career-switch") {
          score += 30;
          reasons.push("Beginner-to-advanced pathway");
        } else if (primaryGoal === "agency" && (courseText.includes("market") || courseText.includes("design") || courseText.includes("web") || courseText.includes("brand"))) {
          score += 30;
          reasons.push("Commercial studio skills");
        } else {
          score += 15;
        }
      } else {
        score += 25;
      }

      // 3. Education Level (Weight: 15 points)
      if (educationLevel !== "all") {
        score += 15;
        const eOpt = EDUCATION_OPTIONS.find((o) => o.id === educationLevel);
        reasons.push(`Suited for ${eOpt?.label || "your background"}`);
      } else {
        score += 15;
      }

      // 4. Learning Mode (Weight: 5 points)
      score += 5;

      const finalPercentage = Math.min(99, Math.max(68, Math.round(score)));

      return {
        ...course,
        matchScore: finalPercentage,
        matchReason: reasons.slice(0, 2).join(" • ") || "Recommended course",
        rawScore: score,
        interestMatched,
      };
    });

    // If specific interest selected, strictly return available courses that match that interest!
    const finalMatches = interest !== "all"
      ? scored.filter((c) => c.interestMatched).sort((a, b) => b.matchScore - a.matchScore)
      : scored.sort((a, b) => b.matchScore - a.matchScore);

    const activeEduLabel = EDUCATION_OPTIONS.find((e) => e.id === educationLevel)?.label;
    const activeInterestLabel = INTEREST_OPTIONS.find((i) => i.id === interest)?.label;
    const activeGoalLabel = GOAL_OPTIONS.find((g) => g.id === primaryGoal)?.label;

    const summaryParts = [];
    if (educationLevel !== "all") summaryParts.push(activeEduLabel);
    if (interest !== "all") summaryParts.push(activeInterestLabel);
    if (primaryGoal !== "all") summaryParts.push(activeGoalLabel);

    const summary = summaryParts.length > 0
      ? `Personalized match for ${summaryParts.join(" • ")}`
      : "Personalized course recommendations";

    return {
      matchedCourses: finalMatches,
      isFiltering: true,
      matchCount: finalMatches.length,
      summary,
    };
  }, [allCourses, educationLevel, interest, primaryGoal, learningMode, hasActiveFilters]);

  // Synchronize with parent Courses page
  useEffect(() => {
    if (onApplyResults) {
      onApplyResults(evaluation);
    }
  }, [evaluation, onApplyResults]);

  const handleReset = () => {
    setEducationLevel("all");
    setInterest("all");
    setPrimaryGoal("all");
    setLearningMode("all");
    if (onReset) onReset();
  };

  return (
    <div className={`smart-finder-container ${isOpen ? "open" : "collapsed"}`}>
      {/* Collapsed Bar Trigger (Always Visible on Top) */}
      <div className="smart-finder-hero-bar">
        <div className="smart-finder-bar-left">
          <div className="smart-finder-pulse-icon">
            <Sparkles size={18} />
          </div>
          <div className="smart-finder-text-block">
            <div className="smart-finder-badge-row">
              <span className="smart-finder-pill-tag">AI-Guided Advisor</span>
              {hasActiveFilters && (
                <span className="smart-finder-active-indicator">
                  <span className="green-dot" /> {evaluation.matchCount} Best Matches Active
                </span>
              )}
            </div>
            <h2 className="smart-finder-bar-title">Smart Course Finder</h2>
            <p className="smart-finder-bar-desc">
              Not sure which track fits your career? Fill in 4 quick preferences to discover your ideal program below.
            </p>
          </div>
        </div>

        <div className="smart-finder-bar-actions">
          {hasActiveFilters && (
            <button
              type="button"
              className="smart-finder-btn-reset-mini"
              onClick={handleReset}
              title="Reset all filters"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            className={`smart-finder-toggle-btn ${isOpen ? "active" : ""}`}
            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <SlidersHorizontal size={16} />
            <span>{isOpen ? "Close Finder" : "Launch Smart Course Finder"}</span>
            {isOpen ? <ChevronUp size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Interactive Questionnaire Card */}
      {isOpen && (
        <div className="smart-finder-panel">
          <div className="smart-finder-panel-header">
            <div>
              <h3 className="smart-panel-title">
                Personalize Your Ideal Learning Path
              </h3>
              <p className="smart-panel-subtitle">
                Select your details below. Your personalized courses will automatically update in real-time below!
              </p>
            </div>

            <div className="smart-panel-actions">
              {hasActiveFilters && (
                <button
                  type="button"
                  className="smart-panel-clear-btn"
                  onClick={handleReset}
                >
                  <RotateCcw size={14} />
                  <span>Clear All Selections</span>
                </button>
              )}
              <button
                type="button"
                className="smart-panel-close-btn"
                onClick={onToggle}
                aria-label="Close smart course finder panel"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="smart-finder-grid">
            {/* 1. Education Level */}
            <div className="smart-filter-group">
              <div className="group-header">
                <div className="group-num">1</div>
                <div>
                  <h4 className="group-title">Education Level</h4>
                  <span className="group-sub">What is your current background?</span>
                </div>
              </div>
              <div className="group-chips">
                {EDUCATION_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = educationLevel === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`smart-chip ${isSelected ? "selected" : ""}`}
                      onClick={() => setEducationLevel(opt.id)}
                    >
                      <Icon size={14} className="chip-icon" />
                      <span className="chip-label">{opt.label}</span>
                      {isSelected && <Check size={14} className="chip-check" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. What Interests You */}
            <div className="smart-filter-group">
              <div className="group-header">
                <div className="group-num">2</div>
                <div>
                  <h4 className="group-title">What Interests You?</h4>
                  <span className="group-sub">Choose your creative or technical passion</span>
                </div>
              </div>
              <div className="group-chips">
                {INTEREST_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = interest === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`smart-chip ${isSelected ? "selected" : ""}`}
                      onClick={() => setInterest(opt.id)}
                    >
                      <Icon size={14} className="chip-icon" />
                      <span className="chip-label">{opt.label}</span>
                      {isSelected && <Check size={14} className="chip-check" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Primary Goal */}
            <div className="smart-filter-group">
              <div className="group-header">
                <div className="group-num">3</div>
                <div>
                  <h4 className="group-title">Primary Goal</h4>
                  <span className="group-sub">What outcome do you want to accomplish?</span>
                </div>
              </div>
              <div className="group-chips">
                {GOAL_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = primaryGoal === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`smart-chip ${isSelected ? "selected" : ""}`}
                      onClick={() => setPrimaryGoal(opt.id)}
                    >
                      <Icon size={14} className="chip-icon" />
                      <span className="chip-label">{opt.label}</span>
                      {isSelected && <Check size={14} className="chip-check" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Preferred Learning Mode */}
            <div className="smart-filter-group">
              <div className="group-header">
                <div className="group-num">4</div>
                <div>
                  <h4 className="group-title">Preferred Learning Mode</h4>
                  <span className="group-sub">How would you prefer to attend lectures?</span>
                </div>
              </div>
              <div className="group-chips">
                {MODE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = learningMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`smart-chip ${isSelected ? "selected" : ""}`}
                      onClick={() => setLearningMode(opt.id)}
                    >
                      <Icon size={14} className="chip-icon" />
                      <span className="chip-label">{opt.label}</span>
                      {isSelected && <Check size={14} className="chip-check" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Match Indicator Banner inside panel */}
          <div className="smart-finder-bottom-bar">
            <div className="finder-status-text">
              <Sparkles size={16} className="text-[#f6d96b]" />
              <span>
                {hasActiveFilters
                  ? `Found ${evaluation.matchCount} tailored courses matching your profile! Check results below.`
                  : "Select any criteria above to instantly filter recommendations below."}
              </span>
            </div>

            <button
              type="button"
              className="btn-scroll-results"
              onClick={() => {
                const el = document.getElementById("courses-catalog-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>View Recommended Courses</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

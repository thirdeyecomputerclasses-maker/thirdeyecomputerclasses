import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowLeftRight,
  Sparkles,
  CheckCircle2,
  Clock,
  GraduationCap,
  Wrench,
  BookOpen,
  Award,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  ChevronDown,
  Monitor,
  Building,
} from "lucide-react";
import ThirdEyeSpinner from "../../components/ThirdEyeSpinner";
import { getCourses } from "../../services/courseApi";
import { useEnquiry } from "../../context/EnquiryContext";
import "./CompareCourses.css";

export default function CompareCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [course1Slug, setCourse1Slug] = useState("");
  const [course2Slug, setCourse2Slug] = useState("");

  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    document.title = "Compare Courses Side-by-Side | ThirdEye Computer Classes Jaipur";
    window.scrollTo(0, 0);

    let isMounted = true;
    getCourses()
      .then((data) => {
        if (!isMounted) return;
        const list = Array.isArray(data) ? data : [];
        setCourses(list);

        // Only set course slugs if query parameters were explicitly provided
        const c1Param = searchParams.get("c1") || searchParams.get("course1");
        const c2Param = searchParams.get("c2") || searchParams.get("course2");

        if (c1Param) {
          const match1 = list.find((c) => c.slug === c1Param || c._id === c1Param);
          if (match1) setCourse1Slug(match1.slug);
        }

        if (c2Param) {
          const match2 = list.find((c) => c.slug === c2Param || c._id === c2Param);
          if (match2) setCourse2Slug(match2.slug);
        }
      })
      .catch((err) => {
        console.error("Failed to load courses for comparison:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  const course1 = useMemo(() => {
    return courses.find((c) => c.slug === course1Slug || c._id === course1Slug) || null;
  }, [courses, course1Slug]);

  const course2 = useMemo(() => {
    return courses.find((c) => c.slug === course2Slug || c._id === course2Slug) || null;
  }, [courses, course2Slug]);

  const handleSwap = () => {
    const temp = course1Slug;
    setCourse1Slug(course2Slug);
    setCourse2Slug(temp);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (course2Slug) next.set("c1", course2Slug); else next.delete("c1");
      if (temp) next.set("c2", temp); else next.delete("c2");
      return next;
    });
  };

  const handleSelectCourse1 = (slug) => {
    setCourse1Slug(slug);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (slug) next.set("c1", slug); else next.delete("c1");
      if (course2Slug) next.set("c2", course2Slug);
      return next;
    });
  };

  const handleSelectCourse2 = (slug) => {
    setCourse2Slug(slug);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (course1Slug) next.set("c1", course1Slug);
      if (slug) next.set("c2", slug); else next.delete("c2");
      return next;
    });
  };

  return (
    <div className="compare-page">
      <div className="compare-container">
        {/* Navigation Breadcrumb */}
        <div className="compare-nav-bar">
          <Link to="/our-courses" className="compare-back-btn">
            <ArrowLeft size={16} />
            <span>Back to All Courses</span>
          </Link>
          <div className="compare-badge">
            <Sparkles size={13} />
            <span>Interactive Comparison</span>
          </div>
        </div>

        {/* Heading Header */}
        <div className="compare-header">
          <h1>Compare Two Courses</h1>
          <p>
            Evaluate duration, prerequisites, tools, modules, and career certifications side-by-side
            from our current live catalog to pick the right path for your goals.
          </p>
        </div>

        {isLoading ? (
          <div className="compare-loading flex flex-col items-center justify-center py-20 text-center">
            <ThirdEyeSpinner size="lg" showGlow={true} />
            <p className="mt-4 text-sm font-mono tracking-wider text-zinc-400">
              Loading available courses from studio catalog...
            </p>
          </div>
        ) : courses.length === 0 ? (
          <div className="compare-empty-catalog">
            <Layers size={40} className="text-[#f6d96b] mx-auto mb-3" />
            <h3>No courses currently available to compare</h3>
            <p>Publish courses via the Admin Panel to enable side-by-side comparison.</p>
            <Link to="/our-courses" className="compare-btn-primary mt-4 inline-flex items-center gap-2">
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            {/* Top Selector Panel: Add First vs Add Second */}
            <div className="compare-selectors-bar">
              {/* Course 1 Selector */}
              <div className="selector-box">
                <span className="selector-label">
                  <span className="step-tag">1</span> First Course
                </span>
                <div className="select-wrapper">
                  <select
                    value={course1Slug}
                    onChange={(e) => handleSelectCourse1(e.target.value)}
                    className="compare-select"
                  >
                    <option value="">-- Choose First Course --</option>
                    {courses.map((c) => (
                      <option key={c._id || c.slug} value={c.slug}>
                        {c.title} ({c.category || "General"})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-arrow" size={17} />
                </div>
              </div>

              {/* Swap Button / VS */}
              <div className="compare-vs-wrap">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="compare-swap-btn"
                  title="Swap courses"
                >
                  <ArrowLeftRight size={18} />
                </button>
                <span className="vs-badge">VS</span>
              </div>

              {/* Course 2 Selector */}
              <div className="selector-box">
                <span className="selector-label">
                  <span className="step-tag">2</span> Second Course
                </span>
                <div className="select-wrapper">
                  <select
                    value={course2Slug}
                    onChange={(e) => handleSelectCourse2(e.target.value)}
                    className="compare-select"
                  >
                    <option value="">-- Choose Second Course --</option>
                    {courses.map((c) => (
                      <option key={c._id || c.slug} value={c.slug}>
                        {c.title} ({c.category || "General"})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-arrow" size={17} />
                </div>
              </div>
            </div>

            {/* Deep Comparison Matrix Table or Selection Prompt */}
            {course1 && course2 ? (
              <div className="comparison-matrix-card">
                <div className="matrix-header">
                  <h3 className="matrix-title">Detailed Feature-by-Feature Comparison</h3>
                  <span className="matrix-sub">Accurate specs extracted directly from course curriculum</span>
                </div>

                <div className="matrix-table-wrap">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th className="feature-col">Feature / Specification</th>
                        <th className="course-col">
                          <div className="table-header-course">
                            <span className="th-course-category">{course1.category || "Course"}</span>
                            <div className="th-course-title">{course1.title}</div>
                            <Link to={`/our-courses/${course1.slug}`} className="th-course-link">
                              <span>Explore Syllabus</span>
                              <ArrowUpRight size={13} />
                            </Link>
                          </div>
                        </th>
                        <th className="course-col">
                          <div className="table-header-course">
                            <span className="th-course-category">{course2.category || "Course"}</span>
                            <div className="th-course-title">{course2.title}</div>
                            <Link to={`/our-courses/${course2.slug}`} className="th-course-link">
                              <span>Explore Syllabus</span>
                              <ArrowUpRight size={13} />
                            </Link>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Row: Duration */}
                      <tr>
                        <td className="feature-label">
                          <div className="feature-cell-title">
                            <Clock size={16} className="text-[#f6d96b]" />
                            <span>Course Duration</span>
                          </div>
                        </td>
                        <td className="spec-val font-semibold text-white">
                          {course1.duration || "Flexible"}
                        </td>
                        <td className="spec-val font-semibold text-white">
                          {course2.duration || "Flexible"}
                        </td>
                      </tr>

                      {/* Row: Track Badge */}
                      <tr>
                        <td className="feature-label">
                          <div className="feature-cell-title">
                            <Award size={16} className="text-[#f6d96b]" />
                            <span>Program Level</span>
                          </div>
                        </td>
                        <td className="spec-val">
                          <span className="spec-badge-gold">{course1.badge || "Job Oriented"}</span>
                        </td>
                        <td className="spec-val">
                          <span className="spec-badge-gold">{course2.badge || "Job Oriented"}</span>
                        </td>
                      </tr>

                      {/* Row: Prerequisites */}
                      <tr>
                        <td className="feature-label">
                          <div className="feature-cell-title">
                            <GraduationCap size={16} className="text-[#f6d96b]" />
                            <span>Prerequisites</span>
                          </div>
                          <span className="feature-cell-sub">Eligibility requirement</span>
                        </td>
                        <td className="spec-val">
                          {course1.prerequisites && course1.prerequisites.length > 0 ? (
                            <ul className="spec-bullet-list">
                              {course1.prerequisites.map((p, i) => (
                                <li key={i}>
                                  <CheckCircle2 size={13} className="bullet-check" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-zinc-400 text-sm">
                              Basic computer literacy • No prior coding required
                            </span>
                          )}
                        </td>
                        <td className="spec-val">
                          {course2.prerequisites && course2.prerequisites.length > 0 ? (
                            <ul className="spec-bullet-list">
                              {course2.prerequisites.map((p, i) => (
                                <li key={i}>
                                  <CheckCircle2 size={13} className="bullet-check" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-zinc-400 text-sm">
                              Basic computer literacy • No prior coding required
                            </span>
                          )}
                        </td>
                      </tr>

                      {/* Row: Industry Tools Covered */}
                      <tr>
                        <td className="feature-label">
                          <div className="feature-cell-title">
                            <Wrench size={16} className="text-[#f6d96b]" />
                            <span>Software &amp; Tools Covered</span>
                          </div>
                          <span className="feature-cell-sub">Production tech stack</span>
                        </td>
                        <td className="spec-val">
                          {course1.tools && course1.tools.length > 0 ? (
                            <div className="spec-chips-wrap">
                              {course1.tools.map((t, i) => (
                                <span key={i} className="spec-tool-chip">
                                  {t.name || t}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="spec-chips-wrap">
                              <span className="spec-tool-chip">Industry Workstations</span>
                              <span className="spec-tool-chip">Licensed Pro Suites</span>
                              <span className="spec-tool-chip">Live Project Labs</span>
                            </div>
                          )}
                        </td>
                        <td className="spec-val">
                          {course2.tools && course2.tools.length > 0 ? (
                            <div className="spec-chips-wrap">
                              {course2.tools.map((t, i) => (
                                <span key={i} className="spec-tool-chip">
                                  {t.name || t}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="spec-chips-wrap">
                              <span className="spec-tool-chip">Industry Workstations</span>
                              <span className="spec-tool-chip">Licensed Pro Suites</span>
                              <span className="spec-tool-chip">Live Project Labs</span>
                            </div>
                          )}
                        </td>
                      </tr>

                      {/* Row: Curriculum & Modules */}
                      <tr>
                        <td className="feature-label">
                          <div className="feature-cell-title">
                            <BookOpen size={16} className="text-[#f6d96b]" />
                            <span>Modules &amp; Syllabus</span>
                          </div>
                          <span className="feature-cell-sub">Key learning milestones</span>
                        </td>
                        <td className="spec-val">
                          {course1.modules && course1.modules.length > 0 ? (
                            <div className="spec-modules-list">
                              {course1.modules.map((m, i) => (
                                <div key={i} className="spec-module-item">
                                  <span className="module-idx">{m.moduleNumber || `M${i + 1}`}</span>
                                  <span className="module-name">{m.title}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-zinc-400 text-sm">
                              5 Structured Modules covering fundamentals, advanced techniques &amp; capstone.
                            </span>
                          )}
                        </td>
                        <td className="spec-val">
                          {course2.modules && course2.modules.length > 0 ? (
                            <div className="spec-modules-list">
                              {course2.modules.map((m, i) => (
                                <div key={i} className="spec-module-item">
                                  <span className="module-idx">{m.moduleNumber || `M${i + 1}`}</span>
                                  <span className="module-name">{m.title}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-zinc-400 text-sm">
                              5 Structured Modules covering fundamentals, advanced techniques &amp; capstone.
                            </span>
                          )}
                        </td>
                      </tr>

                      {/* Row: Certificate Available */}
                      <tr>
                        <td className="feature-label">
                          <div className="feature-cell-title">
                            <ShieldCheck size={16} className="text-[#f6d96b]" />
                            <span>Certificate Available</span>
                          </div>
                        </td>
                        <td className="spec-val">
                          <div className="spec-verified-item">
                            <CheckCircle2 size={16} className="text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Yes — ISO 9001:2015 &amp; Govt Recognized</span>
                          </div>
                        </td>
                        <td className="spec-val">
                          <div className="spec-verified-item">
                            <CheckCircle2 size={16} className="text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Yes — ISO 9001:2015 &amp; Govt Recognized</span>
                          </div>
                        </td>
                      </tr>

                      {/* Row: Learning Modes */}
                      <tr>
                        <td className="feature-label">
                          <div className="feature-cell-title">
                            <Monitor size={16} className="text-[#f6d96b]" />
                            <span>Learning Modes</span>
                          </div>
                        </td>
                        <td className="spec-val">
                          <div className="spec-modes-row">
                            <span className="spec-mode-pill">
                              <Building size={12} /> Classroom (Jaipur)
                            </span>
                            <span className="spec-mode-pill">
                              <Monitor size={12} /> Live Online
                            </span>
                          </div>
                        </td>
                        <td className="spec-val">
                          <div className="spec-modes-row">
                            <span className="spec-mode-pill">
                              <Building size={12} /> Classroom (Jaipur)
                            </span>
                            <span className="spec-mode-pill">
                              <Monitor size={12} /> Live Online
                            </span>
                          </div>
                        </td>
                      </tr>

                      {/* Row: Placement Assistance */}
                      <tr>
                        <td className="feature-label">
                          <div className="feature-cell-title">
                            <Award size={16} className="text-[#f6d96b]" />
                            <span>Placement Support</span>
                          </div>
                        </td>
                        <td className="spec-val text-zinc-300">
                          100% Placement Assistance • Resume &amp; Mock Interview Prep
                        </td>
                        <td className="spec-val text-zinc-300">
                          100% Placement Assistance • Resume &amp; Mock Interview Prep
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="compare-prompt-card">
                <div className="compare-prompt-icon">
                  <ArrowLeftRight size={24} />
                </div>
                <h3 className="compare-prompt-title">
                  {!course1 && !course2
                    ? "Select Two Courses to Compare"
                    : course1 && !course2
                    ? `First Course Selected: ${course1.title}`
                    : `Second Course Selected: ${course2.title}`}
                </h3>
                <p className="compare-prompt-desc">
                  {!course1 && !course2
                    ? "Choose a first course and a second course from the dropdown menus above to view their side-by-side comparison."
                    : course1 && !course2
                    ? "Now select a Second Course from dropdown #2 above to generate the side-by-side comparison."
                    : "Now select a First Course from dropdown #1 above to generate the side-by-side comparison."}
                </p>

                {courses.length > 0 && (
                  <div className="compare-quick-pick-area">
                    <span className="quick-pick-hint">
                      Or click an available course to quickly assign:
                    </span>
                    <div className="compare-quick-pick-row">
                      {courses.map((c) => {
                        const isC1 = course1Slug === c.slug;
                        const isC2 = course2Slug === c.slug;
                        return (
                          <button
                            key={c._id || c.slug}
                            type="button"
                            className={`compare-quick-pick-chip ${isC1 || isC2 ? "active" : ""}`}
                            onClick={() => {
                              if (!course1Slug) {
                                handleSelectCourse1(c.slug);
                              } else if (!course2Slug && course1Slug !== c.slug) {
                                handleSelectCourse2(c.slug);
                              } else {
                                handleSelectCourse1(c.slug);
                              }
                            }}
                          >
                            <span>{c.title}</span>
                            {isC1 && <span className="chip-tag">(Course 1)</span>}
                            {isC2 && <span className="chip-tag">(Course 2)</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowUpRight, Sparkles, PlusCircle, RotateCcw, ArrowLeftRight } from "lucide-react";
import ThirdEyeSpinner from "../../components/ThirdEyeSpinner";
import { getCourses } from "../../services/courseApi";
import SmartCourseFinder from "../../components/SmartCourseFinder";
import { useEnquiry } from "../../context/EnquiryContext";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchParams] = useSearchParams();
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [finderState, setFinderState] = useState({
    isFiltering: false,
    matchedCourses: [],
    matchCount: 0,
    summary: "",
  });

  const { openEnquiry } = useEnquiry();

  // Open finder automatically if query param `?finder=true` is present
  useEffect(() => {
    if (searchParams.get("finder") === "true") {
      setIsFinderOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = "All Courses & Certifications | ThirdEye Computer Classes Jaipur";
    window.scrollTo(0, 0);

    let isMounted = true;
    getCourses()
      .then((data) => {
        if (isMounted) setCourses(data || []);
      })
      .catch((err) => {
        console.error("Failed to load courses from backend:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFinderResults = useCallback((evaluation) => {
    setFinderState(evaluation);
  }, []);

  const handleResetFinder = useCallback(() => {
    setFinderState({
      isFiltering: false,
      matchedCourses: courses,
      matchCount: courses.length,
      summary: "",
    });
  }, [courses]);

  // Compute categories dynamically strictly from fetched backend courses
  const categoryFilters = useMemo(() => {
    const cats = new Set();
    courses.forEach((c) => {
      if (c.category) cats.add(c.category);
    });
    const dynamicList = Array.from(cats).map((cat) => ({ id: cat, label: cat }));
    return [{ id: "all", label: "All Courses" }, ...dynamicList];
  }, [courses]);

  // Filter courses based on finder state, category, and search query
  const filteredCourses = useMemo(() => {
    // If Smart Course Finder has active filters, use matched available courses
    const sourcePool = finderState.isFiltering
      ? finderState.matchedCourses
      : courses;

    return sourcePool.filter((course) => {
      const matchesCategory =
        activeCategory === "all" ||
        (course.category && course.category.toLowerCase() === activeCategory.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query) ||
        course.category?.toLowerCase().includes(query) ||
        course.slug?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [courses, finderState, activeCategory, searchQuery]);

  return (
    <div className="course-page">
      <div className="courses-section">
        {/* Header */}
        <div className="courses-heading">
          <div className="courses-badge">
            <Sparkles size={13} />
            <span>Career Programs & Certifications</span>
          </div>
          <h1>Explore Our Courses</h1>
          <p>
            Master high-demand technical and creative skills with hands-on lab training,
            industry projects, and government-recognized certifications in Jaipur.
          </p>
        </div>

        {/* Smart Course Finder Interactive Section */}
        <SmartCourseFinder
          isOpen={isFinderOpen}
          onToggle={() => setIsFinderOpen((prev) => !prev)}
          allCourses={courses}
          onApplyResults={handleFinderResults}
          onReset={handleResetFinder}
        />

        {/* Compare Two Courses Section */}
        <div className="compare-courses-banner">
          <div className="compare-banner-left">
            <div className="compare-banner-badge">
              <ArrowLeftRight size={13} />
              <span>Side-by-Side Comparison</span>
            </div>
            <h3 className="compare-banner-title">
              Compare Two Courses &amp; Choose Your Path
            </h3>
            <p className="compare-banner-desc">
              Confused between two career programs? Compare duration, prerequisites, tools covered,
              curriculum modules, and certifications directly between any two available courses.
            </p>
          </div>

          <div className="compare-banner-right">
            <Link to="/our-courses/compare-courses" className="btn-compare-courses-cta">
              <ArrowLeftRight size={17} />
              <span>Compare Courses Now</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div id="courses-catalog-anchor" />

        {/* Controls: Search & Category Pills */}
        <div className="courses-controls">
          <div className="courses-search-wrap">
            <Search className="courses-search-icon" size={19} />
            <input
              type="text"
              placeholder="Search available courses (e.g., Python, React, Animation, AWS, UI/UX)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="courses-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="courses-search-clear"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {categoryFilters.length > 1 && (
            <div className="courses-filter-pills">
              {categoryFilters.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`courses-pill ${activeCategory === cat.id ? "active" : ""}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          <div className="courses-meta-count">
            {isLoading
              ? "Loading courses catalog..."
              : `Showing ${filteredCourses.length} of ${courses.length} courses`}
          </div>
        </div>

        {/* Finder Active Banner */}
        {finderState.isFiltering && (
          <div className="courses-recommended-header">
            <div className="rec-left-badge">
              <Sparkles size={20} className="text-[#f6d96b]" />
              <div className="rec-title-wrap">
                <h3>Personalized Course Recommendations</h3>
                <p>{finderState.summary || "Top matches tailored to your education, interest & career goals"}</p>
              </div>
            </div>
            <div className="rec-right-actions">
              <button
                type="button"
                onClick={handleResetFinder}
                className="rec-reset-btn"
              >
                <RotateCcw size={13} />
                <span>Show All Courses</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        {isLoading ? (
          <div className="courses-loading-wrap flex flex-col items-center justify-center py-20 text-center">
            <ThirdEyeSpinner size="lg" showGlow={true} />
            <p className="mt-4 text-sm font-mono tracking-wider text-zinc-400">
              Fetching dynamic studio courses...
            </p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="courses-grid">
            {filteredCourses.map((course, index) => {
              const courseUrl = course.slug
                ? `/our-courses/${course.slug}`
                : (course.link || "/our-courses");

              const CardContent = (
                <div className="course-card-content">
                  <div className="course-card-header">
                    <span className="course-card-number">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="course-card-tag">{course.category || "Certification"}</span>
                  </div>

                  {course.matchScore && (
                    <div className="course-card-match-badge">
                      <Sparkles size={11} />
                      <span>{course.matchScore}% Match</span>
                    </div>
                  )}

                  <h2>{course.title}</h2>
                  <p>{course.description || "Comprehensive hands-on training with industry mentors and recognized certification."}</p>

                  {course.matchReason && (
                    <div className="course-card-match-reason">
                      ✦ {course.matchReason}
                    </div>
                  )}

                  <div className="course-card-action">
                    <span>Explore Course Syllabus</span>
                    <ArrowUpRight size={17} strokeWidth={2.4} />
                  </div>

                  <div className="course-card-actions-row">
                    <button
                      type="button"
                      className="course-card-demo-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openEnquiry({
                          course: course.title,
                          sourcePage: `Smart Course Finder - ${course.title}`,
                        });
                      }}
                    >
                      <Sparkles size={14} />
                      <span>Book Free Demo</span>
                    </button>

                    <Link
                      to={`/our-courses/compare-courses?c1=${course.slug}`}
                      className="course-card-compare-btn"
                      onClick={(e) => e.stopPropagation()}
                      title={`Compare ${course.title}`}
                    >
                      <ArrowLeftRight size={13} />
                      <span>Compare</span>
                    </Link>
                  </div>
                </div>
              );

              return (
                <Link
                  key={course._id || course.id || course.title}
                  to={courseUrl}
                  className="course-card group"
                >
                  {CardContent}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="courses-empty">
            <h3>No courses found</h3>
            <p>
              {finderState.isFiltering
                ? "No available courses match this specific combination of criteria. Try selecting another interest or resetting filters."
                : searchQuery || activeCategory !== "all"
                ? `We couldn't find any courses matching "${searchQuery}". Try a different keyword or reset filters.`
                : "No courses currently available in the dynamic catalog. Visit the Admin Panel to publish new courses."}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "16px" }}>
              {finderState.isFiltering || searchQuery || activeCategory !== "all" ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    handleResetFinder();
                  }}
                  className="courses-empty-btn"
                >
                  Reset All Filters
                </button>
              ) : (
                <Link to="/admin" className="courses-empty-btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                  <PlusCircle size={16} />
                  <span>Go to Admin Panel</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

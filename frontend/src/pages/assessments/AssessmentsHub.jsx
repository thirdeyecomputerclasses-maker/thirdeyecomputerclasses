import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Search,
  X,
  Clock,
  HelpCircle,
  Award,
  ArrowRight,
  TrendingUp,
  Code,
  Table,
  Compass,
  Palette,
  Laptop,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  GraduationCap,
  Users,
} from "lucide-react";
import { getAssessments } from "../../services/assessmentApi";
import "./AssessmentsHub.css";

const getCategoryIcon = (category, iconType) => {
  const cat = (category || "").toLowerCase();
  if (cat.includes("market")) return <TrendingUp size={22} />;
  if (cat.includes("auto") || cat.includes("cad")) return <Compass size={22} />;
  if (cat.includes("tally") || cat.includes("account") || cat.includes("excel")) return <Table size={22} />;
  if (cat.includes("design") || cat.includes("graphic")) return <Palette size={22} />;
  if (cat.includes("cs") || cat.includes("python") || cat.includes("program")) return <Code size={22} />;
  return <Laptop size={22} />;
};

export default function AssessmentsHub() {
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    document.title = "Free Skill Assessments & Quizzes | Third Eye Computer Classes Jaipur";
    window.scrollTo(0, 0);

    setIsLoading(true);
    getAssessments({ activeOnly: true })
      .then((data) => {
        setAssessments(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load assessments:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const categoriesList = useMemo(() => {
    const set = new Set();
    assessments.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ["all", ...Array.from(set)];
  }, [assessments]);

  const filteredAssessments = useMemo(() => {
    return assessments.filter((a) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (a.category && a.category.toLowerCase() === selectedCategory.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.category?.toLowerCase().includes(q) ||
        a.targetAudience?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [assessments, searchQuery, selectedCategory]);

  return (
    <div className="assessments-hub">
      {/* Hero Section */}
      <section className="asm-hero">
        <div className="asm-hero-badge">
          <Sparkles size={14} />
          <span>FREE SKILL ASSESSMENTS • 10 QUESTIONS • INSTANT REPORT</span>
        </div>
        <h1 className="asm-hero-title">
          Test Your Tech &{" "}
          <span className="asm-hero-title-highlight">Professional Skills</span>
        </h1>
        <p className="asm-hero-subtitle">
          Take a 10-minute generalized assessment test across Digital Marketing, Computer Science, AutoCAD, Tally, or Design to evaluate your industry readiness and discover tailored course pathways.
        </p>

        {/* Live Search */}
        <div className="asm-search-wrap">
          <Search size={18} className="asm-search-icon" />
          <input
            type="text"
            className="asm-search-input"
            placeholder="Search assessments (e.g. Digital Marketing, Python, Excel, CAD, Design)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="asm-search-clear"
              onClick={() => setSearchQuery("")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="asm-categories-bar">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`asm-category-pill ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "All Subjects" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid */}
      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-zinc-400 text-sm">Loading skill assessments...</p>
        </div>
      ) : filteredAssessments.length === 0 ? (
        <div className="text-center py-16 px-4 max-w-md mx-auto">
          <HelpCircle size={44} className="mx-auto text-yellow-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">No Assessments Found</h3>
          <p className="text-zinc-400 text-xs mb-4">
            No skill assessment matches "{searchQuery}". Try a different keyword or reset filters.
          </p>
          <button
            type="button"
            className="asm-category-pill active"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="asm-grid">
          {filteredAssessments.map((asm) => (
            <div key={asm._id || asm.id || asm.slug} className="asm-card">
              <div className="asm-card-top">
                <div className="asm-icon-wrap">
                  {getCategoryIcon(asm.category, asm.iconType)}
                </div>
                <span className="asm-target-pill">
                  {asm.targetAudience || "All Learners"}
                </span>
              </div>

              <h2 className="asm-card-title">{asm.title}</h2>
              <p className="asm-card-desc">{asm.description}</p>

              <div className="asm-card-meta-row">
                <div className="asm-meta-item">
                  <HelpCircle size={13} className="text-yellow-400" />
                  <span>{asm.questions?.length || 10} Questions</span>
                </div>
                <span>•</span>
                <div className="asm-meta-item">
                  <Clock size={13} className="text-yellow-400" />
                  <span>{asm.durationMinutes || 10} Mins</span>
                </div>
                <span>•</span>
                <div className="asm-meta-item">
                  <Award size={13} className="text-yellow-400" />
                  <span>Pass: {asm.passingPercentage || 60}%</span>
                </div>
              </div>

              <Link
                to={`/assessment/${asm.slug}`}
                className="asm-start-btn"
              >
                <span>Take Assessment Free</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Feature Explainer Section: Matching User Screenshot */}
      <section className="asm-feature-section">
        <div className="asm-feature-card">
          <div className="asm-feature-header">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 mb-2 block">
              COMPREHENSIVE PERFORMANCE DIAGNOSTICS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              After Completing A Test, You Receive:
            </h2>
            <p className="text-sm text-zinc-400">
              Immediate algorithmic feedback crafted by senior technical mentors to evaluate where you stand and what to study next.
            </p>
          </div>

          <div className="asm-feature-grid">
            <div className="asm-feature-item">
              <div className="asm-feature-icon">
                <Award size={20} />
              </div>
              <h3 className="asm-feature-item-title">1. Verified Score</h3>
              <p className="asm-feature-item-desc">
                Instant percentage score and proficiency badge (Mastery, Proficient, or Developing).
              </p>
            </div>

            <div className="asm-feature-item">
              <div className="asm-feature-icon">
                <BarChart3 size={20} />
              </div>
              <h3 className="asm-feature-item-title">2. Topic-Wise Breakdown</h3>
              <p className="asm-feature-item-desc">
                Detailed diagnostics across core sub-skills (e.g., SEO, Formulas, 3D Solids, Syntax).
              </p>
            </div>

            <div className="asm-feature-item">
              <div className="asm-feature-icon">
                <Lightbulb size={20} />
              </div>
              <h3 className="asm-feature-item-title">3. Areas to Improve</h3>
              <p className="asm-feature-item-desc">
                Actionable feedback identifying precisely which concepts need revision and practice.
              </p>
            </div>

            <div className="asm-feature-item">
              <div className="asm-feature-icon">
                <GraduationCap size={20} />
              </div>
              <h3 className="asm-feature-item-title">4. Course Suggestions</h3>
              <p className="asm-feature-item-desc">
                Tailored diploma recommendations with demo class enrollment to bridge your skill gap.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

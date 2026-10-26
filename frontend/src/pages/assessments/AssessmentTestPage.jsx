import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Flag,
  RotateCcw,
  BookOpen,
  Award,
  BarChart3,
  Lightbulb,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
} from "lucide-react";
import { getAssessment, submitAssessment } from "../../services/assessmentApi";
import { useEnquiry } from "../../context/EnquiryContext";
import "./AssessmentTestPage.css";

const OPTION_LETTERS = ["A", "B", "C", "D", "E"];

export default function AssessmentTestPage() {
  const { openEnquiry } = useEnquiry();
  const { slug } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Test state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: optionIndex }
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins default
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Student details for certificate / counseling
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");

  // Result state
  const [result, setResult] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // Timer interval ref
  const timerRef = useRef(null);

  // Fetch assessment
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    getAssessment(slug)
      .then((data) => {
        if (data && Array.isArray(data.questions)) {
          setAssessment(data);
          setTimeLeft((data.durationMinutes || 10) * 60);
          document.title = `${data.title} | ThirdEye Skill Assessment`;
        } else {
          setAssessment(null);
        }
      })
      .catch((err) => {
        console.error("Failed to load test:", err);
        setAssessment(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  // Countdown Timer
  useEffect(() => {
    if (!assessment || result) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [assessment, result]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionIndex) => {
    if (!assessment) return;
    const currentQ = assessment.questions[currentIdx];
    const qKey = currentQ.id || `q-${currentIdx}`;
    setAnswers((prev) => ({
      ...prev,
      [qKey]: optionIndex,
    }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentIdx)) {
        next.delete(currentIdx);
      } else {
        next.add(currentIdx);
      }
      return next;
    });
  };

  const handleAutoSubmit = () => {
    handleFinalSubmit();
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const studentInfo =
        studentName.trim() || studentPhone.trim()
          ? { name: studentName.trim(), phone: studentPhone.trim() }
          : null;

      const evalResult = await submitAssessment(slug, answers, studentInfo);
      setResult(evalResult);
      setIsSubmitModalOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      alert("Submission failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = assessment?.questions?.length || 10;
  const currentQuestion = assessment?.questions?.[currentIdx];
  const currentKey = currentQuestion?.id || `q-${currentIdx}`;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080603] text-zinc-400">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm">Preparing assessment questions...</p>
        </div>
      </div>
    );
  }

  // Not found
  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080603] px-4">
        <div className="max-w-md text-center p-8 rounded-2xl bg-[#140f09] border border-yellow-400/25">
          <BookOpen size={48} className="mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Assessment Not Found</h2>
          <p className="text-sm text-zinc-400 mb-6">
            The assessment test you're looking for is either unavailable or has been archived.
          </p>
          <Link
            to="/assessments"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300"
          >
            <ArrowLeft size={16} />
            <span>Browse All Skill Tests</span>
          </Link>
        </div>
      </div>
    );
  }

  // ===============================================================
  // 1. RESULTS SCREEN: Displayed after test submission
  // ===============================================================
  if (result) {
    const isMastery = result.percentage >= 80;
    const isPassing = result.passed;

    return (
      <div className="test-page-container">
        <div className="test-results-wrap">
          {/* Top Score Banner */}
          <div className="test-score-banner">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Award size={14} />
              <span>Assessment Completed</span>
            </div>

            <div className="test-score-circle">
              <span className="test-score-number">{result.score}/{result.totalQuestions}</span>
              <span className="test-score-sub">{result.percentage}% Score</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {isMastery
                ? "Excellent! Industry Mastery Achieved 🏆"
                : isPassing
                ? "Congratulations! You Passed ⭐"
                : "Good Effort! Foundational Knowledge 💡"}
            </h1>

            <p className="text-sm text-zinc-300 max-w-lg mx-auto mb-6">
              You scored <strong className="text-yellow-400">{result.score} out of {result.totalQuestions}</strong> on the {result.assessmentTitle}.
              Review your topic-wise diagnostics and recommended learning roadmap below.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-yellow-400 text-black font-bold text-sm hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20"
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                  setCurrentIdx(0);
                  setTimeLeft((assessment.durationMinutes || 10) * 60);
                  setFlagged(new Set());
                }}
              >
                <RotateCcw size={15} />
                <span>Retake Test</span>
              </button>

              <Link
                to="/assessments"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all"
              >
                <span>Try Other Tests</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* 2. Topic-Wise Performance Breakdown */}
          {Array.isArray(result.topicBreakdown) && result.topicBreakdown.length > 0 && (
            <div className="test-report-card">
              <h2 className="test-report-card-title">
                <BarChart3 size={20} className="text-yellow-400" />
                <span>Topic-Wise Performance Breakdown</span>
              </h2>

              <div className="space-y-4">
                {result.topicBreakdown.map((t, idx) => (
                  <div key={idx} className="topic-bar-item">
                    <div className="topic-bar-top">
                      <div className="flex items-center gap-2">
                        <span className="topic-bar-name">{t.topic}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-semibold">
                          {t.proficiency}
                        </span>
                      </div>
                      <span className="topic-bar-pct">
                        {t.correct}/{t.total} ({t.percentage}%)
                      </span>
                    </div>

                    <div className="topic-progress-track">
                      <div
                        className="topic-progress-fill"
                        style={{ width: `${t.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Areas to Improve */}
          {Array.isArray(result.areasToImprove) && result.areasToImprove.length > 0 && (
            <div className="test-report-card">
              <h2 className="test-report-card-title">
                <Lightbulb size={20} className="text-amber-400" />
                <span>Identified Areas to Improve</span>
              </h2>
              <div className="space-y-2">
                {result.areasToImprove.map((area, idx) => (
                  <div key={idx} className="weak-area-item">
                    <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-sm block mb-0.5">
                        {area.topic}
                      </strong>
                      <p className="weak-area-text">{area.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Recommended Course Pathways */}
          {Array.isArray(result.recommendedCourses) && result.recommendedCourses.length > 0 && (
            <div className="test-report-card">
              <h2 className="test-report-card-title">
                <GraduationCap size={20} className="text-yellow-400" />
                <span>Recommended Courses for You</span>
              </h2>
              <p className="text-xs text-zinc-400 mb-4">
                Based on your assessment diagnostics, our mentors recommend these certified diploma tracks to bridge your technical gaps:
              </p>

              <div className="rec-course-grid">
                {result.recommendedCourses.map((c, idx) => (
                  <div key={idx} className="rec-course-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-400/15 text-yellow-400">
                        {c.badge || "Recommended"}
                      </span>
                      <span className="text-xs text-zinc-400">{c.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1.5">{c.title}</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-4 flex-1">
                      {c.description}
                    </p>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <Link
                        to={`/our-courses/${c.slug || ""}`}
                        className="text-xs font-bold text-yellow-400 hover:text-yellow-300 inline-flex items-center gap-1"
                      >
                        <span>View Syllabus</span>
                        <ArrowRight size={13} />
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          openEnquiry({
                            course: c.title,
                            sourcePage: `Skill Test Result: ${assessment.title} (Score: ${result.score}/10)`,
                            initialNote: `Scored ${result.score}/10 (${result.percentage}%) on ${assessment.title} assessment. Looking for recommended course syllabus and batch timings.`,
                          })
                        }
                        className="ml-auto text-xs font-semibold px-3 py-1 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 transition-colors cursor-pointer"
                      >
                        Book Free Demo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Detailed Question Review Accordion */}
          {Array.isArray(result.questionReview) && (
            <div className="test-report-card">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsReviewOpen(!isReviewOpen)}
              >
                <h2 className="test-report-card-title mb-0">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                  <span>Review All 10 Questions & Explanations</span>
                </h2>
                <button type="button" className="text-zinc-400">
                  {isReviewOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {isReviewOpen && (
                <div className="mt-6 space-y-4">
                  {result.questionReview.map((q, idx) => (
                    <div
                      key={idx}
                      className={`test-review-item ${
                        q.isCorrect ? "correct" : "incorrect"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                        <span>Question {idx + 1} • {q.topic}</span>
                        <span
                          className={`font-bold ${
                            q.isCorrect ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {q.isCorrect ? "✓ Correct" : "✕ Incorrect"}
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-white mb-3">
                        {q.question}
                      </h3>

                      <div className="space-y-1.5 mb-3 text-xs">
                        {q.options.map((opt, optIdx) => {
                          const isUserPick = q.userAnswer === optIdx;
                          const isActualCorrect = q.correctAnswer === optIdx;

                          let bg = "bg-white/[0.03] text-zinc-300 border-white/[0.08]";
                          if (isActualCorrect) {
                            bg = "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 font-semibold";
                          } else if (isUserPick && !q.isCorrect) {
                            bg = "bg-rose-500/15 text-rose-300 border-rose-500/40";
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-2 rounded-lg border flex items-center gap-2 ${bg}`}
                            >
                              <span className="font-mono font-bold">
                                {OPTION_LETTERS[optIdx]}.
                              </span>
                              <span>{opt}</span>
                              {isActualCorrect && (
                                <span className="ml-auto text-[10px] font-bold text-emerald-400">
                                  CORRECT ANSWER
                                </span>
                              )}
                              {isUserPick && !isActualCorrect && (
                                <span className="ml-auto text-[10px] font-bold text-rose-400">
                                  YOUR CHOICE
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <div className="p-2.5 rounded-lg bg-yellow-400/10 border border-yellow-400/20 text-xs text-zinc-300">
                          <strong className="text-yellow-400 mr-1">Explanation:</strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ===============================================================
  // 2. ACTIVE TEST TAKER SCREEN
  // ===============================================================
  return (
    <div className="test-page-container">
      {/* Top Sticky Bar */}
      <header className="test-header-bar">
        <div className="test-header-inner">
          <div className="flex items-center gap-3">
            <Link
              to="/assessments"
              className="text-zinc-400 hover:text-white transition-colors"
              title="Exit Assessment"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="test-header-title">{assessment.title}</h1>
              <span className="text-xs text-yellow-400/90 font-medium">
                {assessment.category} • Question {currentIdx + 1} of {totalQuestions}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`test-timer-badge ${timeLeft < 120 ? "urgent" : ""}`}
            >
              <Clock size={16} />
              <span>{formatTimer(timeLeft)}</span>
            </div>

            <button
              type="button"
              className="px-4 py-1.5 rounded-lg bg-yellow-400 text-black font-bold text-xs hover:bg-yellow-300 transition-all shadow-sm"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              Finish Test
            </button>
          </div>
        </div>
      </header>

      {/* Main Test Layout */}
      <div className="test-main-layout">
        {/* Left: Question Navigation Bubble Palette */}
        <aside className="test-palette-card">
          <div className="test-palette-header">
            <span>Questions</span>
            <span className="text-xs font-mono text-zinc-400">
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          <div className="test-palette-grid">
            {assessment.questions.map((q, idx) => {
              const qKey = q.id || `q-${idx}`;
              const isAnswered = answers[qKey] !== undefined;
              const isCurrent = idx === currentIdx;
              const isFlagged = flagged.has(idx);

              let cls = "test-bubble";
              if (isCurrent) cls += " current";
              else if (isAnswered) cls += " answered";
              else if (isFlagged) cls += " flagged";

              return (
                <button
                  key={idx}
                  type="button"
                  className={cls}
                  onClick={() => setCurrentIdx(idx)}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 text-[11px] text-zinc-400 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-yellow-400" />
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded border border-yellow-400" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500" />
              <span>Flagged ({flagged.size})</span>
            </div>
          </div>
        </aside>

        {/* Center: Current Question Card */}
        {currentQuestion && (
          <main className="test-question-box">
            <div className="test-question-meta">
              <span className="test-topic-pill">
                Topic: {currentQuestion.topic || "General"}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {currentIdx + 1} / {totalQuestions}
              </span>
            </div>

            <h2 className="test-question-text">
              {currentQuestion.question}
            </h2>

            {/* 4 Interactive Options */}
            <div className="test-options-list">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = answers[currentKey] === optIdx;
                return (
                  <div
                    key={optIdx}
                    className={`test-option-item ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectOption(optIdx)}
                  >
                    <div className="test-option-letter">
                      {OPTION_LETTERS[optIdx]}
                    </div>
                    <span className="test-option-text">{optionText}</span>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="test-nav-controls">
              <button
                type="button"
                className="test-nav-btn prev"
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </button>

              <button
                type="button"
                className={`test-nav-btn flag ${
                  flagged.has(currentIdx) ? "active" : ""
                }`}
                onClick={toggleFlag}
              >
                <Flag size={15} />
                <span>{flagged.has(currentIdx) ? "Flagged" : "Flag for review"}</span>
              </button>

              {currentIdx < totalQuestions - 1 ? (
                <button
                  type="button"
                  className="test-nav-btn next"
                  onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                >
                  <span>Next</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="test-nav-btn next"
                  onClick={() => setIsSubmitModalOpen(true)}
                >
                  <span>Finish Assessment</span>
                  <CheckCircle2 size={16} />
                </button>
              )}
            </div>
          </main>
        )}
      </div>

      {/* Confirmation & Student Contact Modal */}
      {isSubmitModalOpen && (
        <div className="blog-modal-backdrop" onClick={() => setIsSubmitModalOpen(false)}>
          <div
            className="blog-modal-container max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blog-modal-header">
              <h2 className="blog-modal-title">Submit Assessment</h2>
              <button
                type="button"
                className="blog-modal-close-btn"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-yellow-400/10 border border-yellow-400/25 text-xs text-zinc-300">
                You have answered <strong className="text-yellow-400 font-bold">{answeredCount}</strong> out of{" "}
                <strong className="text-yellow-400 font-bold">{totalQuestions}</strong> questions.
                {answeredCount < totalQuestions && (
                  <span className="block mt-1 text-amber-300">
                    ⚠️ You have {totalQuestions - answeredCount} unanswered questions remaining.
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Your Full Name (For Certificate / Report)
                </label>
                <input
                  type="text"
                  className="blog-form-input text-xs"
                  placeholder="e.g. Rahul Sharma"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  WhatsApp Phone Number (Optional for counseling)
                </label>
                <input
                  type="tel"
                  className="blog-form-input text-xs"
                  placeholder="e.g. +91 98765 43210"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  className="blog-btn-secondary"
                  onClick={() => setIsSubmitModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Keep Reviewing
                </button>
                <button
                  type="button"
                  className="blog-btn-primary"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Evaluating..." : "Confirm & View Score"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

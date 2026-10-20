import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Plus,
  Trash2,
  Clock,
  Target,
  Award,
  Layers,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Check,
  ListOrdered,
  BookOpen,
} from "lucide-react";
import "./AssessmentFormModal.css";

const PRESET_CATEGORIES = [
  "Computer Science",
  "Digital Marketing",
  "CAD & 3D Design",
  "Accounting & Tally",
  "Graphic Design",
  "Office & Basics",
];

const PRESET_TOPICS_BY_CATEGORY = {
  "Computer Science": [
    "Core Syntax",
    "Data Structures",
    "OOP Principles",
    "Algorithms & Logic",
    "Web Fundamentals",
    "Database & SQL",
  ],
  "Digital Marketing": [
    "Search Engine Optimization (SEO)",
    "PPC & Paid Search",
    "Social Media & Meta Ads",
    "Analytics & Attribution",
    "Content & Email Marketing",
    "Conversion Rate Optimization",
  ],
  "CAD & 3D Design": [
    "Precision Coordinates & Snapping",
    "Layer & Block Architecture",
    "3D Solid & Mesh Modeling",
    "Rendering & Lighting",
    "Dimensioning & Tolerances",
  ],
  "Accounting & Tally": [
    "Formulas & Lookup Functions",
    "Pivot Tables & Slicers",
    "Chart Design & Visualization",
    "GST & Voucher Processing",
    "Trial Balance & Reconciliations",
  ],
  "Graphic Design": [
    "Vector vs Raster Architecture",
    "Color Theory & Color Spaces",
    "Typography & Hierarchy",
    "Composition & Gestalt",
    "Design Software Tools",
  ],
  "Office & Basics": [
    "Hardware & Peripherals",
    "Operating System Principles",
    "Networking & Internet",
    "Cybersecurity & Safety",
    "File Management & Utilities",
  ],
};

export default function AssessmentFormModal({
  isOpen,
  assessment,
  onClose,
  onSave,
  isSaving,
}) {
  const [activeTab, setActiveTab] = useState("details"); // "details" | "questions" | "courses"
  
  // General details
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState("Computer Science");
  const [customCategory, setCustomCategory] = useState("");
  const [targetAudience, setTargetAudience] = useState("Beginners & Job Seekers");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(10);
  const [passingPercentage, setPassingPercentage] = useState(60);
  const [isActive, setIsActive] = useState(true);

  // Questions array: [ { id, question, options: ["", "", "", ""], correctAnswer: 0, explanation, topic, difficulty } ]
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  // Recommended courses array: [ { title, slug, badge, duration, description } ]
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  // Validation errors
  const [validationErrors, setValidationErrors] = useState([]);

  // Load editing assessment or blank template
  useEffect(() => {
    if (assessment) {
      setTitle(assessment.title || "");
      setSlug(assessment.slug || "");
      setIsSlugManual(true);
      setCategory(assessment.category || "Computer Science");
      setTargetAudience(assessment.targetAudience || "Beginners & Job Seekers");
      setDescription(assessment.description || "");
      setLongDescription(assessment.longDescription || "");
      setDurationMinutes(assessment.durationMinutes || 10);
      setPassingPercentage(assessment.passingPercentage || 60);
      setIsActive(assessment.isActive !== false);

      // Deep copy questions
      if (Array.isArray(assessment.questions) && assessment.questions.length > 0) {
        setQuestions(
          assessment.questions.map((q, idx) => ({
            id: q.id || `q-${idx + 1}`,
            question: q.question || "",
            options: Array.isArray(q.options) && q.options.length > 0 ? [...q.options] : ["", "", "", ""],
            correctAnswer: typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
            explanation: q.explanation || "",
            topic: q.topic || "Core Principles",
            difficulty: q.difficulty || "Intermediate",
          }))
        );
      } else {
        initDefaultQuestions("Computer Science");
      }

      // Deep copy recommended courses
      if (Array.isArray(assessment.recommendedCourses) && assessment.recommendedCourses.length > 0) {
        setRecommendedCourses(
          assessment.recommendedCourses.map((c) => ({
            title: c.title || "",
            slug: c.slug || "",
            badge: c.badge || "Recommended",
            duration: c.duration || "3 Months",
            description: c.description || "",
          }))
        );
      } else {
        setRecommendedCourses([]);
      }
    } else {
      // Default new assessment
      setTitle("");
      setSlug("");
      setIsSlugManual(false);
      setCategory("Computer Science");
      setCustomCategory("");
      setTargetAudience("Beginners & College Students");
      setDescription("Evaluate core proficiency with this 10-question standardized diagnostic test.");
      setLongDescription("");
      setDurationMinutes(10);
      setPassingPercentage(60);
      setIsActive(true);
      initDefaultQuestions("Computer Science");
      setRecommendedCourses([
        {
          title: "Full Stack Web Development",
          slug: "full-stack-web-development",
          badge: "Career Track",
          duration: "4 Months",
          description: "Build robust full-stack web applications with modern frontend and backend architectures.",
        },
      ]);
    }
    setSelectedQuestionIndex(0);
    setValidationErrors([]);
  }, [assessment, isOpen]);

  // Generate 10 blank questions structure for convenience
  const initDefaultQuestions = (cat) => {
    const topics = PRESET_TOPICS_BY_CATEGORY[cat] || ["Fundamentals", "Practical", "Best Practices"];
    const newQs = [];
    for (let i = 1; i <= 10; i++) {
      newQs.push({
        id: `q-${i}`,
        question: "",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0,
        explanation: "",
        topic: topics[(i - 1) % topics.length],
        difficulty: i <= 3 ? "Beginner" : i <= 7 ? "Intermediate" : "Advanced",
      });
    }
    setQuestions(newQs);
  };

  // Auto-generate slug from title if not manually customized
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isSlugManual) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  };

  // Question editing handlers
  const currentQ = questions[selectedQuestionIndex] || null;

  const handleUpdateCurrentQuestion = (field, value) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[selectedQuestionIndex] = {
        ...updated[selectedQuestionIndex],
        [field]: value,
      };
      return updated;
    });
  };

  const handleUpdateOption = (optIndex, value) => {
    setQuestions((prev) => {
      const updated = [...prev];
      const cur = { ...updated[selectedQuestionIndex] };
      const newOpts = [...cur.options];
      newOpts[optIndex] = value;
      cur.options = newOpts;
      updated[selectedQuestionIndex] = cur;
      return updated;
    });
  };

  const handleAddQuestion = () => {
    const newId = `q-${questions.length + 1}`;
    const topics = PRESET_TOPICS_BY_CATEGORY[category] || ["Core Fundamentals"];
    const newQ = {
      id: newId,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
      topic: topics[0],
      difficulty: "Intermediate",
    };
    setQuestions((prev) => [...prev, newQ]);
    setSelectedQuestionIndex(questions.length);
  };

  const handleDeleteQuestion = (idxToDelete) => {
    if (questions.length <= 1) {
      alert("An assessment must have at least one question.");
      return;
    }
    setQuestions((prev) => prev.filter((_, idx) => idx !== idxToDelete));
    if (selectedQuestionIndex >= idxToDelete && selectedQuestionIndex > 0) {
      setSelectedQuestionIndex((prev) => prev - 1);
    }
  };

  // Recommended course handlers
  const handleAddCourse = () => {
    setRecommendedCourses((prev) => [
      ...prev,
      {
        title: "",
        slug: "",
        badge: "Recommended",
        duration: "3 Months",
        description: "",
      },
    ]);
  };

  const handleUpdateCourse = (idx, field, value) => {
    setRecommendedCourses((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleDeleteCourse = (idx) => {
    setRecommendedCourses((prev) => prev.filter((_, i) => i !== idx));
  };

  // Form submit validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];

    if (!title.trim()) errors.push("Assessment title is required.");
    if (!slug.trim()) errors.push("URL slug is required.");
    if (!description.trim()) errors.push("Short description is required.");

    if (questions.length < 5) {
      errors.push(`Assessment has only ${questions.length} question(s). A standard test requires 10 questions.`);
    }

    questions.forEach((q, idx) => {
      if (!q.question.trim()) {
        errors.push(`Question #${idx + 1} has empty question text.`);
      }
      const filledOptions = q.options.filter((opt) => opt.trim().length > 0);
      if (filledOptions.length < 2) {
        errors.push(`Question #${idx + 1} must have at least 2 non-empty options.`);
      }
      if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
        errors.push(`Question #${idx + 1} has an invalid correct answer selected.`);
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      if (errors.some((err) => err.includes("Question #"))) {
        setActiveTab("questions");
      } else {
        setActiveTab("details");
      }
      return;
    }

    setValidationErrors([]);

    const finalCategory = category === "other" && customCategory ? customCategory : category;

    const payload = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      category: finalCategory,
      targetAudience: targetAudience.trim(),
      description: description.trim(),
      longDescription: longDescription.trim(),
      durationMinutes: Number(durationMinutes) || 10,
      passingPercentage: Number(passingPercentage) || 60,
      isActive: Boolean(isActive),
      questions: questions.map((q, idx) => ({
        id: q.id || `q-${idx + 1}`,
        question: q.question.trim(),
        options: q.options.map((o) => o.trim()),
        correctAnswer: Number(q.correctAnswer) || 0,
        explanation: (q.explanation || "").trim(),
        topic: (q.topic || "Core Principles").trim(),
        difficulty: q.difficulty || "Intermediate",
      })),
      recommendedCourses: recommendedCourses
        .filter((c) => c.title.trim())
        .map((c) => ({
          title: c.title.trim(),
          slug: c.slug.trim().toLowerCase(),
          badge: c.badge.trim() || "Recommended",
          duration: c.duration.trim() || "3 Months",
          description: c.description.trim(),
        })),
    };

    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="assessment-modal-overlay" onClick={onClose}>
      <div
        className="assessment-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="assessment-modal-header">
          <div className="assessment-modal-title-wrap">
            <span className="assessment-modal-icon-badge">
              <Award size={20} />
            </span>
            <div>
              <h2 className="assessment-modal-title">
                {assessment ? "Edit Skill Assessment Test" : "Create New Skill Assessment Test"}
              </h2>
              <p className="assessment-modal-subtitle">
                Configure test parameters, questions, topics for analytics, and course recommendations
              </p>
            </div>
          </div>
          <button
            type="button"
            className="assessment-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="assessment-modal-tabs">
          <button
            type="button"
            className={`assessment-modal-tab ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            <Layers size={16} />
            <span>Test Overview & Rules</span>
          </button>
          <button
            type="button"
            className={`assessment-modal-tab ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}
          >
            <ListOrdered size={16} />
            <span>Questions & Answer Keys</span>
            <span className="assessment-tab-badge">{questions.length} Qs</span>
          </button>
          <button
            type="button"
            className={`assessment-modal-tab ${activeTab === "courses" ? "active" : ""}`}
            onClick={() => setActiveTab("courses")}
          >
            <GraduationCap size={16} />
            <span>Course Recommendations</span>
            <span className="assessment-tab-badge">{recommendedCourses.length}</span>
          </button>
        </div>

        {/* Validation Errors banner */}
        {validationErrors.length > 0 && (
          <div className="assessment-validation-alert">
            <AlertCircle size={18} className="flex-shrink-0" />
            <div className="assessment-validation-content">
              <strong>Please fix the following issues before saving:</strong>
              <ul>
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="assessment-modal-body">
          {/* TAB 1: DETAILS */}
          {activeTab === "details" && (
            <div className="assessment-tab-content">
              <div className="assessment-form-grid">
                {/* Title */}
                <div className="assessment-form-group full-width">
                  <label className="assessment-form-label">
                    Assessment Title <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className="assessment-input"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g., Computer Fundamentals Assessment"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="assessment-form-group">
                  <label className="assessment-form-label">
                    URL Slug <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    className="assessment-input"
                    value={slug}
                    onChange={(e) => {
                      setIsSlugManual(true);
                      setSlug(e.target.value);
                    }}
                    placeholder="e.g., computer-fundamentals-test"
                    required
                  />
                  <span className="assessment-input-hint">
                    Live URL: /assessment/{slug || "test-name"}
                  </span>
                </div>

                {/* Category */}
                <div className="assessment-form-group">
                  <label className="assessment-form-label">Category</label>
                  <select
                    className="assessment-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="other">Other / Custom</option>
                  </select>
                </div>

                {/* Custom Category if other */}
                {category === "other" && (
                  <div className="assessment-form-group">
                    <label className="assessment-form-label">Custom Category</label>
                    <input
                      type="text"
                      className="assessment-input"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="e.g., Cloud & DevOps"
                    />
                  </div>
                )}

                {/* Target Audience */}
                <div className="assessment-form-group">
                  <label className="assessment-form-label">Target Audience</label>
                  <input
                    type="text"
                    className="assessment-input"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., Beginners, Office Professionals, Design Students"
                  />
                </div>

                {/* Duration */}
                <div className="assessment-form-group">
                  <label className="assessment-form-label">
                    <Clock size={14} className="inline mr-1" /> Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    className="assessment-input"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                  />
                </div>

                {/* Passing Score */}
                <div className="assessment-form-group">
                  <label className="assessment-form-label">
                    <Target size={14} className="inline mr-1" /> Passing Score (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    className="assessment-input"
                    value={passingPercentage}
                    onChange={(e) => setPassingPercentage(e.target.value)}
                  />
                </div>

                {/* Active Toggle */}
                <div className="assessment-form-group">
                  <label className="assessment-form-label">Publish Status</label>
                  <label className="assessment-toggle-row">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <span>Active & Visible to Public Visitors</span>
                  </label>
                </div>

                {/* Short Description */}
                <div className="assessment-form-group full-width">
                  <label className="assessment-form-label">
                    Short Description <span className="req">*</span>
                  </label>
                  <textarea
                    rows={2}
                    className="assessment-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Summary shown on the assessments listing cards..."
                  />
                </div>

                {/* Long Description */}
                <div className="assessment-form-group full-width">
                  <label className="assessment-form-label">Detailed Instructions / Syllabus (Optional)</label>
                  <textarea
                    rows={3}
                    className="assessment-textarea"
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    placeholder="Comprehensive explanation of topics covered and pre-requisites..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QUESTIONS BUILDER */}
          {activeTab === "questions" && (
            <div className="assessment-tab-content questions-builder-tab">
              {/* Left Question Navigation Sidebar */}
              <div className="assessment-questions-sidebar">
                <div className="assessment-questions-sidebar-header">
                  <span className="sidebar-q-count">
                    {questions.length} Questions ({questions.length === 10 ? "Standard" : "Custom"})
                  </span>
                  <button
                    type="button"
                    className="sidebar-add-q-btn"
                    onClick={handleAddQuestion}
                    title="Add another question"
                  >
                    <Plus size={14} /> Add Q
                  </button>
                </div>

                <div className="assessment-questions-pills-list">
                  {questions.map((q, idx) => {
                    const isConfigured =
                      q.question.trim().length > 0 &&
                      q.options.filter((o) => o.trim()).length >= 2;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`sidebar-q-pill ${
                          selectedQuestionIndex === idx ? "active" : ""
                        } ${isConfigured ? "configured" : "incomplete"}`}
                        onClick={() => setSelectedQuestionIndex(idx)}
                      >
                        <span className="pill-q-num">Q{idx + 1}</span>
                        <div className="pill-q-meta">
                          <span className="pill-q-snippet">
                            {q.question.trim() ? q.question : "Empty Question..."}
                          </span>
                          <span className="pill-q-topic">{q.topic || "General"}</span>
                        </div>
                        {isConfigured && <Check size={12} className="pill-q-check" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Selected Question Editor */}
              {currentQ ? (
                <div className="assessment-question-editor-pane">
                  <div className="question-pane-header">
                    <div className="question-pane-title">
                      <h3>Question {selectedQuestionIndex + 1}</h3>
                      <span className="q-badge">{currentQ.difficulty || "Intermediate"}</span>
                    </div>

                    <div className="question-pane-actions">
                      <button
                        type="button"
                        className="q-delete-btn"
                        onClick={() => handleDeleteQuestion(selectedQuestionIndex)}
                        title="Delete this question"
                      >
                        <Trash2 size={15} /> Delete Q
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="assessment-form-group full-width">
                    <label className="assessment-form-label">
                      Question Prompt <span className="req">*</span>
                    </label>
                    <textarea
                      rows={3}
                      className="assessment-textarea question-prompt-input"
                      value={currentQ.question}
                      onChange={(e) =>
                        handleUpdateCurrentQuestion("question", e.target.value)
                      }
                      placeholder="Type the question text here..."
                    />
                  </div>

                  {/* Topic & Difficulty Row */}
                  <div className="assessment-form-grid" style={{ marginBottom: "1.25rem" }}>
                    <div className="assessment-form-group">
                      <label className="assessment-form-label">
                        Topic Category Tag (Used for Performance Diagnostic) <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="assessment-input"
                        value={currentQ.topic || ""}
                        onChange={(e) =>
                          handleUpdateCurrentQuestion("topic", e.target.value)
                        }
                        placeholder="e.g., SEO, Syntax, Pivot Tables, 3D Solids"
                        list="topic-suggestions"
                      />
                      <datalist id="topic-suggestions">
                        {(PRESET_TOPICS_BY_CATEGORY[category] || []).map((t) => (
                          <option key={t} value={t} />
                        ))}
                      </datalist>
                    </div>

                    <div className="assessment-form-group">
                      <label className="assessment-form-label">Difficulty Level</label>
                      <select
                        className="assessment-select"
                        value={currentQ.difficulty || "Intermediate"}
                        onChange={(e) =>
                          handleUpdateCurrentQuestion("difficulty", e.target.value)
                        }
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  {/* Multiple Choice Options (4 options) */}
                  <div className="assessment-options-group">
                    <div className="assessment-options-header">
                      <label className="assessment-form-label">
                        Answer Options (Select the radio of the CORRECT answer) <span className="req">*</span>
                      </label>
                      <span className="correct-answer-indicator">
                        Current Correct: Option {String.fromCharCode(65 + currentQ.correctAnswer)}
                      </span>
                    </div>

                    <div className="assessment-options-list">
                      {currentQ.options.map((opt, optIdx) => {
                        const isCorrect = currentQ.correctAnswer === optIdx;
                        const letter = String.fromCharCode(65 + optIdx);
                        return (
                          <div
                            key={optIdx}
                            className={`assessment-option-row ${isCorrect ? "is-correct" : ""}`}
                          >
                            <label
                              className="option-radio-label"
                              title="Click to mark this option as the correct answer"
                            >
                              <input
                                type="radio"
                                name={`correct-${selectedQuestionIndex}`}
                                checked={isCorrect}
                                onChange={() =>
                                  handleUpdateCurrentQuestion("correctAnswer", optIdx)
                                }
                              />
                              <span className="option-letter">{letter}</span>
                            </label>

                            <input
                              type="text"
                              className="assessment-input option-text-input"
                              value={opt}
                              onChange={(e) => handleUpdateOption(optIdx, e.target.value)}
                              placeholder={`Option ${letter} text...`}
                            />

                            {isCorrect && (
                              <span className="correct-tag">
                                <Check size={14} /> Correct
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Detailed Explanation */}
                  <div className="assessment-form-group full-width" style={{ marginTop: "1.25rem" }}>
                    <label className="assessment-form-label">
                      Answer Explanation (Shown to user in their Results Diagnostic)
                    </label>
                    <textarea
                      rows={2}
                      className="assessment-textarea"
                      value={currentQ.explanation}
                      onChange={(e) =>
                        handleUpdateCurrentQuestion("explanation", e.target.value)
                      }
                      placeholder="Explain why the selected option is correct and provide learning insight..."
                    />
                  </div>
                </div>
              ) : (
                <div className="no-question-selected">
                  <HelpCircle size={36} />
                  <p>Select a question from the left sidebar or click "Add Q" to create one.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RECOMMENDED COURSES */}
          {activeTab === "courses" && (
            <div className="assessment-tab-content">
              <div className="assessment-courses-intro">
                <div>
                  <h3 className="section-subtitle">Mapped Course Recommendations</h3>
                  <p className="section-hint">
                    When a learner completes this test, these courses will be recommended on their score screen with direct links to the syllabus.
                  </p>
                </div>
                <button
                  type="button"
                  className="assessment-add-course-btn"
                  onClick={handleAddCourse}
                >
                  <Plus size={15} /> Add Course Suggestion
                </button>
              </div>

              {recommendedCourses.length === 0 ? (
                <div className="empty-courses-state">
                  <BookOpen size={36} />
                  <p>No courses mapped yet. Add courses relevant to this subject domain.</p>
                  <button
                    type="button"
                    className="assessment-btn-secondary"
                    onClick={handleAddCourse}
                  >
                    Add First Recommendation
                  </button>
                </div>
              ) : (
                <div className="assessment-courses-cards-list">
                  {recommendedCourses.map((crs, cIdx) => (
                    <div key={cIdx} className="assessment-course-card-edit">
                      <div className="course-card-edit-header">
                        <span className="course-idx-badge">Suggestion #{cIdx + 1}</span>
                        <button
                          type="button"
                          className="course-delete-btn"
                          onClick={() => handleDeleteCourse(cIdx)}
                          title="Remove course"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>

                      <div className="assessment-form-grid">
                        <div className="assessment-form-group">
                          <label className="assessment-form-label">Course Title</label>
                          <input
                            type="text"
                            className="assessment-input"
                            value={crs.title}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "title", e.target.value)
                            }
                            placeholder="e.g., Advanced AutoCAD & 3D Modeling"
                          />
                        </div>

                        <div className="assessment-form-group">
                          <label className="assessment-form-label">Course Slug / URL</label>
                          <input
                            type="text"
                            className="assessment-input"
                            value={crs.slug}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "slug", e.target.value)
                            }
                            placeholder="e.g., autocad-2d-3d-mastery"
                          />
                        </div>

                        <div className="assessment-form-group">
                          <label className="assessment-form-label">Badge Label</label>
                          <input
                            type="text"
                            className="assessment-input"
                            value={crs.badge}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "badge", e.target.value)
                            }
                            placeholder="e.g., Best for Beginners, Career Track"
                          />
                        </div>

                        <div className="assessment-form-group">
                          <label className="assessment-form-label">Duration</label>
                          <input
                            type="text"
                            className="assessment-input"
                            value={crs.duration}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "duration", e.target.value)
                            }
                            placeholder="e.g., 3 Months, 120 Hours"
                          />
                        </div>

                        <div className="assessment-form-group full-width">
                          <label className="assessment-form-label">Short Description</label>
                          <input
                            type="text"
                            className="assessment-input"
                            value={crs.description}
                            onChange={(e) =>
                              handleUpdateCourse(cIdx, "description", e.target.value)
                            }
                            placeholder="Why should the student take this course based on their score?"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="assessment-modal-footer">
          <div className="assessment-footer-info">
            <span className="footer-metric">
              <strong>{questions.length}</strong> Questions
            </span>
            <span className="footer-divider">•</span>
            <span className="footer-metric">
              <strong>{durationMinutes}</strong> Mins
            </span>
            <span className="footer-divider">•</span>
            <span className="footer-metric">
              Pass: <strong>{passingPercentage}%</strong>
            </span>
          </div>

          <div className="assessment-footer-actions">
            <button
              type="button"
              className="assessment-btn-cancel"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="assessment-btn-save"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? (
                <>Saving Changes...</>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>{assessment ? "Update Assessment Test" : "Create Assessment Test"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

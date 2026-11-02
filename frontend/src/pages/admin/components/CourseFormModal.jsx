import React, { useState, useRef, useMemo } from "react";
import {
  X,
  Upload,
  Layers,
  Wrench,
  BookOpen,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import "./CourseFormModal.css";

const CATEGORIES = [
  "Web Development",
  "Animation & 3D",
  "CAD & 3D",
  "Graphic Design",
  "Programming & Dev",
  "AI & Data",
  "Cloud & DevOps",
  "Video Editing",
  "Business & Analytics",
  "Cybersecurity",
];

const DEFAULT_TOOLS = [
  { id: "tool-1", name: "Industry Workstations", iconType: "workstation", glowColor: "rgba(246, 217, 107, 0.28)" },
  { id: "tool-2", name: "Licensed Pro Suites", iconType: "software", glowColor: "rgba(246, 217, 107, 0.28)" },
  { id: "tool-3", name: "Live Project Labs", iconType: "projects", glowColor: "rgba(246, 217, 107, 0.28)" },
  { id: "tool-4", name: "ISO Certified Standards", iconType: "certification", glowColor: "rgba(246, 217, 107, 0.28)" },
];

const DEFAULT_MODULES = [
  { id: "m-1", moduleNumber: "MODULE 1", title: "Core Fundamentals & Foundations", description: "Mastering fundamental principles, modern architecture, and syntax." },
  { id: "m-2", moduleNumber: "MODULE 2", title: "Intermediate Building & Architecture", description: "Hands-on projects, component patterns, and state lifecycle." },
  { id: "m-3", moduleNumber: "MODULE 3", title: "Advanced Workflows & Best Practices", description: "Performance optimization, security benchmarks, and design systems." },
  { id: "m-4", moduleNumber: "MODULE 4", title: "Real-World Projects & Collaboration", description: "Industry-grade capstone projects built in team environments." },
  { id: "m-5", moduleNumber: "MODULE 5", title: "Portfolio, Deployment & Placement Prep", description: "CI/CD deployments, live domain hosting, and mock interviews." },
];

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function CourseFormModal({
  isOpen,
  course,
  onClose,
  onSave,
  isSaving,
  existingCategories = [],
}) {
  const [activeTab, setActiveTab] = useState("basic");
  const [title, setTitle] = useState(course?.title || "");
  const [slug, setSlug] = useState(course?.slug || "");
  const availableCategories = useMemo(() => {
    const set = new Set([
      ...CATEGORIES,
      ...(Array.isArray(existingCategories) ? existingCategories : []),
    ]);
    if (course?.category) {
      set.add(course.category);
    }
    return Array.from(set).filter((c) => typeof c === "string" && c.trim().length > 0);
  }, [existingCategories, course]);

  const [selectedCategoryOption, setSelectedCategoryOption] = useState(() => {
    if (course?.category) {
      return course.category;
    }
    return "Web Development";
  });
  const [customCategory, setCustomCategory] = useState("");
  const [duration, setDuration] = useState(course?.duration || "6 Months");
  const [badge, setBadge] = useState(course?.badge || "Job Oriented");
  const [description, setDescription] = useState(course?.description || "");
  const [imageUrl, setImageUrl] = useState(course?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(course?.image || "");
  const [prerequisites] = useState(
    Array.isArray(course?.prerequisites) && course.prerequisites.length
      ? course.prerequisites
      : [
          "Basic computer literacy",
          "Passion for hands-on learning",
          "No prior coding experience required",
        ]
  );
  const [tools, setTools] = useState(
    Array.isArray(course?.tools) && course.tools.length >= 4
      ? course.tools.slice(0, 4)
      : DEFAULT_TOOLS
  );
  const [modules, setModules] = useState(
    Array.isArray(course?.modules) && course.modules.length >= 5
      ? course.modules.slice(0, 5)
      : DEFAULT_MODULES
  );
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);

  // Handle Title Change with auto slug generation
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!course) {
      setSlug(slugify(val));
    }
  };

  // Image Selection Handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Tool updates
  const handleToolChange = (index, field, value) => {
    setTools((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Module updates
  const handleModuleChange = (index, field, value) => {
    setModules((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("Course title is required.");
      setActiveTab("basic");
      return;
    }

    const validTools = tools.filter((t) => t && typeof t.name === "string" && t.name.trim().length > 0);
    const validModules = modules.filter((m) => m && typeof m.title === "string" && m.title.trim().length > 0);

    let finalCategory = selectedCategoryOption;
    if (selectedCategoryOption === "__new__") {
      finalCategory = customCategory.trim();
      if (!finalCategory) {
        setErrorMsg("Please enter a name for the new category, or select an existing one.");
        setActiveTab("basic");
        return;
      }
    } else {
      finalCategory = (finalCategory || "").trim() || "General";
    }

    const payload = {
      title: title.trim(),
      slug: (slug.trim() || slugify(title)),
      category: finalCategory,
      duration: duration.trim(),
      badge: badge.trim(),
      description: description.trim(),
      image: imageUrl.trim(),
      prerequisites: prerequisites.filter((p) => p && typeof p === "string" && p.trim().length > 0),
      tools: validTools,
      modules: validModules,
    };

    onSave(payload, imageFile);
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="course-form-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="course-form-header">
          <div>
            <span className="course-form-badge">
              {course ? "EDIT MODE" : "NEW COURSE"}
            </span>
            <h2 className="course-form-title">
              {course ? `Edit: ${course.title}` : "Create New Dynamic Course"}
            </h2>
          </div>
          <button className="admin-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="course-form-tabs">
          <button
            type="button"
            className={`form-tab-btn ${activeTab === "basic" ? "active" : ""}`}
            onClick={() => setActiveTab("basic")}
          >
            <BookOpen size={16} />
            <span>Basic Info & Image</span>
          </button>
          <button
            type="button"
            className={`form-tab-btn ${activeTab === "curriculum" ? "active" : ""}`}
            onClick={() => setActiveTab("curriculum")}
          >
            <Layers size={16} />
            <span>Modules & Tools (5 & 4)</span>
          </button>
        </div>

        {errorMsg && <div className="course-form-error">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="course-form-body">
          {/* TAB 1: BASIC DETAILS & CLOUDINARY IMAGE */}
          {activeTab === "basic" && (
            <div className="form-tab-content">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Course Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="e.g. MERN Full Stack Development"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>URL Slug (auto-generated)</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    placeholder="e.g. mern-full-stack-development"
                    required
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <div className="category-label-row">
                    <label>Category *</label>
                    {selectedCategoryOption !== "__new__" ? (
                      <button
                        type="button"
                        className="category-add-inline-btn"
                        onClick={() => setSelectedCategoryOption("__new__")}
                        title="Create a new category"
                      >
                        + New
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="category-add-inline-btn"
                        onClick={() => setSelectedCategoryOption(availableCategories[0] || "Web Development")}
                        title="Select an existing category"
                      >
                        Existing
                      </button>
                    )}
                  </div>
                  <select
                    value={selectedCategoryOption}
                    onChange={(e) => {
                      setSelectedCategoryOption(e.target.value);
                      if (e.target.value !== "__new__") {
                        setCustomCategory("");
                      }
                    }}
                  >
                    <optgroup label="Existing Categories">
                      {availableCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Actions">
                      <option value="__new__">➕ + Create New Category...</option>
                    </optgroup>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 6 Months"
                  />
                </div>
                <div className="form-group">
                  <label>Badge / Highlight</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Job Oriented, Trending"
                  />
                </div>
              </div>

              {selectedCategoryOption === "__new__" && (
                <div className="form-group custom-category-box">
                  <div className="custom-category-header">
                    <label>New Category Name *</label>
                    <button
                      type="button"
                      className="category-cancel-btn"
                      onClick={() => {
                        setSelectedCategoryOption(availableCategories[0] || "Web Development");
                        setCustomCategory("");
                      }}
                    >
                      Use existing category instead
                    </button>
                  </div>
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="e.g. Mobile App Development, Artificial Intelligence, Digital Marketing..."
                    autoFocus
                    required
                  />
                  <span className="category-hint">
                    This new category will automatically be saved with this course and appear across all category filters.
                  </span>
                </div>
              )}

              <div className="form-group">
                <label>Course Summary / Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive description of the course curriculum, career outcomes, and hands-on skills..."
                />
              </div>

              {/* ImageKit CDN Image Upload Section */}
              <div className="form-group">
                <label className="image-upload-label">
                  <span>Course Banner Image (Uploaded to ImageKit CDN)</span>
                  <span className="image-badge">ImageKit Enabled</span>
                </label>

                <div className="image-upload-container">
                  <div
                    className="image-dropzone"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {imagePreview ? (
                      <div className="image-preview-wrapper">
                        <img src={imagePreview} alt="Preview" className="preview-img" />
                        <div className="image-preview-overlay">
                          <Upload size={18} />
                          <span>Change Image (ImageKit)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="dropzone-empty">
                        <Upload size={32} className="dropzone-icon" />
                        <span className="dropzone-title">Click to upload via ImageKit</span>
                        <span className="dropzone-hint">PNG, JPG, WebP up to 10MB</span>
                      </div>
                    )}
                  </div>

                  <div className="image-url-fallback">
                    <span className="url-fallback-title">Or paste direct image URL:</span>
                    <div className="url-input-wrap">
                      <LinkIcon size={16} />
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          if (!imageFile) setImagePreview(e.target.value);
                        }}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MODULES (5) & TOOLS (4) */}
          {activeTab === "curriculum" && (
            <div className="form-tab-content">
              {/* 4 Industry Tools */}
              <div className="curriculum-sub-section">
                <div className="sub-section-header">
                  <Wrench size={18} className="sub-icon" />
                  <h4>4 Industry Tools You'll Master</h4>
                </div>
                <div className="tools-edit-grid">
                  {tools.map((tool, idx) => (
                    <div key={tool.id || idx} className="tool-edit-card">
                      <span className="tool-num">Tool {idx + 1}</span>
                      <input
                        type="text"
                        value={tool.name}
                        onChange={(e) => handleToolChange(idx, "name", e.target.value)}
                        placeholder={`Tool Name (e.g. React)`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 5 Modules */}
              <div className="curriculum-sub-section">
                <div className="sub-section-header">
                  <Layers size={18} className="sub-icon" />
                  <h4>5 Course Modules (Compact & Readable)</h4>
                </div>
                <div className="modules-edit-stack">
                  {modules.map((mod, idx) => (
                    <div key={mod.id || idx} className="module-edit-card">
                      <div className="module-edit-top">
                        <span className="module-tag">MODULE {idx + 1}</span>
                        <input
                          type="text"
                          className="module-title-input"
                          value={mod.title}
                          onChange={(e) => handleModuleChange(idx, "title", e.target.value)}
                          placeholder="Module Title"
                        />
                      </div>
                      <textarea
                        rows={2}
                        className="module-desc-input"
                        value={mod.description}
                        onChange={(e) => handleModuleChange(idx, "description", e.target.value)}
                        placeholder="Brief summary of skills and hands-on topics covered..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="course-form-footer">
            <button type="button" className="form-btn-cancel" onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="form-btn-submit" disabled={isSaving}>
              <Sparkles size={16} />
              <span>
                {isSaving
                  ? "Saving to Database..."
                  : course
                  ? "Update Course"
                  : "Publish Course"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

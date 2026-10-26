import React, { useState, useEffect } from "react";
import {
  X,
  Briefcase,
  Building,
  MapPin,
  Banknote,
  Users,
  User,
  Plus,
  Trash2,
  Sparkles,
  Link as LinkIcon,
  CheckCircle2,
  Layers,
  FileText
} from "lucide-react";
import "./JobFormModal.css";

const CATEGORIES = [
  "IT",
  "Software Development",
  "Graphic & UI/UX Design",
  "Accounting & Tally",
  "B2B & Digital Sales",
  "Video Editing & Animation",
  "MIS & Data Operations",
  "Digital Marketing",
  "Cybersecurity",
  "Hardware & Networking",
];

const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Internship", "Remote"];

const POSTED_TAGS = ["Active Now", "Urgent Hiring", "Hot Job", "Immediate Joiner", "Fresher Friendly"];

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function JobFormModal({ isOpen, job, onClose, onSave, isSaving }) {
  const [activeTab, setActiveTab] = useState("core");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    company: "",
    category: "IT",
    location: "Jaipur",
    jobType: "Full Time",
    salary: "₹15,000 – ₹25,000 / month",
    openings: "2 Vacancies",
    experience: "0 – 2 Years",
    postedDate: "Active Now",
    description: "",
    responsibilities: [
      "Deliver high-quality tasks matching corporate project deadlines",
      "Collaborate directly with cross-functional team members",
    ],
    requirements: [
      "Completed certification/course from ThirdEye Computer Classes",
      "Hands-on practical software proficiency and good communication",
    ],
    aliases: "",
    isActive: true,
  });

  const [newResp, setNewResp] = useState("");
  const [newReq, setNewReq] = useState("");

  // Populate form on edit or reset on create
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        slug: job.slug || "",
        company: job.company || "",
        category: job.category || "IT",
        location: job.location || "Jaipur",
        jobType: job.jobType || "Full Time",
        salary: job.salary || "",
        openings: job.openings || "1 Vacancy",
        experience: job.experience || "0 – 2 Years",
        postedDate: job.postedDate || "Active Now",
        description: job.description || "",
        responsibilities:
          Array.isArray(job.responsibilities) && job.responsibilities.length > 0
            ? job.responsibilities
            : [""],
        requirements:
          Array.isArray(job.requirements) && job.requirements.length > 0
            ? job.requirements
            : [""],
        aliases: Array.isArray(job.aliases) ? job.aliases.join(", ") : job.aliases || "",
        isActive: job.isActive !== false,
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        company: "",
        category: "IT",
        location: "Jaipur",
        jobType: "Full Time",
        salary: "₹15,000 – ₹25,000 / month",
        openings: "2 Vacancies",
        experience: "0 – 2 Years",
        postedDate: "Active Now",
        description: "",
        responsibilities: [
          "Deliver high-quality tasks matching corporate project deadlines",
          "Collaborate directly with cross-functional team members",
        ],
        requirements: [
          "Completed certification/course from ThirdEye Computer Classes",
          "Hands-on practical software proficiency and good communication",
        ],
        aliases: "",
        isActive: true,
      });
    }
    setActiveTab("core");
  }, [job, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto generate slug from title when creating
      if (name === "title" && !job && (!prev.slug || prev.slug === slugify(prev.title))) {
        updated.slug = slugify(value);
      }

      return updated;
    });
  };

  // Dynamic Responsibilities Add/Remove
  const handleAddResp = () => {
    if (!newResp.trim()) return;
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, newResp.trim()],
    }));
    setNewResp("");
  };

  const handleRemoveResp = (idx) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== idx),
    }));
  };

  // Dynamic Requirements Add/Remove
  const handleAddReq = () => {
    if (!newReq.trim()) return;
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, newReq.trim()],
    }));
    setNewReq("");
  };

  const handleRemoveReq = (idx) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.company || !formData.location || !formData.salary) {
      alert("Please fill in all core fields: Title, Company, Location, and Salary are required.");
      return;
    }

    const payload = {
      ...formData,
      slug: formData.slug ? slugify(formData.slug) : slugify(formData.title),
      aliases: formData.aliases
        ? formData.aliases
            .split(",")
            .map((s) => slugify(s))
            .filter(Boolean)
        : [],
    };

    onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="job-modal-backdrop" onClick={onClose}>
      <div
        className="job-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="job-modal-header">
          <div className="modal-header-titles">
            <span className="modal-header-badge">
              <Briefcase size={14} />
              <span>{job ? "EDIT JOB OPENING" : "ADD NEW JOB OPENING"}</span>
            </span>
            <h2 className="modal-main-heading">
              {job ? `Edit: ${job.title}` : "Create Career Opening (MongoDB)"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="job-modal-close-icon"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="job-modal-tab-bar">
          <button
            type="button"
            onClick={() => setActiveTab("core")}
            className={`tab-bar-btn ${activeTab === "core" ? "tab-active" : ""}`}
          >
            <Building size={15} />
            <span>Core Details</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("vacancies")}
            className={`tab-bar-btn ${activeTab === "vacancies" ? "tab-active" : ""}`}
          >
            <Users size={15} />
            <span>Vacancies & Criteria</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("details")}
            className={`tab-bar-btn ${activeTab === "details" ? "tab-active" : ""}`}
          >
            <FileText size={15} />
            <span>Role & Checklist</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="job-modal-form-content">
          {/* TAB 1: CORE DETAILS */}
          {activeTab === "core" && (
            <div className="modal-tab-pane">
              <div className="modal-fields-grid-2">
                <div className="modal-field-item">
                  <label className="field-title">
                    Job Title <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Graphic Designer, Account Executive..."
                    className="modal-text-control"
                  />
                </div>

                <div className="modal-field-item">
                  <label className="field-title">
                    Company Name <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Beyond Designer, Technovate Labs..."
                    className="modal-text-control"
                  />
                </div>
              </div>

              <div className="modal-fields-grid-3">
                <div className="modal-field-item">
                  <label className="field-title">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="modal-select-control"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-field-item">
                  <label className="field-title">Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="modal-select-control"
                  >
                    {JOB_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-field-item">
                  <label className="field-title">
                    Location <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Mansarovar, Jaipur"
                    className="modal-text-control"
                  />
                </div>
              </div>

              <div className="modal-fields-grid-2">
                <div className="modal-field-item">
                  <label className="field-title">
                    Salary Package <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    placeholder="e.g. ₹15,000 – ₹22,000 / month"
                    className="modal-text-control"
                  />
                </div>

                <div className="modal-field-item">
                  <label className="field-title">
                    Custom URL Slug (Live at /jobs/:slug)
                  </label>
                  <div className="slug-input-wrapper">
                    <span className="slug-prefix">/jobs/</span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      placeholder="graphic-designer"
                      className="slug-input-control"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-field-item">
                <label className="field-title">
                  URL Aliases (Comma separated, e.g. "graphic, designer")
                </label>
                <input
                  type="text"
                  name="aliases"
                  value={formData.aliases}
                  onChange={handleChange}
                  placeholder="e.g. graphic, designer, graphics"
                  className="modal-text-control"
                />
                <span className="field-help-text">
                  Allows direct URLs like <code>/jobs/graphic</code> to instantly resolve to this job.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: VACANCIES & CRITERIA */}
          {activeTab === "vacancies" && (
            <div className="modal-tab-pane">
              <div className="modal-fields-grid-3">
                <div className="modal-field-item">
                  <label className="field-title">Number of Openings</label>
                  <input
                    type="text"
                    name="openings"
                    value={formData.openings}
                    onChange={handleChange}
                    placeholder="e.g. 3 Vacancies"
                    className="modal-text-control"
                  />
                </div>

                <div className="modal-field-item">
                  <label className="field-title">Experience Required</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 0 – 2 Years / Freshers Welcome"
                    className="modal-text-control"
                  />
                </div>

                <div className="modal-field-item">
                  <label className="field-title">Hiring Badge</label>
                  <select
                    name="postedDate"
                    value={formData.postedDate}
                    onChange={handleChange}
                    className="modal-select-control"
                  >
                    {POSTED_TAGS.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-checkbox-row">
                <input
                  type="checkbox"
                  id="job-is-active"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="modal-checkbox-control"
                />
                <label htmlFor="job-is-active" className="checkbox-label-text">
                  <strong>Active & Visible on Public Website</strong> (Uncheck to temporarily pause hiring)
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: ROLE & CHECKLIST */}
          {activeTab === "details" && (
            <div className="modal-tab-pane">
              <div className="modal-field-item">
                <label className="field-title">
                  Role Overview / Description <span className="req-star">*</span>
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Provide an overview of the company, team environment, and expectations..."
                  className="modal-textarea-control"
                />
              </div>

              {/* Responsibilities */}
              <div className="modal-field-item">
                <label className="field-title">Key Responsibilities (Checklist)</label>
                <div className="bullets-adder-row">
                  <input
                    type="text"
                    value={newResp}
                    onChange={(e) => setNewResp(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddResp();
                      }
                    }}
                    placeholder="Type a responsibility and click Add..."
                    className="modal-text-control"
                  />
                  <button
                    type="button"
                    onClick={handleAddResp}
                    className="bullet-add-btn"
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>

                <div className="bullets-tags-list">
                  {formData.responsibilities.map((r, i) => (
                    <div key={i} className="bullet-item-tag">
                      <CheckCircle2 size={14} className="tag-check" />
                      <span className="tag-text">{r}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResp(i)}
                        className="tag-remove-btn"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="modal-field-item">
                <label className="field-title">Candidate Requirements & Skills</label>
                <div className="bullets-adder-row">
                  <input
                    type="text"
                    value={newReq}
                    onChange={(e) => setNewReq(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddReq();
                      }
                    }}
                    placeholder="Type a requirement (e.g. Adobe Photoshop, 30+ WPM)..."
                    className="modal-text-control"
                  />
                  <button
                    type="button"
                    onClick={handleAddReq}
                    className="bullet-add-btn"
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>

                <div className="bullets-tags-list">
                  {formData.requirements.map((req, i) => (
                    <div key={i} className="bullet-item-tag">
                      <CheckCircle2 size={14} className="tag-check" />
                      <span className="tag-text">{req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveReq(i)}
                        className="tag-remove-btn"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="job-modal-footer">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="modal-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="modal-save-btn"
            >
              <Sparkles size={16} />
              <span>
                {isSaving
                  ? "Saving to MongoDB..."
                  : job
                  ? "Update Job in MongoDB"
                  : "Publish Job to MongoDB"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

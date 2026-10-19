import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Banknote,
  CheckCircle2,
  Upload,
  Calendar,
  Building,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck
} from "lucide-react";
import { JOB_OPENINGS, getJobBySlug } from "./jobsData";
import { getJobBySlug as fetchJobBySlug } from "../../services/jobApi";
import { createSubmission } from "../../services/submissionApi";
import "./JobDetailPage.css";

export default function JobDetailPage() {
  const { jobSlug } = useParams();
  const navigate = useNavigate();

  // Find job from local cache or seed initially
  const [job, setJob] = useState(() => getJobBySlug(jobSlug) || JOB_OPENINGS[0]);

  // Scroll to top and fetch dynamic job from MongoDB
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let isMounted = true;

    const localJob = getJobBySlug(jobSlug);
    if (localJob) {
      setJob(localJob);
    }

    fetchJobBySlug(jobSlug)
      .then((data) => {
        if (isMounted && data) {
          setJob(data);
        }
      })
      .catch((err) => {
        console.warn("Using local job details:", err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, [jobSlug]);

  // Application Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    fileName: "",
    consent: false
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setFormData((prev) => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createSubmission(
        {
          formType: "job_application",
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          coverLetter: formData.coverLetter.trim(),
          resumeFileName: formData.fileName,
          jobTitle: job?.title || "Job Application",
          jobSlug: job?.slug || "",
          company: job?.company || "",
        },
        resumeFile
      );
      setIsSubmitted(true);
    } catch (err) {
      console.warn("MongoDB submission warning:", err.message);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Related other job openings
  const otherJobs = JOB_OPENINGS.filter((j) => j.slug !== job?.slug && j.id !== job?.id && j.id !== job?._id).slice(0, 3);

  return (
    <div className="job-detail-page">
      {/* Background Ambience */}
      <div className="job-detail-bg-orb" />
      <div className="job-detail-grid-overlay" />

      <div className="job-detail-container">
        {/* Top Breadcrumb Navigation */}
        <div className="job-detail-top-nav">
          <Link to="/jobs-placement" className="back-to-jobs-btn">
            <ArrowLeft size={16} />
            <span>Back to All Openings</span>
          </Link>
          <div className="job-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="crumb-sep">/</span>
            <Link to="/jobs-placement">Jobs & Placements</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{job.title}</span>
          </div>
        </div>

        {/* Hero Header Card */}
        <div className="job-detail-hero-card">
          <div className="hero-top-meta">
            <div className="job-status-pill">
              <span className="pulse-dot" />
              <span>{job.postedDate || "Active Hiring"}</span>
            </div>
            <div className="job-type-pill">{job.jobType}</div>
          </div>

          <div className="hero-titles-wrap">
            <span className="job-details-eyebrow">JOB DETAILS</span>
            <h1 className="job-detail-main-title">{job.title}</h1>
            <div className="job-company-badge">
              <Building size={18} className="company-icon" />
              <span className="company-name-text">{job.company}</span>
              <span className="verified-check" title="Verified Third Eye Corporate Hiring Partner">
                <ShieldCheck size={16} />
              </span>
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="job-quick-specs-grid">
            <div className="spec-card">
              <div className="spec-icon-box">
                <Briefcase size={18} />
              </div>
              <div className="spec-texts">
                <span className="spec-label">Job Category</span>
                <span className="spec-val">{job.category}</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon-box">
                <MapPin size={18} />
              </div>
              <div className="spec-texts">
                <span className="spec-label">Job Location</span>
                <span className="spec-val">{job.location}</span>
              </div>
            </div>

            <div className="spec-card highlight-spec">
              <div className="spec-icon-box gold-box">
                <Banknote size={18} />
              </div>
              <div className="spec-texts">
                <span className="spec-label">Salary Package</span>
                <span className="spec-val gold-val">{job.salary}</span>
              </div>
            </div>

            <div className="spec-card">
              <div className="spec-icon-box">
                <Clock size={18} />
              </div>
              <div className="spec-texts">
                <span className="spec-label">Vacancies</span>
                <span className="spec-val">{job.openings}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Two Columns (Left Details, Right Application Form) */}
        <div className="job-content-split-layout">
          {/* Left Column: Job Description, Responsibilities, Requirements */}
          <div className="job-info-left-pane">
            {/* Overview / Description */}
            <div className="info-section-block">
              <h2 className="info-block-heading">Role Overview</h2>
              <p className="info-block-desc">{job.description}</p>
            </div>

            {/* Key Responsibilities */}
            <div className="info-section-block">
              <h2 className="info-block-heading">Key Responsibilities</h2>
              <ul className="bullets-checklist">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="bullet-check-item">
                    <CheckCircle2 size={18} className="bullet-gold-check" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Candidate Requirements */}
            <div className="info-section-block">
              <h2 className="info-block-heading">Candidate Requirements & Skills</h2>
              <ul className="bullets-checklist">
                {job.requirements.map((req, i) => (
                  <li key={i} className="bullet-check-item">
                    <CheckCircle2 size={18} className="bullet-gold-check" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Placement Assistance Guarantee Banner */}
            <div className="third-eye-placement-pledge">
              <div className="pledge-icon-wrap">
                <Sparkles size={24} className="pledge-sparkle" />
              </div>
              <div className="pledge-content">
                <h3>Third Eye Placement Guarantee</h3>
                <p>
                  As an enrolled student or alumnus of Third Eye Computer Classes, you receive
                  direct portfolio review, mock HR interview drills, and fast-track recruiter referral.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: "Apply for this position" Form (Screenshots 2 & 3) */}
          <div className="job-form-right-pane" id="apply-form-section">
            <div className="apply-form-container-card">
              <div className="apply-form-header">
                <h2 className="apply-title-text">Apply for this position</h2>
                <p className="apply-subtitle-text">
                  Submit your application directly to {job.company} HR & Third Eye placement desk.
                </p>
              </div>

              {isSubmitted ? (
                <div className="application-success-box">
                  <FileCheck size={48} className="success-icon-check" />
                  <h3>Application Submitted Successfully!</h3>
                  <p>
                    Thank you, <strong>{formData.fullName}</strong>. Your profile for{" "}
                    <strong>{job.title}</strong> has been received by the Third Eye Placement Cell.
                  </p>
                  <p className="success-contact-hint">
                    Our team will review your resume and coordinate directly with you for interview rounds.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        coverLetter: "",
                        fileName: "",
                        consent: false
                      });
                      setResumeFile(null);
                    }}
                    className="submit-another-btn"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="job-application-form">
                  {/* Full Name * */}
                  <div className="form-group-item">
                    <label className="field-label-text">
                      Full Name <span className="red-star">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="form-text-input"
                    />
                  </div>

                  {/* Email * */}
                  <div className="form-group-item">
                    <label className="field-label-text">
                      Email <span className="red-star">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. rahul@example.com"
                      className="form-text-input"
                    />
                  </div>

                  {/* Phone * */}
                  <div className="form-group-item">
                    <label className="field-label-text">
                      Phone <span className="red-star">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 98765 43210"
                      className="form-text-input"
                    />
                  </div>

                  {/* Cover Letter * */}
                  <div className="form-group-item">
                    <label className="field-label-text">
                      Cover Letter <span className="red-star">*</span>
                    </label>
                    <textarea
                      name="coverLetter"
                      rows={4}
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      required
                      placeholder="Briefly describe your training, project skills, software tools learned at Third Eye, and why you are interested in this role..."
                      className="form-textarea-input"
                    />
                  </div>

                  {/* Upload CV / Resume * (Screenshot 3) */}
                  <div className="form-group-item">
                    <label className="field-label-text">
                      Upload CV/Resume <span className="red-star">*</span>
                    </label>
                    <div className="custom-file-picker-row">
                      <label htmlFor="job-resume-upload" className="file-browse-btn">
                        <Upload size={15} />
                        <span>Choose file</span>
                      </label>
                      <input
                        id="job-resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="native-hidden-file-input"
                      />
                      <span className="chosen-file-display">
                        {formData.fileName || "No file chosen"}
                      </span>
                    </div>
                    <span className="file-formats-allowed">
                      Allowed Type(s): .pdf, .doc, .docx
                    </span>
                  </div>

                  {/* Consent Checkbox * (Screenshot 3) */}
                  <div className="form-consent-agreement-row">
                    <input
                      type="checkbox"
                      id="job-data-consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      required
                      className="consent-checkbox-control"
                    />
                    <label htmlFor="job-data-consent" className="consent-label-copy">
                      By using this form you agree with the storage and handling of your data by
                      this website. <span className="red-star">*</span>
                    </label>
                  </div>

                  {/* Pink Submit Button (Exact replica of Screenshot 3) */}
                  <div className="form-submit-action-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="pink-apply-submit-btn"
                    >
                      {isSubmitting ? "Submitting Application..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Explore Other Openings Footer Section */}
        {otherJobs.length > 0 && (
          <div className="other-openings-section">
            <div className="other-openings-header">
              <h3 className="other-openings-title">Explore Other Job Openings</h3>
              <Link to="/jobs-placement" className="view-all-jobs-link">
                <span>View All Openings</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="other-jobs-cards-grid">
              {otherJobs.map((item) => (
                <div
                  key={item.id}
                  className="other-job-card-box"
                  onClick={() => navigate(`/jobs/${item.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navigate(`/jobs/${item.slug}`);
                    }
                  }}
                >
                  <div className="other-card-top">
                    <h4 className="other-job-card-title">{item.title}</h4>
                    <span className="other-job-type-pill">{item.jobType}</span>
                  </div>
                  <div className="other-job-company">{item.company}</div>
                  <div className="other-job-salary">{item.salary}</div>
                  <div className="other-job-footer">
                    <span className="other-details-cta">
                      <span>View Details</span>
                      <ArrowRight size={14} />
                    </span>
                    <span className="other-openings-count">{item.openings}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

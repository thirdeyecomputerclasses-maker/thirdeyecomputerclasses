import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  BookOpen,
  Briefcase,
  Cloud,
  Database,
  Layers,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  MapPin,
  Building,
  Banknote,
  Users,
  Clock,
  Eye,
  Inbox,
  Mail,
  PhoneCall,
  MessageSquare,
  FileText,
  AlertCircle,
  FileCheck,
  Send,
  Crown,
  KeyRound,
  LogOut,
  ShieldCheck,
  Lock,
  UserCheck,
} from "lucide-react";
import { useClerk } from "@clerk/react";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getHealthStatus,
} from "../../services/courseApi";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../../services/jobApi";
import {
  getSubmissions,
  getSubmissionStats,
  updateSubmissionStatus,
  deleteSubmission,
} from "../../services/submissionApi";
import { getStoredSession, clearAdminSession } from "../../services/authApi";
import CourseFormModal from "./components/CourseFormModal";
import JobFormModal from "./components/JobFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import AdminGateScreen from "./AdminGateScreen";
import SecurityManagerTab from "./components/SecurityManagerTab";
import "./AdminPage.css";

export default function AdminPage() {
  const { signOut } = useClerk();
  const [adminSession, setAdminSession] = useState(() => getStoredSession());

  // Navigation: "courses" | "jobs" | "forms" | "security"
  const [activeSection, setActiveSection] = useState(() => {
    const s = getStoredSession();
    if (s?.role === "jobs_admin") return "jobs";
    if (s?.role === "submissions_admin") return "forms";
    return "courses";
  });

  // Courses state
  const [courses, setCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [courseSearchQuery, setCourseSearchQuery] = useState("");
  const [selectedCourseCategory, setSelectedCourseCategory] = useState("all");
  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isCourseDeleteOpen, setIsCourseDeleteOpen] = useState(false);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [isCourseSaving, setIsCourseSaving] = useState(false);
  const [isCourseDeleting, setIsCourseDeleting] = useState(false);

  // Jobs state (MongoDB)
  const [jobs, setJobs] = useState([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const [selectedJobCategory, setSelectedJobCategory] = useState("all");
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isJobDeleteOpen, setIsJobDeleteOpen] = useState(false);
  const [deletingJob, setDeletingJob] = useState(null);
  const [isJobSaving, setIsJobSaving] = useState(false);
  const [isJobDeleting, setIsJobDeleting] = useState(false);

  // Form Submissions state (MongoDB)
  const [submissions, setSubmissions] = useState([]);
  const [submissionStats, setSubmissionStats] = useState({
    total: 0,
    contact: 0,
    franchise: 0,
    job_application: 0,
    newSubmissions: 0,
  });
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState("");
  const [selectedFormType, setSelectedFormType] = useState("all");
  const [selectedSubmissionStatus, setSelectedSubmissionStatus] = useState("all");
  const [isSubmissionDeleteOpen, setIsSubmissionDeleteOpen] = useState(false);
  const [deletingSubmission, setDeletingSubmission] = useState(null);
  const [isSubmissionDeleting, setIsSubmissionDeleting] = useState(false);

  // Shared state
  const [toastMessage, setToastMessage] = useState("");
  const [serverHealth, setServerHealth] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Fetch courses
  const loadCourses = () => {
    setIsLoadingCourses(true);
    getCourses()
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load courses:", err);
      })
      .finally(() => {
        setIsLoadingCourses(false);
      });
  };

  // Fetch jobs from MongoDB
  const loadJobs = () => {
    setIsLoadingJobs(true);
    getJobs()
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load jobs from MongoDB:", err);
      })
      .finally(() => {
        setIsLoadingJobs(false);
      });
  };

  // Fetch form submissions from MongoDB
  const loadSubmissions = () => {
    setIsLoadingSubmissions(true);
    getSubmissions()
      .then((data) => {
        setSubmissions(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load submissions from MongoDB:", err);
      })
      .finally(() => {
        setIsLoadingSubmissions(false);
      });

    getSubmissionStats()
      .then((stats) => {
        if (stats) setSubmissionStats(stats);
      })
      .catch(() => {});
  };

  // Health check
  const checkHealth = () => {
    getHealthStatus()
      .then((h) => {
        if (h) setServerHealth(h);
      })
      .catch(() => {});
  };

  useEffect(() => {
    document.title = "Admin Console | Third Eye Courses, Jobs & Form Inquiries";
    window.scrollTo(0, 0);

    loadCourses();
    loadJobs();
    loadSubmissions();
    checkHealth();
  }, []);

  // -------------------------------------------------------------
  // COURSES HANDLERS & COMPUTED
  // -------------------------------------------------------------
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesCategory =
        selectedCourseCategory === "all" ||
        (c.category &&
          c.category.toLowerCase() === selectedCourseCategory.toLowerCase());
      const q = courseSearchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        c.title?.toLowerCase().includes(q) ||
        c.slug?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [courses, courseSearchQuery, selectedCourseCategory]);

  const courseCategoriesList = useMemo(() => {
    const set = new Set();
    courses.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ["all", ...Array.from(set)];
  }, [courses]);

  const handleOpenCreateCourse = () => {
    setEditingCourse(null);
    setIsCourseFormOpen(true);
  };

  const handleOpenEditCourse = (course) => {
    setEditingCourse(course);
    setIsCourseFormOpen(true);
  };

  const handleOpenDeleteCourse = (course) => {
    setDeletingCourse(course);
    setIsCourseDeleteOpen(true);
  };

  const handleSaveCourse = async (courseData, imageFile) => {
    setIsCourseSaving(true);
    try {
      if (editingCourse) {
        const id = editingCourse._id || editingCourse.id;
        const updated = await updateCourse(id, courseData, imageFile);
        setCourses((prev) =>
          prev.map((c) =>
            (c._id && c._id === id) || (c.id && c.id === id) ? updated : c
          )
        );
        showToast(`Course "${courseData.title}" updated successfully!`);
      } else {
        const created = await createCourse(courseData, imageFile);
        setCourses((prev) => [created, ...prev]);
        showToast(`Course "${courseData.title}" published successfully!`);
      }
      setIsCourseFormOpen(false);
      setEditingCourse(null);
    } catch (err) {
      alert(`Failed to save course: ${err.message}`);
    } finally {
      setIsCourseSaving(false);
    }
  };

  const handleConfirmDeleteCourse = async (id) => {
    setIsCourseDeleting(true);
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c._id !== id && c.id !== id));
      showToast("Course deleted successfully.");
      setIsCourseDeleteOpen(false);
      setDeletingCourse(null);
    } catch (err) {
      alert(`Failed to delete course: ${err.message}`);
    } finally {
      setIsCourseDeleting(false);
    }
  };

  const handleSeedSampleCourse = async () => {
    setIsCourseSaving(true);
    const sample = {
      title: "MERN Full Stack Development",
      slug: "mern-full-stack-development",
      category: "Web Development",
      duration: "6 Months",
      badge: "Job Oriented",
      description:
        "Master modern full-stack engineering with MongoDB, Express.js, React, Node.js, Next.js, and automated cloud deployments.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
      prerequisites: [
        "Basic computer literacy",
        "Curiosity for building web applications",
        "No prior coding experience required",
      ],
      tools: [
        {
          id: "react",
          name: "React 19",
          iconType: "react",
          glowColor: "rgba(97, 218, 251, 0.3)",
        },
        {
          id: "nodejs",
          name: "Node.js",
          iconType: "nodejs",
          glowColor: "rgba(104, 160, 99, 0.3)",
        },
        {
          id: "mongodb",
          name: "MongoDB",
          iconType: "mongodb",
          glowColor: "rgba(71, 162, 72, 0.3)",
        },
        {
          id: "tailwind",
          name: "Tailwind CSS",
          iconType: "tailwind",
          glowColor: "rgba(56, 189, 248, 0.3)",
        },
      ],
      modules: [
        {
          id: "m-1",
          moduleNumber: "MODULE 1",
          title: "HTML5, CSS3, Modern UI & Responsive Layouts",
          description:
            "Design principles, flexbox, CSS grid, and modern styling architectures.",
        },
        {
          id: "m-2",
          moduleNumber: "MODULE 2",
          title: "JavaScript ES6+, DOM Manipulation & Async Engine",
          description:
            "Closures, promises, fetch API, events, and modern JS patterns.",
        },
        {
          id: "m-3",
          moduleNumber: "MODULE 3",
          title: "React, State Management & Modern Hooks",
          description:
            "Functional components, custom hooks, context, and client-side routing.",
        },
        {
          id: "m-4",
          moduleNumber: "MODULE 4",
          title: "Node.js, Express & RESTful API Architecture",
          description:
            "Middleware, JWT authentication, error handling, and server logic.",
        },
        {
          id: "m-5",
          moduleNumber: "MODULE 5",
          title: "MongoDB Database Modeling & Cloud Deployments",
          description:
            "Aggregation pipelines, schema validation, Docker, and CI/CD hosting.",
        },
      ],
    };

    try {
      const created = await createCourse(sample);
      setCourses((prev) => [created, ...prev]);
      showToast("Sample course created successfully!");
    } catch (err) {
      alert("Failed to create sample course: " + err.message);
    } finally {
      setIsCourseSaving(false);
    }
  };

  // -------------------------------------------------------------
  // JOBS HANDLERS & COMPUTED (MONGODB)
  // -------------------------------------------------------------
  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchesCategory =
        selectedJobCategory === "all" ||
        (j.category &&
          j.category.toLowerCase() === selectedJobCategory.toLowerCase());
      const q = jobSearchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        j.title?.toLowerCase().includes(q) ||
        j.company?.toLowerCase().includes(q) ||
        j.location?.toLowerCase().includes(q) ||
        j.category?.toLowerCase().includes(q) ||
        j.description?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [jobs, jobSearchQuery, selectedJobCategory]);

  const jobCategoriesList = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => {
      if (j.category) set.add(j.category);
    });
    return ["all", ...Array.from(set)];
  }, [jobs]);

  const totalVacanciesCount = useMemo(() => {
    return jobs.reduce((total, j) => {
      const num = parseInt(j.openings) || 1;
      return total + num;
    }, 0);
  }, [jobs]);

  const hiringCompaniesCount = useMemo(() => {
    const companies = new Set();
    jobs.forEach((j) => {
      if (j.company) companies.add(j.company.trim().toLowerCase());
    });
    return companies.size;
  }, [jobs]);

  const handleOpenCreateJob = () => {
    setEditingJob(null);
    setIsJobFormOpen(true);
  };

  const handleOpenEditJob = (job) => {
    setEditingJob(job);
    setIsJobFormOpen(true);
  };

  const handleOpenDeleteJob = (job) => {
    setDeletingJob(job);
    setIsJobDeleteOpen(true);
  };

  const handleSaveJob = async (jobPayload) => {
    setIsJobSaving(true);
    try {
      if (editingJob) {
        const id = editingJob._id || editingJob.id;
        const updated = await updateJob(id, jobPayload);
        setJobs((prev) =>
          prev.map((j) =>
            (j._id && j._id === id) || (j.id && j.id === id) ? updated : j
          )
        );
        showToast(`Job opening "${jobPayload.title}" updated in MongoDB!`);
      } else {
        const created = await createJob(jobPayload);
        setJobs((prev) => [created, ...prev]);
        showToast(`New job "${jobPayload.title}" published to MongoDB!`);
      }
      setIsJobFormOpen(false);
      setEditingJob(null);
    } catch (err) {
      alert(`Failed to save job in MongoDB: ${err.message}`);
    } finally {
      setIsJobSaving(false);
    }
  };

  const handleConfirmDeleteJob = async (id) => {
    setIsJobDeleting(true);
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id && j.id !== id));
      showToast("Job opening permanently removed from MongoDB.");
      setIsJobDeleteOpen(false);
      setDeletingJob(null);
    } catch (err) {
      alert(`Failed to delete job: ${err.message}`);
    } finally {
      setIsJobDeleting(false);
    }
  };

  // -------------------------------------------------------------
  // FORM SUBMISSIONS HANDLERS & COMPUTED (MONGODB)
  // -------------------------------------------------------------
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      const matchesType =
        selectedFormType === "all" || s.formType === selectedFormType;
      const matchesStatus =
        selectedSubmissionStatus === "all" || s.status === selectedSubmissionStatus;

      const q = submissionSearchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.phone?.toLowerCase().includes(q) ||
        s.city?.toLowerCase().includes(q) ||
        s.jobTitle?.toLowerCase().includes(q) ||
        s.company?.toLowerCase().includes(q) ||
        s.message?.toLowerCase().includes(q) ||
        s.coverLetter?.toLowerCase().includes(q);

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [submissions, selectedFormType, selectedSubmissionStatus, submissionSearchQuery]);

  const handleStatusChange = async (submissionId, newStatus) => {
    try {
      const updated = await updateSubmissionStatus(submissionId, newStatus);
      setSubmissions((prev) =>
        prev.map((s) => (s._id === submissionId ? updated : s))
      );
      showToast(`Status updated to "${newStatus.replace('_', ' ')}"!`);
      loadSubmissions();
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleOpenDeleteSubmission = (sub) => {
    setDeletingSubmission({
      _id: sub._id,
      title: `${sub.name} (${sub.formType.replace('_', ' ')})`,
    });
    setIsSubmissionDeleteOpen(true);
  };

  const handleConfirmDeleteSubmission = async (id) => {
    setIsSubmissionDeleting(true);
    try {
      await deleteSubmission(id);
      setSubmissions((prev) => prev.filter((s) => s._id !== id));
      showToast("Submission entry deleted from MongoDB.");
      setIsSubmissionDeleteOpen(false);
      setDeletingSubmission(null);
      loadSubmissions();
    } catch (err) {
      alert(`Failed to delete submission: ${err.message}`);
    } finally {
      setIsSubmissionDeleting(false);
    }
  };

  const formatTimestamp = (isoString) => {
    if (!isoString) return "Just now";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const handleLockSession = () => {
    clearAdminSession();
    setAdminSession(null);
  };

  const handleClerkSignOut = async () => {
    clearAdminSession();
    setAdminSession(null);
    try {
      await signOut();
    } catch (e) {
      console.warn("Sign out err:", e);
    }
  };

  // Gate Check: If not cleared, display Gate 1 (Clerk) & Gate 2 (Role Passcode)
  if (!adminSession || !adminSession.role) {
    return (
      <AdminGateScreen
        onClearanceSuccess={(sessionData) => {
          setAdminSession(sessionData);
          if (sessionData.role === "jobs_admin") {
            setActiveSection("jobs");
          } else if (sessionData.role === "submissions_admin") {
            setActiveSection("forms");
          } else if (sessionData.role === "course_admin") {
            setActiveSection("courses");
          }
        }}
      />
    );
  }

  const role = adminSession?.role;
  const canAccessCourses = role === "global_admin" || role === "course_admin";
  const canAccessJobs = role === "global_admin" || role === "jobs_admin";
  const canAccessForms = role === "global_admin" || role === "submissions_admin";
  const canAccessSecurity = role === "global_admin";

  return (
    <div className="admin-page">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="admin-container">
        {/* Top Security & Identity Strip */}
        <div className="admin-session-strip">
          <div className="admin-session-user">
            <div className="admin-session-avatar">
              <UserCheck size={16} />
            </div>
            <div className="admin-session-details">
              <div className="admin-session-name">
                <span className="text-zinc-400">Authenticated:</span>{" "}
                <strong className="text-white">{adminSession?.clerkName || "Admin"}</strong>
              </div>
              <div className="admin-session-role-pill">
                {role === "global_admin" && (
                  <span className="role-pill-badge global">
                    <Crown size={12} /> Master Global Admin
                  </span>
                )}
                {role === "course_admin" && (
                  <span className="role-pill-badge course">
                    <BookOpen size={12} /> Courses Sub-Admin
                  </span>
                )}
                {role === "jobs_admin" && (
                  <span className="role-pill-badge jobs">
                    <Briefcase size={12} /> Job Openings Sub-Admin
                  </span>
                )}
                {role === "submissions_admin" && (
                  <span className="role-pill-badge submissions">
                    <Inbox size={12} /> Queries & Forms Sub-Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="admin-session-actions">
            <button
              type="button"
              onClick={handleLockSession}
              className="admin-session-btn lock"
              title="Lock panel and require passcode re-entry"
            >
              <Lock size={14} />
              <span>Lock Panel</span>
            </button>
            <button
              type="button"
              onClick={handleClerkSignOut}
              className="admin-session-btn logout"
              title="Sign out of Clerk completely"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Top Header */}
        <div className="admin-header">
          <div>
            <div className="admin-badge-row">
              <span className="admin-badge">ADMIN CONSOLE</span>
              <span className="admin-status-pill">
                <Database size={14} />
                <span>
                  MongoDB:{" "}
                  {serverHealth?.database === "connected"
                    ? "Connected & Live"
                    : "Atlas Cloud Ready"}
                </span>
              </span>
              <span className="admin-status-pill">
                <Cloud size={14} />
                <span>
                  ImageKit:{" "}
                  {serverHealth?.imagekit === "connected"
                    ? "Active"
                    : "Available"}
                </span>
              </span>
            </div>
            <h1 className="admin-title">
              {activeSection === "courses" && "Course Management"}
              {activeSection === "jobs" && "Jobs & Placements Management"}
              {activeSection === "forms" && "Website Form Submissions"}
              {activeSection === "security" && "Security Clearance & Access Keys"}
            </h1>
            <p className="admin-subtitle">
              {activeSection === "courses" &&
                "Add, edit, and manage all live courses dynamically with ImageKit CDN uploads."}
              {activeSection === "jobs" &&
                "Add, edit, remove, and manage real-time job openings stored in MongoDB Atlas."}
              {activeSection === "forms" &&
                "Live applicant messages and leads uploaded to MongoDB from Contact Us, Franchise Inquiries, and Job Applications."}
              {activeSection === "security" &&
                "Configure passwords for each of the 4 admin levels and inspect recent login audit events."}
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              className="admin-refresh-btn"
              onClick={() => {
                if (activeSection === "courses") loadCourses();
                else if (activeSection === "jobs") loadJobs();
                else if (activeSection === "forms") loadSubmissions();
              }}
              title="Refresh data"
            >
              <RefreshCw
                size={17}
                className={
                  (activeSection === "courses" && isLoadingCourses) ||
                  (activeSection === "jobs" && isLoadingJobs) ||
                  (activeSection === "forms" && isLoadingSubmissions)
                    ? "spin"
                    : ""
                }
              />
            </button>
            {activeSection === "courses" && canAccessCourses && (
              <button className="admin-add-btn" onClick={handleOpenCreateCourse}>
                <Plus size={18} />
                <span>Add New Course</span>
              </button>
            )}
            {activeSection === "jobs" && canAccessJobs && (
              <button className="admin-add-btn" onClick={handleOpenCreateJob}>
                <Plus size={18} />
                <span>Add New Job Opening</span>
              </button>
            )}
            {activeSection === "forms" && canAccessForms && (
              <button
                className="admin-add-btn forms-refresh"
                onClick={loadSubmissions}
                title="Fetch latest submissions"
              >
                <RefreshCw size={17} />
                <span>Refresh Leads</span>
              </button>
            )}
          </div>
        </div>

        {/* Section Navigation Tabs: Filtered based on role */}
        <div className="admin-section-tabs">
          {canAccessCourses && (
            <button
              type="button"
              className={`admin-section-tab-btn ${
                activeSection === "courses" ? "active" : ""
              }`}
              onClick={() => setActiveSection("courses")}
            >
              <BookOpen size={18} />
              <span>Courses</span>
              <span className="section-count-badge">{courses.length}</span>
            </button>
          )}

          {canAccessJobs && (
            <button
              type="button"
              className={`admin-section-tab-btn ${
                activeSection === "jobs" ? "active" : ""
              }`}
              onClick={() => setActiveSection("jobs")}
            >
              <Briefcase size={18} />
              <span>Job Openings</span>
              <span className="section-count-badge">{jobs.length}</span>
            </button>
          )}

          {canAccessForms && (
            <button
              type="button"
              className={`admin-section-tab-btn ${
                activeSection === "forms" ? "active" : ""
              }`}
              onClick={() => setActiveSection("forms")}
            >
              <Inbox size={18} />
              <span>Form Submissions</span>
              <span className="section-count-badge">
                {submissions.length}
                {submissionStats.newSubmissions > 0 && (
                  <span className="badge-new-dot" title={`${submissionStats.newSubmissions} unhandled leads`} />
                )}
              </span>
            </button>
          )}

          {canAccessSecurity && (
            <button
              type="button"
              className={`admin-section-tab-btn ${
                activeSection === "security" ? "active" : ""
              }`}
              onClick={() => setActiveSection("security")}
            >
              <KeyRound size={18} />
              <span>Security & Passwords</span>
            </button>
          )}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: COURSES MANAGEMENT                                 */}
        {/* ========================================================= */}
        {activeSection === "courses" && (
          <>
            {/* Metrics Row */}
            <div className="admin-metrics-grid">
              <div className="admin-metric-card">
                <div className="metric-icon-wrap yellow">
                  <BookOpen size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">{courses.length}</span>
                  <span className="metric-label">Active Courses</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-wrap blue">
                  <Layers size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">
                    {Math.max(courseCategoriesList.length - 1, 0)}
                  </span>
                  <span className="metric-label">Categories</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-wrap green">
                  <Cloud size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">ImageKit</span>
                  <span className="metric-label">CDN Storage Engine</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-wrap purple">
                  <Database size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">Dynamic API</span>
                  <span className="metric-label">Database Connected</span>
                </div>
              </div>
            </div>

            {/* Controls: Search & Category Filters */}
            <div className="admin-controls-card">
              <div className="admin-search-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by title, category, description, or slug..."
                  value={courseSearchQuery}
                  onChange={(e) => setCourseSearchQuery(e.target.value)}
                />
                {courseSearchQuery && (
                  <button
                    className="search-clear-btn"
                    onClick={() => setCourseSearchQuery("")}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="admin-filter-pills">
                {courseCategoriesList.map((cat) => (
                  <button
                    key={cat}
                    className={`admin-filter-pill ${
                      selectedCourseCategory === cat ? "active" : ""
                    }`}
                    onClick={() => setSelectedCourseCategory(cat)}
                  >
                    {cat === "all" ? "All Categories" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Table / Cards Grid */}
            {isLoadingCourses ? (
              <div className="admin-loading-state">
                <RefreshCw size={32} className="spin admin-loading-icon" />
                <p>Loading course catalog...</p>
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="admin-courses-grid">
                {filteredCourses.map((course) => (
                  <div
                    key={course._id || course.id}
                    className="admin-course-card"
                  >
                    {/* Image Banner */}
                    <div className="admin-card-image-wrap">
                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="admin-card-img"
                        />
                      ) : (
                        <div className="admin-card-placeholder-img">
                          <BookOpen size={36} />
                        </div>
                      )}
                      {course.badge && (
                        <span className="admin-card-badge">{course.badge}</span>
                      )}
                      <span className="admin-card-category">
                        {course.category || "General"}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="admin-card-body">
                      <h3 className="admin-card-title">{course.title}</h3>
                      <div className="admin-card-slug">
                        /courses/{course.slug}
                      </div>
                      <p className="admin-card-desc">
                        {course.description ||
                          "No description provided for this course."}
                      </p>

                      <div className="admin-card-meta">
                        <span className="card-meta-pill">
                          ⏱ {course.duration || "6 Months"}
                        </span>
                        <span className="card-meta-pill">
                          📚 {course.modules?.length || 5} Modules
                        </span>
                        <span className="card-meta-pill">
                          🛠 {course.tools?.length || 4} Tools
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="admin-card-actions">
                      <Link
                        to={`/courses/${course.slug}`}
                        className="admin-action-btn view"
                        title="View live course page"
                      >
                        <ExternalLink size={15} />
                        <span>View Page</span>
                      </Link>

                      <div className="admin-action-group">
                        <button
                          className="admin-action-btn edit"
                          onClick={() => handleOpenEditCourse(course)}
                          title="Edit course"
                        >
                          <Edit2 size={15} />
                          <span>Edit</span>
                        </button>
                        {role === "global_admin" && (
                          <button
                            className="admin-action-btn delete"
                            onClick={() => handleOpenDeleteCourse(course)}
                            title="Delete course (Global Admin only)"
                          >
                            <Trash2 size={15} />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="admin-empty-state">
                <div className="empty-icon-wrap">
                  <Sparkles size={36} />
                </div>
                <h3>No dynamic courses found</h3>
                <p>
                  {courseSearchQuery
                    ? `No courses matching "${courseSearchQuery}". Try a different keyword.`
                    : "All dummy courses have been cleared. You can now publish courses dynamically with ImageKit CDN image upload."}
                </p>
                <div className="empty-actions">
                  <button
                    className="empty-btn-primary"
                    onClick={handleOpenCreateCourse}
                  >
                    <Plus size={16} />
                    <span>Create New Course</span>
                  </button>
                  {courses.length === 0 && (
                    <button
                      className="empty-btn-secondary"
                      onClick={handleSeedSampleCourse}
                      disabled={isCourseSaving}
                    >
                      <Sparkles size={16} />
                      <span>Load Sample Course</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 2: JOBS MANAGEMENT (MONGODB CRUD)                     */}
        {/* ========================================================= */}
        {activeSection === "jobs" && (
          <>
            {/* Metrics Row */}
            <div className="admin-metrics-grid">
              <div className="admin-metric-card">
                <div className="metric-icon-wrap yellow">
                  <Briefcase size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">{jobs.length}</span>
                  <span className="metric-label">Active Openings</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-wrap blue">
                  <Building size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">{hiringCompaniesCount}</span>
                  <span className="metric-label">Partner Companies</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-wrap green">
                  <Users size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">{totalVacanciesCount}+</span>
                  <span className="metric-label">Estimated Vacancies</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-wrap purple">
                  <Database size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">MongoDB Atlas</span>
                  <span className="metric-label">Live Cloud Storage</span>
                </div>
              </div>
            </div>

            {/* Controls: Search & Category Filters */}
            <div className="admin-controls-card">
              <div className="admin-search-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, location, or skills..."
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                />
                {jobSearchQuery && (
                  <button
                    className="search-clear-btn"
                    onClick={() => setJobSearchQuery("")}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="admin-filter-pills">
                {jobCategoriesList.map((cat) => (
                  <button
                    key={cat}
                    className={`admin-filter-pill ${
                      selectedJobCategory === cat ? "active" : ""
                    }`}
                    onClick={() => setSelectedJobCategory(cat)}
                  >
                    {cat === "all" ? "All Job Categories" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs List / Cards Grid */}
            {isLoadingJobs ? (
              <div className="admin-loading-state">
                <RefreshCw size={32} className="spin admin-loading-icon" />
                <p>Loading job openings from MongoDB Atlas...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="admin-jobs-grid">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id || job.id}
                    className={`admin-job-card ${job.isActive === false ? "inactive" : ""}`}
                  >
                    {/* Top Row: Category, Hiring Badge & Status */}
                    <div className="admin-job-top-bar">
                      <div className="job-tag-group">
                        <span className="job-category-tag">
                          {job.category || "General"}
                        </span>
                        {job.postedDate && (
                          <span className="job-badge-pill">{job.postedDate}</span>
                        )}
                      </div>
                      <span
                        className={`job-status-pill ${
                          job.isActive !== false ? "status-live" : "status-paused"
                        }`}
                      >
                        <span className="status-dot" />
                        <span>{job.isActive !== false ? "Live" : "Paused"}</span>
                      </span>
                    </div>

                    {/* Job Details */}
                    <div className="admin-job-info">
                      <h3 className="admin-job-title">{job.title}</h3>
                      <div className="admin-job-company-row">
                        <span className="company-name">
                          <Building size={14} />
                          {job.company}
                        </span>
                        <span className="dot-sep">•</span>
                        <span className="location-name">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                      </div>

                      <div className="admin-job-slug-link">
                        <code>/jobs/{job.slug}</code>
                      </div>

                      <p className="admin-job-desc">
                        {job.description || "No job summary provided."}
                      </p>

                      {/* Meta badges row */}
                      <div className="admin-job-meta-row">
                        <span className="job-meta-pill salary">
                          <Banknote size={14} />
                          <span>{job.salary || "Best in Industry"}</span>
                        </span>
                        <span className="job-meta-pill">
                          <Users size={14} />
                          <span>{job.openings || "1 Vacancy"}</span>
                        </span>
                        <span className="job-meta-pill">
                          <Clock size={14} />
                          <span>{job.experience || "Freshers"}</span>
                        </span>
                        <span className="job-meta-pill">
                          <span>🏷 {job.jobType || "Full Time"}</span>
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="admin-job-actions">
                      <Link
                        to={`/jobs/${job.slug}`}
                        className="admin-action-btn view"
                        title="View live job page"
                      >
                        <ExternalLink size={15} />
                        <span>Live Page</span>
                      </Link>

                      <div className="admin-action-group">
                        <button
                          type="button"
                          className="admin-action-btn edit"
                          onClick={() => handleOpenEditJob(job)}
                          title="Edit job opening"
                        >
                          <Edit2 size={15} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className="admin-action-btn delete"
                          onClick={() => handleOpenDeleteJob(job)}
                          title="Delete job opening"
                        >
                          <Trash2 size={15} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="admin-empty-state">
                <div className="empty-icon-wrap">
                  <Briefcase size={36} />
                </div>
                <h3>No job openings found</h3>
                <p>
                  {jobSearchQuery
                    ? `No jobs matching "${jobSearchQuery}". Try clearing your search keyword.`
                    : "No job postings currently in MongoDB. You can add your first opening right now."}
                </p>
                <div className="empty-actions">
                  <button
                    className="empty-btn-primary"
                    onClick={handleOpenCreateJob}
                  >
                    <Plus size={16} />
                    <span>Post First Job Opening</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 3: FORM SUBMISSIONS & LEADS (MONGODB)                 */}
        {/* ========================================================= */}
        {activeSection === "forms" && (
          <>
            {/* Metrics Row */}
            <div className="admin-metrics-grid">
              <div className="admin-metric-card">
                <div className="metric-icon-wrap yellow">
                  <Inbox size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">{submissionStats.total || submissions.length}</span>
                  <span className="metric-label">Total Inquiries</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-wrap blue">
                  <Building size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">{submissionStats.franchise || 0}</span>
                  <span className="metric-label">Franchise Leads</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-wrap purple">
                  <Briefcase size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">{submissionStats.job_application || 0}</span>
                  <span className="metric-label">Job Applications</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-wrap green">
                  <Mail size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">{submissionStats.contact || 0}</span>
                  <span className="metric-label">Contact Messages</span>
                </div>
              </div>
            </div>

            {/* Controls: Search, Form Type Filter, & Status Filter */}
            <div className="admin-controls-card forms-controls-card">
              <div className="admin-search-wrap">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by applicant name, phone, email, city, role, message..."
                  value={submissionSearchQuery}
                  onChange={(e) => setSubmissionSearchQuery(e.target.value)}
                />
                {submissionSearchQuery && (
                  <button
                    className="search-clear-btn"
                    onClick={() => setSubmissionSearchQuery("")}
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Form Type Filter Buttons */}
              <div className="admin-filter-pills">
                <button
                  type="button"
                  className={`admin-filter-pill ${selectedFormType === "all" ? "active" : ""}`}
                  onClick={() => setSelectedFormType("all")}
                >
                  All Inquiries ({submissions.length})
                </button>
                <button
                  type="button"
                  className={`admin-filter-pill ${selectedFormType === "contact" ? "active" : ""}`}
                  onClick={() => setSelectedFormType("contact")}
                >
                  Contact Us ({submissions.filter((s) => s.formType === "contact").length})
                </button>
                <button
                  type="button"
                  className={`admin-filter-pill ${selectedFormType === "franchise" ? "active" : ""}`}
                  onClick={() => setSelectedFormType("franchise")}
                >
                  Franchise Applications ({submissions.filter((s) => s.formType === "franchise").length})
                </button>
                <button
                  type="button"
                  className={`admin-filter-pill ${selectedFormType === "job_application" ? "active" : ""}`}
                  onClick={() => setSelectedFormType("job_application")}
                >
                  Job Applications ({submissions.filter((s) => s.formType === "job_application").length})
                </button>
              </div>

              {/* Status Filter */}
              <div className="forms-status-filter-row">
                <span className="filter-label">Status Filter:</span>
                {["all", "new", "in_review", "contacted", "resolved"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`form-status-pill-btn ${selectedSubmissionStatus === st ? "active" : ""}`}
                    onClick={() => setSelectedSubmissionStatus(st)}
                  >
                    {st === "all" ? "All Status" : st.replace("_", " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Submissions List / Feed Grid */}
            {isLoadingSubmissions ? (
              <div className="admin-loading-state">
                <RefreshCw size={32} className="spin admin-loading-icon" />
                <p>Loading submissions from MongoDB Atlas...</p>
              </div>
            ) : filteredSubmissions.length > 0 ? (
              <div className="admin-submissions-grid">
                {filteredSubmissions.map((sub) => {
                  const typeLabel =
                    sub.formType === "franchise"
                      ? "Franchise Application"
                      : sub.formType === "job_application"
                      ? "Job Application"
                      : "Contact Inquiry";

                  const typeColorClass =
                    sub.formType === "franchise"
                      ? "type-franchise"
                      : sub.formType === "job_application"
                      ? "type-job"
                      : "type-contact";

                  return (
                    <div key={sub._id} className="admin-submission-card">
                      {/* Top Bar: Form Type Badge, Timestamp & Status Selector */}
                      <div className="submission-card-top-bar">
                        <div className="submission-badge-group">
                          <span className={`submission-type-tag ${typeColorClass}`}>
                            {sub.formType === "franchise" && <Building size={12} />}
                            {sub.formType === "job_application" && <Briefcase size={12} />}
                            {sub.formType === "contact" && <Mail size={12} />}
                            <span>{typeLabel}</span>
                          </span>
                          <span className="submission-time-badge">
                            <Clock size={12} />
                            <span>{formatTimestamp(sub.createdAt)}</span>
                          </span>
                        </div>

                        {/* Interactive Status Changer */}
                        <div className="submission-status-wrapper">
                          <select
                            value={sub.status || "new"}
                            onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                            className={`submission-status-select status-${sub.status || "new"}`}
                            title="Update submission workflow status"
                          >
                            <option value="new">● New Lead</option>
                            <option value="in_review">● In Review</option>
                            <option value="contacted">● Contacted</option>
                            <option value="resolved">● Resolved</option>
                            <option value="archived">● Archived</option>
                          </select>
                        </div>
                      </div>

                      {/* Submitter Primary Info */}
                      <div className="submission-profile-row">
                        <div className="submission-avatar">
                          {sub.name?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <div className="submission-identity">
                          <h3 className="submission-name">{sub.name}</h3>
                          <div className="submission-contact-items">
                            <a
                              href={`tel:${sub.phone}`}
                              className="sub-contact-link phone"
                              title="Click to call"
                            >
                              <PhoneCall size={13} />
                              <span>{sub.phone}</span>
                            </a>
                            {sub.email && (
                              <a
                                href={`mailto:${sub.email}`}
                                className="sub-contact-link email"
                                title="Click to email"
                              >
                                <Mail size={13} />
                                <span>{sub.email}</span>
                              </a>
                            )}
                            {sub.city && (
                              <span className="sub-contact-pill city">
                                <MapPin size={13} />
                                <span>{sub.city}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Custom Form Attributes */}
                      {sub.formType === "franchise" && (
                        <div className="submission-meta-strip">
                          <div className="sub-meta-cell">
                            <span className="meta-cell-title">Investment Capacity</span>
                            <span className="meta-cell-val highlight">{sub.investment || "Not specified"}</span>
                          </div>
                          <div className="sub-meta-cell">
                            <span className="meta-cell-title">Professional Background</span>
                            <span className="meta-cell-val">{sub.background || "General"}</span>
                          </div>
                        </div>
                      )}

                      {sub.formType === "job_application" && (
                        <div className="submission-meta-strip">
                          <div className="sub-meta-cell">
                            <span className="meta-cell-title">Applied Role</span>
                            <span className="meta-cell-val highlight">
                              {sub.jobTitle || "Corporate Opening"}
                            </span>
                          </div>
                          {sub.company && (
                            <div className="sub-meta-cell">
                              <span className="meta-cell-title">Company</span>
                              <span className="meta-cell-val">{sub.company}</span>
                            </div>
                          )}
                          {(sub.resumeUrl || sub.resumeFileName) && (
                            <div className="sub-meta-cell">
                              <span className="meta-cell-title">Candidate Resume</span>
                              {sub.resumeUrl ? (
                                <a
                                  href={sub.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="meta-cell-val file-attached resume-active-link"
                                  title="Click to view/download candidate resume"
                                >
                                  <FileText size={13} />
                                  <span>{sub.resumeFileName || "View Resume PDF"}</span>
                                  <ExternalLink size={12} />
                                </a>
                              ) : (
                                <span className="meta-cell-val file-attached">
                                  <FileText size={12} />
                                  <span>{sub.resumeFileName}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Message / Cover Letter Body */}
                      {(sub.message || sub.coverLetter) && (
                        <div className="submission-message-box">
                          <div className="message-box-header">
                            <MessageSquare size={13} />
                            <span>{sub.formType === "job_application" ? "Cover Letter / Note:" : "Inquiry Message:"}</span>
                          </div>
                          <p className="message-box-body">
                            {sub.message || sub.coverLetter}
                          </p>
                        </div>
                      )}

                      {/* Quick Action Footer */}
                      <div className="submission-card-actions">
                        <div className="submission-action-direct">
                          <a
                            href={`tel:${sub.phone}`}
                            className="sub-btn-call"
                            title="Call applicant directly"
                          >
                            <PhoneCall size={14} />
                            <span>Call</span>
                          </a>
                          {sub.email && (
                            <a
                              href={`mailto:${sub.email}`}
                              className="sub-btn-email"
                              title="Send email reply"
                            >
                              <Mail size={14} />
                              <span>Email</span>
                            </a>
                          )}
                          {sub.resumeUrl && (
                            <a
                              href={sub.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="sub-btn-resume"
                              title="Open candidate resume in new tab"
                            >
                              <ExternalLink size={14} />
                              <span>View Resume</span>
                            </a>
                          )}
                        </div>

                        <button
                          type="button"
                          className="admin-action-btn delete"
                          onClick={() => handleOpenDeleteSubmission(sub)}
                          title="Delete submission from MongoDB"
                        >
                          <Trash2 size={15} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="admin-empty-state">
                <div className="empty-icon-wrap">
                  <Inbox size={36} />
                </div>
                <h3>No form submissions yet</h3>
                <p>
                  {submissionSearchQuery
                    ? `No submissions matching "${submissionSearchQuery}". Try clearing search query.`
                    : "Whenever someone fills out the Contact Us, Franchise Inquiry, or Job Application form on your website, it will immediately upload to MongoDB and appear right here."}
                </p>
                <div className="empty-actions">
                  <button
                    className="empty-btn-primary"
                    onClick={loadSubmissions}
                  >
                    <RefreshCw size={16} />
                    <span>Check for New Submissions</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SECURITY & PASSWORDS (GLOBAL ADMIN ONLY)           */}
        {/* ========================================================= */}
        {activeSection === "security" && role === "global_admin" && (
          <SecurityManagerTab showToast={showToast} />
        )}
      </div>

      {/* ========================================================= */}
      {/* MODALS                                                    */}
      {/* ========================================================= */}

      {/* Course Form Modal */}
      <CourseFormModal
        key={
          editingCourse?._id ||
          editingCourse?.id ||
          (isCourseFormOpen ? "course-open" : "course-closed")
        }
        isOpen={isCourseFormOpen}
        course={editingCourse}
        onClose={() => setIsCourseFormOpen(false)}
        onSave={handleSaveCourse}
        isSaving={isCourseSaving}
      />

      {/* Job Form Modal (MongoDB) */}
      <JobFormModal
        key={
          editingJob?._id ||
          editingJob?.id ||
          (isJobFormOpen ? "job-open" : "job-closed")
        }
        isOpen={isJobFormOpen}
        job={editingJob}
        onClose={() => setIsJobFormOpen(false)}
        onSave={handleSaveJob}
        isSaving={isJobSaving}
      />

      {/* Delete Confirmation Modal for Course */}
      <DeleteConfirmModal
        isOpen={isCourseDeleteOpen}
        course={deletingCourse}
        itemType="Course"
        onClose={() => setIsCourseDeleteOpen(false)}
        onConfirm={handleConfirmDeleteCourse}
        isDeleting={isCourseDeleting}
      />

      {/* Delete Confirmation Modal for Job */}
      <DeleteConfirmModal
        isOpen={isJobDeleteOpen}
        item={deletingJob}
        itemType="Job Opening"
        onClose={() => setIsJobDeleteOpen(false)}
        onConfirm={handleConfirmDeleteJob}
        isDeleting={isJobDeleting}
      />

      {/* Delete Confirmation Modal for Form Submission */}
      <DeleteConfirmModal
        isOpen={isSubmissionDeleteOpen}
        item={deletingSubmission}
        itemType="Form Submission"
        onClose={() => setIsSubmissionDeleteOpen(false)}
        onConfirm={handleConfirmDeleteSubmission}
        isDeleting={isSubmissionDeleting}
      />
    </div>
  );
}

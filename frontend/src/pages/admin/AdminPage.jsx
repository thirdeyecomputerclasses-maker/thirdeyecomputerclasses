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
  Award,
  GraduationCap,
  CheckSquare,
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
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../../services/blogApi";
import {
  getAdminAssessments,
  createAssessment,
  updateAssessment,
  deleteAssessment,
} from "../../services/assessmentApi";
import { getStoredSession, clearAdminSession } from "../../services/authApi";
import CourseFormModal from "./components/CourseFormModal";
import JobFormModal from "./components/JobFormModal";
import BlogFormModal from "./components/BlogFormModal";
import AssessmentFormModal from "./components/AssessmentFormModal";
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
    course_inquiry: 0,
    newSubmissions: 0,
  });
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState("");
  const [selectedFormType, setSelectedFormType] = useState("all");
  const [selectedSubmissionStatus, setSelectedSubmissionStatus] = useState("all");
  const [isSubmissionDeleteOpen, setIsSubmissionDeleteOpen] = useState(false);
  const [deletingSubmission, setDeletingSubmission] = useState(null);
  const [isSubmissionDeleting, setIsSubmissionDeleting] = useState(false);

  // Blogs CMS state (MongoDB)
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("all");
  const [selectedBlogStatus, setSelectedBlogStatus] = useState("all");
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isBlogDeleteOpen, setIsBlogDeleteOpen] = useState(false);
  const [deletingBlog, setDeletingBlog] = useState(null);
  const [isBlogSaving, setIsBlogSaving] = useState(false);
  const [isBlogDeleting, setIsBlogDeleting] = useState(false);

  // Skill Assessments state (MongoDB)
  const [assessments, setAssessments] = useState([]);
  const [isLoadingAssessments, setIsLoadingAssessments] = useState(true);
  const [assessmentSearchQuery, setAssessmentSearchQuery] = useState("");
  const [selectedAssessmentCategory, setSelectedAssessmentCategory] = useState("all");
  const [isAssessmentFormOpen, setIsAssessmentFormOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState(null);
  const [isAssessmentDeleteOpen, setIsAssessmentDeleteOpen] = useState(false);
  const [deletingAssessment, setDeletingAssessment] = useState(null);
  const [isAssessmentSaving, setIsAssessmentSaving] = useState(false);
  const [isAssessmentDeleting, setIsAssessmentDeleting] = useState(false);

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

  // Fetch blogs from MongoDB
  const loadBlogs = () => {
    setIsLoadingBlogs(true);
    getBlogs({ status: "all" })
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load blogs from MongoDB:", err);
      })
      .finally(() => {
        setIsLoadingBlogs(false);
      });
  };

  // Fetch skill assessments from MongoDB
  const loadAssessments = () => {
    setIsLoadingAssessments(true);
    getAdminAssessments()
      .then((data) => {
        setAssessments(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load assessments from MongoDB:", err);
      })
      .finally(() => {
        setIsLoadingAssessments(false);
      });
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
    document.title = "Admin Console | Third Eye Courses, Jobs, Blogs & Skill Tests";
    window.scrollTo(0, 0);

    loadCourses();
    loadJobs();
    loadSubmissions();
    loadBlogs();
    loadAssessments();
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
        s.course?.toLowerCase().includes(q) ||
        s.preferredBranch?.toLowerCase().includes(q) ||
        s.sourcePage?.toLowerCase().includes(q) ||
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

  // -------------------------------------------------------------
  // BLOGS HANDLERS & COMPUTED (MONGODB CMS)
  // -------------------------------------------------------------
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCategory =
        selectedBlogCategory === "all" ||
        (b.category &&
          b.category.toLowerCase() === selectedBlogCategory.toLowerCase());

      const matchesStatus =
        selectedBlogStatus === "all" || b.status === selectedBlogStatus;

      const q = blogSearchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        b.slug?.toLowerCase().includes(q) ||
        b.seoExcerpt?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        (Array.isArray(b.keywords) &&
          b.keywords.some((k) => k.toLowerCase().includes(q)));

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [blogs, blogSearchQuery, selectedBlogCategory, selectedBlogStatus]);

  const blogCategoriesList = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["all", ...Array.from(set)];
  }, [blogs]);

  const totalPublishedBlogsCount = useMemo(() => {
    return blogs.filter((b) => b.status === "published").length;
  }, [blogs]);

  const totalDraftBlogsCount = useMemo(() => {
    return blogs.filter((b) => b.status === "draft").length;
  }, [blogs]);

  const totalBlogViewsCount = useMemo(() => {
    return blogs.reduce((sum, b) => sum + (b.views || 0), 0);
  }, [blogs]);

  const handleOpenCreateBlog = () => {
    setEditingBlog(null);
    setIsBlogFormOpen(true);
  };

  const handleOpenEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsBlogFormOpen(true);
  };

  const handleOpenDeleteBlog = (blog) => {
    setDeletingBlog(blog);
    setIsBlogDeleteOpen(true);
  };

  const handleSaveBlog = async (blogPayload) => {
    setIsBlogSaving(true);
    try {
      if (editingBlog) {
        const id = editingBlog._id || editingBlog.id;
        const updated = await updateBlog(id, blogPayload);
        setBlogs((prev) =>
          prev.map((b) =>
            (b._id && b._id === id) || (b.id && b.id === id) ? updated : b
          )
        );
        showToast(`Blog post "${updated.title}" updated successfully!`);
      } else {
        const created = await createBlog(blogPayload);
        setBlogs((prev) => [created, ...prev]);
        showToast(`New blog post "${created.title}" published!`);
      }
      setIsBlogFormOpen(false);
      setEditingBlog(null);
    } catch (err) {
      alert("Failed to save blog post: " + err.message);
    } finally {
      setIsBlogSaving(false);
    }
  };

  const handleConfirmDeleteBlog = async (id) => {
    setIsBlogDeleting(true);
    try {
      await deleteBlog(id);
      setBlogs((prev) =>
        prev.filter((b) => b._id !== id && b.id !== id)
      );
      showToast("Blog post deleted from CMS.");
      setIsBlogDeleteOpen(false);
      setDeletingBlog(null);
    } catch (err) {
      alert("Failed to delete blog: " + err.message);
    } finally {
      setIsBlogDeleting(false);
    }
  };

  // -------------------------------------------------------------
  // SKILL ASSESSMENTS HANDLERS & COMPUTED (MONGODB)
  // -------------------------------------------------------------
  const filteredAssessments = useMemo(() => {
    return assessments.filter((a) => {
      const matchesCategory =
        selectedAssessmentCategory === "all" ||
        (a.category &&
          a.category.toLowerCase() === selectedAssessmentCategory.toLowerCase());

      const q = assessmentSearchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        a.title?.toLowerCase().includes(q) ||
        a.slug?.toLowerCase().includes(q) ||
        a.targetAudience?.toLowerCase().includes(q) ||
        a.category?.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [assessments, assessmentSearchQuery, selectedAssessmentCategory]);

  const assessmentCategoriesList = useMemo(() => {
    const set = new Set();
    assessments.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ["all", ...Array.from(set)];
  }, [assessments]);

  const totalAssessmentQuestionsCount = useMemo(() => {
    return assessments.reduce(
      (sum, a) => sum + (Array.isArray(a.questions) ? a.questions.length : 0),
      0
    );
  }, [assessments]);

  const totalAssessmentAttemptsCount = useMemo(() => {
    return assessments.reduce((sum, a) => sum + (a.totalAttempts || 0), 0);
  }, [assessments]);

  const handleOpenCreateAssessment = () => {
    setEditingAssessment(null);
    setIsAssessmentFormOpen(true);
  };

  const handleOpenEditAssessment = (item) => {
    setEditingAssessment(item);
    setIsAssessmentFormOpen(true);
  };

  const handleOpenDeleteAssessment = (item) => {
    setDeletingAssessment(item);
    setIsAssessmentDeleteOpen(true);
  };

  const handleSaveAssessment = async (payload) => {
    setIsAssessmentSaving(true);
    try {
      if (editingAssessment) {
        const id = editingAssessment._id || editingAssessment.id;
        const updated = await updateAssessment(id, payload);
        setAssessments((prev) =>
          prev.map((a) =>
            (a._id && a._id === id) || (a.id && a.id === id) ? updated : a
          )
        );
        showToast(`Assessment "${updated.title}" updated successfully!`);
      } else {
        const created = await createAssessment(payload);
        setAssessments((prev) => [created, ...prev]);
        showToast(`Assessment "${created.title}" created successfully!`);
      }
      setIsAssessmentFormOpen(false);
      setEditingAssessment(null);
    } catch (err) {
      alert("Failed to save assessment: " + err.message);
    } finally {
      setIsAssessmentSaving(false);
    }
  };

  const handleConfirmDeleteAssessment = async (id) => {
    setIsAssessmentDeleting(true);
    try {
      await deleteAssessment(id);
      setAssessments((prev) =>
        prev.filter((a) => a._id !== id && a.id !== id)
      );
      showToast("Skill Assessment deleted successfully!");
      setIsAssessmentDeleteOpen(false);
      setDeletingAssessment(null);
    } catch (err) {
      alert("Failed to delete assessment: " + err.message);
    } finally {
      setIsAssessmentDeleting(false);
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
  const canAccessBlogs = role === "global_admin" || role === "course_admin";
  const canAccessAssessments = role === "global_admin" || role === "course_admin";
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
                    <BookOpen size={12} /> Courses & Blogs Sub-Admin
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
              {activeSection === "blogs" && "Blogs & Content Management System"}
              {activeSection === "assessments" && "Skill Assessments & Quizzes"}
              {activeSection === "forms" && "Website Form Submissions"}
              {activeSection === "security" && "Security Clearance & Access Keys"}
            </h1>
            <p className="admin-subtitle">
              {activeSection === "courses" &&
                "Add, edit, and manage all live courses dynamically with ImageKit CDN uploads."}
              {activeSection === "jobs" &&
                "Add, edit, remove, and manage real-time job openings stored in MongoDB Atlas."}
              {activeSection === "blogs" &&
                "Publish and optimize SEO blog posts with automatic Google Docs identification and ImageKit CDN."}
              {activeSection === "assessments" &&
                "Create and configure 10-question standardized diagnostic skill tests across broad technical and creative domains."}
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
                else if (activeSection === "blogs") loadBlogs();
                else if (activeSection === "assessments") loadAssessments();
                else if (activeSection === "forms") loadSubmissions();
              }}
              title="Refresh data"
            >
              <RefreshCw
                size={17}
                className={
                  (activeSection === "courses" && isLoadingCourses) ||
                  (activeSection === "jobs" && isLoadingJobs) ||
                  (activeSection === "blogs" && isLoadingBlogs) ||
                  (activeSection === "assessments" && isLoadingAssessments) ||
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
            {activeSection === "blogs" && canAccessBlogs && (
              <button className="admin-add-btn" onClick={handleOpenCreateBlog}>
                <Plus size={18} />
                <span>Write New Blog Post</span>
              </button>
            )}
            {activeSection === "assessments" && canAccessAssessments && (
              <button className="admin-add-btn" onClick={handleOpenCreateAssessment}>
                <Plus size={18} />
                <span>Create Assessment Test</span>
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

          {canAccessBlogs && (
            <button
              type="button"
              className={`admin-section-tab-btn ${
                activeSection === "blogs" ? "active" : ""
              }`}
              onClick={() => setActiveSection("blogs")}
            >
              <FileText size={18} />
              <span>Blogs CMS</span>
              <span className="section-count-badge">{blogs.length}</span>
            </button>
          )}

          {canAccessAssessments && (
            <button
              type="button"
              className={`admin-section-tab-btn ${
                activeSection === "assessments" ? "active" : ""
              }`}
              onClick={() => setActiveSection("assessments")}
            >
              <Award size={18} />
              <span>Skill Tests</span>
              <span className="section-count-badge">{assessments.length}</span>
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
                <div className="metric-icon-wrap yellow" style={{ background: "rgba(246, 217, 107, 0.15)", color: "#f6d96b" }}>
                  <GraduationCap size={20} />
                </div>
                <div className="metric-info">
                  <span className="metric-val">
                    {submissionStats.course_inquiry ||
                      submissions.filter((s) => s.formType === "course_inquiry").length}
                  </span>
                  <span className="metric-label">Course Enquiries</span>
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
                  className={`admin-filter-pill ${selectedFormType === "course_inquiry" ? "active" : ""}`}
                  onClick={() => setSelectedFormType("course_inquiry")}
                >
                  Course Inquiries ({submissions.filter((s) => s.formType === "course_inquiry").length})
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
                    sub.formType === "course_inquiry"
                      ? "Course Inquiry"
                      : sub.formType === "franchise"
                      ? "Franchise Application"
                      : sub.formType === "job_application"
                      ? "Job Application"
                      : "Contact Inquiry";

                  const typeColorClass =
                    sub.formType === "course_inquiry"
                      ? "type-course"
                      : sub.formType === "franchise"
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
                            {sub.formType === "course_inquiry" && <GraduationCap size={12} />}
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
                            <a
                              href={`https://wa.me/91${sub.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                                sub.name
                              )},%20thank%20you%20for%20your%20admission%20enquiry%20at%20Third%20Eye%20Computer%20Classes.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="sub-contact-link"
                              style={{ color: "#4ade80", borderColor: "rgba(74,222,128,0.25)" }}
                              title="Chat with applicant on WhatsApp"
                            >
                              <MessageSquare size={13} />
                              <span>WhatsApp</span>
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
                      {sub.formType === "course_inquiry" && (
                        <div className="submission-meta-strip">
                          <div className="sub-meta-cell">
                            <span className="meta-cell-title">Target Course</span>
                            <span className="meta-cell-val highlight">{sub.course || "General Course Inquiry"}</span>
                          </div>
                          <div className="sub-meta-cell">
                            <span className="meta-cell-title">Preferred Center</span>
                            <span className="meta-cell-val">{sub.preferredBranch || "Any Jaipur Campus"}</span>
                          </div>
                          <div className="sub-meta-cell">
                            <span className="meta-cell-title">Learning Mode</span>
                            <span className="meta-cell-val" style={{ textTransform: "capitalize", color: "#f6d96b" }}>
                              {sub.learningMode === "online" ? "🌐 Live Online" : "🏛️ Classroom Offline"}
                            </span>
                          </div>
                          {sub.sourcePage && (
                            <div className="sub-meta-cell">
                              <span className="meta-cell-title">Source Context</span>
                              <span className="meta-cell-val text-xs text-zinc-400 truncate" title={sub.sourcePage}>
                                {sub.sourcePage}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

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
        {/* TAB 4: BLOGS CMS MANAGEMENT (MONGODB)                     */}
        {/* ========================================================= */}
        {activeSection === "blogs" && (
          <>
            {/* Metrics Row */}
            <div className="admin-metrics-grid">
              <div className="admin-metric-card">
                <div className="metric-header">
                  <span className="metric-label">Published Articles</span>
                  <div className="metric-icon-wrap global">
                    <FileText size={16} />
                  </div>
                </div>
                <div className="metric-value">{totalPublishedBlogsCount}</div>
                <div className="metric-subtext">Live on /blogs knowledge hub</div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-header">
                  <span className="metric-label">Draft / Unlisted</span>
                  <div className="metric-icon-wrap yellow">
                    <Edit2 size={16} />
                  </div>
                </div>
                <div className="metric-value">{totalDraftBlogsCount}</div>
                <div className="metric-subtext">Saved in CMS, ready for review</div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-header">
                  <span className="metric-label">Total Article Reads</span>
                  <div className="metric-icon-wrap blue">
                    <Eye size={16} />
                  </div>
                </div>
                <div className="metric-value">{totalBlogViewsCount.toLocaleString()}</div>
                <div className="metric-subtext">Organic reader engagement</div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-header">
                  <span className="metric-label">Google Docs Sync</span>
                  <div className="metric-icon-wrap emerald">
                    <Sparkles size={16} />
                  </div>
                </div>
                <div className="metric-value">Active</div>
                <div className="metric-subtext">Auto-detects H1/H2/H3 & lists</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="admin-filters-bar">
              <div className="admin-search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search articles by title, keywords, excerpt..."
                  value={blogSearchQuery}
                  onChange={(e) => setBlogSearchQuery(e.target.value)}
                />
              </div>

              <div className="admin-category-filter">
                <select
                  value={selectedBlogCategory}
                  onChange={(e) => setSelectedBlogCategory(e.target.value)}
                  className="admin-select"
                >
                  {blogCategoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-status-filters flex items-center gap-1.5 bg-[#140f09] p-1 rounded-xl border border-yellow-400/20">
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedBlogStatus === "all"
                      ? "bg-yellow-400 text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  onClick={() => setSelectedBlogStatus("all")}
                >
                  All ({blogs.length})
                </button>
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedBlogStatus === "published"
                      ? "bg-emerald-500 text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  onClick={() => setSelectedBlogStatus("published")}
                >
                  Published ({totalPublishedBlogsCount})
                </button>
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedBlogStatus === "draft"
                      ? "bg-amber-500 text-black shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  onClick={() => setSelectedBlogStatus("draft")}
                >
                  Drafts ({totalDraftBlogsCount})
                </button>
              </div>

              {canAccessBlogs && (
                <button
                  className="admin-add-btn ml-auto"
                  onClick={handleOpenCreateBlog}
                >
                  <Plus size={18} />
                  <span>New Post</span>
                </button>
              )}
            </div>

            {/* Blogs List */}
            {isLoadingBlogs ? (
              <div className="admin-loading-state">
                <div className="spinner" />
                <p>Loading blogs from CMS...</p>
              </div>
            ) : filteredBlogs.length > 0 ? (
              <div className="admin-grid">
                {filteredBlogs.map((b) => {
                  const hasFullSEO = Boolean(b.metaTitle && b.seoExcerpt && Array.isArray(b.keywords) && b.keywords.length > 0);
                  return (
                    <div key={b._id || b.id || b.slug} className="admin-card blog-item-card">
                      <div className="admin-card-header">
                        <div className="admin-card-img-wrap">
                          {b.featuredImage ? (
                            <img src={b.featuredImage} alt={b.title} />
                          ) : (
                            <div className="admin-card-img-placeholder">
                              <FileText size={24} />
                            </div>
                          )}
                          <span
                            className={`status-pill ${
                              b.status === "published" ? "status-open" : "status-closed"
                            }`}
                          >
                            {b.status === "published" ? "● Published" : "○ Draft"}
                          </span>
                        </div>
                        <div className="admin-card-title-wrap">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="admin-category-pill">
                              {b.category || "General"}
                            </span>
                            <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                              <Clock size={11} />
                              {b.readTime || "4 min read"}
                            </span>
                          </div>
                          <h3 className="admin-card-title">{b.title}</h3>
                          <div className="text-xs text-zinc-400 font-mono mt-0.5 truncate">
                            /blogs/{b.slug}
                          </div>
                        </div>
                      </div>

                      <div className="admin-card-body">
                        <p className="admin-card-desc">
                          {b.seoExcerpt || b.metaDescription || "No excerpt added yet."}
                        </p>

                        <div className="admin-details-grid">
                          <div className="admin-detail-item">
                            <User size={13} />
                            <span>{b.author || "Third Eye Team"}</span>
                          </div>
                          <div className="admin-detail-item">
                            <Eye size={13} />
                            <span>{(b.views || 0).toLocaleString()} views</span>
                          </div>
                        </div>

                        {/* SEO Health Badge */}
                        <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                          <span className="text-zinc-500">SEO Health:</span>
                          {hasFullSEO ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <CheckCircle2 size={12} />
                              <span>Full SEO Configured</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              <AlertCircle size={12} />
                              <span>Needs Meta / Keywords</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="admin-card-actions">
                        <Link
                          to={`/blogs/${b.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-action-btn view"
                          title="View live article"
                        >
                          <ExternalLink size={16} />
                          <span>View Live</span>
                        </Link>
                        {canAccessBlogs && (
                          <>
                            <button
                              type="button"
                              className="admin-action-btn edit"
                              onClick={() => handleOpenEditBlog(b)}
                              title="Edit post in CMS"
                            >
                              <Edit2 size={16} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="admin-action-btn delete"
                              onClick={() => handleOpenDeleteBlog(b)}
                              title="Delete post"
                            >
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="admin-empty-state">
                <div className="empty-icon-wrap">
                  <FileText size={36} />
                </div>
                <h3>No articles found</h3>
                <p>
                  {blogSearchQuery
                    ? `No blog posts matching "${blogSearchQuery}".`
                    : "Create your first blog post using Google Docs copy-paste or write directly in the rich editor."}
                </p>
                {canAccessBlogs && (
                  <div className="empty-actions">
                    <button
                      className="empty-btn-primary"
                      onClick={handleOpenCreateBlog}
                    >
                      <Plus size={16} />
                      <span>Write First Blog Post</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 4.5: SKILL ASSESSMENTS MANAGEMENT (MONGODB)           */}
        {/* ========================================================= */}
        {activeSection === "assessments" && (
          <>
            {/* Metrics Row */}
            <div className="admin-metrics-grid">
              <div className="admin-metric-card">
                <div className="metric-header">
                  <span className="metric-label">Total Skill Tests</span>
                  <div className="metric-icon-wrap global">
                    <Award size={16} />
                  </div>
                </div>
                <div className="metric-value">{assessments.length}</div>
                <div className="metric-subtext">Generalized subject evaluations</div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-header">
                  <span className="metric-label">Questions Pool</span>
                  <div className="metric-icon-wrap yellow">
                    <CheckSquare size={16} />
                  </div>
                </div>
                <div className="metric-value">{totalAssessmentQuestionsCount}</div>
                <div className="metric-subtext">Configured with 4 options & keys</div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-header">
                  <span className="metric-label">Learner Test Attempts</span>
                  <div className="metric-icon-wrap blue">
                    <Users size={16} />
                  </div>
                </div>
                <div className="metric-value">{totalAssessmentAttemptsCount.toLocaleString()}</div>
                <div className="metric-subtext">Completed by prospective students</div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-header">
                  <span className="metric-label">Diagnostic System</span>
                  <div className="metric-icon-wrap emerald">
                    <Sparkles size={16} />
                  </div>
                </div>
                <div className="metric-value">Active</div>
                <div className="metric-subtext">Topic-wise score & course suggestions</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="admin-filters-bar">
              <div className="admin-search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search assessment by subject, audience, category..."
                  value={assessmentSearchQuery}
                  onChange={(e) => setAssessmentSearchQuery(e.target.value)}
                />
              </div>

              <div className="admin-category-filter">
                <select
                  value={selectedAssessmentCategory}
                  onChange={(e) => setSelectedAssessmentCategory(e.target.value)}
                  className="admin-select"
                >
                  {assessmentCategoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Subject Domains" : cat}
                    </option>
                  ))}
                </select>
              </div>

              {canAccessAssessments && (
                <button
                  className="admin-add-btn ml-auto"
                  onClick={handleOpenCreateAssessment}
                >
                  <Plus size={18} />
                  <span>New Skill Test</span>
                </button>
              )}
            </div>

            {/* Assessments List */}
            {isLoadingAssessments ? (
              <div className="admin-loading-state">
                <div className="spinner" />
                <p>Loading assessment tests from database...</p>
              </div>
            ) : filteredAssessments.length > 0 ? (
              <div className="admin-grid">
                {filteredAssessments.map((item) => {
                  const qCount = Array.isArray(item.questions) ? item.questions.length : 0;
                  const topics = Array.from(
                    new Set(
                      (item.questions || [])
                        .map((q) => q.topic)
                        .filter(Boolean)
                    )
                  );
                  return (
                    <div key={item._id || item.id || item.slug} className="admin-card assessment-item-card">
                      <div className="admin-card-header">
                        <div
                          className="admin-card-img-wrap"
                          style={{
                            height: "120px",
                            background: "linear-gradient(135deg, #18120a 0%, #22180a 100%)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <Award size={36} className="text-[#f6d96b] opacity-80 mb-2" />
                          <span className="text-xs font-bold text-zinc-300">
                            {qCount} Standardized Questions
                          </span>
                          <span
                            className={`status-pill ${
                              item.isActive !== false ? "status-open" : "status-closed"
                            }`}
                          >
                            {item.isActive !== false ? "● Active" : "○ Draft"}
                          </span>
                        </div>
                        <div className="admin-card-title-wrap">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="admin-category-pill">
                              {item.category || "General"}
                            </span>
                            <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                              <Clock size={11} />
                              {item.durationMinutes || 10} Mins
                            </span>
                            <span className="text-[11px] text-[#f6d96b] font-semibold">
                              Pass: {item.passingPercentage || 60}%
                            </span>
                          </div>
                          <h3 className="admin-card-title">{item.title}</h3>
                          <div className="text-xs text-zinc-400 font-mono mt-0.5 truncate">
                            /assessment/{item.slug}
                          </div>
                        </div>
                      </div>

                      <div className="admin-card-body">
                        <div className="text-xs font-semibold text-zinc-400 mb-1.5 flex items-center gap-1.5">
                          <Users size={12} className="text-[#f6d96b]" />
                          <span>Audience: {item.targetAudience || "Learners"}</span>
                        </div>
                        <p className="admin-card-desc">
                          {item.description || "No description provided."}
                        </p>

                        {topics.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1">
                            {topics.slice(0, 4).map((t, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-zinc-900 border border-zinc-700/50 text-zinc-300 px-1.5 py-0.5 rounded"
                              >
                                {t}
                              </span>
                            ))}
                            {topics.length > 4 && (
                              <span className="text-[10px] text-zinc-500 py-0.5">
                                +{topics.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="admin-card-footer">
                        <div className="text-xs text-zinc-400">
                          Attempts: <strong className="text-white">{item.totalAttempts || 0}</strong>
                        </div>

                        <div className="admin-card-actions ml-auto">
                          <Link
                            to={`/assessment/${item.slug}`}
                            target="_blank"
                            className="admin-action-btn view"
                            title="Take test in new tab"
                          >
                            <ExternalLink size={16} />
                            <span>Preview</span>
                          </Link>

                          {canAccessAssessments && (
                            <>
                              <button
                                type="button"
                                className="admin-action-btn edit"
                                onClick={() => handleOpenEditAssessment(item)}
                                title="Edit test and questions"
                              >
                                <Edit2 size={16} />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                className="admin-action-btn delete"
                                onClick={() => handleOpenDeleteAssessment(item)}
                                title="Delete test"
                              >
                                <Trash2 size={16} />
                                <span>Delete</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="admin-empty-state">
                <div className="empty-icon-wrap">
                  <Award size={36} />
                </div>
                <h3>No skill assessments found</h3>
                <p>
                  {assessmentSearchQuery
                    ? `No skill assessments matching "${assessmentSearchQuery}".`
                    : "Create standardized 10-question tests with automated topic diagnostics and course suggestions."}
                </p>
                {canAccessAssessments && (
                  <div className="empty-actions">
                    <button
                      className="empty-btn-primary"
                      onClick={handleOpenCreateAssessment}
                    >
                      <Plus size={16} />
                      <span>Create First Skill Test</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SECURITY & PASSWORDS (GLOBAL ADMIN ONLY)           */}
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

      {/* Blog Form Modal (MongoDB CMS) */}
      <BlogFormModal
        key={
          editingBlog?._id ||
          editingBlog?.id ||
          (isBlogFormOpen ? "blog-open" : "blog-closed")
        }
        isOpen={isBlogFormOpen}
        blog={editingBlog}
        onClose={() => setIsBlogFormOpen(false)}
        onSave={handleSaveBlog}
        isSaving={isBlogSaving}
      />

      {/* Delete Confirmation Modal for Blog */}
      <DeleteConfirmModal
        isOpen={isBlogDeleteOpen}
        item={deletingBlog}
        itemType="Blog Post"
        onClose={() => setIsBlogDeleteOpen(false)}
        onConfirm={handleConfirmDeleteBlog}
        isDeleting={isBlogDeleting}
      />

      {/* Assessment Form Modal (MongoDB) */}
      <AssessmentFormModal
        key={
          editingAssessment?._id ||
          editingAssessment?.id ||
          (isAssessmentFormOpen ? "assessment-open" : "assessment-closed")
        }
        isOpen={isAssessmentFormOpen}
        assessment={editingAssessment}
        onClose={() => setIsAssessmentFormOpen(false)}
        onSave={handleSaveAssessment}
        isSaving={isAssessmentSaving}
      />

      {/* Delete Confirmation Modal for Assessment */}
      <DeleteConfirmModal
        isOpen={isAssessmentDeleteOpen}
        item={deletingAssessment}
        itemType="Skill Assessment Test"
        onClose={() => setIsAssessmentDeleteOpen(false)}
        onConfirm={handleConfirmDeleteAssessment}
        isDeleting={isAssessmentDeleting}
      />
    </div>
  );
}

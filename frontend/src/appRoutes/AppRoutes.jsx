import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";

// Placeholder Page Component with consistent dark & yellow branding
function PlaceholderPage({ title, subtitle }) {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-32 pb-20 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-4">
        Third Eye Computer Classes
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
        {title}
      </h1>
      <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
        {subtitle}
      </p>
      <div className="p-8 rounded-2xl bg-[#141620] border border-[#272A38] max-w-xl mx-auto text-zinc-400 text-sm">
        This section is ready for content development. Use the navigation above to test routes and mobile responsiveness.
      </div>
    </div>
  );
}

import HomePage from "../pages/home/HomePage";
import Courses from "../pages/course/Courses";
import CompareCourses from "../pages/course/CompareCourses";
import CourseDetails from "../pages/courseDetails/CourseDetails";
import AdminPage from "../pages/admin/AdminPage";
import OurTeam from "../pages/team/OurTeam";
import AboutPage from "../pages/about/AboutPage";
import OurCertificationPage from "../pages/certification/OurCertificationPage";
import Franchise from "../pages/franchise/Franchise";
import ContactPage from "../pages/contact/ContactPage";
import JobsAndPlacement from "../pages/placements/JobsAndPlacement";
import JobDetailPage from "../pages/placements/JobDetailPage";
import Memories from "../pages/Memories/memories";
import Review from "../pages/studentReviews/Review";
import BlogsPage from "../pages/blogs/BlogsPage";
import BlogDetailPage from "../pages/blogs/BlogDetailPage";
import AssessmentsHub from "../pages/assessments/AssessmentsHub";
import AssessmentTestPage from "../pages/assessments/AssessmentTestPage";
import NearestBranchFinder from "../pages/branchFinder/NearestBranchFinder";
import PayNowPage from "../pages/payNow/PayNowPage";
import UploadMediaPage from "../pages/uploadMedia/UploadMediaPage";

function ApplyCertificateRedirect() {
  React.useEffect(() => {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSdDtLEpiKX4qeeR8YN2-HJ1jy9O7YvjaJh6HaalI7XTPyZ6aA/viewform";
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 pt-36 pb-24 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-4">
        Redirecting
      </div>
      <h1 className="text-2xl font-bold text-white mb-3">Apply for Certificate</h1>
      <p className="text-zinc-400 text-sm mb-6">
        Opening official Certificate Application Form...
      </p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdDtLEpiKX4qeeR8YN2-HJ1jy9O7YvjaJh6HaalI7XTPyZ6aA/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-black bg-[#f6d96b] hover:bg-[#ffe07a] transition-all"
      >
        Click here if not redirected automatically
      </a>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="admin" element={<AdminPage />} />

        {/* Courses Routes */}
        <Route path="our-courses" element={<Courses />} />
        <Route path="courses" element={<Courses />} />
        <Route
          path="our-courses/compare-courses"
          element={<CompareCourses />}
        />
        <Route
          path="courses/compare-courses"
          element={<CompareCourses />}
        />
        <Route
          path="our-courses/2d-3d-animation"
          element={<CourseDetails />}
        />
        <Route
          path="courses/2d-3d-animation"
          element={<CourseDetails />}
        />
        <Route
          path="our-courses/3d-cad-matrix"
          element={<CourseDetails />}
        />
        <Route
          path="courses/3d-cad-matrix"
          element={<CourseDetails />}
        />
        <Route
          path="our-courses/:courseSlug"
          element={<CourseDetails />}
        />
        <Route
          path="courses/:courseSlug"
          element={<CourseDetails />}
        />
        <Route
          path="course-details"
          element={<CourseDetails />}
        />

        {/* Company Dropdown Routes */}
        <Route
          path="trusted-computer-classes-in-jaipur"
          element={<AboutPage />}
        />
        <Route
          path="about-us"
          element={<AboutPage />}
        />
        <Route
          path="about"
          element={<AboutPage />}
        />
        <Route
          path="contact-us"
          element={<ContactPage />}
        />
        <Route
          path="contact"
          element={<ContactPage />}
        />

        {/* Certification Dropdown Routes */}
        <Route
          path="certifications"
          element={<OurCertificationPage />}
        />
        <Route
          path="our-certification"
          element={<OurCertificationPage />}
        />
        <Route
          path="certification"
          element={<OurCertificationPage />}
        />
        <Route
          path="apply-certificate"
          element={<ApplyCertificateRedirect />}
        />
        <Route
          path="apply-for-certificate"
          element={<ApplyCertificateRedirect />}
        />

        {/* Rise and Shine Dropdown Routes */}
        <Route
          path="students-review-2"
          element={<Review />}
        />
        <Route
          path="student-reviews"
          element={<Review />}
        />
        <Route
          path="reviews"
          element={<Review />}
        />
        <Route
          path="review"
          element={<Review />}
        />
        <Route
          path="jobs-placement"
          element={<JobsAndPlacement />}
        />
        <Route
          path="jobs-placement/:jobSlug"
          element={<JobDetailPage />}
        />
        <Route
          path="jobs-and-placement"
          element={<JobsAndPlacement />}
        />
        <Route
          path="jobs"
          element={<JobsAndPlacement />}
        />
        <Route
          path="placements"
          element={<JobsAndPlacement />}
        />
        <Route
          path="jobs/:jobSlug"
          element={<JobDetailPage />}
        />
        <Route
          path="jobs-and-placement/:jobSlug"
          element={<JobDetailPage />}
        />
        <Route
          path="our-team-new"
          element={<OurTeam />} 
        />
        <Route
          path="our-team"
          element={<OurTeam />} 
        />
        <Route
          path="sweet-memories"
          element={<Memories />}
        />
        <Route
          path="memories"
          element={<Memories />}
        />

        {/* Franchise & Pay Now */}
        <Route
          path="franchise"
          element={<Franchise />}
        />
        <Route
          path="pay-now"
          element={<PayNowPage />}
        />
        <Route
          path="pay-online"
          element={<PayNowPage />}
        />
        <Route
          path="payment"
          element={<PayNowPage />}
        />

        {/* Blogs CMS Routes */}
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="blog" element={<BlogsPage />} />
        <Route path="blogs/:slug" element={<BlogDetailPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />

        {/* Free Skill Assessment Test Routes */}
        <Route path="assessments" element={<AssessmentsHub />} />
        <Route path="skill-assessment" element={<AssessmentsHub />} />
        <Route path="skill-tests" element={<AssessmentsHub />} />
        <Route path="assessment/:slug" element={<AssessmentTestPage />} />
        <Route path="skill-assessment/:slug" element={<AssessmentTestPage />} />

        {/* Nearest Branch Finder Routes */}
        <Route path="nearest-branch" element={<NearestBranchFinder />} />
        <Route path="branch-finder" element={<NearestBranchFinder />} />
        <Route path="branches" element={<NearestBranchFinder />} />

        {/* Public Media & ImageKit Upload Routes */}
        <Route path="upload-images" element={<UploadMediaPage />} />
        <Route path="upload-media" element={<UploadMediaPage />} />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={<PlaceholderPage title="404 - Page Not Found" subtitle="The page you are looking for does not exist." />}
        />
      </Route>
    </Routes>
  );
}

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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="courses" element={<Courses />} />
        <Route
          path="courses/2d-3d-animation"
          element={<CourseDetails />}
        />
        <Route
          path="courses/3d-cad-matrix"
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
          path="about-us"
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
          path="our-certification"
          element={<OurCertificationPage />}
        />
        <Route
          path="apply-certificate"
          element={<PlaceholderPage title="Apply for Certificate" subtitle="Submit your student details and examination roll number to request your certificate." />}
        />
        <Route
          path="certificate-verification"
          element={<PlaceholderPage title="Certificate Verification" subtitle="Instant online verification system for student credentials and authenticity." />}
        />

        {/* Rise and Shine Dropdown Routes */}
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
          element={<PlaceholderPage title="Pay Now" subtitle="Secure fee payment portal for course tuition, registration, and examination fees." />}
        />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={<PlaceholderPage title="404 - Page Not Found" subtitle="The page you are looking for does not exist." />}
        />
      </Route>
    </Routes>
  );
}

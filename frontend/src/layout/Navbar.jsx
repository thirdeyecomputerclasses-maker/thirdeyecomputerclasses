import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Building2,
  PhoneCall,
  Award,
  FileCheck,
  CheckCircle2,
  Star,
  Briefcase,
  Users,
  Camera,
  Sparkles,
  BookOpen,
  Building,
  ArrowUpRight,
  Code2,
  Compass,
} from "lucide-react";
import logo from "../assets/logo.webp";
import SoundToggle from "../components/SoundToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({
    certification: false,
    riseAndShine: false,
    company: false,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const location = useLocation();
  const navRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  const prevPathRef = useRef(location.pathname);
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Smart scroll tracker: hide when scrolling down, reveal when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Frosted glass background trigger
      setIsScrolled(currentScrollY > 20);

      // Always show navbar at or near the very top of the page
      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else {
        const delta = currentScrollY - lastScrollY.current;
        // Require at least a 6px movement threshold to prevent micro-jitter
        if (delta > 6) {
          // Scrolling DOWN -> Hide navbar (unless mobile menu is actively open)
          if (!mobileMenuOpen) {
            setIsVisible(false);
            setActiveDropdown(null);
          }
        } else if (delta < -6) {
          // Scrolling UP -> Reveal navbar immediately
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Run on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Smooth hover open/close for desktop dropdowns
  const handleMouseEnter = (name) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  // Toggle mobile accordion section
  const toggleMobileSection = (section) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ============================================================ */}
      {/* 1. TOP NAVBAR (Sheryians Floating Capsule - Stays Fixed)     */}
      {/* ============================================================ */}
      <header
        role="banner"
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"
        } ${
          isScrolled
            ? "py-3 md:py-3.5 bg-[#0a0805]/90 backdrop-blur-xl border-b border-[#261f15]/80 shadow-[0_10px_35px_rgba(0,0,0,0.75),0_1px_0_rgba(246,217,107,0.06)]"
            : "py-5 md:py-6 bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ============================================================ */}
            {/* LEFT: Logo ONLY (Brand Badge Removed per User Request)       */}
            {/* ============================================================ */}
            <div className="flex items-center flex-shrink-0">
              <Link
                to="/"
                className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] rounded-xl p-1"
                aria-label="ThirdEye Home"
              >
                <img
                  src={logo}
                  alt="ThirdEye Logo"
                  className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(243,207,101,0.2)]"
                  loading="eager"
                  fetchPriority="high"
                />
              </Link>
            </div>

            {/* ============================================================ */}
            {/* CENTER: Floating Capsule Pill Nav (Sheryians Signature)       */}
            {/* ============================================================ */}
            <nav
              role="navigation"
              aria-label="Main Navigation"
              className="hidden lg:flex items-center bg-[#130f0a]/80 border border-[#2b2216] px-6 py-2 rounded-full backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#f6d96b]/40 hover:bg-[#1a140e]/90"
            >
              <ul className="flex items-center gap-1 xl:gap-2 list-none m-0 p-0">
                {/* 1. HOME */}
                <li>
                  <Link
                    to="/"
                    className={`px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] ${
                      isActive("/")
                        ? "text-[#f3cf65] bg-[#f3cf65]/15 font-semibold shadow-[0_0_12px_rgba(243,207,101,0.15)]"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    Home
                  </Link>
                </li>

                {/* 2. COURSES (Direct Link - NO Dropdown per User Request) */}
                <li>
                  <Link
                    to="/our-courses"
                    className={`px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] ${
                      isActive("/our-courses") ||
                      isActive("/courses") ||
                      isActive("/courses/2d-3d-animation") ||
                      isActive("/our-courses/2d-3d-animation")
                        ? "text-[#f3cf65] bg-[#f3cf65]/15 font-semibold shadow-[0_0_12px_rgba(243,207,101,0.15)]"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    Courses
                  </Link>
                </li>

                {/* 3. CERTIFICATION (Dropdown) */}
                <li
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("certification")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    aria-expanded={activeDropdown === "certification"}
                    aria-haspopup="true"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "certification" ? null : "certification"
                      )
                    }
                    className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] ${
                      isActive("/certifications") ||
                      isActive("/our-certification") ||
                      isActive("/apply-certificate") ||
                      activeDropdown === "certification"
                        ? "text-[#f3cf65] bg-[#f3cf65]/15 font-semibold"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>Certification</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === "certification"
                          ? "rotate-180 text-[#f3cf65]"
                          : "text-zinc-400"
                      }`}
                    />
                  </button>

                  {/* Certification Dropdown Menu */}
                  {activeDropdown === "certification" && (
                    <div
                      role="menu"
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="bg-[#0e0c08]/98 border border-[#2a2217] rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.92),0_0_30px_rgba(246,217,107,0.08)] backdrop-blur-2xl">
                        {/* 1. Our Certification */}
                        <Link
                          to="/certifications"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#f6d96b] transition-colors">
                              Our Certification
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              Govt. recognized & ISO 9001 certified credentials
                            </p>
                          </div>
                        </Link>

                        {/* 2. Apply for Certificate */}
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSdDtLEpiKX4qeeR8YN2-HJ1jy9O7YvjaJh6HaalI7XTPyZ6aA/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all mt-1"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#f6d96b] transition-colors flex items-center gap-1.5">
                              <span>Apply for Certificate</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#f6d96b]" />
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              Submit your final exam & roll details
                            </p>
                          </div>
                        </a>

                        {/* 3. Free Skill Assessments */}
                        <Link
                          to="/assessments"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all mt-1"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-zinc-100 group-hover:text-[#f3cf65] transition-colors">
                                Free Skill Tests
                              </span>
                              <span className="text-[9px] font-mono font-bold bg-[#f3cf65] text-black px-1.5 py-0.5 rounded">
                                FREE
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              10-question evaluation & score report
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>

                {/* 4. SUCCESS STORIES / RISE & SHINE (Dropdown) */}
                <li
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("riseAndShine")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    aria-expanded={activeDropdown === "riseAndShine"}
                    aria-haspopup="true"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "riseAndShine" ? null : "riseAndShine"
                      )
                    }
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] ${
                      isActive("/students-review-2") ||
                      isActive("/student-reviews") ||
                      isActive("/jobs-placement") ||
                      isActive("/jobs-and-placement") ||
                      isActive("/our-team-new") ||
                      isActive("/our-team") ||
                      isActive("/sweet-memories") ||
                      activeDropdown === "riseAndShine"
                        ? "text-[#f3cf65] bg-[#f3cf65]/15 font-semibold"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#f3cf65]" />
                    <span>Rise & Shine</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === "riseAndShine"
                          ? "rotate-180 text-[#f3cf65]"
                          : "text-zinc-400"
                      }`}
                    />
                  </button>

                  {/* Rise and Shine Dropdown Menu */}
                  {activeDropdown === "riseAndShine" && (
                    <div
                      role="menu"
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-84 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="bg-[#0e0c08]/98 border border-[#2a2217] rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.92),0_0_30px_rgba(246,217,107,0.08)] backdrop-blur-2xl">
                        {/* Student Reviews */}
                        <Link
                          to="/students-review-2"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <Star className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#f6d96b] transition-colors flex items-center gap-1.5">
                              <span>Student Reviews</span>
                              <span className="text-[10px] text-amber-300 font-mono">
                                ★ 4.9/5
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              Alumni video reviews & transformation stories
                            </p>
                          </div>
                        </Link>

                        {/* Jobs & Placement */}
                        <Link
                          to="/jobs-placement"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all mt-1"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#f6d96b] transition-colors">
                              Jobs & Placement Cell
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              Corporate hiring partners & recruitment drives
                            </p>
                          </div>
                        </Link>

                        {/* Our Team */}
                        <Link
                          to="/our-team-new"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all mt-1"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#f6d96b] transition-colors">
                              Mentors & Faculty
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              Learn directly from seasoned industry engineers
                            </p>
                          </div>
                        </Link>

                        {/* Sweet Memories */}
                        <Link
                          to="/sweet-memories"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all mt-1"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <Camera className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#f6d96b] transition-colors">
                              Campus Memories
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              Hackathons, lab workshops & convocation days
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>

                {/* 5. COMPANY (Dropdown) */}
                <li
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("company")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    aria-expanded={activeDropdown === "company"}
                    aria-haspopup="true"
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === "company" ? null : "company"
                      )
                    }
                    className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] ${
                      isActive("/trusted-computer-classes-in-jaipur") ||
                      isActive("/about-us") ||
                      isActive("/contact-us") ||
                      activeDropdown === "company"
                        ? "text-[#f3cf65] bg-[#f3cf65]/15 font-semibold"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>Company</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === "company"
                          ? "rotate-180 text-[#f3cf65]"
                          : "text-zinc-400"
                      }`}
                    />
                  </button>

                  {/* Company Dropdown Menu */}
                  {activeDropdown === "company" && (
                    <div
                      role="menu"
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="bg-[#0e0c08]/98 border border-[#2a2217] rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.92),0_0_30px_rgba(246,217,107,0.08)] backdrop-blur-2xl">
                        <Link
                          to="/trusted-computer-classes-in-jaipur"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#f6d96b] transition-colors">
                              About Us
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              Our history, pedagogy and 20+ year legacy
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/contact-us"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all mt-1"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <PhoneCall className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#f6d96b] transition-colors">
                              Contact Us
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              Speak with counselors or visit in-person
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/nearest-branch"
                          role="menuitem"
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f6d96b]/10 group transition-all mt-1"
                        >
                          <div className="p-2 rounded-xl bg-[#16120b] border border-[#2a2217] text-[#f6d96b] group-hover:bg-[#f6d96b] group-hover:text-black transition-colors mt-0.5">
                            <Compass className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-zinc-100 group-hover:text-[#f6d96b] transition-colors">
                                Nearest Branch
                              </span>
                              <span className="text-[9px] font-mono font-bold bg-[#f6d96b] text-black px-1.5 py-0.5 rounded">
                                MAPS
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              Locate 10+ Jaipur campuses with live routes
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>

                {/* 6. FRANCHISE */}
                <li>
                  <Link
                    to="/franchise"
                    className={`px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] ${
                      isActive("/franchise")
                        ? "text-[#f3cf65] bg-[#f3cf65]/15 font-semibold"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    Franchise
                  </Link>
                </li>

                {/* 7. BLOGS */}
                <li>
                  <Link
                    to="/blogs"
                    className={`px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] ${
                      isActive("/blogs") || location.pathname.startsWith("/blogs/") || location.pathname.startsWith("/blog/")
                        ? "text-[#f3cf65] bg-[#f3cf65]/15 font-semibold"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    Blogs
                  </Link>
                </li>

                {/* 8. SKILL TESTS */}
                <li>
                  <Link
                    to="/assessments"
                    className={`px-3.5 py-1.5 rounded-full text-[13px] xl:text-[14px] font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] flex items-center gap-1.5 ${
                      isActive("/assessments") || location.pathname.startsWith("/assessment/") || location.pathname.startsWith("/skill-assessment")
                        ? "text-[#f3cf65] bg-[#f3cf65]/15 font-semibold"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>Skill Tests</span>
                    <span className="text-[9px] font-bold bg-[#f6d96b]/20 text-[#f6d96b] border border-[#f6d96b]/40 px-1.5 py-0.5 rounded-full">
                      FREE
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* ============================================================ */}
            {/* RIGHT: Warm Golden CTA Button & Mobile Hamburger Toggle       */}
            {/* ============================================================ */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Sound Icon Toggle */}
              <SoundToggle />

              {/* Visible on both Mobile & Desktop Header */}
              <div className="relative inline-flex items-center">
                <Link
                  to="/pay-now"
                  className="relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold tracking-normal text-zinc-950 bg-gradient-to-r from-[#ffd35a] via-[#f3cf65] to-[#fed156] shadow-[0_4px_20px_rgba(243,207,101,0.35)] hover:shadow-[0_6px_30px_rgba(243,207,101,0.55)] hover:brightness-105 active:scale-95 transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Apply or Pay Fees Now"
                >
                  <span className="absolute -top-2.5 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-400 text-black shadow-md border border-emerald-300 pointer-events-none animate-pulse">
                    Offer Active
                  </span>
                  <span>Pay Now</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2]" />
                </Link>
              </div>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Toggle Navigation Menu"
                className={`lg:hidden p-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3cf65] ${
                  mobileMenuOpen
                    ? "bg-[#f3cf65] text-black shadow-lg shadow-[#f3cf65]/30"
                    : "bg-white/[0.06] border border-white/[0.1] text-zinc-200 hover:text-[#f3cf65] hover:border-[#f3cf65]/40"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <Menu className="w-5 h-5 stroke-[2]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. SHERYIANS STYLE MOBILE SLIDE-OUT DRAWER                   */}
      {/* ============================================================ */}
      {/* Backdrop overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-50 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`lg:hidden fixed top-0 right-0 w-84 max-w-[88vw] h-full bg-[#0c0a07]/98 backdrop-blur-2xl border-l border-[#282116] z-50 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Top Bar - Logo ONLY */}
          <div className="flex items-center justify-between pb-5 border-b border-[#241d14]">
            <img src={logo} alt="ThirdEye Logo" className="h-11 sm:h-12 w-auto object-contain" />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-[#16120b] border border-[#2a2217] text-zinc-300 hover:text-white active:scale-95 transition-all"
              aria-label="Close Navigation"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1.5">
            {/* 1. Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                isActive("/")
                  ? "bg-[#f6d96b]/15 text-[#f6d96b] font-semibold border border-[#f6d96b]/30"
                  : "text-zinc-200 hover:bg-[#18130d]"
              }`}
            >
              <span className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#18130d] border border-[#2c2318] flex items-center justify-center text-[#f6d96b]">
                  <Code2 className="w-4 h-4" />
                </div>
                <span>Home</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500" />
            </Link>

            {/* 2. Courses (Direct Link - NO Accordion/Dropdown) */}
            <Link
              to="/our-courses"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                isActive("/our-courses") ||
                isActive("/courses") ||
                isActive("/courses/2d-3d-animation") ||
                isActive("/our-courses/2d-3d-animation")
                  ? "bg-[#f6d96b]/15 text-[#f6d96b] font-semibold border border-[#f6d96b]/30"
                  : "text-zinc-200 hover:bg-[#18130d]"
              }`}
            >
              <span className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#18130d] border border-[#2c2318] flex items-center justify-center text-[#f6d96b]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Courses</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-zinc-500" />
            </Link>

            {/* 3. Certification (Accordion) */}
            <div className="rounded-xl overflow-hidden bg-[#110e0a] border border-[#241d14]">
              <button
                type="button"
                onClick={() => toggleMobileSection("certification")}
                className="w-full flex items-center justify-between p-3 text-sm font-medium text-zinc-200 hover:text-[#f6d96b]"
              >
                <span className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#18130d] border border-[#2c2318] flex items-center justify-center text-[#f6d96b]">
                    <Award className="w-4 h-4" />
                  </div>
                  <span>Certification</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileExpanded.certification
                      ? "rotate-180 text-[#f6d96b]"
                      : "text-zinc-500"
                  }`}
                />
              </button>
              {mobileExpanded.certification && (
                <div className="px-3 pb-3 pt-1 space-y-1 border-t border-[#241d14]">
                  <Link
                    to="/certifications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-zinc-300 hover:text-[#f6d96b] hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span>Our Certification</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </Link>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdDtLEpiKX4qeeR8YN2-HJ1jy9O7YvjaJh6HaalI7XTPyZ6aA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-zinc-300 hover:text-[#f6d96b] hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span>Apply for Certificate</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                  <Link
                    to="/assessments"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-[#f6d96b] font-semibold hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span>Free Skill Tests</span>
                    <span className="text-[9px] font-mono bg-[#f6d96b] text-black px-1.5 py-0.2 rounded font-bold">
                      FREE
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Rise and Shine (Accordion) */}
            <div className="rounded-xl overflow-hidden bg-[#110e0a] border border-[#241d14]">
              <button
                type="button"
                onClick={() => toggleMobileSection("riseAndShine")}
                className="w-full flex items-center justify-between p-3 text-sm font-medium text-zinc-200 hover:text-[#f6d96b]"
              >
                <span className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#18130d] border border-[#2c2318] flex items-center justify-center text-[#f6d96b]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>Rise & Shine</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileExpanded.riseAndShine
                      ? "rotate-180 text-[#f6d96b]"
                      : "text-zinc-500"
                  }`}
                />
              </button>
              {mobileExpanded.riseAndShine && (
                <div className="px-3 pb-3 pt-1 space-y-1 border-t border-[#241d14]">
                  <Link
                    to="/students-review-2"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-zinc-300 hover:text-[#f6d96b] hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-[#f6d96b]" />
                      Student Reviews
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </Link>
                  <Link
                    to="/jobs-placement"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-zinc-300 hover:text-[#f6d96b] hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#f6d96b]" />
                      Jobs & Placements
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </Link>
                  <Link
                    to="/our-team-new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-zinc-300 hover:text-[#f6d96b] hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#f6d96b]" />
                      Our Mentors
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </Link>
                  <Link
                    to="/sweet-memories"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-zinc-300 hover:text-[#f6d96b] hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-[#f6d96b]" />
                      Sweet Memories
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </Link>
                </div>
              )}
            </div>

            {/* 5. Company (Accordion) */}
            <div className="rounded-xl overflow-hidden bg-[#110e0a] border border-[#241d14]">
              <button
                type="button"
                onClick={() => toggleMobileSection("company")}
                className="w-full flex items-center justify-between p-3 text-sm font-medium text-zinc-200 hover:text-[#f6d96b]"
              >
                <span className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#18130d] border border-[#2c2318] flex items-center justify-center text-[#f6d96b]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span>Company</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileExpanded.company ? "rotate-180 text-[#f6d96b]" : "text-zinc-500"
                  }`}
                />
              </button>
              {mobileExpanded.company && (
                <div className="px-3 pb-3 pt-1 space-y-1 border-t border-[#241d14]">
                  <Link
                    to="/trusted-computer-classes-in-jaipur"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-zinc-300 hover:text-[#f6d96b] hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span>About Us</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </Link>
                  <Link
                    to="/contact-us"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-zinc-300 hover:text-[#f6d96b] hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span>Contact Us</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </Link>
                  <Link
                    to="/nearest-branch"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs text-[#f6d96b] font-semibold hover:bg-[#f6d96b]/10 transition-colors"
                  >
                    <span>Nearest Branch Finder</span>
                    <span className="text-[9px] font-mono bg-[#f6d96b] text-black px-1.5 py-0.2 rounded font-bold">
                      MAPS
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* 6. Franchise */}
            <Link
              to="/franchise"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                isActive("/franchise")
                  ? "bg-[#f6d96b]/15 text-[#f6d96b] font-semibold border border-[#f6d96b]/30"
                  : "text-zinc-200 hover:bg-[#18130d]"
              }`}
            >
              <span className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#18130d] border border-[#2c2318] flex items-center justify-center text-[#f6d96b]">
                  <Building className="w-4 h-4" />
                </div>
                <span>Franchise</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#18130d] border border-[#2c2318] text-[#f6d96b] px-2 py-0.5 rounded-full">
                PARTNER
              </span>
            </Link>

            {/* 7. Blogs */}
            <Link
              to="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                isActive("/blogs") || location.pathname.startsWith("/blogs/") || location.pathname.startsWith("/blog/")
                  ? "bg-[#f6d96b]/15 text-[#f6d96b] font-semibold border border-[#f6d96b]/30"
                  : "text-zinc-200 hover:bg-[#18130d]"
              }`}
            >
              <span className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#18130d] border border-[#2c2318] flex items-center justify-center text-[#f6d96b]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Blogs</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#18130d] border border-[#2c2318] text-[#f6d96b] px-2 py-0.5 rounded-full">
                INSIGHTS
              </span>
            </Link>

            {/* 8. Skill Tests */}
            <Link
              to="/assessments"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                isActive("/assessments") || location.pathname.startsWith("/assessment/") || location.pathname.startsWith("/skill-assessment")
                  ? "bg-[#f6d96b]/15 text-[#f6d96b] font-semibold border border-[#f6d96b]/30"
                  : "text-zinc-200 hover:bg-[#18130d]"
              }`}
            >
              <span className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#18130d] border border-[#2c2318] flex items-center justify-center text-[#f6d96b]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Free Skill Tests</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#18130d] border border-[#2c2318] text-[#f6d96b] px-2 py-0.5 rounded-full">
                FREE
              </span>
            </Link>
          </nav>
        </div>

        {/* Drawer Footer Branding */}
        <div className="pt-5 border-t border-[#241d14] text-center">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
            THIRDEYE • ENLIGHTENING SUCCESS • ISO 9001
          </span>
        </div>
      </aside>

      {/* JSON-LD Schema for SEO SiteNavigationElement */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SiteNavigationElement",
            "name": [
              "Home",
              "Courses",
              "Certification",
              "Rise and Shine",
              "Company",
              "Franchise",
              "Pay Now"
            ],
            "url": [
              "/",
              "/our-courses",
              "/certifications",
              "/students-review-2",
              "/trusted-computer-classes-in-jaipur",
              "/franchise",
              "/pay-now"
            ]
          }),
        }}
      />
    </>
  );
}

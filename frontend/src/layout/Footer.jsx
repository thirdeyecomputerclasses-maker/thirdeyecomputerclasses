import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUp,
  ShieldCheck,
  Award,
  MapPin,
} from "lucide-react";
import logo from "../assets/logo.webp";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // State for interactive watermark spotlight glow on hover (Sheryians style)
  const [watermarkPos, setWatermarkPos] = useState({ x: -999, y: -999 });
  const [isWatermarkHovered, setIsWatermarkHovered] = useState(false);

  const handleWatermarkMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setWatermarkPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleWatermarkTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const rect = e.currentTarget.getBoundingClientRect();
      setWatermarkPos({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
      setIsWatermarkHovered(true);
    }
  };

  const usefulLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/trusted-computer-classes-in-jaipur" },
    { label: "Courses", to: "/our-courses" },
    { label: "Pay Fees Online", to: "/pay-now" },
    { label: "Nearest Branch Finder", to: "/nearest-branch" },
    { label: "Free Skill Tests", to: "/assessments" },
    { label: "Tech Blogs & Guides", to: "/blogs" },
    { label: "Our Faculty & Team", to: "/our-team-new" },
    { label: "Upload & Media Hub", to: "/upload-images" },
    { label: "Contact Us", to: "/contact-us" },
  ];

  return (
    <footer
      className="relative overflow-hidden text-zinc-300 border-t border-[#f6d96b]/30 select-none"
      style={{
        backgroundColor: "#080603",
        backgroundImage: `
          radial-gradient(circle 800px at 50% -80px, rgba(246, 217, 107, 0.16) 0%, rgba(234, 179, 8, 0.08) 45%, transparent 75%),
          radial-gradient(circle 600px at 15% 35%, rgba(180, 83, 9, 0.16) 0%, rgba(120, 53, 15, 0.08) 50%, transparent 80%),
          radial-gradient(circle 650px at 85% 40%, rgba(217, 119, 6, 0.14) 0%, rgba(67, 34, 10, 0.09) 50%, transparent 80%),
          linear-gradient(180deg, #120c06 0%, #0c0804 50%, #060402 100%)
        `,
      }}
    >
      {/* Top Golden Horizon Glow Line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f6d96b] via-[#eab308]/80 to-transparent pointer-events-none" />

      {/* Subtle Clean Tech Grid matching HomePage */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(246, 217, 107, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(246, 217, 107, 0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Footer Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-6">
        {/* ── 3 CLEAN ARCHITECTURAL COLUMNS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16 sm:mb-20">
          {/* ============================================================ */}
          {/* COLUMN 1: Logo, Bio & Social Media Hub (lg:col-span-5)       */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group focus-visible:outline-none">
              <img
                src={logo}
                alt="Third Eye Computer Classes"
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_4px_20px_rgba(246,217,107,0.35)]"
                loading="lazy"
              />
            </Link>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-md">
              Unlock the power of tech with{" "}
              <strong className="text-[#f6d96b] font-semibold">Third Eye Computer Classes</strong>!
              Jaipur's top destination for 3D animation, CAD jewelry, VFX, and full-stack development.
            </p>

            {/* Official Social Media Channels (Authentic Brand Logos, No Circular Enclosing Box) */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                {/* YouTube */}
                <a
                  href="https://youtube.com/@thirdeyecomputerclasses2?si=sL3zh84NatPzHKmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="transition-transform duration-200 hover:scale-110 hover:opacity-90 focus-visible:outline-none"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M27.05 7.6a3.4 3.4 0 0 0-2.39-2.4C22.55 4.67 14 4.67 14 4.67s-8.55 0-10.66.53a3.4 3.4 0 0 0-2.39 2.4C.42 9.71.42 14 .42 14s0 4.29.53 6.4a3.4 3.4 0 0 0 2.39 2.4c2.11.53 10.66.53 10.66.53s8.55 0 10.66-.53a3.4 3.4 0 0 0 2.39-2.4c.53-2.11.53-6.4.53-6.4s0-4.29-.53-6.4z"
                      fill="#FF0000"
                    />
                    <polygon points="11.2,18.2 18.2,14 11.2,9.8" fill="#FFFFFF" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/thirdeyecomputerclasses?vrfl=MTdieW1qYTdycHFxcw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-transform duration-200 hover:scale-110 hover:opacity-90 focus-visible:outline-none"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 28 28" fill="none">
                    <defs>
                      <radialGradient id="footerIgGrad" cx="30%" cy="105%" r="125%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="10%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <rect width="28" height="28" rx="6.5" fill="url(#footerIgGrad)" />
                    <rect x="5.2" y="5.2" width="17.6" height="17.6" rx="4.8" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                    <circle cx="14" cy="14" r="4.2" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                    <circle cx="19.2" cy="8.8" r="1.3" fill="#FFFFFF" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-transform duration-200 hover:scale-110 hover:opacity-90 focus-visible:outline-none"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="14" fill="#1877F2" />
                    <path
                      d="M17.64 14.91l.52-3.42h-3.28V9.27c0-.94.46-1.85 1.93-1.85h1.5V4.5a18.28 18.28 0 0 0-2.66-.23c-2.72 0-4.49 1.65-4.49 4.62v2.6H8.15v3.42h3.01V23.3a14.07 14.07 0 0 0 4.35 0v-8.39h2.13z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/thirdeye-computer-classes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="transition-transform duration-200 hover:scale-110 hover:opacity-90 focus-visible:outline-none"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" rx="5.5" fill="#0A66C2" />
                    <path
                      fill="#FFFFFF"
                      d="M8.28 6.18a2.1 2.1 0 1 1-4.2 0 2.1 2.1 0 0 1 4.2 0zM4.44 10.27h3.5V22.4h-3.5V10.27zm6.07 0h3.38v1.63h.05c.47-.93 1.63-1.87 3.5-1.87 3.75 0 4.44 2.45 4.44 5.64V22.4h-3.5v-5.91c0-1.41-.03-3.23-1.97-3.23-1.97 0-2.27 1.54-2.27 3.13V22.4h-3.63V10.27z"
                    />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918058061222"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="transition-transform duration-200 hover:scale-110 hover:opacity-90 focus-visible:outline-none"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="14" fill="#25D366" />
                    <path
                      fill="#FFFFFF"
                      d="M14 5.25a8.75 8.75 0 0 0-7.57 13.12L5.25 22.75l4.52-1.18A8.75 8.75 0 1 0 14 5.25zm0 15.93c-1.39 0-2.75-.38-3.93-1.09l-.28-.17-2.92.76.78-2.84-.18-.29a7.18 7.18 0 1 1 6.53 3.63zm3.94-5.38c-.22-.11-1.28-.63-1.48-.7-.2-.07-.35-.11-.5.11s-.58.7-.7.85c-.13.15-.26.17-.48.06-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.22-.69-1.67-.18-.44-.37-.38-.5-.39h-.43c-.15 0-.39.06-.59.28-.2.22-.78.76-.78 1.86 0 1.1.8 2.16.91 2.31.11.15 1.58 2.41 3.82 3.38.53.23.95.37 1.27.47.54.17 1.03.15 1.41.09.43-.06 1.28-.52 1.46-1.03.18-.5.18-.94.13-1.03-.06-.1-.2-.16-.42-.27z"
                    />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="transition-transform duration-200 hover:scale-110 hover:opacity-90 focus-visible:outline-none"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" rx="5.5" fill="#000000" stroke="#333333" strokeWidth="1" />
                    <path
                      d="M19.98 6.5h2.46l-5.37 6.14L23.37 21.5h-4.95l-3.87-5.06-4.44 5.06H7.65l5.75-6.57L6.37 6.5h5.08l3.49 4.62 4.04-4.62zm-.86 13.52h1.36L10.5 7.85H9.04l10.08 12.17z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* COLUMN 2: USEFUL LINKS (lg:col-span-3)                       */}
          {/* ============================================================ */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#f6d96b]">
                USEFUL LINKS
              </h3>
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#f6d96b] to-transparent mt-1.5" />
            </div>
            <ul className="space-y-2.5">
              {usefulLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="text-zinc-300 hover:text-[#f6d96b] text-sm sm:text-base font-medium transition-colors duration-150 block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================================ */}
          {/* COLUMN 3: CONTACT (lg:col-span-4)                            */}
          {/* ============================================================ */}
          <div className="lg:col-span-4 space-y-4 font-sans">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#f6d96b]">
                CONTACT
              </h3>
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#f6d96b] to-transparent mt-1.5" />
            </div>

            <div className="space-y-3.5 text-sm sm:text-base">
              {/* Online Helpline */}
              <div>
                <span className="text-zinc-300 font-bold block text-sm">
                  Online: 11am - 8pm
                </span>
                <a
                  href="tel:+918058061222"
                  className="text-[#f6d96b] hover:text-[#ffe07a] transition-colors font-mono tracking-tight block text-sm sm:text-base font-bold mt-0.5"
                >
                  +91 8058061222
                </a>
              </div>

              {/* Offline Helpline */}
              <div>
                <span className="text-zinc-300 font-bold block text-sm">
                  Offline: 8am - 8pm
                </span>
                <a
                  href="tel:+918058061222"
                  className="text-[#f6d96b] hover:text-[#ffe07a] transition-colors font-mono tracking-tight block text-sm sm:text-base font-bold mt-0.5"
                >
                  +91 8058061222
                </a>
              </div>

              {/* Email */}
              <div>
                <a
                  href="mailto:info@thirdeyeclasses.com"
                  className="text-[#f6d96b] hover:text-[#ffe07a] hover:underline transition-colors block text-sm font-semibold"
                >
                  info@thirdeyeclasses.com
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 pt-1 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                <MapPin className="w-4 h-4 text-[#f6d96b] shrink-0 mt-0.5" />
                <span>Tonk Road, Near Bus Stand, Jaipur, Rajasthan 302015</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ── GIANT TYPOGRAPHIC WATERMARK: "THIRD EYE" (Glow Strictly Inside Text Only) ── */}
        {/* ============================================================ */}
        <div
          onMouseMove={handleWatermarkMouseMove}
          onMouseEnter={() => setIsWatermarkHovered(true)}
          onMouseLeave={() => setIsWatermarkHovered(false)}
          onTouchMove={handleWatermarkTouchMove}
          onTouchEnd={() => setIsWatermarkHovered(false)}
          className="relative w-full overflow-hidden select-none pt-4 pb-2 sm:pb-4 flex items-center justify-center cursor-default"
        >
          {/* Layer 1: Base Wireframe Outline (Default State) */}
          <span
            className="w-full text-center font-black tracking-tight uppercase whitespace-nowrap leading-none block font-sans -translate-x-[2vw] sm:-translate-x-[3vw] select-none"
            style={{
              fontSize: "clamp(44px, 13.2vw, 190px)",
              letterSpacing: "clamp(0.01em, 0.3vw, 0.025em)",
              color: "rgba(255, 255, 255, 0.045)",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.08)",
              lineHeight: 0.85,
            }}
          >
            THIRD EYE
          </span>

          {/* Layer 2: Interactive Lit Fill (Strictly Inside Letters - Zero Outside Bleed) */}
          <span
            aria-hidden="true"
            className="absolute inset-0 w-full text-center font-black tracking-tight uppercase whitespace-nowrap leading-none block font-sans -translate-x-[2vw] sm:-translate-x-[3vw] select-none pointer-events-none pt-4 pb-2 sm:pb-4 transition-opacity duration-150"
            style={{
              fontSize: "clamp(44px, 13.2vw, 190px)",
              letterSpacing: "clamp(0.01em, 0.3vw, 0.025em)",
              color: "#f6d96b",
              WebkitTextStroke: "1px rgba(255, 245, 180, 0.95)",
              lineHeight: 0.85,
              maskImage: `radial-gradient(circle 240px at ${watermarkPos.x}px ${watermarkPos.y}px, black 35%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(circle 240px at ${watermarkPos.x}px ${watermarkPos.y}px, black 35%, transparent 100%)`,
              opacity: isWatermarkHovered ? 1 : 0,
            }}
          >
            THIRD EYE
          </span>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM COPYRIGHT & COMPLIANCE BAR                            */}
        {/* ============================================================ */}
        <div className="pt-8 border-t border-[#f6d96b]/15 flex flex-col md:flex-row items-center justify-between gap-5 text-xs sm:text-sm">
          {/* Copyright Notice */}
          <div className="text-zinc-400 text-center md:text-left font-normal">
            © {new Date().getFullYear()}{" "}
            <strong className="text-white font-semibold">Third Eye Computer Classes</strong>. All
            rights reserved.
          </div>

          {/* Quality & Certification Badges */}
          <div className="flex items-center gap-6 text-zinc-300 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#f6d96b]" />
              <span>ISO 9001 Certified</span>
            </div>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#f6d96b]" />
              <span>Govt. Recognized</span>
            </div>
          </div>

          {/* Back to top button - Arrow icon only */}
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-10 h-10 rounded-full bg-white/[0.04] border border-[#f6d96b]/35 hover:border-[#f6d96b] text-[#f6d96b] hover:bg-[#f6d96b]/20 hover:shadow-[0_0_15px_rgba(246,217,107,0.35)] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 shadow-sm focus:outline-none"
            >
              <ArrowUp className="w-4 h-4 text-[#f6d96b]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

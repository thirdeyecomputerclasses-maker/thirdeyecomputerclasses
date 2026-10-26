import React from "react";
import AboutHeroSection from "./components/AboutHeroSection";
import AboutVideoShowcase from "./components/AboutVideoShowcase";
import AboutScrollExpandTeam from "./components/AboutScrollExpandTeam";
import AboutCorePillars from "./components/AboutCorePillars";
import AboutFinalCTA from "./components/AboutFinalCTA";
import "./AboutPage.css";

export default function AboutUsSection({ showFullPageHero = true }) {
  const handleScrollToExplore = () => {
    const el = document.getElementById("team-scroll-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="about-us-experience relative bg-[#050505] text-white selection:bg-[#f6d96b] selection:text-black overflow-x-clip">
      {/* 1. Hero Header (Sheryians /about & Ember Agency inspired) */}
      <AboutHeroSection onScrollToExplore={handleScrollToExplore} />

      {/* 2. Auto-running Video Showcase (Screenshot 3) */}
      <AboutVideoShowcase />

      {/* 3. The People Who Make ThirdEye A Team - Scroll Expand Animation (Screenshot 4) */}
      <AboutScrollExpandTeam />

      {/* 4. Thoughtfully Crafted Core Pillars & Credentials (Ember Agency Inspired) */}
      <AboutCorePillars />

      {/* 5. Minimalist Closing CTA */}
      <AboutFinalCTA />
    </div>
  );
}

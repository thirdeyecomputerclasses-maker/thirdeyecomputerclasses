import React, { useRef } from "react";
import "./Franchise.css";

// Components inside components/ folder
import FranchiseHero from "./components/FranchiseHero";
import FranchiseInstagramReels from "./components/FranchiseInstagramReels";
import FranchiseCourses from "./components/FranchiseCourses";
import NetworkCentres from "./components/NetworkCentres";
import FranchiseInquiryForm from "./components/FranchiseInquiryForm";
import ScrollReveal from "./components/ScrollReveal";

export default function Franchise() {
  const inquiryRef = useRef(null);

  const scrollToInquiry = () => {
    if (inquiryRef.current) {
      inquiryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="franchise-page-wrapper">
      {/* Global Seamless Yellow-Tinted Tech Grid (Same as Home Page) */}
      <div className="franchise-grid-overlay" />

      {/* 1. Hero Section (Headline, Impact & Founder) */}
      <ScrollReveal direction="up" delay={20} duration={700}>
        <FranchiseHero onOpenInquiry={scrollToInquiry} />
      </ScrollReveal>

      {/* 2. Instagram Video & Reels Showcase (5-6 Videos) */}
      <ScrollReveal direction="up" delay={30} duration={700}>
        <FranchiseInstagramReels />
      </ScrollReveal>
      
      {/* 3. 300+ Courses Portfolio */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <FranchiseCourses />
      </ScrollReveal> 

      {/* 4. 10 Running Centres & Phase II Upcoming Hubs */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <NetworkCentres onOpenInquiry={scrollToInquiry} />
      </ScrollReveal>

      {/* 5. Interactive Franchise Application Form & Direct Helpline */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <FranchiseInquiryForm formRef={inquiryRef} />
      </ScrollReveal>
    </div>
  );
}

import React, { useRef } from "react";
import "./Franchise.css";

// Components inside components/ folder
import FranchiseHero from "./components/FranchiseHero";
import FranchiseInstagramReels from "./components/FranchiseInstagramReels";
import JoinHandsBrand from "./components/JoinHandsBrand";
import FranchiseCourses from "./components/FranchiseCourses";
import IndustryOverviewQA from "./components/IndustryOverviewQA";
import HowThirdEyeHelpsYouGrow from "./components/HowThirdEyeHelpsYouGrow";
import FranchisePlacementDrive from "./components/FranchisePlacementDrive";
import AwardsRecognition from "./components/AwardsRecognition";
import ExpansionTimeline from "./components/ExpansionTimeline";
import PartnerTestimonials from "./components/PartnerTestimonials";
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
      {/* Global Seamless Yellow-Tinted Tech Grid */}
      <div className="franchise-grid-overlay" />

      {/* 1. Hero Section (Headline, Impact & Founder) */}
      <ScrollReveal direction="up" delay={20} duration={700}>
        <FranchiseHero onOpenInquiry={scrollToInquiry} />
      </ScrollReveal>

      {/* 2. Instagram Video & Reels Showcase (5-6 Videos) */}
      <ScrollReveal direction="up" delay={30} duration={700}>
        <FranchiseInstagramReels />
      </ScrollReveal>

      {/* 3. Join Hands with Rajasthan's Leading IT Skill Development Brand */}
      <ScrollReveal direction="up" delay={35} duration={700}>
        <JoinHandsBrand />
      </ScrollReveal>
      
      {/* 4. 300+ Courses Portfolio */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <FranchiseCourses />
      </ScrollReveal> 

      {/* 5. Education Industry Overview & Quality Assurance */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <IndustryOverviewQA />
      </ScrollReveal>

      {/* 6. How ThirdEye Helps You Grow & Bank EMI Facilities */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <HowThirdEyeHelpsYouGrow onOpenInquiry={scrollToInquiry} />
      </ScrollReveal>

      {/* 7. Placement Drive — Every 3rd Saturday & Career Support */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <FranchisePlacementDrive onOpenInquiry={scrollToInquiry} />
      </ScrollReveal>

      {/* 8. Awards & Industry Recognition (Photo Grid & University Awards) */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <AwardsRecognition />
      </ScrollReveal>

      {/* 9. Growth Journey — Ascending Expansion Timeline (2023–2026) */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <ExpansionTimeline />
      </ScrollReveal>

      {/* 10. Success Begins Here — Our Partner's Journey */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <PartnerTestimonials />
      </ScrollReveal>

      {/* 11. Network Centres (15+ Running Centres & Branch Cards) */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <NetworkCentres onOpenInquiry={scrollToInquiry} />
      </ScrollReveal>

      {/* 12. Interactive Franchise Application Form & Direct Helpline */}
      <ScrollReveal direction="up" delay={40} duration={750}>
        <FranchiseInquiryForm formRef={inquiryRef} />
      </ScrollReveal>
    </div>
  );
}

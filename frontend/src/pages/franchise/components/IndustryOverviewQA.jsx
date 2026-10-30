import React from "react";
import "./IndustryOverviewQA.css";
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Globe2,
  Sparkles,
  Award,
  Users2
} from "lucide-react";

export default function IndustryOverviewQA() {
  const industryPoints = [
    {
      title: "Rising Demand for Digital Literacy & Computer Skills",
      desc: "Every modern sector requires computer literacy and specialized IT proficiency.",
      icon: GraduationCap
    },
    {
      title: "More Career Opportunities Across Sectors",
      desc: "From software & data analytics to accounting & digital marketing, hiring is surging.",
      icon: Briefcase
    },
    {
      title: "Key Drivers: Digital India & Job Market Trends",
      desc: "National digital push and aggressive automation driving continuous demand for upskilling.",
      icon: Globe2
    },
    {
      title: "Better Jobs & Economic Growth For Youth",
      desc: "Practical job-ready courses enable graduates to secure higher-paying employment rapidly.",
      icon: TrendingUp
    },
    {
      title: "Massive Market Size & Growth Potential in India",
      desc: "IT education is a multi-billion dollar evergreen sector with recurring student batches.",
      icon: Sparkles
    },
    {
      title: "Continuous Industry Evolution & Lifelong Learning",
      desc: "Regular curriculum updates keep students ahead of latest tools and market demands.",
      icon: Award
    }
  ];

  const qaPoints = [
    {
      title: "Standardized Academic Delivery Across All Centers",
      desc: "Unified curriculum, structured lesson plans, and centralized examination standards across every branch.",
      icon: CheckCircle2
    },
    {
      title: 'Faculty Onboarding – "Once Technically Qualified"',
      desc: "Strict technical screening, corporate trainer vetting, and continuous pedagogy upskilling before classroom teaching.",
      icon: Users2
    },
    {
      title: "Regular Audits & Multi-Tier Feedback Mechanisms",
      desc: "Unannounced quality checks, student satisfaction ratings, and lab infrastructure reviews every quarter.",
      icon: ShieldCheck
    },
    {
      title: "Transparent Policies & Ethical Business Practices",
      desc: "Clear student fee policies, transparent franchise margins, and zero hidden royalty deductions.",
      icon: Award
    },
    {
      title: "Consistent Quality and Trust Across Franchise Network",
      desc: "Thirdeye maintains high brand reputation, ensuring parents and recruiters trust every branch equally.",
      icon: Sparkles
    }
  ];

  return (
    <section className="industry-qa-section" id="industry-qa">
      {/* Background ambient lighting */}
      <div className="industry-qa-glow glow-left" />
      <div className="industry-qa-glow glow-right" />

      <div className="industry-qa-container">
        {/* Top Header Bar */}
        <div className="industry-qa-header">
          <div className="qa-header-badge">
            <Sparkles size={16} />
            <span>MARKET DYNAMICS & QUALITY ASSURANCE</span>
          </div>
          <h2 className="qa-main-title">
            PROVEN INDUSTRY DEMAND &amp; <span className="title-yellow">UNCOMPROMISING QUALITY</span>
          </h2>
          <p className="qa-subtitle">
            Why investing in a Thirdeye franchise delivers unmatched operational stability and high student lifetime value.
          </p>
        </div>

        {/* 2-Column Side-by-Side Cards */}
        <div className="industry-qa-grid">
          {/* Card 1: Education Industry Overview */}
          <div className="qa-card industry-overview-card">
            <div className="qa-card-top-laser" />
            <div className="qa-pill-title-bar">
              <span className="qa-pill-text">EDUCATION INDUSTRY OVERVIEW</span>
            </div>

            <p className="qa-card-lead">
              The vocational IT education market in India is expanding at an unprecedented rate, creating year-round demand for neighborhood training centers.
            </p>

            <ul className="qa-bullets-list">
              {industryPoints.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <li key={idx} className="qa-bullet-item">
                    <div className="bullet-icon-box">
                      <IconComponent size={18} className="bullet-icon text-yellow-400" />
                    </div>
                    <div className="bullet-content">
                      <h4 className="bullet-title">{item.title}</h4>
                      <p className="bullet-desc">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="qa-card-footer-metric">
              <span className="metric-tag">ANNUAL SECTOR GROWTH</span>
              <strong className="metric-highlight">24%+ CAGR Across Tier-2 &amp; Tier-3 Cities</strong>
            </div>
          </div>

          {/* Card 2: Quality Assurance */}
          <div className="qa-card quality-assurance-card">
            <div className="qa-card-top-laser" />
            <div className="qa-pill-title-bar">
              <span className="qa-pill-text">QUALITY ASSURANCE</span>
            </div>

            <p className="qa-card-lead">
              Our standardized delivery framework ensures every franchise branch maintains the same excellence and reputation as our flagship campus.
            </p>

            <ul className="qa-bullets-list">
              {qaPoints.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <li key={idx} className="qa-bullet-item">
                    <div className="bullet-icon-box qa-icon-highlight">
                      <IconComponent size={18} className="bullet-icon text-yellow-400" />
                    </div>
                    <div className="bullet-content">
                      <h4 className="bullet-title">{item.title}</h4>
                      <p className="bullet-desc">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="qa-card-footer-metric">
              <span className="metric-tag">INSTITUTIONAL INTEGRITY</span>
              <strong className="metric-highlight">ISO 9001:2015 Certified Curriculum &amp; Training</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

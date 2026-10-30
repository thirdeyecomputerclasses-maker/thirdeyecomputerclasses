import React from "react";
import "./JoinHandsBrand.css";
import { CheckCircle2, ShieldCheck, Sparkles, Building2, TrendingUp } from "lucide-react";

// Partner logos
import logoMta from "../../../assets/awards/partner_logo_mta.png";
import logoCodered from "../../../assets/awards/partner_logo_codered.png";
import logoAdobe from "../../../assets/awards/partner_logo_adobe.png";
import logoGoogle from "../../../assets/awards/partner_logo_google.png";
import logoTally from "../../../assets/awards/partner_logo_tally.png";
import logoMicrosoft from "../../../assets/awards/partner_logo_microsoft.png";

export default function JoinHandsBrand() {
  const bulletPoints = [
    { text: "Proven & Tested Business Model." },
    { text: "Investments Should Always be Made in Growing Organization." },
    { text: "Strong Brand Recognition & Market Presence." },
    { text: "Exclusive Area Rights." },
    { text: "No Dead Stock" },
    { text: "High Return on a Small Investment" },
    { text: "Extensive Product & Staff Training" },
    { text: "Marketing & Promotional Support" },
    { text: "Hassle-free Setup & Ongoing Technical Support" },
    { text: "Continuous Curriculum Updates" },
    { text: "Recession Free Business" }
  ];

  const partners = [
    {
      id: "mta",
      name: "Microsoft Technology Associate",
      img: logoMta,
      sub: "Authorized IT Associate Curriculum"
    },
    {
      id: "codered",
      name: "CodeRED by EC-Council",
      img: logoCodered,
      sub: "Cybersecurity & Ethical Hacking"
    },
    {
      id: "adobe",
      name: "Adobe Certified Professional",
      img: logoAdobe,
      sub: "Design & VFX Masterclass"
    },
    {
      id: "google",
      name: "Google Partner",
      img: logoGoogle,
      sub: "Digital Marketing & Cloud Unlocked"
    },
    {
      id: "tally",
      name: "Tally (Power of Simplicity)",
      img: logoTally,
      sub: "Accounting & GST Certification"
    },
    {
      id: "microsoft",
      name: "Microsoft Certified Educator",
      img: logoMicrosoft,
      sub: "Enterprise Software & Cloud Labs"
    }
  ];

  return (
    <section className="join-hands-section" id="franchise-advantages">
      {/* Background Ambience */}
      <div className="join-hands-glow glow-left" />
      <div className="join-hands-glow glow-right" />

      <div className="join-hands-container">
        {/* Yellow Header Banner */}
        <div className="join-hands-banner-wrapper">
          <div className="join-hands-banner">
            <h2 className="join-hands-banner-title">
              Join Hands with Rajasthan's Leading IT Skill Development Brand
            </h2>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="join-hands-content-grid">
          {/* LEFT: 11 Bullets */}
          <div className="join-hands-bullets-col">
            <div className="bullets-header-hint">
              <Sparkles size={16} className="hint-icon" />
              <span>THE THIRDEYE FRANCHISE ADVANTAGE</span>
            </div>

            <ul className="join-hands-bullets-list">
              {bulletPoints.map((b, idx) => (
                <li key={idx} className="join-hands-bullet-item">
                  <span className="bullet-dot-glow">
                    <CheckCircle2 size={16} className="bullet-check-icon" />
                  </span>
                  <span className="bullet-text">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Partner & Certification Logos Grid */}
          <div className="join-hands-logos-col">
            <div className="logos-header-hint">
              <ShieldCheck size={16} className="hint-icon" />
              <span>AUTHORIZED CERTIFICATION & TECHNOLOGY PARTNERS</span>
            </div>

            <div className="join-hands-logos-grid">
              {partners.map((p) => (
                <div key={p.id} className="partner-logo-card">
                  <div className="card-laser-line" />
                  <div className="partner-logo-img-wrap">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="partner-logo-img"
                      loading="lazy"
                    />
                  </div>
                  <span className="partner-logo-title">{p.name}</span>
                  <span className="partner-logo-sub">{p.sub}</span>
                </div>
              ))}
            </div>

            {/* Bottom Trust Badge */}
            <div className="join-hands-trust-strip">
              <div className="trust-strip-item">
                <Building2 size={16} className="trust-icon" />
                <span>10+ Operational Campuses</span>
              </div>
              <span className="trust-strip-sep">•</span>
              <div className="trust-strip-item">
                <TrendingUp size={16} className="trust-icon" />
                <span>Zero Dead Stock &bull; Perpetual Demand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

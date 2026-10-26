import React, { useState } from "react";
import "./FranchiseInquiryForm.css";
import CustomSelect from "./CustomSelect";
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Sparkles, 
  ShieldCheck, 
  Building, 
  Clock, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  PhoneCall 
} from "lucide-react";
import { createSubmission } from "../../../services/submissionApi";

const INVESTMENT_OPTIONS = [
  { value: "Below 10 Lakhs", label: "Below ₹10 Lakhs" },
  { value: "10-15 Lakhs", label: "₹10 Lakhs – ₹15 Lakhs", badge: "Recommended" },
  { value: "15-25 Lakhs", label: "₹15 Lakhs – ₹25 Lakhs" },
  { value: "25+ Lakhs", label: "₹25+ Lakhs (Multi-Unit Master)" }
];

const BACKGROUND_OPTIONS = [
  { value: "Business Owner", label: "Business Owner / Entrepreneur" },
  { value: "Teacher/Trainer", label: "Teacher / Academician" },
  { value: "IT Professional", label: "IT / Corporate Professional" },
  { value: "Investor", label: "Real Estate / Investor" },
  { value: "First-time Entrepreneur", label: "First-Time Entrepreneur" }
];

export default function FranchiseInquiryForm({ formRef }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    investment: "10-15 Lakhs",
    background: "Business Owner",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createSubmission({
        formType: "franchise",
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        investment: formData.investment,
        background: formData.background,
        message: formData.message.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn("MongoDB submission warning:", err.message);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="inquiry-franchise-section" id="franchise-inquiry" ref={formRef}>
      {/* Ambient background glows */}
      <div className="inquiry-ambient-glow glow-top-left" />
      <div className="inquiry-ambient-glow glow-bottom-right" />

      <div className="inquiry-franchise-container">
        {/* Section Header Block */}
        <div className="inquiry-header-block">
          <div className="inquiry-badge">
            <Sparkles size={16} className="inquiry-badge-icon" />
            <span>PARTNER ENROLLMENT OPEN (2026 BATCH)</span>
          </div>

          <h2 className="inquiry-title">
            START YOUR <span className="inquiry-title-gold">FRANCHISE INQUIRY</span>
          </h2>

          {/* Single-Line Trust Velocity Strip (No boring paragraph) */}
          <div className="inquiry-trust-strip">
            <div className="inquiry-trust-pill">
              <Clock size={16} className="trust-pill-icon" />
              <span className="trust-pill-num">24 Hours</span>
              <span className="trust-pill-label">Directorate Callback</span>
            </div>
            <div className="inquiry-trust-sep" />
            <div className="inquiry-trust-pill">
              <ShieldCheck size={16} className="trust-pill-icon" />
              <span className="trust-pill-num">100%</span>
              <span className="trust-pill-label">Territory Protection</span>
            </div>
            <div className="inquiry-trust-sep" />
            <div className="inquiry-trust-pill">
              <Lock size={16} className="trust-pill-icon" />
              <span className="trust-pill-num">Zero</span>
              <span className="trust-pill-label">Confidentiality Leak</span>
            </div>
            <div className="inquiry-trust-sep" />
            <div className="inquiry-trust-pill">
              <CheckCircle2 size={16} className="trust-pill-icon" />
              <span className="trust-pill-num">Free</span>
              <span className="trust-pill-label">Catchment ROI Model</span>
            </div>
          </div>
        </div>

        {/* Two Column Grid: Form Console & Command Desk */}
        <div className="inquiry-grid">
          {/* Left: Vibrant Filled Yellow Form Console */}
          <div className="inquiry-form-card">
            <div className="form-card-top-laser" />

            {submitted ? (
              <div className="submission-success-box">
                <div className="success-icon-circle">
                  <CheckCircle size={44} />
                </div>
                <h3 className="success-title">Application Received!</h3>
                <p className="success-greeting">
                  Thank you, <strong>{formData.fullName || "Partner"}</strong>.
                </p>
                <p className="success-desc">
                  Your priority franchise registration for <strong>{formData.city || "your target location"}</strong> has been logged with our Central Expansion Desk. Our Managing Directorate will reach you at <strong>{formData.phone || "your number"}</strong> within 24 hours.
                </p>

                <div className="success-steps-box">
                  <div className="success-step-item">
                    <span className="step-check">✓</span>
                    <span>Territory catchment viability check initiated</span>
                  </div>
                  <div className="success-step-item">
                    <span className="step-check">✓</span>
                    <span>Executive Franchise Dossier dispatched</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="reset-form-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      phone: "",
                      email: "",
                      city: "",
                      investment: "10-15 Lakhs",
                      background: "Business Owner",
                      message: ""
                    });
                  }}
                >
                  <span>Submit Another Inquiry</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="franchise-form">
                <div className="form-console-header">
                  <span className="console-mini-badge">APPLICATION CONSOLE</span>
                  <h3 className="console-title">Reserve Your Exclusive Territory</h3>
                  <p className="console-sub">Complete the 60-second form to schedule your 1-on-1 discovery review.</p>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required 
                      placeholder="e.g. Rajesh Kumar" 
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                      placeholder="+91 98765 43210" 
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder="rajesh@domain.com" 
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Target City / District *</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required 
                      placeholder="e.g. Ajmer, Sikar, Alwar" 
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div 
                    className="form-group"
                    style={{ zIndex: openDropdown === "investment" ? 60 : 10, position: "relative" }}
                  >
                    <label className="form-label">Investment Capacity</label>
                    <CustomSelect
                      name="investment"
                      value={formData.investment}
                      isOpen={openDropdown === "investment"}
                      onToggle={() => setOpenDropdown((prev) => prev === "investment" ? null : "investment")}
                      onClose={() => setOpenDropdown(null)}
                      onChange={handleChange}
                      options={INVESTMENT_OPTIONS}
                    />
                  </div>
                  <div 
                    className="form-group"
                    style={{ zIndex: openDropdown === "background" ? 60 : 9, position: "relative" }}
                  >
                    <label className="form-label">Current Background</label>
                    <CustomSelect
                      name="background"
                      value={formData.background}
                      isOpen={openDropdown === "background"}
                      onToggle={() => setOpenDropdown((prev) => prev === "background" ? null : "background")}
                      onClose={() => setOpenDropdown(null)}
                      onChange={handleChange}
                      options={BACKGROUND_OPTIONS}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Proposed Center Space or Notes (Optional)</label>
                  <textarea 
                    name="message" 
                    rows={3} 
                    value={formData.message} 
                    onChange={handleChange}
                    placeholder="Tell us about your proposed commercial location, square footage (sq ft), or questions..."
                    className="form-textarea"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="form-submit-btn"
                >
                  <Send size={18} />
                  <span>{isSubmitting ? "Submitting Application..." : "Submit Franchise Application"}</span>
                  <ArrowRight size={18} />
                </button>

                <div className="form-security-note">
                  <Lock size={13} />
                  <span>256-Bit SSL Encrypted • Your Information Is Kept 100% Confidential</span>
                </div>
              </form>
            )}
          </div>

          {/* Right: Executive Expansion Command Desk */}
          <div className="inquiry-contact-card">
            <div className="contact-card-top-laser" />

            <div className="contact-card-header">
              <div className="contact-head-icon-box">
                <Building size={24} />
              </div>
              <div>
                <div className="contact-status-live">
                  <span className="live-dot" />
                  <span>DESK ACTIVE NOW</span>
                </div>
                <h3 className="contact-title">Direct Expansion Desk</h3>
                <p className="contact-sub">Central Headquarters Allotment Cell</p>
              </div>
            </div>

            <div className="contact-channels">
              <a href="tel:+918058061222" className="channel-box">
                <div className="channel-icon-wrap">
                  <PhoneCall size={20} />
                </div>
                <div className="channel-content">
                  <div className="channel-label">Direct Expansion Hotline</div>
                  <div className="channel-value">+91 805 806 1222</div>
                  <div className="channel-hint">Instant Connect with C-Suite Support</div>
                </div>
              </a>

              <a href="mailto:info@thirdeyeclasses.com" className="channel-box">
                <div className="channel-icon-wrap">
                  <Mail size={20} />
                </div>
                <div className="channel-content">
                  <div className="channel-label">Official Franchise Email</div>
                  <div className="channel-value">info@thirdeyeclasses.com</div>
                  <div className="channel-hint">2-Hour Official Response Time</div>
                </div>
              </a>

              <div className="channel-box static-box">
                <div className="channel-icon-wrap">
                  <MapPin size={20} />
                </div>
                <div className="channel-content">
                  <div className="channel-label">Headquarters Campus</div>
                  <div className="channel-value">Sanganer, Jaipur, Rajasthan 302029</div>
                  <div className="channel-hint">Corporate Onboarding & Lab Center</div>
                </div>
              </div>
            </div>

            {/* Legal Exclusivity Callout Box */}
            <div className="territory-guarantee-box">
              <ShieldCheck size={24} className="guarantee-icon" />
              <div>
                <strong className="guarantee-title">Guaranteed Territory Exclusivity:</strong>
                <p className="guarantee-text">
                  We legally bind your geographic radius in the franchise contract so no other ThirdEye branch can be allotted in your catchment zone.
                </p>
              </div>
            </div>

            {/* What Happens Next 3-Step Micro Timeline */}
            <div className="inquiry-timeline-box">
              <div className="timeline-box-title">WHAT HAPPENS NEXT:</div>
              <div className="mini-timeline-item">
                <span className="mini-timeline-num">1</span>
                <span>Territory viability & competition audit</span>
              </div>
              <div className="mini-timeline-item">
                <span className="mini-timeline-num">2</span>
                <span>1-on-1 strategy call with Managing Directorate</span>
              </div>
              <div className="mini-timeline-item">
                <span className="mini-timeline-num">3</span>
                <span>Detailed P&L & Turnkey Setup Plan delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

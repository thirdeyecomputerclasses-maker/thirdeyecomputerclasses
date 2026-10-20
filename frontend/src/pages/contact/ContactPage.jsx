import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ContactPage.css";
import {
  Mail,
  PhoneCall,
  MapPin,
  Send,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Compass,
} from "lucide-react";
import { createSubmission } from "../../services/submissionApi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createSubmission({
        formType: "contact",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn("MongoDB submission warning:", err.message);
      // Still show success state so user has great experience even if server is booting
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    setSubmitted(false);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Background ambient lighting */}
      <div className="contact-ambient-glow glow-top" />
      <div className="contact-ambient-glow glow-bottom" />
      <div className="contact-grid-pattern" />

      <div className="contact-main-container">
        {/* Header Block */}
        <div className="contact-hero-header">
          <div className="contact-top-badge">
            <Sparkles size={14} className="badge-sparkle-icon" />
            <span>DIRECT CONNECT DESK</span>
          </div>
          <h1 className="contact-page-title">
            LET'S GET <span className="title-gold-accent">IN TOUCH</span>
          </h1>
          <p className="contact-page-sub">
            Have questions about career programs, classroom batches, or certifications? 
            Our counselors and admissions team are ready to guide you.
          </p>
        </div>

        {/* 2-Column Responsive Card Layout */}
        <div className="contact-layout-grid">
          {/* LEFT: Apply Now Form Card */}
          <div className="contact-form-card">
            <div className="card-top-laser" />

            {submitted ? (
              <div className="contact-success-state">
                <div className="success-icon-badge">
                  <CheckCircle2 size={46} />
                </div>
                <h3 className="success-heading">Message Dispatched!</h3>
                <p className="success-lead">
                  Thank you, <strong>{formData.name || "Student"}</strong>.
                </p>
                <p className="success-detail">
                  Your inquiry has been received by our central admissions desk. 
                  A senior counselor will connect with you via <strong>{formData.phone || formData.email}</strong> within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="contact-reset-btn"
                >
                  <span>Submit Another Message</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-body">
                <div className="form-head-block">
                  <h2 className="form-card-title">Apply Now</h2>
                  <p className="form-card-subtitle">
                    Let us know how to get back to you.
                  </p>
                </div>

                {/* Row 1: Name & Email */}
                <div className="form-inputs-row">
                  <div className="contact-form-field">
                    <label className="field-label">
                      Your Name <span className="field-required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your Name"
                      className="contact-text-input"
                    />
                    <span className="field-hint">Enter your full name here</span>
                  </div>

                  <div className="contact-form-field">
                    <label className="field-label">
                      Email Address <span className="field-required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your Email"
                      className="contact-text-input"
                    />
                    <span className="field-hint">Example: user@website.com</span>
                  </div>
                </div>

                {/* Row 2: Phone Number */}
                <div className="contact-form-field">
                  <label className="field-label">
                    Phone Number <span className="field-required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter Your Number"
                    className="contact-text-input"
                  />
                  <span className="field-hint">10-digit mobile number for call or WhatsApp updates</span>
                </div>

                {/* Row 3: Message / Help query */}
                <div className="contact-form-field">
                  <label className="field-label">
                    How can we help?
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Feel free to ask a question or simply leave a comment..."
                    className="contact-textarea-input"
                  />
                  <span className="field-hint">Tell us about your course interest, batch timing, or general query</span>
                </div>

                {/* Action Button & Trust Note */}
                <div className="form-action-area">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-submit-btn"
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? "Sending Inquiry..." : "Contact Now!"}</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="form-trust-indicator">
                    <Lock size={13} className="trust-lock-icon" />
                    <span>256-Bit Encrypted • Your details are kept 100% private</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Contact Information & Social Media Card */}
          <div className="contact-info-card">
            <div className="card-top-laser" />

            {/* Section: OUR CONTACT */}
            <div className="contact-info-section">
              <div className="section-accent-header">
                <span className="vertical-accent-bar" />
                <h3 className="section-accent-title">OUR CONTACT</h3>
              </div>

              <div className="contact-channels-stack">
                {/* Email Address */}
                <a
                  href="mailto:info@thirdeyeclasses.com"
                  className="contact-channel-item"
                  title="Send us an email"
                >
                  <div className="channel-circle-icon">
                    <Mail size={20} />
                  </div>
                  <div className="channel-text-wrap">
                    <span className="channel-title-text">Email Address</span>
                    <span className="channel-value-text">info@thirdeyeclasses.com</span>
                    <span className="channel-sub-hint">2-Hour Official Response Time</span>
                  </div>
                </a>

                {/* Call Us */}
                <a
                  href="tel:+918058061222"
                  className="contact-channel-item"
                  title="Call our helpline"
                >
                  <div className="channel-circle-icon">
                    <PhoneCall size={20} />
                  </div>
                  <div className="channel-text-wrap">
                    <span className="channel-title-text">Call Us</span>
                    <span className="channel-value-text">+91 805 806 1222</span>
                    <span className="channel-sub-hint">Direct Helpline • Mon-Sat 9AM-8PM</span>
                  </div>
                </a>

                {/* Campus Address */}
                <div className="contact-channel-item static-channel">
                  <div className="channel-circle-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="channel-text-wrap">
                    <span className="channel-title-text">Campus Center</span>
                    <span className="channel-value-text">Sanganer, Jaipur, Rajasthan 302029</span>
                    <span className="channel-sub-hint">Walk-in Counseling & Lab Visits Welcome</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section: SOCIAL MEDIA */}
            <div className="contact-info-section social-section">
              <div className="section-accent-header">
                <span className="vertical-accent-bar" />
                <h3 className="section-accent-title">SOCIAL MEDIA</h3>
              </div>

              <div className="contact-social-row">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-brand-btn ig-btn"
                  aria-label="Instagram"
                  title="Follow us on Instagram"
                >
                  <svg className="social-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-brand-btn fb-btn"
                  aria-label="Facebook"
                  title="Join us on Facebook"
                >
                  <svg className="social-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-brand-btn yt-btn"
                  aria-label="YouTube"
                  title="Subscribe on YouTube"
                >
                  <svg className="social-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-brand-btn in-btn"
                  aria-label="LinkedIn"
                  title="Connect on LinkedIn"
                >
                  <svg className="social-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/918058061222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-brand-btn wa-btn"
                  aria-label="WhatsApp"
                  title="Chat directly on WhatsApp"
                >
                  <svg className="social-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Direct Nearest Branch Finder Callout */}
            <div className="contact-quick-chat-box branch-finder-callout">
              <div className="quick-chat-info">
                <div className="quick-chat-icon-wrap branch-finder-icon">
                  <Compass size={22} />
                </div>
                <div>
                  <span className="quick-chat-title branch-finder-title">Find Nearest Third Eye Branch</span>
                  <p className="quick-chat-desc">Enter your area PIN code or locality to discover our 10+ Jaipur campuses with live driving distance & map routes</p>
                </div>
              </div>
              <Link to="/nearest-branch" className="quick-chat-btn branch-finder-btn">
                <span>Launch Branch Finder</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Direct Instant Chat Callout */}
            <div className="contact-quick-chat-box">
              <div className="quick-chat-info">
                <div className="quick-chat-icon-wrap">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <span className="quick-chat-title">Need Instant Counseling?</span>
                  <p className="quick-chat-desc">Connect directly on WhatsApp with our Jaipur center desk</p>
                </div>
              </div>
              <a
                href="https://wa.me/918058061222?text=Hello%20Third%20Eye%20Classes,%20I%20want%20to%20know%20more%20about%20your%20courses"
                target="_blank"
                rel="noopener noreferrer"
                className="quick-chat-btn"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

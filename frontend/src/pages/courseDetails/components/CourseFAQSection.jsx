import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import "./CourseFAQSection.css";

const COURSE_FAQS = [
  {
    id: 1,
    q: "Who is this course suitable for? Can complete beginners enroll?",
    a: "Absolutely! Every course is built beginner-friendly with zero prior coding or 3D knowledge required. We start from foundational fundamentals and guide you step-by-step to production-grade mastery.",
  },
  {
    id: 2,
    q: "Is the training offline or online?",
    a: "We specialize in hands-on offline classroom & high-tech lab training at our Jaipur center so you get direct 1:1 faculty interaction and workstation time. Hybrid/online options are also available for select modules.",
  },
  {
    id: 3,
    q: "Do you provide dedicated placement assistance?",
    a: "Yes! ThirdEye has an active placement network with 300+ hiring partners across India. We provide resume polishing, portfolio reviews, mock technical interviews, and direct referral opportunities.",
  },
  {
    id: 4,
    q: "What kind of real-world projects will I build during the course?",
    a: "You will build production-grade applications, 3D scenes/assets, or design systems from scratch. These projects are deployed live to form a standout portfolio that demonstrates real job-ready capability.",
  },
  {
    id: 5,
    q: "Will I receive an industry-recognized certificate?",
    a: "Yes. Upon completing your course projects and assessments, you will be awarded an official ThirdEye Certificate of Completion with a unique verification credential ID recognized by top hiring studios.",
  },
  {
    id: 6,
    q: "What are the batch timings and flexible schedules?",
    a: "We run multiple batches throughout the day — morning, afternoon, and evening. We also offer weekend batches tailored specifically for college students and working professionals.",
  },
  {
    id: 7,
    q: "Can I attend a free demo class before enrolling?",
    a: "Yes, 100%! We invite all prospective students for a complimentary demo session at our Jaipur center where you can meet our faculty, tour the computer lab, and experience our teaching methodology.",
  },
  {
    id: 8,
    q: "What if I miss a lecture or need extra doubt-clearing support?",
    a: "You never fall behind. Every student gets access to reference materials, class notes, recorded backups, and daily 1:1 doubt-clearing sessions with lab mentors.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`faq-card ${isOpen ? "faq-card-open" : ""}`}>
      <button
        type="button"
        className="faq-question-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-question-text">{faq.q}</span>
        <motion.div
          className="faq-chevron-wrap"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className={isOpen ? "text-[#f6d96b]" : "text-zinc-400"} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="faq-answer-collapse"
          >
            <div className="faq-answer-inner">
              <p>{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CourseFAQSection({
  badge = "FAQ // FREQUENTLY ASKED QUESTIONS",
  title = "Got Questions? We've Got Answers.",
  subtitle = "Everything you need to know about ThirdEye courses, placement support, lab access, and certification.",
  faqs = COURSE_FAQS,
}) {
  const [openId, setOpenId] = useState(1);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="course-faq-section" id="faq">
      <div className="course-faq-wrapper">
        
        {/* Ambient Spotlight Glow */}
        <div className="course-faq-glow" />

        {/* Section Header */}
        <div className="course-faq-header">
          <motion.div
            className="course-faq-badge"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle size={14} className="text-[#f6d96b]" />
            <span>{badge}</span>
          </motion.div>

          <motion.h2
            className="course-faq-title"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="course-faq-subtitle"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="course-faq-list">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

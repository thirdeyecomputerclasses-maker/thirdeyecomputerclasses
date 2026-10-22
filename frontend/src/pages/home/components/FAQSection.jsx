import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────
// FAQ DATA — update answers as needed
// ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    id: 1,
    q: "Can a beginner join?",
    a: "Absolutely! All our courses are designed from the ground up with beginners in mind. No prior knowledge is required — we start from zero and take you all the way to job-ready skills.",
  },
  {
    id: 2,
    q: "Is it offline or online?",
    a: "We primarily offer in-person, offline classes at our Jaipur centre so you get hands-on lab time and direct faculty interaction. Online options are also available for select courses — ask our team for details.",
  },
  {
    id: 3,
    q: "Do you provide placement?",
    a: "Yes! We have a dedicated placement cell that connects students with hiring partners. From resume building to mock interviews and referrals, we support you every step of the way.",
  },
  {
    id: 4,
    q: "Do you provide practical training?",
    a: "100% practical-first approach. Every course includes hands-on lab sessions, real projects, live tools, and industry assignments — because we believe you learn by doing, not just watching.",
  },
  {
    id: 5,
    q: "What is the course fee?",
    a: "Fees vary by course and duration. We keep our pricing affordable and offer flexible instalment options. Contact us directly for the latest fee structure and any available scholarships.",
  },
  {
    id: 6,
    q: "What courses do you offer?",
    a: "We offer a wide range of courses — including Computer Basics, MS Office, Tally & Accounts, Web Design, Graphic Design, 3D Animation, Video Editing, Full-Stack Development, Cybersecurity, and more.",
  },
  {
    id: 7,
    q: "Are your courses suitable for beginners?",
    a: "Yes, every course is structured to welcome complete beginners. Our faculty patiently covers each concept step-by-step, ensuring no one is left behind regardless of their background.",
  },
  {
    id: 8,
    q: "Do you provide certificates after course completion?",
    a: "Yes, all students receive an industry-recognised certificate upon successful course completion. Our certificates are valued by employers and help strengthen your resume.",
  },
  {
    id: 9,
    q: "What is the duration of your courses?",
    a: "Course duration ranges from 1 month (short skill courses) to 12 months (advanced professional programmes). Most popular courses run between 3–6 months with flexible scheduling.",
  },
  {
    id: 10,
    q: "What are the class timings?",
    a: "We offer multiple batches — morning, afternoon, and evening — so you can choose a timing that fits your schedule. Weekend batches are also available for working professionals and students.",
  },
  {
    id: 11,
    q: "Do you offer online classes as well?",
    a: "Yes, select courses are available in an online format with live instructor sessions, recorded lectures, and digital study materials. Get in touch to find out which courses are currently available online.",
  },
  {
    id: 12,
    q: "Can I attend a free demo class?",
    a: "Yes, absolutely! We offer complimentary demo sessions so you can experience our high-tech labs, interact with faculty, and explore the curriculum before making your decision.",
  },
];

// ─────────────────────────────────────────────────────────────────
// Single FAQ Item
// ─────────────────────────────────────────────────────────────────
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        onClick={onToggle}
        className="relative cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden"
        style={{
          borderColor: isOpen ? "rgba(246,217,107,0.40)" : "rgba(255,255,255,0.08)",
          background: isOpen
            ? "linear-gradient(135deg, rgba(246,217,107,0.07) 0%, rgba(0,0,0,0) 60%), rgba(15,12,2,0.85)"
            : "rgba(10,9,2,0.6)",
        }}
      >
        {/* Gold left-border accent when open */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300"
          style={{
            background: isOpen
              ? "linear-gradient(to bottom, #f6d96b, #c9a200)"
              : "transparent",
          }}
        />

        {/* Question row with uniform height */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 sm:py-5 pl-8 min-h-[76px]">
          <div className="flex items-center gap-3 min-w-0">
            {/* Number badge */}
            <span
              className="shrink-0 font-bold tabular-nums transition-colors duration-300"
              style={{
                fontSize: "clamp(11px, 1vw, 13px)",
                color: isOpen ? "#f6d96b" : "rgba(246,217,107,0.35)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3
              className="font-semibold leading-snug transition-colors duration-300"
              style={{
                fontSize: "clamp(14px, 1.4vw, 18px)",
                color: isOpen ? "#ffffff" : "rgba(255,255,255,0.82)",
              }}
            >
              {faq.q}
            </h3>
          </div>

          {/* +/− icon */}
          <div
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300"
            style={{
              borderColor: isOpen ? "rgba(246,217,107,0.50)" : "rgba(255,255,255,0.15)",
              background: isOpen ? "rgba(246,217,107,0.12)" : "transparent",
              rotate: isOpen ? "45deg" : "0deg",
            }}
          >
            <svg
              className="w-4 h-4 transition-colors duration-300"
              style={{ color: isOpen ? "#f6d96b" : "rgba(255,255,255,0.5)" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </div>

        {/* Answer — animated expand */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p
                className="px-8 pb-5 leading-relaxed"
                style={{
                  fontSize: "clamp(13px, 1.2vw, 16px)",
                  color: "rgba(255,255,255,0.60)",
                  paddingLeft: "calc(2rem + 28px)", // align with question text
                }}
              >
                {faq.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Main FAQ Section Export
// ─────────────────────────────────────────────────────────────────
export default function FAQSection() {
  const [openId, setOpenId] = useState(1); // first open by default

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const col1 = FAQS.slice(0, 6);
  const col2 = FAQS.slice(6);

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-16 md:pt-24 pb-8 md:pb-12">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          {/* Overline pill */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[#f6d96b]/25 bg-[#f6d96b]/06">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#f6d96b] animate-pulse"
            />
            <span
              className="font-semibold uppercase tracking-[0.22em] text-[#f6d96b]"
              style={{ fontSize: "clamp(9px, 0.9vw, 11px)" }}
            >
              Got Questions?
            </span>
          </div>

          <h2
            className="font-bold text-white mx-auto leading-tight"
            style={{
              fontSize: "clamp(26px, 4vw, 56px)",
              maxWidth: "700px",
              letterSpacing: "-0.01em",
            }}
          >
            Frequently Asked{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #f6d96b 20%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Questions
            </span>
          </h2>
          <p
            className="mt-4 text-white/45 mx-auto leading-relaxed"
            style={{
              fontSize: "clamp(13px, 1.2vw, 17px)",
              maxWidth: "480px",
            }}
          >
            Everything you need to know before starting your journey at Third Eye Computer Classes.
          </p>
        </motion.div>

        {/* ── Two-column grid (single col on mobile) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {col1.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={i}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            {col2.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={i + 6}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <p className="text-white/40 mb-4" style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}>
            Still have questions? We&apos;re happy to help.
          </p>
          <a
            href="tel:+918058061222"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #f6d96b, #c9a200)",
              color: "#09090b",
              fontSize: "clamp(13px, 1.1vw, 15px)",
              boxShadow: "0 4px 24px rgba(246,217,107,0.25)",
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            Contact Us Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}

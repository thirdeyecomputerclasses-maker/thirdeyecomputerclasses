import React, { useState, useEffect, useRef } from "react";
import "./FranchiseHero.css";
import { Sparkles } from "lucide-react";
import mlChaudharyImg from "../../../assets/franchise/owner.png";

// Smooth count-up counter component triggered on viewport intersection
function AnimatedCounter({ end, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          let startTime = null;
          const animate = (time) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const PART1 = "START A ";
const HIGHLIGHT_TEXT = "THIRDEYE";
const PART2 = " FRANCHISE IN YOUR CITY";
const FULL_HEADLINE_LENGTH = PART1.length + HIGHLIGHT_TEXT.length + PART2.length;

const SUBTITLE_TEXT =
  "Join hands with Rajasthan’s leading IT skill development brand. Build a profitable, future-proof education business with 15+ branches and counting.. and complete 360° corporate support.";

export default function FranchiseHero({ onOpenInquiry }) {
  const [headlineCount, setHeadlineCount] = useState(0);
  const [subtitleCount, setSubtitleCount] = useState(0);
  const [isHeadlineDone, setIsHeadlineDone] = useState(false);
  const [isSubtitleDone, setIsSubtitleDone] = useState(false);

  // Character-by-character typewriter animation on visit
  useEffect(() => {
    let headlineTimer;

    const startHeadline = setTimeout(() => {
      headlineTimer = setInterval(() => {
        setHeadlineCount((prev) => {
          if (prev < FULL_HEADLINE_LENGTH) {
            return prev + 1;
          } else {
            clearInterval(headlineTimer);
            setIsHeadlineDone(true);
            return prev;
          }
        });
      }, 35);
    }, 180);

    return () => {
      clearTimeout(startHeadline);
      if (headlineTimer) clearInterval(headlineTimer);
    };
  }, []);

  // Subtitle streams character-by-character once headline finishes
  useEffect(() => {
    if (!isHeadlineDone) return;

    let subTimer;
    const startSubtitle = setTimeout(() => {
      subTimer = setInterval(() => {
        setSubtitleCount((prev) => {
          if (prev < SUBTITLE_TEXT.length) {
            return Math.min(prev + 1, SUBTITLE_TEXT.length);
          } else {
            clearInterval(subTimer);
            setIsSubtitleDone(true);
            return prev;
          }
        });
      }, 12);
    }, 120);

    return () => {
      clearTimeout(startSubtitle);
      if (subTimer) clearInterval(subTimer);
    };
  }, [isHeadlineDone]);

  // Segmented headline computations
  const renderedPart1 = PART1.slice(0, Math.min(headlineCount, PART1.length));

  const highlightCount = Math.max(0, headlineCount - PART1.length);
  const renderedHighlight =
    highlightCount > 0
      ? HIGHLIGHT_TEXT.slice(0, Math.min(highlightCount, HIGHLIGHT_TEXT.length))
      : "";

  const part2Count = Math.max(0, headlineCount - (PART1.length + HIGHLIGHT_TEXT.length));
  const renderedPart2 =
    part2Count > 0
      ? PART2.slice(0, Math.min(part2Count, PART2.length))
      : "";

  const renderedSubtitle = SUBTITLE_TEXT.slice(0, subtitleCount);

  // Quick skip handler on click
  const handleSkipTyping = () => {
    setHeadlineCount(FULL_HEADLINE_LENGTH);
    setSubtitleCount(SUBTITLE_TEXT.length);
    setIsHeadlineDone(true);
    setIsSubtitleDone(true);
  };

  return (
    <section className="franchise-hero-section">
      <div className="franchise-hero-container">
        {/* Top Badge */}
        <div className="hero-badge-wrap">
          <span className="hero-pill-badge">
            <Sparkles size={16} className="badge-icon" />
            PARTNER WITH RAJASTHAN'S #1 IT SKILL POWERHOUSE
          </span>
        </div>

        {/* Hero Main Header: Animated Written One-by-One */}
        <div 
          className="hero-header-block cursor-default"
          onClick={handleSkipTyping}
        >
          <h1 className="hero-main-title">
            {renderedPart1}
            {headlineCount < PART1.length && (
              <span className="typewriter-cursor" />
            )}

            {highlightCount > 0 && (
              <span className="title-highlight">
                {renderedHighlight}
                {headlineCount >= PART1.length &&
                  headlineCount < PART1.length + HIGHLIGHT_TEXT.length && (
                    <span className="typewriter-cursor highlight-cursor" />
                  )}
              </span>
            )}

            {renderedPart2}
            {headlineCount >= PART1.length + HIGHLIGHT_TEXT.length && !isHeadlineDone && (
              <span className="typewriter-cursor" />
            )}
          </h1>

          <p className="hero-lead-text">
            {renderedSubtitle}
            {isHeadlineDone && !isSubtitleDone && (
              <span className="typewriter-cursor sub-cursor" />
            )}
          </p>
        </div>

        {/* Unboxed Studio Editorial Showcase */}
        <div className="hero-studio-showcase">
          {/* Left Column: ACCREDITATION & SCALE (IMPACT) */}
          <div className="studio-col studio-col-impact">
            <div className="studio-index-tag">
              <span className="index-label">HONORS &amp; INSTITUTIONAL SCALE</span>
            </div>

            <h2 className="studio-display-title">
              IMPACT
            </h2>

            <p className="studio-tagline">
              Endorsed by leading universities &amp; national industry bodies.
            </p>

            {/* Unboxed Raw Typographic Metric Counters */}
            <div className="studio-stats-display">
              <div className="studio-stat-col">
                <div className="studio-stat-number text-[#f6d96b]">
                  <AnimatedCounter end={11500} suffix="+" />
                </div>
                <div className="studio-stat-label">Students Trained</div>
              </div>
              <div className="studio-stat-sep" />
              <div className="studio-stat-col">
                <div className="studio-stat-number text-[#f6d96b]">
                  <AnimatedCounter end={6700} suffix="+" />
                </div>
                <div className="studio-stat-label">Students Placed</div>
              </div>
              <div className="studio-stat-sep" />
              <div className="studio-stat-col">
                <div className="studio-stat-number text-[#f6d96b]">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="studio-stat-label">Active Branches</div>
              </div>
            </div>

            {/* University Citations (Minimalist Editorial Rows) */}
            <div className="studio-honors-list">
              <div className="studio-honor-item">
                <div className="honor-meta">
                  <span className="honor-index">01</span>
                  <span className="honor-authority">Poornima Global University</span>
                  <span className="honor-badge">Official Citation</span>
                </div>
                <h4 className="honor-title">
                  Awarded Best Tech Training Institute
                </h4>
              </div>

              <div className="studio-honor-item">
                <div className="honor-meta">
                  <span className="honor-index">02</span>
                  <span className="honor-authority">ICFAI Global University</span>
                  <span className="honor-badge">Excellence Award</span>
                </div>
                <h4 className="honor-title">
                  Awarded Best SAP Training Institute
                </h4>
              </div>
            </div>

            {/* Architectural Pull-Quote with Amber Beam */}
            <div className="studio-pullquote">
              <div className="quote-mark">“</div>
              <blockquote className="quote-body">
                Fastest growing tech training brand committed to high-impact career excellence and student transformation.
              </blockquote>
              <div className="quote-byline">
                — RAJASTHAN ACADEMIC EVALUATION COUNCIL
              </div>
            </div>
          </div>

          {/* Golden Center Divider */}
          <div className="studio-center-divider" />

          {/* Right Column: FOUNDER SHOWCASE */}
          <div className="studio-col studio-col-founder">
            <div className="founder-card-frame">
              {/* Founder Image Wrap */}
              <div className="founder-image-wrap">
                <img
                  src={mlChaudharyImg}
                  alt="Mr. M.L. Chaudhary - Founder"
                  className="founder-image"
                  loading="lazy"
                />
                <div className="founder-image-scrim" />

                {/* In photo: Name & Below written Founder */}
                <div className="founder-photo-overlay">
                  <h3 className="founder-name">Mr. M.L. Chaudhary</h3>
                  <p className="founder-designation">Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

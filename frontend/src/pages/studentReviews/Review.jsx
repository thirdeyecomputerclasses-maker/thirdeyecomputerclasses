import React, { memo, useRef, useCallback, useState, useEffect } from 'react';
import './Review.css';
import VideoCarousel from './components/VideoCarousel';
import ReviewTrail from './components/ReviewTrail';
import FoldText from './components/FoldText';
import StrokeText from './components/StrokeText';
import { VIDEO_TESTIMONIALS } from './studentReviewsData';
import { fetchMedia, getVideoInfo } from '../../services/mediaApi';

function Review() {
  const haloRef = useRef(null);
  const [videoTestimonials, setVideoTestimonials] = useState(VIDEO_TESTIMONIALS);

  useEffect(() => {
    fetchMedia({ page: "reviews", type: "video" })
      .then((data) => {
        if (!data || data.length === 0) return;
        setVideoTestimonials((prev) =>
          prev.map((item, idx) => {
            const slotKey = `reviews_video_${idx + 1}`;
            const foundSlot = data.find((s) => s.slotKey === slotKey);
            if (foundSlot?.url) {
              return {
                ...item,
                videoId: foundSlot.url.includes("v=")
                  ? foundSlot.url.split("v=")[1]?.split("&")[0]
                  : item.videoId,
                customUrl: foundSlot.url,
              };
            }
            return item;
          })
        );
      })
      .catch(() => {});
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!haloRef.current) return;
    const x = Math.round((e.clientX / window.innerWidth) * 100);
    const y = Math.round((e.clientY / window.innerHeight) * 100);
    haloRef.current.style.left = `${x}%`;
    haloRef.current.style.top = `${y}%`;
  }, []);

  const scrollToVideos = () => {
    const el = document.getElementById('video-testimonials-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="reviews-page" onMouseMove={handleMouseMove}>
      {/* Dynamic Ambient Background Effects */}
      <div className="reviews-ambient-fx" aria-hidden="true">
        {/* Interactive Mouse Spotlight Halo (Direct DOM transform without triggering React re-renders) */}
        <div
          ref={haloRef}
          className="reviews-spotlight-halo"
          style={{
            left: '50%',
            top: '30%'
          }}
        />

        {/* Floating Ambient Glowing Light Blobs */}
        <div className="reviews-glow-blob reviews-glow-blob-1" />
        <div className="reviews-glow-blob reviews-glow-blob-2" />
        <div className="reviews-glow-blob reviews-glow-blob-3" />

        {/* Floating Geometric Wireframe Tech Glyphs */}
        <span className="reviews-particle reviews-p1">+</span>
        <span className="reviews-particle reviews-p2">✦</span>
        <span className="reviews-particle reviews-p3">◆</span>
        <span className="reviews-particle reviews-p4">+</span>
        <span className="reviews-particle reviews-p5">✦</span>
        <span className="reviews-particle reviews-p6">◆</span>
      </div>
      
      <section className="reviews-section reviews-section-first">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        
          {/* Heading "HEAR FROM OUR STUDENTS" with React Bits FoldText */}
          <h1 className="reviews-hero-heading" aria-label="Hear From Our Students">
            <FoldText
              text="HEAR FROM OUR STUDENTS"
              splitBy="char"
              hinge="top"
              duration={0.7}
              stagger={0.035}
              trigger="mount"
              color="#000000"
              fontWeight={950}
              fontSize="inherit"
            />
          </h1>

          {/* Subtitle */}
          <p className="reviews-subtitle">
            Hear genuine experiences, career transformations, and unfiltered feedback directly from our students and alumni across Jaipur and beyond.
          </p>

          {/* Quick Metrics Bar */}
          <div className="reviews-stats-bar">
            <div className="reviews-stat-pill">
              <span className="reviews-stat-val">4.9 ★</span>
              <span>Google Verified Rating</span>
            </div>
            <div className="reviews-stat-pill">
              <span className="reviews-stat-val">15,000+</span>
              <span>Upskilled Alumni</span>
            </div>
            <div className="reviews-stat-pill">
              <span className="reviews-stat-val">100%</span>
              <span>Practical & Lab Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: Video Carousel from React Bits
          ======================================================== */}
      <section className="reviews-section">
        {/* React Bits 3D Video Carousel */}
        <VideoCarousel
          items={videoTestimonials}
          baseWidth={380}
          autoplay={false}
          loop={true}
        />
      </section>

      {/* ========================================================
          SECTION 3: Heading "FEEDBACK" & Moving Trail of Reviews
          ======================================================== */}
      <section className="reviews-section">
        <div className="max-w-6xl mx-auto px-4 mb-8">
        
          <h2 className="reviews-section-heading">
            FEEDBACK
          </h2>
        </div>

        {/* Continuous Moving Trail of Reviews */}
        <ReviewTrail />
      </section>

      {/* ========================================================
          SECTION 4: Reviews Stroke Text Section
          ======================================================== */}
      <section className="reviews-section reviews-stroke-section text-center">
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">

          <div className="reviews-stroke-wrapper my-4 w-full">
            <StrokeText
              text="REVIEWS"
              strokeColor="#000000"
              fillColor="#000000"
              strokeWidth={1.8}
              drawDuration={1.8}
              fillDelay={0.3}
              trigger="scroll"
              fillMode="wipe"
              fontSize={140}
              fontWeight={950}
              letterSpacing={-2}
              className="w-full"
            />
          </div>

          <p className="reviews-stroke-watermark mt-2">
            THIRDEYE
          </p>

          <p className="reviews-subtitle mt-6 max-w-2xl mx-auto">
            Every review, milestone, and student success story fuels our mission to deliver elite technical education and life-changing career opportunities.
          </p>
        </div>
      </section>
    </div>
  );
}

export default memo(Review);

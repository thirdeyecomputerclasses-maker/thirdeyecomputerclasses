import React, { useState, useRef, useEffect, useCallback } from "react";
import "./FranchiseInstagramReels.css";
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
} from "lucide-react";
import { fetchMedia, getVideoInfo } from "../../../services/mediaApi";

// Visual thumbnails
import classroomPanoramic from "../../../assets/classroom_panoramic.png";
import classroomSliceCenter from "../../../assets/classroom_slice_center.webp";
import classroomSliceLeft from "../../../assets/classroom_slice_left.webp";
import classroomSliceRight from "../../../assets/classroom_slice_right.webp";
import teamPhoto from "../../../assets/team_photo.webp";

const DEFAULT_REELS = [
  {
    id: "reel-1",
    thumbnail: "https://www.instagram.com/p/Dd3pHKrq_Ci/media/?size=l",
    videoUrl: "https://www.instagram.com/reel/Dd3pHKrq_Ci/?xtok=azY2d3p5Yzdnb2Zq",
  },
  {
    id: "reel-2",
    thumbnail: "https://www.instagram.com/p/Dbrx3zqiI7S/media/?size=l",
    videoUrl: "https://www.instagram.com/reel/Dbrx3zqiI7S/?rpxt=MW9jYnVxbDJyMmQyMg==",
  },
  {
    id: "reel-3",
    thumbnail: "https://www.instagram.com/p/DYo3rQbKnWs/media/?size=l",
    videoUrl: "https://www.instagram.com/reel/DYo3rQbKnWs/?vrfl=MTJueHJxNG0yNjFzeg==",
  },
  {
    id: "reel-4",
    thumbnail: "https://www.instagram.com/p/DbZkDS6j1l-/media/?size=l",
    videoUrl: "https://www.instagram.com/reel/DbZkDS6j1l-/?rpxt=MXJkN2hod3Y3eWpkZg==",
  },
  {
    id: "reel-5",
    thumbnail: "https://www.instagram.com/p/DdtkN9OKdAZ/media/?size=l",
    videoUrl: "https://www.instagram.com/reel/DdtkN9OKdAZ/?srtk=MTh1M2trYnVxeWFnag==",
  },
  {
    id: "reel-6",
    thumbnail: "https://www.instagram.com/p/DdoXYYxq7n5/media/?size=l",
    videoUrl: "https://www.instagram.com/reel/DdoXYYxq7n5/?dlrf=a2FycTFrOTRwZmFo",
  },
];

export default function FranchiseInstagramReels() {
  const [reels, setReels] = useState(DEFAULT_REELS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const videoRefs = useRef({});
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = reels.length;

  // Load dynamic videos from backend / ImageKit if available
  useEffect(() => {
    fetchMedia({ page: "franchise", type: "video" })
      .then((data) => {
        const customSlots = (data || []).filter((s) => s.slotKey?.startsWith("franchise_reel_") && !s.isDefault);
        if (customSlots.length > 0) {
          const sorted = [...customSlots].sort((a, b) => (a.slotKey || "").localeCompare(b.slotKey || ""));
          setReels(
            sorted.map((item, idx) => {
              const info = getVideoInfo(item.url);
              const thumb =
                info.type === "instagram" && info.thumbnailUrl
                  ? info.thumbnailUrl
                  : info.type === "youtube" && info.thumbnailUrl
                  ? info.thumbnailUrl
                  : item.thumbnailUrl && !item.thumbnailUrl.includes("instagram.com")
                  ? item.thumbnailUrl
                  : classroomPanoramic;

              return {
                id: item.slotKey || item._id || `dyn-reel-${idx}`,
                thumbnail: thumb,
                videoUrl: item.url,
              };
            })
          );
        }
      })
      .catch((err) => {
        console.warn("Could not load dynamic franchise reels, using defaults:", err);
      });
  }, []);

  // Window resize tracking
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Center video playback controller for native MP4 videos
  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      const vid = videoRefs.current[key];
      if (!vid) return;
      const idx = parseInt(key, 10);
      if (idx === currentIndex) {
        vid.muted = isMuted;
        vid.play().catch(() => {
          vid.muted = true;
          vid.play().catch(() => {});
        });
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, [currentIndex, isMuted]);

  // Touch Swipe for mobile gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <section className="franchise-reels-section">
      <div className="franchise-reels-container">
        {/* Section Header */}
        <div className="reels-header-wrap">
          <div className="reels-header-left">
            <div className="reels-badge">
              <svg className="reels-ig-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram Spotlight</span>
            </div>
            <h2 className="reels-title">
              Life At ThirdEye <span className="reels-title-highlight">In Action</span>
            </h2>
            <p className="reels-subtitle">
              Authentic clips from our active branches, labs, student sessions, and statewide network.
            </p>
          </div>

          <div className="reels-header-right">
            <a
              href="https://www.instagram.com/thirdeyecomputerclasses?vrfl=MTdieW1qYTdycHFxcw=="
              target="_blank"
              rel="noopener noreferrer"
              className="reels-follow-btn"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Follow @thirdeyeclasses</span>
            </a>

            <div className="reels-nav-arrows">
              <button
                type="button"
                className="reels-arrow-btn"
                onClick={prevSlide}
                aria-label="Previous video"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                className="reels-arrow-btn"
                onClick={nextSlide}
                aria-label="Next video"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* 5-Video Cover Flow Infinite Stage */}
        <div
          className="reels-stage-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="reels-stage-mask-left" />
          <div className="reels-stage-mask-right" />

          {reels.map((reel, idx) => {
            // Compute offset wrapped around [-total/2, total/2]
            let offset = (idx - currentIndex) % total;
            while (offset > total / 2) offset -= total;
            while (offset < -total / 2) offset += total;

            const isVisible = Math.abs(offset) <= 2;
            const isCenter = offset === 0;
            const videoInfo = getVideoInfo(reel.videoUrl);

            // Spacing based on screen width
            let spacing = 220;
            if (windowWidth <= 640) spacing = 85;
            else if (windowWidth <= 1024) spacing = 160;

            // Scale, opacity, rotation
            let scale = 1;
            let opacity = 1;
            let rotateY = 0;
            let zIndex = 10;
            let filter = "none";

            if (isCenter) {
              scale = windowWidth <= 640 ? 1.05 : 1.12;
              opacity = 1;
              rotateY = 0;
              zIndex = 20;
              filter = "none";
            } else if (Math.abs(offset) === 1) {
              scale = windowWidth <= 640 ? 0.88 : 0.92;
              opacity = 0.85;
              rotateY = offset > 0 ? -14 : 14;
              zIndex = 10;
              filter = "brightness(0.85) contrast(0.98)";
            } else if (Math.abs(offset) === 2) {
              scale = windowWidth <= 640 ? 0.75 : 0.8;
              opacity = windowWidth <= 640 ? 0.45 : 0.65;
              rotateY = offset > 0 ? -22 : 22;
              zIndex = 5;
              filter = "brightness(0.7) contrast(0.95)";
            } else {
              scale = 0.5;
              opacity = 0;
              zIndex = 0;
            }

            const cardStyle = {
              left: `calc(50% + ${offset * spacing}px)`,
              transform: `translate(-50%, -50%) scale(${scale}) rotateY(${rotateY}deg)`,
              opacity: isVisible ? opacity : 0,
              zIndex,
              filter,
              pointerEvents: isVisible ? "auto" : "none",
            };

            return (
              <div
                key={reel.id}
                className={`stage-video-card ${isCenter ? "is-center" : ""}`}
                style={cardStyle}
                onClick={() => {
                  if (!isCenter) {
                    setCurrentIndex(idx);
                  }
                }}
              >
                {/* Active Live Pulse Badge on Center Card */}
                {isCenter && <div className="stage-active-pulse-badge" />}

                {/* Render appropriate player depending on video source */}
                {videoInfo.type === "instagram" ? (
                  isVisible ? (
                    <div className="stage-ig-container">
                      <iframe
                        src={videoInfo.embedUrl}
                        title={`ThirdEye Reel ${idx + 1}`}
                        className="stage-ig-iframe"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                      {isCenter ? (
                        <a
                          href={videoInfo.directUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="stage-ig-open-btn"
                          title="Open Reel in Instagram"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Open on Instagram</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        /* Click interceptor for side cards so clicking anywhere brings it to center */
                        <div
                          className="stage-side-click-scrim"
                          title="Click to view this reel"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(idx);
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="stage-ig-card-preview">
                      <img
                        src={reel.thumbnail}
                        alt="Instagram Reel"
                        className="stage-video-element"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = classroomPanoramic;
                        }}
                      />
                      <div className="stage-ig-side-badge">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span>Instagram Reel</span>
                      </div>
                      <div className="stage-ig-play-indicator">
                        <Play size={20} className="fill-current ml-0.5" />
                      </div>
                      <div className="stage-video-scrim" />
                    </div>
                  )
                ) : videoInfo.type === "youtube" ? (
                  isVisible ? (
                    <div className="stage-ig-container">
                      <iframe
                        src={videoInfo.embedUrl}
                        title={`YouTube Video ${idx + 1}`}
                        className="stage-ig-iframe"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      {!isCenter && (
                        <div
                          className="stage-side-click-scrim"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentIndex(idx);
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="stage-ig-card-preview">
                      <img
                        src={reel.thumbnail || videoInfo.thumbnailUrl}
                        alt="YouTube Video"
                        className="stage-video-element"
                      />
                      <div className="stage-ig-side-badge">
                        <span>YouTube Video</span>
                      </div>
                      <div className="stage-ig-play-indicator">
                        <Play size={20} className="fill-current ml-0.5" />
                      </div>
                      <div className="stage-video-scrim" />
                    </div>
                  )
                ) : (
                  <>
                    <video
                      ref={(el) => (videoRefs.current[idx] = el)}
                      src={reel.videoUrl}
                      poster={reel.thumbnail && !/\.(mp4|webm|mov)$/i.test(reel.thumbnail) ? reel.thumbnail : classroomPanoramic}
                      loop
                      muted={isMuted}
                      playsInline
                      className="stage-video-element"
                    />
                    {!isCenter && <div className="stage-video-scrim" />}
                    {isCenter && (
                      <button
                        type="button"
                        className="stage-audio-toggle-btn"
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                        title={isMuted ? "Click to unmute" : "Click to mute"}
                      >
                        {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

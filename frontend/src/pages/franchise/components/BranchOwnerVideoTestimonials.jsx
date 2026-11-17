import React, { useState, useEffect, useCallback } from "react";
import "./BranchOwnerVideoTestimonials.css";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  ShieldCheck,
  Award,
  Sparkles,
  TrendingUp,
  Building2,
  Video,
} from "lucide-react";
import { fetchMedia, getVideoInfo, resolveMediaUrl } from "../../../services/mediaApi";

// Default Branch Owner portraits from assets
import defaultMayaImg from "../../../assets/franchise/partner_maya_sharma.png";
import defaultKapilImg from "../../../assets/franchise/partner_kapil_nitharwal.png";
import defaultRajImg from "../../../assets/franchise/partner_raj_gurjar.png";
import defaultKushalImg from "../../../assets/franchise/partner_kushal_avasthi.png";
import defaultVartikaImg from "../../../assets/franchise/partner_vartika_kumawat.png";
import defaultDiyaImg from "../../../assets/mentor_5.png";

const DEFAULT_BRANCH_VIDEOS = [
  {
    id: "branch-vid-1",
    slotKey: "franchise_branch_video_1",
    ownerName: "Maya Sharma",
    branchName: "Jagatpura Branch, Jaipur",
    role: "Center Director & Franchise Partner",
    badge: "250+ Students Enrolled",
    rating: 5,
    quote:
      "I, Maya Sharma, franchise owner of Thirdeye Computer Classes – Jagatpura Branch, am proud to share that our center is running with extraordinary momentum. With ThirdEye's job-aligned syllabus, advanced multimedia labs, and central corporate placements, our center has become the premier tech academy in Jagatpura.",
    videoUrl: "/assets/webreel.mp4",
    thumbnail: defaultMayaImg,
  },
  {
    id: "branch-vid-2",
    slotKey: "franchise_branch_video_2",
    ownerName: "Kapil Nitharwal",
    branchName: "Vaishali Nagar Branch, Jaipur",
    role: "Center Director & Franchise Partner",
    badge: "Top Performing Center 2024",
    rating: 5,
    quote:
      "Taking the ThirdEye franchise in Vaishali Nagar has been transformative. The central team provides complete operational playbooks, faculty training, and student hiring drives every month. Our batches are consistently fully booked.",
    videoUrl: "/assets/webreel.mp4",
    thumbnail: defaultKapilImg,
  },
  {
    id: "branch-vid-3",
    slotKey: "franchise_branch_video_3",
    ownerName: "Diya Saini",
    branchName: "Sodala Branch, Jaipur",
    role: "Center Director & Franchise Partner",
    badge: "180+ Placed Students",
    rating: 5,
    quote:
      "Proud to represent the ThirdEye network in Sodala. The blend of full-stack development, 3D visual design, and real client simulations gives our students unmatched market credibility, driving rapid center growth.",
    videoUrl: "/assets/webreel.mp4",
    thumbnail: defaultDiyaImg,
  },
  {
    id: "branch-vid-4",
    slotKey: "franchise_branch_video_4",
    ownerName: "Raj Gurjar",
    branchName: "Jhotwara Branch, Jaipur",
    role: "Center Director & Franchise Partner",
    badge: "Excellence in Tech Training",
    rating: 5,
    quote:
      "ThirdEye's technology infrastructure and continuous mentor workshops ensure that our Jhotwara branch delivers top-tier corporate training, making it the highest-rated computer institute in North Jaipur.",
    videoUrl: "/assets/webreel.mp4",
    thumbnail: defaultRajImg,
  },
  {
    id: "branch-vid-5",
    slotKey: "franchise_branch_video_5",
    ownerName: "Kushal Avasthi",
    branchName: "Gopalpura Branch, Jaipur",
    role: "Center Director & Franchise Partner",
    badge: "Fastest Growing Center",
    rating: 5,
    quote:
      "Located in the education hub of Gopalpura Bypass, ThirdEye's brand reputation and regular MNC hiring drives helped our branch break even within record months with exceptional student satisfaction.",
    videoUrl: "/assets/webreel.mp4",
    thumbnail: defaultKushalImg,
  },
  {
    id: "branch-vid-6",
    slotKey: "franchise_branch_video_6",
    ownerName: "Vartika Kumawat",
    branchName: "Mansarovar Branch, Jaipur",
    role: "Center Director & Franchise Partner",
    badge: "Flagship IT Academy",
    rating: 5,
    quote:
      "ThirdEye Mansarovar sets high industry standards with hands-on AI tools, design suites, and exceptional mentor guidance, producing job-ready creative engineers year after year.",
    videoUrl: "/assets/webreel.mp4",
    thumbnail: defaultVartikaImg,
  },
];

export default function BranchOwnerVideoTestimonials({ onOpenInquiry }) {
  const [videos, setVideos] = useState(DEFAULT_BRANCH_VIDEOS);
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const cardsPerPage = 3;

  // Load dynamic video testimonials from backend / ImageKit
  useEffect(() => {
    let isMounted = true;
    fetchMedia({ page: "franchise", type: "video" })
      .then((data) => {
        if (!isMounted || !data || data.length === 0) return;

        // Filter for branch testimonials slots or any custom added branch videos
        const branchSlots = data.filter(
          (item) =>
            item.section === "branch_testimonials" ||
            item.slotKey?.includes("branch_video") ||
            item.isCustom === true
        );

        if (branchSlots.length > 0) {
          // Merge custom backend items with defaults
          const merged = branchSlots.map((item, idx) => {
            const fallback = DEFAULT_BRANCH_VIDEOS[idx % DEFAULT_BRANCH_VIDEOS.length];
            return {
              id: item._id || item.slotKey || `dyn-branch-${idx}`,
              slotKey: item.slotKey,
              ownerName: item.ownerName || fallback.ownerName,
              branchName: item.branchName || fallback.branchName,
              role: "Center Director & Franchise Partner",
              badge: item.badge || fallback.badge,
              rating: item.rating || 5,
              quote: item.description || fallback.quote,
              videoUrl: resolveMediaUrl(item.url) || fallback.videoUrl,
              thumbnail:
                item.thumbnailUrl && !item.thumbnailUrl.includes("placeholder")
                  ? resolveMediaUrl(item.thumbnailUrl)
                  : fallback.thumbnail,
            };
          });

          setVideos(merged);
        }
      })
      .catch((err) => {
        console.warn("Could not load dynamic franchise branch videos, using defaults:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.ceil(videos.length / cardsPerPage);

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && activeModalVideo) {
        setActiveModalVideo(null);
      }
    },
    [activeModalVideo]
  );

  useEffect(() => {
    if (activeModalVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeModalVideo, handleKeyDown]);

  const visibleVideos = videos.slice(
    pageIndex * cardsPerPage,
    pageIndex * cardsPerPage + cardsPerPage
  );

  return (
    <section className="branch-videos-section" id="branch-testimonials">
      <div className="branch-videos-container">
        {/* Section Header */}
        <div className="branch-videos-header">
          <div className="branch-videos-header-left">
            <div className="branch-videos-badge">
              <span className="branch-videos-badge-dot" />
              <Video size={13} className="text-[#f9e209]" />
              <span>Branch Partner Spotlight • Real Stories</span>
            </div>
            <h2 className="branch-videos-title">
              Branch Owners{" "}
              <span className="branch-videos-title-highlight">Video Testimonials</span>
            </h2>
            <p className="branch-videos-subtitle">
              Hear firsthand from our thriving branch directors and franchise partners across
              Rajasthan on building profitable, student-first tech centers backed by ThirdEye's
              curriculum, brand equity, and 100% placement engine.
            </p>
          </div>

          <div className="branch-videos-header-right">
            {totalPages > 1 && (
              <div className="branch-videos-nav-arrows">
                <button
                  type="button"
                  className="branch-nav-btn"
                  onClick={handlePrev}
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="branch-nav-btn"
                  onClick={handleNext}
                  aria-label="Next testimonials"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges Ribbon */}
        <div className="branch-stats-ribbon">
          <div className="branch-stat-chip">
            <Building2 size={15} />
            <span>15+ Active Running Branches</span>
          </div>
          <div className="branch-stat-chip">
            <TrendingUp size={15} />
            <span>100% Curriculum &amp; Placement Engine</span>
          </div>
          <div className="branch-stat-chip">
            <Award size={15} />
            <span>Every 3rd Saturday Mega Placement Drives</span>
          </div>
          <div className="branch-stat-chip">
            <ShieldCheck size={15} />
            <span>Verified Franchise Center Directors</span>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="branch-videos-grid">
          {visibleVideos.map((item) => {
            const videoInfo = getVideoInfo(item.videoUrl);
            return (
              <div key={item.id} className="branch-video-card">
                {/* Video Poster with Play Overlay */}
                <div
                  className="branch-video-poster-box"
                  onClick={() => setActiveModalVideo(item)}
                  title={`Watch ${item.ownerName}'s Video Testimonial`}
                >
                  <img
                    src={item.thumbnail}
                    alt={`${item.ownerName} - ${item.branchName}`}
                    className="branch-video-poster-img"
                    onError={(e) => {
                      e.currentTarget.src = defaultMayaImg;
                    }}
                  />
                  <div className="branch-video-poster-overlay">
                    <button
                      type="button"
                      className="branch-play-button"
                      aria-label="Play video"
                    >
                      <Play size={24} fill="#000000" />
                    </button>
                  </div>

                  {/* Top Badges */}
                  <div className="branch-badge-top-left">
                    <Sparkles size={11} />
                    <span>{item.badge}</span>
                  </div>

                  <div className="branch-badge-top-right">
                    <span>
                      {videoInfo.type === "youtube"
                        ? "YouTube"
                        : videoInfo.type === "instagram"
                        ? "Instagram"
                        : "HD Video"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="branch-video-body">
                  <div className="branch-location-row">
                    <span className="branch-location-tag">
                      <MapPin size={13} />
                      {item.branchName}
                    </span>
                    <div className="branch-rating-stars">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={12} fill="#f9e209" />
                      ))}
                    </div>
                  </div>

                  <h3 className="branch-owner-name">{item.ownerName}</h3>
                  <div className="branch-owner-role">{item.role}</div>

                  <p className="branch-quote-text">"{item.quote}"</p>

                  <div className="branch-card-footer">
                    <button
                      type="button"
                      className="branch-watch-btn"
                      onClick={() => setActiveModalVideo(item)}
                    >
                      <span>Watch Story</span>
                      <Play size={13} fill="currentColor" />
                    </button>

                    <div className="branch-verified-pill">
                      <ShieldCheck size={13} />
                      <span>Verified Partner</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cinematic Video Modal */}
      {activeModalVideo && (
        <div
          className="branch-modal-overlay"
          onClick={() => setActiveModalVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="branch-modal-window"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="branch-modal-close-btn"
              onClick={() => setActiveModalVideo(null)}
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            {/* Video Player */}
            <div className="branch-modal-video-wrapper">
              {(() => {
                const info = getVideoInfo(activeModalVideo.videoUrl);
                if (info.type === "instagram") {
                  return (
                    <iframe
                      src={info.embedUrl}
                      title={`${activeModalVideo.ownerName} Reel`}
                      className="branch-modal-iframe"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }
                if (info.type === "youtube") {
                  return (
                    <iframe
                      src={`${info.embedUrl}?autoplay=1&rel=0`}
                      title={`${activeModalVideo.ownerName} YouTube`}
                      className="branch-modal-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <video
                    src={resolveMediaUrl(activeModalVideo.videoUrl)}
                    controls
                    autoPlay
                    playsInline
                    className="branch-modal-native-video"
                  />
                );
              })()}
            </div>

            {/* Modal Bottom Info Bar */}
            <div className="branch-modal-info-bar">
              <div className="branch-modal-info-left">
                <h4 className="branch-modal-owner-name">
                  {activeModalVideo.ownerName}
                </h4>
                <div className="branch-modal-branch-sub">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {activeModalVideo.branchName}
                  </span>
                  <span>•</span>
                  <span>{activeModalVideo.badge}</span>
                </div>
                <p className="branch-modal-quote">"{activeModalVideo.quote}"</p>
              </div>

              {onOpenInquiry && (
                <button
                  type="button"
                  className="branch-modal-cta-btn"
                  onClick={() => {
                    setActiveModalVideo(null);
                    onOpenInquiry();
                  }}
                >
                  <span>Apply For Franchise</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


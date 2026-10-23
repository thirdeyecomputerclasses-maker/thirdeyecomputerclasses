import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  UploadCloud,
  RotateCcw,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Eye,
  Link2,
  X,
  ShieldCheck,
  CheckCircle2,
  Crown,
  Lock,
} from "lucide-react";
import {
  fetchMedia,
  replaceSlotFile,
  replaceSlotUrl,
  resetSlotToDefault,
} from "../../services/mediaApi";
import { getStoredSession } from "../../services/authApi";
import "./UploadMediaPage.css";

// EXACT 5 SUPPORTED PAGES:
// 1. About Us
// 2. Franchise
// 3. Jobs and Placement
// 4. Campus Memories
// 5. Student Reviews
const SUPPORTED_PAGES = [
  {
    id: "about",
    label: "About Us",
    path: "/about",
    icon: "ℹ️",
    desc: "Team Photo (1 photo) & Brand Showcase Reel (1 video)",
  },
  {
    id: "franchise",
    label: "Franchise",
    path: "/franchise",
    icon: "🏢",
    desc: "Founder (1 photo), 10 Branches (10 photos) & 6 Instagram Reels (6 videos)",
  },
  {
    id: "placements",
    label: "Jobs and Placement",
    path: "/jobs-placement",
    icon: "💼",
    desc: "Wall of Fame (12 photos) & Celebrations (6 photos) — Photos only",
  },
  {
    id: "memories",
    label: "Campus Memories",
    path: "/sweet-memories",
    icon: "📸",
    desc: "Hero Backdrop & 7 Event Moments (8 photos) — Photos only",
  },
  {
    id: "reviews",
    label: "Student Reviews",
    path: "/reviews",
    icon: "⭐",
    desc: "6 Video Testimonials (Video-only Section)",
  },
];

export default function UploadMediaPage({ embedded = false }) {
  // Session check for direct / standalone route access
  const session = getStoredSession();
  const isGlobalAdmin = session?.role === "global_admin";

  // Step 1: Media Type ('image' or 'video')
  const [mediaType, setMediaType] = useState("image");

  // Step 2: Page selection ('about', 'franchise', 'placements', 'memories', 'reviews')
  const [selectedPage, setSelectedPage] = useState("about");

  // State
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  // Active slot being replaced in modal
  const [activeSlot, setActiveSlot] = useState(null);
  const [replaceMode, setReplaceMode] = useState("file"); // 'file' or 'url'
  const [replacementFile, setReplacementFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [replacementUrl, setReplacementUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [modalError, setModalError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  // Load all section slots
  const loadSlots = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMedia({ page: "all", type: "all" });
      const slotMap = new Map();
      (data || []).forEach((item) => {
        const existing = slotMap.get(item.slotKey);
        if (!existing || (!item.isDefault && existing.isDefault)) {
          slotMap.set(item.slotKey, item);
        }
      });
      setSlots(Array.from(slotMap.values()));
    } catch (err) {
      console.error("Error loading section slots:", err);
      setError(err.message || "Failed to load section slots from server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  // Handle file preview cleanup
  useEffect(() => {
    if (!replacementFile) {
      setFilePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(replacementFile);
    setFilePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [replacementFile]);

  // Open replace modal for a specific section slot
  const handleOpenReplace = (slot) => {
    setActiveSlot(slot);
    setReplacementFile(null);
    setFilePreview(null);
    setReplacementUrl(slot.isDefault ? "" : slot.url);
    setReplaceMode("file");
    setUploadProgress(0);
    setModalError(null);
  };

  const handleCloseReplace = () => {
    if (uploading) return;
    setActiveSlot(null);
    setReplacementFile(null);
    setFilePreview(null);
    setModalError(null);
  };

  // Validate selected file
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    if (!activeSlot) return;
    const isImage = file.type?.startsWith("image/");
    const isVideo = file.type?.startsWith("video/");

    if (activeSlot.type === "image" && !isImage) {
      setModalError("Please select a photo file (.png, .jpg, .webp).");
      return;
    }
    if (activeSlot.type === "video" && !isVideo) {
      setModalError("Please select a video file (.mp4, .webm).");
      return;
    }

    setReplacementFile(file);
    setModalError(null);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  // Submit slot replacement
  const handleSubmitReplacement = async (e) => {
    e.preventDefault();
    if (!activeSlot) return;

    setUploading(true);
    setUploadProgress(0);
    setModalError(null);

    try {
      let updatedSlot;
      if (replaceMode === "file") {
        if (!replacementFile) {
          throw new Error("Please select a replacement photo or video file.");
        }
        updatedSlot = await replaceSlotFile({
          slotKey: activeSlot.slotKey,
          file: replacementFile,
          onProgress: (percent) => setUploadProgress(percent),
        });
      } else {
        if (!replacementUrl.trim()) {
          throw new Error("Please enter a valid photo or video URL.");
        }
        updatedSlot = await replaceSlotUrl({
          slotKey: activeSlot.slotKey,
          url: replacementUrl.trim(),
        });
      }

      // Update state locally & refresh
      if (updatedSlot) {
        setSlots((prev) => {
          const map = new Map(prev.map((s) => [s.slotKey, s]));
          map.set(activeSlot.slotKey, updatedSlot);
          return Array.from(map.values());
        });
      }
      setActionMessage({
        type: "success",
        text: `Successfully replaced photo for "${activeSlot.title}"!`,
      });
      setTimeout(() => setActionMessage(null), 4000);
      handleCloseReplace();
    } catch (err) {
      console.error("Replacement error:", err);
      setModalError(err.message || "Failed to replace section photo.");
    } finally {
      setUploading(false);
    }
  };

  // Reset slot to original default asset
  const handleResetSlot = async (slot) => {
    const confirmed = window.confirm(
      `Revert "${slot.title}" back to its original default photo? Any custom ImageKit upload will be cleared.`
    );
    if (!confirmed) return;

    try {
      const resetSlot = await resetSlotToDefault(slot.slotKey);
      setSlots((prev) =>
        prev.map((s) => (s.slotKey === slot.slotKey ? resetSlot : s))
      );
      setActionMessage({
        type: "info",
        text: `Reverted "${slot.title}" to original default photo.`,
      });
      setTimeout(() => setActionMessage(null), 3500);
    } catch (err) {
      alert(`Failed to reset slot: ${err.message}`);
    }
  };

  // Copy link
  const handleCopyLink = (slotKey, url) => {
    navigator.clipboard.writeText(url);
    setCopiedKey(slotKey);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Filter slots for active page and type
  const activeSlots = slots.filter((item) => {
    const matchesPage = item.page === selectedPage;
    const matchesType = item.type === mediaType;
    const matchesSearch =
      !searchQuery ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.section?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPage && matchesType && matchesSearch;
  });

  const getPageSlotCount = (pageId, type) => {
    return slots.filter((s) => s.page === pageId && s.type === type).length;
  };

  const selectedPageObj =
    SUPPORTED_PAGES.find((p) => p.id === selectedPage) || SUPPORTED_PAGES[0];

  // If directly visited via URL (/upload-images) and not authenticated as global_admin
  if (!embedded && !isGlobalAdmin) {
    return (
      <div className="upload-media-page restricted-access-page">
        <div className="media-bg-glow media-glow-top" />
        <div className="restricted-access-card">
          <div className="restricted-icon-wrap">
            <Lock size={36} />
          </div>
          <div className="restricted-badge">
            <Crown size={14} />
            <span>Master Global Admin Clearance Required</span>
          </div>
          <h1 className="restricted-title">Admin Access Only</h1>
          <p className="restricted-desc">
            Website photo & video management is restricted strictly to <strong>Global Admins</strong>.
            Please sign into the Admin Console with Global Admin credentials to manage website media.
          </p>
          <div className="restricted-actions">
            <Link to="/admin" className="restricted-btn-primary">
              <ShieldCheck size={18} />
              <span>Sign In to Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`upload-media-page ${embedded ? "embedded" : ""}`}>
      {/* Ambient Background Glows (standalone only) */}
      {!embedded && (
        <>
          <div className="media-bg-glow media-glow-top" />
          <div className="media-bg-glow media-glow-bottom" />
        </>
      )}

      <div className="media-container">
        {/* Header Section */}
        {embedded ? (
          <div className="embedded-media-strip">
            <div className="media-lock-notice">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>
                <strong>Section Integrity Protected:</strong> You can only replace photos and videos in existing website sections across the 5 supported pages.
              </span>
            </div>
            <div className="media-status-bar">
              <div className="status-pill">
                <span className="status-dot status-dot-active" />
                <span>CDN: ik.imagekit.io/l9o8hinjo</span>
              </div>
              <div className="status-pill">
                <span>Supported Pages: 5</span>
              </div>
              <button
                type="button"
                onClick={loadSlots}
                className="refresh-btn"
                title="Refresh Slots List"
              >
                <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                <span>Sync</span>
              </button>
            </div>
          </div>
        ) : (
          <header className="media-header">
            <div className="media-top-nav-bar">
              <Link to="/admin" className="media-back-admin-btn">
                ← Return to Admin Console
              </Link>
            </div>
            <div className="media-badge">
              <Sparkles size={14} className="text-yellow-400" />
              <span>Third Eye Website Media Manager • ImageKit CDN</span>
            </div>

            <h1 className="media-title">
              Section <span className="media-title-gold">Media Dashboard</span>
            </h1>

            <p className="media-subtitle">
              Update existing section photos and videos across supported pages.
              Changes are saved to ImageKit CDN and immediately reflected on the website.
            </p>

            {/* Strict Section Control Pill */}
            <div className="media-lock-notice">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>
                <strong>Section Integrity Protected:</strong> You can only replace photos in existing website sections (no random photo uploads).
              </span>
            </div>

            <div className="media-status-bar">
              <div className="status-pill">
                <span className="status-dot status-dot-active" />
                <span>CDN: ik.imagekit.io/l9o8hinjo</span>
              </div>
              <div className="status-pill">
                <span>Supported Pages: 5</span>
              </div>
              <button
                type="button"
                onClick={loadSlots}
                className="refresh-btn"
                title="Refresh Slots List"
              >
                <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                <span>Sync</span>
              </button>
            </div>
          </header>
        )}

        {/* Global Action Feedback Message */}
        {actionMessage && (
          <div className={`action-toast toast-${actionMessage.type}`}>
            <CheckCircle2 size={18} />
            <span>{actionMessage.text}</span>
          </div>
        )}

        {/* STEP 1: Two Options - Change a Photo OR Change a Video */}
        <section className="step-section">
          <div className="step-label-row">
            <span className="step-badge">Step 1</span>
            <h2 className="step-heading">Select Media Type to Change</h2>
          </div>

          <div className="media-type-grid">
            {/* Option 1: Change Section Photos */}
            <button
              type="button"
              className={`type-card ${mediaType === "image" ? "is-active" : ""}`}
              onClick={() => setMediaType("image")}
            >
              <div className="type-card-indicator" />
              <div className="type-card-icon-wrap image-theme">
                <ImageIcon size={32} />
              </div>
              <div className="type-card-content">
                <div className="type-card-title-row">
                  <h3 className="type-card-title">Change Section Photos</h3>
                  <span className="type-count-badge">
                    {slots.filter((m) => m.type === "image").length} Photo Sections
                  </span>
                </div>
                <p className="type-card-desc">
                  Update portraits, classroom labs, placed student wall of fame,
                  and campus memory cards.
                </p>
                <div className="type-card-formats">
                  <span>PNG</span>
                  <span>JPG</span>
                  <span>WEBP</span>
                  <span>Direct ImageKit Upload</span>
                </div>
              </div>
            </button>

            {/* Option 2: Change Section Videos */}
            <button
              type="button"
              className={`type-card ${mediaType === "video" ? "is-active" : ""}`}
              onClick={() => setMediaType("video")}
            >
              <div className="type-card-indicator" />
              <div className="type-card-icon-wrap video-theme">
                <VideoIcon size={32} />
              </div>
              <div className="type-card-content">
                <div className="type-card-title-row">
                  <h3 className="type-card-title">Change Section Videos</h3>
                  <span className="type-count-badge">
                    {slots.filter((m) => m.type === "video").length} Video Sections
                  </span>
                </div>
                <p className="type-card-desc">
                  Update brand showcase reels, Instagram cover-flow reels,
                  placement proof, and video reviews.
                </p>
                <div className="type-card-formats">
                  <span>MP4</span>
                  <span>WEBM</span>
                  <span>YouTube</span>
                  <span>Max 100MB</span>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* STEP 2: The 5 Supported Pages Only */}
        <section className="step-section">
          <div className="step-label-row">
            <span className="step-badge">Step 2</span>
            <h2 className="step-heading">
              Select Page ({SUPPORTED_PAGES.length} Supported Pages)
            </h2>
          </div>

          <div className="pages-selector-grid">
            {SUPPORTED_PAGES.map((page, idx) => {
              const count = getPageSlotCount(page.id, mediaType);
              const isSelected = selectedPage === page.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  className={`page-pill-card ${isSelected ? "is-selected" : ""}`}
                  onClick={() => setSelectedPage(page.id)}
                >
                  <div className="page-pill-header">
                    <span className="page-num-badge">#{idx + 1}</span>
                    <span className="page-icon">{page.icon}</span>
                  </div>
                  <div className="page-info">
                    <span className="page-name">{page.label}</span>
                    <span className="page-desc-mini">{page.desc}</span>
                    <span className="page-meta">
                      {page.id === "reviews" && mediaType === "image"
                        ? "Video-only section (6 videos)"
                        : (page.id === "placements" || page.id === "memories") && mediaType === "video"
                        ? "Photo-only section (0 videos)"
                        : `${count} existing ${mediaType === "image" ? "photos" : "videos"}`}
                    </span>
                  </div>
                  {isSelected && <div className="selected-check">✓ Active</div>}
                </button>
              );
            })}
          </div>
        </section>

        {/* STEP 3: Existing Section Slots for Selected Page */}
        <section className="dashboard-section">
          <div className="dashboard-header-bar">
            <div className="dashboard-title-wrap">
              <div className="dashboard-tag">
                <span>{selectedPageObj.icon}</span>
                <span>{selectedPageObj.label}</span>
              </div>
              <h2 className="dashboard-heading">
                Existing {mediaType === "image" ? "Photo" : "Video"} Sections on {selectedPageObj.label}
              </h2>
              <p className="dashboard-subtext">
                Below are all the active photo/video slots for <strong>{selectedPageObj.label}</strong>. Click <strong>Change Photo</strong> on any card to upload a new asset to ImageKit for that exact section.
              </p>
            </div>

            <div className="dashboard-actions">
              <a
                href={selectedPageObj.path}
                target="_blank"
                rel="noopener noreferrer"
                className="view-live-page-btn"
                title={`Open live ${selectedPageObj.label} in new tab`}
              >
                <Eye size={15} />
                <span>View Live {selectedPageObj.label}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="media-filter-bar">
            <input
              type="text"
              placeholder={`Filter section slots by name or description...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="media-search-input"
            />
            <div className="filter-stats">
              Available Sections: <strong>{activeSlots.length}</strong>
            </div>
          </div>

          {/* Slots Grid */}
          {loading ? (
            <div className="media-loading-state">
              <RefreshCw size={24} className="animate-spin text-yellow-400" />
              <p>Loading sections from database & ImageKit...</p>
            </div>
          ) : activeSlots.length === 0 ? (
            selectedPage === "reviews" && mediaType === "image" ? (
              <div className="media-empty-state">
                <div className="empty-icon-wrap" style={{ background: "rgba(255, 211, 0, 0.12)", color: "#ffd300" }}>
                  <VideoIcon size={36} />
                </div>
                <h3 className="empty-title">
                  Student Reviews Features Video Testimonials Only
                </h3>
                <p className="empty-desc" style={{ maxWidth: "560px", margin: "8px auto 0" }}>
                  The Student Reviews page is exclusively video-based, showcasing 6 authentic student video reviews. There are no photo sections on this page.
                </p>
                <button
                  type="button"
                  onClick={() => setMediaType("video")}
                  className="switch-to-videos-action-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#ffd300",
                    color: "#09090b",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "11px 24px",
                    borderRadius: "999px",
                    marginTop: "20px",
                    cursor: "pointer",
                    border: "none",
                    boxShadow: "0 6px 20px rgba(255, 211, 0, 0.35)",
                    transition: "all 0.25s ease",
                  }}
                >
                  <VideoIcon size={16} />
                  <span>Switch to Change Section Videos (6 Reviews)</span>
                </button>
              </div>
            ) : (selectedPage === "placements" || selectedPage === "memories") && mediaType === "video" ? (
              <div className="media-empty-state">
                <div className="empty-icon-wrap" style={{ background: "rgba(255, 211, 0, 0.12)", color: "#ffd300" }}>
                  <ImageIcon size={36} />
                </div>
                <h3 className="empty-title">
                  {selectedPageObj.label} Features Photos Only
                </h3>
                <p className="empty-desc" style={{ maxWidth: "560px", margin: "8px auto 0" }}>
                  There are no video sections on {selectedPageObj.label}. Switch to Change Section Photos to manage its photo slots.
                </p>
                <button
                  type="button"
                  onClick={() => setMediaType("image")}
                  className="switch-to-videos-action-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#ffd300",
                    color: "#09090b",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "11px 24px",
                    borderRadius: "999px",
                    marginTop: "20px",
                    cursor: "pointer",
                    border: "none",
                    boxShadow: "0 6px 20px rgba(255, 211, 0, 0.35)",
                    transition: "all 0.25s ease",
                  }}
                >
                  <ImageIcon size={16} />
                  <span>Switch to Change Section Photos</span>
                </button>
              </div>
            ) : (
              <div className="media-empty-state">
                <div className="empty-icon-wrap">
                  <AlertCircle size={36} />
                </div>
                <h3 className="empty-title">
                  No {mediaType === "image" ? "photo" : "video"} sections found matching your query
                </h3>
                <p className="empty-desc">
                  Try clearing your search query to see all available sections for {selectedPageObj.label}.
                </p>
              </div>
            )
          ) : (
            <div className="slots-cards-grid">
              {activeSlots.map((slot) => {
                const isCopied = copiedKey === slot.slotKey;
                const isCustom = !slot.isDefault;

                return (
                  <div
                    key={slot.slotKey || slot._id}
                    className={`slot-card ${isCustom ? "is-custom-updated" : ""}`}
                  >
                    {/* Media Preview Box */}
                    <div className="slot-preview-wrapper">
                      {slot.type === "video" ? (
                        slot.url.includes("youtube.com") || slot.url.includes("youtu.be") ? (
                          <div className="yt-embed-preview">
                            <img
                              src={slot.thumbnailUrl}
                              alt={slot.title}
                              className="slot-card-img"
                            />
                            <div className="yt-play-pill">YouTube Video</div>
                          </div>
                        ) : (
                          <video
                            src={slot.url}
                            poster={slot.thumbnailUrl}
                            controls
                            playsInline
                            preload="metadata"
                            className="slot-card-video"
                          />
                        )
                      ) : (
                        <img
                          src={slot.url}
                          alt={slot.title}
                          loading="lazy"
                          className="slot-card-img"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/600x400/181A20/EAB308?text=Image+Unavailable";
                          }}
                        />
                      )}

                      {/* Section Name Tag */}
                      <div className="slot-section-badge">
                        Section: {slot.section}
                      </div>

                      {/* Status Badge */}
                      <div className={`slot-status-badge ${isCustom ? "status-custom" : "status-default"}`}>
                        {isCustom ? "★ ImageKit Custom" : "Original Asset"}
                      </div>
                    </div>

                    {/* Slot Info & Content */}
                    <div className="slot-card-body">
                      <h4 className="slot-card-title">{slot.title}</h4>
                      <p className="slot-card-desc">{slot.description}</p>

                      <div className="slot-key-row">
                        <span className="slot-key-label">Slot:</span>
                        <code className="slot-key-code">{slot.slotKey}</code>
                      </div>

                      {/* Action buttons */}
                      <div className="slot-card-actions">
                        <button
                          type="button"
                          className="slot-replace-btn"
                          onClick={() => handleOpenReplace(slot)}
                        >
                          <UploadCloud size={15} />
                          <span>Change {slot.type === "image" ? "Photo" : "Video"}</span>
                        </button>

                        {isCustom && (
                          <button
                            type="button"
                            className="slot-reset-btn"
                            onClick={() => handleResetSlot(slot)}
                            title="Revert back to original default"
                          >
                            <RotateCcw size={14} />
                            <span>Reset</span>
                          </button>
                        )}

                        <button
                          type="button"
                          className="slot-copy-btn"
                          onClick={() => handleCopyLink(slot.slotKey, slot.url)}
                          title="Copy direct CDN / Media URL"
                        >
                          {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </button>

                        <a
                          href={slot.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="slot-open-btn"
                          title="Open original resolution in new tab"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* ==========================================================================
          MODAL: Replace Section Photo/Video via ImageKit
          ========================================================================== */}
      {activeSlot && (
        <div className="modal-backdrop" onClick={handleCloseReplace}>
          <div className="replace-modal-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-badge">
                  <span>ImageKit Uploader</span>
                  <span>•</span>
                  <span>{selectedPageObj.label}</span>
                </div>
                <h3 className="modal-title">
                  Change {activeSlot.type === "image" ? "Photo" : "Video"} for Section
                </h3>
                <p className="modal-subtitle">
                  Replacing: <strong>{activeSlot.title}</strong>
                </p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseReplace}
                disabled={uploading}
              >
                <X size={18} />
              </button>
            </div>

            {/* Mode Toggle: File to ImageKit vs Direct Link */}
            <div className="modal-mode-tabs">
              <button
                type="button"
                className={`tab-btn ${replaceMode === "file" ? "is-active" : ""}`}
                onClick={() => setReplaceMode("file")}
              >
                <UploadCloud size={14} />
                <span>Upload to ImageKit CDN</span>
              </button>
              <button
                type="button"
                className={`tab-btn ${replaceMode === "url" ? "is-active" : ""}`}
                onClick={() => setReplaceMode("url")}
              >
                <Link2 size={14} />
                <span>Direct URL / Reel Link</span>
              </button>
            </div>

            {/* Error in modal */}
            {modalError && (
              <div className="modal-error-alert">
                <AlertCircle size={16} />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitReplacement} className="modal-form">
              {replaceMode === "file" ? (
                /* Drag & Drop File Zone */
                <div
                  className={`modal-dropzone ${isDragOver ? "is-dragover" : ""} ${
                    replacementFile ? "has-file" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={activeSlot.type === "image" ? "image/*" : "video/*"}
                    onChange={handleFileChange}
                    className="hidden-file-input"
                  />

                  {replacementFile ? (
                    <div className="modal-selected-file">
                      {activeSlot.type === "image" ? (
                        <img
                          src={filePreview}
                          alt="New preview"
                          className="modal-file-thumbnail"
                        />
                      ) : (
                        <video
                          src={filePreview}
                          controls
                          className="modal-file-thumbnail"
                        />
                      )}
                      <div className="modal-file-meta">
                        <span className="file-name">{replacementFile.name}</span>
                        <span className="file-size">
                          {(replacementFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                        <span className="change-hint">Click or drop to choose different file</span>
                      </div>
                    </div>
                  ) : (
                    <div className="modal-drop-placeholder">
                      <div className="drop-icon-wrap">
                        {activeSlot.type === "image" ? (
                          <ImageIcon size={30} className="text-yellow-400" />
                        ) : (
                          <VideoIcon size={30} className="text-yellow-400" />
                        )}
                      </div>
                      <h4 className="drop-title">
                        Drag & Drop new {activeSlot.type === "image" ? "photo" : "video"}
                      </h4>
                      <p className="drop-desc">
                        Or click to browse from your device (Auto uploads to ImageKit)
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Direct URL Input */
                <div className="modal-url-input-wrap">
                  <label className="url-label">
                    Direct {activeSlot.type === "image" ? "Image" : "Video"} Link:
                  </label>
                  <input
                    type="url"
                    required
                    placeholder={
                      activeSlot.type === "image"
                        ? "https://ik.imagekit.io/.../image.jpg"
                        : "https://.../video.mp4 or YouTube / Reel URL"
                    }
                    value={replacementUrl}
                    onChange={(e) => setReplacementUrl(e.target.value)}
                    className="modal-text-input"
                  />
                </div>
              )}

              {/* Upload Progress */}
              {uploading && (
                <div className="modal-progress-wrap">
                  <div className="progress-text">
                    <span>Uploading to ImageKit CDN...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={handleCloseReplace}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    uploading ||
                    (replaceMode === "file" && !replacementFile) ||
                    (replaceMode === "url" && !replacementUrl)
                  }
                  className="modal-submit-btn"
                >
                  {uploading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Saving ({uploadProgress}%)...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud size={16} />
                      <span>Save & Update Section Photo</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

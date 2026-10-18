import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Compass,
  MapPin,
  ChevronRight,
  Navigation,
  Sparkles,
  X,
} from "lucide-react";
import "./FloatingBranchWidget.css";

export default function FloatingBranchWidget() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Pathnames where the widget should be hidden
  const isHiddenPage =
    location.pathname === "/nearest-branch" ||
    location.pathname === "/branch-finder" ||
    location.pathname === "/branches" ||
    location.pathname.startsWith("/admin");

  // Show after a subtle delay (800ms) or on scroll to ensure smooth page load
  useEffect(() => {
    if (isHiddenPage || isDismissed) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [isHiddenPage, isDismissed, location.pathname]);

  if (isHiddenPage || isDismissed || !isVisible) {
    return null;
  }

  const handleWidgetClick = (e) => {
    // If not clicking the dismiss button, navigate
    navigate("/nearest-branch");
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  return (
    <div
      className="floating-branch-widget"
      onClick={handleWidgetClick}
      role="button"
      tabIndex={0}
      aria-label="Find Nearest Third Eye Branch with Live Map Route"
      title="Click to find your nearest Third Eye campus in Jaipur"
    >
      {/* Outer ambient glow pulse */}
      <div className="floating-glow-pulse" />

      {/* Radar beacon icon */}
      <div className="floating-icon-wrap">
        <Compass size={19} className="floating-compass-icon" />
        <span className="floating-beacon-dot" />
      </div>

      {/* Text contents */}
      <div className="floating-text-block">
        <div className="floating-top-row">
          <span className="floating-label">Nearest Branch</span>
          <span className="floating-badge">10+ CAMPUSES</span>
        </div>
        <span className="floating-sub">Find by Area PIN / GPS Route &gt;&gt;</span>
      </div>

      {/* Action Arrow (user specifically requested '>>') */}
      <div className="floating-arrow-group">
        <span className="floating-arrow-double">&gt;&gt;</span>
      </div>

      {/* Close button to dismiss for current session */}
      <button
        type="button"
        className="floating-dismiss-btn"
        onClick={handleDismiss}
        aria-label="Dismiss branch finder widget"
        title="Hide"
      >
        <X size={13} />
      </button>
    </div>
  );
}

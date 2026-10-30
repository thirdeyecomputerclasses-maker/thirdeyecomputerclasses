import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Search,
  Navigation,
  Compass,
  PhoneCall,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Building2,
  Car,
  ChevronRight,
  ShieldCheck,
  Star,
  Layers,
  ArrowRight,
  X,
  MessageCircle,
  Bus,
  Train,
  Check,
  GraduationCap,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import {
  BRANCHES_DATA,
  JAIPUR_PINCODES_MAP,
  MAJOR_EXTERNAL_CITIES,
  searchNearestBranches,
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
} from "../../data/branchesData";
import { useEnquiry } from "../../context/EnquiryContext";
import "./NearestBranchFinder.css";

const POPULAR_LOCALITY_CHIPS = [
  { label: "Sanganer (HQ)", query: "Sanganer" },
  { label: "Mansarovar", query: "Mansarovar" },
  { label: "Jagatpura", query: "Jagatpura" },
  { label: "Pratap Nagar", query: "Pratap Nagar" },
  { label: "Vaishali Nagar", query: "Vaishali Nagar" },
  { label: "Gopalpura", query: "Gopalpura" },
  { label: "Sodala", query: "Sodala" },
  { label: "Jhotwara", query: "Jhotwara" },
  { label: "Vidhyadhar Nagar", query: "Vidhyadhar Nagar" },
  { label: "Raja Park", query: "Raja Park" },
];

const BRANCH_FINDER_FAQS = [
  // ── 1. Path Finder & Route Navigation ──
  {
    id: "faq-pf-1",
    category: "pathfinder",
    categoryLabel: "Path Finder & Route",
    question: "How does the Nearest Branch Finder locate my closest ThirdEye campus?",
    answer: "You can enter your 6-digit Jaipur area PIN code (e.g. 302020, 302017, 302033), type your locality name (Mansarovar, Jagatpura, Sanganer, Pratap Nagar, etc.), or simply click 'Use My Location'. Our geospatial algorithm calculates exact road distances and estimated travel times to all 15+ ThirdEye centers across Jaipur, highlighting the optimal campus and driving route for you."
  },
  {
    id: "faq-pf-2",
    category: "pathfinder",
    categoryLabel: "Path Finder & Route",
    question: "Can I choose to enroll at any ThirdEye branch, or am I restricted to the nearest one?",
    answer: "You have complete freedom to enroll at whichever ThirdEye branch best fits your daily commute, college schedule, or metro convenience. All 15+ Jaipur campuses follow identical ISO 9001:2015 certified teaching protocols, high-spec workstation labs, and centralized syllabus tracking."
  },
  {
    id: "faq-pf-3",
    category: "pathfinder",
    categoryLabel: "Path Finder & Route",
    question: "Can I switch branches or change my batch timings if I relocate within Jaipur?",
    answer: "Yes! We offer a zero-friction cross-campus transfer facility. If you change your residence, hostel, or college location within Jaipur, you can transfer your ongoing batch to your new nearest ThirdEye branch with zero transfer fees and 100% syllabus continuity."
  },
  {
    id: "faq-pf-4",
    category: "pathfinder",
    categoryLabel: "Path Finder & Route",
    question: "How do I reach the campus using public transport like Jaipur Metro, Low-Floor buses, or E-Rickshaws?",
    answer: "Every branch listed above includes a 'Transit' guide. Campuses like Mansarovar, Sodala, and Gopalpura are within minutes of the Jaipur Metro line, while Sanganer (HQ), Pratap Nagar, Jagatpura, and Vaishali Nagar have continuous connectivity via Low-Floor City Bus routes and E-Rickshaws. Click 'Start Navigation' on any branch card to launch live Google Maps directions."
  },
  {
    id: "faq-pf-5",
    category: "pathfinder",
    categoryLabel: "Path Finder & Route",
    question: "Are all specialized courses and computer labs available at every branch?",
    answer: "Yes, all our flagship professional programs — including 2D & 3D Animation, Full-Stack Web Development, Graphic Design, Video Editing, Tally Prime with GST, Python, and RS-CIT — are equipped with dedicated lab setups across all Jaipur campuses. Centralized workshops, masterclasses, and placement drives are organized across the network."
  },

  // ── 2. General Enquiry & Campus Visits ──
  {
    id: "faq-gen-1",
    category: "general",
    categoryLabel: "General Enquiry",
    question: "What are the campus visiting hours and helpline timings?",
    answer: "All ThirdEye Computer Classes campuses are open Monday to Saturday from 8:00 AM to 8:00 PM for in-person visits, lab walkthroughs, and course counseling. You can also reach our centralized helpline at +91 805 806 1222 during these hours."
  },
  {
    id: "faq-gen-2",
    category: "general",
    categoryLabel: "General Enquiry",
    question: "Do I need to book an appointment before visiting for counseling or demo classes?",
    answer: "Walk-ins are always warmly welcomed! However, booking in advance via our quick online enquiry form or calling +91 805 806 1222 ensures an assigned senior counselor is ready to give you a personalized career roadmap and reserves a hands-on workstation terminal for your 2-day free demo classes."
  },
  {
    id: "faq-gen-3",
    category: "general",
    categoryLabel: "General Enquiry",
    question: "Does ThirdEye assist outstation students with nearby PG / hostel accommodations?",
    answer: "Yes! For students joining us from other towns or states, our administration team assists in finding verified, safe, and clean boy's and girl's PGs and hostels within 200m–500m of our major campuses (Pratap Nagar, Mansarovar, Jagatpura, and Sanganer), complete with mess and Wi-Fi facilities."
  },
  {
    id: "faq-gen-4",
    category: "general",
    categoryLabel: "General Enquiry",
    question: "What payment options are available for course admission fees?",
    answer: "You can pay your admission fees in person at any branch reception via Cash, UPI, or Debit/Credit Card. Alternatively, you can use our secure online Pay Now portal with UPI QR, NetBanking, cards, and zero-cost monthly EMI options."
  },
  {
    id: "faq-gen-5",
    category: "general",
    categoryLabel: "General Enquiry",
    question: "Is vehicle parking available for students at the branches?",
    answer: "Yes, every ThirdEye campus provides dedicated, secure two-wheeler and four-wheeler parking spaces monitored 24/7 with CCTV cameras and security personnel, allowing students to attend classes and practice labs comfortably."
  }
];

export default function NearestBranchFinder() {
  const { openEnquiry } = useEnquiry();
  const [searchInput, setSearchInput] = useState("");
  const [userCoords, setUserCoords] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedBranchId, setSelectedBranchId] = useState(BRANCHES_DATA[0].id);
  const [mapMode, setMapMode] = useState("route"); // "route" | "spot"

  // FAQ interactive state
  const [activeFaqCategory, setActiveFaqCategory] = useState("all");
  const [openFaqId, setOpenFaqId] = useState("faq-pf-1");

  // Filtered FAQs based on selected category pill
  const filteredFaqs = useMemo(() => {
    if (activeFaqCategory === "all") return BRANCH_FINDER_FAQS;
    return BRANCH_FINDER_FAQS.filter((f) => f.category === activeFaqCategory);
  }, [activeFaqCategory]);

  // Search results calculation
  const searchResult = useMemo(() => {
    return searchNearestBranches(searchInput, userCoords);
  }, [searchInput, userCoords]);

  // Selected branch object
  const activeBranch = useMemo(() => {
    const found = searchResult.branches.find((b) => b.id === selectedBranchId);
    return found || searchResult.nearestBranch || BRANCHES_DATA[0];
  }, [selectedBranchId, searchResult]);

  // If search updates and nearest branch changes, auto-select nearest
  useEffect(() => {
    if (searchResult.nearestBranch && searchResult.queryType !== "all") {
      setSelectedBranchId(searchResult.nearestBranch.id);
    }
  }, [searchResult.nearestBranch, searchResult.queryType]);

  // Filter branches by zone if tab active
  const displayedBranches = useMemo(() => {
    if (selectedZone === "all") return searchResult.branches;
    return searchResult.branches.filter((b) =>
      b.zone.toLowerCase().includes(selectedZone.toLowerCase())
    );
  }, [searchResult.branches, selectedZone]);

  // Handle browser GPS geolocation
  const handleDetectGPSLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setSearchInput("");
      },
      (err) => {
        setIsLocating(false);
        let msg = "Could not fetch GPS location.";
        if (err.code === 1) msg = "Location permission was denied by user.";
        else if (err.code === 2) msg = "Location position unavailable.";
        else if (err.code === 3) msg = "Location request timed out.";
        setLocationError(msg);
        setTimeout(() => setLocationError(""), 5000);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // If browser already granted geolocation permission, automatically fetch live coordinates on mount
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((result) => {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                setUserCoords({
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                });
              },
              () => {},
              { timeout: 8000, enableHighAccuracy: true }
            );
          }
        })
        .catch(() => {});
    }
  }, []);

  // Quick chip click
  const handleSelectChip = (query) => {
    setUserCoords(null);
    setSearchInput(query);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchInput("");
    setUserCoords(null);
    setLocationError("");
  };

  // Start turn-by-turn navigation from live user location to target branch
  const handleStartNavigation = (branch = activeBranch) => {
    // 1. If we already have exact GPS coordinates, launch immediately
    if (userCoords && userCoords.lat && userCoords.lng) {
      window.open(
        getGoogleMapsDirectionsUrl(userCoords, branch),
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    // 2. If user entered a manual locality/pincode search, navigate from that location
    if (searchInput && searchInput.trim()) {
      window.open(
        getGoogleMapsDirectionsUrl(searchInput.trim(), branch),
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    // 3. Otherwise, fetch live device GPS location so it routes from exact current spot
    if (navigator.geolocation) {
      setIsLocating(true);
      const navWindow = window.open("", "_blank");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserCoords(coords);
          if (navWindow) {
            navWindow.location.href = getGoogleMapsDirectionsUrl(coords, branch);
          }
        },
        () => {
          setIsLocating(false);
          // Fallback to Google Maps directions with automatic current location
          if (navWindow) {
            navWindow.location.href = getGoogleMapsDirectionsUrl(null, branch);
          }
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      window.open(
        getGoogleMapsDirectionsUrl(null, branch),
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  // Google Maps embed URL
  const embedUrl = useMemo(() => {
    if (mapMode === "route" && (searchInput || userCoords)) {
      return getGoogleMapsEmbedUrl(
        activeBranch,
        searchInput || (userCoords ? `${userCoords.lat},${userCoords.lng}` : "")
      );
    }
    return getGoogleMapsEmbedUrl(activeBranch, "");
  }, [activeBranch, searchInput, userCoords, mapMode]);

  // Google Maps direct directions URL
  const googleMapsDirectionsUrl = useMemo(() => {
    return getGoogleMapsDirectionsUrl(
      userCoords || searchInput,
      activeBranch
    );
  }, [activeBranch, searchInput, userCoords]);

  return (
    <div className="branch-finder-page">
      {/* Background Ambience */}
      <div className="finder-ambient-glow glow-top" />
      <div className="finder-ambient-glow glow-bottom" />
      <div className="finder-grid-overlay" />

      <div className="branch-finder-container">
        {/* ========================================================= */}
        {/* HERO SECTION                                             */}
        {/* ========================================================= */}
        <header className="finder-hero">
          <div className="finder-top-badge">
            <Compass size={14} className="badge-compass-icon" />
            <span>JAIPUR REGIONAL CAMPUS RADAR</span>
          </div>

          <h1 className="finder-title">
            FIND YOUR <span className="title-gold-accent">NEAREST BRANCH</span>
          </h1>

          <p className="finder-subtitle">
            Enter your 6-digit PIN code or Jaipur locality to instantly discover your closest
            ThirdEye tech campus with live driving distance, travel time, and route directions.
          </p>

          {/* Search Box Card */}
          <div className="finder-search-wrapper">
            <div className="finder-search-box">
              <Search size={22} className="finder-search-icon" />
              <input
                type="text"
                className="finder-search-input"
                value={searchInput}
                onChange={(e) => {
                  setUserCoords(null);
                  setSearchInput(e.target.value);
                }}
                placeholder="Enter area PIN code (e.g. 302020) or Locality (e.g. Mansarovar, Jagatpura, Sanganer)..."
                aria-label="Search by PIN code or locality"
              />

              {searchInput && (
                <button
                  type="button"
                  className="finder-clear-btn"
                  onClick={handleClearSearch}
                  title="Clear search"
                >
                  <X size={18} />
                </button>
              )}

              <button
                type="button"
                className={`finder-gps-btn ${isLocating ? "locating" : ""}`}
                onClick={handleDetectGPSLocation}
                title="Detect my current location via GPS"
              >
                <Navigation size={17} className={isLocating ? "spin" : ""} />
                <span>{isLocating ? "Locating..." : "Use My Location"}</span>
              </button>
            </div>

            {locationError && (
              <div className="finder-error-alert">
                <AlertCircle size={15} />
                <span>{locationError}</span>
              </div>
            )}

            {/* Quick Locality Chips */}
            <div className="finder-chips-row">
              <span className="chips-label">Popular Localities:</span>
              <div className="chips-list">
                {POPULAR_LOCALITY_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`finder-chip ${
                      searchInput.toLowerCase() === chip.query.toLowerCase()
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSelectChip(chip.query)}
                  >
                    <MapPin size={12} />
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* OUTSIDE JAIPUR STUDENT NOTICE BANNER                      */}
        {/* ========================================================= */}
        {searchResult.isOutsideJaipur && searchResult.outsideInfo && (
          <div className="finder-outside-banner">
            <div className="outside-banner-icon-wrap">
              <Building2 size={28} className="text-[#f6d96b]" />
            </div>
            <div className="outside-banner-content">
              <div className="outside-banner-header">
                <h3>Searching from Outside Municipal Jaipur ({searchResult.outsideInfo.detectedPlace})?</h3>
                <span className="outside-distance-pill">
                  📍 Distance to Jaipur: {searchResult.outsideInfo.distanceToJaipur}
                </span>
              </div>
              <p className="outside-banner-text">
                All of ThirdEye's state-of-the-art offline campuses are headquartered in Jaipur, Rajasthan.
                We provide <strong>verified student hostel / PG accommodations</strong> right next to our Sanganer Flagship campus,
                fast-track weekend bootcamps, and <strong>Live Interactive Online Classes</strong>!
              </p>
              <div className="outside-banner-actions">
                <a
                  href={`https://wa.me/918058061222?text=Hello%20Third%20Eye,%20I%20am%20from%20${encodeURIComponent(
                    searchResult.outsideInfo.detectedPlace
                  )}%20and%20interested%20in%20courses%20or%20hostel%20facilities.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outside-btn-wa"
                >
                  <MessageCircle size={16} />
                  <span>Ask About Student Hostels / Online Batches</span>
                </a>
                <button
                  type="button"
                  className="outside-btn-view"
                  onClick={() => setSelectedBranchId("sanganer-hq")}
                >
                  <span>View Flagship Campus Route (Sanganer)</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* RESULTS BAR & ZONE FILTER TABS                            */}
        {/* ========================================================= */}
        <div className="finder-results-bar">
          <div className="finder-results-summary">
            <span className="summary-pin-icon">
              <MapPin size={18} />
            </span>
            <div>
              <span className="summary-title">
                Showing results for: <strong>{searchResult.userLocationName}</strong>
              </span>
              <span className="summary-count">
                {displayedBranches.length} ThirdEye Centers found across Jaipur
              </span>
            </div>
          </div>

          <div className="finder-zone-tabs">
            {["all", "South", "East", "West", "North", "Central"].map((z) => (
              <button
                key={z}
                type="button"
                className={`zone-tab-btn ${selectedZone === z ? "active" : ""}`}
                onClick={() => setSelectedZone(z)}
              >
                {z === "all" ? "All Zones" : `${z} Jaipur`}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN SPLIT VIEW: BRANCHES LIST (LEFT) + INTERACTIVE MAP (RIGHT) */}
        {/* ========================================================= */}
        <div className="finder-main-split">
          {/* LEFT: BRANCHES RANKED CARDS */}
          <div className="finder-branches-list">
            {displayedBranches.map((branch, idx) => {
              const isSelected = branch.id === activeBranch.id;
              const isNearest = idx === 0 && branch.distanceKm !== null;

              return (
                <div
                  key={branch.id}
                  className={`finder-branch-card ${isSelected ? "is-selected" : ""} ${
                    isNearest ? "is-nearest" : ""
                  }`}
                  onClick={() => setSelectedBranchId(branch.id)}
                >
                  {/* Card Header Strip */}
                  <div className="branch-card-header">
                    <div className="branch-badge-group">
                      {isNearest && (
                        <span className="badge-nearest">
                          <Sparkles size={12} /> NEAREST CAMPUS
                        </span>
                      )}
                      {branch.isHeadOffice && (
                        <span className="badge-hq">
                          <Building2 size={12} /> FLAGSHIP HEAD OFFICE
                        </span>
                      )}
                      <span className="badge-zone">{branch.zone}</span>
                    </div>

                    {branch.distanceKm !== null && (
                      <div className="branch-distance-chip" title="Calculated driving distance">
                        <Car size={14} />
                        <strong>{branch.distanceKm} KM</strong>
                        <span className="distance-dot">•</span>
                        <span>{branch.travelTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Branch Title & Landmark */}
                  <h3 className="branch-card-name">{branch.name}</h3>

                  <div className="branch-landmark-row">
                    <MapPin size={15} className="landmark-icon" />
                    <span>{branch.landmark}</span>
                  </div>

                  <p className="branch-address-text">{branch.address}</p>

                  {/* Highlights / Facilities Chips */}
                  <div className="branch-facilities-chips">
                    {branch.facilities.slice(0, 3).map((f, fIdx) => (
                      <span key={fIdx} className="facility-pill">
                        <Check size={11} /> {f}
                      </span>
                    ))}
                    {branch.facilities.length > 3 && (
                      <span className="facility-more">
                        +{branch.facilities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Popular Courses */}
                  <div className="branch-courses-row">
                    <span className="courses-lead">Key Programs:</span>
                    <span className="courses-list">
                      {branch.popularCourses.slice(0, 3).join(" • ")}
                    </span>
                  </div>

                  {/* Rating & Hours Bar */}
                  <div className="branch-meta-bar">
                    <div className="branch-rating">
                      <Star size={14} className="star-filled" />
                      <strong>{branch.rating}</strong>
                      <span className="review-count">({branch.reviewCount} reviews)</span>
                    </div>

                    <div className="branch-hours">
                      <Clock size={13} />
                      <span>{branch.hours}</span>
                    </div>
                  </div>

                  {/* Card Action Row */}
                  <div className="branch-card-actions">
                    <button
                      type="button"
                      className={`btn-select-route ${isSelected ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBranchId(branch.id);
                      }}
                    >
                      <MapPin size={15} />
                      <span>{isSelected ? "Active on Map" : "View Route on Map"}</span>
                    </button>

                    <a
                      href={getGoogleMapsDirectionsUrl(
                        userCoords || searchInput,
                        branch
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-open-gmaps"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleStartNavigation(branch);
                      }}
                      title="Open turn-by-turn route from your location in Google Maps"
                    >
                      <Navigation size={14} />
                      <span>Directions</span>
                      <ExternalLink size={12} />
                    </a>

                    <button
                      type="button"
                      className="btn-enquire-branch"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEnquiry({
                          preferredBranch: branch.shortName || branch.name,
                          learningMode: "classroom",
                          sourcePage: `Nearest Branch Finder - ${branch.shortName}`,
                        });
                      }}
                      title="Direct admission enquiry for this campus"
                    >
                      <GraduationCap size={14} />
                      <span>Enquire</span>
                    </button>

                    <a
                      href={`tel:${branch.phone.replace(/[^0-9+]/g, "")}`}
                      className="btn-call-desk"
                      onClick={(e) => e.stopPropagation()}
                      title="Call this branch desk"
                    >
                      <PhoneCall size={14} />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/${branch.whatsapp}?text=Hello%20Third%20Eye%20${encodeURIComponent(
                        branch.shortName
                      )},%20I%20am%20looking%20for%20course%20information%20and%20a%20center%20visit.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wa-branch"
                      onClick={(e) => e.stopPropagation()}
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle size={14} />
                      <span>Chat</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: INTERACTIVE MAP & ROUTE CONSOLE */}
          <div className="finder-map-pane">
            <div className="finder-map-sticky-card">
              {/* Map Header */}
              <div className="map-header">
                <div>
                  <span className="map-header-label">ACTIVE CAMPUS PREVIEW</span>
                  <h4 className="map-branch-title">{activeBranch.name}</h4>
                </div>

                <div className="map-view-toggle">
                  <button
                    type="button"
                    className={`map-toggle-btn ${mapMode === "route" ? "active" : ""}`}
                    onClick={() => setMapMode("route")}
                  >
                    Route
                  </button>
                  <button
                    type="button"
                    className={`map-toggle-btn ${mapMode === "spot" ? "active" : ""}`}
                    onClick={() => setMapMode("spot")}
                  >
                    Spot
                  </button>
                </div>
              </div>

              {/* Live Google Maps Iframe */}
              <div className="map-iframe-container">
                <iframe
                  title={`Google Maps Route to ${activeBranch.name}`}
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Route Summary Box */}
              <div className="map-route-summary">
                <div className="route-endpoints-row">
                  <div className="endpoint-item origin">
                    <div className="endpoint-icon origin-icon">
                      <div className="origin-dot" />
                    </div>
                    <div className="endpoint-text">
                      <span className="endpoint-label">From:</span>
                      <strong className="endpoint-val truncate">
                        {searchResult.userLocationName}
                      </strong>
                    </div>
                  </div>

                  <div className="endpoint-arrow">
                    <ChevronRight size={18} />
                  </div>

                  <div className="endpoint-item dest">
                    <div className="endpoint-icon dest-icon">
                      <MapPin size={14} />
                    </div>
                    <div className="endpoint-text">
                      <span className="endpoint-label">Destination:</span>
                      <strong className="endpoint-val truncate">
                        {activeBranch.shortName}
                      </strong>
                    </div>
                  </div>
                </div>

                {activeBranch.distanceKm !== null && (
                  <div className="route-metrics-bar">
                    <div className="metric-box">
                      <span className="metric-title">Road Distance</span>
                      <span className="metric-number">
                        {activeBranch.distanceKm} <small>KM</small>
                      </span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-title">Driving Time</span>
                      <span className="metric-number">{activeBranch.travelTime}</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-title">Postal PIN</span>
                      <span className="metric-number">{activeBranch.pincode}</span>
                    </div>
                  </div>
                )}

                <div className="route-address-box">
                  <MapPin size={16} className="text-[#f6d96b] flex-shrink-0 mt-0.5" />
                  <p className="route-address-text">{activeBranch.address}</p>
                </div>

                {/* Big Google Maps CTA */}
                <div className="map-action-buttons-group">
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-start-nav-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleStartNavigation(activeBranch);
                    }}
                    title="Start turn-by-turn navigation from your current location"
                  >
                    <Navigation size={17} />
                    <span>Start Navigation</span>
                    <ExternalLink size={15} />
                  </a>

                  <button
                    type="button"
                    className="map-enquire-btn"
                    onClick={() =>
                      openEnquiry({
                        preferredBranch: activeBranch.shortName || activeBranch.name,
                        learningMode: "classroom",
                        sourcePage: `Nearest Branch Finder - ${activeBranch.shortName}`,
                      })
                    }
                  >
                    <GraduationCap size={17} />
                    <span>Enquire for Admission</span>
                  </button>
                </div>

                {/* Direct verified Google Maps listing link */}
                <div className="map-direct-pin-wrap">
                  <a
                    href={activeBranch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-direct-pin-link"
                    title="View verified campus listing, photos & student reviews on Google Maps"
                  >
                    <MapPin size={13} />
                    <span>View verified pin on Google Maps</span>
                    <ExternalLink size={11} />
                  </a>
                </div>

                {/* Metro & Transit Info */}
                <div className="map-transit-hint">
                  <Train size={14} />
                  <span>
                    Directly reachable via Jaipur City Bus routes, E-Rickshaws & Metro connectivity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STUDENT AMENITIES & VISIT PREPARATION FAQ                 */}
        {/* ========================================================= */}
        <section className="finder-amenities-section">
          <div className="amenities-header">
            <h2 className="amenities-title">Visiting Any ThirdEye Campus</h2>
            <p className="amenities-desc">
              All our Jaipur centers follow standardized infrastructure protocols and modern laboratory environments.
            </p>
          </div>

          <div className="amenities-grid">
            <div className="amenity-card">
              <div className="amenity-icon-wrap">
                <GraduationCap size={22} />
              </div>
              <h4>Free Walk-in Counseling</h4>
              <p>
                Walk in anytime between 8 AM and 8 PM for free 1-on-1 counseling with senior industry mentors and batch schedule planning.
              </p>
            </div>

            <div className="amenity-card">
              <div className="amenity-icon-wrap">
                <Building2 size={22} />
              </div>
              <h4>Outstation Student Hostels</h4>
              <p>
                Coming from outside Jaipur? We partner with verified boy's and girl's hostels & PGs located within 200m of our campus.
              </p>
            </div>

            <div className="amenity-card">
              <div className="amenity-icon-wrap">
                <Car size={22} />
              </div>
              <h4>Free Student Parking</h4>
              <p>
                Spacious, dedicated two-wheeler and four-wheeler parking spaces with 24/7 CCTV security surveillance across all branches.
              </p>
            </div>

            <div className="amenity-card">
              <div className="amenity-icon-wrap">
                <ShieldCheck size={22} />
              </div>
              <h4>Trial Demo Classes</h4>
              <p>
                Attend 2 days of live hands-on classroom lab trials before making your admission decision. Zero commitments required.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PATH FINDER & GENERAL ENQUIRY FAQ SECTION                 */}
        {/* ========================================================= */}
        <section className="finder-faq-section" id="branch-faqs">
          <div className="finder-faq-container">
            <div className="finder-faq-header">
              <div className="finder-faq-badge">
                <HelpCircle size={14} className="text-[#f6d96b]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="finder-faq-title">
                Path Finder &amp; <span className="text-[#f6d96b]">General Enquiries</span>
              </h2>
              <p className="finder-faq-subtitle">
                Clear answers to common questions about finding your nearest campus, visiting our labs, 
                batch scheduling, and course admissions.
              </p>

              {/* Category Filter Pills */}
              <div className="faq-category-pills">
                <button
                  type="button"
                  className={`faq-cat-pill ${activeFaqCategory === "all" ? "active" : ""}`}
                  onClick={() => setActiveFaqCategory("all")}
                >
                  <span>All Questions</span>
                  <span className="faq-pill-count">{BRANCH_FINDER_FAQS.length}</span>
                </button>
                <button
                  type="button"
                  className={`faq-cat-pill ${activeFaqCategory === "pathfinder" ? "active" : ""}`}
                  onClick={() => setActiveFaqCategory("pathfinder")}
                >
                  <Compass size={14} />
                  <span>Path Finder &amp; Routes</span>
                  <span className="faq-pill-count">
                    {BRANCH_FINDER_FAQS.filter((f) => f.category === "pathfinder").length}
                  </span>
                </button>
                <button
                  type="button"
                  className={`faq-cat-pill ${activeFaqCategory === "general" ? "active" : ""}`}
                  onClick={() => setActiveFaqCategory("general")}
                >
                  <HelpCircle size={14} />
                  <span>General Enquiry &amp; Visits</span>
                  <span className="faq-pill-count">
                    {BRANCH_FINDER_FAQS.filter((f) => f.category === "general").length}
                  </span>
                </button>
              </div>
            </div>

            {/* FAQ Accordion List */}
            <div className="faq-accordion-list">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`faq-item-card ${isOpen ? "is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-q-left">
                        <span className="faq-q-badge">{faq.categoryLabel}</span>
                        <h3 className="faq-q-text">{faq.question}</h3>
                      </div>
                      <div className="faq-chevron-wrap">
                        <ChevronDown
                          size={18}
                          className={`faq-chevron-icon ${isOpen ? "is-rotated" : ""}`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="faq-answer-pane">
                        <p className="faq-answer-text">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Counselor Helpline Banner */}
            <div className="faq-helpline-box">
              <div className="faq-helpline-content">
                <div className="faq-helpline-icon">
                  <PhoneCall size={24} />
                </div>
                <div>
                  <h4 className="faq-helpline-title">Still have questions about finding your campus?</h4>
                  <p className="faq-helpline-sub">
                    Speak directly with our senior admission counselors. Available Mon–Sat, 8:00 AM – 8:00 PM.
                  </p>
                </div>
              </div>
              <div className="faq-helpline-actions">
                <a
                  href="tel:+918058061222"
                  className="faq-call-btn"
                >
                  <PhoneCall size={15} />
                  <span>+91 805 806 1222</span>
                </a>
                <button
                  type="button"
                  className="faq-enquire-btn"
                  onClick={() =>
                    openEnquiry({
                      learningMode: "classroom",
                      sourcePage: "Nearest Branch Finder - FAQ Section",
                    })
                  }
                >
                  <GraduationCap size={16} />
                  <span>Ask a Counselor</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

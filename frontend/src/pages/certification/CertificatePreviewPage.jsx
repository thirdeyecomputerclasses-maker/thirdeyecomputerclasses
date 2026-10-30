import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Download,
  Printer,
  Sparkles,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Calendar,
  BookOpen,
  User,
  Hash,
  Eye,
  ShieldCheck,
  Maximize2,
  X,
  Share2,
} from "lucide-react";
import certTemplateImage from "../../assets/ThirdEyeCertificate_template.png";
import "./CertificatePreviewPage.css";

const POPULAR_COURSES = [
  "Basic Computers (MS Office, Internet & Typing)",
  "Python Full Stack Web Development",
  "Graphic Design & Digital Art (Photoshop, Illustrator, CorelDraw)",
  "Digital Marketing & SEO Mastery",
  "Tally Prime with GST & Accounting",
  "2D & 3D Animation & VFX",
  "AutoCAD & 3D Matrix Design",
  "Data Analytics & Python with AI",
  "Advance Diploma in Computer Science (ADCS)",
  "RSCIT (Rajasthan State Certificate in IT)",
  "Cyber Security & Ethical Hacking",
];

const PRESET_PROFILES = [
  {
    name: "Rahul Sharma",
    course: "Python Full Stack Web Development",
    fromDate: "01-01-2026",
    toDate: "30-06-2026",
    certNo: "TECC248901",
    issueDate: "05-07-2026",
  },
  {
    name: "Priya Verma",
    course: "Tally Prime with GST & Accounting",
    fromDate: "15-02-2026",
    toDate: "15-05-2026",
    certNo: "TECC249124",
    issueDate: "20-05-2026",
  },
  {
    name: "Aman Gupta",
    course: "Graphic Design & Digital Art (Photoshop, Illustrator, CorelDraw)",
    fromDate: "10-10-2025",
    toDate: "10-04-2026",
    certNo: "TECC247562",
    issueDate: "15-04-2026",
  },
  {
    name: "Sneha Patel",
    course: "Basic Computers (MS Office, Internet & Typing)",
    fromDate: "03-01-2026",
    toDate: "06-03-2026",
    certNo: "TECC231779",
    issueDate: "10-03-2026",
  },
];

export default function CertificatePreviewPage() {
  const [studentName, setStudentName] = useState("Rahul Sharma");
  const [courseName, setCourseName] = useState("Python Full Stack Web Development");
  const [isCustomCourse, setIsCustomCourse] = useState(false);
  const [customCourseName, setCustomCourseName] = useState("");
  const [fromDate, setFromDate] = useState("01-01-2026");
  const [toDate, setToDate] = useState("30-06-2026");
  const [certNo, setCertNo] = useState("TECC248901");
  const [issueDate, setIssueDate] = useState(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  });
  const [showWatermark, setShowWatermark] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const canvasRef = useRef(null);
  const templateImgRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Load template image once
  useEffect(() => {
    document.title = "Student Certificate Preview | ThirdEye Computer Classes";
    window.scrollTo({ top: 0, behavior: "instant" });

    const img = new Image();
    img.src = certTemplateImage;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      templateImgRef.current = img;
      setIsImageLoaded(true);
    };
  }, []);

  // Effective course title
  const effectiveCourse = isCustomCourse ? customCourseName || "Professional Training" : courseName;

  // Draw certificate on canvas whenever parameters change
  const renderCertificate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !templateImgRef.current) return;

    const ctx = canvas.getContext("2d");
    const img = templateImgRef.current;

    // Set high-resolution dimensions matching template
    canvas.width = img.naturalWidth || 2340;
    canvas.height = img.naturalHeight || 1655;

    // 1. Draw base template image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Common text settings
    ctx.fillStyle = "#111111";
    ctx.textBaseline = "alphabetic";

    // 2. Student Full Name (Centered above name underline at y = 582)
    // Dynamic font sizing if name is long
    let nameFontSize = 74;
    const displayName = (studentName || "Your Full Name").trim();
    ctx.font = `bold ${nameFontSize}px Georgia, "Times New Roman", serif`;
    let nameWidth = ctx.measureText(displayName).width;
    const maxNameWidth = 850;
    if (nameWidth > maxNameWidth) {
      nameFontSize = Math.floor(nameFontSize * (maxNameWidth / nameWidth));
      ctx.font = `bold ${nameFontSize}px Georgia, "Times New Roman", serif`;
    }
    ctx.textAlign = "center";
    ctx.fillText(displayName, 1200, 560);

    // 3. Course Name (Centered over the course line from x=280 to x=1380, center ~830)
    let courseFontSize = 52;
    const displayCourse = (effectiveCourse || "Computer Training & Technology").trim();
    ctx.font = `bold ${courseFontSize}px Georgia, "Times New Roman", serif`;
    let courseWidth = ctx.measureText(displayCourse).width;
    const maxCourseWidth = 980;
    if (courseWidth > maxCourseWidth) {
      courseFontSize = Math.floor(courseFontSize * (maxCourseWidth / courseWidth));
      ctx.font = `bold ${courseFontSize}px Georgia, "Times New Roman", serif`;
    }
    ctx.textAlign = "center";
    ctx.fillText(displayCourse, 830, 810);

    // 4. Training Duration Dates
    // From Date (x ~ 800, y ~ 945)
    ctx.font = `bold 44px "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(fromDate || "DD-MM-YYYY", 805, 946);

    // To Date (x ~ 1240, y ~ 945)
    ctx.fillText(toDate || "DD-MM-YYYY", 1245, 946);

    // 5. Issue Date (following DATE: at x ~ 435, y ~ 1475)
    ctx.font = `bold 42px "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(issueDate || "DD-MM-YYYY", 435, 1475);

    // 6. Certificate Registration Number (Centered under Certificate No. at x ~ 2035, y ~ 1475)
    ctx.font = `bold 44px "Segoe UI", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(certNo || "TECC240000", 2035, 1475);

    // 7. Optional Watermark Ribbon (for Student Preview)
    if (showWatermark) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2 + 50);
      ctx.rotate((-22 * Math.PI) / 180);

      // Semi-transparent diagonal banner
      ctx.fillStyle = "rgba(246, 217, 107, 0.12)";
      ctx.fillRect(-800, -50, 1600, 100);

      // Border lines
      ctx.strokeStyle = "rgba(246, 217, 107, 0.35)";
      ctx.lineWidth = 3;
      ctx.strokeRect(-800, -50, 1600, 100);

      // Text
      ctx.font = 'bold 36px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = "rgba(180, 140, 20, 0.55)";
      ctx.textAlign = "center";
      ctx.letterSpacing = "6px";
      ctx.fillText("STUDENT SPECIMEN • OFFICIAL VERIFIED TEMPLATE", 0, 12);
      ctx.restore();
    }
  }, [
    studentName,
    effectiveCourse,
    fromDate,
    toDate,
    certNo,
    issueDate,
    showWatermark,
  ]);

  // Re-render when image is loaded or inputs update
  useEffect(() => {
    if (isImageLoaded) {
      renderCertificate();
    }
  }, [isImageLoaded, renderCertificate]);

  // Download certificate as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sanitizedName = (studentName || "Student").replace(/[^a-zA-Z0-9]/g, "_");
    const link = document.createElement("a");
    link.download = `ThirdEye_Certificate_${sanitizedName}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  };

  // Print certificate
  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Certificate - ${studentName || "ThirdEye"}</title>
          <style>
            @page { size: landscape; margin: 0; }
            body { margin: 0; display: flex; align-items: center; justify-content: center; background: #fff; }
            img { width: 100vw; height: auto; max-height: 100vh; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Quick Preset profile loader
  const handleApplyPreset = (preset) => {
    setStudentName(preset.name);
    setCourseName(preset.course);
    setIsCustomCourse(false);
    setFromDate(preset.fromDate);
    setToDate(preset.toDate);
    setCertNo(preset.certNo);
    setIssueDate(preset.issueDate);
  };

  // Generate random new certificate ID
  const handleGenerateNewId = () => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    setCertNo(`TECC${randomSuffix}`);
  };

  // Share verification link simulator
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  return (
    <main className="certificate-preview-page min-h-screen bg-[#070604] text-white selection:bg-[#f6d96b] selection:text-black">
      {/* Background Ambience Glow */}
      <div className="cert-ambient-radial" aria-hidden="true" />

      {/* Header Section */}
      <section className="cert-header-section pt-32 pb-8 sm:pt-36 sm:pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#f6d96b]/15 text-[#f6d96b] border border-[#f6d96b]/30 mb-4 shadow-[0_0_20px_rgba(246,217,107,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE CREDENTIAL SIMULATOR</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Student Dynamic Certificate <span className="text-[#f6d96b]">Preview</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            See exactly how your official ISO 9001:2015 ThirdEye Computer Classes certificate will look upon course completion. Enter your name and course details to watch the certificate populate in real time.
          </p>
        </div>
      </section>

      {/* Main Workspace Layout (Form Controls + Live Canvas) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Preset Profiles Quick Chips */}
        <div className="mb-6 p-4 rounded-2xl bg-[#110e09]/90 border border-[#2b2114] flex flex-wrap items-center gap-2 sm:gap-3 backdrop-blur-xl">
          <span className="text-xs font-semibold text-[#f6d96b] uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <User className="w-3.5 h-3.5" /> Quick Fill Samples:
          </span>
          {PRESET_PROFILES.map((preset) => (
            <button
              key={preset.certNo}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1a140b] hover:bg-[#f6d96b] hover:text-black text-zinc-300 border border-[#382b19] transition-all flex items-center gap-1.5"
            >
              <span>{preset.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({preset.course.split(" ")[0]})</span>
            </button>
          ))}
          <button
            type="button"
            onClick={handleGenerateNewId}
            className="ml-auto text-xs text-[#f6d96b] hover:underline flex items-center gap-1 font-mono"
            title="Generate Random Certificate ID"
          >
            <RefreshCw className="w-3 h-3" /> New Reg ID
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ======================================================== */}
          {/* LEFT COLUMN: Interactive Student Control Panel (lg:col-span-5) */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0f0c08]/95 border border-[#2d2215] rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#241a0e] mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#f6d96b]/10 border border-[#f6d96b]/30 flex items-center justify-center text-[#f6d96b]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Student Details</h2>
                    <p className="text-xs text-zinc-400">Fill in to update the certificate live</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(PRESET_PROFILES[0])}
                  className="text-xs text-zinc-400 hover:text-[#f6d96b] flex items-center gap-1 transition-colors"
                  title="Reset form"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              <div className="space-y-5">
                {/* 1. Student Name */}
                <div>
                  <label htmlFor="student-name" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#f6d96b]" />
                    Student Full Name
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    maxLength={40}
                    className="w-full bg-[#18130b] border border-[#3b2d1c] focus:border-[#f6d96b] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#f6d96b]/20 transition-all font-medium"
                  />
                  <span className="text-[11px] text-zinc-400 mt-1 block">
                    Will be rendered prominently in official Georgia serif font
                  </span>
                </div>

                {/* 2. Course Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="course-select" className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#f6d96b]" />
                      Course Enrolled
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCustomCourse(!isCustomCourse)}
                      className="text-xs text-[#f6d96b] hover:underline"
                    >
                      {isCustomCourse ? "Select preset course" : "+ Enter custom course"}
                    </button>
                  </div>

                  {!isCustomCourse ? (
                    <select
                      id="course-select"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      className="w-full bg-[#18130b] border border-[#3b2d1c] focus:border-[#f6d96b] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#f6d96b]/20 transition-all cursor-pointer"
                    >
                      {POPULAR_COURSES.map((c) => (
                        <option key={c} value={c} className="bg-[#100d08] text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={customCourseName}
                      onChange={(e) => setCustomCourseName(e.target.value)}
                      placeholder="Type custom course title..."
                      maxLength={60}
                      className="w-full bg-[#18130b] border border-[#3b2d1c] focus:border-[#f6d96b] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#f6d96b]/20 transition-all font-medium"
                    />
                  )}
                </div>

                {/* 3. Training Duration (From & To Dates) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="from-date" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#f6d96b]" />
                      Training From
                    </label>
                    <input
                      id="from-date"
                      type="text"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="w-full bg-[#18130b] border border-[#3b2d1c] focus:border-[#f6d96b] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#f6d96b]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="to-date" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#f6d96b]" />
                      Training To
                    </label>
                    <input
                      id="to-date"
                      type="text"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="w-full bg-[#18130b] border border-[#3b2d1c] focus:border-[#f6d96b] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#f6d96b]/20 transition-all"
                    />
                  </div>
                </div>

                {/* 4. Certificate ID & Issue Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="cert-id" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-[#f6d96b]" />
                      Certificate No.
                    </label>
                    <input
                      id="cert-id"
                      type="text"
                      value={certNo}
                      onChange={(e) => setCertNo(e.target.value)}
                      placeholder="TECC231779"
                      maxLength={18}
                      className="w-full bg-[#18130b] border border-[#3b2d1c] focus:border-[#f6d96b] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#f6d96b]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="issue-date" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#f6d96b]" />
                      Date of Issue
                    </label>
                    <input
                      id="issue-date"
                      type="text"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      placeholder="DD-MM-YYYY"
                      className="w-full bg-[#18130b] border border-[#3b2d1c] focus:border-[#f6d96b] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white font-mono placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#f6d96b]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Watermark Toggle */}
                <div className="pt-2 flex items-center justify-between border-t border-[#241a0e]">
                  <span className="text-xs text-zinc-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#f6d96b]" />
                    <span>Display "Specimen Preview" Ribbon</span>
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showWatermark}
                      onChange={(e) => setShowWatermark(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-[#261e13] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f6d96b]"></div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#f6d96b] hover:bg-[#ffe07a] text-black font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(246,217,107,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1c160e] hover:bg-[#2a2014] text-white font-semibold text-xs sm:text-sm border border-[#3d2d1b] transition-all hover:border-[#f6d96b]/50"
                  >
                    <Printer className="w-4 h-4 text-[#f6d96b]" />
                    <span>Print / PDF</span>
                  </button>
                </div>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdDtLEpiKX4qeeR8YN2-HJ1jy9O7YvjaJh6HaalI7XTPyZ6aA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#20180c] to-[#141008] border border-[#f6d96b]/40 text-[#f6d96b] hover:text-white hover:border-[#f6d96b] font-semibold text-xs sm:text-sm transition-all group"
                >
                  <span>Apply for Official Certificate</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Verification Trust Box */}
            <div className="p-5 rounded-2xl bg-[#0d0a06]/90 border border-[#271d12] text-xs text-zinc-300 space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-[#f6d96b]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Govt. & Industry Recognized Validation</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Official certificates issued by ThirdEye Computer Classes include a verified registration ID, authorized signatures, and are backed by ISO 9001:2015, MSME Govt. of India, RKCL, and Tally Prime accreditation.
              </p>
              <div className="pt-2 border-t border-[#20170d] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span>Verification: info@thirdeyeclasses.com</span>
                <span>Branch: Jaipur</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Live Canvas Preview (lg:col-span-7)       */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Live Dynamic Rendering (2340 × 1655 Ultra-HD)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="text-xs text-zinc-400 hover:text-[#f6d96b] flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#140f09] border border-[#281d10] transition-colors"
                  title="Copy preview link"
                >
                  <Share2 className="w-3 h-3" />
                  <span>{isCopied ? "Link Copied!" : "Share"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullscreen(true)}
                  className="text-xs text-zinc-400 hover:text-[#f6d96b] flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#140f09] border border-[#281d10] transition-colors"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Expand</span>
                </button>
              </div>
            </div>

            {/* Canvas Container Frame */}
            <div className="cert-canvas-frame relative rounded-2xl sm:rounded-3xl overflow-hidden p-2 sm:p-3 bg-gradient-to-br from-[#241c10] via-[#100c07] to-[#1c150c] border border-[#3b2d1a] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(246,217,107,0.06)]">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="cert-canvas-element w-full h-auto block select-none"
                  style={{ aspectRatio: "2340 / 1655" }}
                />

                {!isImageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3">
                    <div className="w-10 h-10 border-3 border-[#f6d96b] border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-zinc-400 font-medium">Loading Certificate Template...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Helper Tips beneath Canvas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#110e08] border border-[#251c11] flex items-start gap-2.5">
                <Eye className="w-4 h-4 text-[#f6d96b] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-white">Instant Preview</h3>
                  <p className="text-[11px] text-zinc-400">Updates dynamically as you type your name & course</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#110e08] border border-[#251c11] flex items-start gap-2.5">
                <Download className="w-4 h-4 text-[#f6d96b] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-white">2340px High-Res Export</h3>
                  <p className="text-[11px] text-zinc-400">Download directly at print-ready 200 DPI resolution</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#110e08] border border-[#251c11] flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#f6d96b] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-white">Official Curriculum</h3>
                  <p className="text-[11px] text-zinc-400">Backed by practical lab training across 15+ branches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-6xl flex items-center justify-between pb-3 text-zinc-300">
            <span className="text-sm font-semibold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#f6d96b]" />
              <span>{studentName || "Student"} - {effectiveCourse}</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg bg-[#f6d96b] text-black font-bold text-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white"
                aria-label="Close Fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-w-6xl max-h-[85vh] w-full flex items-center justify-center overflow-auto rounded-2xl border border-zinc-800 shadow-2xl bg-black">
            <img
              src={canvasRef.current ? canvasRef.current.toDataURL("image/png") : certTemplateImage}
              alt="Certificate Fullscreen"
              className="max-w-full max-h-[82vh] object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}

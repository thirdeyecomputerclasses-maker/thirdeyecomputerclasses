import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import PayNowSection from "./components/PayNowSection";
import "./PayNowPage.css";

export default function PayNowPage() {
  useEffect(() => {
    document.title = "Pay Online & Bank Account Details | Third Eye Computer Classes";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="pay-now-page relative min-h-screen bg-[#060503] text-white selection:bg-[#f6d96b] selection:text-black overflow-x-clip pt-28 sm:pt-32 pb-20">
      {/* Background Golden Atmospheric Glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-r from-[#ffd35a]/15 via-[#f6d96b]/10 to-[#ffd35a]/15 blur-[160px] -z-10" />
      <div className="pointer-events-none absolute top-[700px] right-0 w-[450px] h-[350px] bg-[#d97706]/10 blur-[140px] -z-10" />

      {/* Tech Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(246, 217, 107, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(246, 217, 107, 0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* 1. TOP HEADER & BREADCRUMBS                                  */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 mb-4 bg-white/[0.03] border border-white/10 px-4 py-1.5 rounded-full">
            <Link to="/" className="hover:text-[#f6d96b] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#f6d96b] font-semibold">Pay Online</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1a140b] text-[#f6d96b] border border-[#f6d96b]/30 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f6d96b]" />
            <span className="font-mono uppercase tracking-wider text-[11px]">
              Official Verified Payment Gateway
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Pay Online &amp;{" "}
            <span className="bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">
              Bank Details
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed">
            Scan our authorized institutional QR code to pay via any UPI application, or make a direct NEFT / IMPS transfer to our HDFC Bank corporate account.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. THE SIGNATURE SPLIT PAYMENT SECTION                       */}
        {/* ============================================================ */}
        <div className="mb-8">
          <PayNowSection />
        </div>

      </div>
    </div>
  );
}

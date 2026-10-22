import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBranchWidget from "../components/FloatingBranchWidget";
import LiveAdmissionTicker from "../components/LiveAdmissionTicker";

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#f6d96b]/20 border-t-[#f6d96b] animate-spin" />
        <span className="text-xs text-zinc-400 font-mono tracking-wider">Loading...</span>
      </div>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0c0a04] text-zinc-100 selection:bg-[#f6d96b] selection:text-black">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingBranchWidget />
      <LiveAdmissionTicker />
    </div>
  );
}


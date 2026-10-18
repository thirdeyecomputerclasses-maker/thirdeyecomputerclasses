import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingBranchWidget from "../components/FloatingBranchWidget";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0c0a04] text-zinc-100 selection:bg-[#f6d96b] selection:text-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingBranchWidget />
    </div>
  );
}

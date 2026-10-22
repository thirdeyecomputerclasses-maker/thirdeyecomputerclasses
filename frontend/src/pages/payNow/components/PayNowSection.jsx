import React, { useState } from "react";
import {
  Check,
  Copy,
  Download,
  ShieldCheck,
  Smartphone,
  QrCode,
  CreditCard,
  Sparkles,
  Tag,
  ArrowRight,
  ExternalLink,
  Lock,
  Building,
  Zap,
  Percent,
} from "lucide-react";
import qrCardImage from "../../../assets/pay_now_card_clean.png";
import qrFullImage from "../../../assets/pay_now_qr.png";

export default function PayNowSection({ className = "" }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [activeTab, setActiveTab] = useState("razorpay"); // 'razorpay' | 'qr' | 'bank'

  const RAZORPAY_URL = "https://pages.razorpay.com/pl_RlBAYEpvwRAYsB/view";
  const AUTO_COUPON_CODE = "THIRDEYE-FESTIVE";

  const bankDetails = {
    accountName: "THIRDEYE COMPUTER CLASSES",
    accountNumber: "50200097177367",
    ifscCode: "HDFC0001843",
    bankName: "HDFC Bank Ltd.",
    branch: "Tonk Road, Jaipur, Rajasthan",
    accountType: "Current Account",
    upiId: "Vyapar.170543340526@hdfcbank",
    upiDeeplink:
      "upi://pay?pa=Vyapar.170543340526@hdfcbank&pn=THIRDEYE%20COMPUTER%20CLASSES&mc=8999&tr=STQU170543340526&cu=INR",
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(AUTO_COUPON_CODE);
    setCopiedCoupon(true);
    setTimeout(() => {
      setCopiedCoupon(false);
    }, 2500);
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrFullImage;
    link.download = "ThirdEye-Payment-QR.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`pay-now-section-wrapper space-y-8 ${className}`}>
      {/* ============================================================ */}
      {/* 1. AUTO-APPLIED DISCOUNT COUPON VOUCHER (ATTRACTIVE HERO)    */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-r from-[#07160f] via-[#0d2217] to-[#0a1811] p-6 sm:p-8 shadow-[0_15px_50px_rgba(16,185,129,0.18)]">
        {/* Animated Background Glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 blur-[90px] rounded-full" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 bg-yellow-400/15 blur-[90px] rounded-full" />

        {/* Shimmer line effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-coupon-shimmer" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          {/* Left: Offer Details & Value Proposition */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-400/15 text-emerald-400 border border-emerald-400/30 animate-discount-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited-Period Scholarship Offer Active</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              Instant Admission Discount{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-yellow-300 bg-clip-text text-transparent">
                Auto-Applied to Your Payment
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Congratulations! Your admission registration is eligible for an instant institutional fee waiver. The promotional rate is <strong className="text-emerald-400">pre-configured</strong> on our verified Razorpay gateway — simply proceed to checkout.
            </p>

            {/* Quick Benefits Ticker */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 text-xs text-zinc-300">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                Flat Savings Included
              </span>
              <span className="text-zinc-600">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                Zero Convenience Fee
              </span>
              <span className="text-zinc-600">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                Immediate GST Invoice
              </span>
            </div>
          </div>

          {/* Right: Coupon Ticket Pill with Auto-Applied Tag */}
          <div className="shrink-0 w-full sm:w-auto">
            <div className="relative inline-flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-black/60 border border-emerald-500/30 backdrop-blur-md shadow-inner">
              <div className="text-[11px] font-mono font-bold tracking-widest uppercase text-emerald-400 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Coupon Applied</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-white font-mono font-black text-lg sm:text-xl tracking-wider select-all">
                <span>{AUTO_COUPON_CODE}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="flex items-center gap-2 mt-2.5 text-[11px] text-zinc-400">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  Active on Checkout
                </span>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleCopyCoupon}
                  className="text-zinc-400 hover:text-white underline cursor-pointer transition-colors"
                >
                  {copiedCoupon ? "Copied!" : "Copy Code"}
                </button>
              </div>

              {/* Direct Quick Pay Button on Voucher */}
              <a
                href={RAZORPAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-zinc-950 bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] shadow-[0_4px_20px_rgba(246,217,107,0.35)] hover:shadow-[0_6px_25px_rgba(246,217,107,0.55)] hover:brightness-105 active:scale-95 transition-all group cursor-pointer"
              >
                <span>Claim &amp; Pay on Razorpay</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. PAYMENT METHODS TABS                                      */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#110e08] border border-[#2b2216] max-w-xl mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab("razorpay")}
          className={`flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "razorpay"
              ? "bg-gradient-to-r from-[#ffd35a] to-[#f6d96b] text-zinc-950 shadow-md shadow-yellow-400/20"
              : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Razorpay Gateway</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] uppercase font-mono font-bold bg-emerald-500 text-black">
            Offer
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("qr")}
          className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "qr"
              ? "bg-gradient-to-r from-[#ffd35a] to-[#f6d96b] text-zinc-950 shadow-md shadow-yellow-400/20"
              : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Scan UPI QR</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bank")}
          className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "bank"
              ? "bg-gradient-to-r from-[#ffd35a] to-[#f6d96b] text-zinc-950 shadow-md shadow-yellow-400/20"
              : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <Building className="w-4 h-4" />
          <span>HDFC Bank (NEFT)</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 3. TAB 1: RAZORPAY GATEWAY CHECKOUT HERO (RECOMMENDED)       */}
      {/* ============================================================ */}
      {activeTab === "razorpay" && (
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#f6d96b]/40 bg-gradient-to-br from-[#120e08] via-[#0d0a06] to-[#080604] p-6 sm:p-10 lg:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_45px_rgba(246,217,107,0.12)]">
          {/* Ambient Corner Light */}
          <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-[#ffd35a]/10 blur-[120px] rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#f6d96b]/10 text-[#f6d96b] border border-[#f6d96b]/30">
                <ShieldCheck className="w-4 h-4 text-[#f6d96b]" />
                <span className="font-mono uppercase tracking-wider text-[11px]">
                  Official 256-Bit SSL Encrypted Gateway
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Instant Online Payment{" "}
                  <span className="bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] bg-clip-text text-transparent">
                    via Razorpay
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed">
                  Pay your course tuition, admission token, or certification fees with full buyer protection. Instant confirmation receipt generated automatically upon payment.
                </p>
              </div>

              {/* Supported Payment Channels */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <Smartphone className="w-5 h-5 text-[#f6d96b] mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-white block">All UPI Apps</span>
                  <span className="text-[10px] text-zinc-400">GPay, PhonePe, Paytm</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <CreditCard className="w-5 h-5 text-[#f6d96b] mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-white block">Credit &amp; Debit</span>
                  <span className="text-[10px] text-zinc-400">Visa, Master, RuPay</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <Building className="w-5 h-5 text-[#f6d96b] mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-white block">Net Banking</span>
                  <span className="text-[10px] text-zinc-400">50+ Major Banks</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <Zap className="w-5 h-5 text-[#f6d96b] mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-white block">Wallets &amp; EMI</span>
                  <span className="text-[10px] text-zinc-400">Flexible Installments</span>
                </div>
              </div>

              {/* Primary Direct Payment CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={RAZORPAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-black text-base sm:text-lg text-zinc-950 bg-gradient-to-r from-[#ffeab0] via-[#f6d96b] to-[#f59e0b] shadow-[0_8px_35px_rgba(246,217,107,0.45)] hover:shadow-[0_12px_45px_rgba(246,217,107,0.65)] hover:brightness-105 active:scale-95 transition-all group cursor-pointer text-center"
                >
                  <span>Pay Securely via Razorpay</span>
                  <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Razorpay Merchant URL</span>
                </div>
              </div>
            </div>

            {/* Right Card (5 cols) - Visual Payment Summary with Applied Discount */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#17120a] border-2 border-[#f6d96b]/30 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-zinc-400 block font-semibold">
                      Payment Gateway
                    </span>
                    <span className="text-lg font-bold text-white tracking-tight">
                      Third Eye Admission Checkout
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    Live &amp; Active
                  </span>
                </div>

                {/* Pricing / Breakdown simulation */}
                <div className="py-5 space-y-3 font-sans text-sm">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Course Admission / Tuition</span>
                    <span className="font-mono text-zinc-400 line-through">Standard Fee</span>
                  </div>

                  <div className="flex items-center justify-between text-emerald-400 font-semibold bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/25">
                    <span className="flex items-center gap-1.5">
                      <Percent className="w-4 h-4" />
                      Scholarship Offer Auto-Applied
                    </span>
                    <span className="font-mono font-bold">- Discount Applied</span>
                  </div>

                  <div className="flex items-center justify-between text-zinc-300">
                    <span>Payment Processing Charges</span>
                    <span className="font-mono font-bold text-emerald-400">FREE (₹0)</span>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-zinc-400 block font-medium">Gateway Action</span>
                      <span className="text-sm font-bold text-white">Direct Razorpay Transfer</span>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-[#f6d96b]/15 text-[#f6d96b] font-bold">
                      Institutional Portal
                    </span>
                  </div>
                </div>

                {/* Razorpay Trust Strip */}
                <div className="mt-2 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    RBI Compliance
                  </span>
                  <span>Instant E-Receipt</span>
                  <span>SSL Protected</span>
                </div>

                <a
                  href={RAZORPAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-black bg-[#f6d96b] hover:bg-[#ffeab0] active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. TAB 2 & 3: QR CODE & BANK TRANSFER SECTION                */}
      {/* ============================================================ */}
      {(activeTab === "qr" || activeTab === "bank") && (
        <div className="rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#f6d96b]/30 bg-[#0d0a06]/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(246,217,107,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* ============================================================ */}
            {/* LEFT: THE SIGNATURE GOLDEN YELLOW QR CODE SECTION (5 cols)     */}
            {/* ============================================================ */}
            <div className="lg:col-span-5 relative bg-gradient-to-b from-[#ffd748] via-[#f7d540] to-[#f4ce2e] p-6 sm:p-10 flex flex-col items-center justify-between text-zinc-950 overflow-hidden select-none">
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 10px 10px, black 1.5px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10 w-full flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/10 text-black border border-black/15 font-mono tracking-wider uppercase">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Instant QR Payment</span>
                </span>
                <span className="text-[11px] font-bold text-black/80 font-mono tracking-tight bg-white/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                  Zero Fee
                </span>
              </div>

              {/* The White "Pay Online" QR Code Card */}
              <div className="relative z-10 w-full max-w-[320px] sm:max-w-[340px] my-auto">
                <div className="relative rounded-3xl bg-white p-4 sm:p-5 shadow-[0_20px_45px_rgba(0,0,0,0.28)] border-2 border-black/10 transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-center font-bold text-black text-xl sm:text-2xl tracking-tight mb-3 font-sans">
                    Pay Online
                  </div>

                  <div className="relative rounded-2xl overflow-hidden bg-white p-1 border border-zinc-200">
                    <img
                      src={qrCardImage}
                      alt="Third Eye Computer Classes - Pay Online UPI QR"
                      className="w-full h-auto object-contain mx-auto"
                      loading="eager"
                    />
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-zinc-100 flex items-center justify-center gap-2 text-zinc-600 text-xs font-medium">
                    <Smartphone className="w-3.5 h-3.5 text-black" />
                    <span>Scan with GPay, PhonePe, Paytm, BHIM</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="relative z-10 w-full max-w-[340px] space-y-2.5 mt-5">
                <a
                  href={bankDetails.upiDeeplink}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-black hover:bg-zinc-900 active:scale-95 transition-all shadow-md sm:hidden"
                >
                  <Smartphone className="w-4 h-4 text-[#f6d96b]" />
                  <span>Open in Any UPI App</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadQR}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs bg-black/10 hover:bg-black/20 text-black border border-black/15 transition-all cursor-pointer"
                    title="Save QR Code image to device"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.upiId, "upi")}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs bg-black/10 hover:bg-black/20 text-black border border-black/15 transition-all cursor-pointer"
                    title="Copy UPI VPA ID"
                  >
                    {copiedKey === "upi" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-black" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy UPI</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center font-mono text-[11px] text-black/75 bg-black/5 rounded-lg py-1 px-2 select-all">
                  UPI ID: <strong>{bankDetails.upiId}</strong>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* RIGHT: BANK ACCOUNT DETAILS & OFFICIAL CREDENTIALS (7 cols)  */}
            {/* ============================================================ */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-8 bg-gradient-to-br from-[#120e08]/95 via-[#0e0c08] to-[#070503] text-white">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#f6d96b]/10 text-[#f6d96b] border border-[#f6d96b]/25 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f6d96b]" />
                  <span className="font-mono uppercase tracking-wider text-[11px]">
                    Institutional Bank Transfer
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>Bank Account Details:</span>
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Direct NEFT / RTGS / IMPS bank transfer for classroom tuition fees, computer certifications, and registration.
                </p>
              </div>

              {/* 3 Signature Items with Circular Yellow Checkmarks */}
              <div className="space-y-4">
                {/* 1. Account Name */}
                <div className="group relative flex items-start justify-between p-4 sm:p-5 rounded-2xl bg-[#16120b] border border-[#2b2216] hover:border-[#f6d96b]/50 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f6d96b] text-black flex items-center justify-center shrink-0 shadow-[0_2px_12px_rgba(246,217,107,0.35)] mt-0.5">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-0.5">
                        Account Name
                      </span>
                      <span className="text-base sm:text-lg font-bold text-white tracking-wide block font-mono select-all">
                        {bankDetails.accountName}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.accountName, "name")}
                    className="shrink-0 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-[#f6d96b] bg-white/[0.04] hover:bg-[#f6d96b]/15 border border-white/10 hover:border-[#f6d96b]/40 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Copy Account Name"
                  >
                    {copiedKey === "name" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 2. Account Number */}
                <div className="group relative flex items-start justify-between p-4 sm:p-5 rounded-2xl bg-[#16120b] border border-[#2b2216] hover:border-[#f6d96b]/50 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f6d96b] text-black flex items-center justify-center shrink-0 shadow-[0_2px_12px_rgba(246,217,107,0.35)] mt-0.5">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-0.5">
                        Account Number
                      </span>
                      <span className="text-lg sm:text-2xl font-black text-[#f6d96b] tracking-wider block font-mono select-all">
                        {bankDetails.accountNumber}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        Current Account • HDFC Corporate Banking
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.accountNumber, "acc")}
                    className="shrink-0 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-[#f6d96b] bg-white/[0.04] hover:bg-[#f6d96b]/15 border border-white/10 hover:border-[#f6d96b]/40 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedKey === "acc" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 3. IFSC Code */}
                <div className="group relative flex items-start justify-between p-4 sm:p-5 rounded-2xl bg-[#16120b] border border-[#2b2216] hover:border-[#f6d96b]/50 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f6d96b] text-black flex items-center justify-center shrink-0 shadow-[0_2px_12px_rgba(246,217,107,0.35)] mt-0.5">
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                          IFSC Code
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f6d96b]/15 text-[#f6d96b] border border-[#f6d96b]/30">
                          HDFC BANK
                        </span>
                      </div>
                      <span className="text-lg sm:text-2xl font-black text-white tracking-wider block font-mono select-all">
                        {bankDetails.ifscCode}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        Branch: {bankDetails.branch}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.ifscCode, "ifsc")}
                    className="shrink-0 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-[#f6d96b] bg-white/[0.04] hover:bg-[#f6d96b]/15 border border-white/10 hover:border-[#f6d96b]/40 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Copy IFSC Code"
                  >
                    {copiedKey === "ifsc" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. BOTTOM TRUST & HELPLINE BAR                               */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Need help with payment or fee confirmation? Call our accounts team directly at <strong>+91 8058061222</strong>.</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
          <span>Razorpay Verified</span>
          <span>•</span>
          <span>HDFC Current A/C</span>
          <span>•</span>
          <span>Jaipur Campus</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  Check,
  Copy,
  Download,
  ShieldCheck,
  Smartphone,
  QrCode,
} from "lucide-react";
import qrCardImage from "../../../assets/pay_now_card_clean.png";
import qrFullImage from "../../../assets/pay_now_qr.png";

export default function PayNowSection({ className = "" }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const bankDetails = {
    accountName: "THIRDEYE COMPUTER CLASSES",
    accountNumber: "50200097177367",
    ifscCode: "HDFC0001843",
    bankName: "HDFC Bank Ltd.",
    branch: "Jaipur, Rajasthan",
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

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrFullImage;
    link.download = "ThirdEye-Payment-QR.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`pay-now-section-wrapper ${className}`}>
      {/* ── MAIN PAYMENT SPLIT CARD (Recreating and Elevating Reference Image) ── */}
      <div className="rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#f6d96b]/30 bg-[#0d0a06]/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(246,217,107,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT: THE SIGNATURE GOLDEN YELLOW QR CODE SECTION (5 cols)     */}
          {/* Matches Reference: Vibrant Yellow Box with White "Pay Online" card */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 relative bg-gradient-to-b from-[#ffd748] via-[#f7d540] to-[#f4ce2e] p-6 sm:p-10 flex flex-col items-center justify-between text-zinc-950 overflow-hidden select-none">
            {/* Subtle background tech geometric pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 10px 10px, black 1.5px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Top Badge */}
            <div className="relative z-10 w-full flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/10 text-black border border-black/15 font-mono tracking-wider uppercase">
                <QrCode className="w-3.5 h-3.5" />
                <span>Instant QR Payment</span>
              </span>
              <span className="text-[11px] font-bold text-black/80 font-mono tracking-tight bg-white/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                Zero Convenience Fee
              </span>
            </div>

            {/* The White "Pay Online" QR Code Card from User's Image */}
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[340px] my-auto">
              <div className="relative rounded-3xl bg-white p-4 sm:p-5 shadow-[0_20px_45px_rgba(0,0,0,0.28)] border-2 border-black/10 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="text-center font-bold text-black text-xl sm:text-2xl tracking-tight mb-3 font-sans">
                  Pay Online
                </div>

                {/* QR Image Display */}
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
              {/* Mobile Deeplink Button */}
              <a
                href={bankDetails.upiDeeplink}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-black hover:bg-zinc-900 active:scale-95 transition-all shadow-md sm:hidden"
              >
                <Smartphone className="w-4 h-4 text-[#f6d96b]" />
                <span>Open in Any UPI App</span>
              </a>

              {/* Download QR & Copy UPI ID Buttons */}
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

              {/* UPI ID Pill */}
              <div className="text-center font-mono text-[11px] text-black/75 bg-black/5 rounded-lg py-1 px-2 select-all">
                UPI ID: <strong>{bankDetails.upiId}</strong>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: BANK ACCOUNT DETAILS & OFFICIAL CREDENTIALS (7 cols)  */}
          {/* Matches Reference: Yellow circular checkmarks, Account details */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-8 bg-gradient-to-br from-[#120e08]/95 via-[#0e0c08] to-[#070503] text-white">
            
            {/* Header Area */}
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

            {/* ── 3 SIGNATURE ITEMS WITH CIRCULAR YELLOW CHECKMARKS ── */}
            <div className="space-y-4">
              
              {/* 1. Account Name */}
              <div className="group relative flex items-start justify-between p-4 sm:p-5 rounded-2xl bg-[#16120b] border border-[#2b2216] hover:border-[#f6d96b]/50 transition-all duration-200">
                <div className="flex items-start gap-4">
                  {/* Yellow Circular Checkmark Icon (Exact match to Reference) */}
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
                  {/* Yellow Circular Checkmark Icon */}
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
                  {/* Yellow Circular Checkmark Icon */}
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
                      Branch: Tonk Road, Jaipur, Rajasthan
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
    </div>
  );
}

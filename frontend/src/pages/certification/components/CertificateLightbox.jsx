import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function CertificateLightbox({ cert, onClose }) {
  if (!cert) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md">
        {/* Overlay backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 max-w-4xl w-full rounded-3xl bg-[#0e0c08] border-2 border-[#f6d96b]/40 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.1] bg-[#141009]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-black text-[#f6d96b] border border-[#f6d96b]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f6d96b]" />
                {cert.partner}
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-white truncate max-w-md">
                {cert.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Image Frame */}
          <div className="p-4 sm:p-8 bg-black/60 flex items-center justify-center overflow-auto max-h-[65vh]">
            <img
              src={cert.image}
              alt={cert.title}
              className="max-h-[55vh] max-w-full object-contain rounded-xl border border-white/10 shadow-2xl"
            />
          </div>

          {/* Footer info & actions */}
          <div className="p-4 sm:p-6 border-t border-white/[0.1] bg-[#141009] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-zinc-400 font-mono">
                Credential ID: <span className="text-[#f6d96b] font-bold">{cert.id}</span>
              </div>
              <div className="text-xs text-zinc-300 mt-0.5">
                Issued through Third Eye Authorized Examination Center (ISO 9001:2015)
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/certificate-verification"
                onClick={onClose}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-[#f6d96b] hover:bg-[#ffe07a] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verify Credential</span>
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-zinc-300 bg-white/[0.08] hover:bg-white/15 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

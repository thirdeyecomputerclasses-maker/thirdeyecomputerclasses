import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Users,
  Upload,
  CheckCircle2,
  Trash2,
  Sparkles,
} from "lucide-react";
import "./JobFormModal.css";

export default function MentorFormModal({
  isOpen,
  mentor,
  onClose,
  onSave,
  isSaving,
}) {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    category: "faculty",
    image: "",
    description: "",
    order: 10,
    isActive: true,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (mentor) {
      setFormData({
        name: mentor.name || "",
        designation: mentor.designation || "",
        category: mentor.category || "faculty",
        image: mentor.image || "",
        description: mentor.description || "",
        order: mentor.order ?? 10,
        isActive: mentor.isActive !== false,
      });
      setPreviewUrl(mentor.image || "");
      setSelectedFile(null);
    } else {
      setFormData({
        name: "",
        designation: "",
        category: "faculty",
        image: "",
        description: "",
        order: 10,
        isActive: true,
      });
      setPreviewUrl("");
      setSelectedFile(null);
    }
    setErrors({});
  }, [mentor, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, file: "Please select a valid image file (JPG, PNG, WebP)" }));
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, file: null, image: null }));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation/Role is required";
    if (!previewUrl && !formData.image.trim()) {
      newErrors.image = "Please upload a photo or provide an image URL";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name.trim());
    payload.append("designation", formData.designation.trim());
    payload.append("category", formData.category);
    payload.append("description", formData.description.trim());
    payload.append("order", String(formData.order));
    payload.append("isActive", String(formData.isActive));

    if (selectedFile) {
      payload.append("image", selectedFile);
    } else if (formData.image) {
      payload.append("image", formData.image);
    }

    onSave(payload, mentor?._id || mentor?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f0c08] border border-[#3a2f1d] rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2215] bg-gradient-to-r from-[#18130c] to-[#0c0906]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f6d96b]/15 border border-[#f6d96b]/30 flex items-center justify-center text-[#f6d96b]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                {mentor ? "Edit Mentor / Faculty Profile" : "Add New Mentor & Faculty Card"}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Synced directly with Home page carousel and Our Team showcase.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-sm text-zinc-300">
          {/* Row 1: Name & Designation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Full Name <span className="text-yellow-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Verma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#18130c] border border-[#3a2f1d] focus:border-[#f6d96b] focus:ring-1 focus:ring-[#f6d96b] rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 outline-none transition-all"
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Designation / Role <span className="text-yellow-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Designing Executive"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full bg-[#18130c] border border-[#3a2f1d] focus:border-[#f6d96b] focus:ring-1 focus:ring-[#f6d96b] rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 outline-none transition-all"
              />
              {errors.designation && <p className="text-xs text-red-400 mt-1">{errors.designation}</p>}
            </div>
          </div>

          {/* Row 2: Category & Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Department / Category <span className="text-yellow-400">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#18130c] border border-[#3a2f1d] focus:border-[#f6d96b] focus:ring-1 focus:ring-[#f6d96b] rounded-xl px-4 py-2.5 text-white outline-none transition-all"
              >
                <option value="leadership">Executive Leadership</option>
                <option value="faculty">Faculty & Mentors</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Display Order Priority
              </label>
              <input
                type="number"
                min="1"
                max="999"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 1 })}
                className="w-full bg-[#18130c] border border-[#3a2f1d] focus:border-[#f6d96b] focus:ring-1 focus:ring-[#f6d96b] rounded-xl px-4 py-2.5 text-white outline-none transition-all"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">
                Lower numbers appear first (e.g. 1 = top priority).
              </span>
            </div>
          </div>

          {/* Row 3: Photo Upload (ImageKit) */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
              Profile Photo <span className="text-yellow-400">*</span>
            </label>

            {previewUrl ? (
              <div className="flex items-center gap-4 p-3 bg-[#18130c] border border-[#3a2f1d] rounded-xl">
                <div className="w-16 h-20 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-yellow-500/30">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">
                    {selectedFile ? selectedFile.name : "Current Photo"}
                  </p>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ready for display
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs font-medium text-yellow-400 hover:text-white bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 rounded-lg transition-all"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all"
                    title="Remove Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#3a2f1d] hover:border-[#f6d96b]/60 rounded-xl p-6 text-center cursor-pointer bg-[#140f09]/60 hover:bg-[#18130c] transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-white">Click to upload mentor photo</p>
                <p className="text-xs text-zinc-500 mt-1">PNG, JPG, or WebP (Portrait recommended)</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {errors.image && <p className="text-xs text-red-400 mt-1">{errors.image}</p>}
          </div>

          {/* Row 4: Short Bio / Description */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
              Bio / Expertise Overview (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Brief summary of background, expertise, or achievements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#18130c] border border-[#3a2f1d] focus:border-[#f6d96b] focus:ring-1 focus:ring-[#f6d96b] rounded-xl p-3 text-white placeholder-zinc-600 outline-none transition-all resize-none"
            />
          </div>

          {/* Row 5: Status Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded border-[#3a2f1d] bg-[#18130c] text-[#f6d96b] focus:ring-[#f6d96b] accent-[#f6d96b]"
            />
            <label htmlFor="isActive" className="text-xs text-zinc-300 font-medium cursor-pointer">
              Active profile (visible in public Mentors & Faculty sections)
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2a2215]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#f6d96b] to-[#ffd333] hover:from-[#ffe07a] hover:to-[#ffe566] text-black font-bold shadow-lg shadow-[#f6d96b]/20 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Saving Profile...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{mentor ? "Update Mentor" : "Add Mentor Card"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

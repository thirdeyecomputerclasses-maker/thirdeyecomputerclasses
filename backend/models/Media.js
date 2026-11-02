const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      index: true,
      enum: [
        "home",
        "franchise",
        "about",
        "courses",
        "placements",
        "reviews",
        "memories",
        "team",
        "certificates",
        "certification",
        "general",
      ],
    },
    section: {
      type: String,
      default: "general",
    },
    slotKey: {
      type: String,
      default: "",
      index: true,
      unique: true,
    },
    defaultUrl: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true,
      enum: ["image", "video"],
      default: "image",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      required: true,
    },
    fileId: {
      type: String,
      default: "",
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    // Certificate specific metadata
    certId: {
      type: String,
      default: "",
    },
    partner: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Global Tech",
    },
    issuer: {
      type: String,
      default: "",
    },
    skills: {
      type: String,
      default: "",
    },
    impact: {
      type: String,
      default: "",
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Media || mongoose.model("Media", MediaSchema);

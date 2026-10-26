const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Blog slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    seoExcerpt: {
      type: String,
      default: "",
      trim: true,
    },
    metaTitle: {
      type: String,
      default: "",
      trim: true,
    },
    metaDescription: {
      type: String,
      default: "",
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    featuredImage: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Technology",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      default: "ThirdEye Expert Team",
      trim: true,
    },
    readTime: {
      type: String,
      default: "4 min read",
      trim: true,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Clean arrays before saving
BlogSchema.pre("validate", function () {
  if (Array.isArray(this.keywords)) {
    this.keywords = this.keywords
      .map((k) => (typeof k === "string" ? k.trim() : ""))
      .filter(Boolean);
  }
  if (Array.isArray(this.tags)) {
    this.tags = this.tags
      .map((t) => (typeof t === "string" ? t.trim() : ""))
      .filter(Boolean);
  }
  if (!this.metaDescription && this.seoExcerpt) {
    this.metaDescription = this.seoExcerpt;
  }
});

module.exports = mongoose.model("Blog", BlogSchema);

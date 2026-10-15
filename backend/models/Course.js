const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema(
  {
    id: { type: String, default: "" },
    name: { type: String, default: "", trim: true },
    iconType: { type: String, default: "code" },
    glowColor: { type: String, default: "rgba(246, 217, 107, 0.3)" },
  },
  { _id: false }
);

const ModuleSchema = new mongoose.Schema(
  {
    id: { type: String, default: "" },
    moduleNumber: { type: String, default: "MODULE 1" },
    title: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Course slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    badge: {
      type: String,
      default: "Job Oriented",
      trim: true,
    },
    duration: {
      type: String,
      default: "6 Months",
      trim: true,
    },
    prerequisites: {
      type: [String],
      default: [
        "Basic computer literacy",
        "Passion for hands-on learning",
        "No prior coding experience required",
      ],
    },
    tools: {
      type: [ToolSchema],
      default: [],
    },
    modules: {
      type: [ModuleSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

CourseSchema.pre("validate", function () {
  if (Array.isArray(this.tools)) {
    this.tools = this.tools.filter(
      (t) => t && typeof t.name === "string" && t.name.trim().length > 0
    );
  }
  if (Array.isArray(this.modules)) {
    this.modules = this.modules.filter(
      (m) => m && typeof m.title === "string" && m.title.trim().length > 0
    );
  }
  if (Array.isArray(this.prerequisites)) {
    this.prerequisites = this.prerequisites.filter(
      (p) => p && typeof p === "string" && p.trim().length > 0
    );
  }
});

module.exports = mongoose.model("Course", CourseSchema);

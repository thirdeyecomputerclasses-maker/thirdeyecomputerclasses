const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Job slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "IT",
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
    },
    jobType: {
      type: String,
      default: "Full Time",
      trim: true,
    },
    salary: {
      type: String,
      required: [true, "Salary package is required"],
      trim: true,
    },
    openings: {
      type: String,
      default: "1 Vacancy",
      trim: true,
    },
    postedDate: {
      type: String,
      default: "Active Now",
      trim: true,
    },
    experience: {
      type: String,
      default: "0 – 2 Years",
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    aliases: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

JobSchema.index({ slug: 1, isActive: 1 });

module.exports = mongoose.model("Job", JobSchema);

const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      required: [true, "Form type is required"],
      enum: ["contact", "franchise", "job_application", "course_inquiry", "other"],
      default: "contact",
      index: true,
    },
    name: {
      type: String,
      required: [true, "Applicant or sender name is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    investment: {
      type: String,
      trim: true,
      default: "",
    },
    background: {
      type: String,
      trim: true,
      default: "",
    },
    jobTitle: {
      type: String,
      trim: true,
      default: "",
    },
    jobSlug: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    resumeFileName: {
      type: String,
      trim: true,
      default: "",
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: "",
    },
    coverLetter: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "in_review", "contacted", "resolved", "archived"],
      default: "new",
      index: true,
    },
    adminNotes: {
      type: String,
      trim: true,
      default: "",
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

SubmissionSchema.index({ createdAt: -1 });
SubmissionSchema.index({ formType: 1, status: 1 });

module.exports = mongoose.model("Submission", SubmissionSchema);

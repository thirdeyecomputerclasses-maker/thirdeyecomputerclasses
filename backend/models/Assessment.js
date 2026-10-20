const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    id: { type: String, default: "" },
    question: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    options: {
      type: [String],
      validate: [
        (val) => Array.isArray(val) && val.length >= 2,
        "A question must have at least 2 options",
      ],
      required: true,
    },
    correctAnswer: {
      type: Number,
      required: [true, "Correct option index (0-3) is required"],
      min: 0,
      max: 5,
    },
    explanation: {
      type: String,
      default: "",
      trim: true,
    },
    topic: {
      type: String,
      default: "General",
      trim: true,
    },
  },
  { _id: false }
);

const RecommendedCourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, default: "", trim: true },
    badge: { type: String, default: "Recommended" },
    description: { type: String, default: "" },
    duration: { type: String, default: "3-6 Months" },
  },
  { _id: false }
);

const AssessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Assessment title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Assessment slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    targetAudience: {
      type: String,
      default: "All Learners",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    iconType: {
      type: String,
      default: "code",
    },
    durationMinutes: {
      type: Number,
      default: 10,
    },
    totalQuestions: {
      type: Number,
      default: 10,
    },
    passingPercentage: {
      type: Number,
      default: 60,
    },
    questions: {
      type: [QuestionSchema],
      default: [],
    },
    recommendedCourses: {
      type: [RecommendedCourseSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    attemptsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

AssessmentSchema.pre("validate", function () {
  if (Array.isArray(this.questions)) {
    this.totalQuestions = this.questions.length;
    this.questions.forEach((q, idx) => {
      if (!q.id) {
        q.id = `q-${Date.now()}-${idx}`;
      }
    });
  }
});

module.exports = mongoose.model("Assessment", AssessmentSchema);

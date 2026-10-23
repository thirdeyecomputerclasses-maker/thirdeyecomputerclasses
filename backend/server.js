const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, getDBStatus } = require("./config/db");
const { isImageKitConfigured } = require("./config/imagekit");
const courseRoutes = require("./routes/courseRoutes");
const jobRoutes = require("./routes/jobRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const path = require("path");
const mediaRoutes = require("./routes/mediaRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((url) => url.trim().replace(/\/$/, ""))
  : ["http://localhost:5173", "http://localhost:3000", "https://thirdeyeclasses.com", "https://www.thirdeyeclasses.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalizedOrigin = origin.replace(/\/$/, "");
      const isNetlify = normalizedOrigin.endsWith(".netlify.app");
      const isTrustedDomain =
        normalizedOrigin.endsWith("thirdeyeclasses.com") ||
        normalizedOrigin.endsWith("thirdeyecomputerclasses.com") ||
        normalizedOrigin.endsWith("onrender.com");
      if (
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(normalizedOrigin) ||
        isNetlify ||
        isTrustedDomain ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS error: Origin ${origin} not allowed by CORS policy`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", jobRoutes);
app.use("/api", blogRoutes);
app.use("/api", assessmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api", mediaRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: getDBStatus() ? "connected" : "disconnected",
    imagekit: isImageKitConfigured() ? "connected" : "not_configured",
    timestamp: new Date().toISOString(),
  });
});

// Global error handling middleware (handles 413 PayloadTooLarge, Multer errors, etc.)
app.use((err, req, res, next) => {
  if (
    err.type === "entity.too.large" ||
    err.status === 413 ||
    err.code === "LIMIT_FILE_SIZE" ||
    err.code === "LIMIT_FIELD_VALUE"
  ) {
    return res.status(413).json({
      error: "Payload too large. Please reduce the size of embedded images or article content.",
      message: err.message,
    });
  }
  console.error("Unhandled server error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

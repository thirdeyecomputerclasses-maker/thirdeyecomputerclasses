const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, getDBStatus } = require("./config/db");
const { isImageKitConfigured } = require("./config/imagekit");
const courseRoutes = require("./routes/courseRoutes");
const jobRoutes = require("./routes/jobRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((url) => url.trim().replace(/\/$/, ""))
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalizedOrigin = origin.replace(/\/$/, "");
      const isNetlify = normalizedOrigin.endsWith(".netlify.app");
      if (
        allowedOrigins.includes("*") ||
        allowedOrigins.includes(normalizedOrigin) ||
        isNetlify ||
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", jobRoutes);
app.use("/api/submissions", submissionRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: getDBStatus() ? "connected" : "disconnected",
    imagekit: isImageKitConfigured() ? "connected" : "not_configured",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

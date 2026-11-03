const express = require("express");
const multer = require("multer");
const {
  getMentors,
  getMentor,
  createMentor,
  updateMentor,
  deleteMentor,
} = require("../controllers/mentorController");
const {
  verifyClearanceToken,
  requireRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Public endpoints
router.get("/mentors", getMentors);
router.get("/mentors/:id", getMentor);

// Admin-protected endpoints
router.post(
  "/mentors",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  upload.single("image"),
  createMentor
);

router.put(
  "/mentors/:id",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  upload.single("image"),
  updateMentor
);

router.delete(
  "/mentors/:id",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  deleteMentor
);

module.exports = router;


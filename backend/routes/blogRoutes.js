const express = require("express");
const multer = require("multer");
const {
  getBlogs,
  getBlog,
  getBlogStats,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadInlineImage,
} = require("../controllers/blogController");
const {
  verifyClearanceToken,
  requireRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB
    fieldSize: 25 * 1024 * 1024, // 25MB (allows rich articles and inline graphics)
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
router.get("/blogs", getBlogs);
router.get("/blogs/stats", getBlogStats);
router.get("/blogs/:idOrSlug", getBlog);

// Admin-protected endpoints
router.post(
  "/blogs",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  upload.single("featuredImage"),
  createBlog
);

router.put(
  "/blogs/:id",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  upload.single("featuredImage"),
  updateBlog
);

router.delete(
  "/blogs/:id",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  deleteBlog
);

router.post(
  "/blogs/upload-image",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  upload.single("image"),
  uploadInlineImage
);

module.exports = router;

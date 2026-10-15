const express = require("express");
const multer = require("multer");
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadImage,
} = require("../controllers/courseController");
const {
  verifyClearanceToken,
  requireRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

router.post(
  "/upload",
  verifyClearanceToken,
  requireRole("course_admin"),
  upload.single("image"),
  uploadImage
);

router.get("/courses", getCourses);
router.get("/courses/:idOrSlug", getCourse);

router.post(
  "/courses",
  verifyClearanceToken,
  requireRole("course_admin"),
  upload.single("image"),
  createCourse
);

router.put(
  "/courses/:id",
  verifyClearanceToken,
  requireRole("course_admin"),
  upload.single("image"),
  updateCourse
);

router.delete(
  "/courses/:id",
  verifyClearanceToken,
  requireRole("global_admin"),
  deleteCourse
);

module.exports = router;

const express = require("express");
const multer = require("multer");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const {
  verifyClearanceToken,
  requireRole,
} = require("../middleware/authMiddleware");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024,
  },
});

const handleResumeUpload = (req, res, next) => {
  upload.single("resume")(req, res, () => {
    next();
  });
};

router.post("/", handleResumeUpload, submissionController.createSubmission);
router.post("/upload-resume", handleResumeUpload, submissionController.uploadResume);

router.get(
  "/",
  verifyClearanceToken,
  requireRole("submissions_admin"),
  submissionController.getSubmissions
);

router.get(
  "/stats",
  verifyClearanceToken,
  requireRole("submissions_admin"),
  submissionController.getSubmissionStats
);

router.patch(
  "/:id/status",
  verifyClearanceToken,
  requireRole("submissions_admin"),
  submissionController.updateSubmissionStatus
);

router.delete(
  "/:id",
  verifyClearanceToken,
  requireRole("submissions_admin"),
  submissionController.deleteSubmission
);

module.exports = router;

const express = require("express");
const {
  getAssessments,
  getAssessment,
  submitAssessment,
  getAdminAssessments,
  getAssessmentStats,
  createAssessment,
  updateAssessment,
  deleteAssessment,
} = require("../controllers/assessmentController");
const {
  verifyClearanceToken,
  requireRole,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public test-taking endpoints
router.get("/assessments", getAssessments);
router.get("/assessments/stats", getAssessmentStats);
router.get("/assessments/:slugOrId", getAssessment);
router.post("/assessments/:slugOrId/submit", submitAssessment);

// Admin-protected management endpoints
router.get(
  "/admin/assessments",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  getAdminAssessments
);

router.post(
  "/assessments",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  createAssessment
);

router.put(
  "/assessments/:id",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  updateAssessment
);

router.delete(
  "/assessments/:id",
  verifyClearanceToken,
  requireRole("global_admin", "course_admin"),
  deleteAssessment
);

module.exports = router;

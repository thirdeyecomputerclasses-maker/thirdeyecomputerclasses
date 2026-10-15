const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const {
  verifyClearanceToken,
  requireRole,
} = require("../middleware/authMiddleware");

router.get("/jobs", jobController.getJobs);
router.get("/jobs/:idOrSlug", jobController.getJob);

router.post(
  "/jobs",
  verifyClearanceToken,
  requireRole("jobs_admin"),
  jobController.createJob
);

router.put(
  "/jobs/:id",
  verifyClearanceToken,
  requireRole("jobs_admin"),
  jobController.updateJob
);

router.delete(
  "/jobs/:id",
  verifyClearanceToken,
  requireRole("jobs_admin"),
  jobController.deleteJob
);

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  verifyClearanceToken,
  requireRole,
} = require("../middleware/authMiddleware");

router.post("/verify-gate", authController.verifyGate);
router.post("/verify_gate", authController.verifyGate);
router.get("/session", verifyClearanceToken, authController.getSession);
router.post("/activity-ping", verifyClearanceToken, authController.activityPing);
router.post("/activity_ping", verifyClearanceToken, authController.activityPing);

router.get(
  "/security-config",
  verifyClearanceToken,
  requireRole("global_admin"),
  authController.getSecurityConfig
);
router.get(
  "/security_config",
  verifyClearanceToken,
  requireRole("global_admin"),
  authController.getSecurityConfig
);

router.put(
  "/update-role-password",
  verifyClearanceToken,
  requireRole("global_admin"),
  authController.updateRolePassword
);
router.put(
  "/update_role_password",
  verifyClearanceToken,
  requireRole("global_admin"),
  authController.updateRolePassword
);

module.exports = router;

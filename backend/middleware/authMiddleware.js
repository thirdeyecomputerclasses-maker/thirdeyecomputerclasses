const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "thirdeye_cyber_jwt_secret_key_2026_super_secure";

const verifyClearanceToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: "Authentication required: Missing clearance token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired clearance token. Please re-authenticate.",
    });
  }
};

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: "Unauthenticated request",
      });
    }

    if (req.admin.role === "global_admin") {
      return next();
    }

    if (allowedRoles.includes(req.admin.role)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      error: `Access Denied: Your role '${req.admin.role}' is not authorized to access this resource.`,
    });
  };
};

module.exports = {
  verifyClearanceToken,
  requireRole,
  JWT_SECRET,
};

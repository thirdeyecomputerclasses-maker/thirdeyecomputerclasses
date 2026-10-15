const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminSecurity = require("../models/AdminSecurity");
const { JWT_SECRET } = require("../middleware/authMiddleware");

exports.verifyGate = async (req, res) => {
  try {
    const { clerkName, clerkId, clerkEmail, password } = req.body;

    if (!password || !password.trim()) {
      return res.status(400).json({
        success: false,
        error: "Security password is required to unlock admin panel.",
      });
    }

    const identifier = (clerkName || clerkEmail || "Admin User").trim();
    const config = await AdminSecurity.getOrCreateConfig();

    const roleKeys = ["global_admin", "course_admin", "jobs_admin", "submissions_admin"];
    let matchedRole = null;

    for (const key of roleKeys) {
      const roleConfig = config.roles[key];
      if (roleConfig && roleConfig.passwordHash) {
        const isMatch = await bcrypt.compare(password.trim(), roleConfig.passwordHash);
        if (isMatch) {
          matchedRole = key;
          break;
        }
      }
    }

    if (!matchedRole) {
      return res.status(401).json({
        success: false,
        error: "Incorrect admin security password. Please enter a valid clearance key.",
      });
    }

    config.auditLog.unshift({
      clerkName: identifier,
      clerkId: clerkId || "unknown",
      clerkEmail: clerkEmail || "",
      roleUnlocked: matchedRole,
      unlockedAt: new Date(),
      ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
    });

    if (config.auditLog.length > 150) {
      config.auditLog = config.auditLog.slice(0, 150);
    }

    await config.save();

    const token = jwt.sign(
      {
        clerkName: identifier,
        clerkId: clerkId || "",
        clerkEmail: clerkEmail || "",
        role: matchedRole,
      },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      success: true,
      role: matchedRole,
      roleTitle: config.roles[matchedRole].title,
      clerkName: identifier,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to verify admin clearance: " + error.message,
    });
  }
};

exports.getSession = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

exports.getSecurityConfig = async (req, res) => {
  try {
    const config = await AdminSecurity.getOrCreateConfig();

    const sanitizedRoles = {};
    for (const [key, val] of Object.entries(config.roles)) {
      sanitizedRoles[key] = {
        title: val.title,
        description: val.description,
        updatedAt: val.updatedAt,
        updatedBy: val.updatedBy,
      };
    }

    const ROLE_PRIORITY = {
      global_admin: 4,
      course_admin: 2,
      jobs_admin: 2,
      submissions_admin: 2,
    };

    const userMap = new Map();
    const cleanLogs = config.auditLog.filter((entry) => {
      const name = (entry.clerkName || "").toLowerCase();
      const email = (entry.clerkEmail || "").toLowerCase();
      return !name.includes("jaat") && !name.includes("jatt") && !email.includes("jaat");
    });

    for (const entry of cleanLogs) {
      const key = (entry.clerkEmail || entry.clerkName || "Unknown").toLowerCase().trim();
      if (!userMap.has(key)) {
        userMap.set(key, {
          clerkName: entry.clerkName,
          clerkEmail: entry.clerkEmail || "",
          clerkId: entry.clerkId || "",
          roleUnlocked: entry.roleUnlocked,
          lastActive: entry.unlockedAt,
          ipAddress: entry.ipAddress || "127.0.0.1",
          totalLogins: 1,
        });
      } else {
        const existing = userMap.get(key);
        existing.totalLogins += 1;
        if (new Date(entry.unlockedAt) > new Date(existing.lastActive)) {
          existing.lastActive = entry.unlockedAt;
          existing.ipAddress = entry.ipAddress || existing.ipAddress;
        }
        const currentPrio = ROLE_PRIORITY[existing.roleUnlocked] || 1;
        const newPrio = ROLE_PRIORITY[entry.roleUnlocked] || 1;
        if (newPrio >= currentPrio) {
          existing.roleUnlocked = entry.roleUnlocked;
        }
      }
    }

    const adminUsers = Array.from(userMap.values()).sort(
      (a, b) => new Date(b.lastActive) - new Date(a.lastActive)
    );

    return res.status(200).json({
      success: true,
      roles: sanitizedRoles,
      adminUsers,
      auditLog: cleanLogs.slice(0, 50),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to load security config: " + error.message,
    });
  }
};

exports.activityPing = async (req, res) => {
  try {
    const identifier = req.admin?.clerkName || req.admin?.clerkEmail || "Admin User";
    const config = await AdminSecurity.getOrCreateConfig();
    const latest = config.auditLog.find(
      (l) => l.clerkName === identifier || (l.clerkEmail && l.clerkEmail === req.admin?.clerkEmail)
    );
    if (latest) {
      latest.unlockedAt = new Date();
      if (req.ip) latest.ipAddress = req.ip;
      await config.save();
    }
    return res.status(200).json({ success: true, timestamp: new Date() });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateRolePassword = async (req, res) => {
  try {
    const { roleKey, currentPassword, newPassword } = req.body;

    const allowedRoles = ["global_admin", "course_admin", "jobs_admin", "submissions_admin"];
    if (!allowedRoles.includes(roleKey)) {
      return res.status(400).json({
        success: false,
        error: `Invalid role specified. Must be one of: ${allowedRoles.join(", ")}`,
      });
    }

    if (!currentPassword || !currentPassword.trim()) {
      return res.status(400).json({
        success: false,
        error: "Current password is required to authorize this change.",
      });
    }

    if (!newPassword || newPassword.trim().length < 6) {
      return res.status(400).json({
        success: false,
        error: "New password must be at least 6 characters long.",
      });
    }

    if (currentPassword.trim() === newPassword.trim()) {
      return res.status(400).json({
        success: false,
        error: "New password must be different from previous password.",
      });
    }

    const config = await AdminSecurity.getOrCreateConfig();

    const roleHash = config.roles[roleKey]?.passwordHash;
    const globalHash = config.roles.global_admin?.passwordHash;

    let isAuthorized = false;
    if (roleHash) {
      isAuthorized = await bcrypt.compare(currentPassword.trim(), roleHash);
    }
    if (!isAuthorized && globalHash) {
      isAuthorized = await bcrypt.compare(currentPassword.trim(), globalHash);
    }

    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        error: "Incorrect current password. Please enter the valid previous passcode.",
      });
    }

    const newHash = await bcrypt.hash(newPassword.trim(), 10);

    config.roles[roleKey].passwordHash = newHash;
    config.roles[roleKey].updatedAt = new Date();
    config.roles[roleKey].updatedBy = req.admin?.clerkName || "Global Admin";

    await config.save();

    return res.status(200).json({
      success: true,
      message: `Password for ${config.roles[roleKey].title} updated successfully!`,
      updatedAt: config.roles[roleKey].updatedAt,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to update role password: " + error.message,
    });
  }
};

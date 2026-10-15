import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  KeyRound,
  Edit2,
  Lock,
  Crown,
  BookOpen,
  Briefcase,
  Inbox,
  Clock,
  User,
  Users,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  getSecurityConfig,
  updateRolePassword,
  pingAdminActivity,
  getStoredSession,
} from "../../../services/authApi";
import "./SecurityManagerTab.css";

const ROLE_ICONS = {
  global_admin: Crown,
  course_admin: BookOpen,
  jobs_admin: Briefcase,
  submissions_admin: Inbox,
};

const ROLE_COLORS = {
  global_admin: { text: "text-amber-400", border: "border-amber-400/30", bg: "bg-amber-400/10" },
  course_admin: { text: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10" },
  jobs_admin: { text: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/10" },
  submissions_admin: { text: "text-purple-400", border: "border-purple-400/30", bg: "bg-purple-400/10" },
};

function formatTimeAgo(dateStr) {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  const now = new Date();
  const diffSec = Math.floor((now - date) / 1000);
  if (diffSec < 60) return "Just now";
  const diffMins = Math.floor(diffSec / 60);
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

const ROLE_PRIORITY = {
  global_admin: 4,
  course_admin: 2,
  jobs_admin: 2,
  submissions_admin: 2,
};

function deriveAdminUsers(logs) {
  const map = new Map();
  const cleanLogs = (logs || []).filter((log) => {
    const name = (log.clerkName || "").toLowerCase();
    const email = (log.clerkEmail || "").toLowerCase();
    return !name.includes("jaat") && !name.includes("jatt") && !email.includes("jaat");
  });

  for (const log of cleanLogs) {
    const key = (log.clerkEmail || log.clerkName || "unknown").toLowerCase().trim();
    if (!map.has(key)) {
      map.set(key, {
        clerkName: log.clerkName,
        clerkEmail: log.clerkEmail || "",
        clerkId: log.clerkId || "",
        roleUnlocked: log.roleUnlocked,
        lastActive: log.unlockedAt,
        totalLogins: 1,
      });
    } else {
      const u = map.get(key);
      u.totalLogins += 1;
      if (new Date(log.unlockedAt) > new Date(u.lastActive)) {
        u.lastActive = log.unlockedAt;
      }
      const currentPrio = ROLE_PRIORITY[u.roleUnlocked] || 1;
      const newPrio = ROLE_PRIORITY[log.roleUnlocked] || 1;
      if (newPrio >= currentPrio) {
        u.roleUnlocked = log.roleUnlocked;
      }
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.lastActive) - new Date(a.lastActive)
  );
}

export default function SecurityManagerTab({ showToast }) {
  const [config, setConfig] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentSession = getStoredSession();

  // Edit password modal state
  const [editingRole, setEditingRole] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadConfig = async () => {
    setIsLoading(true);
    try {
      const data = await getSecurityConfig();
      setConfig(data.roles);
      const logs = data.auditLog || [];
      setAdminUsers(data.adminUsers || deriveAdminUsers(logs));
    } catch (err) {
      console.error("Failed to load security config:", err);
      showToast("Error loading security config: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    pingAdminActivity();
    loadConfig();

    const interval = setInterval(() => {
      pingAdminActivity();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const openEditModal = (roleKey) => {
    setEditingRole(roleKey);
    setCurrentPassword("");
    setShowCurrentPassword(false);
    setNewPassword("");
    setShowNewPassword(false);
    setConfirmPassword("");
    setShowConfirmPassword(false);
    setErrorMsg("");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword.trim()) {
      setErrorMsg("Please enter the current/previous passcode.");
      return;
    }
    if (!newPassword.trim() || newPassword.trim().length < 6) {
      setErrorMsg("New passcode must be at least 6 characters long.");
      return;
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      setErrorMsg("New passcode and confirmation do not match.");
      return;
    }
    if (newPassword.trim() === currentPassword.trim()) {
      setErrorMsg("New passcode must be different from previous passcode.");
      return;
    }

    setIsUpdating(true);
    setErrorMsg("");

    try {
      const res = await updateRolePassword(
        editingRole,
        currentPassword.trim(),
        newPassword.trim()
      );
      showToast(res.message || "Role password updated successfully!");
      setEditingRole(null);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      await loadConfig();
    } catch (err) {
      setErrorMsg(err.message || "Failed to update password.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="security-loading-state">
        <RefreshCw size={24} className="animate-spin text-yellow-400" />
        <p>Loading security configuration & audit logs...</p>
      </div>
    );
  }

  return (
    <div className="security-tab-container">
      {/* Header */}
      <div className="security-header">
        <div>
          <h2 className="security-title">Admin Role Keys & Passwords</h2>
          <p className="security-subtitle">
            Manage the 4 access clearance passcodes and view live login activity.
          </p>
        </div>
        <button onClick={loadConfig} className="security-refresh-btn">
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 4 Roles Passwords Grid */}
      <div className="security-roles-grid">
        {config &&
          Object.entries(config).map(([key, role]) => {
            const Icon = ROLE_ICONS[key] || Lock;
            const colors = ROLE_COLORS[key] || ROLE_COLORS.global_admin;

            return (
              <div key={key} className="security-role-card">
                <div className="security-role-top">
                  <div className={`security-role-icon ${colors.bg} ${colors.border}`}>
                    <Icon size={20} className={colors.text} />
                  </div>
                  <span className={`security-role-badge ${colors.bg} ${colors.text} ${colors.border}`}>
                    {key.toUpperCase().replace("_", " ")}
                  </span>
                </div>

                <h3 className="security-role-name">{role.title}</h3>
                <p className="security-role-desc">{role.description}</p>

                <div className="security-role-meta">
                  <div className="meta-row">
                    <Clock size={12} className="text-zinc-500" />
                    <span>
                      Updated:{" "}
                      {role.updatedAt
                        ? new Date(role.updatedAt).toLocaleDateString()
                        : "Initial Setup"}
                    </span>
                  </div>
                  <div className="meta-row">
                    <User size={12} className="text-zinc-500" />
                    <span>By: {role.updatedBy || "system"}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openEditModal(key)}
                  className="security-edit-pass-btn"
                >
                  <Edit2 size={14} />
                  <span>Change Password</span>
                </button>
              </div>
            );
          })}
      </div>

      {/* Authorized Admins & Activity Section */}
      <div className="security-audit-section">
        <div className="audit-header">
          <div className="audit-header-title-group">
            <div className="audit-title-row">
              <Users size={20} className="text-yellow-400" />
              <h3 className="audit-title">Authorized Admins & Activity</h3>
            </div>
            <p className="text-xs text-zinc-400">
              Administrators with security clearance access, assigned roles, and live activity.
            </p>
          </div>
        </div>

        {adminUsers.length === 0 ? (
          <div className="audit-empty">No admin users found yet.</div>
        ) : (
          <div className="audit-table-wrapper">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Admin Identity</th>
                  <th>Role & Access</th>
                  <th>Last Active</th>
                  <th>Total Logins</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((user, idx) => {
                  const isCurrentAdmin =
                    Boolean(currentSession?.clerkName) &&
                    (user.clerkName?.toLowerCase() === currentSession.clerkName?.toLowerCase() ||
                      (user.clerkEmail &&
                        currentSession.clerkEmail &&
                        user.clerkEmail.toLowerCase() === currentSession.clerkEmail.toLowerCase()));

                  const isOnline =
                    isCurrentAdmin ||
                    (user.lastActive &&
                      Date.now() - new Date(user.lastActive).getTime() < 10 * 60 * 1000);

                  const displayRole =
                    (isCurrentAdmin && currentSession?.role === "global_admin") ||
                    user.clerkName?.toLowerCase().includes("shubham") ||
                    user.roleUnlocked === "global_admin"
                      ? "global_admin"
                      : user.roleUnlocked;

                  const RoleIcon = ROLE_ICONS[displayRole] || ShieldCheck;
                  const roleColor = ROLE_COLORS[displayRole] || ROLE_COLORS.global_admin;

                  return (
                    <tr key={user.clerkId || user.clerkEmail || idx}>
                      <td>
                        <div className="audit-user-cell">
                          <div className="admin-avatar-mini">
                            {user.clerkName ? (
                              user.clerkName.charAt(0).toUpperCase()
                            ) : (
                              <User size={14} />
                            )}
                          </div>
                          <div className="admin-info-col">
                            <div className="flex items-center">
                              <span className="font-semibold text-white">
                                {user.clerkName}
                              </span>
                              {isCurrentAdmin && (
                                <span className="current-user-tag">You</span>
                              )}
                            </div>
                            {user.clerkEmail && (
                              <span className="text-xs text-zinc-400">
                                {user.clerkEmail}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`audit-role-tag ${roleColor.border} ${roleColor.text} ${roleColor.bg}`}
                        >
                          <RoleIcon size={12} className={roleColor.text} />
                          {displayRole.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="admin-status-container">
                          <div className="admin-status-pill">
                            {isOnline ? (
                              <>
                                <span className="status-pulse-dot" />
                                <span className="text-xs font-bold text-emerald-400">
                                  Active Now
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="status-static-dot" />
                                <span className="text-xs text-zinc-300">
                                  Last active {formatTimeAgo(user.lastActive)}
                                </span>
                              </>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-500 font-mono">
                            {new Date(user.lastActive).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="text-xs text-zinc-400 bg-[#090a10] border border-[#1f2330] px-2.5 py-1 rounded-full font-medium">
                          {user.totalLogins} {user.totalLogins === 1 ? "login" : "logins"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Password Modal */}
      {editingRole && (
        <div className="password-modal-backdrop">
          <div className="password-modal-content">
            <div className="modal-header">
              <KeyRound size={22} className="text-yellow-400" />
              <h3>Update {config?.[editingRole]?.title} Password</h3>
            </div>
            <p className="modal-desc">
              To update this clearance passcode, please verify your current password first, then set the new password.
            </p>

            <form onSubmit={handlePasswordSubmit}>
              <div className="modal-input-group">
                <label>Current / Previous Passcode</label>
                <div className="password-input-wrapper">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter previous passcode..."
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    tabIndex={-1}
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="modal-input-group">
                <label>New Passcode (min. 6 characters)</label>
                <div className="password-input-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new passcode..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="modal-input-group">
                <label>Confirm New Passcode</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat new passcode..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="modal-error">
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setEditingRole(null)}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-save-btn"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Verifying & Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Authentication and Admin Clearance API Service
 */

const getCleanBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
  if (envUrl) {
    return envUrl.endsWith("/api") ? envUrl.slice(0, -4) : envUrl;
  }
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:5000";
  }
  return "";
};

const BASE_URL = getCleanBaseUrl();
const AUTH_API = `${BASE_URL}/api/auth`;

const TOKEN_KEY = "thirdeye_admin_token";
const SESSION_KEY = "thirdeye_admin_session";

export const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
};

export const getStoredSession = () => {
  if (typeof window === "undefined") return null;
  const raw =
    sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const saveAdminSession = (token, sessionData) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  // also mirror in localStorage for convenience during development/refresh
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
};

export const clearAdminSession = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SESSION_KEY);
};

export const getAuthHeaders = (isMultipart = false) => {
  const token = getStoredToken();
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

/**
 * Gate 2: Verify ID + Role Password
 */
export async function verifyAdminGate({
  clerkName,
  clerkId,
  clerkEmail,
  password,
}) {
  const payload = JSON.stringify({
    clerkName,
    clerkId,
    clerkEmail,
    password,
  });

  let res = await fetch(`${AUTH_API}/verify-gate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });

  if (res.status === 404) {
    res = await fetch(`${AUTH_API}/verify_gate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to verify admin clearance.");
  }

  saveAdminSession(data.token, {
    role: data.role,
    roleTitle: data.roleTitle,
    clerkName: data.clerkName,
  });

  return data;
}

/**
 * Global Admin: Load role configs & recent audit log
 */
export async function getSecurityConfig() {
  const res = await fetch(`${AUTH_API}/security-config`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to fetch security configurations.");
  }
  return data;
}

/**
 * Global Admin: Update one of the 4 role passwords
 */
export async function updateRolePassword(roleKey, currentPassword, newPassword) {
  const res = await fetch(`${AUTH_API}/update-role-password`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ roleKey, currentPassword, newPassword }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to update role password.");
  }
  return data;
}

/**
 * Ping backend to refresh admin's active status
 */
export async function pingAdminActivity() {
  try {
    await fetch(`${AUTH_API}/activity-ping`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
  } catch {}
}

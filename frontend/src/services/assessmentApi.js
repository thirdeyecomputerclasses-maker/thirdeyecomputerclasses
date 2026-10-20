/**
 * Assessment API Service
 * Handles fetching, submission, grading, and admin CRUD for skill assessments.
 */

import { getAuthHeaders } from "./authApi";

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
const API_BASE = `${BASE_URL}/api/assessments`;

/**
 * Fetch all active skill assessments for public hub
 */
export async function getAssessments(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "all") query.append("category", params.category);
  if (params.search) query.append("search", params.search);
  if (params.activeOnly !== undefined) query.append("activeOnly", params.activeOnly);

  const url = query.toString() ? `${API_BASE}?${query.toString()}` : API_BASE;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch assessments (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Fetch single assessment for test taking (answers omitted)
 */
export async function getAssessment(slugOrId) {
  const res = await fetch(`${API_BASE}/${encodeURIComponent(slugOrId)}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to load assessment (HTTP ${res.status})`);
  }
  return await res.json();
}

/**
 * Submit test answers for grading, topic breakdown, and course recommendations
 */
export async function submitAssessment(slugOrId, answers, studentInfo = null) {
  const res = await fetch(`${API_BASE}/${encodeURIComponent(slugOrId)}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers, studentInfo }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to submit test (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Fetch assessment statistics for dashboard
 */
export async function getAssessmentStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Admin: Fetch all assessments with complete question answer keys
 */
export async function getAdminAssessments() {
  const res = await fetch(`${BASE_URL}/api/admin/assessments`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch admin assessments (HTTP ${res.status})`);
  }
  return await res.json();
}

/**
 * Admin: Create new assessment test
 */
export async function createAssessment(data) {
  const headers = getAuthHeaders();
  headers["Content-Type"] = "application/json";

  const res = await fetch(API_BASE, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to create assessment (HTTP ${res.status})`);
  }
  return await res.json();
}

/**
 * Admin: Update existing assessment test & questions
 */
export async function updateAssessment(id, data) {
  const headers = getAuthHeaders();
  headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to update assessment (HTTP ${res.status})`);
  }
  return await res.json();
}

/**
 * Admin: Delete assessment test
 */
export async function deleteAssessment(id) {
  const headers = getAuthHeaders();

  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to delete assessment (HTTP ${res.status})`);
  }
  return await res.json();
}

/**
 * Submission API Service
 * Dispatches website form submissions to MongoDB and retrieves them for Admin panel.
 */

const getCleanBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
  if (envUrl) {
    return envUrl.endsWith("/api") ? envUrl.slice(0, -4) : envUrl;
  }
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:5000";
  }
  return "";
};

const BASE_URL = getCleanBaseUrl();
const API_BASE = `${BASE_URL}/api/submissions`;

if (typeof window !== "undefined" && !BASE_URL && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
  console.warn(
    "[submissionApi] VITE_API_URL is not set! API calls are defaulting to " +
      window.location.origin +
      ". Please configure VITE_API_URL in Netlify site environment variables and redeploy."
  );
}

/**
 * Submit any website form to MongoDB (supports optional resume file upload to ImageKit)
 * @param {Object|FormData} submissionData
 * @param {File|null} resumeFile
 */
export async function createSubmission(submissionData, resumeFile = null) {
  const url = `${API_BASE}`;
  let body;
  let headers = {};

  if (resumeFile || submissionData instanceof FormData) {
    if (submissionData instanceof FormData) {
      body = submissionData;
    } else {
      const fd = new FormData();
      Object.entries(submissionData).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          fd.append(k, typeof v === "object" && !(v instanceof File) ? JSON.stringify(v) : v);
        }
      });
      if (resumeFile) {
        fd.append("resume", resumeFile);
      }
      body = fd;
    }
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(submissionData);
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "Failed to submit form inquiry.");
  }
  return json.data;
}

import { getAuthHeaders } from "./authApi";

/**
 * Fetch all form submissions with optional filtering
 * @param {Object} params { formType, status, search }
 */
export async function getSubmissions(params = {}) {
  const url = new URL(API_BASE, window.location.origin);

  if (params.formType && params.formType !== "all") {
    url.searchParams.set("formType", params.formType);
  }
  if (params.status && params.status !== "all") {
    url.searchParams.set("status", params.status);
  }
  if (params.search) {
    url.searchParams.set("search", params.search);
  }

  const res = await fetch(url.toString(), {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch submissions (${res.status})`);
  }

  const json = await res.json();
  return json.data || [];
}

/**
 * Fetch aggregated submission stats for admin metrics
 */
export async function getSubmissionStats() {
  const res = await fetch(`${API_BASE}/stats`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch stats (${res.status})`);
  }
  const json = await res.json();
  return json.data || { total: 0, contact: 0, franchise: 0, job_application: 0, newSubmissions: 0 };
}

/**
 * Update the status and/or admin notes for a submission
 * @param {string} id
 * @param {string} status 'new' | 'contacted' | 'resolved' | 'in_review'
 * @param {string} adminNotes
 */
export async function updateSubmissionStatus(id, status, adminNotes = null) {
  const res = await fetch(`${API_BASE}/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status, adminNotes }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "Failed to update submission status.");
  }
  return json.data;
}

/**
 * Delete a submission from MongoDB
 * @param {string} id
 */
export async function deleteSubmission(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || "Failed to delete submission.");
  }
  return true;
}


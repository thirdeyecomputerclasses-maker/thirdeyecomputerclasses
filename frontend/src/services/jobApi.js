/**
 * Job API Service
 * Handles MongoDB Job CRUD operations for the Admin console and public Job views.
 * Data is managed in MongoDB Atlas.
 */

import { JOB_OPENINGS as FALLBACK_JOBS, getJobBySlug as fallbackGetBySlug } from "../pages/placements/jobsData";
import { getAuthHeaders } from "./authApi";

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
const API_BASE = `${BASE_URL}/api/jobs`;

if (typeof window !== "undefined" && !BASE_URL && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
  console.warn(
    "[jobApi] VITE_API_URL is not set! API calls are defaulting to " +
      window.location.origin +
      ". Please configure VITE_API_URL in Netlify site environment variables and redeploy."
  );
}

/**
 * Fetch all jobs from MongoDB
 */
export async function getJobs(params = {}) {
  try {
    const url = new URL(API_BASE, window.location.origin);
    if (params.category && params.category !== "all") {
      url.searchParams.set("category", params.category);
    }
    if (params.jobType && params.jobType !== "all") {
      url.searchParams.set("jobType", params.jobType);
    }
    if (params.location && params.location !== "all") {
      url.searchParams.set("location", params.location);
    }
    if (params.search) {
      url.searchParams.set("search", params.search);
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      console.warn(`[jobApi] Backend returned ${res.status}, falling back to initial data`);
      return FALLBACK_JOBS;
    }
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : FALLBACK_JOBS;
  } catch (err) {
    console.warn("[jobApi] Network error fetching jobs, using fallback dataset:", err.message);
    return FALLBACK_JOBS;
  }
}

/**
 * Fetch single job by slug or ID
 */
export async function getJobBySlug(slug) {
  try {
    if (!slug) return null;
    const res = await fetch(`${API_BASE}/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && (data._id || data.id)) return data;
    }
    return fallbackGetBySlug(slug);
  } catch (err) {
    console.warn("[jobApi] Network error fetching single job:", err.message);
    return fallbackGetBySlug(slug);
  }
}

/**
 * Create a new job opening in MongoDB
 */
export async function createJob(jobData) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(jobData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Failed to create job (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Update an existing job in MongoDB
 */
export async function updateJob(id, jobData) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(jobData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Failed to update job (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Delete a job from MongoDB
 */
export async function deleteJob(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `Failed to delete job (HTTP ${res.status})`);
  }

  return await res.json();
}


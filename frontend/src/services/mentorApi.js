/**
 * Mentor API Service
 * Handles CRUD operations and ImageKit CDN uploads for Mentors & Faculty.
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
const API_BASE = `${BASE_URL}/api/mentors`;

export async function getMentors(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "all") {
    query.append("category", params.category);
  }
  if (params.search) {
    query.append("search", params.search);
  }
  if (params.activeOnly) {
    query.append("activeOnly", "true");
  }

  const url = query.toString() ? `${API_BASE}?${query.toString()}` : API_BASE;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch mentors (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getMentor(id) {
  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch mentor (HTTP ${res.status})`);
  }
  return await res.json();
}

export async function createMentor(formData) {
  const isMultipart = formData instanceof FormData;
  const headers = getAuthHeaders(isMultipart);

  const res = await fetch(API_BASE, {
    method: "POST",
    headers,
    body: isMultipart ? formData : JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to create mentor card (HTTP ${res.status})`);
  }
  const data = await res.json();
  return data.mentor;
}

export async function updateMentor(id, formData) {
  const isMultipart = formData instanceof FormData;
  const headers = getAuthHeaders(isMultipart);

  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers,
    body: isMultipart ? formData : JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to update mentor card (HTTP ${res.status})`);
  }
  const data = await res.json();
  return data.mentor;
}

export async function deleteMentor(id) {
  const headers = getAuthHeaders();
  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to delete mentor card (HTTP ${res.status})`);
  }
  return await res.json();
}


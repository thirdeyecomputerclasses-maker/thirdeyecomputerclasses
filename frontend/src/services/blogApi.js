/**
 * Blog API Service
 * Handles CRUD operations, ImageKit uploads, and query fetching for Blogs CMS.
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
const API_BASE = `${BASE_URL}/api/blogs`;

/**
 * Fetch all blogs with optional filtering
 */
export async function getBlogs(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== "all") query.append("category", params.category);
  if (params.search) query.append("search", params.search);
  if (params.status && params.status !== "all") query.append("status", params.status);
  if (params.tag && params.tag !== "all") query.append("tag", params.tag);
  if (params.page) query.append("page", params.page);
  if (params.limit) query.append("limit", params.limit);

  const url = query.toString() ? `${API_BASE}?${query.toString()}` : API_BASE;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch blogs (HTTP ${res.status})`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.blogs || [];
}

/**
 * Fetch a single blog by its ID or Slug
 */
export async function getBlog(idOrSlug) {
  const res = await fetch(`${API_BASE}/${encodeURIComponent(idOrSlug)}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch blog post (HTTP ${res.status})`);
  }
  return await res.json();
}

/**
 * Fetch blog analytics & overview stats
 */
export async function getBlogStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Create a new blog post
 * Supports either FormData (with file) or JSON object
 */
export async function createBlog(payload) {
  const headers = getAuthHeaders();
  let body;

  if (payload instanceof FormData) {
    body = payload;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  }

  const res = await fetch(API_BASE, {
    method: "POST",
    headers,
    body,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to create blog (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Update an existing blog post
 */
export async function updateBlog(id, payload) {
  const headers = getAuthHeaders();
  let body;

  if (payload instanceof FormData) {
    body = payload;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  }

  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers,
    body,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to update blog (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Delete a blog post
 */
export async function deleteBlog(id) {
  const headers = getAuthHeaders();
  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to delete blog (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Upload an inline image to ImageKit
 */
export async function uploadBlogImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/upload-image`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Image upload failed (HTTP ${res.status})`);
  }

  return await res.json();
}

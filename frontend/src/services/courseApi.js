/**
 * Course API Service
 * Communicates with the Express backend for MongoDB Course CRUD operations and ImageKit image uploads.
 * All course data is stored strictly in MongoDB Atlas.
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

import { getAuthHeaders } from "./authApi";

const BASE_URL = getCleanBaseUrl();
const API_BASE = `${BASE_URL}/api/courses`;
const UPLOAD_API = `${BASE_URL}/api/upload`;

if (typeof window !== "undefined" && !BASE_URL && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
  console.warn(
    "[courseApi] VITE_API_URL is not set! API calls are defaulting to " +
      window.location.origin +
      ". If your frontend is on Netlify and backend is on Render, configure VITE_API_URL in Netlify site environment variables and redeploy."
  );
}

/**
 * Check backend health status
 */
export async function getHealthStatus() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Fetch all courses directly from MongoDB
 */
export async function getCourses() {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    let msg = `Failed to fetch courses from server (HTTP ${res.status})`;
    if (res.status === 404 && !BASE_URL) {
      msg += `. VITE_API_URL is missing. Please set VITE_API_URL to your Render backend URL in Netlify and redeploy.`;
    }
    throw new Error(msg);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : data.courses || [];
}

/**
 * Fetch single course by slug or ID from MongoDB
 */
export async function getCourseBySlug(slug) {
  const res = await fetch(`${API_BASE}/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch course details (HTTP ${res.status})`);
  }
  return await res.json();
}

/**
 * Upload an image strictly to ImageKit CDN via backend
 */
export async function uploadImageToImageKit(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(UPLOAD_API, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: formData,
  });

  if (!res.ok) {
    let errMsg = `Image upload failed (HTTP ${res.status})`;
    try {
      const errData = await res.json();
      if (errData.error) errMsg = errData.error;
    } catch {
      if (res.status === 404 && !BASE_URL) {
        errMsg = `Image upload failed (HTTP 404 at ${UPLOAD_API}). VITE_API_URL is not configured in Netlify.`;
      }
    }
    throw new Error(errMsg);
  }

  const data = await res.json();
  return data.url || data.secure_url;
}

export const uploadImageToCloudinary = uploadImageToImageKit;

/**
 * Create a new course in MongoDB
 */
export async function createCourse(courseData, imageFile = null) {
  let imageUrl = courseData.image || "";

  if (imageFile) {
    imageUrl = await uploadImageToImageKit(imageFile);
  }

  const payload = {
    ...courseData,
    image: imageUrl,
    createdAt: new Date().toISOString(),
  };

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errMsg = `Failed to create course in MongoDB (HTTP ${res.status})`;
    try {
      const errData = await res.json();
      if (errData.error) errMsg = `${errData.error}${errData.message ? `: ${errData.message}` : ""}`;
    } catch {
      if (res.status === 404) {
        errMsg = `Failed to create course in MongoDB (HTTP 404 at ${API_BASE}). ${
          !BASE_URL
            ? "VITE_API_URL is not set in Netlify site settings. Please set VITE_API_URL to your Render backend URL and trigger a redeploy."
            : "Please verify that your Render backend URL is correct and the service is active."
        }`;
      }
    }
    throw new Error(errMsg);
  }

  return await res.json();
}

/**
 * Update an existing course in MongoDB
 */
export async function updateCourse(id, courseData, imageFile = null) {
  let imageUrl = courseData.image;

  if (imageFile) {
    imageUrl = await uploadImageToImageKit(imageFile);
  }

  const payload = {
    ...courseData,
    image: imageUrl,
    updatedAt: new Date().toISOString(),
  };

  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let errMsg = `Failed to update course in MongoDB (HTTP ${res.status})`;
    try {
      const errData = await res.json();
      if (errData.error) errMsg = `${errData.error}${errData.message ? `: ${errData.message}` : ""}`;
    } catch {
      if (res.status === 404 && !BASE_URL) {
        errMsg = `Failed to update course in MongoDB (HTTP 404 at ${API_BASE}/${id}). VITE_API_URL is missing in Netlify.`;
      }
    }
    throw new Error(errMsg);
  }

  return await res.json();
}

/**
 * Delete a course from MongoDB
 */
export async function deleteCourse(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    let errMsg = `Failed to delete course from MongoDB (HTTP ${res.status})`;
    try {
      const errData = await res.json();
      if (errData.error) errMsg = `${errData.error}${errData.message ? `: ${errData.message}` : ""}`;
    } catch {
      if (res.status === 404 && !BASE_URL) {
        errMsg = `Failed to delete course from MongoDB (HTTP 404 at ${API_BASE}/${id}). VITE_API_URL is missing in Netlify.`;
      }
    }
    throw new Error(errMsg);
  }

  return true;
}

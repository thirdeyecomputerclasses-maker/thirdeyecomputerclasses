/**
 * Media API Service
 * Manages existing section media slots across the 5 supported pages:
 * 1. About Us (about)
 * 2. Franchise (franchise)
 * 3. Jobs and Placement (placements)
 * 4. Campus Memories (memories)
 * 5. Student Reviews (reviews)
 */

const getCleanBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
  if (envUrl) {
    return envUrl.endsWith("/api") ? envUrl.slice(0, -4) : envUrl;
  }
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ) {
    return "http://localhost:5000";
  }
  return "";
};

const BASE_URL = getCleanBaseUrl();
const MEDIA_API = `${BASE_URL}/api/media`;

export async function fetchMedia({ page = "all", type = "all" } = {}) {
  const queryParams = new URLSearchParams();
  if (page && page !== "all") queryParams.append("page", page);
  if (type && type !== "all") queryParams.append("type", type);

  const queryString = queryParams.toString();
  const url = queryString ? `${MEDIA_API}?${queryString}` : MEDIA_API;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load media (HTTP ${res.status})`);
  }
  const result = await res.json();
  return result.data || [];
}

/**
 * Replace an existing section slot photo or video by uploading a new file to ImageKit
 */
export async function replaceSlotFile({ slotKey, file, onProgress }) {
  const formData = new FormData();
  formData.append("file", file);

  if (onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${MEDIA_API}/slot/${slotKey}/upload`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data.data);
          } catch {
            resolve(null);
          }
        } else {
          try {
            const errData = JSON.parse(xhr.responseText);
            reject(new Error(errData.error || errData.message || `Upload failed (HTTP ${xhr.status})`));
          } catch {
            reject(new Error(`Upload failed (HTTP ${xhr.status})`));
          }
        }
      };

      xhr.onerror = () => reject(new Error("Network error during file upload to ImageKit"));
      xhr.send(formData);
    });
  }

  const res = await fetch(`${MEDIA_API}/slot/${slotKey}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let errMsg = `Upload failed (HTTP ${res.status})`;
    try {
      const data = await res.json();
      if (data.error) errMsg = data.error;
    } catch {}
    throw new Error(errMsg);
  }

  const data = await res.json();
  return data.data;
}

/**
 * Replace an existing section slot photo or video with a direct URL (e.g. YouTube, external CDN, or ImageKit URL)
 */
export async function replaceSlotUrl({ slotKey, url, thumbnailUrl = "" }) {
  const res = await fetch(`${MEDIA_API}/slot/${slotKey}/url`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      thumbnailUrl: thumbnailUrl || url,
    }),
  });

  if (!res.ok) {
    let errMsg = `Failed to update slot URL (HTTP ${res.status})`;
    try {
      const data = await res.json();
      if (data.error) errMsg = data.error;
    } catch {}
    throw new Error(errMsg);
  }

  const data = await res.json();
  return data.data;
}

/**
 * Reset a section slot back to its original default asset
 */
export async function resetSlotToDefault(slotKey) {
  const res = await fetch(`${MEDIA_API}/slot/${slotKey}/reset`, {
    method: "POST",
  });

  if (!res.ok) {
    let errMsg = `Failed to reset slot (HTTP ${res.status})`;
    try {
      const data = await res.json();
      if (data.error) errMsg = data.error;
    } catch {}
    throw new Error(errMsg);
  }

  const data = await res.json();
  return data.data;
}

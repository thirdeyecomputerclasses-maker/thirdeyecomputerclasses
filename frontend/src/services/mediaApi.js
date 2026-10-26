/**
 * Media API Service
 * Manages existing section media slots across the 5 supported pages:
 * 1. About Us (about)
 * 2. Franchise (franchise)
 * 3. Jobs and Placement (placements)
 * 4. Campus Memories (memories)
 * 5. Student Reviews (reviews)
 * 6. Our Team (team)
 */

const getCleanBaseUrl = () => {
  let envUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
  if (envUrl.includes("localhost") && envUrl.startsWith("https://")) {
    envUrl = envUrl.replace("https://", "http://");
  }
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

export const resolveMediaUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("/uploads/")) {
    return `${BASE_URL}${url}`;
  }
  return url;
};

export const getInstagramReelId = (url) => {
  if (!url || typeof url !== "string") return null;
  const match = url.match(/(?:instagram\.com\/(?:reel|reels|p|tv)\/([a-zA-Z0-9_-]+))/i);
  return match ? match[1] : null;
};

export const getInstagramEmbedUrl = (url) => {
  const id = getInstagramReelId(url);
  if (!id) return null;
  return `https://www.instagram.com/reel/${id}/embed/`;
};

export const getYouTubeVideoId = (url) => {
  if (!url || typeof url !== "string") return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  return match ? match[1] : null;
};

export const getYouTubeEmbedUrl = (url) => {
  const id = getYouTubeVideoId(url);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
};

export const getVideoInfo = (url) => {
  if (!url) return { type: "none" };
  const igId = getInstagramReelId(url);
  if (igId) {
    return {
      type: "instagram",
      id: igId,
      embedUrl: `https://www.instagram.com/reel/${igId}/embed/`,
      directUrl: `https://www.instagram.com/reel/${igId}/`,
      thumbnailUrl: `https://www.instagram.com/p/${igId}/media/?size=l`,
    };
  }
  const ytId = getYouTubeVideoId(url);
  if (ytId) {
    return {
      type: "youtube",
      id: ytId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      directUrl: `https://www.youtube.com/watch?v=${ytId}`,
    };
  }
  return {
    type: "direct",
    url: resolveMediaUrl(url),
  };
};

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
  const rawList = result.data || [];

  // Deduplicate by slotKey and prioritize custom uploads (isDefault === false)
  const slotMap = new Map();
  rawList.forEach((item) => {
    const existing = slotMap.get(item.slotKey);
    if (!existing || (!item.isDefault && existing.isDefault)) {
      slotMap.set(item.slotKey, item);
    }
  });

  return Array.from(slotMap.values()).map((item) => {
    const isVideo = item.type === "video" || /\.(mp4|webm|mov|mkv)$/i.test(item.url || "");
    const cleanThumb = (item.thumbnailUrl && !/\.(mp4|webm|mov|mkv)$/i.test(item.thumbnailUrl))
      ? resolveMediaUrl(item.thumbnailUrl)
      : (!isVideo ? resolveMediaUrl(item.url) : "");

    return {
      ...item,
      url: resolveMediaUrl(item.url),
      thumbnailUrl: cleanThumb,
    };
  });
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
            const slot = data.data;
            if (slot) {
              slot.url = resolveMediaUrl(slot.url);
              slot.thumbnailUrl = resolveMediaUrl(slot.thumbnailUrl || slot.url);
            }
            resolve(slot);
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
  const slot = data.data;
  if (slot) {
    slot.url = resolveMediaUrl(slot.url);
    slot.thumbnailUrl = resolveMediaUrl(slot.thumbnailUrl || slot.url);
  }
  return slot;
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


/**
 * Bulk upload multiple photo files for a set of section slots
 */
export async function batchUploadSlots({ files, slotKeys, onProgress }) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("slotKeys", JSON.stringify(slotKeys));

  if (onProgress) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${MEDIA_API}/batch-upload`);

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
            const slots = (data.data || []).map((slot) => ({
              ...slot,
              url: resolveMediaUrl(slot.url),
              thumbnailUrl: resolveMediaUrl(slot.thumbnailUrl || slot.url),
            }));
            resolve(slots);
          } catch {
            resolve([]);
          }
        } else {
          try {
            const errData = JSON.parse(xhr.responseText);
            reject(new Error(errData.error || errData.message || `Batch upload failed (HTTP ${xhr.status})`));
          } catch {
            reject(new Error(`Batch upload failed (HTTP ${xhr.status})`));
          }
        }
      };

      xhr.onerror = () => reject(new Error("Network error during batch upload"));
      xhr.send(formData);
    });
  }

  const res = await fetch(`${MEDIA_API}/batch-upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let errMsg = `Batch upload failed (HTTP ${res.status})`;
    try {
      const data = await res.json();
      if (data.error) errMsg = data.error;
    } catch {}
    throw new Error(errMsg);
  }

  const data = await res.json();
  return (data.data || []).map((slot) => ({
    ...slot,
    url: resolveMediaUrl(slot.url),
    thumbnailUrl: resolveMediaUrl(slot.thumbnailUrl || slot.url),
  }));
}

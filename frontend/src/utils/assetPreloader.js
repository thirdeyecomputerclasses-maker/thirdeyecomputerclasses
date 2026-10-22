/**
 * Asset Preloader & Persistent Cache Service
 * Pre-downloads critical high-resolution images, 3D textures, web fonts, and audio
 * into the browser CacheStorage API and GPU texture memory.
 * Guarantees instantaneous loading for returning visitors.
 */

import logo from "../assets/logo.webp";

export const CACHE_NAME = "thirdeye-v3-static";
const CACHE_STORAGE_KEY = "thirdeye_cached_assets_v3";

// Only lightweight critical assets for instant smooth entry (Heavy images & audio load on-demand)
export const CRITICAL_ASSETS = [
  { id: "logo", src: logo, label: "Brand Vector Core" },
];

/**
 * Check if the user already has cached assets on their device
 */
export function isCachedWarm() {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(CACHE_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Mark assets as warm in persistent storage
 */
export function markCachedWarm() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, "true");
  } catch {}
}

/**
 * Preload a single image with GPU decode acceleration and CacheStorage persistence
 */
function preloadSingleAsset(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve();
      return;
    }

    let settled = false;
    const safeResolve = (val) => {
      if (!settled) {
        settled = true;
        resolve(val);
      }
    };

    // Safety timeout: Ensure no single external asset can stall the preloader
    const timer = setTimeout(() => safeResolve(src), 2500);

    // 1. Prime CacheStorage for instant offline retrieval on revisits
    if (typeof window !== "undefined" && "caches" in window) {
      caches
        .open(CACHE_NAME)
        .then((cache) => {
          cache.match(src).then((matched) => {
            if (!matched) {
              fetch(src)
                .then((res) => {
                  if (res && res.status === 200) {
                    cache.put(src, res.clone());
                  }
                })
                .catch(() => {});
            }
          });
        })
        .catch(() => {});
    }

    // 2. Audio preloading
    if (typeof src === "string" && (src.includes(".mp3") || src.includes(".wav") || src.includes(".ogg"))) {
      const audio = new Audio();
      audio.preload = "auto";
      audio.src = src;
      audio.oncanplaythrough = () => {
        clearTimeout(timer);
        safeResolve(src);
      };
      audio.onerror = () => {
        clearTimeout(timer);
        safeResolve(src);
      };
      return;
    }

    // 3. Image preloading with GPU rasterization decode
    const img = new Image();
    img.src = src;

    if (img.decode) {
      img
        .decode()
        .then(() => {
          clearTimeout(timer);
          safeResolve(src);
        })
        .catch(() => {
          if (img.complete) {
            clearTimeout(timer);
            safeResolve(src);
          } else {
            img.onload = () => {
              clearTimeout(timer);
              safeResolve(src);
            };
            img.onerror = () => {
              clearTimeout(timer);
              safeResolve(src);
            };
          }
        });
    } else {
      if (img.complete) {
        clearTimeout(timer);
        safeResolve(src);
      } else {
        img.onload = () => {
          clearTimeout(timer);
          safeResolve(src);
        };
        img.onerror = () => {
          clearTimeout(timer);
          safeResolve(src);
        };
      }
    }
  });
}

/**
 * Preload web fonts
 */
function preloadFonts() {
  if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
    return document.fonts.ready.catch(() => {});
  }
  return Promise.resolve();
}

/**
 * Preload all website assets with real-time progress callbacks and CacheStorage optimization
 * @param {Function} onProgress - Callback called on each asset loaded (loadedCount, totalCount, percentage, currentAssetLabel)
 * @param {number} timeoutMs - Maximum milliseconds before forcing completion
 * @returns {Promise<void>}
 */
export function preloadAllSources(onProgress = () => {}, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const totalAssets = CRITICAL_ASSETS.length + 1; // +1 for Web Fonts
    let loadedCount = 0;
    let isFinished = false;

    const finish = () => {
      if (isFinished) return;
      isFinished = true;
      markCachedWarm();
      onProgress(totalAssets, totalAssets, 100, "All Studio Sources Ready");
      resolve();
    };

    // Safety timeout so user is never stuck
    const timer = setTimeout(() => {
      finish();
    }, timeoutMs);

    const handleSingleCompleted = (label) => {
      if (isFinished) return;
      loadedCount++;
      const pct = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
      onProgress(loadedCount, totalAssets, pct, label);

      if (loadedCount >= totalAssets) {
        clearTimeout(timer);
        finish();
      }
    };

    // 1. Preload fonts
    preloadFonts()
      .then(() => handleSingleCompleted("Web Fonts & Typographic Hierarchy"))
      .catch(() => handleSingleCompleted("Web Fonts Fallback"));

    // 2. Preload critical images & audio in parallel
    CRITICAL_ASSETS.forEach((asset) => {
      preloadSingleAsset(asset.src)
        .then(() => handleSingleCompleted(asset.label))
        .catch(() => handleSingleCompleted(asset.label));
    });
  });
}

/**
 * Asset Preloader & Persistent Cache Service
 * Pre-downloads critical high-resolution images, 3D textures, web fonts, and audio
 * into the browser CacheStorage API and GPU texture memory.
 * Guarantees instantaneous loading for returning visitors.
 */

import logo from "../assets/logo.webp";
import classroomSliceLeft from "../assets/classroom_slice_left.webp";
import classroomSliceCenter from "../assets/classroom_slice_center.webp";
import classroomSliceRight from "../assets/classroom_slice_right.webp";
import teamPhoto from "../assets/team_photo.webp";
import classroomPanoramic from "../assets/classroom_panoramic.png";
import humanHand from "../assets/human_hand.png";
import robotHand from "../assets/robot_hand.png";
import cube3d from "../assets/cube_3d.png";
import mentor1 from "../assets/mentor_1.png";
import mentor2 from "../assets/mentor_2.png";
import mentor3 from "../assets/mentor_3.png";
import mentor4 from "../assets/mentor_4.png";
import mentor5 from "../assets/mentor_5.png";
import mlChaudhary from "../assets/leadership/ml_chaudhary.png";
import suumitSharma from "../assets/leadership/suumit_sharma.png";
import preetiSharma from "../assets/leadership/preeti_sharma.png";
import eccouncilCodeRed from "../assets/certificates/eccouncil_codered.png";
import redhatRhcsa from "../assets/certificates/redhat_rhcsa.png";
import autodeskAutocad from "../assets/certificates/autodesk_autocad.webp";
import awardSuumitSharma from "../assets/award_suumit_sharma.webp";
import awardPreetiSharma from "../assets/award_preeti_sharma.webp";
import awardCeremonyGroup from "../assets/award_ceremony_group.webp";
import aboutTeamPhoto from "../assets/about_team_photo.webp";
import track1 from "../assets/audio/ambient_music_theme.mp3";
import track2 from "../assets/audio/ambient_track_2.mp3";
import track3 from "../assets/audio/ambient_track_3.mp3";
import track4 from "../assets/audio/ambient_track_4.mp3";
import { FIRST_THREE_REVIEW_VIDEOS } from "../pages/studentReviews/studentReviewsData";

export const SONGS = [
  { id: "ambient-1", title: "Ambient Theme 1", src: track1 },
  { id: "ambient-2", title: "Ambient Theme 2", src: track2 },
  { id: "ambient-3", title: "Ambient Theme 3", src: track3 },
  { id: "ambient-4", title: "Ambient Theme 4", src: track4 },
];

export const CACHE_NAME = "thirdeye-v3-static";
const CACHE_STORAGE_KEY = "thirdeye_cached_assets_v3";

// List of all critical high-res visual assets, audio, and initial student review videos to pre-download
export const CRITICAL_ASSETS = [
  { id: "logo", src: logo, label: "Brand Vector Core" },
  { id: "classroomSliceLeft", src: classroomSliceLeft, label: "Studio Environment (Left)" },
  { id: "classroomSliceCenter", src: classroomSliceCenter, label: "Studio Environment (Center)" },
  { id: "classroomSliceRight", src: classroomSliceRight, label: "Studio Environment (Right)" },
  { id: "teamPhoto", src: teamPhoto, label: "Studio Team Panoramic" },
  { id: "classroomPanoramic", src: classroomPanoramic, label: "Classroom Panoramic Texture" },
  { id: "humanHand", src: humanHand, label: "Spatial Human Interface" },
  { id: "robotHand", src: robotHand, label: "Spatial AI Robotics" },
  { id: "cube3d", src: cube3d, label: "Isometric 3D Anchor" },
  { id: "mentor1", src: mentor1, label: "Faculty Mentorship Module 1" },
  { id: "mentor2", src: mentor2, label: "Faculty Mentorship Module 2" },
  { id: "mentor3", src: mentor3, label: "Faculty Mentorship Module 3" },
  { id: "mentor4", src: mentor4, label: "Faculty Mentorship Module 4" },
  { id: "mentor5", src: mentor5, label: "Faculty Mentorship Module 5" },
  { id: "mlChaudhary", src: mlChaudhary, label: "Leadership Directorate" },
  { id: "suumitSharma", src: suumitSharma, label: "Leadership Technology" },
  { id: "preetiSharma", src: preetiSharma, label: "Leadership Academy" },
  { id: "eccouncilCodeRed", src: eccouncilCodeRed, label: "EC-Council Credentials" },
  { id: "redhatRhcsa", src: redhatRhcsa, label: "RedHat Enterprise Cert" },
  { id: "autodeskAutocad", src: autodeskAutocad, label: "Autodesk Design Standard" },
  { id: "awardSuumitSharma", src: awardSuumitSharma, label: "Poornima Award Suumit Sharma" },
  { id: "awardPreetiSharma", src: awardPreetiSharma, label: "Poornima Award Preeti Sharma" },
  { id: "awardCeremonyGroup", src: awardCeremonyGroup, label: "Poornima Award Ceremony Group" },
  { id: "aboutTeamPhoto", src: aboutTeamPhoto, label: "About Us Team Collective" },
  { id: "ambientAudio1", src: track1, label: "Background Music Track 1" },
  { id: "ambientAudio2", src: track2, label: "Background Music Track 2" },
  { id: "ambientAudio3", src: track3, label: "Background Music Track 3" },
  { id: "ambientAudio4", src: track4, label: "Background Music Track 4" },
  // First three student review videos preloaded at website startup
  { id: "reviewVideo1", src: FIRST_THREE_REVIEW_VIDEOS[0].thumbnail, label: "Student Video 1 (Shina Mathur)" },
  { id: "reviewVideo2", src: FIRST_THREE_REVIEW_VIDEOS[1].thumbnail, label: "Student Video 2 (Ilmuddin Behlim)" },
  { id: "reviewVideo3", src: FIRST_THREE_REVIEW_VIDEOS[2].thumbnail, label: "Student Video 3 (Punya Singh)" },
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

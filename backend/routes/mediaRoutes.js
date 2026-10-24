const express = require("express");
const multer = require("multer");
const {
  getMedia,
  updateSlotFile,
  updateSlotUrl,
  resetSlot,
  deleteMedia,
  batchUploadSlots,
} = require("../controllers/mediaController");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB to support high-def videos & photos
  },
  fileFilter: (req, file, cb) => {
    const isImageOrVideoMime = file.mimetype && (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/"));
    const isImageOrVideoExt = /\.(jpe?g|png|webp|gif|avif|bmp|svg|mp4|webm|mov|mkv)$/i.test(file.originalname || "");
    if (isImageOrVideoMime || isImageOrVideoExt) {
      cb(null, true);
    } else {
      cb(new Error("Only photo and video files are supported"), false);
    }
  },
});

// Slot-based media routes (only existing section photos & videos can be changed)
router.get("/media", getMedia);
router.post("/media/slot/:slotKey/upload", upload.single("file"), updateSlotFile);
router.post("/media/batch-upload", upload.array("files", 50), batchUploadSlots);
router.put("/media/slot/:slotKey/url", updateSlotUrl);
router.post("/media/slot/:slotKey/reset", resetSlot);
router.delete("/media/:id", deleteMedia);

module.exports = router;

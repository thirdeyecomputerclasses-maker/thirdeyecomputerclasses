const fs = require("fs");
const path = require("path");
const MediaStore = require("../storage/mediaStore");
const { isImageKitConfigured, uploadFileToImageKit, deleteFromImageKit } = require("../config/imagekit");

const getMedia = async (req, res) => {
  try {
    const { page, type } = req.query;
    const media = await MediaStore.getAll({ page, type });
    res.json({
      success: true,
      count: media.length,
      data: media,
      imagekitConnected: isImageKitConfigured(),
    });
  } catch (err) {
    console.error("Error fetching media:", err);
    res.status(500).json({ success: false, error: "Failed to fetch media", message: err.message });
  }
};

const updateSlotFile = async (req, res) => {
  try {
    const { slotKey } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, error: "No file provided for upload" });
    }

    const isVideo = file.mimetype.startsWith("video/");
    const folder = isVideo ? "/third_eye_videos" : "/third_eye_photos";

    let uploadResult;
    if (isImageKitConfigured()) {
      uploadResult = await uploadFileToImageKit(file.buffer, file.originalname, folder);
    } else {
      const mediaDir = path.join(__dirname, "../uploads/media");
      if (!fs.existsSync(mediaDir)) {
        fs.mkdirSync(mediaDir, { recursive: true });
      }

      const ext = path.extname(file.originalname) || (isVideo ? ".mp4" : ".jpg");
      const safeName = `${slotKey}_${Date.now()}${ext}`;
      const filePath = path.join(mediaDir, safeName);
      fs.writeFileSync(filePath, file.buffer);

      const fileUrl = `/uploads/media/${safeName}`;
      uploadResult = {
        url: fileUrl,
        fileId: `local-${Date.now()}`,
        name: file.originalname,
        fileType: isVideo ? "video" : "image",
        thumbnailUrl: isVideo ? "" : fileUrl,
      };
    }

    const updated = await MediaStore.updateSlot(slotKey, {
      url: uploadResult.url,
      fileId: uploadResult.fileId,
      thumbnailUrl: uploadResult.thumbnailUrl || uploadResult.url,
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: "Section slot not found" });
    }

    res.json({
      success: true,
      message: "Section photo/video replaced successfully via ImageKit",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating slot file:", err);
    res.status(500).json({ success: false, error: "Media replacement failed", message: err.message });
  }
};

const updateSlotUrl = async (req, res) => {
  try {
    const { slotKey } = req.params;
    const { url, thumbnailUrl } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, error: "URL is required" });
    }

    const updated = await MediaStore.updateSlot(slotKey, {
      url,
      thumbnailUrl: thumbnailUrl || url,
      fileId: "",
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: "Section slot not found" });
    }

    res.json({
      success: true,
      message: "Section photo/video URL updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating slot URL:", err);
    res.status(500).json({ success: false, error: "Failed to update slot URL", message: err.message });
  }
};

const resetSlot = async (req, res) => {
  try {
    const { slotKey } = req.params;
    const current = await MediaStore.getBySlotKey(slotKey);
    if (current && current.fileId && isImageKitConfigured()) {
      try {
        await deleteFromImageKit(current.fileId);
      } catch (e) {
        console.warn("Could not delete previous file from ImageKit:", e.message);
      }
    }

    const reset = await MediaStore.resetSlot(slotKey);
    if (!reset) {
      return res.status(404).json({ success: false, error: "Section slot not found" });
    }

    res.json({
      success: true,
      message: "Section media reset to original default",
      data: reset,
    });
  } catch (err) {
    console.error("Error resetting slot:", err);
    res.status(500).json({ success: false, error: "Failed to reset slot", message: err.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await MediaStore.getById(id);

    if (!media) {
      return res.status(404).json({ success: false, error: "Media not found" });
    }

    if (media.slotKey) {
      // For predefined section slots, resetting to default is the safe operation
      const reset = await MediaStore.resetSlot(media.slotKey);
      return res.json({
        success: true,
        message: "Section media reset to default",
        data: reset,
      });
    }

    if (media.fileId && isImageKitConfigured()) {
      await deleteFromImageKit(media.fileId);
    }

    const deleted = await MediaStore.delete(id);

    res.json({
      success: true,
      message: "Media deleted successfully",
      data: deleted,
    });
  } catch (err) {
    console.error("Error deleting media:", err);
    res.status(500).json({ success: false, error: "Failed to delete media", message: err.message });
  }
};

module.exports = {
  getMedia,
  updateSlotFile,
  updateSlotUrl,
  resetSlot,
  deleteMedia,
};

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

    const isVideo = Boolean(
      (file.mimetype && file.mimetype.startsWith("video/")) ||
      (file.originalname && /\.(mp4|webm|mov|mkv)$/i.test(file.originalname))
    );
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

    const cleanThumbnail = (isVideo || (uploadResult.thumbnailUrl && /\.(mp4|webm|mov|mkv)$/i.test(uploadResult.thumbnailUrl)))
      ? ""
      : (uploadResult.thumbnailUrl || uploadResult.url);

    const updated = await MediaStore.updateSlot(slotKey, {
      url: uploadResult.url,
      fileId: uploadResult.fileId,
      thumbnailUrl: cleanThumbnail,
      type: isVideo ? "video" : "image",
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

    const isVideo = /\.(mp4|webm|mov|mkv)$/i.test(url) || url.includes("youtube.com") || url.includes("youtu.be") || url.includes("instagram.com/reel");
    const cleanThumb = (thumbnailUrl && !/\.(mp4|webm|mov|mkv)$/i.test(thumbnailUrl)) ? thumbnailUrl : "";

    const updated = await MediaStore.updateSlot(slotKey, {
      url,
      thumbnailUrl: cleanThumb,
      fileId: "",
      type: isVideo ? "video" : "image",
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

const batchUploadSlots = async (req, res) => {
  try {
    const files = req.files;
    let slotKeys = req.body.slotKeys;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: "No files provided for batch upload" });
    }

    if (typeof slotKeys === "string") {
      try {
        slotKeys = JSON.parse(slotKeys);
      } catch {
        slotKeys = slotKeys.split(",").map((s) => s.trim());
      }
    }

    if (!Array.isArray(slotKeys) || slotKeys.length === 0) {
      return res.status(400).json({ success: false, error: "Target slot keys not provided" });
    }

    const results = [];
    const errors = [];

    for (let i = 0; i < Math.min(files.length, slotKeys.length); i++) {
      const file = files[i];
      const slotKey = slotKeys[i];
      try {
        const isVideo = Boolean(
          (file.mimetype && file.mimetype.startsWith("video/")) ||
          (file.originalname && /\.(mp4|webm|mov|mkv)$/i.test(file.originalname))
        );
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
          const safeName = `${slotKey}_${Date.now()}_${i}${ext}`;
          const filePath = path.join(mediaDir, safeName);
          fs.writeFileSync(filePath, file.buffer);
          const fileUrl = `/uploads/media/${safeName}`;
          uploadResult = {
            url: fileUrl,
            fileId: `local-${Date.now()}-${i}`,
            name: file.originalname,
            fileType: isVideo ? "video" : "image",
            thumbnailUrl: isVideo ? "" : fileUrl,
          };
        }

        const cleanThumbnail = (isVideo || (uploadResult.thumbnailUrl && /\.(mp4|webm|mov|mkv)$/i.test(uploadResult.thumbnailUrl)))
          ? ""
          : (uploadResult.thumbnailUrl || uploadResult.url);

        const updated = await MediaStore.updateSlot(slotKey, {
          url: uploadResult.url,
          fileId: uploadResult.fileId,
          thumbnailUrl: cleanThumbnail,
          type: isVideo ? "video" : "image",
        });

        if (updated) {
          results.push(updated);
        }
      } catch (itemErr) {
        console.error(`Batch upload error for slot ${slotKey}:`, itemErr.message);
        errors.push({ slotKey, error: itemErr.message });
      }
    }

    res.json({
      success: true,
      message: `Successfully uploaded and updated ${results.length} of ${files.length} section files`,
      data: results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error("Error in batch upload:", err);
    res.status(500).json({ success: false, error: "Batch upload failed", message: err.message });
  }
};


const createCertificate = async (req, res) => {
  try {
    const file = req.file;
    const { title, partner, category, issuer, description, skills, impact, certId, url } = req.body;

    let imageUrl = url;
    let fileId = "";

    if (file) {
      if (isImageKitConfigured()) {
        const uploadResult = await uploadFileToImageKit(
          file.buffer,
          file.originalname || "certificate.jpg",
          "/third_eye_certificates"
        );
        imageUrl = uploadResult.url;
        fileId = uploadResult.fileId;
      } else {
        const mediaDir = path.join(__dirname, "../uploads/media");
        if (!fs.existsSync(mediaDir)) {
          fs.mkdirSync(mediaDir, { recursive: true });
        }
        const ext = path.extname(file.originalname) || ".jpg";
        const safeName = `cert_${Date.now()}${ext}`;
        fs.writeFileSync(path.join(mediaDir, safeName), file.buffer);
        imageUrl = `/uploads/media/${safeName}`;
        fileId = `local-${Date.now()}`;
      }
    }

    if (!imageUrl) {
      return res.status(400).json({ success: false, error: "Certificate image file or URL is required" });
    }

    const created = await MediaStore.createCertificate({
      title,
      partner,
      category,
      issuer,
      description,
      skills,
      impact,
      certId,
      url: imageUrl,
      thumbnailUrl: imageUrl,
      fileId,
    });

    res.status(201).json({
      success: true,
      message: "Certificate created successfully and uploaded to ImageKit",
      data: created,
    });
  } catch (err) {
    console.error("Error creating certificate:", err);
    res.status(500).json({ success: false, error: "Failed to create certificate", message: err.message });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    const { title, partner, category, issuer, description, skills, impact, certId, url } = req.body;

    const updateData = {
      title,
      partner,
      category,
      issuer,
      description,
      skills,
      impact,
      certId,
    };

    if (file) {
      if (isImageKitConfigured()) {
        const uploadResult = await uploadFileToImageKit(
          file.buffer,
          file.originalname || "certificate.jpg",
          "/third_eye_certificates"
        );
        updateData.url = uploadResult.url;
        updateData.thumbnailUrl = uploadResult.thumbnailUrl || uploadResult.url;
        updateData.fileId = uploadResult.fileId;
      } else {
        const mediaDir = path.join(__dirname, "../uploads/media");
        if (!fs.existsSync(mediaDir)) {
          fs.mkdirSync(mediaDir, { recursive: true });
        }
        const ext = path.extname(file.originalname) || ".jpg";
        const safeName = `cert_${Date.now()}${ext}`;
        fs.writeFileSync(path.join(mediaDir, safeName), file.buffer);
        updateData.url = `/uploads/media/${safeName}`;
        updateData.thumbnailUrl = `/uploads/media/${safeName}`;
        updateData.fileId = `local-${Date.now()}`;
      }
    } else if (url) {
      updateData.url = url;
      updateData.thumbnailUrl = url;
    }

    const updated = await MediaStore.updateCertificate(id, updateData);
    if (!updated) {
      return res.status(404).json({ success: false, error: "Certificate not found" });
    }

    res.json({
      success: true,
      message: "Certificate updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating certificate:", err);
    res.status(500).json({ success: false, error: "Failed to update certificate", message: err.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const cert = (await MediaStore.getById(id)) || (await MediaStore.getBySlotKey(id));
    if (!cert) {
      return res.status(404).json({ success: false, error: "Certificate not found" });
    }

    if (cert.fileId && isImageKitConfigured()) {
      try {
        await deleteFromImageKit(cert.fileId);
      } catch (e) {
        console.warn("Could not delete certificate file from ImageKit:", e.message);
      }
    }

    const deleted = await MediaStore.deleteCertificate(id);
    res.json({
      success: true,
      message: "Certificate deleted successfully",
      data: deleted,
    });
  } catch (err) {
    console.error("Error deleting certificate:", err);
    res.status(500).json({ success: false, error: "Failed to delete certificate", message: err.message });
  }
};

module.exports = {
  batchUploadSlots,
  getMedia,
  updateSlotFile,
  updateSlotUrl,
  resetSlot,
  deleteMedia,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};


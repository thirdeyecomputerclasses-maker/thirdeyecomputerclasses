const ImageKit = require("imagekit");
const dotenv = require("dotenv");

dotenv.config();

const isImageKitConfigured = () => {
  return Boolean(
    process.env.IMAGEKIT_PUBLIC_KEY &&
    process.env.IMAGEKIT_PRIVATE_KEY &&
    process.env.IMAGEKIT_URL_ENDPOINT
  );
};

let imageKitInstance = null;

const getImageKit = () => {
  if (!imageKitInstance && isImageKitConfigured()) {
    imageKitInstance = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
  return imageKitInstance;
};

const uploadBufferToImageKit = async (buffer, originalName = "upload.jpg", folder = "/third_eye_courses") => {
  const ik = getImageKit();
  if (!ik) {
    throw new Error("ImageKit credentials are not configured in backend/.env");
  }

  const safeFileName = `${Date.now()}_${originalName.replace(/[^\w.-]/g, "_")}`;

  const result = await ik.upload({
    file: buffer,
    fileName: safeFileName,
    folder,
    useUniqueFileName: true,
  });

  return result.url;
};

const uploadFileToImageKit = async (buffer, originalName = "upload.jpg", folder = "/third_eye_media") => {
  const ik = getImageKit();
  if (!ik) {
    throw new Error("ImageKit credentials are not configured in backend/.env");
  }

  const safeFileName = `${Date.now()}_${(originalName || "upload").replace(/[^\w.-]/g, "_")}`;

  const result = await ik.upload({
    file: buffer,
    fileName: safeFileName,
    folder,
    useUniqueFileName: true,
  });

  return {
    url: result.url,
    fileId: result.fileId,
    name: result.name,
    fileType: result.fileType,
    thumbnailUrl: result.thumbnailUrl || result.url,
    size: result.size,
  };
};

const deleteFromImageKit = async (fileId) => {
  const ik = getImageKit();
  if (!ik || !fileId) return false;
  try {
    await ik.deleteFile(fileId);
    return true;
  } catch (err) {
    console.warn("ImageKit delete file warning:", err.message);
    return false;
  }
};

module.exports = {
  isImageKitConfigured,
  uploadBufferToImageKit,
  uploadFileToImageKit,
  deleteFromImageKit,
};

const CourseStore = require("../storage/courseStore");
const { isImageKitConfigured, uploadBufferToImageKit } = require("../config/imagekit");

const uploadSingleImage = async (file) => {
  if (!file) return null;

  if (!isImageKitConfigured()) {
    throw new Error("ImageKit credentials are not configured in backend/.env.");
  }

  return await uploadBufferToImageKit(file.buffer, file.originalname, "/third_eye_courses");
};

const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    const courses = await CourseStore.getAll({ category, search });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses", message: err.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const course = await CourseStore.getBySlugOrId(idOrSlug);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course", message: err.message });
  }
};

const createCourse = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title) {
      return res.status(400).json({ error: "Course title is required" });
    }

    if (req.file) {
      data.image = await uploadSingleImage(req.file);
    }

    if (typeof data.tools === "string") {
      try { data.tools = JSON.parse(data.tools); } catch (_) {}
    }
    if (typeof data.modules === "string") {
      try { data.modules = JSON.parse(data.modules); } catch (_) {}
    }
    if (typeof data.prerequisites === "string") {
      try { data.prerequisites = JSON.parse(data.prerequisites); } catch (_) {}
    }

    const created = await CourseStore.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Failed to create course", message: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.image = await uploadSingleImage(req.file);
    }

    if (typeof data.tools === "string") {
      try { data.tools = JSON.parse(data.tools); } catch (_) {}
    }
    if (typeof data.modules === "string") {
      try { data.modules = JSON.parse(data.modules); } catch (_) {}
    }
    if (typeof data.prerequisites === "string") {
      try { data.prerequisites = JSON.parse(data.prerequisites); } catch (_) {}
    }

    const updated = await CourseStore.update(id, data);
    if (!updated) {
      return res.status(404).json({ error: "Course not found for update" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update course", message: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await CourseStore.delete(id);
    if (!success) {
      return res.status(404).json({ error: "Course not found or already deleted" });
    }
    res.json({ message: "Course deleted successfully", id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course", message: err.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const imageUrl = await uploadSingleImage(req.file);
    res.json({
      url: imageUrl,
      secure_url: imageUrl,
      isImageKit: isImageKitConfigured(),
    });
  } catch (err) {
    res.status(500).json({ error: "Image upload failed", message: err.message });
  }
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadImage,
};

const BlogStore = require("../storage/blogStore");
const { isImageKitConfigured, uploadBufferToImageKit } = require("../config/imagekit");

const uploadBlogFeaturedImage = async (file) => {
  if (!file) return null;

  if (!isImageKitConfigured()) {
    console.warn("ImageKit is not fully configured, skipping CDN upload.");
    return null;
  }

  return await uploadBufferToImageKit(file.buffer, file.originalname, "/third_eye_blogs");
};

const getBlogs = async (req, res) => {
  try {
    const { category, search, status, tag, page, limit } = req.query;
    const blogs = await BlogStore.getAll({ category, search, status, tag, page, limit });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs", message: err.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const blog = await BlogStore.getBySlugOrId(idOrSlug);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Safely increment view count in background
    BlogStore.incrementViews(idOrSlug).catch((err) =>
      console.warn("View increment error:", err.message)
    );

    // Fetch related blogs from same category
    const allCategoryBlogs = await BlogStore.getAll({
      category: blog.category,
      status: "published",
      limit: 4,
    });

    const relatedBlogs = allCategoryBlogs
      .filter((b) => (b.slug !== blog.slug && b.id !== blog.id))
      .slice(0, 3);

    res.json({
      blog,
      relatedBlogs,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog post", message: err.message });
  }
};

const getBlogStats = async (req, res) => {
  try {
    const stats = await BlogStore.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog stats", message: err.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.title || !data.title.trim()) {
      return res.status(400).json({ error: "Blog title is required" });
    }
    if (!data.content || !data.content.trim()) {
      return res.status(400).json({ error: "Blog content is required" });
    }

    // Handle ImageKit upload if image file was attached
    if (req.file) {
      try {
        const uploadedUrl = await uploadBlogFeaturedImage(req.file);
        if (uploadedUrl) {
          data.featuredImage = uploadedUrl;
        }
      } catch (uploadErr) {
        console.error("Image upload failed:", uploadErr.message);
      }
    }

    // Parse array strings if sent as form-data
    if (typeof data.keywords === "string") {
      try {
        data.keywords = JSON.parse(data.keywords);
      } catch (_) {
        data.keywords = data.keywords.split(",").map((k) => k.trim()).filter(Boolean);
      }
    }
    if (typeof data.tags === "string") {
      try {
        data.tags = JSON.parse(data.tags);
      } catch (_) {
        data.tags = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }

    const created = await BlogStore.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog", message: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };

    if (req.file) {
      try {
        const uploadedUrl = await uploadBlogFeaturedImage(req.file);
        if (uploadedUrl) {
          data.featuredImage = uploadedUrl;
        }
      } catch (uploadErr) {
        console.error("Image upload failed:", uploadErr.message);
      }
    }

    if (typeof data.keywords === "string") {
      try {
        data.keywords = JSON.parse(data.keywords);
      } catch (_) {
        data.keywords = data.keywords.split(",").map((k) => k.trim()).filter(Boolean);
      }
    }
    if (typeof data.tags === "string") {
      try {
        data.tags = JSON.parse(data.tags);
      } catch (_) {
        data.tags = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }

    const updated = await BlogStore.update(id, data);
    if (!updated) {
      return res.status(404).json({ error: "Blog post not found to update" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog", message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await BlogStore.delete(id);
    if (!success) {
      return res.status(404).json({ error: "Blog post not found to delete" });
    }
    res.json({ success: true, message: "Blog post successfully removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog", message: err.message });
  }
};

const uploadInlineImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const url = await uploadBlogFeaturedImage(req.file);
    if (!url) {
      return res.status(500).json({ error: "ImageKit upload failed. Check credentials." });
    }

    res.json({ success: true, url });
  } catch (err) {
    res.status(500).json({ error: "Inline image upload failed", message: err.message });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  getBlogStats,
  createBlog,
  updateBlog,
  deleteBlog,
  uploadInlineImage,
};

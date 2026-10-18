import React, { useState, useEffect, useRef } from "react";
import {
  X,
  FileText,
  Search,
  Settings,
  Sparkles,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  Upload,
  Globe,
  Tag,
  Eye,
  AlertCircle,
  Copy,
  Trash2,
} from "lucide-react";
import {
  parseGoogleDocsClipboard,
  parseGoogleDocsHtml,
  parsePlainTextContent,
  extractSEOFromContent,
  calculateReadingTime,
} from "../../../utils/googleDocsParser";
import { uploadBlogImage } from "../../../services/blogApi";
import "./BlogFormModal.css";

const PRESET_CATEGORIES = [
  "Web Development",
  "3D Animation",
  "CAD Jewelry",
  "Graphic Design",
  "Career & Placement",
  "Technology",
  "Student Success",
  "Industry Trends",
];

export default function BlogFormModal({
  isOpen,
  blog,
  onClose,
  onSave,
  isSaving,
}) {
  const [activeTab, setActiveTab] = useState("content"); // "content" | "seo" | "settings"
  const [editorMode, setEditorMode] = useState("visual"); // "visual" | "html" | "preview"

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [category, setCategory] = useState("Technology");
  const [customCategory, setCustomCategory] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [seoExcerpt, setSeoExcerpt] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [author, setAuthor] = useState("Third Eye Expert Team");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState("published");
  const [publishedAt, setPublishedAt] = useState("");

  // UI helpers
  const [pasteToast, setPasteToast] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const inlineImageInputRef = useRef(null);

  // Initialize form state
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setSlug(blog.slug || "");
      setIsSlugManual(true);
      setCategory(blog.category || "Technology");
      setContentHtml(blog.content || "");
      setSeoExcerpt(blog.seoExcerpt || blog.metaDescription || "");
      setMetaTitle(blog.metaTitle || "");
      setKeywords(Array.isArray(blog.keywords) ? blog.keywords : []);
      setTags(Array.isArray(blog.tags) ? blog.tags : []);
      setAuthor(blog.author || "Third Eye Expert Team");
      setStatus(blog.status || "published");
      setFeaturedImageUrl(blog.featuredImage || "");
      setImagePreview(blog.featuredImage || "");
      setPublishedAt(
        blog.publishedAt
          ? new Date(blog.publishedAt).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10)
      );
    } else {
      setTitle("");
      setSlug("");
      setIsSlugManual(false);
      setCategory("Technology");
      setContentHtml("");
      setSeoExcerpt("");
      setMetaTitle("");
      setKeywords([]);
      setTags([]);
      setAuthor("Third Eye Expert Team");
      setStatus("published");
      setFeaturedImageFile(null);
      setFeaturedImageUrl("");
      setImagePreview("");
      setPublishedAt(new Date().toISOString().slice(0, 10));
    }
    setActiveTab("content");
    setEditorMode("visual");
    setPasteToast("");
  }, [blog, isOpen]);

  // Sync editor innerHTML when mode changes or initialized
  useEffect(() => {
    if (editorMode === "visual" && editorRef.current) {
      if (editorRef.current.innerHTML !== contentHtml) {
        editorRef.current.innerHTML = contentHtml;
      }
    }
  }, [editorMode, contentHtml]);

  // Auto slug generation from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugManual) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  };

  const handleSlugChange = (e) => {
    setIsSlugManual(true);
    setSlug(
      e.target.value
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
    );
  };

  // Google Docs Paste Handler
  const handleEditorPaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    if (!clipboardData) return;

    const parsedHtml = parseGoogleDocsClipboard(clipboardData);

    if (parsedHtml) {
      // Insert parsed HTML into current selection or append
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const fragment = range.createContextualFragment(parsedHtml);
        range.insertNode(fragment);
        range.collapse(false);
      } else if (editorRef.current) {
        editorRef.current.innerHTML += parsedHtml;
      }

      const updatedHtml = editorRef.current ? editorRef.current.innerHTML : parsedHtml;
      setContentHtml(updatedHtml);

      // Trigger automatic smart extraction if title or excerpt is missing
      const seoData = extractSEOFromContent(updatedHtml, title);
      if (!title && seoData.title) {
        setTitle(seoData.title);
        if (!isSlugManual) {
          const generated = seoData.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-");
          setSlug(generated);
        }
      }
      if (!seoExcerpt && seoData.seoExcerpt) {
        setSeoExcerpt(seoData.seoExcerpt);
      }
      if (!metaTitle && seoData.metaTitle) {
        setMetaTitle(seoData.metaTitle);
      }
      if (keywords.length === 0 && seoData.keywords.length > 0) {
        setKeywords(seoData.keywords);
      }

      showToast("✨ Google Docs detected! Headings, paragraphs & formatting identified automatically.");
    }
  };

  const showToast = (msg) => {
    setPasteToast(msg);
    setTimeout(() => setPasteToast(""), 5000);
  };

  // 1-Click SEO Extraction from Content
  const handleMagicSEO = () => {
    const seoData = extractSEOFromContent(contentHtml, title);
    if (!title && seoData.title) setTitle(seoData.title);
    if (seoData.seoExcerpt) setSeoExcerpt(seoData.seoExcerpt);
    if (seoData.metaTitle) setMetaTitle(seoData.metaTitle);
    if (seoData.keywords && seoData.keywords.length > 0) {
      // Merge unique
      const merged = Array.from(new Set([...keywords, ...seoData.keywords]));
      setKeywords(merged);
    }
    showToast("⚡ SEO Meta Title, Excerpt & Keywords extracted from blog content!");
  };

  // Editor formatting commands
  const executeCommand = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      setContentHtml(editorRef.current.innerHTML);
    }
  };

  const handleHeadingChange = (e) => {
    const tag = e.target.value;
    if (tag === "p") {
      executeCommand("formatBlock", "<p>");
    } else if (tag) {
      executeCommand("formatBlock", `<${tag}>`);
    }
  };

  const handleInsertLink = () => {
    const url = prompt("Enter URL link (e.g. https://example.com):");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  // Inline Image Upload to ImageKit
  const handleInlineImageSelect = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const res = await uploadBlogImage(file);
      if (res && res.url) {
        executeCommand("insertImage", res.url);
        showToast("Image uploaded to ImageKit CDN and inserted!");
      }
    } catch (err) {
      alert("Inline image upload failed: " + err.message);
    } finally {
      setIsUploadingImage(false);
      if (inlineImageInputRef.current) inlineImageInputRef.current.value = "";
    }
  };

  // Featured Image File Selection
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFeaturedImageFile(file);
      setFeaturedImageUrl("");
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Keywords management
  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  // Tags management
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please provide a title for the blog post.");
      setActiveTab("content");
      return;
    }

    if (!contentHtml.trim() || contentHtml === "<p><br></p>") {
      alert("Blog content cannot be empty.");
      setActiveTab("content");
      return;
    }

    const finalCategory = customCategory.trim() || category;

    // Build payload: if file is present, use FormData for ImageKit upload
    if (featuredImageFile) {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("slug", slug.trim());
      formData.append("content", contentHtml);
      formData.append("category", finalCategory);
      formData.append("seoExcerpt", seoExcerpt.trim());
      formData.append("metaTitle", metaTitle.trim());
      formData.append("metaDescription", seoExcerpt.trim());
      formData.append("keywords", JSON.stringify(keywords));
      formData.append("tags", JSON.stringify(tags));
      formData.append("author", author.trim());
      formData.append("status", status);
      formData.append("publishedAt", publishedAt || new Date().toISOString());
      formData.append("featuredImage", featuredImageFile);
      onSave(formData);
    } else {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        content: contentHtml,
        category: finalCategory,
        seoExcerpt: seoExcerpt.trim(),
        metaTitle: metaTitle.trim(),
        metaDescription: seoExcerpt.trim(),
        keywords,
        tags,
        author: author.trim(),
        status,
        publishedAt: publishedAt || new Date().toISOString(),
        featuredImage: featuredImageUrl || imagePreview || "",
      };
      onSave(payload);
    }
  };

  if (!isOpen) return null;

  const readingStats = calculateReadingTime(contentHtml);

  return (
    <div className="blog-modal-backdrop" onClick={onClose}>
      <div
        className="blog-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Header */}
        <div className="blog-modal-header">
          <div className="blog-modal-title-wrap">
            <div className="blog-modal-icon-badge">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="blog-modal-title">
                {blog ? "Edit Blog Post" : "Create New Blog Post"}
              </h2>
              <p className="blog-modal-subtitle">
                Publish rich articles with automatic Google Docs identification and SEO metadata.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="blog-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Sub-Tabs */}
        <div className="blog-modal-tabs">
          <button
            type="button"
            className={`blog-modal-tab-btn ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            <FileText size={16} />
            <span>Content & Editor</span>
          </button>
          <button
            type="button"
            className={`blog-modal-tab-btn ${activeTab === "seo" ? "active" : ""}`}
            onClick={() => setActiveTab("seo")}
          >
            <Search size={16} />
            <span>SEO & SERP Metadata</span>
            {(metaTitle || seoExcerpt) && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#f6d96b]" />
            )}
          </button>
          <button
            type="button"
            className={`blog-modal-tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={16} />
            <span>Media & Publishing</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="blog-modal-body">
          {/* ======================================================== */}
          {/* TAB 1: CONTENT & RICH EDITOR                             */}
          {/* ======================================================== */}
          {activeTab === "content" && (
            <div>
              {/* Google Docs Smart Identification Banner */}
              <div className="blog-gdocs-banner">
                <div className="blog-gdocs-banner-left">
                  <Sparkles size={22} className="blog-gdocs-banner-icon" />
                  <div>
                    <div className="blog-gdocs-banner-title">
                      Google Docs Paste Auto-Detection Active
                    </div>
                    <div className="blog-gdocs-banner-desc">
                      Copy from Google Docs or Word and press Ctrl+V directly into the editor below. Headings, paragraphs, and lists are formatted automatically.
                    </div>
                  </div>
                </div>
                <div className="blog-gdocs-banner-actions">
                  <button
                    type="button"
                    className="blog-gdocs-btn magic"
                    onClick={handleMagicSEO}
                    title="Auto-extract Title, Excerpt, and Keywords from content"
                  >
                    <Sparkles size={13} />
                    <span>Extract SEO</span>
                  </button>
                </div>
              </div>

              {/* Toast alert on Docs paste */}
              {pasteToast && (
                <div className="p-3 mb-4 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 size={16} />
                  <span>{pasteToast}</span>
                </div>
              )}

              {/* Title & Slug */}
              <div className="blog-form-row">
                <div className="blog-form-group">
                  <label className="blog-form-label">
                    <span>Blog Title *</span>
                    <span className="blog-form-hint">{title.length} chars</span>
                  </label>
                  <input
                    type="text"
                    className="blog-form-input"
                    placeholder="e.g. How Generative AI is Reshaping 3D Animation in 2026"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>

                <div className="blog-form-group">
                  <label className="blog-form-label">
                    <span>URL Slug</span>
                    <span className="blog-form-hint">/blogs/{slug || "post-url"}</span>
                  </label>
                  <input
                    type="text"
                    className="blog-form-input"
                    placeholder="how-generative-ai-reshaping-3d-animation"
                    value={slug}
                    onChange={handleSlugChange}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="blog-form-row">
                <div className="blog-form-group">
                  <label className="blog-form-label">Category</label>
                  <select
                    className="blog-form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="Custom">+ Custom Category...</option>
                  </select>
                </div>

                {category === "Custom" && (
                  <div className="blog-form-group">
                    <label className="blog-form-label">Enter Custom Category</label>
                    <input
                      type="text"
                      className="blog-form-input"
                      placeholder="e.g. Robotics & IoT"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Rich Text Editor Shell */}
              <div className="blog-form-group">
                <div className="blog-form-label">
                  <span>Blog Content *</span>
                  <span className="blog-form-hint">
                    {readingStats.words} words • {readingStats.text}
                  </span>
                </div>

                <div className="blog-editor-shell">
                  {/* Formatting Toolbar */}
                  <div className="blog-editor-toolbar">
                    <div className="blog-toolbar-group">
                      <select
                        className="blog-tool-select"
                        onChange={handleHeadingChange}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Heading...
                        </option>
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1 (H1)</option>
                        <option value="h2">Heading 2 (H2)</option>
                        <option value="h3">Heading 3 (H3)</option>
                      </select>
                    </div>

                    <div className="blog-toolbar-group">
                      <button
                        type="button"
                        className="blog-tool-btn"
                        onClick={() => executeCommand("bold")}
                        title="Bold (Ctrl+B)"
                      >
                        <Bold size={15} />
                      </button>
                      <button
                        type="button"
                        className="blog-tool-btn"
                        onClick={() => executeCommand("italic")}
                        title="Italic (Ctrl+I)"
                      >
                        <Italic size={15} />
                      </button>
                      <button
                        type="button"
                        className="blog-tool-btn"
                        onClick={() => executeCommand("underline")}
                        title="Underline (Ctrl+U)"
                      >
                        <Underline size={15} />
                      </button>
                    </div>

                    <div className="blog-toolbar-group">
                      <button
                        type="button"
                        className="blog-tool-btn"
                        onClick={() => executeCommand("insertUnorderedList")}
                        title="Bullet List"
                      >
                        <List size={15} />
                      </button>
                      <button
                        type="button"
                        className="blog-tool-btn"
                        onClick={() => executeCommand("insertOrderedList")}
                        title="Numbered List"
                      >
                        <ListOrdered size={15} />
                      </button>
                      <button
                        type="button"
                        className="blog-tool-btn"
                        onClick={() => executeCommand("formatBlock", "<blockquote>")}
                        title="Quote"
                      >
                        <Quote size={15} />
                      </button>
                    </div>

                    <div className="blog-toolbar-group">
                      <button
                        type="button"
                        className="blog-tool-btn"
                        onClick={handleInsertLink}
                        title="Insert Link"
                      >
                        <LinkIcon size={15} />
                      </button>

                      {/* Inline Image Upload */}
                      <button
                        type="button"
                        className="blog-tool-btn"
                        onClick={() => inlineImageInputRef.current?.click()}
                        title="Upload Inline Image to ImageKit CDN"
                        disabled={isUploadingImage}
                      >
                        <ImageIcon size={15} />
                      </button>
                      <input
                        type="file"
                        ref={inlineImageInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleInlineImageSelect}
                      />
                    </div>

                    {/* View Switcher: Visual / HTML / Preview */}
                    <div className="blog-editor-view-modes">
                      <button
                        type="button"
                        className={`blog-view-pill ${editorMode === "visual" ? "active" : ""}`}
                        onClick={() => setEditorMode("visual")}
                      >
                        Visual
                      </button>
                      <button
                        type="button"
                        className={`blog-view-pill ${editorMode === "html" ? "active" : ""}`}
                        onClick={() => {
                          if (editorRef.current) setContentHtml(editorRef.current.innerHTML);
                          setEditorMode("html");
                        }}
                      >
                        HTML
                      </button>
                      <button
                        type="button"
                        className={`blog-view-pill ${editorMode === "preview" ? "active" : ""}`}
                        onClick={() => {
                          if (editorRef.current) setContentHtml(editorRef.current.innerHTML);
                          setEditorMode("preview");
                        }}
                      >
                        Preview
                      </button>
                    </div>
                  </div>

                  {/* Mode 1: ContentEditable Visual Editor */}
                  {editorMode === "visual" && (
                    <div
                      ref={editorRef}
                      contentEditable
                      suppressContentEditableWarning
                      className="blog-editor-content"
                      data-placeholder="Paste your Google Docs article here or start writing. Headings, bullet points and bolding are preserved..."
                      onPaste={handleEditorPaste}
                      onInput={(e) => setContentHtml(e.currentTarget.innerHTML)}
                    />
                  )}

                  {/* Mode 2: Raw HTML Textarea */}
                  {editorMode === "html" && (
                    <textarea
                      className="blog-raw-textarea"
                      value={contentHtml}
                      onChange={(e) => setContentHtml(e.target.value)}
                      placeholder="<p>Raw HTML content...</p>"
                    />
                  )}

                  {/* Mode 3: Live Preview */}
                  {editorMode === "preview" && (
                    <div className="blog-editor-content blog-preview-content">
                      {contentHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                      ) : (
                        <p className="text-zinc-500 italic">No content to preview yet.</p>
                      )}
                    </div>
                  )}

                  <div className="blog-editor-footer">
                    <span>Direct clipboard parser active (HTML + Plain)</span>
                    <span>
                      {readingStats.words} words • approx. {readingStats.minutes} minute read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: SEO & SERP METADATA                               */}
          {/* ======================================================== */}
          {activeTab === "seo" && (
            <div>
              {/* Google SERP Snippet Preview */}
              <div className="blog-serp-preview-card">
                <div className="blog-serp-header">
                  <span className="blog-serp-tag">Google SERP Preview</span>
                  <button
                    type="button"
                    className="blog-gdocs-btn magic"
                    onClick={handleMagicSEO}
                  >
                    <Sparkles size={13} />
                    <span>Auto-Generate SEO</span>
                  </button>
                </div>
                <div className="blog-serp-url">
                  <span>https://thirdeye.edu</span>
                  <span>›</span>
                  <span>blogs</span>
                  <span>›</span>
                  <span className="text-zinc-400">{slug || "post-url"}</span>
                </div>
                <h3 className="blog-serp-title">
                  {metaTitle || (title ? `${title} | Third Eye` : "Blog Title | Third Eye")}
                </h3>
                <p className="blog-serp-desc">
                  {seoExcerpt ||
                    "Add an SEO excerpt to preview how Google and social media platforms display your blog in search snippets..."}
                </p>
              </div>

              {/* Meta Title */}
              <div className="blog-form-group">
                <label className="blog-form-label">
                  <span>Meta Title (SEO Title Tag)</span>
                  <span
                    className={`blog-form-hint ${
                      metaTitle.length > 60 ? "text-amber-400 font-semibold" : ""
                    }`}
                  >
                    {metaTitle.length}/60 recommended
                  </span>
                </label>
                <input
                  type="text"
                  className="blog-form-input"
                  placeholder="e.g. 10 Best Computer Courses with Job Placement in Jaipur | Third Eye"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>

              {/* SEO Excerpt */}
              <div className="blog-form-group">
                <label className="blog-form-label">
                  <span>SEO Excerpt (Meta Description)</span>
                  <span
                    className={`blog-form-hint ${
                      seoExcerpt.length > 160 ? "text-amber-400 font-semibold" : ""
                    }`}
                  >
                    {seoExcerpt.length}/160 recommended
                  </span>
                </label>
                <textarea
                  className="blog-form-textarea"
                  placeholder="Summarize the core takeaways of this article for search engine crawlers and social share cards..."
                  value={seoExcerpt}
                  onChange={(e) => setSeoExcerpt(e.target.value)}
                  rows={3}
                />
              </div>

              {/* SEO Focus Keywords */}
              <div className="blog-form-group">
                <label className="blog-form-label">
                  <span>Focus Keywords (Target SEO Terms)</span>
                  <span className="blog-form-hint">{keywords.length} keywords added</span>
                </label>
                <div className="blog-tag-wrap">
                  {keywords.map((kw, idx) => (
                    <span key={idx} className="blog-tag-pill">
                      <span>{kw}</span>
                      <button
                        type="button"
                        className="blog-tag-pill-remove"
                        onClick={() => handleRemoveKeyword(idx)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="blog-tag-input-inline"
                    placeholder="Type keyword and press Enter..."
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: MEDIA & PUBLISHING SETTINGS                       */}
          {/* ======================================================== */}
          {activeTab === "settings" && (
            <div>
              {/* Featured Image */}
              <div className="blog-form-group">
                <label className="blog-form-label">
                  <span>Featured Cover Image</span>
                  <span className="blog-form-hint">ImageKit CDN upload or URL</span>
                </label>

                {imagePreview ? (
                  <div className="blog-upload-preview">
                    <img src={imagePreview} alt="Blog Cover Preview" />
                    <button
                      type="button"
                      className="blog-upload-preview-remove"
                      onClick={() => {
                        setFeaturedImageFile(null);
                        setFeaturedImageUrl("");
                        setImagePreview("");
                      }}
                      title="Remove Image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    className="blog-upload-dropzone"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={32} className="mx-auto text-yellow-400/80 mb-2" />
                    <p className="text-sm font-semibold text-white">
                      Click to upload cover image to ImageKit CDN
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      Supports JPG, PNG, WEBP (recommended 1200x630 for social cards)
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleFeaturedImageChange}
                    />
                  </div>
                )}

                <div className="mt-2">
                  <input
                    type="url"
                    className="blog-form-input text-xs"
                    placeholder="Or paste external image URL directly (e.g. https://images.unsplash.com/...)"
                    value={featuredImageUrl}
                    onChange={(e) => {
                      setFeaturedImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                      setFeaturedImageFile(null);
                    }}
                  />
                </div>
              </div>

              {/* Author & Publishing Date */}
              <div className="blog-form-row">
                <div className="blog-form-group">
                  <label className="blog-form-label">Author Name</label>
                  <input
                    type="text"
                    className="blog-form-input"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Third Eye Expert Team"
                  />
                </div>

                <div className="blog-form-group">
                  <label className="blog-form-label">Publication Date</label>
                  <input
                    type="date"
                    className="blog-form-input"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                  />
                </div>
              </div>

              {/* Status (Published vs Draft) */}
              <div className="blog-form-row">
                <div className="blog-form-group">
                  <label className="blog-form-label">Publishing Status</label>
                  <select
                    className="blog-form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="published">🟢 Published (Live on /blogs)</option>
                    <option value="draft">🟡 Draft (Hidden from public)</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="blog-form-group">
                  <label className="blog-form-label">Article Tags</label>
                  <div className="blog-tag-wrap">
                    {tags.map((t, idx) => (
                      <span key={idx} className="blog-tag-pill">
                        <span>#{t}</span>
                        <button
                          type="button"
                          className="blog-tag-pill-remove"
                          onClick={() => handleRemoveTag(idx)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      className="blog-tag-input-inline"
                      placeholder="Type tag and press Enter..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="blog-modal-footer">
            <button
              type="button"
              className="blog-btn-secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <div className="blog-modal-footer-actions">
              <button
                type="submit"
                className="blog-btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <span>Saving to CMS...</span>
                ) : (
                  <span>{blog ? "Update Blog Post" : "Publish Blog Post"}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

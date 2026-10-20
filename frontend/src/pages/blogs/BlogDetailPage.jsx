import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Share2,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Sparkles,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import { getBlog } from "../../services/blogApi";
import "./BlogDetailPage.css";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Fetch blog data
  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);

    getBlog(slug)
      .then((res) => {
        if (res && res.blog) {
          setBlogData(res.blog);
          setRelatedBlogs(res.relatedBlogs || []);

          // Dynamic SEO meta tags
          const pageTitle = res.blog.metaTitle || `${res.blog.title} | Third Eye Computer Classes`;
          document.title = pageTitle;

          // Update meta description
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute(
              "content",
              res.blog.metaDescription || res.blog.seoExcerpt || ""
            );
          }
        } else {
          setBlogData(null);
        }
      })
      .catch((err) => {
        console.error("Failed to load blog:", err);
        setBlogData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parse Table of Contents from H2 and H3 headings
  const tableOfContents = useMemo(() => {
    if (!blogData?.content) return [];
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(blogData.content, "text/html");
      const headings = doc.querySelectorAll("h2, h3");
      return Array.from(headings).map((h, i) => {
        const text = h.textContent.trim();
        const id = `heading-${i}-${text.toLowerCase().replace(/[^\w]/g, "-")}`;
        return {
          id,
          text,
          level: h.tagName.toLowerCase() === "h2" ? 2 : 3,
        };
      });
    } catch {
      return [];
    }
  }, [blogData?.content]);

  // Inject IDs into HTML content so TOC clicks scroll smoothly
  const contentWithHeadingIds = useMemo(() => {
    if (!blogData?.content) return "";
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(blogData.content, "text/html");
      const headings = doc.querySelectorAll("h2, h3");
      headings.forEach((h, i) => {
        const text = h.textContent.trim();
        const id = `heading-${i}-${text.toLowerCase().replace(/[^\w]/g, "-")}`;
        h.setAttribute("id", id);
      });
      return doc.body.innerHTML;
    } catch {
      return blogData.content;
    }
  }, [blogData?.content]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently Published";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080603] text-zinc-400">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080603] text-zinc-300 px-4">
        <div className="max-w-md text-center p-8 rounded-2xl bg-[#140f09] border border-yellow-400/20">
          <BookOpen size={48} className="mx-auto text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
          <p className="text-sm text-zinc-400 mb-6">
            The article you're looking for doesn't exist or may have been updated.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all"
          >
            <ArrowLeft size={16} />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blogData.title);

  return (
    <div className="blog-detail-page">
      {/* Top Reading Progress Line */}
      <div
        className="blog-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Article Header Container */}
      <header className="blog-detail-header">
        {/* Breadcrumbs */}
        <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/blogs">Blogs</Link>
          <ChevronRight size={14} />
          <Link to={`/blogs?category=${encodeURIComponent(blogData.category)}`}>
            {blogData.category}
          </Link>
          <ChevronRight size={14} />
          <span className="blog-breadcrumbs-current">{blogData.title}</span>
        </nav>

        {/* Category Pill */}
        <div className="blog-detail-category-badge">
          <Sparkles size={12} />
          <span>{blogData.category}</span>
        </div>

        {/* Headline */}
        <h1 className="blog-detail-title">{blogData.title}</h1>

        {/* SEO Excerpt / Lead */}
        {(blogData.seoExcerpt || blogData.metaDescription) && (
          <p className="blog-detail-lead">
            {blogData.seoExcerpt || blogData.metaDescription}
          </p>
        )}

        {/* Meta Bar */}
        <div className="blog-detail-meta-bar">
          <div className="blog-detail-author-wrap">
            <div className="blog-detail-author-avatar">
              <User size={16} />
            </div>
            <div className="blog-detail-author-text">
              <span className="blog-detail-author-title">
                {blogData.author || "Third Eye Expert Team"}
              </span>
              <span className="blog-detail-author-role">Technical Editorial</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-yellow-400/80" />
            <span>{formatDate(blogData.publishedAt)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-yellow-400/80" />
            <span>{blogData.readTime || "5 min read"}</span>
          </div>

          {blogData.views > 0 && (
            <div className="flex items-center gap-1.5 ml-auto">
              <Eye size={14} className="text-yellow-400/80" />
              <span>{blogData.views.toLocaleString()} views</span>
            </div>
          )}
        </div>
      </header>

      {/* Featured Cover Image */}
      {blogData.featuredImage && (
        <div className="blog-detail-featured-img-wrap">
          <img
            src={blogData.featuredImage}
            alt={blogData.title}
            className="blog-detail-featured-img"
          />
        </div>
      )}

      {/* Main 2-Column Article Layout */}
      <div className="blog-detail-layout">
        {/* Sticky Left Sidebar: Table of Contents & Social Share */}
        <aside className="blog-sidebar">
          <div className="blog-sidebar-sticky">
            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="blog-toc-card">
                <div className="blog-toc-header">
                  <BookOpen size={14} />
                  <span>Table of Contents</span>
                </div>
                <ul className="blog-toc-list">
                  {tableOfContents.map((item, idx) => (
                    <li
                      key={idx}
                      className={`blog-toc-item ${
                        item.level === 3 ? "level-3" : ""
                      }`}
                      onClick={() => scrollToHeading(item.id)}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Share Box */}
            <div className="blog-share-widget">
              <div className="blog-share-title">Share Article</div>
              <div className="blog-share-buttons">
                {/* Copy Link */}
                <button
                  type="button"
                  className="blog-share-btn"
                  onClick={handleCopyLink}
                  title="Copy link to clipboard"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${shareTitle}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-btn"
                  title="Share via WhatsApp"
                >
                  <span className="text-xs font-bold">WA</span>
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-btn"
                  title="Share on X"
                >
                  <span className="text-xs font-bold">𝕏</span>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-share-btn"
                  title="Share on LinkedIn"
                >
                  <span className="text-xs font-bold">in</span>
                </a>
              </div>
            </div>

            {/* Quick Course CTA */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border border-yellow-400/25">
              <div className="text-xs font-bold uppercase tracking-wider text-yellow-400 mb-1">
                Advance Your Career
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                Master practical engineering in live studio labs at Third Eye.
              </p>
              <Link
                to="/our-courses"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300"
              >
                <span>Browse All Courses</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Article Content */}
        <main className="min-w-0">
          <div
            className="blog-article-content"
            dangerouslySetInnerHTML={{ __html: contentWithHeadingIds }}
          />

          {/* Tags */}
          {Array.isArray(blogData.tags) && blogData.tags.length > 0 && (
            <div className="blog-tags-row">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mr-2">
                Topics:
              </span>
              {blogData.tags.map((tag, i) => (
                <span key={i} className="blog-tag-item">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div className="blog-author-box">
            <div className="blog-author-avatar-large">
              <User size={26} />
            </div>
            <div>
              <div className="text-base font-bold text-white mb-1">
                Written by {blogData.author || "Third Eye Editorial"}
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Created by industry trainers and curriculum directors at Third Eye Computer Classes Jaipur, equipping students with real-world technical skills and corporate readiness.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Related Articles Section */}
      {relatedBlogs.length > 0 && (
        <section className="blog-related-section">
          <h2 className="blog-related-title">
            Related in {blogData.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((rel) => (
              <Link
                key={rel._id || rel.id || rel.slug}
                to={`/blogs/${rel.slug}`}
                className="blog-card group"
              >
                <div className="blog-card-img-wrap">
                  <img
                    src={
                      rel.featuredImage ||
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
                    }
                    alt={rel.title}
                    className="blog-card-img"
                    loading="lazy"
                  />
                  <div className="blog-card-category-badge">
                    {rel.category}
                  </div>
                </div>

                <div className="blog-card-content">
                  <h3 className="blog-card-title">{rel.title}</h3>
                  <p className="blog-card-excerpt">
                    {rel.seoExcerpt || rel.metaDescription}
                  </p>
                  <div className="blog-card-footer">
                    <span className="blog-card-author">
                      {rel.readTime || "4 min read"}
                    </span>
                    <span className="blog-card-read-more group-hover:translate-x-1 transition-transform">
                      <span>Read</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

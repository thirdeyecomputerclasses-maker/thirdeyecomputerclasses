import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  Calendar,
  BookOpen,
  User,
  ArrowUpRight,
} from "lucide-react";
import { getBlogs } from "../../services/blogApi";
import "./BlogsPage.css";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    document.title = "Tech Insights & Career Blog | Third Eye Computer Classes Jaipur";
    window.scrollTo(0, 0);

    setIsLoading(true);
    getBlogs({ status: "published" })
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to load published blogs:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Compute category pills list
  const categoryList = useMemo(() => {
    const set = new Set();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["all", ...Array.from(set)];
  }, [blogs]);

  // Filtered blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesCategory =
        selectedCategory === "all" ||
        (b.category && b.category.toLowerCase() === selectedCategory.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        b.seoExcerpt?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        (Array.isArray(b.keywords) &&
          b.keywords.some((k) => k.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [blogs, searchQuery, selectedCategory]);

  // Featured blog: Pick the first or highest viewed blog
  const featuredBlog = useMemo(() => {
    if (selectedCategory !== "all" || searchQuery) return null;
    return filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  }, [filteredBlogs, selectedCategory, searchQuery]);

  // Remaining articles
  const regularBlogs = useMemo(() => {
    if (featuredBlog) {
      return filteredBlogs.slice(1);
    }
    return filteredBlogs;
  }, [filteredBlogs, featuredBlog]);

  const formatDate = (dateString) => {
    if (!dateString) return "Recently Published";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <section className="blogs-hero">
        <div className="blogs-hero-badge">
          <Sparkles size={14} />
          <span>Knowledge Hub & Tech Insights</span>
        </div>
        <h1 className="blogs-hero-title">
          Tech Chronicles &{" "}
          <span className="blogs-hero-title-highlight">Career Guides</span>
        </h1>
        <p className="blogs-hero-subtitle">
          In-depth tutorials, industry breakthroughs, placement roadmaps, and expert tips from Rajasthan's pioneer institute for Animation, CAD Jewelry, and Full-Stack Engineering.
        </p>

        {/* Live Search Input */}
        <div className="blogs-search-wrap">
          <Search size={18} className="blogs-search-icon" />
          <input
            type="text"
            className="blogs-search-input"
            placeholder="Search tutorials, animation, CAD, React, placement roadmaps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="blogs-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="blogs-categories-bar">
          {categoryList.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`blogs-category-pill ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === "all" ? "All Topics" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="blogs-container">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-zinc-400 text-sm">Loading latest articles from Third Eye...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="blogs-empty-state">
            <div className="blogs-empty-icon">
              <BookOpen size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Articles Found</h3>
            <p className="text-zinc-400 text-sm mb-4">
              We couldn't find any articles matching "{searchQuery}". Try a different keyword or reset filters.
            </p>
            <button
              type="button"
              className="blogs-category-pill active"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Post Spotlight */}
            {featuredBlog && (
              <article className="blogs-featured-card">
                <div className="blogs-featured-img-wrap">
                  <img
                    src={
                      featuredBlog.featuredImage ||
                      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80"
                    }
                    alt={featuredBlog.title}
                    className="blogs-featured-img"
                    loading="eager"
                  />
                  <div className="blogs-featured-badge">
                    ★ Featured Story
                  </div>
                </div>

                <div className="blogs-featured-content">
                  <div className="blogs-meta-row">
                    <span className="text-[#f6d96b] font-semibold">
                      {featuredBlog.category}
                    </span>
                    <span>•</span>
                    <span className="blogs-meta-item">
                      <Calendar size={13} />
                      {formatDate(featuredBlog.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="blogs-meta-item">
                      <Clock size={13} />
                      {featuredBlog.readTime || "5 min read"}
                    </span>
                  </div>

                  <Link to={`/blogs/${featuredBlog.slug}`}>
                    <h2 className="blogs-featured-title">
                      {featuredBlog.title}
                    </h2>
                  </Link>

                  <p className="blogs-featured-excerpt">
                    {featuredBlog.seoExcerpt || featuredBlog.metaDescription}
                  </p>

                  <div className="blogs-featured-footer">
                    <div className="blogs-author-info">
                      <div className="blogs-author-avatar">
                        <User size={14} />
                      </div>
                      <span className="blogs-author-name">
                        {featuredBlog.author || "Third Eye Editorial"}
                      </span>
                    </div>

                    <Link
                      to={`/blogs/${featuredBlog.slug}`}
                      className="blogs-read-btn"
                    >
                      <span>Read Story</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Articles Grid */}
            <div className="blogs-grid">
              {regularBlogs.map((blog) => (
                <Link
                  key={blog._id || blog.id || blog.slug}
                  to={`/blogs/${blog.slug}`}
                  className="blog-card group"
                >
                  <div className="blog-card-img-wrap">
                    <img
                      src={
                        blog.featuredImage ||
                        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
                      }
                      alt={blog.title}
                      className="blog-card-img"
                      loading="lazy"
                    />
                    <div className="blog-card-category-badge">
                      {blog.category}
                    </div>
                  </div>

                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatDate(blog.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {blog.readTime || "4 min read"}
                      </span>
                    </div>

                    <h3 className="blog-card-title">{blog.title}</h3>

                    <p className="blog-card-excerpt">
                      {blog.seoExcerpt || blog.metaDescription}
                    </p>

                    <div className="blog-card-footer">
                      <span className="blog-card-author">
                        By {blog.author || "Third Eye Team"}
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
          </>
        )}

        {/* Bottom Conversion Banner */}
        <div className="blogs-cta-banner">
          <h2 className="blogs-cta-title">
            Ready to Turn Insights into Industry Mastery?
          </h2>
          <p className="blogs-cta-desc">
            Explore our government-recognized, ISO 9001 certified diploma programs with 100% placement assistance and live studio labs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/our-courses" className="blogs-cta-btn">
              <span>Explore Certified Courses</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-zinc-300 hover:text-white border border-white/15 hover:border-yellow-400/50 transition-all font-semibold text-sm"
            >
              <span>Book Free Demo Class</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

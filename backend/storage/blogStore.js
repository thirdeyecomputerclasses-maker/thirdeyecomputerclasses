const Blog = require("../models/Blog");
const { getDBStatus } = require("../config/db");

const generateSlug = (title) => {
  const cleaned = (title || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || `blog-${Date.now()}`;
};

const calculateReadingTime = (content = "") => {
  const plainText = content.replace(/<[^>]*>/g, " ").trim();
  const words = plainText ? plainText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

const INITIAL_SEED_BLOGS = [
  {
    title: "How Generative AI is Reshaping 3D Animation & Visual Effects in 2026",
    slug: "how-generative-ai-reshaping-3d-animation-vfx-2026",
    category: "3D Animation",
    author: "ThirdEye VFX Lab",
    publishedAt: new Date("2026-03-15T10:00:00.000Z"),
    status: "published",
    readTime: "5 min read",
    views: 1240,
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    seoExcerpt: "Discover how AI motion capture, neural rendering, and procedural textures are transforming film and game animation pipelines for creators.",
    metaTitle: "Generative AI in 3D Animation & VFX (2026 Trends) | ThirdEye",
    metaDescription: "Learn how modern animation studios and artists in Jaipur leverage AI-assisted modeling, texture generation, and real-time VFX rendering in Blender and Maya.",
    keywords: ["3D Animation", "Generative AI", "VFX Pipelines", "Maya", "Blender", "Jaipur Animation Institute"],
    tags: ["Animation", "AI", "VFX", "Gaming", "Blender"],
    content: `
      <h2>The New Renaissance in Visual Storytelling</h2>
      <p>The visual effects and animation industry is experiencing its most seismic technological leap since the dawn of computer-generated graphics in the early 1990s. In 2026, artificial intelligence is no longer just a buzzword in research labs—it is directly embedded into every phase of professional pre-production, 3D asset generation, motion capture cleanup, and composite rendering.</p>
      
      <h2>1. Neural Motion Capture & Real-time Tracking</h2>
      <p>Gone are the days when motion capture required ultra-expensive multi-camera studio suites with retro-reflective optical suits. Today, multi-view neural networks analyze standard high-framerate smartphone video feeds to extract full-body biomechanics, hand gestures, and micro-facial expressions with sub-millimeter precision.</p>
      <p>At ThirdEye Computer Classes, students learn to combine these AI-accelerated captures with classical kinematic rigging in Autodesk Maya and Blender, reducing tedious keyframe fixing from weeks to hours.</p>

      <h2>2. Procedural and AI-Driven Texturing</h2>
      <p>Creating photorealistic PBR (Physically Based Rendering) materials traditionally required hours of manual painting and node network crafting. Tools like Substance 3D integrated with neural diffusion models allow artists to describe complex surface weathering—such as "oxidized hammered bronze with desert dust accumulation"—and receive fully calibrated height, roughness, normal, and metallic maps instantaneously.</p>

      <h2>3. Real-Time Engines Take Over the Render Farm</h2>
      <p>With Unreal Engine 5.5 and nanite mesh micro-geometry, animators can iterate inside final-pixel environments with dynamic lighting without waiting 8 hours for a single frame to bake. What does this mean for aspiring students? The bar for technical execution is higher, but the speed of creative expression has never been faster.</p>

      <h2>Key Takeaways for Students Entering the Industry</h2>
      <ul>
        <li><strong>Master the Fundamentals:</strong> AI tools amplify talent; they do not replace fundamental principles of weight, timing, anticipation, and color theory.</li>
        <li><strong>Build a Hybrid Portfolio:</strong> Showcase traditional 3D mastery alongside modern AI-assisted workflow optimization.</li>
        <li><strong>Hands-on Studio Experience:</strong> Practical lab hours with mentor feedback remain irreplaceable for commercial success.</li>
      </ul>
    `,
  },
  {
    title: "Top 7 Computer Courses with Highest Placement Rates in Jaipur (2026 Guide)",
    slug: "top-7-computer-courses-highest-placement-jaipur-2026",
    category: "Career & Placement",
    author: "Career Advisory Desk",
    publishedAt: new Date("2026-03-28T09:30:00.000Z"),
    status: "published",
    readTime: "6 min read",
    views: 2890,
    featuredImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    seoExcerpt: "Comprehensive analysis of top skill-based technical diplomas in Jaipur offering immediate corporate job placements and freelance earnings.",
    metaTitle: "Best Computer Courses for 100% Job Placement in Jaipur | ThirdEye",
    metaDescription: "Explore highest-paying computer certifications in Jaipur, including Full Stack Development, Tally Prime, Graphic Design, and 3D CAD Jewelry.",
    keywords: ["Computer Courses Jaipur", "Job Placement", "Tally Prime", "CAD Jewelry", "Full Stack Web Development", "Graphic Design Jaipur"],
    tags: ["Career", "Placements", "Computer Classes", "Jaipur", "Jobs"],
    content: `
      <h2>Bridging the College-to-Corporate Skill Gap</h2>
      <p>In today's fast-paced tech economy, traditional theoretical degrees often fall short of meeting actual industry requirements. Jaipur has rapidly transformed into a vibrant IT, digital media, and gemstone design corridor, creating unprecedented demand for hands-on certified professionals.</p>

      <h2>1. Full Stack Web & Mobile Development</h2>
      <p>With businesses migrating completely to cloud-native platforms, the need for full-stack JavaScript developers (React 19, Next.js, Node.js, and MongoDB) has surged over 40% year-on-year in Rajasthan. Entry-level salaries range comfortably between ₹3.5 LPA to ₹6.5 LPA for skilled candidates.</p>

      <h2>2. 3D CAD Jewelry Design (Matrix & Rhino)</h2>
      <p>Jaipur is universally renowned as the global capital of colored gemstones and fine jewelry manufacturing. Mastery of Matrix 3D CAD software enables students to secure immediate positions in export houses, luxury jewelry brands, and custom design studios.</p>

      <h2>3. Computerized Accounting with Tally Prime & GST</h2>
      <p>Every commercial enterprise requires precise financial ledger management, e-invoicing, GST reconciliations, and balance sheet auditing. A verified certification in Tally Prime combined with Advanced Excel formulas guarantees quick employment in corporate finance teams.</p>

      <h2>4. Graphic Design & Corporate Branding</h2>
      <p>From social media agencies to packaging firms, graphic designers who understand typography, vector illustration, and digital marketing creatives in Photoshop and Illustrator are constantly in high demand.</p>

      <h2>Why Hands-on Project Labs Beat Rote Memorization</h2>
      <p>At ThirdEye Computer Classes, every student builds a verified live portfolio before stepping into employer interviews. Our dedicated placement cell coordinates directly with over 150+ regional and multinational hiring partners.</p>
    `,
  },
  {
    title: "Mastering Modern Full Stack Web Architecture: From Zero to Deployment",
    slug: "mastering-modern-full-stack-web-architecture-2026",
    category: "Web Development",
    author: "ThirdEye Engineering Team",
    publishedAt: new Date("2026-04-05T14:15:00.000Z"),
    status: "published",
    readTime: "7 min read",
    views: 1780,
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    seoExcerpt: "A complete step-by-step roadmap to building production-ready scalable web applications using React, Express, MongoDB, and modern DevOps.",
    metaTitle: "Full Stack Web Development Roadmap (2026) | ThirdEye Classes",
    metaDescription: "Master modern full stack web development. Learn React, Node.js, MongoDB Atlas, RESTful API design, authentication, and cloud deployment pipelines.",
    keywords: ["Full Stack Development", "React 19", "Node.js", "Express", "MongoDB", "DevOps", "Web Roadmap"],
    tags: ["React", "NodeJS", "JavaScript", "MongoDB", "Full Stack"],
    content: `
      <h2>The Anatomy of a Production-Grade Web Application</h2>
      <p>Building a successful web platform requires more than just knowing HTML, CSS, and basic JavaScript. Today's software engineers must understand client-server state synchronization, authentication handshakes, database indexing, and edge deployments.</p>

      <h2>Step 1: Frontend Architecture with Modern React</h2>
      <p>Modern React applications prioritize declarative component architecture, custom hook composition, and fluid user interactions. By pairing React with Tailwind CSS and Framer Motion, developers can craft interfaces that feel native, responsive, and visually stunning.</p>

      <h2>Step 2: Resilient RESTful APIs with Node.js & Express</h2>
      <p>Your backend server acts as the central brain. Designing clean route structures, rate limiting, JWT-based security clearance, and centralized error handling middleware ensures the system remains stable under heavy traffic spikes.</p>

      <h2>Step 3: Database Optimization with MongoDB Atlas</h2>
      <p>NoSQL databases like MongoDB provide flexible schema structures without sacrificing performance. Utilizing indexing on frequently queried fields like slugs, category filters, and timestamps keeps query latency under 5 milliseconds even with millions of records.</p>

      <h2>Step 4: Continuous Deployment & Cloud CDN</h2>
      <p>Automate your builds using Git webhooks and modern platforms like Netlify, Vercel, and Render. Offloading heavy asset delivery to CDNs like ImageKit ensures fast global load times and high Google PageSpeed scores.</p>
    `,
  },
];

let inMemoryBlogs = [...INITIAL_SEED_BLOGS];

class BlogStore {
  static async getAll({ category, search, status, tag, limit, page = 1 } = {}) {
    if (getDBStatus()) {
      const filter = {};
      if (category && category !== "all") {
        filter.category = new RegExp(`^${category}$`, "i");
      }
      if (status && status !== "all") {
        filter.status = status;
      }
      if (tag && tag !== "all") {
        filter.tags = tag;
      }
      if (search) {
        const regex = new RegExp(search, "i");
        filter.$or = [
          { title: regex },
          { seoExcerpt: regex },
          { metaTitle: regex },
          { category: regex },
          { content: regex },
          { keywords: regex },
        ];
      }

      let query = Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 });

      if (limit) {
        const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
        query = query.skip(skip).limit(parseInt(limit, 10));
      }

      const blogs = await query.lean();
      return blogs.map((b) => ({ ...b, id: b._id.toString() }));
    }

    // Fallback: In-Memory
    let result = [...inMemoryBlogs];

    if (category && category !== "all") {
      result = result.filter(
        (b) => b.category && b.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (status && status !== "all") {
      result = result.filter((b) => b.status === status);
    }
    if (tag && tag !== "all") {
      result = result.filter((b) => b.tags && b.tags.includes(tag));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.seoExcerpt?.toLowerCase().includes(q) ||
          b.category?.toLowerCase().includes(q) ||
          b.content?.toLowerCase().includes(q) ||
          (Array.isArray(b.keywords) && b.keywords.some((k) => k.toLowerCase().includes(q)))
      );
    }

    result.sort((a, b) => new Date(b.publishedAt || b.createdAt || 0) - new Date(a.publishedAt || a.createdAt || 0));

    if (limit) {
      const p = Math.max(1, parseInt(page, 10));
      const lim = parseInt(limit, 10);
      const start = (p - 1) * lim;
      result = result.slice(start, start + lim);
    }

    return result;
  }

  static async getBySlugOrId(idOrSlug) {
    if (!idOrSlug) return null;

    if (getDBStatus()) {
      let blog = null;
      if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
        blog = await Blog.findById(idOrSlug).lean();
      }
      if (!blog) {
        blog = await Blog.findOne({ slug: idOrSlug.toLowerCase() }).lean();
      }
      if (blog) {
        return { ...blog, id: blog._id.toString() };
      }
      return null;
    }

    // Fallback: In-Memory
    return (
      inMemoryBlogs.find(
        (b) =>
          b.slug?.toLowerCase() === idOrSlug.toLowerCase() ||
          b.id === idOrSlug ||
          b._id === idOrSlug
      ) || null
    );
  }

  static async create(data) {
    const title = (data.title || "").trim();
    let slug = (data.slug || "").trim();
    if (!slug) {
      slug = generateSlug(title);
    } else {
      slug = generateSlug(slug);
    }

    const readTime = data.readTime || calculateReadingTime(data.content || "");

    const newBlogData = {
      title,
      slug,
      content: data.content || "",
      seoExcerpt: data.seoExcerpt || "",
      metaTitle: data.metaTitle || `${title} | ThirdEye`,
      metaDescription: data.metaDescription || data.seoExcerpt || "",
      keywords: Array.isArray(data.keywords)
        ? data.keywords
        : typeof data.keywords === "string"
        ? data.keywords.split(",").map((k) => k.trim()).filter(Boolean)
        : [],
      featuredImage: data.featuredImage || "",
      category: data.category || "Technology",
      tags: Array.isArray(data.tags)
        ? data.tags
        : typeof data.tags === "string"
        ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      author: data.author || "ThirdEye Expert Team",
      readTime,
      status: data.status === "draft" ? "draft" : "published",
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      views: data.views || 0,
    };

    if (getDBStatus()) {
      let uniqueSlug = newBlogData.slug;
      let counter = 1;
      while (await Blog.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${newBlogData.slug}-${counter}`;
        counter++;
      }
      newBlogData.slug = uniqueSlug;

      const created = await Blog.create(newBlogData);
      return { ...created.toObject(), id: created._id.toString() };
    }

    // Fallback: In-Memory
    const generatedId = `blog_local_${Date.now()}`;
    const fallbackBlog = {
      ...newBlogData,
      _id: generatedId,
      id: generatedId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryBlogs.unshift(fallbackBlog);
    return fallbackBlog;
  }

  static async update(idOrSlug, data) {
    if (getDBStatus()) {
      let query = { slug: idOrSlug };
      if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
        query = { _id: idOrSlug };
      }

      if (data.content && !data.readTime) {
        data.readTime = calculateReadingTime(data.content);
      }
      if (typeof data.keywords === "string") {
        data.keywords = data.keywords.split(",").map((k) => k.trim()).filter(Boolean);
      }
      if (typeof data.tags === "string") {
        data.tags = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
      }

      const updated = await Blog.findOneAndUpdate(query, data, {
        new: true,
        runValidators: true,
      }).lean();

      if (updated) {
        return { ...updated, id: updated._id.toString() };
      }
      return null;
    }

    // Fallback: In-Memory
    const idx = inMemoryBlogs.findIndex(
      (b) =>
        b.id === idOrSlug ||
        b._id === idOrSlug ||
        b.slug?.toLowerCase() === idOrSlug.toLowerCase()
    );

    if (idx !== -1) {
      if (data.content && !data.readTime) {
        data.readTime = calculateReadingTime(data.content);
      }
      if (typeof data.keywords === "string") {
        data.keywords = data.keywords.split(",").map((k) => k.trim()).filter(Boolean);
      }
      if (typeof data.tags === "string") {
        data.tags = data.tags.split(",").map((t) => t.trim()).filter(Boolean);
      }

      inMemoryBlogs[idx] = {
        ...inMemoryBlogs[idx],
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return inMemoryBlogs[idx];
    }
    return null;
  }

  static async delete(idOrSlug) {
    if (getDBStatus()) {
      let query = { slug: idOrSlug };
      if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
        query = { _id: idOrSlug };
      }
      const deleted = await Blog.findOneAndDelete(query).lean();
      return !!deleted;
    }

    // Fallback: In-Memory
    const initialLen = inMemoryBlogs.length;
    inMemoryBlogs = inMemoryBlogs.filter(
      (b) =>
        b.id !== idOrSlug &&
        b._id !== idOrSlug &&
        b.slug?.toLowerCase() !== idOrSlug.toLowerCase()
    );
    return inMemoryBlogs.length < initialLen;
  }

  static async incrementViews(idOrSlug) {
    if (getDBStatus()) {
      let query = { slug: idOrSlug };
      if (/^[0-9a-fA-F]{24}$/.test(idOrSlug)) {
        query = { _id: idOrSlug };
      }
      return await Blog.findOneAndUpdate(query, { $inc: { views: 1 } }, { new: true }).lean();
    }

    const blog = inMemoryBlogs.find(
      (b) =>
        b.id === idOrSlug ||
        b._id === idOrSlug ||
        b.slug?.toLowerCase() === idOrSlug.toLowerCase()
    );
    if (blog) {
      blog.views = (blog.views || 0) + 1;
      return blog;
    }
    return null;
  }

  static async getStats() {
    if (getDBStatus()) {
      const [total, published, draft, viewStats, categories] = await Promise.all([
        Blog.countDocuments(),
        Blog.countDocuments({ status: "published" }),
        Blog.countDocuments({ status: "draft" }),
        Blog.aggregate([{ $group: { _id: null, totalViews: { $sum: "$views" } } }]),
        Blog.distinct("category"),
      ]);

      return {
        total,
        published,
        draft,
        totalViews: viewStats[0]?.totalViews || 0,
        categories,
      };
    }

    const total = inMemoryBlogs.length;
    const published = inMemoryBlogs.filter((b) => b.status === "published").length;
    const draft = inMemoryBlogs.filter((b) => b.status === "draft").length;
    const totalViews = inMemoryBlogs.reduce((sum, b) => sum + (b.views || 0), 0);
    const categories = Array.from(new Set(inMemoryBlogs.map((b) => b.category).filter(Boolean)));

    return { total, published, draft, totalViews, categories };
  }
}

module.exports = BlogStore;

const Course = require("../models/Course");
const { getDBStatus } = require("../config/db");

const generateSlug = (title) => {
  const cleaned = (title || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || `course-${Date.now()}`;
};

const INITIAL_SEED_COURSES = [
  {
    title: "Full Stack Web Development",
    slug: "full-stack-web-development",
    category: "Web Development",
    duration: "6 Months",
    badge: "Job Oriented",
    description: "Master modern full-stack engineering with MongoDB, Express.js, React 19, Node.js, Next.js, and CI/CD cloud deployments.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Basic computer literacy",
      "Curiosity for building responsive web apps",
      "No prior coding experience required",
    ],
    tools: [
      { id: "tool-1", name: "React 19 & Next.js", iconType: "react", glowColor: "rgba(97, 218, 251, 0.3)" },
      { id: "tool-2", name: "Node.js & Express", iconType: "nodejs", glowColor: "rgba(104, 160, 99, 0.3)" },
      { id: "tool-3", name: "MongoDB Atlas", iconType: "mongodb", glowColor: "rgba(71, 162, 72, 0.3)" },
      { id: "tool-4", name: "Tailwind CSS & Git", iconType: "tailwind", glowColor: "rgba(56, 189, 248, 0.3)" },
    ],
    modules: [
      { id: "m-1", moduleNumber: "MODULE 1", title: "HTML5, Modern CSS & Responsive UI", description: "Design principles, flexbox, modern CSS grid, and responsive styling architectures." },
      { id: "m-2", moduleNumber: "MODULE 2", title: "JavaScript ES6+ & Asynchronous Engine", description: "Deep dive into event loop, closures, promises, fetch API, and async/await." },
      { id: "m-3", moduleNumber: "MODULE 3", title: "React Component Architecture & Hooks", description: "Custom hooks, context state management, Framer Motion, and client routing." },
      { id: "m-4", moduleNumber: "MODULE 4", title: "Node.js, Express & RESTful APIs", description: "Middleware, JWT authentication, security headers, and MongoDB modeling." },
      { id: "m-5", moduleNumber: "MODULE 5", title: "Full-Stack Deployment & Capstone Projects", description: "Docker, cloud hosting, CI/CD pipeline automation, and live portfolio review." },
    ],
  },
  {
    title: "UI/UX Design & Design Systems",
    slug: "ui-ux-design-systems",
    category: "Graphic Design",
    duration: "4 Months",
    badge: "Industry Certified",
    description: "Design intuitive digital products from wireframing to interactive prototypes using Figma, Design Tokens, and Micro-interactions.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&auto=format&fit=crop&q=80",
    prerequisites: [
      "Interest in visual design and user experience",
      "Basic understanding of mobile and web interfaces",
      "No graphic design background needed",
    ],
    tools: [
      { id: "tool-1", name: "Figma Pro Suite", iconType: "figma", glowColor: "rgba(242, 78, 30, 0.3)" },
      { id: "tool-2", name: "Adobe Illustrator", iconType: "adobe", glowColor: "rgba(255, 154, 0, 0.3)" },
      { id: "tool-3", name: "Design Tokens & Tokens Studio", iconType: "tokens", glowColor: "rgba(168, 85, 247, 0.3)" },
      { id: "tool-4", name: "Framer Prototyping", iconType: "framer", glowColor: "rgba(0, 85, 255, 0.3)" },
    ],
    modules: [
      { id: "m-1", moduleNumber: "MODULE 1", title: "UX Research, Personas & Information Architecture", description: "User interview techniques, journey mapping, and empathy-driven user flow discovery." },
      { id: "m-2", moduleNumber: "MODULE 2", title: "Visual Design, Typography & Color Harmony", description: "Grid systems, typography hierarchies, and contrast accessibility (WCAG 2.1)." },
      { id: "m-3", moduleNumber: "MODULE 3", title: "Figma Mastery & Component Libraries", description: "Auto-layout, variables, component variants, and interactive prototype components." },
      { id: "m-4", moduleNumber: "MODULE 4", title: "Micro-Interactions & Usability Testing", description: "Interactive animations, usability benchmark studies, and iterative refinement." },
      { id: "m-5", moduleNumber: "MODULE 5", title: "Portfolio Presentation & Client Pitching", description: "Behance case studies, interactive portfolio deployment, and design team critique." },
    ],
  },
];

const CourseStore = {
  checkDB() {
    if (!getDBStatus()) {
      throw new Error("MongoDB database is not connected.");
    }
  },

  async seedIfEmpty() {
    try {
      if (!getDBStatus()) return;
      const count = await Course.countDocuments();
      if (count === 0) {
        await Course.insertMany(INITIAL_SEED_COURSES);
      }
    } catch (err) {}
  },

  sanitizePayload(data) {
    const payload = { ...data };

    if (!payload._id || typeof payload._id !== "string" || !payload._id.match(/^[0-9a-fA-F]{24}$/)) {
      delete payload._id;
    }
    delete payload.id;

    if (Array.isArray(payload.tools)) {
      payload.tools = payload.tools.filter(
        (t) => t && typeof t.name === "string" && t.name.trim().length > 0
      );
    }

    if (Array.isArray(payload.modules)) {
      payload.modules = payload.modules.filter(
        (m) => m && typeof m.title === "string" && m.title.trim().length > 0
      );
    }

    if (Array.isArray(payload.prerequisites)) {
      payload.prerequisites = payload.prerequisites.filter(
        (p) => p && typeof p === "string" && p.trim().length > 0
      );
    }

    return payload;
  },

  async getAll(query = {}) {
    this.checkDB();
    await this.seedIfEmpty();

    const filter = {};
    if (query.category && query.category !== "all") {
      filter.category = new RegExp(query.category, "i");
    }
    if (query.search) {
      filter.$or = [
        { title: new RegExp(query.search, "i") },
        { description: new RegExp(query.search, "i") },
        { category: new RegExp(query.search, "i") },
      ];
    }
    return await Course.find(filter).sort({ createdAt: -1 });
  },

  async getBySlugOrId(identifier) {
    this.checkDB();
    await this.seedIfEmpty();

    let course = null;
    const cleanId = (identifier || "").trim();

    if (cleanId.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(cleanId);
    }
    if (!course) {
      course = await Course.findOne({ slug: cleanId.toLowerCase() });
    }
    return course;
  },

  async create(data) {
    this.checkDB();
    const payload = this.sanitizePayload(data);

    let baseSlug = payload.slug ? generateSlug(payload.slug) : generateSlug(payload.title);
    let finalSlug = baseSlug;

    let attempts = 0;
    while (await Course.findOne({ slug: finalSlug })) {
      attempts++;
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}${attempts > 1 ? attempts : ""}`;
    }

    payload.slug = finalSlug;
    const course = new Course(payload);
    return await course.save();
  },

  async update(id, data) {
    this.checkDB();
    const payload = this.sanitizePayload(data);

    if (payload.title && !payload.slug) {
      payload.slug = generateSlug(payload.title);
    }

    if (payload.slug) {
      const existing = await Course.findOne({ slug: payload.slug, _id: { $ne: id } });
      if (existing) {
        payload.slug = `${payload.slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    return await Course.findByIdAndUpdate(id, payload, {
      returnDocument: "after",
      runValidators: true,
    });
  },

  async delete(id) {
    this.checkDB();
    const cleanId = (id || "").trim();
    const res = await Course.findByIdAndDelete(cleanId);
    return Boolean(res);
  },
};

module.exports = CourseStore;

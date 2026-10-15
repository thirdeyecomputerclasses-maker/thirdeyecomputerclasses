const Job = require("../models/Job");
const { getDBStatus } = require("../config/db");

const INITIAL_SEED_JOBS = [
  {
    title: "Account Executive",
    slug: "account-executive",
    aliases: ["account", "accounts"],
    company: "FUSION CONSTRUCTIONS",
    category: "IT",
    location: "Mansarovar, Jaipur",
    jobType: "Full Time",
    salary: "₹10,000 – ₹15,000 / month",
    openings: "2 Vacancies",
    postedDate: "Active Now",
    experience: "0 – 2 Years",
    description:
      "Responsible for financial ledger maintenance, corporate taxation filing, balance sheet reconciliation, and invoice processing using Tally Prime and Advanced Excel formulas.",
    responsibilities: [
      "Manage client accounting books and daily bank reconciliation statements",
      "Draft financial statements, GST filings, and quarterly tax reports",
      "Process vendor invoices, employee payroll, and operational purchase orders",
      "Coordinate directly with C-level executives for MIS financial summaries",
    ],
    requirements: [
      "Hands-on expertise in Tally Prime, GST filing, and Advanced MS Excel",
      "Certification or coursework in Computerized Accounting (Tally/ADCS)",
      "Good comprehension of ledger accounting principles and billing cycles",
      "Fresher or 0–2 years of practical experience",
    ],
    isActive: true,
  },
  {
    title: "Graphic Designer",
    slug: "graphic-designer",
    aliases: ["graphic", "designer", "graphics"],
    company: "BEYOND DESIGNER",
    category: "IT",
    location: "Jaipur",
    jobType: "Full Time",
    salary: "₹15,000 – ₹22,000 / month",
    openings: "3 Vacancies",
    postedDate: "Urgent Hiring",
    experience: "Fresher to 1.5 Years",
    description:
      "Design creative corporate identity systems, marketing posters, social media banners, vector branding, and print packaging using Adobe Photoshop, Illustrator, and CorelDraw.",
    responsibilities: [
      "Create high-conversion social media ad creatives, banners, and carousels",
      "Design vector logos, brochures, brand identities, and packaging layouts",
      "Collaborate with marketing teams to produce visual marketing materials",
      "Prepare final print-ready CMYK and digital RGB design files",
    ],
    requirements: [
      "Proficiency in Adobe Photoshop, Adobe Illustrator, and CorelDraw",
      "Creative portfolio showcasing digital posters, vector art, or branding",
      "Understanding of typography, color psychology, and modern grid layouts",
      "Diploma or certificate in Graphic Design & Digital Art",
    ],
    isActive: true,
  },
  {
    title: "B2B Sales (BDE)",
    slug: "b2b-sales-bde",
    aliases: ["b2b-sales", "bde", "sales"],
    company: "DIGITAL GYAN TECHNOLOGY",
    category: "IT",
    location: "Jaipur",
    jobType: "Full Time",
    salary: "₹18,000 – ₹28,000 + Incentives",
    openings: "4 Vacancies",
    postedDate: "Active Now",
    experience: "0 – 2 Years",
    description:
      "Drive business growth by sourcing B2B enterprise leads, negotiating corporate training software packages, pitching tech solutions, and conducting client discovery meetings.",
    responsibilities: [
      "Identify corporate clients and schedule institutional discovery meetings",
      "Pitch digital tech tools, software licenses, and training programs",
      "Build long-term recruiter and enterprise client relationships",
      "Maintain lead conversion pipelines and report monthly revenue targets",
    ],
    requirements: [
      "Strong verbal communication and business presentation etiquette",
      "Basic understanding of IT services, digital solutions, and software tracks",
      "Self-driven mindset with ambition for high monthly sales commissions",
      "Freshers with strong interpersonal confidence are welcome",
    ],
    isActive: true,
  },
  {
    title: "Full Stack / MERN Developer",
    slug: "full-stack-mern-developer",
    aliases: ["full-stack", "mern", "mern-developer", "fullstack"],
    company: "TECHNOVATE LABS",
    category: "IT",
    location: "Malviya Nagar, Jaipur",
    jobType: "Full Time",
    salary: "₹25,000 – ₹45,000 / month",
    openings: "2 Vacancies",
    postedDate: "Hot Job",
    experience: "0 – 2 Years / Projects",
    description:
      "Develop responsive web applications utilizing React 19, Node.js, Express, and MongoDB. Integrate third-party REST APIs and implement robust authentication.",
    responsibilities: [
      "Build dynamic user interfaces with React, Tailwind CSS, and state management",
      "Architect backend RESTful APIs with Node.js and Express",
      "Design database schemas and optimize MongoDB queries",
      "Deploy web applications to cloud servers with CI/CD integration",
    ],
    requirements: [
      "Hands-on expertise in JavaScript (ES6+), React, Node.js, Express, and MongoDB",
      "Experience with Git version control, REST APIs, and responsive design",
      "Live capstone project portfolio built during Third Eye curriculum",
      "Knowledge of authentication (JWT), state hooks, and API testing",
    ],
    isActive: true,
  },
  {
    title: "Basic Computer & MIS Executive",
    slug: "basic-computer-mis-executive",
    aliases: ["basic-computer", "mis-executive", "mis"],
    company: "VASCO TELERADIOLOGY",
    category: "IT",
    location: "Sanganer, Jaipur",
    jobType: "Full Time",
    salary: "₹12,000 – ₹18,000 / month",
    openings: "3 Vacancies",
    postedDate: "Active Now",
    experience: "Fresher to 1 Year",
    description:
      "Manage daily clinical documentation, data entry registers, patient report formatting in Excel, and professional email correspondence with healthcare partners.",
    responsibilities: [
      "Perform high-accuracy alphanumeric data entry and record maintenance",
      "Format medical reports and maintain spreadsheets using MS Excel formulas",
      "Manage internal email communication and cloud document filing",
      "Verify patient diagnostic data and compile daily departmental reports",
    ],
    requirements: [
      "Typing speed of 30+ WPM with high accuracy",
      "Proficiency in MS Office (Excel, Word, Outlook) and Internet tools",
      "Certification in Basic Computer / RSCIT / ADCS from Third Eye",
      "Punctuality, organizational discipline, and attention to detail",
    ],
    isActive: true,
  },
  {
    title: "Video Editor & Motion Designer",
    slug: "video-editor-motion-designer",
    aliases: ["video-editor", "motion-designer", "video"],
    company: "RED APPLE MEDIA",
    category: "IT",
    location: "C-Scheme, Jaipur",
    jobType: "Full Time",
    salary: "₹16,000 – ₹26,000 / month",
    openings: "2 Vacancies",
    postedDate: "Urgent Hiring",
    experience: "0 – 2 Years",
    description:
      "Edit high-engagement YouTube series, commercial brand reels, corporate interview capsules, sound design, and color grading using Premiere Pro and After Effects.",
    responsibilities: [
      "Edit raw multi-camera video footage into polished, dynamic stories",
      "Add engaging motion typography, sound effects, B-roll, and lower-thirds",
      "Perform color grading and audio normalization for digital publishing",
      "Deliver exports optimized for YouTube, Instagram Reels, and web playback",
    ],
    requirements: [
      "Mastery of Adobe Premiere Pro, After Effects, and audio mixing",
      "Strong sense of pacing, modern video trends, and hook transitions",
      "Portfolio or showreel showcasing video edits or motion graphics",
      "Completed course in Video Editing / 2D-3D Animation",
    ],
    isActive: true,
  },
];

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const JobStore = {
  checkDB() {
    if (!getDBStatus()) {
      throw new Error("MongoDB is not connected.");
    }
  },

  async seedIfEmpty() {
    try {
      if (!getDBStatus()) return;
      const count = await Job.countDocuments();
      if (count === 0) {
        await Job.insertMany(INITIAL_SEED_JOBS);
      }
    } catch (err) {}
  },

  async getAll(query = {}) {
    this.checkDB();
    await this.seedIfEmpty();

    const filter = {};
    if (query.category && query.category !== "all") {
      filter.category = new RegExp(query.category, "i");
    }
    if (query.jobType && query.jobType !== "all") {
      filter.jobType = query.jobType;
    }
    if (query.location && query.location !== "all") {
      filter.location = new RegExp(query.location, "i");
    }
    if (query.search) {
      filter.$or = [
        { title: new RegExp(query.search, "i") },
        { company: new RegExp(query.search, "i") },
        { description: new RegExp(query.search, "i") },
        { category: new RegExp(query.search, "i") },
        { location: new RegExp(query.search, "i") },
      ];
    }

    return await Job.find(filter).sort({ createdAt: -1 });
  },

  async getBySlugOrId(identifier) {
    this.checkDB();
    await this.seedIfEmpty();

    const cleanId = (identifier || "").trim().toLowerCase();

    if (cleanId.match(/^[0-9a-fA-F]{24}$/)) {
      const byId = await Job.findById(cleanId);
      if (byId) return byId;
    }

    let job = await Job.findOne({ slug: cleanId });
    if (job) return job;

    job = await Job.findOne({ aliases: cleanId });
    if (job) return job;

    return null;
  },

  async create(data) {
    this.checkDB();

    const baseSlug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);
    const existing = await Job.findOne({ slug: baseSlug });
    const finalSlug = existing
      ? `${baseSlug}-${Date.now().toString().slice(-4)}`
      : baseSlug;

    const responsibilities = Array.isArray(data.responsibilities)
      ? data.responsibilities
      : typeof data.responsibilities === "string"
      ? data.responsibilities.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];

    const requirements = Array.isArray(data.requirements)
      ? data.requirements
      : typeof data.requirements === "string"
      ? data.requirements.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];

    const aliases = Array.isArray(data.aliases)
      ? data.aliases
      : typeof data.aliases === "string"
      ? data.aliases.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
      : [finalSlug];

    const job = new Job({
      ...data,
      slug: finalSlug,
      responsibilities,
      requirements,
      aliases: Array.from(new Set([finalSlug, ...aliases])),
    });

    return await job.save();
  },

  async update(id, data) {
    this.checkDB();

    const updateFields = { ...data };

    if (updateFields.slug) {
      updateFields.slug = generateSlug(updateFields.slug);
    }

    if (typeof updateFields.responsibilities === "string") {
      updateFields.responsibilities = updateFields.responsibilities
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (typeof updateFields.requirements === "string") {
      updateFields.requirements = updateFields.requirements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (typeof updateFields.aliases === "string") {
      updateFields.aliases = updateFields.aliases
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    }

    const updated = await Job.findByIdAndUpdate(id, updateFields, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updated) {
      throw new Error("Job not found to update");
    }

    return updated;
  },

  async delete(id) {
    this.checkDB();
    const deleted = await Job.findByIdAndDelete(id);
    if (!deleted) {
      throw new Error("Job not found to delete");
    }
    return { success: true, id };
  },
};

module.exports = JobStore;

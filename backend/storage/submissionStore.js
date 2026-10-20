const Submission = require("../models/Submission");
const { getDBStatus } = require("../config/db");

const submissionStore = {
  checkDB() {
    if (!getDBStatus()) {
      throw new Error("MongoDB is not connected.");
    }
  },

  async getAll(query = {}) {
    this.checkDB();

    const filter = {};

    if (query.formType && query.formType !== "all") {
      filter.formType = query.formType;
    }

    if (query.status && query.status !== "all") {
      filter.status = query.status;
    }

    if (query.search) {
      const q = query.search.trim();
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { city: regex },
        { message: regex },
        { jobTitle: regex },
        { company: regex },
        { course: regex },
        { preferredBranch: regex },
        { sourcePage: regex },
      ];
    }

    return await Submission.find(filter).sort({ createdAt: -1 });
  },

  async getById(id) {
    this.checkDB();
    return await Submission.findById(id);
  },

  async create(data) {
    this.checkDB();

    const submission = new Submission({
      formType: data.formType || "contact",
      name: data.name || data.fullName || "Anonymous Applicant",
      email: data.email || "",
      phone: data.phone || "",
      message: data.message || "",
      city: data.city || "",
      investment: data.investment || "",
      background: data.background || "",
      jobTitle: data.jobTitle || "",
      jobSlug: data.jobSlug || "",
      company: data.company || "",
      resumeFileName: data.resumeFileName || data.fileName || "",
      resumeUrl: data.resumeUrl || "",
      coverLetter: data.coverLetter || "",
      course: data.course || "",
      preferredBranch: data.preferredBranch || "",
      learningMode: data.learningMode || "classroom",
      sourcePage: data.sourcePage || "",
      sourceUrl: data.sourceUrl || "",
      metadata: data.metadata || {},
      status: "new",
    });

    return await submission.save();
  },

  async updateStatus(id, status, adminNotes = null) {
    this.checkDB();

    const update = {};
    if (status) update.status = status;
    if (adminNotes !== null) update.adminNotes = adminNotes;

    return await Submission.findByIdAndUpdate(id, update, {
      returnDocument: "after",
      runValidators: true,
    });
  },

  async delete(id) {
    this.checkDB();
    return await Submission.findByIdAndDelete(id);
  },

  async getStats() {
    this.checkDB();

    const [total, contact, franchise, jobApps, courseInquiries, newSubmissions] = await Promise.all([
      Submission.countDocuments(),
      Submission.countDocuments({ formType: "contact" }),
      Submission.countDocuments({ formType: "franchise" }),
      Submission.countDocuments({ formType: "job_application" }),
      Submission.countDocuments({ formType: "course_inquiry" }),
      Submission.countDocuments({ status: "new" }),
    ]);

    return {
      total,
      contact,
      franchise,
      job_application: jobApps,
      course_inquiry: courseInquiries,
      newSubmissions,
    };
  },
};

module.exports = submissionStore;

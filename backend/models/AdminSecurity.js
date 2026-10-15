const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const roleConfigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    passwordHash: { type: String, required: true },
    description: { type: String },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: String, default: "system" },
  },
  { _id: false }
);

const auditLogSchema = new mongoose.Schema(
  {
    clerkName: { type: String, required: true },
    clerkId: { type: String },
    clerkEmail: { type: String },
    roleUnlocked: {
      type: String,
      enum: ["global_admin", "course_admin", "jobs_admin", "submissions_admin"],
      required: true,
    },
    unlockedAt: { type: Date, default: Date.now },
    ipAddress: { type: String },
  },
  { _id: true }
);

const adminSecuritySchema = new mongoose.Schema(
  {
    configKey: {
      type: String,
      default: "primary_admin_security_config",
      unique: true,
    },
    roles: {
      global_admin: { type: roleConfigSchema, required: true },
      course_admin: { type: roleConfigSchema, required: true },
      jobs_admin: { type: roleConfigSchema, required: true },
      submissions_admin: { type: roleConfigSchema, required: true },
    },
    auditLog: [auditLogSchema],
  },
  { timestamps: true }
);

adminSecuritySchema.statics.getOrCreateConfig = async function () {
  let config = await this.findOne({ configKey: "primary_admin_security_config" });

  if (!config) {
    const defaultGlobalHash = await bcrypt.hash("global@admin123", 10);
    const defaultCourseHash = await bcrypt.hash("course@admin123", 10);
    const defaultJobsHash = await bcrypt.hash("job@admin123", 10);
    const defaultSubmissionsHash = await bcrypt.hash("query@admin123", 10);

    config = await this.create({
      configKey: "primary_admin_security_config",
      roles: {
        global_admin: {
          title: "Global Super Admin",
          passwordHash: defaultGlobalHash,
          description: "Full master access to all sections and security management",
          updatedAt: new Date(),
          updatedBy: "system_init",
        },
        course_admin: {
          title: "Courses Sub-Admin",
          passwordHash: defaultCourseHash,
          description: "Access to view, create, and update courses only",
          updatedAt: new Date(),
          updatedBy: "system_init",
        },
        jobs_admin: {
          title: "Job Openings Sub-Admin",
          passwordHash: defaultJobsHash,
          description: "Access to view, create, and update job openings and applications",
          updatedAt: new Date(),
          updatedBy: "system_init",
        },
        submissions_admin: {
          title: "Queries & Submissions Sub-Admin",
          passwordHash: defaultSubmissionsHash,
          description: "Access to view, manage form submissions and queries",
          updatedAt: new Date(),
          updatedBy: "system_init",
        },
      },
      auditLog: [],
    });
  }

  return config;
};

module.exports = mongoose.model("AdminSecurity", adminSecuritySchema);

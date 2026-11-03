const Mentor = require("../models/Mentor");
const { getDBStatus } = require("../config/db");
const { uploadFileToImageKit, deleteFromImageKit } = require("../config/imagekit");

const INITIAL_SEED_MENTORS = [
  {
    id: "seed_1",
    name: "Mr. M.L. Chaudhary",
    designation: "Founder & Chief Patron",
    category: "leadership",
    image: "https://ik.imagekit.io/thirdeye/leadership/ml_chaudhary.png",
    description: "Founder & Chief Patron with extensive technical aviation and management leadership.",
    order: 1,
    isActive: true,
  },
  {
    id: "seed_2",
    name: "Preeti Sharma",
    designation: "Chief Managing Director",
    category: "leadership",
    image: "https://ik.imagekit.io/thirdeye/leadership/preeti_sharma.png",
    description: "Chief Managing Director leading corporate strategy, HR consulting, and academic growth.",
    order: 2,
    isActive: true,
  },
  {
    id: "seed_3",
    name: "Puneet Sharma",
    designation: "Managing Director",
    category: "leadership",
    image: "https://ik.imagekit.io/thirdeye/leadership/puneet_sharma.png",
    description: "Managing Director with over 20 years of experience in technical direction and operations.",
    order: 3,
    isActive: true,
  },
  {
    id: "seed_4",
    name: "Suumit Sharma",
    designation: "Chief Operating Officer",
    category: "leadership",
    image: "https://ik.imagekit.io/thirdeye/leadership/suumit_sharma.png",
    description: "Chief Operating Officer driving day-to-day operations and student placement success.",
    order: 4,
    isActive: true,
  },
  {
    id: "seed_5",
    name: "Neelam Sharma",
    designation: "Recruitment Head",
    category: "leadership",
    image: "https://ik.imagekit.io/thirdeye/leadership/neelam_sharma.png",
    description: "Recruitment Head managing corporate campus drives and corporate partnerships.",
    order: 5,
    isActive: true,
  },
  {
    id: "seed_6",
    name: "Rahul Verma",
    designation: "Designing Executive",
    category: "faculty",
    image: "https://ik.imagekit.io/thirdeye/students/student_9.jpg",
    description: "Senior Designing Executive guiding students through UI/UX and Graphic Design projects.",
    order: 6,
    isActive: true,
  },
  {
    id: "seed_7",
    name: "Pramendra Sankhla",
    designation: "Civil & Mechanical Trainer",
    category: "faculty",
    image: "https://ik.imagekit.io/thirdeye/students/student_7.jpg",
    description: "Expert Trainer specializing in AutoCAD, Revit Architecture, and STAAD Pro.",
    order: 7,
    isActive: true,
  },
  {
    id: "seed_8",
    name: "Sheetal Sharma",
    designation: "Sales & B.D. Head",
    category: "faculty",
    image: "https://ik.imagekit.io/thirdeye/leadership/sheetal_sharma.png",
    description: "Sales & Business Development Lead driving educational outreach across Rajasthan.",
    order: 8,
    isActive: true,
  },
  {
    id: "seed_9",
    name: "Kushwang Sharma",
    designation: "Social Media & Operations",
    category: "faculty",
    image: "https://ik.imagekit.io/thirdeye/leadership/khushwang_sharma.png",
    description: "Social Media Manager & Operations Lead overseeing student digital engagement.",
    order: 9,
    isActive: true,
  },
];

let inMemoryMentors = INITIAL_SEED_MENTORS.map((m) => ({
  ...m,
  _id: m.id,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

class MentorStore {
  static async seedIfEmpty() {
    if (getDBStatus()) {
      try {
        const count = await Mentor.countDocuments();
        if (count === 0 && INITIAL_SEED_MENTORS.length > 0) {
          const docs = INITIAL_SEED_MENTORS.map((m) => {
            const { id, ...rest } = m;
            return rest;
          });
          await Mentor.insertMany(docs);
          console.log("Seeded initial mentors into MongoDB Atlas.");
        }
      } catch (err) {
        console.warn("Failed to seed initial mentors into MongoDB:", err.message);
      }
    }
  }

  static async getAll({ category, search, activeOnly = false } = {}) {
    if (getDBStatus()) {
      await this.seedIfEmpty();
      const filter = {};
      if (activeOnly) {
        filter.isActive = true;
      }
      if (category && category !== "all") {
        filter.category = category;
      }
      if (search) {
        const regex = new RegExp(search, "i");
        filter.$or = [{ name: regex }, { designation: regex }, { description: regex }];
      }

      const list = await Mentor.find(filter).sort({ order: 1, createdAt: 1 }).lean();
      return list.map((m) => ({
        ...m,
        id: m._id.toString(),
      }));
    }

    // In-memory fallback
    let list = [...inMemoryMentors];
    if (activeOnly) {
      list = list.filter((m) => m.isActive !== false);
    }
    if (category && category !== "all") {
      list = list.filter((m) => m.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.name?.toLowerCase().includes(q) ||
          m.designation?.toLowerCase().includes(q) ||
          m.description?.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => (a.order || 0) - (b.order || 0));
    return list;
  }

  static async getById(id) {
    if (!id) return null;
    if (getDBStatus()) {
      if (/^[0-9a-fA-F]{24}$/.test(id)) {
        const doc = await Mentor.findById(id).lean();
        if (doc) return { ...doc, id: doc._id.toString() };
      }
      return null;
    }
    return inMemoryMentors.find((m) => m.id === id || m._id === id) || null;
  }

  static async create(data, file) {
    let imageUrl = data.image || "";
    let fileId = "";

    if (file && file.buffer) {
      try {
        const uploaded = await uploadFileToImageKit(
          file.buffer,
          file.originalname || "mentor_photo.jpg",
          "/third_eye_mentors"
        );
        imageUrl = uploaded.url;
        fileId = uploaded.fileId || "";
      } catch (err) {
        console.warn("ImageKit mentor upload failed, using fallback/data URL:", err.message);
      }
    }

    if (!imageUrl) {
      imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80";
    }

    const mentorPayload = {
      name: data.name?.trim(),
      designation: data.designation?.trim(),
      category: data.category === "leadership" ? "leadership" : "faculty",
      image: imageUrl,
      fileId,
      description: data.description?.trim() || "",
      order: parseInt(data.order, 10) || 0,
      isActive: data.isActive !== false && data.isActive !== "false",
    };

    if (getDBStatus()) {
      const created = await Mentor.create(mentorPayload);
      return { ...created.toObject(), id: created._id.toString() };
    }

    const newId = `mentor_${Date.now()}`;
    const newRecord = {
      ...mentorPayload,
      _id: newId,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryMentors.push(newRecord);
    return newRecord;
  }

  static async update(id, data, file) {
    let imageUrl = data.image;
    let fileId = data.fileId;

    if (file && file.buffer) {
      try {
        const uploaded = await uploadFileToImageKit(
          file.buffer,
          file.originalname || "mentor_photo.jpg",
          "/third_eye_mentors"
        );
        imageUrl = uploaded.url;
        fileId = uploaded.fileId || "";
      } catch (err) {
        console.warn("ImageKit mentor update upload failed:", err.message);
      }
    }

    const updateFields = {};
    if (data.name !== undefined) updateFields.name = data.name.trim();
    if (data.designation !== undefined) updateFields.designation = data.designation.trim();
    if (data.category !== undefined) {
      updateFields.category = data.category === "leadership" ? "leadership" : "faculty";
    }
    if (imageUrl) updateFields.image = imageUrl;
    if (fileId !== undefined) updateFields.fileId = fileId;
    if (data.description !== undefined) updateFields.description = data.description.trim();
    if (data.order !== undefined) updateFields.order = parseInt(data.order, 10) || 0;
    if (data.isActive !== undefined) {
      updateFields.isActive = data.isActive !== false && data.isActive !== "false";
    }

    if (getDBStatus() && /^[0-9a-fA-F]{24}$/.test(id)) {
      const updated = await Mentor.findByIdAndUpdate(id, updateFields, { new: true }).lean();
      if (updated) return { ...updated, id: updated._id.toString() };
      return null;
    }

    const idx = inMemoryMentors.findIndex((m) => m.id === id || m._id === id);
    if (idx !== -1) {
      inMemoryMentors[idx] = {
        ...inMemoryMentors[idx],
        ...updateFields,
        updatedAt: new Date().toISOString(),
      };
      return inMemoryMentors[idx];
    }
    return null;
  }

  static async delete(id) {
    if (!id) return false;

    if (getDBStatus() && /^[0-9a-fA-F]{24}$/.test(id)) {
      const existing = await Mentor.findById(id).lean();
      if (existing) {
        if (existing.fileId) {
          deleteFromImageKit(existing.fileId).catch(() => {});
        }
        await Mentor.findByIdAndDelete(id);
        return true;
      }
      return false;
    }

    const idx = inMemoryMentors.findIndex((m) => m.id === id || m._id === id);
    if (idx !== -1) {
      inMemoryMentors.splice(idx, 1);
      return true;
    }
    return false;
  }
}

module.exports = MentorStore;


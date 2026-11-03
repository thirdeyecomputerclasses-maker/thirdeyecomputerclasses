const MentorStore = require("../storage/mentorStore");

const getMentors = async (req, res) => {
  try {
    const { category, search, activeOnly } = req.query;
    const mentors = await MentorStore.getAll({
      category,
      search,
      activeOnly: activeOnly === "true",
    });
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mentors", message: err.message });
  }
};

const getMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await MentorStore.getById(id);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch mentor", message: err.message });
  }
};

const createMentor = async (req, res) => {
  try {
    const { name, designation, category, image, description, order, isActive } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Mentor name is required" });
    }
    if (!designation || !designation.trim()) {
      return res.status(400).json({ error: "Designation is required" });
    }

    const mentor = await MentorStore.create(
      {
        name,
        designation,
        category,
        image,
        description,
        order,
        isActive,
      },
      req.file
    );

    res.status(201).json({
      message: "Mentor card created successfully",
      mentor,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create mentor", message: err.message });
  }
};

const updateMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, category, image, description, order, isActive } = req.body;

    const mentor = await MentorStore.update(
      id,
      {
        name,
        designation,
        category,
        image,
        description,
        order,
        isActive,
      },
      req.file
    );

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found or update failed" });
    }

    res.json({
      message: "Mentor card updated successfully",
      mentor,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update mentor", message: err.message });
  }
};

const deleteMentor = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await MentorStore.delete(id);
    if (!success) {
      return res.status(404).json({ error: "Mentor not found or delete failed" });
    }
    res.json({ message: "Mentor card deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete mentor", message: err.message });
  }
};

module.exports = {
  getMentors,
  getMentor,
  createMentor,
  updateMentor,
  deleteMentor,
};


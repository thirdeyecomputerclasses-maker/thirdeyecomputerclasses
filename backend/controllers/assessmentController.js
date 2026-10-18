const AssessmentStore = require("../storage/assessmentStore");

const getAssessments = async (req, res) => {
  try {
    const { category, search, activeOnly } = req.query;
    const assessments = await AssessmentStore.getAll({
      category,
      search,
      activeOnly: activeOnly === "true" || activeOnly === true,
    });
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assessments", message: err.message });
  }
};

const getAssessment = async (req, res) => {
  try {
    const { slugOrId } = req.params;
    const assessment = await AssessmentStore.getBySlugOrId(slugOrId, false);
    if (!assessment) {
      return res.status(404).json({ error: "Assessment test not found" });
    }
    res.json(assessment);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assessment", message: err.message });
  }
};

const submitAssessment = async (req, res) => {
  try {
    const { slugOrId } = req.params;
    const { answers, studentInfo } = req.body;

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ error: "User answers object is required for evaluation." });
    }

    const result = await AssessmentStore.submitAssessment(slugOrId, answers);

    // If student provided contact details, it can be logged as inquiry/candidate profile
    if (studentInfo && (studentInfo.name || studentInfo.phone || studentInfo.email)) {
      result.studentInfo = studentInfo;
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit assessment", message: err.message });
  }
};

const getAdminAssessments = async (req, res) => {
  try {
    const assessments = await AssessmentStore.getAllForAdmin();
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admin assessments", message: err.message });
  }
};

const getAssessmentStats = async (req, res) => {
  try {
    const stats = await AssessmentStore.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch assessment statistics", message: err.message });
  }
};

const createAssessment = async (req, res) => {
  try {
    const data = req.body;
    if (!data.title || !data.title.trim()) {
      return res.status(400).json({ error: "Assessment title is required." });
    }
    if (!data.category || !data.category.trim()) {
      return res.status(400).json({ error: "Category is required." });
    }
    if (!Array.isArray(data.questions) || data.questions.length === 0) {
      return res.status(400).json({ error: "At least one question is required." });
    }

    const created = await AssessmentStore.create(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Failed to create assessment", message: err.message });
  }
};

const updateAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await AssessmentStore.update(id, data);
    if (!updated) {
      return res.status(404).json({ error: "Assessment not found to update." });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update assessment", message: err.message });
  }
};

const deleteAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await AssessmentStore.delete(id);
    if (!success) {
      return res.status(404).json({ error: "Assessment not found to delete." });
    }
    res.json({ success: true, message: "Assessment successfully removed." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete assessment", message: err.message });
  }
};

module.exports = {
  getAssessments,
  getAssessment,
  submitAssessment,
  getAdminAssessments,
  getAssessmentStats,
  createAssessment,
  updateAssessment,
  deleteAssessment,
};

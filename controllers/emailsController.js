const emailService = require("../services/emailsService");
const mailSurpService = require("../services/mailSurpService");
const fetchAndStoreEmails = async (req, res) => {
  try {
    const inboxId = req.params.id;
    const { user_id } = req.body; 

    const result = await mailSurpService.fetchAndStoreEmails(inboxId, user_id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getInboxFromDB = async (req, res) => {
  try {
    const user_id = req.params.id;
    const limit = parseInt(req.query.limit) || 50;
    const emails = await emailService.getInboxFromDB(user_id, limit);
    res.json(emails);
  } catch (err) {
    console.error("❌ getInboxFromDB:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const fetchEmails = async (req, res) => {
  try {
    const { user_id } = req.query;
    const emails = await emailService.fetchEmails(user_id);
    res.json(emails);
  } catch (err) {
    console.error("❌ fetchEmails:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const createEmail = async (req, res) => {
  try {
    const { prefix, duration, user_id } = req.body;
    const email = await mailSurpService.createEmail(prefix, duration, user_id);
    res.status(201).json(email);
  } catch (err) {
    console.error("❌ createEmail:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    await emailService.deleteEmail(id);
    res.json({ message: "Email deleted successfully" });
  } catch (err) {
    console.error("❌ deleteEmail:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const getEmailById = async (req, res) => {
  try {
    const { id } = req.params;
    const email = await emailService.getEmailById(id);
    res.json(email);
  } catch (err) {
    console.error("❌ getEmailById:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await emailService.markAsRead(id);
    res.json({ message: "Email marked as read" });
  } catch (err) {
    console.error("❌ markAsRead:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const markAsUnread = async (req, res) => {
  try {
    const { id } = req.params;
    await emailService.markAsUnread(id);
    res.json({ message: "Email marked as unread" });
  } catch (err) {
    console.error("❌ markAsUnread:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const toggleStarred = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmail = await emailService.toggleStarred(id);
    res.json({
      message: updatedEmail.starred ? "Email starred" : "Email unstarred",
    });
  } catch (err) {
    console.error("❌ toggleStarred:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const saveDraft = async (req, res) => {
  try {
    const { user_id, subject, body } = req.body;
    const draft = await emailService.saveDraft(user_id, subject, body);
    res.status(201).json({ message: "Draft saved successfully", draft });
  } catch (err) {
    console.error("❌ saveDraft:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const getDrafts = async (req, res) => {
  try {
    const { user_id } = req.query;
    const drafts = await emailService.getDrafts(user_id);
    res.json(drafts);
  } catch (err) {
    console.error("❌ getDrafts:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const deleteDraft = async (req, res) => {
  try {
    const { id } = req.params;
    await emailService.deleteDraft(id);
    res.json({ message: "Draft deleted successfully" });
  } catch (err) {
    console.error("❌ deleteDraft:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const searchEmails = async (req, res) => {
  try {
    const { query, user_id } = req.query;
    const results = await emailService.searchEmails(query, user_id);
    res.json(results);
  } catch (err) {
    console.error("❌ searchEmails:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const filterEmails = async (req, res) => {
  try {
    const { user_id, filterType } = req.query;
    const filtered = await emailService.filterEmails(user_id, filterType);
    res.json(filtered);
  } catch (err) {
    console.error("❌ filterEmails:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const getEmailStats = async (req, res) => {
  try {
    const { user_id } = req.query;
    const stats = await emailService.getEmailStats(user_id);
    res.json(stats);
  } catch (err) {
    console.error("❌ getEmailStats:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
const getRecentEmails = async (req, res) => {
  try {
    const { user_id } = req.query;
    const recent = await emailService.getRecentEmails(user_id);
    res.json(recent);
  } catch (err) {
    console.error("❌ getRecentEmails:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};
module.exports = {
  fetchAndStoreEmails,
  getInboxFromDB,
  fetchEmails,
  createEmail,
  deleteEmail,
  getEmailById,
  markAsRead,
  markAsUnread,
  toggleStarred,
  saveDraft,
  getDrafts,
  deleteDraft,
  searchEmails,
  filterEmails,
  getEmailStats,
  getRecentEmails,
};

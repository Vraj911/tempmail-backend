const { get } = require("mongoose");
const emailService = require("../services/emailsService");
const Email = require("../models/Email");
const Inbox = require("../models/Inbox.js");
const fetchEmails = async (req, res) => {
  try {
    const { user_id } = req.query;
    const emails = await emailService.fetchEmails(user_id);
    res.json(emails);
  } catch (error) {
    console.error("❌ Controller Error (fetchEmails):", error.message);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Server Error" });
  }
};
const createEmail = async (req, res) => {
  try {
    const { prefix, duration, user_id } = req.body;
    const newEmail = await emailService.createEmail(prefix, duration, user_id);
    res.status(201).json({
      message: "Email generated successfully",
      email: {
        id: newEmail._id,
        address: newEmail.address,
        expires_at: newEmail.expires_at,
      },
    });
  } catch (error) {
    console.error("❌ Controller Error (createEmail):", error.message);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Server Error" });
  }
};
const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    await emailService.deleteEmail(id);
    res.json({ message: "Email deleted successfully" });
  } catch (error) {
    console.error("❌ Controller Error (deleteEmail):", error.message);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Server Error" });
  }
};
const getEmailById = async (req, res) => {
  try {
    const { id } = req.params;
    const email = await emailService.getEmailById(id);
    res.json(email);
  } catch (error) {
    console.error("❌ Controller Error (getEmailById):", error.message);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Server Error" });
  }
};
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await emailService.markAsRead(id);
    res.json({ message: "Email marked as read" });
  } catch (error) {
    console.error("❌ Controller Error (markAsRead):", error.message);
    res.status(500).json({ error: "Failed to mark email as read" });
  }
};
const markAsUnread = async (req, res) => {
  try {
    const { id } = req.params;
    await emailService.markAsUnread(id);
    res.json({ message: "Email marked as unread" });
  } catch (error) {
    console.error("❌ Controller Error (markAsUnread):", error.message);
    res.status(500).json({ error: "Failed to mark email as unread" });
  }
};
const toggleStarred = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmail = await emailService.toggleStarred(id);
    res.json({
      message: updatedEmail.starred
        ? "Email starred successfully"
        : "Email unstarred successfully",
    });
  } catch (error) {
    console.error("❌ Controller Error (toggleStarred):", error.message);
    res.status(500).json({ error: "Failed to toggle star" });
  }
};
const saveDraft = async (req, res) => {
  try {
    const { user_id, subject, body } = req.body;
    const draft = await emailService.saveDraft(user_id, subject, body);
    res.status(201).json({ message: "Draft saved successfully", draft });
  } catch (error) {
    console.error("❌ Controller Error (saveDraft):", error.message);
    res.status(500).json({ error: "Failed to save draft" });
  }
};
const getDrafts = async (req, res) => {
  try {
    const { user_id } = req.query;
    const drafts = await emailService.getDrafts(user_id);
    res.json(drafts);
  } catch (error) {
    console.error("❌ Controller Error (getDrafts):", error.message);
    res.status(500).json({ error: "Failed to fetch drafts" });
  }
};
const deleteDraft = async (req, res) => {
  try {
    const { id } = req.params;
    await emailService.deleteDraft(id);
    res.json({ message: "Draft deleted successfully" });
  } catch (error) {
    console.error("❌ Controller Error (deleteDraft):", error.message);
    res.status(500).json({ error: "Failed to delete draft" });
  }
};
const searchEmails = async (req, res) => {
  try {
    const { query, user_id } = req.query;
    const results = await emailService.searchEmails(query, user_id);
    res.json(results);
  } catch (error) {
    console.error("❌ Controller Error (searchEmails):", error.message);
    res.status(500).json({ error: "Failed to search emails" });
  }
};
const filterEmails = async (req, res) => {
  try {
    const { user_id, filterType } = req.query;
    const filtered = await emailService.filterEmails(user_id, filterType);
    res.json(filtered);
  } catch (error) {
    console.error("❌ Controller Error (filterEmails):", error.message);
    res.status(500).json({ error: "Failed to filter emails" });
  }
};
const getEmailStats = async (req, res) => {
  try {
    const { user_id } = req.query;
    const stats = await emailService.getEmailStats(user_id);
    res.json(stats);
  } catch (error) {
    console.error("❌ Controller Error (getEmailStats):", error.message);
    res.status(500).json({ error: "Failed to fetch email stats" });
  }
};
const getRecentEmails = async (req, res) => {
  try {
    const { user_id } = req.query;
    const recent = await emailService.getRecentEmails(user_id);
    res.json(recent);
  } catch (error) {
    console.error("❌ Controller Error (getRecentEmails):", error.message);
    res.status(500).json({ error: "Failed to fetch recent emails" });
  }
};

const getInboxMessages = async (req, res) => {
  try {
    const emailAddress = req.query.email;
    if (!emailAddress) {
      return res.status(400).json({ message: "Email address is required" });
    }

    // Step 1: Find the email document by address
    const emailDoc = await Email.findOne({ address: emailAddress });
    if (!emailDoc) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Step 2: Find inbox messages with email_id
    const messages = await Inbox.find({ email_id: emailDoc._id }).sort({ received_at: -1 });

    res.status(200).json({ messages });
  } catch (err) {
    console.error("Error fetching inbox messages:", err);
    res.status(500).json({ message: "Error fetching inbox messages" });
  }
};

module.exports = {
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
  getInboxMessages
};

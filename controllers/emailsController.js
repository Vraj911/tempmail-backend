const emailService = require("../services/emailsService");
const fetchEmails = async (req, res) => {
  try {
    const { user_id } = req.query;
    const emails = await emailService.fetchEmails(user_id);
    res.json(emails);
  } catch (error) {
    console.error("❌ Controller Error:", error.message);
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
    console.error("❌ Controller Error:", error.message);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Server Error" });
  }
};
const deleteEmailController = async (req, res) => {
  try {
    const { id } = req.query;
    await emailService.deleteEmail(id);
    res.json({ message: "Email deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting email:", err);
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
};
module.exports = {
  fetchEmails,
  createEmail,
  deleteEmailController,
};

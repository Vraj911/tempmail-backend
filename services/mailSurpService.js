const { MailSlurp } = require("mailslurp-client");
const Inbox = require("../models/Inbox");
const Email = require("../models/Email");

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });

// ---------------- MailSlurp: Fetch and store emails ----------------
/**
 * Fetch emails from MailSlurp inbox and store in DB
 * @param {string} inboxId - MailSlurp inbox ID
 * @param {string} user_id - User ID to associate emails with
 */
exports.fetchAndStoreEmails = async (inboxId, user_id) => {
  if (!inboxId) throw { message: "Inbox ID is required", statusCode: 400 };
  if (!user_id) throw { message: "user_id is required", statusCode: 400 };

  const emails = await mailslurp.getEmails(inboxId);
  const savedEmails = [];

  for (const mail of emails) {
    const exists = await Inbox.findOne({ email_id: mail.id });
    if (!exists) {
      const newMail = await Inbox.create({
        email_id: mail.id,
        user_id,
        from_address: mail.from || mail.sender?.emailAddress || "unknown",
        subject: mail.subject || "(No Subject)",
        body: mail.body || "",
        received_at: mail.createdAt,
      });
      savedEmails.push(newMail);
    }
  }

  return { message: "Emails fetched and stored", count: savedEmails.length };
};
/**
 * Create a new temporary email inbox using MailSlurp and save in DB
 * @param {string} prefix - Optional prefix for email address
 * @param {number} duration - Expiration duration in minutes
 * @param {string} user_id - User ID to associate the inbox with
 */
exports.createEmail = async (prefix, duration = 10, user_id) => {
  if (!user_id) throw { message: "user_id is required", statusCode: 400 };
  const inbox = await mailslurp.createInbox();
  const expiresAt = new Date(Date.now() + duration * 60 * 1000);
  return await Email.create({
    user_id,
    prefix: prefix || undefined,
    address: inbox.emailAddress,
    inboxId: inbox.id,
    expires_at: expiresAt,
  });
};

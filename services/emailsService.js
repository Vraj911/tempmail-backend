const mongoose = require("mongoose");
const Email = require("../models/Email");
const Inbox = require("../models/Inbox");

// ---------------- Inbox ----------------
exports.getInboxFromDB = async (user_id, limit = 50) => {
  if (!user_id || !mongoose.Types.ObjectId.isValid(user_id))
    throw { message: "Valid user_id is required", statusCode: 400 };

  return await Inbox.find({ user_id })
    .sort({ received_at: -1 })
    .limit(limit);
};

// ---------------- Email CRUD ----------------
exports.fetchEmails = async (user_id) => {
  if (user_id && !mongoose.Types.ObjectId.isValid(user_id))
    throw { message: "Invalid user_id", statusCode: 400 };

  const query = user_id ? { user_id } : {};
  return await Email.find(query).sort({ received_at: -1 });
};

exports.createEmail = async (prefix, duration, user_id) => {
  if (!user_id) throw { message: "user_id is required", statusCode: 400 };
  if (!mongoose.Types.ObjectId.isValid(user_id))
    throw { message: "Invalid user_id", statusCode: 400 };

  const validUserId = new mongoose.Types.ObjectId(user_id);
  const randomPart = Math.random().toString(36).substring(2, 8);
  const emailAddress = `${prefix || "temp"}${randomPart}@rapidmail.com`;
  const expiresAt = new Date(Date.now() + (duration || 10) * 60 * 1000);

  return await Email.create({
    user_id: validUserId,
    prefix: prefix || "temp",
    address: emailAddress,
    expires_at: expiresAt,
  });
};

exports.deleteEmail = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw { message: "Invalid email ID", statusCode: 400 };

  const deleted = await Email.findByIdAndDelete(id);
  if (!deleted) throw { message: "Email not found", statusCode: 404 };
  return deleted;
};

exports.getEmailById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw { message: "Invalid email ID", statusCode: 400 };
  return await Email.findById(id);
};

// ---------------- Read / Unread ----------------
exports.markAsRead = async (id) => {
  return await Email.findByIdAndUpdate(id, { read: true }, { new: true });
};
exports.markAsUnread = async (id) => {
  return await Email.findByIdAndUpdate(id, { read: false }, { new: true });
};

// ---------------- Star / Unstar ----------------
exports.toggleStarred = async (id) => {
  const email = await Email.findById(id);
  if (!email) throw { message: "Email not found", statusCode: 404 };
  email.starred = !email.starred;
  await email.save();
  return email;
};

// ---------------- Search / Filter ----------------
exports.searchEmails = async (query, user_id) => {
  const search = { subject: { $regex: query, $options: "i" } };
  if (user_id) search.user_id = user_id;
  return await Email.find(search).sort({ received_at: -1 });
};

exports.filterEmails = async (user_id, filterType) => {
  const filter = { user_id };
  switch (filterType) {
    case "unread":
      filter.read = false;
      break;
    case "read":
      filter.read = true;
      break;
    case "starred":
      filter.starred = true;
      break;
    default:
      break;
  }
  return await Email.find(filter).sort({ received_at: -1 });
};

// ---------------- Stats / Recent ----------------
exports.getEmailStats = async (user_id) => {
  const total = await Email.countDocuments({ user_id });
  const read = await Email.countDocuments({ user_id, read: true });
  const unread = total - read;
  const starred = await Email.countDocuments({ user_id, starred: true });
  return { total, read, unread, starred };
};

exports.getRecentEmails = async (user_id, limit = 5) => {
  return await Email.find({ user_id }).sort({ received_at: -1 }).limit(limit);
};

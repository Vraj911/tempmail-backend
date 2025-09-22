const mongoose = require("mongoose");
const emailRepository = require("../repositories/emailsRepository"); 
exports.fetchEmails = async (user_id) => {
  if (user_id && !mongoose.Types.ObjectId.isValid(user_id)) {
    const error = new Error("Invalid user_id");
    error.statusCode = 400;
    throw error;
  }
  const query = {};
  if (user_id) {
    query.user_id = user_id;
  }
  return await emailRepository.findEmails(query);
};
exports.createEmail = async (prefix, duration, user_id) => {
  if (!user_id) {
    const error = new Error("user_id is required");
    error.statusCode = 400;
    throw error;
  }
  if (!mongoose.Types.ObjectId.isValid(user_id)) {
    const error = new Error("Invalid user_id. Must be a valid ObjectId.");
    error.statusCode = 400;
    throw error;
  }
  const validUserId = new mongoose.Types.ObjectId(user_id);
  const randomPart = Math.random().toString(36).substring(2, 8);
  const emailAddress = `${prefix || "temp"}${randomPart}@rapidmail.com`;
  const expireMinutes = duration ? Number(duration) : 10;
  const expiresAt = new Date(Date.now() + expireMinutes * 60 * 1000);
  return await emailRepository.createEmail({
    user_id: validUserId,
    prefix: prefix || "temp",
    address: emailAddress,
    expires_at: expiresAt,
  });
};
exports.deleteEmail = async (id) => {
  if (!id) {
    throw { status: 400, message: "id (email id) is required" };
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { status: 400, message: "Invalid email ID" };
  }
  const deletedEmail = await emailRepository.deleteById(id); 
  if (!deletedEmail) {
    throw { status: 404, message: "Email not found" };
  }
  return deletedEmail;
};

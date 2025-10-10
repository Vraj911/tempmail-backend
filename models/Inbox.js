const mongoose = require('mongoose');
const inboxSchema = new mongoose.Schema({
  email_id: { type: String, ref: "Email", required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // <-- add this
  from_address: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String },
  received_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Inbox', inboxSchema);

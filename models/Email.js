const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String },
  body: { type: String },
  receivedAt: { type: Date, default: Date.now },
  isSent: { type: Boolean, default: false },
  aiSummary: { type: String } 
});

module.exports = mongoose.model("Email", emailSchema);

const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  prefix: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    inboxId: { type: String, required: true },
  status: { type: String, enum: ["active", "expired", "deleted"], default: "active" },
  created_at: { type: Date, default: Date.now },
  expires_at: { 
    type: Date, 
    required: true 
  }
});
const Email = mongoose.model("Email", emailSchema);
module.exports = Email;

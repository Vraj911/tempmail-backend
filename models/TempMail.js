const mongoose = require("mongoose");
const tempEmailSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
});
module.exports = mongoose.model("TempEmail", tempEmailSchema);

const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true }, 
  detail: { type: String },
  time: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Activity", activitySchema);

const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema({
    address: { type: String, required: true, unique: true },
    prefix: { type: String, required: true },
    domain_id: { type: mongoose.Schema.Types.ObjectId, ref: "Domain", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["active", "expired", "deleted"], default: "active" },
    created_at: { type: Date, default: Date.now },
    expires_at: { type: Date, required: true }
});
module.exports = mongoose.model('Email', emailSchema);

const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
        type: String,
        enum: [
            "generate_email",
            "receive_message",
            "email_expired",
            "privacy_scan",
            "quick_generate",
            "api_request"
        ],
        required: true
    },
    description: { type: String },
    related_id: { type: String, default: null }, 
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ActivityFeed', activitySchema);

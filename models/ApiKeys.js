const mongoose=require('mongoose');
const apiKeySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    key_value: { type: String, required: true, unique: true },
    status: { type: String, enum: ["active", "revoked"], default: "active" },
    rate_limit: { type: Number, default: 1000 }, 
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ApiKeys', apiKeySchema);

const mongoose=require('mongoose');
const apiUsageSchema = new mongoose.Schema({
    api_key_id: { type: mongoose.Schema.Types.ObjectId, ref: "APIKey", required: true },
    total_requests: { type: Number, default: 0 },
    success_rate: { type: Number, default: 100 }, 
    avg_response: { type: Number, default: 0 },   
    time_window: { type: Date, default: Date.now } 
});
module.exports = mongoose.model('ApiUsage', apiUsageSchema);

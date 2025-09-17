const mongoose = require('mongoose');
const performanceSchema = new mongoose.Schema({
    metric_name: {
        type: String,
        required: true,
        enum: [
            "email_generation_speed", 
            "delivery_success", 
            "privacy_protection", 
            "server_uptime"
        ]
    },
    value: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ["%", "ms", "count"] 
    },
    recorded_at: {
        type: Date,
        default: Date.now
    }
});
performanceSchema.index({ metric_name: 1, recorded_at: -1 });
module.exports = mongoose.model('PerformanceMetrics', performanceSchema);

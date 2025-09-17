const mongoose=require('mongoose');
const inboxSchema = new mongoose.Schema({
    email_id: { type: mongoose.Schema.Types.ObjectId, ref: "Email", required: true },
    from_address: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    received_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Inbox', inboxSchema);

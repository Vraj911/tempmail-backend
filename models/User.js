const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  planType: {
    type: String,
    enum: ["free", "paid"],
    default: "free"
  },
   subscription: {
    planName: { type: String },       
    expiryDate: { type: Date },       
    paymentProvider: { type: String } 
  },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  prefix: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["active", "expired", "deleted"], default: "active" },
  created_at: { type: Date, default: Date.now },
  expires_at: { 
    type: Date, 
    required: true // user must provide this value from the form
  }
});

const Email = mongoose.model("Email", emailSchema);

/* 🔹 Insert 3 mock records only if collection is empty
Email.countDocuments().then(count => {
  if (count === 0) {
    Email.insertMany([
      {
        address: "abc@gmail.com",
        prefix: "abc",
        user_id: new mongoose.Types.ObjectId(),
        status: "active",
        expires_at: new Date(Date.now() + 15 * 60000),
      },
      {
        address: "xyz@gmail.com",
        prefix: "xyz",
        user_id: new mongoose.Types.ObjectId(),
        status: "expired",
        expires_at: new Date(Date.now() + 5 * 60000),
      },
      {
        address: "asda@gmail.com",
        prefix: "asda",
        user_id: new mongoose.Types.ObjectId(),
        status: "deleted",
        expires_at: new Date(Date.now() - 5 * 60000),
      }
    ])
      .then(() => console.log("✅ Inserted 3 mock email records"))
      .catch(err => console.error("❌ Insert failed:", err));
  }
});
*/
module.exports = Email;

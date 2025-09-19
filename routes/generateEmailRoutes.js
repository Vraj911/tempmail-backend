const router = require('express').Router();
const Email = require('../models/Email.js');
const mongoose = require('mongoose');
router.get('/', (req, res) => {
    res.send('Dashboard route is working');
});
router.post("/emails", async (req, res) => {
  try {
    const { prefix, duration, user_id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: "Invalid user_id. Must be a valid ObjectId." });
    }
    const validUserId = new mongoose.Types.ObjectId(user_id);
    const randomPart = Math.random().toString(36).substring(2, 8);
    const emailAddress = `${prefix || "temp"}${randomPart}@rapidmail.com`;
    const expireMinutes = duration ? Number(duration) : 10;
    const expiresAt = new Date(Date.now() + expireMinutes * 60 * 1000);
    const newEmail = await Email.create({
      user_id: validUserId,
       prefix: prefix || "temp",
      address: emailAddress,
      expires_at: expiresAt
    });
    return res.status(201).json({
      message: "Email generated successfully",
      email: {
        id: newEmail._id,
        address: newEmail.address,
        expires_at: newEmail.expires_at
      }
    });
  } catch (err) {
    console.error("❌ Error creating email:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
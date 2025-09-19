const router = require('express').Router();
const mongoose = require('mongoose');
const Email = require('../models/Email.js');
router.get('/', (req, res) => {
    res.send('Settings route is working');
});
router.get("/delete", async (req, res) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid email ID" });
    }
    const deleted = await Email.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Email not found" });
    }
    res.json({ message: "Email deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting email:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
const router = require("express").Router();
const mongoose = require("mongoose");
const Email = require("../models/Email.js");
const emailController = require("../controllers/emailController.js");
router.get("", (req, res) => {
  res.send("emails route is working");
});
router.get("/fetch", emailController.fetchEmails);
router.post("/emails/create", emailController.createEmail);
router.get("/delete", emailController.deleteEmailController);
module.exports = router;

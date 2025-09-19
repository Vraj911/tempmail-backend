const router = require('express').Router();
const Email = require('../models/Email.js');
const mongoose = require('mongoose');
router.get('/', (req, res) => {
    res.send('Dashboard route is working');
});
router.get('/emails', async (req, res) => {
    try{
const emails = await Email.find();
        res.json(emails);
    }
    catch(error){
         console.error("❌ Error fetching emails:", error); 
        res.status(500).json({message:'Server Error'});
    }
});
module.exports = router;

const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('Dashboard route is working');
});
router.get('/emails', async (req, res) => {
    try{
        const emails = await Email.find({ userId: req.user._id });
        res.json(emails);
    }
    catch(error){
        res.status(500).json({message:'Server Error'});
    }
});
module.exports = router;

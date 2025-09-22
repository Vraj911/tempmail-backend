const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('User route is working');
});
router.patch('/', (req, res) => {
    res.send('Update user route - to be implemented');
});
router.patch('/password', (req, res) => {   
    res.send('Change password route - to be implemented');
});
router.get('/privacy', (req, res) => {
    res.send('Get privacy settings route - to be implemented');
});
router.patch('/privacy', (req, res) => {
    res.send('Update privacy settings route - to be implemented');
}   );
router.delete('/', (req, res) => {
    res.send('Delete user route - to be implemented');
});
router.patch('/preferences', (req, res) => {
    res.send('Update user preferences route - to be implemented');
}
);
module.exports = router;
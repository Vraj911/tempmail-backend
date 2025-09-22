const router = require('express').Router();
const { registerUser, loginUser,resetPassword,changePassword,enable2FA,disable2FA,verify2FA } = require('../controllers/authController');
router.get('/', (req, res) => {
    res.send('Auth route is working');
});
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', (req, res) => {
    res.send('Logout route - to be implemented');
});
router.post('/reset-password', resetPassword);
router.post('/change-password', changePassword);
router.post('/enable-2fa', enable2FA);
router.post('/verify-2fa', verify2FA);
router.post('/disable-2fa', disable2FA);
module.exports = router;
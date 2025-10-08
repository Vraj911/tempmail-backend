const router = require('express').Router();
const {
  getUserProfile,
  updateUserProfile,
  updateUser,
  changeUserPassword,
  getPrivacySettings,
  updatePrivacySettings,
  deleteUser,
  updatePreferences,
  getUserActivity
} = require('../controllers/userController');
router.get('/', (req, res) => res.send('User route is working'));
router.get('/profile', getUserProfile);        
router.patch('/profile', updateUserProfile);  
router.patch('/', updateUser);                 
router.patch('/password', changeUserPassword);
router.get('/privacy', getPrivacySettings);
router.patch('/privacy', updatePrivacySettings);
router.patch('/preferences', updatePreferences);
router.delete('/', deleteUser);
router.get('/activity', getUserActivity); 
module.exports = router;

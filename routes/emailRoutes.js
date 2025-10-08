const router = require('express').Router();
const emailController = require('../controllers/emailsController');
router.get('/', (req, res) => res.send('Emails route is working'));
router.get('/fetch', emailController.fetchEmails);
router.post('/create', emailController.createEmail);
router.delete('/:id', emailController.deleteEmail); 
router.patch('/read/:id', emailController.markAsRead);
router.patch('/unread/:id', emailController.markAsUnread);
router.post('/star/:id', emailController.toggleStarred);
router.post('/draft', emailController.saveDraft);
router.get('/drafts', emailController.getDrafts);
router.delete('/draft/:id', emailController.deleteDraft);
router.get('/search', emailController.searchEmails);
router.get('/filter', emailController.filterEmails);
router.get('/stats', emailController.getEmailStats);
router.get('/recent', emailController.getRecentEmails);
router.get('/inbox', emailController.getInboxMessages);

module.exports = router;

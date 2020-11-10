const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

//Admin routes such as dashboard, creating posts
router.get('/dashboard', adminController.registeredUsersList);
router.post('/create', adminController.postContent);
router.get('/posts', adminController.postedContent);
router.get('/posts/:id', adminController.specificPostedContent);
router.delete('/posts/:id', adminController.deletePostedContent);

module.exports = router;
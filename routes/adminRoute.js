const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

//Admin routes such as dashboard, creating posts
router.get('/dashboard', adminController.registeredUsersList)

module.exports = router;
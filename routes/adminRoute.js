const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

//Admin routes such as dashboard, creating posts

//GET request a list of registered users
router.get('/dashboard', adminController.registeredUsersList);

//POST request to create a new post 
router.post('/create', adminController.postContent); 

//GET request to get list of posts
router.get('/posts', adminController.postedContent); 

//GET request to get specific posts
router.get('/posts/:id', adminController.specificPostedContent);

//DELETE request a specific post 
router.delete('/posts/:id', adminController.deletePostedContent); 

module.exports = router;
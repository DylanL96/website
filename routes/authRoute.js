const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const validator = require('../middleware/validator')

//Authorization routes
router.post('/signup', validator.signupValidator, validator.validationResults, authController.signupController);
router.post('/signin', validator.signinValidator, validator.validationResults, authController.signinController);



module.exports = router;
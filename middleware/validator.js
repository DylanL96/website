const {check, validationResult} = require('express-validator');

const signupValidator = [
  check('username').not().isEmpty().trim().withMessage('All fields are required'),
  check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
];

const signinValidator = [
  check('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
];

const validationResults = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if(hasErrors){
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      errorMessage: firstError
    })
  }
  next()
}

module.exports = {
  signupValidator,
  signinValidator,
  validationResults
}
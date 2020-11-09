const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpire} = require('../config/keys');

const signupController = async (req, res) => {
  const {username, password, email } = req.body;

  //Determine if email already registered
  try {
    const user = await User.findOne({email: email})
    if (user){
      // console.log(user.email)
      return res.status(400).json({
        errorMessage: 'Email already exists'
      });
    }

    //Hash password with bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Creating new User following the UserSchema model
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword
    });

    //Saves the newUser to mongoDB
    await newUser.save();

    //Sends backend message
    res.json({
      successMessage: 'Successfully registered!'
    })
  } catch (err) {
    console.log(`Sign up error: ${err}`);
    res.status(500).json({
      errorMessage: `Server error`
    })
  };
};

const signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    //looking for email coming from client and seeing if it matches with one that already one in the database
    const user = await User.findOne({email});
    if (!user){
      return res.status(400).json({
        errorMessage:`Invalid credentials`
      });
    }

    //Compares the PW the client entered to the hashed password store in the DB. First argument is the incoming data from the client. Second argument is the stored hashed password.
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({
        errorMessage: `Invalid credentials`
      });
    }

    //Payload
    const payload = {
      user: {
        _id: user._id,
      }
    };

    jwt.sign(payload, jwtSecret, {expiresIn: jwtExpire}, (err, token) => {
      if (err){
        console.log(`JWT error: ${err}`)
      }
      const {_id, username, email, role} = user;

      //If all goes well, we send back JWTToken and the specific user information.
      res.json({
        token,
        user: { _id, username, email, role}
      })
    })

  } catch (err) {
    console.log(`Sign in error: ${err}`)
    res.status(500).json({
      errorMessage: `Sign in error`
    })
  }
};


//Remember to use {} and not []
module.exports = {
  signupController,
  signinController,
}
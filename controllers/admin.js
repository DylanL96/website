const User = require('../models/User');

// const adminList = ('/admin/dashboard', (req, res) => {
//   User.find({})
//     .then(post => res.json(post))
//     .catch(error => res.status(400).json(`Error: ${error}`))
// });

//Gets list of registered users from mongoDB
const registeredUsersList = ('/admin/dashboard', async(req, res) => {
  try {
    const list = await User.find({})
    return res.json(list)
  } catch (err) {
    console.log(err)
  }
})

module.exports = {
  registeredUsersList
}
const User = require('../models/User');
const Post = require('../models/Post');
const { Mongoose } = require('mongoose');

// const adminList = ('/admin/dashboard', (req, res) => {
//   User.find({})
//     .then(post => res.json(post))
//     .catch(error => res.status(400).json(`Error: ${error}`))
// });

//Gets list of registered users from mongoDB
const registeredUsersList = async(req, res) => {
  try {
    const list = await User.find({})
    return res.json(list)
  } catch (err) {
    console.log(err)
  }
};

//Creating post data and submitting into mongoDB
const postContent = async (req,res) => {
  const {title, description, content} = req.body
  console.log(req)
  
  try {
    const newPost = new Post({
      title: title,
      description: description,
      content: content,
    });

    //Saving the post to MongoDB
    await newPost.save();
    res.json({
      successMessage: `Successfully posted!`
    })
  } catch(error) {
    console.log(error);
    res.status(500).json({
      errorMessage: `Server error`
    })
  }
};

//Gets list of posts from mongoDB
const postedContent = async (req,res) => {
  try {
    const posts = await Post.find({})
    // console.log(posts)
    return res.json(posts)
    
  }catch (error){
    console.log(error);
  }
};

//Get specific posts from mongoDB
const specificPostedContent = async (req, res) => {
  // console.log(req.params.id)
  try {
    const specificpost = await Post.findById(req.params.id)
    return res.json(specificpost)
    // console.log(specificpost)
  } catch (error) {
    console.log(error)
  }
};

//Delete posts
const deletePostedContent = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    // console.log(req)
    res.status(200).send({
      successMessage: `Deleted Post: ${req.params.id}`
    })
  } catch (error) {
    console.log(error)
  }
};


module.exports = {
  registeredUsersList,
  postContent,
  postedContent,
  specificPostedContent,
  deletePostedContent
}
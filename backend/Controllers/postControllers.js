const postModel = require("../Models/postModel");
const userModel = require("../Models/userModel");

const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const newPost = new postModel(req.body);
    await newPost.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving post" });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.json({
      posts: posts,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPost,
  getPosts,
};

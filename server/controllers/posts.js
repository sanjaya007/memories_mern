const mongoose = require("mongoose");
const PostMessage = require("../models/PostMessage");

const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(201).json(postMessages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Post with that id");

    await PostMessage.findByIdAndDelete(id);
    res.json({ message: "Post Deleted successfully !" });
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated !" });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Post with that id");

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatePost);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPosts: getPosts,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
  likePost: likePost,
};

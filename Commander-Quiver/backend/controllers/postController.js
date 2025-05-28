const Post = require("../models/Post");

exports.createPost = (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res.status(400).json({ error: "Title, content, and userId are required" });
  }

  const post = Post.create(title, content, userId);
  res.status(201).json({ message: "Post created successfully", post });
};

exports.getPosts = (req, res) => {
  const posts = Post.getAll();
  res.json(posts);
};

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = Post.update(parseInt(id), title, content);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json({ message: "Post updated successfully", post });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;

  const success = Post.delete(parseInt(id));
  if (!success) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json({ message: "Post deleted successfully" });
};
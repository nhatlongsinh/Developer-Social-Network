const {
  postNotFound,
  unauthorized,
  alreadyLiked,
  noLikeYet,
  commentNotFound
} = require('../common/errorMessage');
const PostModel = require('../models/PostModel');

const createPost = async (req, res) => {
  const { text, name, avatar } = req.body;
  const newPost = new PostModel({
    text, name, avatar, user: req.user.id
  });

  const savedPost = await newPost.save();

  res.json(savedPost);
};
const getPosts = async (req, res) => {
  const posts = await PostModel.find().sort({ date: -1 });

  res.json(posts);
};
const getPost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.status(postNotFound.code);
    return res.json(postNotFound);
  }

  res.json(post);
};
const deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.status(postNotFound.code);
    return res.json(postNotFound);
  }
  // unauthorized
  if (post.user.toString() !== req.user.id) {
    res.status(unauthorized.code);
    return res.json(unauthorized);
  }
  // delete
  await post.remove();

  res.json({ sucess: true });
};
const likePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.status(postNotFound.code);
    return res.json(postNotFound);
  }

  if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
    // already like
    res.status(alreadyLiked.code);
    return res.json(alreadyLiked);
  }

  // add like
  post.likes.unshift({ user: req.user.id });
  const savedPost = await post.save();

  res.json(savedPost);
};
const unlikePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.status(postNotFound.code);
    return res.json(postNotFound);
  }

  if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
    // not yet liked
    res.status(noLikeYet.code);
    return res.json(noLikeYet);
  }

  // remove like
  const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
  post.likes.splice(removeIndex, 1);
  const savedPost = await post.save();

  res.json(savedPost);
};
const addComment = async (req, res) => {
  const { text, name, avatar } = req.body;
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    // not found
    res.status(postNotFound.code);
    return res.json(postNotFound);
  }
  // add
  const newComment = {
    text, name, avatar, user: req.user.id
  };
  post.comments.unshift(newComment);
  const savedPost = await post.save();

  res.json(savedPost);
};
const deleteComment = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    // not found
    res.status(postNotFound.code);
    return res.json(postNotFound);
  }
  // check if the comment exist
  if (
    post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0
  ) {
    res.status(commentNotFound.code);
    return res.json(commentNotFound);
  }

  const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
  // delete
  post.comments.splice(removeIndex, 1);
  const savedPost = await post.save();

  res.json(savedPost);
};
module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment
};

const express = require('express');
const passport = require('passport');

const {
  routeErrorHandlingMiddleware,
  validationErrorHandlingMiddleware
} = require('../../common/errorHandlers');
const {
  createPost,
  getPost,
  getPosts,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment
} = require('../../controllers/postsController');
const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

const postsRoute = express.Router();

// @route   Get api/posts
// @des     Get posts
// @access  Public
postsRoute.get('/', routeErrorHandlingMiddleware(getPosts));

// @route   Get api/post/:id
// @des     Get a post
// @access  Public
postsRoute.get('/:id', routeErrorHandlingMiddleware(getPost));

// @route   POST api/posts
// @des     Create post
// @access  Private
postsRoute.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validationErrorHandlingMiddleware(validatePostInput),
  routeErrorHandlingMiddleware(createPost)
);

// @route   DELETE api/posts/:id
// @des     Delete post
// @access  Private
postsRoute.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  routeErrorHandlingMiddleware(deletePost)
);

// @route   POST api/posts/like/:id
// @des     Like post
// @access  Private
postsRoute.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  routeErrorHandlingMiddleware(likePost)
);

// @route   POST api/posts/unlike/:id
// @des     Like post
// @access  Private
postsRoute.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  routeErrorHandlingMiddleware(unlikePost)
);

// @route   POST api/posts/comment/:id
// @des     Add comment to post
// @access  Private
postsRoute.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  validationErrorHandlingMiddleware(validateCommentInput),
  routeErrorHandlingMiddleware(addComment)
);

// @route   POST api/posts/comment/:id/:comment_id
// @des     Delete comment from post
// @access  Private
postsRoute.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  routeErrorHandlingMiddleware(deleteComment)
);
module.exports = postsRoute;

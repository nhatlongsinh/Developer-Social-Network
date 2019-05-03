module.exports = {
  emailExist: { code: 409, email: 'Email already exists' },
  userNotFound: { code: 404, email: 'User not found' },
  passwordIncorrect: { code: 400, password: 'Password Incorrect' },
  userNoProfile: { code: 404, nonProfile: 'There is no profile for this user' },
  noProfiles: { code: 404, nonProfile: 'There is no profile' },
  profileHandleExist: { code: 409, handle: 'Handle already exists' },
  postNotFound: { code: 404, nopostfound: 'Post not found' },
  unauthorized: { code: 401, authorized: 'Unauthorized' },
  alreadyLiked: { code: 400, alreadyliked: 'User already liked this post' },
  noLikeYet: { code: 400, notliked: 'You have not yet liked this post' },
  commentNotFound: { code: 404, comment: 'Comment not found' }
};

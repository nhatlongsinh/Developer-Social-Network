const express = require('express');
const passport = require('passport');
const {
  routeErrorHandlingMiddleware,
  validationErrorHandlingMiddleware
} = require('../../common/errorHandlers');
const {
  getUserProfile,
  createUserProfile,
  getUserProfileByHandle,
  getUserProfileByUserId,
  getAllUserProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteUserProfile
} = require('../../controllers/profileController');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const profileRoute = express.Router();

// @route   GET api/profile
// @des     Return current user profile
// @access  Private
profileRoute.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  routeErrorHandlingMiddleware(getUserProfile)
);

// @route   POST api/profile
// @des     Create user profile
// @access  Private
profileRoute.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validationErrorHandlingMiddleware(validateProfileInput),
  routeErrorHandlingMiddleware(createUserProfile)
);

// @route   GET api/profile/handle/:handle
// @des     Get user profile by handle
// @access  Public
profileRoute.get('/handle/:handle', routeErrorHandlingMiddleware(getUserProfileByHandle));

// @route   GET api/profile/user/:user_id
// @des     Get user profile by user id
// @access  Public
profileRoute.get('/user/:user_id', routeErrorHandlingMiddleware(getUserProfileByUserId));

// @route   GET api/profile/all
// @des     Get all user profiles
// @access  Public
profileRoute.get('/all', routeErrorHandlingMiddleware(getAllUserProfile));

// @route   POST api/profile/experience
// @des     Add experience profile
// @access  Private
profileRoute.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  validationErrorHandlingMiddleware(validateExperienceInput),
  routeErrorHandlingMiddleware(addExperience)
);

// @route   DELETE api/profile/experience/:exp_id
// @des     Detele experience from profile
// @access  Private
profileRoute.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  routeErrorHandlingMiddleware(deleteExperience)
);

// @route   POST api/profile/education
// @des     Add education profile
// @access  Private
profileRoute.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  validationErrorHandlingMiddleware(validateEducationInput),
  routeErrorHandlingMiddleware(addEducation)
);

// @route   DELETE api/profile/education/:edu_id
// @des     Detele education from profile
// @access  Private
profileRoute.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  routeErrorHandlingMiddleware(deleteEducation)
);

// @route   DELETE api/profile
// @des     Detele user and profile
// @access  Private
profileRoute.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  routeErrorHandlingMiddleware(deleteUserProfile)
);

module.exports = profileRoute;

const express = require('express');
const { registerUser, loginUser } = require('../../controllers/usersController');
const {
  routeErrorHandlingMiddleware,
  validationErrorHandlingMiddleware
} = require('../../common/errorHandlers');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const usersRoute = express.Router();

// @route   POST api/users/register
// @des     register
// @access  Public
usersRoute.post(
  '/register',
  validationErrorHandlingMiddleware(validateRegisterInput),
  routeErrorHandlingMiddleware(registerUser)
);
// @route   POST api/users/login
// @des     login
// @access  Public
usersRoute.post(
  '/login',
  validationErrorHandlingMiddleware(validateLoginInput),
  routeErrorHandlingMiddleware(loginUser)
);

module.exports = usersRoute;

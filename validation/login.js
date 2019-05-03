const validator = require('validator');
const isEmpty = require('./is-empty');

const validate = (data) => {
  let { email, password } = data;
  const errors = {};

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }
  if (validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }
  return { errors, isValid: isEmpty(errors) };
};

module.exports = validate;

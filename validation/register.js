const validator = require('validator');
const isEmpty = require('./is-empty');

const validate = (data) => {
  let {
    name, email, password, password2
  } = data;
  const errors = {};

  name = !isEmpty(name) ? name : '';
  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';
  password2 = !isEmpty(password2) ? password2 : '';

  if (validator.isEmpty(name)) {
    errors.email = 'Name field is required';
  }
  if (validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }
  if (validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
  if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }
  if (
    !validator.matches(
      password,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/i
    )
  ) {
    errors.password = 'Password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character';
  }
  if (password !== password2) {
    errors.password2 = 'Confirm password not match';
  }
  return { errors, isValid: isEmpty(errors) };
};

module.exports = validate;

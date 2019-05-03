const validator = require('validator');
const isEmpty = require('./is-empty');

const validate = (data) => {
  let {
    school, degree, fieldofstudy, from
  } = data;
  const errors = {};

  school = !isEmpty(school) ? school : '';
  degree = !isEmpty(degree) ? degree : '';
  from = !isEmpty(from) ? from : '';
  fieldofstudy = !isEmpty(fieldofstudy) ? fieldofstudy : '';

  if (validator.isEmpty(school)) {
    errors.school = 'School field is required';
  }
  if (validator.isEmpty(degree)) {
    errors.degree = 'Degree field is required';
  }
  if (validator.isEmpty(from)) {
    errors.from = 'From field is required';
  }
  if (validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = 'Field of Study field is required';
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validate;

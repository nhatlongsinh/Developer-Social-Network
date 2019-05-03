const validator = require('validator');
const isEmpty = require('./is-empty');

const validate = (data) => {
  let {
    handle, status, skills, website, youtube, twitter, facebook, linkedin, instagram
  } = data;
  const errors = {};

  handle = !isEmpty(handle) ? handle : '';
  status = !isEmpty(status) ? status : '';
  skills = !isEmpty(skills) ? skills : '';
  website = !isEmpty(website) ? website : '';
  youtube = !isEmpty(youtube) ? youtube : '';
  twitter = !isEmpty(twitter) ? twitter : '';
  facebook = !isEmpty(facebook) ? facebook : '';
  linkedin = !isEmpty(linkedin) ? linkedin : '';
  instagram = !isEmpty(instagram) ? instagram : '';

  if (!validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle need to be between 2 and 40 characters';
  }

  if (validator.isEmpty(handle)) {
    errors.handle = 'Handle is required';
  }

  if (validator.isEmpty(status)) {
    errors.status = 'Status is required';
  }

  if (validator.isEmpty(skills)) {
    errors.skills = 'Skills is required';
  }

  if (!isEmpty(website) && !validator.isURL(website)) {
    errors.website = 'Website is invalid';
  }

  if (!isEmpty(twitter) && !validator.isURL(twitter)) {
    errors.twitter = 'Twitter is invalid';
  }
  if (!isEmpty(youtube) && !validator.isURL(youtube)) {
    errors.youtube = 'Youtube is invalid';
  }
  if (!isEmpty(facebook) && !validator.isURL(facebook)) {
    errors.facebook = 'Facebook is invalid';
  }
  if (!isEmpty(linkedin) && !validator.isURL(linkedin)) {
    errors.linkedin = 'Linkedin is invalid';
  }
  if (!isEmpty(instagram) && !validator.isURL(instagram)) {
    errors.instagram = 'Instagram is invalid';
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validate;

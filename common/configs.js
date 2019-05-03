/* eslint-disable global-require */
let config = {};
if (process.env.NODE_ENV === 'production') {
  config = {
    MONGO_URI: process.env.MONGO_URI,
    SALT_LENGTH: process.env.SALT_LENGTH,
    SECRET_KEY: process.env.SECRET_KEY,
    TOKEN_EXPIRE: process.env.TOKEN_EXPIRE
  };
} else {
  config = require('../keys');
}

module.exports = config;

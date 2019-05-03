const mongoose = require('mongoose');
const debug = require('debug')('server:db');
const config = require('./configs');

module.exports = () => {
  mongoose
    .connect(config.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      debug('DB connected');
    })
    .catch((err) => {
      debug(`DB cannot connect${err}`);
    });
};

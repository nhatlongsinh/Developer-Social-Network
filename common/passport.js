const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const userModel = require('../models/UserModel');
const config = require('./configs');

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET_KEY
};
module.exports = (passport) => {
  passport.use(
    new JWTstrategy(opts, async (jwtPayload, done) => {
      const user = await userModel.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};

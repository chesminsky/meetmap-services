const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const nconf = require('nconf');
const config = nconf.get('google');

const User = require('../models/user.model');

passport .use(new GoogleStrategy({
  callbackURL: '/auth/google/redirect',
  clientID: config.client_id,
  clientSecret: config.client_secret,
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);

  new User({
    name: profile.displayName,
    googleId: profile.id,
  }).save().then(done);
}));

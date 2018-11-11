const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const nconf = require('nconf');
const config = nconf.get('google');

const User = require('../models/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((foundUser) => {
    done(null, foundUser);
  });
});

passport.use(new GoogleStrategy({
  callbackURL: '/auth/google/redirect',
  clientID: config.client_id,
  clientSecret: config.client_secret,
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({googleId: profile.id}).then((currentUser) => {
    if (currentUser) {
      done(null, currentUser);
    } else {
      new User({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
      }).save().then((createdUser) => {
        done(null, createdUser);
      });
    }
  });
}));

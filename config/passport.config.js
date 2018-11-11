const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const nconf = require('nconf');
const config = nconf.get('google');

passport .use(new GoogleStrategy({
  clientID: config.client_id,
  clientSecret: config.client_secret,
}), () => {

});

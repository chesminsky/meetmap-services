const mongoose = require('mongoose');
const Hash = require('password-hash');

const userModel = new mongoose.Schema({
  name: String,
  password: {
    type: String,
    set(newValue) {
      return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
    }
  },
  contacts: [String],
  googleId: String,
  email: String,
});

userModel.statics.authenticate = function (name, password, callback) {
  this.findOne({ name }, function (error, user) {
    if (user && Hash.verify(password, user.password)) {
      callback(null, user);
    } else if (user || !error) {
      // Email or password was invalid (no MongoDB error)
      callback(null, null);
    } else {
      // Something bad happened with MongoDB. You shouldn't run into this often.
      callback(error, null);
    }
  });
};

module.exports = mongoose.model('User', userModel);

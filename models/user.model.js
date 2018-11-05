const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  name: String,
  password: String,
  contacts: [String],
});

module.exports = mongoose.model('User', userModel);

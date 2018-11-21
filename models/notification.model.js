const mongoose = require('mongoose');

const notificationModel = new mongoose.Schema({
  room: String,
  userId: String,
  accepted: Boolean,
  from: String,
});

module.exports = mongoose.model('Notification', notificationModel);

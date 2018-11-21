const mongoose = require('mongoose');

const notificationModel = new mongoose.Schema({
  room: String,
  userId: String,
  accepted: Boolean,
});

module.exports = mongoose.model('Notification', notificationModel);

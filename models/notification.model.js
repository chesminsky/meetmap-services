const mongoose = require('mongoose');

const notificationModel = new mongoose.Schema({
  type: String,
  fromEmail: String,
  fromName: String,
  toEmail: String,
  accepted: Boolean,
});

module.exports = mongoose.model('Notification', notificationModel);

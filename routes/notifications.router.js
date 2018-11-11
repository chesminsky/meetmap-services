/**
 *  NOTIFICATIONS API
 */

const express = require('express');
const router = new express.Router();

module.exports = function(Notification) {
  router.route('/').get(function(req, res) {
    Notification.find({toEmail: req.user.email}, function(err, notifications) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(notifications);
      }
    }).select({toEmail: 0});
  });

  router.route('/').post(function(req, res) {
    const {type, toEmail, fromEmail, fromName} = req.body;

    new Notification({
      type,
      toEmail,
      fromEmail,
      fromName,
      accepted: false,
    }).save().then((created) => {
      res.json(created);
    });
  });

  return router;
};

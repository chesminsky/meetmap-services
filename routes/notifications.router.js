/**
 *  NOTIFICATIONS API
 */

const express = require('express');
const router = new express.Router();

module.exports = function(Notification) {
  router.route('/').get(function(req, res) {
    Notification.find({userId: req.user._id}, function(err, notifications) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(notifications);
      }
    });
  });

  router.route('/').post(function(req, res) {

    const { room, userId } = req.body;

    Notification.findOne({ userId, accepted: false }, function(err, notification) {
      if (err) {
        res.status(500).send(err);
      } else if (notification){
        res.json(notification);
      } else {
        new Notification({
          room,
          userId,
          accepted: false,
        }).save().then((created) => {
          res.json(created);
        });
      }
    });
  });

  return router;
};

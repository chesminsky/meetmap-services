/**
 *  NOTIFICATIONS API
 */

const express = require('express');
const router = new express.Router();

module.exports = function(Notification, io) {
  /**
   * Raad all related to user
   */
  router.route('/').get(function(req, res) {
    Notification.find({userId: req.user._id, accepted: {'$exists': false}}, function(err, notifications) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(notifications);
      }
    });
  });

  /**
   * Create one
   */
  router.route('/').post(function(req, res) {
    const {room, userId} = req.body;

    Notification.findOne({userId, accepted: {'$exists': false}}, function(err, notification) {
      if (err) {
        res.status(500).send(err);
      } else if (notification) {
        res.json(notification);
      } else {
        const model = {
          room,
          userId,
          from: req.user.name,
        };
        new Notification(model).save().then((created) => {
          res.json(created);

          const sockets = Object.values(io.sockets.connected);
          const mySocket = sockets.find((socket) => socket.userId === req.user.id);
          const friendSocket = sockets.find((socket) => socket.userId === userId);

          if (mySocket && friendSocket) {
            mySocket.broadcast.to(friendSocket.id).emit('invitation');
          }
        });
      }
    });
  });

  /**
   * Update one
   */
  router.route('/:id').put(function(req, res) {
    Notification.update({_id: req.params.id}, {accepted: req.body.accepted}, function(err, notification) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(notification);
      }
    });
  });

  return router;
};

/**
 *  USERS API
 */

const express = require('express');
const router = new express.Router();

module.exports = function(User) {
  router.route('/').get(function(req, res) {
    // query all users
    User.find(function(err, users) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(users);
      }
    }).select({password: 0});
  });

  router.route('/:id').get(function(req, res) {
    // get user by id
    User.findById(req.params.id, function(err, user) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(user);
      }
    }).select({password: 0});
  });

  return router;
};

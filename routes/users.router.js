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

  router.route('/:name').get(function(req, res) {
    // get user by name
    User.findOne({name: req.params.name}, function(err, user) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(user);
      }
    }).select({password: 0});
  });

  return router;
};

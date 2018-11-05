/**
 *  AUTH API
 */

const express = require('express');
const router = new express.Router();
const userService = require('../services/user.service');

module.exports = function(User) {
  router.route('/').post((req, res) => {
    const {username, password} = req.body;

    User.findOne({name: username}, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user || user.password !== password) {
        res.status(401);
        res.json({code: 'WRONG_CREDENTIALS'});
      } else {
        userService.add(user);
        // TODO remove when disconnected

        res.cookie('auth', user.name, {maxAge: 1000000, httpOnly: false});
        res.json(user);
      }
    });
  });


  router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.end();
  });

  return router;
};

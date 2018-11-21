/**
 *  AUTH API
 */

const express = require('express');
const router = new express.Router();
const passport = require('passport');

module.exports = function(User) {

  router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.end();
  });


  router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
  }));

  router.post('/local', passport.authenticate('local'), (req, res) => {
    res.end();
  });

  router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
  });

  return router;
};

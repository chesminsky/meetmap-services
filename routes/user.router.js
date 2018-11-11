/**
 *  USER API
 */

const express = require('express');
const router = new express.Router();

module.exports = function(User) {
  router.route('/').get((req, res) => {
    res.json(req.user);
  });

  router.route('/').put((req, res) => {

    User.findById(req.body._id).then((foundUser) => {
      Object.assign(foundUser, req.body);

      foundUser.save().then((saved) => {
        res.json(saved);
      });
    });
  });


  return router;
};

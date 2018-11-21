const User = require('../models/user.model');
const nconf = require('nconf');
nconf.file({file: 'config.json'});

const db = require('../config/db.config');

const createIfNotFound = (name, password) => new Promise((res, rej) => {
    User.findOne({ name }).then((user) => {
        if (!user) {
            new User({
                name,
                password,
            }).save().then(res);
        } else {
            res();
        }
    });
});

Promise.all([
    createIfNotFound('admin', 'admin'),
    createIfNotFound('bot', 'bot')
]).then(() => {
    console.log('all done');
    db.close();
});
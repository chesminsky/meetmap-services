const mongoose = require('mongoose');
const nconf = require('nconf');

const url = nconf.get('endpoints:db');

mongoose.connect(url, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', console.log.bind(console, 'connection established'));

module.exports = db;
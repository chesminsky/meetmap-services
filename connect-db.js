const mongoose = require('mongoose');
const nconf = require('nconf');

mongoose.connect(nconf.get('endpoints:db'), {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

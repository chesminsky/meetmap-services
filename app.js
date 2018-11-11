const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cprint = require('cprint');
const nconf = require('nconf');

nconf.argv().env();
nconf.file({file: 'config.json'});

require('./config/db.config');
require('./config/passport.config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// set the template engine ejs
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));

// Listen on port 3000
const port = 3000;
const server = app.listen(port, function() {
  console.log(' ');
  cprint('meetmap', 'magenta');
  console.log(`\n server is listening on port ${port} ...`);
});

// socket.io instantiation
const io = require('socket.io')(server);
require('./events')(io);

// LOAD MONGOOSE MODELS
const User = require('./models/user.model');

// web app
app.use('/', express.static(__dirname + '/../meetmap-web/dist/'));

// ROUTES FOR API
app.use('/api/users', require('./routes/users.router')(User));
app.use('/auth', require('./routes/auth.router')(User));


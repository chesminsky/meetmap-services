const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cprint = require('cprint');
const nconf = require('nconf');
const passport = require('passport');

nconf.file({file: 'config.json'});

require('./config/db.config');
require('./config/passport.config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

const cookieSessionFn = cookieSession({
  name: 'auth',
  maxAge: 24*60*60*1000,
  keys: [nconf.get('session:cookieKey')],
});
app.use(cookieSessionFn);

app.use(passport.initialize());
app.use(passport.session());

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
io.use((socket, next) => {
  cookieSessionFn(socket.request, {}, next);
});
require('./events')(io);

// LOAD MONGOOSE MODELS
const User = require('./models/user.model');
const Notification = require('./models/notification.model');

// web app
app.use('/', express.static(__dirname + '/../meetmap-web/dist/'));

// ROUTES FOR API
app.use('/api', (req, res, next) => {
  if (!req.user) {
    res.status(401);
    res.json({code: 'NOT_AUTHORIZED'});
  } else {
    next();
  }
});
app.use('/api/users', require('./routes/users.router')(User));
app.use('/api/notifications', require('./routes/notifications.router')(Notification, io));
app.use('/auth', require('./routes/auth.router')(User));

app.get('/api/user', (req, res) => {
  res.json(req.user);
});

/**
 * IO Events handlers
 */

const User = require('./models/user.model');
const gpsMock = require('./mocks/gps');

module.exports = function(io) {
  // listen on every connection
  io.on('connection', (socket) => {
    const userId = socket.request.session.passport.user;
    console.log(`user id ${userId} connected`);

    User.findById(userId).then((foundUser) => {
      socket.name = foundUser.name;
      socket.userId = userId;
    });

    // listen on new_message
    socket.on('new_message', (data) => {
      // broadcast the new message
      io.to(data.room).emit('new_message', {message: data.message, name: socket.name});
    });

    // listen on gps
    socket.on('gps', (data) => {
      // broadcast gps
      io.to(data.room).emit('gps', {pos: data.pos, name: socket.name});
    });

    // join room
    socket.on('change_room', (data) => {
      console.log('socket joined room ' + data.room);
      socket.join(data.room);
    });

    /*
    // listen on typing
    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', {username: socket.username});
    });
    */

    /*
    // MOCK
    const intervalId = setInterval(() => {
      io.emit('gps', {
        pos: gpsMock.next(),
        name: 'bot',
      });
    }, 2000);

    socket.on('disconnect', function() {
      clearInterval(intervalId);
    });
    */
  });
};


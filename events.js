/**
 * IO Events handlers
 */

const User = require('./models/user.model');

module.exports = function(io) {
  // listen on every connection
  io.on('connection', (socket) => {
    const userId = socket.request.session.passport.user;
    console.log(`user id ${userId} connected`);

    User.findById(userId).then((foundUser) => {
      socket.name = foundUser.name;
    });

    // listen on new_message
    socket.on('new_message', (data) => {
      // broadcast the new message
      io.to(data.room).emit('new_message', {message: data.message, name: socket.name});
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


    // invite to chat
    socket.on('invite', (data) => {
      if (!data || !data.name) {
        console.error('tried to invite, but no username provided');
        return;
      }

      const friend = userService.get(data.name);

      if (friend && friend.socketId) {
        socket.broadcast.to(friend.socketId).emit('invitation', {name: socket.name, socketId: socket.id});
        console.log('invite to friend ' + friend.name + ' socketId' + friend.socketId);
      } else {
        console.log('no friend connected');
      }
    });
    */
  });
};


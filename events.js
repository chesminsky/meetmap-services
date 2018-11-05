/**
 * IO Events handlers
 */
const userService = require('./services/user.service');

module.exports = function(io) {
  // listen on every connection
  io.on('connection', (socket) => {
    console.log('New user connected');

    // default username
    socket.username = 'Anonymous';

    // listen on change_username
    socket.on('change_username', (data) => {
      if (!data || !data.username) {
        console.error('tried to change username, but no username provided');
        return;
      }

      socket.name = data.username;

      const user = userService.get(data.username);

      if (!user) {
        console.error('tried to set socket id to user, but no user found with name ', data.username);
      } else {
        user.socketId = socket.id;
        console.log('socketId: ' + socket.id + ' socket name ' + socket.name);
      }
    });

    socket.on('change_room', (data) => {
      console.log('socket joined room ' + data.socketId);
      socket.join(data.socketId);
    });

    // listen on new_message
    socket.on('new_message', (data) => {
      // broadcast the new message

      console.log('to room ' + data.room);

      io.to(data.room).emit('new_message', {message: data.message, name: socket.name});
    });

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
  });
};


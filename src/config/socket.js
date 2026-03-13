const socketIo = require('socket.io');
const config = require('./app.config');

let io;

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: config.socket.corsOrigin,
      methods: ['GET', 'POST'],
    },
    pingTimeout: config.socket.pingTimeout,
    pingInterval: config.socket.pingInterval,
  });

  io.on('connection', (socket) => {
    console.log('🔌 User Connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('🔌 User Disconnected:', socket.id);
    });
  });

  console.log('✅ Socket.IO Terinisialisasi!');
  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io tidak terinisialisasi!');
  }
  return io;
};

module.exports = { initSocket, getIo };

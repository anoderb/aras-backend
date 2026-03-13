const http = require('http');
const app = require('./src/app');
const config = require('./src/config/app.config');

const server = http.createServer(app);

// Initialize Socket.IO
const { initSocket } = require('./src/config/socket');
initSocket(server);

const PORT = config.app.port;

server.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`🚀 ${config.app.nama} Server is running!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Env: ${config.app.env}`);
  console.log(`🔗 URL: ${config.app.url}`);
  console.log(`==========================================`);
});

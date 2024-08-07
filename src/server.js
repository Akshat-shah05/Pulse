// REFERENCE FOR FUTURE: https://socket.io/how-to/use-with-nextjs 

// create server, parse URL, get next + get socket
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIo = require('socket.io');

// Not prod, app setup with request handler
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// set up app, create server
app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // initialize socket to server
  const io = socketIo(server);

  // turn socket on
  io.on('connection', (socket) => {
    console.log('a user connected');
    
    // Handle game requests
    socket.on('sendGameRequest', (data) => {
      const { toUsername, fromUsername } = data;
      // Emit game request to the recipient
      socket.broadcast.emit('receiveGameRequest', { toUsername, fromUsername });
    });

    // accept game request (from receiving users side)
    socket.on('acceptGameRequest', (data) => {
      const { toUsername, fromUsername } = data;
      // Notify both users to start the game
      io.emit('startGame', { toUsername, fromUsername });
    });

    // End the multiplayer
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  // Listen at the port
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
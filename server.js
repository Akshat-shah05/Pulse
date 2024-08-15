import { createServer } from "node:http"; 
import next from "next"; 
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client"; 

// Determine if the environment is development or production
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost"; 
let port = 3000;
const prisma = new PrismaClient(); // Instantiate Prisma Client

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler(); s

// Function to log the current online users
async function logUsers() {
  const users = await prisma.onlineUser.findMany(); 
  console.log("Current online users:", users);
}

// Prepare the Next.js app and set up the server
app.prepare().then(() => {
  const httpServer = createServer(handler); // Create an HTTP server with the Next.js request handler
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Allow requests from any origin
      methods: ["GET", "POST"] // Allow GET and POST requests
    }
  });

  // Set up Socket.IO event listeners
  io.on("connection", (socket) => {
    // Handle 'register' event
    socket.on("register", async (username) => {
      await prisma.onlineUser.upsert({
        where: { username }, // Find user by username
        update: { socketId: socket.id }, // Update the socket ID if user already exists
        create: { username, socketId: socket.id }, // Create a new user if not found
      });
      logUsers(); // Log the updated list of online users
    });

    // Handle 'send-game-request' event
    socket.on("send-game-request", async (friendUsername, currentUser, senderPort) => {
      console.log("request from ", currentUser, "to", friendUsername, "from port", senderPort);
      try {
        const user = await prisma.user.findUnique({
          where: { username: friendUsername }, // Find the user by username
        });

        if (user) {
          const friend = await prisma.onlineUser.findUnique({
            where: { username: friendUsername }, // Find if the friend is online
          });

          console.log(friend);

          socket.emit("user-found", friendUsername); // Notify sender that user is found
          if (friend) {
            io.to(friend.socketId).emit("game-request", currentUser, senderPort); // Send game request to the friend
          } else {
            socket.emit("user-not-online", friendUsername); // Notify sender that the friend is not online
          }
        } else {
          socket.emit("user-not-found", friendUsername); // Notify sender that the user does not exist
        }
      } catch (error) {
        console.error("Database query error:", error); // Log any errors during database queries
      }
    });

    // Handle 'accept-game-request' event
    socket.on("accept-game-request", async (friendUsername) => {
      const friend = await prisma.onlineUser.findUnique({
        where: { username: friendUsername }, // Find if the friend is online
      });
      if (friend) {
        io.to(friend.socketId).emit("request-accepted", socket.username); // Notify friend that the request is accepted
        socket.emit("request-accepted", friendUsername); // Notify sender that the request is accepted
      }
    });

    // Handle 'disconnect' event
    socket.on("disconnect", async () => {
      await prisma.onlineUser.deleteMany({
        where: { socketId: socket.id }, // Remove user from online users list
      });
      logUsers(); // Log the updated list of online users
    });

    // Handle 'join-game-room' event
    socket.on("join-game-room", (roomId, username) => {
      socket.join(roomId); // Join the specified room
      socket.to(roomId).emit("user-joined", username); // Notify the room that a new user has joined
    });
    
    // Handle 'send-video-stream' event
    socket.on("send-video-stream", (roomId, stream) => {
      socket.to(roomId).emit("receive-video-stream", stream); // Broadcast the video stream to all users in the room
    });
  });

  // Handle server shutdown signals
  process.on('SIGINT', async () => {
    console.log("Server is shutting down...");
    await prisma.onlineUser.deleteMany(); // Remove all users from the online list
    process.exit(); // Exit the process
  });

  process.on('SIGTERM', async () => {
    console.log("Server is shutting down...");
    await prisma.onlineUser.deleteMany(); // Remove all users from the online list
    process.exit(); // Exit the process
  });

  // Function to start the server and handle port conflicts
  function startServer(port) {
    httpServer.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`); // Log server readiness
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} is already in use, trying port ${port + 1}...`); // Warn if port is in use and try next port
        startServer(port + 1); // Recursively try the next port
      } else {
        console.error(err); // Log any other errors
        process.exit(1); // Exit the process with an error code
      }
    });
  }

  // Start the server on the specified port
  startServer(port);
});

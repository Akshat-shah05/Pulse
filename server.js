import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
let port = 3000;
const prisma = new PrismaClient();

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

async function logUsers() {
  const users = await prisma.onlineUser.findMany();
  console.log("Current online users:", users);
}

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    socket.on("register", async (username) => {
      await prisma.onlineUser.upsert({
        where: { username },
        update: { socketId: socket.id },
        create: { username, socketId: socket.id },
      });
      logUsers();
    });

    socket.on("send-game-request", async (friendUsername, currentUser, senderPort) => {
      console.log("request from ", currentUser, "to", friendUsername, "from port", senderPort);
      try {
        const user = await prisma.user.findUnique({
          where: {
            username: friendUsername,
          },
        });

        if (user) {
          const friend = await prisma.onlineUser.findUnique({
            where: { username: friendUsername },
          });

          console.log(friend);

          socket.emit("user-found", friendUsername);
          if (friend) {
            io.to(friend.socketId).emit("game-request", currentUser, senderPort);
          } else {
            socket.emit("user-not-online", friendUsername);
          }
        } else {
          socket.emit("user-not-found", friendUsername);
        }
      } catch (error) {
        console.error("Database query error:", error);
      }
    });

    socket.on("accept-game-request", async (friendUsername) => {
      const friend = await prisma.onlineUser.findUnique({
        where: { username: friendUsername },
      });
      if (friend) {
        io.to(friend.socketId).emit("request-accepted", socket.username);
        socket.emit("request-accepted", friendUsername);
      }
    });

    socket.on("disconnect", async () => {
      await prisma.onlineUser.deleteMany({
        where: { socketId: socket.id },
      });
      logUsers();
    });

    socket.on("join-game-room", (roomId, username) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", username);
    });
    
    socket.on("send-video-stream", (roomId, stream) => {
      socket.to(roomId).emit("receive-video-stream", stream);
    });
  });

  process.on('SIGINT', async () => {
    console.log("Server is shutting down...");
    await prisma.onlineUser.deleteMany();
    process.exit();
  });

  process.on('SIGTERM', async () => {
    console.log("Server is shutting down...");
    await prisma.onlineUser.deleteMany();
    process.exit();
  });

  function startServer(port) {
    httpServer.listen(port, hostname, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} is already in use, trying port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error(err);
        process.exit(1);
      }
    });
  }

  startServer(port);
});

// http://localhost:3000/game-room?username=akky_the_one&roomId=akky_the_one-aaa
// http://localhost:3001/game-room?username=aaa&roomId=aaa-null
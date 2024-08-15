import { io } from "socket.io-client";

let socket = null;

// socket singleton setup
export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3000"); // Always connect to the main server
  }
  return socket;
};
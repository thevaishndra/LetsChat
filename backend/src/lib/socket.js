import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);//creating http server

//initialize socket.io
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],//allows requests from frontend
  },
});


//get socket id of user which supports pvt messaging
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}


// used to track online users
const userSocketMap = {}; // stores {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId; //extract userId
  if (userId) userSocketMap[userId] = socket.id; //store userId with socketId

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));//broadcasts list of online users to all connected clients

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];//remove user from online list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));//update online user list
  });
});

export { io, app, server };

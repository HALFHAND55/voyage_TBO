import { Server } from "socket.io";
import { Server as HttpServer } from "http";

interface UserSocketMap {
  [userId: string]: string;
}

const userSocketMap: UserSocketMap = {};

let io: Server;

export const initSocket = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"], // adjust if needed
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const userId = socket.handshake.query.userId as string | undefined;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      if (userId) {
        delete userSocketMap[userId];
      }

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export const getReceiverSocketId = (
  userId: string
): string | undefined => {
  return userSocketMap[userId];
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
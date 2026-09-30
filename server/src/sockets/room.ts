import type http from "http";
import { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "../types";

export function attachSockets(server: http.Server, origins: string[]) {
  // const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  //   cors: { origin: origins },
  // });

  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: origins,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId, userName) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-connected", userId);

      socket.on("message", (text) => {
        if (typeof text !== "string" || !text.trim()) return;
        io.to(roomId).emit("createMessage", {
          text: text.slice(0, 2000),
          userName,
          at: Date.now(),
        });
      });

      socket.on("disconnect", () =>
        socket.to(roomId).emit("user-disconnected", userId),
      );
    });
  });

  return io;
}

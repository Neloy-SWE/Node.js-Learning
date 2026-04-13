import { Server } from "socket.io";
import crypto from "crypto";

const getSecretRoomId = (userId, targetUserId) => {
    return crypto.createHash("sha256")
        .update([userId, targetUserId].sort().join("_"))
        .digest("hex");
}

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_BASE_URL,
            // methods: ["GET", "POST"],
            // credentials: true
        }
    });

    io.on("connection", (socket) => {
        socket.on("joinChat", ({
            firstName,
            userId,
            targetUserId
        }) => {
            const roomId = getSecretRoomId(userId, targetUserId);
            // console.log(firstName + " joined room with id: " + roomId);
            socket.join(roomId);
        });

        socket.on("sendMessage", ({
            firstName,
            userId,
            targetUserId,
            text,
        }) => {
            const roomId = getSecretRoomId(userId, targetUserId);
            const currentTime = new Date().toLocaleTimeString();
            // console.log(firstName + " sent message: " + text + " to room with id: " + roomId + " at " + currentTime);
            io.to(roomId).emit("messageReceived", { firstName, text, currentTime, id: userId });
        });

        socket.on("disconnect", () => {

        });
    });
}

export { initializeSocket };
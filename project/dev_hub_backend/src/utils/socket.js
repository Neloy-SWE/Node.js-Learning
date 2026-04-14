import { Server } from "socket.io";
import crypto from "crypto";
import { Chat } from "../model/chat.js";
import { ConnectionRequest } from "../model/connection_request.js";

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

        socket.on("sendMessage", async ({
            firstName,
            lastName,
            userId,
            targetUserId,
            text,
        }) => {
            try {

                const checkConnection = await ConnectionRequest.findOne({
                    $or: [
                        { toUserId: userId, fromUserId: targetUserId, status: "accepted" },
                        { toUserId: targetUserId, fromUserId: userId, status: "accepted" },
                    ]
                });

                if (!checkConnection) {
                    const error = new Error("You are not connected!");
                    // error.statusCode = 404;
                    throw error;
                }

                const roomId = getSecretRoomId(userId, targetUserId);
                const currentTime = new Date().toLocaleTimeString('en-GB',
                    {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                // console.log(firstName + " sent message: " + text + " to room with id: " + roomId + " at " + currentTime);

                let chat = await Chat.findOne({
                    participants: { $all: [userId, targetUserId] },
                });

                if (!chat) {
                    chat = new Chat({
                        participants: [userId, targetUserId],
                        messages: [],
                    });
                }

                chat.messages.push({
                    senderId: userId,
                    text: text,
                })

                await chat.save();
                io.to(roomId).emit("messageReceived", { firstName, lastName, text, currentTime, id: userId });
            } catch (err) {
                console.log("error:::: " + err)
            }
        });

        socket.on("disconnect", () => {

        });
    });
}

export { initializeSocket };
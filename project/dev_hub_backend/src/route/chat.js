import express from "express";
import { Chat } from "../model/chat.js";
import { userAuthMiddleware } from "../middleware/auth.js";
import { ConnectionRequest } from "../model/connection_request.js";

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuthMiddleware, async (req, res) => {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    try {

        const checkConnection = await ConnectionRequest.findOne({
            $or: [
                { toUserId: userId, fromUserId: targetUserId, status: "accepted" },
                { toUserId: targetUserId, fromUserId: userId, status: "accepted" },
            ]
        });

        if(!checkConnection){
            const error = new Error("You are not connected!");
            error.statusCode = 404;
            throw error;
        }

        let chat = await Chat.findOne({
            participants: {
                $all: [userId, targetUserId]
            }
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName",
        });
        if (!chat) {
            // chat = new Chat({
            //     participants: [userId, targetUserId],
            //     messages: [],
            // })
            // await chat.save();
            res.status(201).json({message: "start new conversation"});
        } else {
            res.json(chat);
        }
        

    } catch (err) {
        res.status(err.statusCode || 400).json({ message: err.message });
    }
});

export { chatRouter };
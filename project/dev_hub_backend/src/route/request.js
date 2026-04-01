import express from "express";
import { userAuthMiddleware } from "../middleware/auth.js";
import { ConnectionRequest } from "../model/connection_request.js";
import { User } from "../model/user.js";

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuthMiddleware, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status!");
        }
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            const error = new Error("Interested user not found!");
            error.statusCode = 404;
            throw error;
        }

        // not working as expected.
        // if (ObjectId.isValid(toUserId.toString()) === false) {
        //     throw new Error("Invalid interested user id!");
        // }

        // if (fromUserId.toString() === toUserId) {
        //     throw new Error("You can't send connection request to yourself!");
        // }

        // this query will be fast because we have index on fromUserId and toUserId fields.
        const isRequestAlreadySent = await ConnectionRequest.findOne(
            {
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            }
        );
        if (isRequestAlreadySent) {

            switch (isRequestAlreadySent.status) {
                case "interested":
                    throw new Error("there is a pending connection request between you!");
                case "ignored":
                    throw new Error("This connection request has been ignored already!");
                case "accepted":
                    throw new Error("You are already connected with this user!");
                case "rejected":
                    throw new Error("This connection request has been rejected already!");
                default:
                    throw new Error("Contact developer!");
            }
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({ message: "Connection request sent successfully!", data });

    } catch (err) {
        res.status(err.statusCode || 400).json({ message: err.message });
    }
});

requestRouter.post("/request/review/:status/:requestId", userAuthMiddleware, async (req, res) => {

    try {
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status!");
        }

        const user = req.user;
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: user._id,
            status: "interested",
        });

        if (!connectionRequest) {
            const error = new Error("Connection request not found!");
            error.statusCode = 404;
            throw error;
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({
            message: "Connection request " + status,
            data,
        });

    } catch (err) {
        res.status(err.statusCode || 400).json({ message: err.message });
    }
});

export { requestRouter };
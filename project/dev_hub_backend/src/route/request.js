import express from "express";
import { userAuthMiddleware } from "../middleware/auth.js";
import { ConnectionRequest } from "../model/connection_request.js";

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
        if (fromUserId.toString() === toUserId) {
            throw new Error("You can't send connection request to yourself!");
        }

        const isRequestAlreadySent = await ConnectionRequest.findOne({ fromUserId, toUserId });
        if (isRequestAlreadySent) {
            throw new Error("You have already sent connection request to this user!");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({ message: "Connection request sent successfully!", data });

    } catch (err) {
        res.status(400).send(err.message);
    }
});

export { requestRouter };
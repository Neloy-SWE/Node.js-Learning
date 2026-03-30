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

        if (fromUserId.toString() === toUserId) {
            throw new Error("You can't send connection request to yourself!");
        }

        const isRequestAlreadySent = await ConnectionRequest.findOne(

            {
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            }
        );
        if (isRequestAlreadySent) {
            if (isRequestAlreadySent.status === "interested"){
                throw new Error("You have already sent connection request to this user!");
            }
            else if (isRequestAlreadySent.status === "ignored"){
                throw new Error("You have already ignored connection request from this user!");
            }
            else if (isRequestAlreadySent.status === "accepted"){
                throw new Error("You are already connected with this user!");
            }
            else if (isRequestAlreadySent.status === "rejected"){
                throw new Error("You have already rejected connection request from this user!");
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

export { requestRouter };
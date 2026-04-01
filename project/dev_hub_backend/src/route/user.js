import express from "express";
import { userAuthMiddleware } from "../middleware/auth.js";
import { ConnectionRequest } from "../model/connection_request.js";
// import { User } from "../model/user.js";

const userSaveData = "firstName lastName photoUrl gender skills about";

const userRouter = express.Router();

userRouter.get("/user/pending-requests", userAuthMiddleware, async (req, res) => {
    try {
        const user = req.user;
        const connectionRequests = await ConnectionRequest.find(
            {
                toUserId: user._id,
                status: "interested"
            }
        ).populate(
            "fromUserId",
            userSaveData
        );
        // ).populate("fromUserId", ["firstName", "lastName"]); // this is also valid.
        // populate will only work if we have ref in the schema.

        res.json(
            {
                message: "Data fetched successfully",
                data: connectionRequests
            }
        );

    } catch (err) {
        res.status(err.statusCode || 400).json({ message: err.message });
    }
});

userRouter.get("/user/connections", userAuthMiddleware, async (req, res) => {
    try {
        const user = req.user;

        const connections = await ConnectionRequest.find(
            {
                $or: [
                    { fromUserId: user._id, status: "accepted" },
                    { toUserId: user._id, status: "accepted" }
                ]
            }
        ).populate(
            "fromUserId toUserId",
            userSaveData
        );

        const data = connections.map((row) => {
            if (row.fromUserId._id.equals(user._id)) {
                return row.toUserId;
            }
            else {
                return row.fromUserId;
            }
        });

        res.json(
            {
                // data: connections
                data
            }
        )

    } catch (err) {
        res.status(err.statusCode || 400).json({ message: err.message });
    }
});

export { userRouter };
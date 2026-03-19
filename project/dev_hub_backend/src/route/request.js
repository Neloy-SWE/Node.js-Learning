import express from "express";
import { userAuthMiddleware } from "../middleware/auth.js";

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuthMiddleware, async (req, res) => {
    const user = req.user;
    res.send(user.firstName + " " + user.lastName + " sent you connection request!");
});

export { requestRouter };
import express from "express";
import { userAuthMiddleware } from "../middleware/auth.js";

const profileRouter = express.Router();

profileRouter.get("/profile", userAuthMiddleware, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export { profileRouter };
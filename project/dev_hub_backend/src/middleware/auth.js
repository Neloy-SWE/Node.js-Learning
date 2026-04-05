import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const userAuthMiddleware = async (req, res, next) => {
    try {
        // const { userId } = req.params;

        const { token } = req.cookies;
        if (!token) {
            const error = new Error("Unauthorized!");
            error.statusCode = 401;
            throw error;
        }

        const decodedObject = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedObject;
        if (!_id) {
            const error = new Error("Unauthorized!");
            error.statusCode = 401;
            throw error;
        }
        // if (userId) {
        // if (userId == _id) {
        const user = await User.findById({ _id: _id });
        if (!user) {
            throw new Error("Login required!");
        }
        req.user = user;
        next();
        // }
        // else {
        //     throw new Error("Unauthorized!");
        // }
        // }
        // else {
        //     throw new Error("UserId is required!");
        // }

    } catch (err) {
        res.status(err.statusCode || 400).json({ message: err.message });
    }
};
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const userAuthMiddleware = async (req, res, next) => {
    try {
        const { userId } = req.params;
        console.log("userId from params: ", userId);

        const { token } = req.cookies;
        if (!token) {
            throw new Error("Unauthorized!");
        }

        const decodedObject = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedObject;
        if (userId) {
            if (userId == _id) {
                const user = await User.findById({ _id: _id });
                if (!user) {
                    throw new Error("Login required!");
                }
                req.user = user;
                next();
            }
            else {
                throw new Error("Unauthorized!");
            }
        }
        else {
            throw new Error("UserId is required!");
        }

    } catch (err) {
        res.status(400).send(err.message);
    }
};
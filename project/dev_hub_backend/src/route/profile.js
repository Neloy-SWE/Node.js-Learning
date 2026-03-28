import express from "express";
import { userAuthMiddleware } from "../middleware/auth.js";
import { User } from "../model/user.js";
import { validatorFields } from "../validator/validator_fields.js";

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuthMiddleware, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

profileRouter.patch("/profile/edit", userAuthMiddleware, async (req, res) => {
    try {
        const data = req.body;
        const allowFieldsForUpdates = [
            "firstName",
            "lastName",
            "age",
            "gender",
            "about",
            "skills",
            "photoUrl",
        ];
        validatorFields(data, allowFieldsForUpdates);

        const user = req.user;
        // console.log(user);
        Object.keys(req.body).forEach(key => user[key] = req.body[key]);
        // console.log(user);
        await user.save();

        // res.send("User updated succesfully!");
        // we can also send json as response:
        res.json({ message: "User updated succesfully!", data: user });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

export { profileRouter };
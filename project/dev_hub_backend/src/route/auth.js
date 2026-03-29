import express from "express";
import { validatorFields } from "../validator/validator_fields.js";
import bcrypt from "bcrypt";
import { User } from "../model/user.js";
import validator from 'validator';

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {

        const allowFields = [
            "firstName",
            "lastName",
            "emailId",
            "password",
            // "age",
            // "gender",
            // "photoUrl",
            // "about",
            // "skills"
        ];

        validatorFields(req.body, allowFields);

        const { firstName, lastName, emailId, password } = req.body;
        if (!validator.isStrongPassword(password)) {
            throw new Error("please add a strong password");
        }
        const passwordHash = await bcrypt.hash(password, 10); // this can bypass schema level verification

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
            // password: password
        }
        );

        await user.save(); // this will return a promise.
        res.send("User created successfully!");
    } catch (err) {
        res.status(400).send(err.message);
    }

});

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!validator.isEmail(emailId)) {
            throw new Error(emailId + " is not a valid email");
        }

        const user = await User.findOne({ emailId: emailId });
        if (!user || !(await user.validatePassword(password))) {
            throw new Error("Wrong credential!");
        }
        else {
            const token = await user.getJWT();
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
        }

        res.send("Login successful!");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date((Date.now()))
    }).send("Logout successfully");
});


export { authRouter };
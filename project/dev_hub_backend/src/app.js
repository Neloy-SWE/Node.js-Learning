import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./model/user.js";
import { validatorFields } from "./validator/validator_fields.js";
import bcrypt from "bcrypt";
import validator from 'validator';
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { userAuthMiddleware } from "./middleware/auth.js"

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.post("/signup", async (req, res) => {
    // console.log(req.body);
    /**
     * if we do not add app.use(express.json()), then req.body will be undefined, because client is sending data in json object format, and we need it in javascript object format. here, middleware can be a good solution to handle all api's req.body.
     * 
     * express has a built-in middleware called express.json() that parses incoming JSON requests and puts the parsed data in req.body.
     */

    // const userObject = {
    //     firstName: "Neloy",
    //     LastName: "Neel",
    //     emailId: "neloy@gmail.com",
    //     password: "123456789",
    // };

    // const userObject = req.body;
    // const user = new User(userObject);


    try {

        const allowFields = [
            "firstName",
            "lastName",
            "emailId",
            "password",
            "age",
            "gender",
            "photoUrl",
            "about",
            "skills"
        ];

        validatorFields(req.body, allowFields);

        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        }
        );

        await user.save(); // this will return a promise.
        res.send("User created successfully!");
    } catch (err) {
        res.status(400).send(err.message);
    }

});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!validator.isEmail(emailId)) {
            throw new Error(emailId + " is not a valid email");
        }

        const user = await User.findOne({ emailId: emailId });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Wrong credential!");
        }
        else {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            // console.log(process.env.JWT_SECRET);
            // console.log(token);
            res.cookie("token", token);
        }

        res.send("Login successful!");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.get("/profile/:userId", userAuthMiddleware, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.get("/user", async (req, res) => {
    const emailId = req.body.emailId;

    try {
        // const users = await User.find({ emailId: emailId }); // find() returns array.
        // if (users.length === 0) {
        //     res.status(404).send("User not found!");
        // } else {
        //     res.send(users);
        // }

        const user = await User.findOne({ emailId: emailId }); // findOne() returns single document.
        if (!user) {
            res.status(404).send("User not found!");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }

});

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try {
        await User.findByIdAndDelete({ _id: userId });
        res.send("User deleted successfully!");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.patch("/user/:userId", async (req, res) => {
    // const userId = req.query?.userId;
    /**
     * use req.query when we want to send data using query params like: /user?userId=12345. for this no need to add /user/:userId in the url path.
     */
    const userId = req.params?.userId;
    /**
     * use req.params when we want to send data using url params like /user/12345. for this we need to add /user/:userId in the url path.
     */

    const data = req.body;

    try {

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

        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        });
        /**
         * by default, findByIdAndUpdate() returns the document as it was before the update was applied. if we want to get the updated document, we can pass an options object with the returnDocument property set to "after". this way, it will return the document after the update was applied.
         * 
         * by default, validation is false, so that when we try to update any field that has validate function will not work here. so we need to set 
         */
        console.log(user);
        res.send("User updated succesfully!");
    } catch (err) {
        res.status(400).send(err.message);
    }
})

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch((err) => {
    console.error("Database connection failed!");
});
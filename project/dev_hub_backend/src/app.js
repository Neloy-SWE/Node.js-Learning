import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./model/user.js";

const app = express();

app.post("/signup", async (req, res) => {
    const userObject = {
        firstName: "Neloy",
        LastName: "Neel",
        emailId: "neloy@gmail.com",
        password: "123456789",
    }

    const user = new User(userObject);
    try {
        await user.save(); // this will return a promise.
        res.send("User created successfully!");
    } catch (err) {
        res.status(400).send("User creation failed!");
    }

});

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch((err) => {
    console.error("Database connection failed!");
});
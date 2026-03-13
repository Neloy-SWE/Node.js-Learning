import express from "express";
import { connectDB } from "./config/database.js";
import { User } from "./model/user.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.post("/signup", async (req, res) => {
    console.log(req.body);
    /**
     * if we do add line 7, then req.body will be undefined, because client is sending data in json object format, and we need it in javascript object format. here, middleware can be a good solution to handle all api's req.body.
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
    const user = new User(req.body);

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
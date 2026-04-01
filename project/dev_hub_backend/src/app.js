import express from "express";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./route/auth.js";
import { profileRouter } from "./route/profile.js";
import { requestRouter } from "./route/request.js";
import { userRouter } from "./route/user.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// using app.use() we can add router just like middleware.
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch((err) => {
    console.error("Database connection failed!");
});
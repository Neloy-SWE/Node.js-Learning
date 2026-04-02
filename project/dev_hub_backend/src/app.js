import express from "express";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./route/auth.js";
import { profileRouter } from "./route/profile.js";
import { requestRouter } from "./route/request.js";
import { userRouter } from "./route/user.js";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with {type: "json"};

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const app = express();
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// using app.use() we can add router just like middleware.
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.error("Database connection failed!");
});
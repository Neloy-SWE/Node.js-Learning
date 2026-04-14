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
import cors from 'cors';
// import "./utils/cron_job.js";
import http from 'http';
import { initializeSocket } from "./utils/socket.js";
import { chatRouter } from "./route/chat.js";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const app = express();

app.use(cors(
    {
        origin: process.env.FRONTEND_BASE_URL,
        credentials: true
    }
));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// using app.use() we can add router just like middleware.
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const httpServer = http.createServer(app);

initializeSocket(httpServer);

connectDB().then(() => {
    console.log("Database connected successfully!");
    httpServer.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.error("Database connection failed!");
});
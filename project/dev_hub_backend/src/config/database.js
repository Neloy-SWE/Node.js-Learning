import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import mongoose from "mongoose";

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
}

// connectDB().then(() => {
//     console.log("Database connected successfully!");
// }).catch((err) => {
//     console.error("Database connection failed!");
// });
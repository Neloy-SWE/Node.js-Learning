import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female"].includes(value.toLowerCase())) {
                throw new Error("Gender need to be male or female");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
    },
    about: {
        type: String,
        default: "Hey there! I am using DevHub.",
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
    // this will automatically add createdAt and updatedAt fields to the document.
});

export const User = mongoose.model("User", userSchema);
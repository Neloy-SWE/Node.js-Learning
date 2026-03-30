import mongoose from "mongoose";
import validator from 'validator';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        // index: true,
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
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(value + " is not a valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("please add a strong password");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "Gender need to be male or female",
        },
        // validate(value) {
        //     if (!["male", "female"].includes(value.toLowerCase())) {
        //         throw new Error("Gender need to be male or female");
        //     }
        // }
    },
    photoUrl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error(value + " is not a valid url");
            }
        }
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

userSchema.index({ firstName: 1, lastName: 1 });
// userSchema.index({ firstName: 1 });
// userSchema.index({ lastName: 1 });

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "8h" });

    return token;
}

userSchema.methods.validatePassword = async function (passwordFromRequest) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValidate = await bcrypt.compare(passwordFromRequest, passwordHash);
    // console.log("checking password validation: ", isPasswordValidate);
    return isPasswordValidate;
}

export const User = mongoose.model("User", userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 40,
        
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowerCase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please fill a valid email address"]
    },

    password: {
        type: String,
        required: [true, "User Password is required"],
        trim: true,
        minLength: 6,
    },
}, {timestamps: true});

 const User = mongoose.model("User", userSchema)

 export default User;






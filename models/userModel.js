const mongoose = require("mongoose");

// created a user schema
const userSchema = new mongoose.Schema(
    {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, require: true },
    password: { type: String, require: true },
        role: {
            type: String,
            enum: ["student", "instructor"],
            default: "student"
        },
    phone_number: { type: Number, default: 0 },
    location: { type: String, default: "" },
    verified: { type: Boolean, default: false }
},
    { timestamps: true }
);

const Auth = new mongoose.model("Auth", userSchema);

module.exports = Auth;
const express = require("express");
const jwt = require("jsonwebtoken");
const Auth = require("../models/userModel")
const app = express();
app.use(express.json())

const validateRegister = async (  req, res, next) => {
     // To destucture the user info  
            const { firstName, lastName, email, password, role, phone_number, location } = req.body;
    
    // To check if the user enter email and password and to ensure it is upto 8 character
        const errors = [];
            if (!email) {
                errors.push("Please enter your email")
            }
    
            if (!password || password.length < 8) {
                errors.push("Password must be upto 8 characters")
            }
    
            if (errors.length > 0) {
                res.status(400).json({message: errors})
            }
    
        next()
}

// to authorize user
const auth = async (req, res, next) => {
    
    const token = req.header("authorization");
    if(!token){
        return res.status(401).json({message: "Please login!"})
    }
  
    const splitToken = token.split(" ");
    const realToken = splitToken[1];
    const tokenDecoded = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);
    if (!tokenDecoded) {
        return res.status(401).json({ message: "Please login" });
    }
    
    const user = await Auth.findById(tokenDecoded.user._id);
    if (!user) {
        res.json(404).json({
            message: "User account not exist"
        })
    }
    req.user = user;
    next();

    
};

// to check role
const checkRole = async (req, res, next) => {
    
    if (!req.user) {
       return res.status(400).json({
            message: "Unauthorizesd"
        })
    }
    if (req.user.role !== "student") {
        return res.status(400).json({
            message: "Access denied: student only"
        })
    }    


next()
}

const isInstructor = async (req, res, next) => {
    
    if (!req.user) {
       return res.status(400).json({
            message: "Unauthorizesd"
        })
    }
    if (req.user.role !== "instructor") {
        return res.status(400).json({
            message: "Access denied: instructor only"
        })
    }    


next()
}





module.exports = {validateRegister, auth, checkRole, isInstructor};
const express = require("express");
const { validateRegister, auth } = require("../middleware");
const { registerUser, viewAllUser, loginUser } = require("../Controllers/userController");
const { handleForgotPassword, handleResetPassword } = require("../Controllers/forgotPassword");

const router = express.Router();


// Base api
router.get("/", async (req, res) => {
    res.status(201).json({message: "Welcome to Educore"}) 
 });
 

 // To get all users
 router.get("/all-users", auth, viewAllUser);
 
 
 
 // creating an API for user registrations and authentication
 router.post("/sign-up", validateRegister, registerUser);
 
 
 // Creating an API for user login and validation
 router.post("/login", loginUser);

 
 
 // forgoten password
router.post("/forgot-password", handleForgotPassword);
 
// User get to reset their password
router.post("/reset-password", auth, handleResetPassword);
 



module.exports = router;
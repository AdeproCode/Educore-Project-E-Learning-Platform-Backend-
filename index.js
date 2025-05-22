// creating and connecting the server
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { handleForgotPassword } = require("./Controllers/forgotPassword");
const { registerUser, loginUser, viewAllUser } = require("./Controllers/userController");
const validateRegister = require("./middleware");
const courseEnrollment = require("./Controllers/enrollmentController");
const {viewAllCourse, createACourse, viewEnrolledCourses} = require("./Controllers/courseController");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Mongodb connected...")
    
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })

});

app.get("/", async (req, res) => {
   res.status(201).json({message: "Welcome to Educore"}) 
});

app.get("/users", viewAllUser);



// creating an API for user registrations and authentication
app.post("/sign-up", validateRegister, registerUser);


// Creating an API for user login and validation
app.post("/login", loginUser);


// To create a course by instructor
app.post("/create-course", createACourse);



//To view all courses
app.get("/all-courses", viewAllCourse);



// forgoten password
app.post("/forgot-password", handleForgotPassword);


// Course enrollment
app.post("/course-enrollment", courseEnrollment);



// Instructor can view enrolled course
app.get("/view-enrolled-courses", viewEnrolledCourses)
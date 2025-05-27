const express = require("express");
const { validateRegister, auth } = require("../middleware");
const { registerUser, viewAllUser, loginUser } = require("../Controllers/userController");
const { createACourse, viewAllCourse, courseEnrollment, viewEnrolledCourses, handleStudentEnrolledCourse } = require("../Controllers/courseController");
const { handleForgotPassword } = require("../Controllers/forgotPassword");

const router = express.Router();



router.get("/", async (req, res) => {
    res.status(201).json({message: "Welcome to Educore"}) 
 });
 

 // To get all users
 router.get("/all-users", auth, viewAllUser);
 
 
 
 // creating an API for user registrations and authentication
 router.post("/sign-up", validateRegister, registerUser);
 
 
 // Creating an API for user login and validation
 router.post("/login", loginUser);
 
 
 // To create a course by instructor
 router.post("/create-course", createACourse);
 
 
 
 //To view all courses
 router.get("/all-courses", viewAllCourse);
 
 
 
 // forgoten password
 router.post("/forgot-password", handleForgotPassword);
 
 
 // Course enrollment
 router.post("/course-enrollment", courseEnrollment);
 
 
 
 // Instructor can view enrolled course
router.get("/view-enrolled-courses", viewEnrolledCourses);


// Student view their enrolled course
router.get("/student/enrolled-courses", handleStudentEnrolledCourse);





module.exports = router;
const express = require("express");
const { auth, checkRole } = require("../middleware");
const {createACourse, viewAllCourse, courseEnrollment, viewEnrolledCourses, handleStudentEnrolledCourse, courseDetails }= require("../Controllers/courseController")
const router = express.Router();


 // To create a course by instructor
 router.post("/create-course", auth, createACourse);
 
 
 
 //To view all courses
router.get("/all-courses", viewAllCourse);
 

 // Course enrollment
 router.post("/course-enrollment", courseEnrollment);
 
 
 
 // Instructor can view enrolled course
router.get("/instructor/courses-enrolled", viewEnrolledCourses);


// Student can view their enrolled course
router.get("/student/enrolled-courses", auth, checkRole, handleStudentEnrolledCourse);


router.get("/course-details/:id", courseDetails)



module.exports = router;
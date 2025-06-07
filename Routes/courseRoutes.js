const express = require("express");
const { auth, checkRole, isInstructor } = require("../middleware");
const {createACourse, viewAllCourse, courseEnrollment, viewEnrolledCourses, handleStudentEnrolledCourse, courseDetails, handleCourseCompletion }= require("../Controllers/courseController")
const router = express.Router();


 // To create a course by instructor
 router.post("/create-course", auth, isInstructor, createACourse);
 
 
 
 //To view all courses
router.get("/all-courses", viewAllCourse);
 

 // Course enrollment
 router.post("/course-enrollment", courseEnrollment);
 
 
 
 // Instructor can view enrolled course
router.get("/instructor/courses-enrolled", viewEnrolledCourses);


// Student can view their enrolled course
router.get("/student/enrolled-courses", auth, checkRole, handleStudentEnrolledCourse);


// view course details route
router.get("/course-details/:id", courseDetails);


//add course completion status (boolean)
router.put("/course-completion/:courseId", auth, handleCourseCompletion);



module.exports = router;
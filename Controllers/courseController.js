const Course = require("../models/courseModel");
const EnrollCourse = require("../models/enrollmentModel");
const Auth = require("../models/userModel");


// Instructors can create a course
const createACourse = async (req, res) => {
    try {

        const { courseTitle, courseDescription, courseVideo, courseImage } = req.body;

        const isInstructor = await Auth.findOne({ role: Auth?.role });
        if (isInstructor !== "instructor") {
            res.status(400).json({
                message: "Only instructor can create course"
            })
        }
       
        const createdCourse = new Course({
            courseTitle, courseDescription, courseVideo, courseImage
        })
        await createdCourse.save()
        
        res.status(201).json({
            message: "Course created successfully",
            createdCourse
        })
        
    } catch (error) {

        res.status(500).json({ message: error.message })
        
    }
};


// To view all courses
const viewAllCourse = async (req, res) => {
    
    try {
        const course = await Course.find();

        res.status(201).json({
            message: "All courses",
            course
        })
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }

};


const viewEnrolledCourses = async (req, res) => {
    try {
        const enrolledCourse = await EnrollCourse.find();
        if (!enrolledCourse) {
            return res.status(404).json({message: "No enrolled course found"})
        }

        res.status(200).json({
            message: "All enrolled courses",
            enrolledCourse
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {viewAllCourse, createACourse, viewEnrolledCourses};
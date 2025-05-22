const Course = require("../models/courseModel");
const EnrollCourse = require("../models/enrollmentModel");
const Auth = require("../models/userModel");


// Course enrollment
const courseEnrollment = async (req, res) => {
    try {
        const { email, courseId } = req.body;


        const student = await Auth.findOne({ email });
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            })
        };

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        };

        const exist = await EnrollCourse.findOne({
            student: student._id,
            course: course._id
        });

        if (exist) {
            return res.status(400).json({message: "Course already enrolled"})
        }

        const enrolledCourse = new EnrollCourse({
            student: student._id,
            course: course._id
        });

        await enrolledCourse.save();

    
 
        res.status(201).json({
            message: `You have enrolled for the course successfully`,
            enrolledCourse,
            Course: {
                courseTitle: course.courseTitle,
                courseDescription: course.courseDescription,
            }

        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};


module.exports = courseEnrollment;
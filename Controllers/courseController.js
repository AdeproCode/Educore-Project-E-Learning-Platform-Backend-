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



// Instructors can view enrolled courses
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

// Student can view enrolled courses
const handleStudentEnrolledCourse = async (req, res)=>{
   try {
    
       const studentId = req.user._id;
       
       const courseEnrollments = await EnrollCourse.find({ student: studentId });
  
       const courses = [];

for (const enrollment of courseEnrollments) {
  const course = await Course.findById(enrollment.course);
  if (course) {
    courses.push(course);
  }
}
    
       return res.status(200).json({
           message: "You enrolled for the following courses",
            courses
         })
       
 
   } catch (error) {
    res.status(500).json({message: error.message})
   }

};


// Course details route
const courseDetails = async (req, res) => {
    try {
        const studentId = req.params.id;

        const course = await Course.findById(studentId)
        if (!course) {
            res.status(404).json({message: "No course found"})
        };

        res.status(201).json({
            message: "Course details",
            course
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



module.exports = {viewAllCourse, createACourse, courseEnrollment, viewEnrolledCourses, handleStudentEnrolledCourse, courseDetails};
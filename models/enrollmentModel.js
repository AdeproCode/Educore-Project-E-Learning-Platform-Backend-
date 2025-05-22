
const mongoose = require("mongoose");

// creating schema for enrollment
const enrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    enrollmentDate: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
},
    { timestamps: true }
);



const EnrollCourse = mongoose.model("EnrollCourse", enrollmentSchema);

module.exports = EnrollCourse;
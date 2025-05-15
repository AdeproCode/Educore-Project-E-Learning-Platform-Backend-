const mongoose = require("mongoose");

// created a course schema
const courseSchema = new mongoose.Schema(
    {
    courseTitle: { type: String, require: true },
    courseDescription: { type: String, require: true },
    courseVideo: { type: String, default: "" },
    courseImage: {type: String, default: ""}
},
    { timestamps: true }
);

const Course = new mongoose.model("Course", courseSchema);

module.exports = Course;
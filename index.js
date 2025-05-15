// creating and connecting the server
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Auth = require("./userModel");
const Course = require("./courseModel");
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

app.get("/users", async (req, res) => {
    
    try {
       
    const users = await Auth.find()

    res.status(200).json({
        message: "All users",
        users
    })
   } catch (error) {
    res.status(500).json({message: error?.message})
   }
})



// creating an API for user registrations and authentication
app.post("/sign-up", async (req, res) => {
    try {
         // To destucture the user info  
        const { firstName, lastName, email, password, role, phone_number, location } = req.body;

        // To check if the user enter email and password and to ensure it is upto 8 character
        if (!email) {
            return res.status(400).json({ message: "Enter email address"})
        };

        if (!password) {
            return res.status(400).json({message: "Enter password"})
        };

        if (password.length < 8) {
            return res.status(400).json({message: "Enter upto 8 character"})
        };

        // Checking if the user already exist or not
        const existenUser = await Auth.findOne({ email });
        if (existenUser) {
            res.status(400).json({message: "User account already exist"})
        };

        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // creating a new user account
        const newUser = new Auth({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            phone_number,
            location
        });
        await newUser.save();

        res.status(201).json({
            message: "User account created successfully",
            newUser: {firstName,
            lastName,
            email,
            role,
            phone_number,
            location}
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});


// Creating an API for user login and validation
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Trying to check if the user account already exist or not
        const user = await Auth.findOne({ email });
    if (!user) {
        res.status(404).json({
            message: "User account does not exist"
        })
        }
        
        // Trying to check the password enter if it matches with bcrypt password hashed
        const isMatch = await bcrypt.compare(password, user?.password)
        if (!isMatch) {
            res.status(400).json({
                message: "Incorrect password or email"
            })
        };

        const accessToken = jwt.sign(
            { user },
            process.env.ACCESS_TOKEN,
            { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
            { user },
            process.env.REFRESH_TOKEN,
            { expiresIn: "30d" }
        );

        res.status(201).json({
            message: "Login successfully",
            accessToken,
            user: {
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email,
                role: user?.role,
                phone_number: user?.phone_number,
                location: user?.location
            },
            refreshToken
        })


    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
});


// To create a course by instructor
app.post("/create-course", async (req, res) => {
    try {

        const { courseTitle, courseDescription, courseVideo, courseImage } = req.body;

        const isInstructor = await Auth.findOne({role: Auth?.role});
        if (isInstructor !== "instructor") {
            res.status(400).json({
                message: "Only instructor can create course"
            })
        }
       
        const createCourse = new Course({
            courseTitle, courseDescription, courseVideo, courseImage
        })
        await createCourse.save()
        
        res.status(201).json({
            message: "Course created successfully",
            createCourse
        })
        
    } catch (error) {

        res.status(500).json({message: error.message})
        
    }
})



//To show all courses
app.get("/course", async (req, res) => {
    
    try {
        const course = await Course.find();

    res.status(201).json({
        message: "All courses",
        course
    })
    } catch (error) {
       res.status(500).json({message: error?.message}) 
    }

})



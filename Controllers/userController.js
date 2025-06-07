

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Auth = require("../models/userModel");

// User registeration
const registerUser = async (req, res) => {
    try {
        // To destucture the user info 
        const { firstName, lastName, email, password, role, phone_number, location } = req.body;
        
       
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
            newUser: {
                firstName,
                lastName,
                email,
                role,
                phone_number,
                location
            }
        })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


// User login
const loginUser = async (req, res) => {
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
            { expiresIn: "10m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN,
            { expiresIn: "30d" }
        );

        res.status(200).json({
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
    
}



// View all user
const viewAllUser = async (req, res) => {
    
    try {
       
        const users = await Auth.find()

        res.status(200).json({
            message: "All users",
            users
        })
    } catch (error) {
        res.status(500).json({ message: error?.message })
    }
};







module.exports ={registerUser, loginUser, viewAllUser}
const jwt = require("jsonwebtoken");
const Auth = require("../models/userModel");
const { sendForgotPasswordEmail, sendSuccessfulPasswordResetEmail } = require("../sendMails")
const bcrypt = require("bcryptjs");

// User get forgotten password email  
const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body
    
        const user = await Auth.findOne({ email });

        if (!email) {
            return res.status(404).json({
                message: "Account not found"
            })
        }


        // send reset password email
        const accessToken = await jwt.sign(
            { user },
            `${process.env.ACCESS_TOKEN}`,
            { expiresIn: "5m" }
        )
        await sendForgotPasswordEmail(email, accessToken)
    
        res.status(201).json({
            message: "Check your inbox"
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};



const handleResetPassword = async (req, res) => {
    try {
        const { password } = req.body;

        const user = await Auth.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({message: "No user account found with this email"})
        };


        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;

        await user.save();

        await sendSuccessfulPasswordResetEmail(email)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}




module.exports = { handleForgotPassword, handleResetPassword };
const { jwt } = require("jsonwebtoken");
const Auth = require("../models/userModel");


const handleForgotPassword = async (req, res) => {
    try {
        const { email } = req.body
    
        const user = await Auth.findOne({ email });

        if (!email) {
            return res.status(404).json({
                message: "Account not found"
            })
        }


        // send email
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








module.exports = { handleForgotPassword };
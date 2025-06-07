const nodemailer = require("nodemailer");


const sendForgotPasswordEmail = async (email, token) => {
    let mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    });

    const mailDetails = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: "Reset password Notification",
        html: `<h1> Here is the token to reset your password, please click this button <a href = "https://www.educore.com/${token}">Reset Password</a></h1>`
    }


    await mailTransport.sendMail(mailDetails);
};


const sendSuccessfulPasswordResetEmail = async (email, token) => {
    let mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    });

    const mailDetails = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: "Reset password Notification",
        html: `<h1> You have successfully reset your password. You can return to the login page to login.</h1>`
    }


    await mailTransport.sendMail(mailDetails);
};




module.exports = {sendForgotPasswordEmail, sendSuccessfulPasswordResetEmail};
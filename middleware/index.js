

const validateRegister = async (  req, res, next) => {
     // To destucture the user info  
            const { firstName, lastName, email, password, role, phone_number, location } = req.body;
    
    // To check if the user enter email and password and to ensure it is upto 8 character
        const errors = [];
            if (!email) {
                errors.push("Please enter your email")
            }
    
            if (!password || password.length < 8) {
                errors.push("Password must be upto 8 characters")
            }
    
            if (errors.length > 0) {
                res.status(400).json({message: errors})
            }
    
        next()
}


const auth = async (req, res, next) => {
    

    
}


module.exports = validateRegister;
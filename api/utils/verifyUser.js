const { createError } = require("../controllers/Errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token); // got the created token from sign in and google 
    console.log(process.env.JWT_SECRET_KEY)
    if (!token) {
        return next(createError(401, "User is Not Logged in")); // Use return to terminate the function after calling next
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => { // Verified or authenticated the token with the Secret key
        if (err) {
            return next(createError(401, "Error Verifying Json Web Token")); // Use return to terminate the function after calling next
        }
        req.user = user;
        next();
    });
};

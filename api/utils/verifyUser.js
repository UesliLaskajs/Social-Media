const { createError } = require("../controllers/Errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token); // got the created token from sign in and google 
    
    if (!token) {
        return next(createError(401, "User is Not Logged in"));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return next(createError(401, "Error Verifying Json Web Token"));
        }
        req.user = user;
        return next();
      });
};

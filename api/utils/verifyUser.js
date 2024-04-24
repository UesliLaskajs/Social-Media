const { createError } = require("../controllers/Errors")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        next(createError(401, "User is Not Loged in"))
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            createError(401, "Error Verifying Json Web Token")
        }
        req.user = user
        next()
    })
}
const Usermodel = require("../model/user.model");
const { createError } = require("./Errors");
const bcrypt = require("bcrypt");

// Controller function to get all users (example placeholder)
module.exports.getAllUsers = (req, res) => {
    Usermodel.find().then((respo) => {
        res.json(respo)

    })
}

// Controller function to update user data
module.exports.updateUser = (req, res, next) => {
   

    if (req.user.id !== req.params.userId) { //Get the request from the user id and if it is not same as Request Url Param Throw Error
        return next(createError(401, "User is not allowed to update"));
    }
    
    console.log(req.params ,req.user)
    // Validate and hash password if provided
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(createError(403, "Password must be longer than 6 characters"));
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);//Encrypt The password
    }

    // Validate username length
    if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(createError(400, "Username must be between 7 and 20 characters"));
    }

    // Check if username contains spaces
    if (req.body.username.includes(" ")) {
        return next(createError(400, "Username must not contain spaces"));
    }

    // Check if username is lowercase
    if (req.body.username !== req.body.username.toLowerCase()) {
        return next(createError(401, "Username must be lowercase"));
    }

    // Check if username contains only letters and numbers
    if (!/^[a-zA-Z0-9]+$/.test(req.body.username)) {//Implemeted Regex to only numbers and charachters
        return next(createError(401, "Username must contain only letters and numbers"));
    }

    // Update user data in the database
    Usermodel.findOneAndUpdate(//From The user Find an ID AND SET THE UPDATED 
        { _id: req.params.userId }, // Filter criteria to find the user
        {
            $set: {
                username: req.body.username,
                password: req.body.password,
                photo: req.body.photo,
                email: req.body.email
            }
        },
        { new: true } // Options object specifying to return the updated document
    )
        .then((updatedUser) => {
            // Send a success response with the updated user data
            res.status(200).json({ message: "Successfully updated data", updatedUser });
        })
        .catch((error) => {
            // Handle any errors that occur during the update process
            res.status(500).json({ error: "An error occurred while updating the user data" });
        });
};

const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const { createError } = require("../controllers/Errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/user.model");
dotenv.config();

module.exports.signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next(createError(400, "All fields are required"));
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new UserModel({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        next(err); // Pass error to the error handling middleware
    }
};

module.exports.signIn = async (req, res, next) => {
    
    try {
        const { username, password } = req.body;
       
        if (!username || !password) {
            return next(createError(400, "All fields are required"));
        }

        const user = await UserModel.findOne({ username });
        if (!user) {
            return next(createError(400, "Invalid username or password")); // Don't reveal whether it's the username or password that's incorrect
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return next(createError(400, "Invalid username or password")); // Same message to not reveal information
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour //cREATE TOKEN REQUEST
        res.cookie("access_token", token, { httpOnly: true })//CREATE THE COOKIE SESSION AND NAMED access_token
            .status(200)
            .json({ message: "User logged in successfully", user });
    } catch (err) {
        next(err); // Pass error to the error handling middleware
    }
};

module.exports.google = async (req, res, next) => {
    const { username, email, photo } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
        const { password, ...rest } = user._doc
        res.cookie("access_token", token, { httpOnly: true })
            .json(rest)
    }
    else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        const hashedPassword = bcrypt.hashSync(generatedPassword, bcrypt.genSaltSync(10))
        const newUser = new User({
            username: username.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
            email: email,
            password: hashedPassword,
            photo: photo
        })
        await newUser.save()
        const token = jwt.sign({ newUser: newUser._id }, process.env.JWT_SECRET_KEY)
        const { password, ...rest } = newUser._doc
        res.cookie("acess_token", token, { httpOnly: true }).json(rest)
    }
}
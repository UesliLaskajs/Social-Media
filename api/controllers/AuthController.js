const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const { createError } = require("../controllers/Errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

        res.cookie("access_token", token, { httpOnly: true }) // Set cookie as HttpOnly for security
            .status(200)
            .json({ message: "User logged in successfully", user });

    } catch (err) {
        next(err); // Pass error to the error handling middleware
    }
};

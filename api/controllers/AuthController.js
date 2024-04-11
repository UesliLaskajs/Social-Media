const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt")
const { createError } = require("../controllers/Errors");

module.exports.signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next(createError(400, "All fields are required"));
        }

        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = new UserModel({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "User created successfully", user: user });
    } catch (err) {
        console.error("Error in signUp:", err);
        res.status(500).json({ error: "Server Error", message: err.message });
    }
};

module.exports.SingIn = (req, res, next) => {
    const { username, password } = req.body;

    if (!username, !password) {
        return next(createError(400, "All fields  are required"))
    }

    const validUsername = UserModel.findOne({ username })

    if(!validUsername){
        return next(createError(400, "User Not Found"))
    }

    const validPassword=bcrypt.compareSync(password, validUsername.password)
    
    if(!validPassword){
        return next(createError(401, 'Invalid Password'))
    }
}

const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt")
module.exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
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

        res.status(500).json({ error: err.message });
    }
};

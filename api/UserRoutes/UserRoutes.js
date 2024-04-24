const express = require("express")
const UserController = require("../controllers/User.Controllers")
const { verifyToken } = require("../utils/verifyUser")
router = express.Router()

router.get("/users", UserController.getAllUsers)
router.put("/update/:userId", verifyToken, UserController.updateUser)

module.exports = router
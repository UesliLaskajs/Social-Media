const express = require("express")
const UserController = require("../controllers/User.Controllers")
const { verifyToken } = require("../utils/verifyUser")
router = express.Router()

router.get("/users", UserController.getAllUsers)
router.put("/update/:userId", verifyToken, UserController.updateUser)//Added the Verified AS a parse to the Routes

module.exports = router
const express = require("express")
const router = express.Router();
const authControllers = require("../controllers/AuthController")

router.post("/sign-up", authControllers.signUp)
router.post("/sign-in", authControllers.signIn)
router.post("/google",authControllers.google)

module.exports = router
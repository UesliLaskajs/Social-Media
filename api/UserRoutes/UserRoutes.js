const express=require("express")
const UserController=require("../controllers/User.Controllers")
router=express.Router()

router.get("/users", UserController.getAllUsers)


module.exports=router
const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const auth = require("../middleware/auth")
//import user controller
const usersController = require("../controller/usersController.js")

//login user route
router.post(
  "/auth/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "please enter a valid password").exists(),
  ],
  usersController.loginUser
)

//get logged in user
router.get("/auth", auth, usersController.getLoggedInUser)
module.exports = router

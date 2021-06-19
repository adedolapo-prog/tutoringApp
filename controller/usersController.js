const User = require("../models/usersModel.js")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const { SECRET } = process.env

module.exports = class usersController {
  // @route GET /api/auth
  // @description get logged in users
  //@access private route
  static async getLoggedInUser(req, res) {
    try {
      // get user from db
      const user = await User.findById(req.user.id).select("password")

      //return user
      res
        .status(200)
        .json({
          success: true,
          statusCode: 200,
          message: "user got successfully",
          user,
        })
    } catch (err) {
      console.error(err.message)

      res.status(500).send("server error")
    }
  }

  // @route POST /api/auth/login
  // @description authenticate the user and get token
  //@access public route
  static async loginUser(req, res) {
    //check for errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() })
    }

    //if there are no errors
    const { email, password } = req.body

    try {
      //initialize new user
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          error: "invalid credentials",
        })
      }

      //else  check the password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: "Invalid credentials",
        })
      }

      //else, there's a match. send token
      //send payload and signed token
      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err
          } else {
            return res.json({
              success: true,
              statusCode: 200,
              message: "logged in successfully",
              user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userRole: user.userRole,
                isTutor: user.isTutor,
                isAdmin: user.isAdmin,
              },
              token,
            })
          }
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send("server error")
    }
  }
}

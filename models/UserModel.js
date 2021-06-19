const mongoose = require("mongoose")

//create user schema
const usersSchema = new mongoose.Schema(
  {
    //some properties
    firstName: {
      type: String,
      required: [true, "please enter your first name"],
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    },
    userRole: {
      type: String,
      enum: ["admin", "tutor", "student", "not assigned"],
      default: "not assigned",
    },
    isTutor: {
      type: Boolean,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("user", usersSchema)

module.exports = User

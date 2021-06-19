//check if there is a token
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { SECRET } = process.env

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token")

  //check if token doesnt exist
  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      error: "no token authorization denied",
    })
  }

  //else
  try {
    const decoded = jwt.verify(token, SECRET)
    //assign user to request object
    req.user = decoded.user
    next()
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, statusCode: 401, message: "Token not valid" })
  }
}

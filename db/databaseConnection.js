/**
 * 1.   creating a connection function for mongodb
 * 2.
 */

const mongoose = require("mongoose")
require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI

//create a connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB connected : ${conn.connection.host}`)
  } catch (err) {
    console.log(`Error : ${err.message}`)
    process.exit(1)
  }
}

module.exports = connectDB

const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to the database");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { connectDB };

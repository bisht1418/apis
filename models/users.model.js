const { Schema, model } = require("mongoose");
require("dotenv").config();

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const userModel = model("user", userSchema);

module.exports = { userModel };

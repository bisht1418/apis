const bcrypt = require("bcrypt");
const { userModel } = require("../models/users.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isExistUser = userModel.findOne({ email });
    if (!isExistUser) {
      return res.json({ message: "user already register" });
    }
    const hashedPassword = await bcrypt.hash(password, 4);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "sucessfully register", newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "wrong credential" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ error: "invalid email or password" });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };

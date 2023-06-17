const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(404).json({ error: "unauthorized" });
    }
    const decodeToken = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET_KEY
    );
    if (decodeToken) {
      req.body.id = decodeToken.user._id;
      req.body.username = decodeToken.user.username;
      next();
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = { authMiddleware };

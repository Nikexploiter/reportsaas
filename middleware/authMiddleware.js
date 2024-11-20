const jwt = require("jsonwebtoken");
require("dotenv").config();

const catchAsyncError = require("./catchAsyncError");

const SECRET_KEY = process.env.JWT_SECRET; // Replace this with an environment variable in production

exports.verifyToken = catchAsyncError(async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
});

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);
  console.log("SECRET_KEY:", SECRET_KEY); // Make sure this is defined correctly

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message); // Add this for additional error information

    res.status(401).json({ message: "Invalid token" });
  }
};




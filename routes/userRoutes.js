// routes/userRoutes.js
const express = require('express');
const {  UserRegister, UserLogin, getUserProfile, updateUserProfile, getAllUsers, updateUserPassword } = require('../controllers/userController');
const {authMiddleware} =require("../middleware/authMiddleware")

const router = express.Router();

// Registration route
router.route("/register").post(UserRegister)
router.route("/login").post(UserLogin)
router.route("/userlist").get(getAllUsers)

// Protected routes (Require authentication)
router.route("/profile").get(authMiddleware, getUserProfile);
router.route("/profile").put(authMiddleware, updateUserProfile);
router.route("/profile/updateUserPassword").post(authMiddleware, updateUserPassword);

module.exports = router;
  
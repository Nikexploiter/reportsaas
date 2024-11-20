const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config(); 

const SECRET_KEY = process.env.JWT_SECRET // Replace this with an environment variable in production

// User registration
exports.UserRegister = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobile
    });

    // Save the user
    await user.save();

    res.status(201).json({ message: 'User registered successfully', });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User login
exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const userId = user._id
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, userId  });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all users, excluding the password field
    const users = await User.find().select('-password'); 

    // If no users are found
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Send users data in response
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // Retrieve the user's information using the userId from the token
    const user = await User.findById(req.userId).select('-password'); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user data in response
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
  }
};

// Profile update
exports.updateUserProfile = async (req, res) => {
  try {
    // console.log(SECRET_KEY);
    
    const { name, email, password, mobile } = req.body;
    const userId = req.userId; // Retrieved from authMiddleware

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;

    // Hash the password if it’s provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

exports.updateUserPassword = async (req, res) => {

  const { currentPassword, newPassword } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Token is missing." });
  }

  try {
    // Verify the token and extract user ID
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      console.log(decoded);

      return res.status(404).json({ error: "User not found." });
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while changing the password." });
  }

}
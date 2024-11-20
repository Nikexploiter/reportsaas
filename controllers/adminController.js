const AdminUser = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// New register function
exports.Adminregister = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if the user already exists by email and username
        let userByEmail = await AdminUser.findOne({ email });
        if (userByEmail) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        let userByUsername = await AdminUser.findOne({ username });
        if (userByUsername) {
            return res.status(400).json({ message: 'Username is already taken' });
        }
        
        // Create a new user instance
        user = new AdminUser({
            username,
            email,
            password: await bcrypt.hash(password, 10), // Hash the password
        });
        
        // Save the user to the database
        await user.save();
        
        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token }); // Respond with the token
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body; // Only accept email and password
    console.log('Login attempt:', { email, password }); // Log the login attempt

    try {
        // Check if the user exists by email
        const user = await AdminUser.findOne({ email });
        console.log('User found:', user); // Log user information

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Log password match result
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, id: user._id, token }); // Respond with the token
    } catch (error) {
        console.error('Login error:', error); // Log any errors
        res.status(500).json({ message: 'Server error' });
        res.json({success: false})
    }
};

// Function to delete an admin user by email
exports.deleteAdminByEmail = async (req, res) => {
    const { email } = req.body; // Get email from request body
    console.log('Delete attempt for email:', email); // Log the delete attempt

    try {
        // Check if the user exists by email
        const user = await AdminUser.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await AdminUser.deleteOne({ email });
        console.log('User deleted:', email); // Log successful deletion

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error); // Log any errors
        res.status(500).json({ message: 'Server error' });
    }
};


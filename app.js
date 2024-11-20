// app.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const AdminRoute = require('./routes/adminRoutes');
const subscriptionRoutes = require("./routes/subscriptionsRoutes")
const Plans = require("./routes/plansRoutes")
const Reviews = require("./routes/reviewRoutes")
const Reports = require('./routes/reportRoutes')
const app = express();
const cors = require("cors");

require('dotenv').config({ path: './config/.env' }); // Explicit path

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin',AdminRoute );
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/plans', Plans);
app.use('/api/reviews', Reviews);
app.use('/api/reports', Reports);

module.exports = app;

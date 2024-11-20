// config/db.js
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/config.env' });


const connectDB = async () => {
  try {
    console.log("MONGO_URI from env:", process.env.MONGO_URI); // Debug log
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

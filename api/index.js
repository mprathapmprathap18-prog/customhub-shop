const app = require('../backend/app');
const connectDatabase = require('../backend/config/database');
const cloudinary = require('cloudinary');

// Connect to MongoDB Atlas
connectDatabase();

// Cloudinary Configuration
if (process.env.CLOUDINARY_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

module.exports = app;

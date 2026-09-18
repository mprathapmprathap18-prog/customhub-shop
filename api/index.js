const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../backend/config/config.env') });
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'toyshop-local-dev-secret-key-2026';
if (!process.env.JWT_EXPIRE) process.env.JWT_EXPIRE = '7d';
if (!process.env.COOKIE_EXPIRE) process.env.COOKIE_EXPIRE = '5';

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

// Script to create an owner account
// Run this with: node backend/scripts/createOwner.js

require('dotenv').config({ path: 'backend/config/config.env' });
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

const createOwner = async () => {
    try {
        await connectDatabase();

        const ownerEmail = 'kaaviyaselvan@customhubgifts.com';
        const ownerPassword = 'Owner@123456'; // Change this to a strong password

        // Check if owner already exists
        const existingOwner = await User.findOne({ email: ownerEmail });
        if (existingOwner) {
            console.log("⚠️  Owner account already exists with email:", ownerEmail);
            process.exit(0);
        }

        // Create owner
        const owner = await User.create({
            name: 'Kaaviyaselvan',
            email: ownerEmail,
            gender: 'Male',
            password: ownerPassword,
            role: 'owner',
            avatar: {
                public_id: 'default-avatar',
                url: `https://ui-avatars.com/api/?name=Kaaviyaselvan&background=random`,
            },
        });

        console.log("✅ Owner account created successfully!");
        console.log("📧 Email:", ownerEmail);
        console.log("🔐 Password:", ownerPassword);
        console.log("\n⚠️  IMPORTANT: Change the password after first login!");
        console.log("💡 Owner Dashboard: http://localhost:3000/owner/dashboard");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error creating owner:", error.message);
        process.exit(1);
    }
};

createOwner();

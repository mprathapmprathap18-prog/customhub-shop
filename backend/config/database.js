const mongoose = require('mongoose');

let cachedConnection = null;

const connectDatabase = async () => {
    const MONGO_URI = process.env.MONGO_URI || process.env.DB_URI;

    if (!MONGO_URI) {
        console.warn('MONGO_URI / DB_URI not configured.');
        return null;
    }

    if (cachedConnection && mongoose.connection.readyState >= 1) {
        return cachedConnection;
    }

    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        cachedConnection = conn;
        console.log('✅ Connected to MongoDB Atlas');
        return conn;
    } catch (err) {
        console.error('❌ Mongoose connection error:', err.message || err);
        return null;
    }
};

module.exports = connectDatabase;
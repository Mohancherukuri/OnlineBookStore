// database.js (config)
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_HOST_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
};

module.exports = connectDB;
